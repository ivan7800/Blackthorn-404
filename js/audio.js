export class AudioSystem{
  constructor(settings={}){this.ctx=null;this.settings=settings;this.amb=null;this.ambGain=null;this.ambOsc=[];this.scene='manor';this.perceptionTier=0;this.perceptionAmount=1;}
  ensure(){if(!this.ctx){const AC=window.AudioContext||window.webkitAudioContext;if(AC)this.ctx=new AC();}if(this.ctx?.state==='suspended')this.ctx.resume();return this.ctx;}
  setSettings(s){this.settings=s;this.updateAmbientGain();}
  setPerception(tier=0,amount=1){this.perceptionTier=Math.max(0,Math.min(4,Number(tier)||0));this.perceptionAmount=Math.max(0,Math.min(1,Number(amount)??1));this.updateAmbientPitch();}
  sceneProfile(scene=this.scene){const key=typeof scene==='string'?scene:(scene?.boss?'boss':scene?.tone==='manor'?'manor':scene?.era==='1956'||scene?.era==='1987'?'signal':scene?.tone==='final'?'void':'memory');return {manor:[55,.045],memory:[46,.042],signal:[62,.038],boss:[39,.055],void:[33,.05]}[key]||[49,.04];}
  setScene(room){this.scene=room?.boss?'boss':room?.tone==='manor'?'manor':room?.tone==='final'?'void':(room?.era==='1956'||room?.era==='1987')?'signal':'memory';this.updateAmbientPitch();}
  startAmbient(){const c=this.ensure();if(!c||this.ambGain)return;const [base]=this.sceneProfile();const gain=c.createGain();gain.gain.setValueAtTime(0,c.currentTime);gain.connect(c.destination);const o1=c.createOscillator(),o2=c.createOscillator();o1.type='sine';o2.type='triangle';o1.frequency.setValueAtTime(base,c.currentTime);o2.frequency.setValueAtTime(base*1.503,c.currentTime);const g1=c.createGain(),g2=c.createGain();g1.gain.value=.72;g2.gain.value=.18;o1.connect(g1).connect(gain);o2.connect(g2).connect(gain);o1.start();o2.start();this.ambGain=gain;this.ambOsc=[o1,o2];this.updateAmbientGain(true);}
  stopAmbient(){if(!this.ambGain)return;const c=this.ctx;try{this.ambGain.gain.cancelScheduledValues(c.currentTime);this.ambGain.gain.setTargetAtTime(0,c.currentTime,.05);}catch{}const nodes=[...this.ambOsc];setTimeout(()=>{for(const o of nodes)try{o.stop();}catch{}},180);this.ambGain=null;this.ambOsc=[];}
  updateAmbientGain(immediate=false){if(!this.ambGain||!this.ctx)return;const [,baseGain]=this.sceneProfile(),v=this.settings.mute?0:baseGain*(this.settings.musicVolume??.35);const t=this.ctx.currentTime;this.ambGain.gain.cancelScheduledValues(t);if(immediate)this.ambGain.gain.setValueAtTime(v,t);else this.ambGain.gain.setTargetAtTime(v,t,.08);}
  updateAmbientPitch(){if(!this.ambOsc.length||!this.ctx)return;const [base]=this.sceneProfile(),bend=1-(this.perceptionTier*.018*this.perceptionAmount),t=this.ctx.currentTime;this.ambOsc[0].frequency.setTargetAtTime(base*bend,t,.12);this.ambOsc[1].frequency.setTargetAtTime(base*1.503*bend,t,.12);this.updateAmbientGain();}
  tone(freq=220,dur=.08,type='square',gain=.03,slide=0){
    const c=this.ensure();if(!c||this.settings.mute)return;
    const bend=this.perceptionTier>0?(1-(this.perceptionTier*.012*this.perceptionAmount)):1;
    const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq*bend,c.currentTime);if(slide)o.frequency.linearRampToValueAtTime((freq+slide)*bend,c.currentTime+dur);
    if(this.perceptionTier>=3)o.detune.setValueAtTime(Math.sin(c.currentTime*17)*18*this.perceptionAmount,c.currentTime);
    g.gain.setValueAtTime(gain*(this.settings.fxVolume??.65),c.currentTime);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+dur);o.connect(g).connect(c.destination);o.start();o.stop(c.currentTime+dur);
    if(this.perceptionTier>=2&&this.perceptionAmount>.45&&idSafeEcho(type,dur)){
      const e=c.createOscillator(),eg=c.createGain();e.type='sine';e.frequency.setValueAtTime(freq*.51,c.currentTime+.035);eg.gain.setValueAtTime(gain*.15*this.perceptionAmount*(this.settings.fxVolume??.65),c.currentTime+.035);eg.gain.exponentialRampToValueAtTime(.0001,c.currentTime+dur+.09);e.connect(eg).connect(c.destination);e.start(c.currentTime+.035);e.stop(c.currentTime+dur+.09);
    }
  }
  play(id){const m={step:[95,.025,'square',.018,8],hit:[130,.07,'sawtooth',.04,-70],hurt:[70,.13,'square',.05,-25],parry:[680,.08,'square',.03,-250],door:[110,.12,'triangle',.025,-20],sigil:[260,.28,'sine',.035,260],boss:[48,.45,'sawtooth',.035,30],note:[440,.05,'sine',.02,40],error:[80,.1,'square',.025,-10],win:[330,.35,'triangle',.04,330],whisper:[118,.18,'sine',.012,-31],glitch:[64,.045,'square',.015,170],shot:[96,.11,'square',.05,-45],reload:[180,.07,'triangle',.018,40],stagger:[155,.12,'sawtooth',.035,-85],telegraph:[520,.045,'square',.018,-90]};if(m[id])this.tone(...m[id]);}
}
function idSafeEcho(type,dur){return dur<.5&&type!=='sawtooth';}
