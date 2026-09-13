import {BALANCE} from './data.js';
const CLAMP=(v,a,b)=>Math.max(a,Math.min(b,v));
const ECHOES=[
  'THE ROOM REMEMBERS A DIFFERENT DOOR.',
  'DO NOT TRUST THE SECOND FOOTSTEP.',
  'SOMEONE HAS ALREADY READ THIS THOUGHT.',
  'THE HOUSE IS NOT BEHIND YOU.',
  'NAMES ARE LOAD-BEARING STRUCTURES.',
  'YOU HAVE BEEN HERE AFTER THIS.',
  'ONE OF THESE SHADOWS HAS WEIGHT.'
];

export class PerceptionSystem{
  constructor(){this.wardTimer=0;this.shock=0;this.lastTier=0;this.echoClock=0;this.phantomClock=0;this.shadowClock=0;this.glitchClock=0;this.lightPhase=0;}
  tier(value){if(value>75)return 0;if(value>50)return 1;if(value>25)return 2;if(value>10)return 3;return 4;}
  update(dt,state,{corrupt=false,enemyPressure=0,safe=false}={}){
    this.wardTimer=Math.max(0,this.wardTimer-dt);this.shock=Math.max(0,this.shock-dt);this.echoClock=Math.max(0,this.echoClock-dt);this.phantomClock=Math.max(0,this.phantomClock-dt);this.shadowClock=Math.max(0,this.shadowClock-dt);this.glitchClock=Math.max(0,this.glitchClock-dt);this.lightPhase+=dt;
    let drain=(corrupt?BALANCE.perception.corruptDrain:0)+enemyPressure;if(this.wardTimer>0)drain*=.28;
    if(safe){state.stability=Math.min(100,state.stability+BALANCE.perception.safeStabilityRegen*dt);state.perception=Math.min(100,state.perception+BALANCE.perception.safePerceptionRegen*dt);return;}
    if(drain>0){let amount=drain*dt;const absorbed=Math.min(state.stability,amount*.55);state.stability-=absorbed;amount-=absorbed;state.perception=Math.max(0,state.perception-amount);}
    else state.stability=Math.min(100,state.stability+2.2*dt);
  }
  shockLoss(state,amount){let a=amount;if(state.stability>0){const b=Math.min(state.stability,a*.5);state.stability-=b;a-=b;}state.perception=Math.max(0,state.perception-a);this.shock=.35;}
  ward(state){this.wardTimer=7;state.perception=Math.min(100,state.perception+8);state.stability=Math.min(100,state.stability+12);}
  fx(value,settings={}){
    const intensity=CLAMP(Number(settings.perceptionFx??1),0,1),tier=this.tier(value),truthfulHud=!!settings.truthfulHud;
    const active=tier>0&&intensity>.05;
    return {
      tier,amount:intensity,
      audioBend:active&&tier>=1,
      falseShadows:tier>=1&&intensity>.12,
      lightFlutter:tier>=1&&intensity>.18,
      doorVeil:tier>=2&&intensity>.35,
      roomShift:tier>=2&&intensity>.28,
      falseEnemies:tier>=2&&intensity>.25,
      echoes:tier>=3&&intensity>.2,
      warp:tier>=3&&intensity>.35,
      hudLie:tier>=3&&intensity>.55&&!truthfulHud,
      labelLie:tier>=3&&intensity>.5,
      fakeGlitch:tier>=4&&intensity>.28,
      objectVeil:tier>=4&&intensity>.45,
      heavy:tier>=4&&intensity>.3,
      shock:this.shock,
    };
  }
  tierMessage(tier){
    return ({
      1:['PERCEPTION · LEVEL I','Light and sound stop agreeing about distance.'],
      2:['PERCEPTION · LEVEL II','Architecture becomes a suggestion. Some threats may not be real.'],
      3:['PERCEPTION · LEVEL III','The interface is part of Elena’s perception now. Verify before trusting it.'],
      4:['PERCEPTION · LEVEL IV','MEMORY SIGNAL UNSTABLE','Everything strange remains inside the game. Your saves and device are safe.'],
    })[tier]||null;
  }
  hudView(state,room,fx,time=0){
    if(!fx.hudLie)return {health:state.health,perception:state.perception,stability:state.stability,stamina:state.stamina,roomName:room.name,unreliable:false};
    const wobble=Math.sin(time*1.7)*7,phase=Math.floor(time*1.1)%4;
    const hp=CLAMP(state.health+(phase===0?13:phase===1?-9:wobble),0,100);
    const st=CLAMP(state.stamina+(phase===2?18:-wobble*.4),0,100);
    const stability=CLAMP(state.stability+(phase===3?15:-6),0,100);
    const roomName=fx.labelLie&&phase===3?'ROOM NOT FOUND':room.name;
    return {health:hp,perception:CLAMP(state.perception+(phase===1?11:0),0,100),stability,stamina:st,roomName,unreliable:true};
  }
  shouldSpawnShadow(fx){if(!fx.falseShadows||this.shadowClock>0)return false;this.shadowClock=2.1;return true;}
  shouldSpawnPhantom(fx){if(!fx.falseEnemies||this.phantomClock>0)return false;this.phantomClock=fx.tier>=3?1.6:2.8;return true;}
  shouldEcho(fx){if(!fx.echoes||this.echoClock>0)return false;this.echoClock=4.8;return true;}
  shouldGlitch(fx){if(!fx.fakeGlitch||this.glitchClock>0)return false;this.glitchClock=1.15;return true;}
  echoText(seed=0){return ECHOES[Math.abs(Math.floor(seed))%ECHOES.length];}
  objectVisible(id,fx,time,near=false){if(!fx.objectVeil||near)return true;const n=[...String(id)].reduce((a,ch)=>a+ch.charCodeAt(0),0);return Math.sin(time*2.4+n)>.15;}
  lightFactor(index,fx,time){if(!fx.lightFlutter)return 1;return CLAMP(.68+Math.sin(time*7.3+index*2.7)*.32,.18,1);}
}
