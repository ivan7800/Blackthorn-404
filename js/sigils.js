import {SIGILS} from './data.js';
export const sigilById=id=>SIGILS.find(s=>s.id===id)||SIGILS[0];
export const romanIntensity=n=>['I','II','III'][Math.max(1,Math.min(3,Number(n)||1))-1];
export const sigilLabel=(sigil,intensity=1)=>`${sigil.verb} + ${sigil.school} + ${romanIntensity(intensity)}`;
export function sigilStats(sigil,intensity=1){const i=Math.max(1,Math.min(3,Number(intensity)||1))-1;return {cost:Array.isArray(sigil.cost)?sigil.cost[i]:sigil.cost,cooldown:Array.isArray(sigil.cooldown)?sigil.cooldown[i]:sigil.cooldown};}
export function cycleSigil(save,dir=1){const owned=(save.sigils||[]).filter(id=>SIGILS.some(s=>s.id===id));if(!owned.length)return null;let i=Math.max(0,owned.indexOf(save.equippedSigil));i=(i+(dir<0?-1:1)+owned.length)%owned.length;save.equippedSigil=owned[i];return sigilById(save.equippedSigil);}
export function cycleIntensity(save,dir=1){const max=Math.max(1,Math.min(3,Number(save.sigilMaxIntensity)||1));let i=Math.max(1,Math.min(max,Number(save.sigilIntensity)||1));i=((i-1+(dir<0?-1:1)+max)%max)+1;save.sigilIntensity=i;return i;}
export function canCast(engine,sigil,intensity=engine.save.sigilIntensity||1){const st=sigilStats(sigil,intensity);return engine.sigilCooldown<=0&&engine.save.stability>=st.cost&&engine.mode==='playing';}
const aliveNearest=(engine,range=999)=>{const alive=engine.enemies.filter(e=>!e.dead);alive.sort((a,b)=>engine.distanceToPlayer(a)-engine.distanceToPlayer(b));return alive[0]&&engine.distanceToPlayer(alive[0])<=range?alive[0]:null;};
const hitSigil=(engine,target,damage,poise=0)=>{if(!target)return false;if(target.boss&&engine.bossVulnerable<=0){engine.spawnText('SILENT',target.x,target.y);return false;}target.hp=Math.max(0,target.hp-damage);target.hitFlash=.15;if(poise)engine.applyPoise(target,poise);engine.spawnBurst(target.x+target.w/2,target.y+target.h/2,9);if(target.hp<=0)engine.killEnemy(target);return true;};
export function castSigil(engine){
  const s=sigilById(engine.save.equippedSigil),intensity=Math.max(1,Math.min(Number(engine.save.sigilMaxIntensity)||1,Number(engine.save.sigilIntensity)||1)),st=sigilStats(s,intensity);
  if(!canCast(engine,s,intensity)){engine.sound?.play('error');engine.spawnText(engine.sigilCooldown>0?'COOLDOWN':'UNSTABLE',engine.player.x-7,engine.player.y-5);return false;}
  engine.save.stability=Math.max(0,engine.save.stability-st.cost);engine.sigilCooldown=st.cooldown;engine.sigilFlash=.35+.13*intensity;engine.save.sigilStats=engine.save.sigilStats||{casts:0,schools:{FLESH:0,MIND:0,VOID:0},maxIntensity:1};engine.save.sigilStats.casts++;engine.save.sigilStats.schools[s.school]=(engine.save.sigilStats.schools[s.school]||0)+1;engine.save.sigilStats.maxIntensity=Math.max(engine.save.sigilStats.maxIntensity||1,intensity);
  const target=aliveNearest(engine,120+intensity*15),label=sigilLabel(s,intensity);let detail='The formula closes on empty space.';
  switch(s.effect){
    case 'bind':{const targets=engine.enemies.filter(e=>!e.dead&&engine.distanceToPlayer(e)<70+intensity*22).slice(0,intensity);for(const e of targets)e.bound=Math.max(e.bound||0,1.8+intensity*1.45);detail=targets.length?`${targets.length} hostile pattern${targets.length>1?'s':''} pinned.`:'No manifested pattern is close enough.';break;}
    case 'sever':{const hit=hitSigil(engine,target,6+intensity*7,9+intensity*8);detail=hit?'A hostile pattern loses continuity.':'Nothing answers the cut.';break;}
    case 'brand':{if(target){target.branded=5+intensity*2;target.brandPower=1.15+intensity*.12;detail=`${target.name} carries the mark.`;}break;}
    case 'shift':{const v=engine.facingVector(),distance=18+intensity*12;engine.invuln=Math.max(engine.invuln,.18+intensity*.08);engine.tryMove(v.x*distance,v.y*distance);engine.spawnBurst(engine.player.x+5,engine.player.y+7,6+intensity*3);detail='Space remembers Elena a few steps ahead.';break;}
    case 'ward':{const low=engine.save.perception<50;engine.perceptionSystem.ward(engine.save,4+intensity*2);engine.sigilBuffs.ward=Math.max(engine.sigilBuffs.ward,4+intensity*2);engine.save.perception=Math.min(100,engine.save.perception+4*intensity);if(low)engine.unlockAchievement('hold-attention');detail='Attention holds against the room.';break;}
    case 'reveal':{engine.sigilBuffs.reveal=Math.max(engine.sigilBuffs.reveal,5+intensity*2);engine.phantoms=[];engine.fakeGlitches=[];detail='False layers become temporarily legible.';break;}
    case 'lure':{if(target){target.confused=2.5+intensity*1.8;target.pendingAttack=false;target.windup=0;detail=`${target.name} follows a remembered sound.`;}break;}
    case 'echo':{const notes=(engine.room().interact||[]).filter(x=>x.text?.length);const clue=notes.length?notes[Math.floor((engine.roomTime+intensity)%notes.length)].text.at(-1):'The room has no stable testimony.';engine.echoes.push({text:`ECHO: ${clue}`,life:4+intensity});detail='A useful contradiction rises above the noise.';break;}
    case 'mend':{const before=engine.player.hp,heal=8+intensity*9;engine.player.hp=Math.min(100,engine.player.hp+heal);engine.save.health=engine.player.hp;detail=`Health ${Math.round(before)} → ${Math.round(engine.player.hp)}.`;break;}
    case 'fortify':{engine.sigilBuffs.fortify=Math.max(engine.sigilBuffs.fortify,4+intensity*2.5);detail='The body remembers how not to yield.';break;}
    case 'purge':{engine.sigilBuffs.purge=Math.max(engine.sigilBuffs.purge,5+intensity*2.5);engine.save.stability=Math.min(100,engine.save.stability+5+intensity*3);engine.save.perception=Math.min(100,engine.save.perception+2+intensity*2);detail='Foreign pressure withdraws from the immediate space.';break;}
    case 'siphon':{if(target&&hitSigil(engine,target,5+intensity*6,4+intensity*4)){engine.player.hp=Math.min(100,engine.player.hp+4+intensity*5);engine.save.health=engine.player.hp;detail='The hostile pattern returns something it took.';}break;}
  }
  engine.resolveSigilPuzzle?.(s,intensity);engine.sound?.play('sigil');engine.spawnText(`${s.short} ${romanIntensity(intensity)}`,engine.player.x-5,engine.player.y-7);engine.persist('sigil-cast');
  if(engine.room().sigilTrial)engine.message([label,detail]);
  return true;
}
