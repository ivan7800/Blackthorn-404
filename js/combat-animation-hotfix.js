/* Blackthorn 404 · v1.1.4 combat animation hotfix */
(() => {
  'use strict';
  const PATCH = Symbol.for('blackthorn404.combatAnimation.v114');

  function patchEngine(engine){
    if(!engine || engine[PATCH]) return;
    engine[PATCH] = true;
    engine.__attackVisual = {time:0,max:.18,heavy:false,potency:1,ranged:false};

    const trigger = (heavy=false,potency=1,ranged=false) => {
      const max = ranged ? (heavy?.24:.14) : (heavy?.30:.18);
      engine.__attackVisual = {time:max,max,heavy:!!heavy,potency:Math.max(.18,Math.min(1,potency||1)),ranged:!!ranged};
    };

    const quick = engine.quickAttack?.bind(engine);
    if(quick){
      engine.quickAttack = function(){
        const beforeCd=this.attackCd, beforeStamina=this.save?.stamina, beforeAmmo=this.ammoFor?.(this.weapon)?.clip;
        const result=quick();
        const ammo=this.ammoFor?.(this.weapon);
        const executed=(this.attackCd>beforeCd)||(Number.isFinite(beforeAmmo)&&ammo&&ammo.clip<beforeAmmo)||(this.save?.stamina<beforeStamina);
        if(executed) trigger(false,1,this.weapon?.type==='ranged');
        return result;
      };
    }

    const heavyAttack = engine.heavyAttack?.bind(engine);
    if(heavyAttack){
      engine.heavyAttack = function(p=.18){
        const beforeCd=this.heavyCd, beforeStamina=this.save?.stamina, beforeAmmo=this.ammoFor?.(this.weapon)?.clip;
        const result=heavyAttack(p);
        const ammo=this.ammoFor?.(this.weapon);
        const executed=(this.heavyCd>beforeCd)||(Number.isFinite(beforeAmmo)&&ammo&&ammo.clip<beforeAmmo)||(this.save?.stamina<beforeStamina);
        if(executed) trigger(true,p,this.weapon?.type==='ranged');
        return result;
      };
    }

    const update = engine.update?.bind(engine);
    if(update){
      engine.update = function(dt){
        const result=update(dt);
        if(this.__attackVisual?.time>0) this.__attackVisual.time=Math.max(0,this.__attackVisual.time-dt);
        return result;
      };
    }

    const drawPlayer = engine.drawPlayer?.bind(engine);
    if(drawPlayer){
      engine.drawPlayer = function(c){
        const a=this.__attackVisual;
        if(!a?.time){ drawPlayer(c); return; }
        const t=1-a.time/a.max;
        const pulse=Math.sin(Math.min(1,Math.max(0,t))*Math.PI);
        const p=this.player;
        const facing=p?.facing||'right';
        const v=facing==='left'?{x:-1,y:0}:facing==='right'?{x:1,y:0}:facing==='up'?{x:0,y:-1}:{x:0,y:1};
        const recoil=a.ranged?(a.heavy?2.2:1.2):(a.heavy?2.5:1.45);
        c.save();
        c.translate(-v.x*pulse*recoil,-v.y*pulse*recoil);
        drawPlayer(c);
        c.restore();

        const cx=p.x+5, cy=p.y+7;
        const baseReach=Math.max(13,Math.min(34,(this.weapon?.reach||18)*.82));
        const reach=a.ranged?11:baseReach+(a.heavy?5*a.potency:0);
        const ang=Math.atan2(v.y,v.x);
        c.save();
        c.globalCompositeOperation='lighter';
        if(a.ranged){
          c.globalAlpha=.55*pulse;
          c.fillStyle=a.heavy?'#ffd08a':'#e7c9a3';
          c.beginPath();c.arc(cx+v.x*12,cy+v.y*12,a.heavy?4:3,0,Math.PI*2);c.fill();
        }else{
          const spread=a.heavy?1.55:1.15;
          const sweep=(t-.5)*(a.heavy?.9:.65);
          c.globalAlpha=(a.heavy?.78:.56)*pulse;
          c.strokeStyle=a.heavy?'#ffb36a':'#e9d5b5';
          c.lineWidth=a.heavy?3:2;
          c.beginPath();
          c.arc(cx,cy,reach,ang-spread/2+sweep,ang+spread/2+sweep);
          c.stroke();
          const tipAng=ang+sweep+(t-.5)*spread;
          c.globalAlpha=.9;
          c.strokeStyle='#f4e7ce';
          c.lineWidth=a.heavy?2:1;
          c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+Math.cos(tipAng)*reach,cy+Math.sin(tipAng)*reach);c.stroke();
        }
        c.restore();
      };
    }
  }

  function tick(){
    const engine=window.__BT404__?.engine;
    if(engine) patchEngine(engine);
  }
  tick();
  setInterval(tick,120);
})();
