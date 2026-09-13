import {SAVE_SCHEMA,ROOMS,WEAPONS,SIGILS} from './data.js';
export const SETTINGS_KEY='blackthorn404.settings.v1';
export const ACTIVE_SLOT_KEY='blackthorn404.activeSlot';
const SLOT_PREFIX='blackthorn404.slot.';
const BACKUP_PREFIX='blackthorn404.backup.';
const ROOM_IDS=new Set(Object.keys(ROOMS));
const WEAPON_IDS=new Set(WEAPONS.map(x=>x.id));
const SIGIL_IDS=new Set(SIGILS.map(x=>x.id));
const knownRoom=(id,fallback)=>typeof id==='string'&&ROOM_IDS.has(id)?id:fallback;
const finiteNonNegative=(value,fallback=0)=>{const n=Number(value);return Number.isFinite(n)&&n>=0?n:fallback;};
const safeParse=(v,f)=>{try{return JSON.parse(v)??f}catch{return f}};
export const storageGet=k=>{try{return localStorage.getItem(k)}catch{return null}};
export const storageSet=(k,v)=>{try{localStorage.setItem(k,v);return true}catch{return false}};
export const storageRemove=k=>{try{localStorage.removeItem(k);return true}catch{return false}};
export const slotKey=n=>`${SLOT_PREFIX}${n}`;
export const backupKey=n=>`${BACKUP_PREFIX}${n}`;

export function defaultSave(){return {
  schema:SAVE_SCHEMA,createdAt:Date.now(),updatedAt:Date.now(),room:'manor-vestibule',previousRoom:null,
  health:100,perception:100,stability:100,stamina:100,weapon:'candlestick',weapons:['candlestick'],ammo:{revolver:{clip:6,reserve:18},bolt:{clip:1,reserve:8},flare:{clip:1,reserve:5}},sigils:['bind-void-i'],equippedSigil:'bind-void-i',
  flags:[],notes:[],lore:[],achievements:[],bosses:[],rooms:['manor-vestibule'],playSeconds:0,deaths:0,sliceComplete:false,
  houseStage:0,mapUnlocked:false,phase2Complete:false,phase3Complete:false,phase4Complete:false,phase5Complete:false,phase6Complete:false,phase7Complete:false,phase8Complete:false,phase9Complete:false,phase12Complete:false,ending:null,endingsSeen:[],endingStats:{},ngPlus:false,ngPlusCycle:0,ngPlusSourceEnding:null,ngPlusTrait:null,ngPlusEchoes:[],ngPlusEchoComplete:false,legacyLore:[],legacySigils:[],ngPlusHistory:[],legacyPlaySeconds:0,finalSequenceStep:0,finalSigilFlags:[],finalChoices:{},chapterProgress:{c2:0,c3:0,c4:0,c5:0,c6:0,c7:0,c8:0},chapterStats:{c2:{secrets:0},c3:{secrets:0},c4:{secrets:0},c5:{secrets:0},c6:{secrets:0},c7:{secrets:0},c8:{secrets:0}},chapter1PuzzleStep:0,memorySafeRoom:'echo-priory-gate',chapter1Stats:{soundStrikes:0,hollowsDrawn:0,secrets:0},sigilIntensity:1,sigilMaxIntensity:1,sigilPuzzleFlags:[],sigilStats:{casts:0,schools:{FLESH:0,MIND:0,VOID:0},maxIntensity:1},safeRoom:'manor-vestibule',manorVisits:0,
  perceptionTiersSeen:[],perceptionMaxTier:0,perceptionTrialStep:0,combatStats:{parries:0,staggers:0,rangedHits:0,heavyHits:0},
};}

export function normalizeSave(raw){
  const base=defaultSave(); if(!raw||typeof raw!=='object')return base; const oldSchema=Number(raw.schema)||1; const s={...base,...raw};
  // Schema 1 -> 2 migration: preserve completed Phase 1 builds and expose the evolved hub.
  if(oldSchema<2){
    s.houseStage=s.sliceComplete?1:0;
    s.mapUnlocked=!!s.mapUnlocked;
    s.phase2Complete=!!s.phase2Complete;
    s.safeRoom=s.safeRoom||'manor-vestibule';
    if(s.sliceComplete&&s.room==='manor-gallery')s.room='manor-gallery-after';
  }
  // Schema 2 -> 3 migration: Phase 3 adds only perception metadata; gameplay state remains compatible.
  if(oldSchema<3){
    s.phase3Complete=!!s.phase3Complete;
    s.perceptionTiersSeen=Array.isArray(s.perceptionTiersSeen)?s.perceptionTiersSeen:[];
    s.perceptionMaxTier=Math.max(0,Number(s.perceptionMaxTier)||0);
    s.perceptionTrialStep=Math.max(0,Number(s.perceptionTrialStep)||0);
  }
  // Schema 3 -> 4 migration: Phase 4 adds weapon inventory, ammunition and combat telemetry.
  if(oldSchema<4){
    s.phase4Complete=!!s.phase4Complete;
    s.weapons=Array.isArray(s.weapons)&&s.weapons.length?s.weapons:[s.weapon||'candlestick'];
    s.ammo=s.ammo&&typeof s.ammo==='object'?s.ammo:{revolver:{clip:6,reserve:18},bolt:{clip:1,reserve:8},flare:{clip:1,reserve:5}};
    s.combatStats=s.combatStats&&typeof s.combatStats==='object'?s.combatStats:{parries:0,staggers:0,rangedHits:0,heavyHits:0};
  }
  // Schema 4 -> 5 migration: Phase 5 adds Sigil grammar, intensity and lattice telemetry.
  if(oldSchema<5){
    s.phase5Complete=!!s.phase5Complete;s.sigilIntensity=1;s.sigilMaxIntensity=Math.max(1,Number(s.sigilMaxIntensity)||1);s.sigilPuzzleFlags=Array.isArray(s.sigilPuzzleFlags)?s.sigilPuzzleFlags:[];s.sigilStats=s.sigilStats&&typeof s.sigilStats==='object'?s.sigilStats:{casts:0,schools:{FLESH:0,MIND:0,VOID:0},maxIntensity:1};
  }
  // Schema 5 -> 6 migration: full Saint Orren chapter state and an echo-local checkpoint.
  if(oldSchema<6){
    s.phase6Complete=!!s.phase6Complete;s.chapter1PuzzleStep=Math.max(0,Number(s.chapter1PuzzleStep)||0);s.memorySafeRoom=typeof s.memorySafeRoom==='string'?s.memorySafeRoom:'echo-priory-gate';s.chapter1Stats=s.chapter1Stats&&typeof s.chapter1Stats==='object'?s.chapter1Stats:{soundStrikes:0,hollowsDrawn:0,secrets:0};
  }
  // Schema 6 -> 7 migration: Chapters II-IV progression and per-memory telemetry.
  if(oldSchema<7){s.phase7Complete=!!s.phase7Complete;s.chapterProgress=s.chapterProgress&&typeof s.chapterProgress==='object'?s.chapterProgress:{c2:0,c3:0,c4:0};s.chapterStats=s.chapterStats&&typeof s.chapterStats==='object'?s.chapterStats:{c2:{secrets:0},c3:{secrets:0},c4:{secrets:0}};}
  // Schema 7 -> 8 migration: Chapters V-VIII and the complete eight-spine state.
  if(oldSchema<8){s.phase8Complete=!!s.phase8Complete;}
  // Schema 8 -> 9 migration: final 2026 chapter, choices and final Sigil lattice state.
  if(oldSchema<9){s.phase9Complete=!!s.phase9Complete;s.finalSequenceStep=Math.max(0,Number(s.finalSequenceStep)||0);s.finalSigilFlags=Array.isArray(s.finalSigilFlags)?s.finalSigilFlags:[];s.finalChoices=s.finalChoices&&typeof s.finalChoices==='object'?s.finalChoices:{};}
  // Schema 9 -> 10 migration: Phase 11 adds the persistent evidence archive.
  if(oldSchema<10){s.lore=Array.isArray(s.lore)?s.lore:[];}
  // Schema 10 -> 11 migration: Phase 12 stores resolved endings without altering final-chapter choices.
  if(oldSchema<11){s.phase12Complete=!!s.phase12Complete;s.ending=typeof s.ending==='string'?s.ending:null;s.endingsSeen=Array.isArray(s.endingsSeen)?s.endingsSeen:[];s.endingStats=s.endingStats&&typeof s.endingStats==='object'?s.endingStats:{};}
  // Schema 11 -> 12 migration: Phase 13 adds meta-progression without granting campaign progression.
  if(oldSchema<12){s.ngPlus=!!s.ngPlus;s.ngPlusCycle=Math.max(0,Number(s.ngPlusCycle)||0);s.ngPlusSourceEnding=typeof s.ngPlusSourceEnding==='string'?s.ngPlusSourceEnding:null;s.ngPlusTrait=typeof s.ngPlusTrait==='string'?s.ngPlusTrait:null;s.ngPlusEchoes=Array.isArray(s.ngPlusEchoes)?s.ngPlusEchoes:[];s.ngPlusEchoComplete=!!s.ngPlusEchoComplete;s.legacyLore=Array.isArray(s.legacyLore)?s.legacyLore:[];s.legacySigils=Array.isArray(s.legacySigils)?s.legacySigils:[];s.ngPlusHistory=Array.isArray(s.ngPlusHistory)?s.ngPlusHistory:[];s.legacyPlaySeconds=Math.max(0,Number(s.legacyPlaySeconds)||0);}
  s.schema=SAVE_SCHEMA;
  s.health=Math.max(1,Math.min(100,Number(s.health)||100));
  s.perception=Math.max(0,Math.min(100,Number(s.perception)??100));
  s.stability=Math.max(0,Math.min(100,Number(s.stability)??100));
  s.stamina=Math.max(0,Math.min(100,Number(s.stamina)??100));
  s.houseStage=Math.max(0,Math.min(8,Number(s.houseStage)||0));
  s.mapUnlocked=!!s.mapUnlocked;s.phase2Complete=!!s.phase2Complete;s.phase3Complete=!!s.phase3Complete;s.phase4Complete=!!s.phase4Complete;s.phase5Complete=!!s.phase5Complete;s.phase6Complete=!!s.phase6Complete;s.phase7Complete=!!s.phase7Complete;s.phase8Complete=!!s.phase8Complete;s.phase9Complete=!!s.phase9Complete;s.phase12Complete=!!s.phase12Complete;s.sliceComplete=!!s.sliceComplete;
  s.room=knownRoom(s.room,'manor-vestibule');s.previousRoom=s.previousRoom===null?null:knownRoom(s.previousRoom,null);s.safeRoom=knownRoom(s.safeRoom,'manor-vestibule');s.memorySafeRoom=knownRoom(s.memorySafeRoom,'echo-priory-gate');s.chapter1PuzzleStep=Math.max(0,Math.min(3,Number(s.chapter1PuzzleStep)||0));s.manorVisits=Math.max(0,Number(s.manorVisits)||0);
  s.playSeconds=finiteNonNegative(s.playSeconds);s.deaths=finiteNonNegative(s.deaths);s.createdAt=finiteNonNegative(s.createdAt,Date.now());s.updatedAt=finiteNonNegative(s.updatedAt,s.createdAt);
  s.perceptionMaxTier=Math.max(0,Math.min(4,Number(s.perceptionMaxTier)||0));s.perceptionTrialStep=Math.max(0,Math.min(4,Number(s.perceptionTrialStep)||0));s.sigilMaxIntensity=Math.max(1,Math.min(3,Number(s.sigilMaxIntensity)||1));s.sigilIntensity=Math.max(1,Math.min(s.sigilMaxIntensity,Number(s.sigilIntensity)||1));
  if(!Array.isArray(s.perceptionTiersSeen))s.perceptionTiersSeen=[];s.perceptionTiersSeen=[...new Set(s.perceptionTiersSeen.map(Number).filter(v=>v>=1&&v<=4))];
  for(const k of ['flags','notes','lore','achievements','bosses','rooms','sigils','weapons','sigilPuzzleFlags','finalSigilFlags','endingsSeen','ngPlusEchoes','legacyLore','legacySigils','ngPlusHistory'])if(!Array.isArray(s[k]))s[k]=[];
  s.flags=[...new Set(s.flags.filter(Boolean))];s.notes=[...new Set(s.notes.filter(Boolean))];s.lore=[...new Set(s.lore.filter(Boolean))];s.achievements=[...new Set(s.achievements.filter(Boolean))];s.bosses=[...new Set(s.bosses.filter(Boolean))];s.rooms=[...new Set(s.rooms.filter(id=>typeof id==='string'&&ROOM_IDS.has(id)))];if(!s.rooms.includes(s.room))s.rooms.push(s.room);s.sigils=[...new Set(s.sigils.filter(id=>typeof id==='string'&&SIGIL_IDS.has(id)))];s.weapons=[...new Set(s.weapons.filter(id=>typeof id==='string'&&WEAPON_IDS.has(id)))];s.sigilPuzzleFlags=[...new Set(s.sigilPuzzleFlags.filter(Boolean))];s.finalSigilFlags=[...new Set(s.finalSigilFlags.filter(Boolean))];s.endingsSeen=[...new Set(s.endingsSeen.filter(x=>['normal','dark','true'].includes(x)))];s.ending=['normal','dark','true'].includes(s.ending)?s.ending:null;if(!s.endingStats||typeof s.endingStats!=='object'||Array.isArray(s.endingStats))s.endingStats={};s.ngPlus=!!s.ngPlus;s.ngPlusCycle=Math.max(0,Math.min(99,Number(s.ngPlusCycle)||0));s.ngPlusSourceEnding=['normal','dark','true'].includes(s.ngPlusSourceEnding)?s.ngPlusSourceEnding:null;s.ngPlusTrait=['witness-thread','tenant-mark','open-hand'].includes(s.ngPlusTrait)?s.ngPlusTrait:null;s.ngPlusEchoes=[...new Set(s.ngPlusEchoes.filter(Boolean))];s.ngPlusEchoComplete=!!s.ngPlusEchoComplete;s.legacyLore=[...new Set(s.legacyLore.filter(Boolean))];s.legacySigils=[...new Set(s.legacySigils.filter(Boolean))];s.ngPlusHistory=s.ngPlusHistory.filter(x=>x&&typeof x==='object').slice(-12);s.legacyPlaySeconds=Math.max(0,Number(s.legacyPlaySeconds)||0);s.finalSequenceStep=Math.max(0,Math.min(3,Number(s.finalSequenceStep)||0));if(!s.finalChoices||typeof s.finalChoices!=='object'||Array.isArray(s.finalChoices))s.finalChoices={};
  s.weapon=WEAPON_IDS.has(s.weapon)?s.weapon:null;s.equippedSigil=SIGIL_IDS.has(s.equippedSigil)?s.equippedSigil:null;
  if(!s.sigils.length)s.sigils=['bind-void-i'];if(!s.sigils.includes(s.equippedSigil))s.equippedSigil=s.sigils[0];if(!s.weapons.length)s.weapons=['candlestick'];if(!s.weapons.includes(s.weapon))s.weapon=s.weapons[0];
  const ammoDefaults={revolver:{clip:6,reserve:18},bolt:{clip:1,reserve:8},flare:{clip:1,reserve:5}};if(!s.ammo||typeof s.ammo!=='object')s.ammo={};for(const [k,v] of Object.entries(ammoDefaults)){const a=s.ammo[k]||{},clipN=Number(a.clip),reserveN=Number(a.reserve);s.ammo[k]={clip:Math.max(0,Number.isFinite(clipN)?clipN:v.clip),reserve:Math.max(0,Number.isFinite(reserveN)?reserveN:v.reserve)};}
  const cs=s.combatStats&&typeof s.combatStats==='object'?s.combatStats:{};s.combatStats={parries:Math.max(0,Number(cs.parries)||0),staggers:Math.max(0,Number(cs.staggers)||0),rangedHits:Math.max(0,Number(cs.rangedHits)||0),heavyHits:Math.max(0,Number(cs.heavyHits)||0)};
  const ss=s.sigilStats&&typeof s.sigilStats==='object'?s.sigilStats:{},schools=ss.schools&&typeof ss.schools==='object'?ss.schools:{};s.sigilStats={casts:Math.max(0,Number(ss.casts)||0),schools:{FLESH:Math.max(0,Number(schools.FLESH)||0),MIND:Math.max(0,Number(schools.MIND)||0),VOID:Math.max(0,Number(schools.VOID)||0)},maxIntensity:Math.max(1,Math.min(3,Number(ss.maxIntensity)||1))};
  const c1=s.chapter1Stats&&typeof s.chapter1Stats==='object'?s.chapter1Stats:{};s.chapter1Stats={soundStrikes:Math.max(0,Number(c1.soundStrikes)||0),hollowsDrawn:Math.max(0,Number(c1.hollowsDrawn)||0),secrets:Math.max(0,Number(c1.secrets)||0)};
  const cp=s.chapterProgress&&typeof s.chapterProgress==='object'?s.chapterProgress:{};s.chapterProgress={c2:Math.max(0,Math.min(3,Number(cp.c2)||0)),c3:Math.max(0,Math.min(3,Number(cp.c3)||0)),c4:Math.max(0,Math.min(3,Number(cp.c4)||0)),c5:Math.max(0,Math.min(3,Number(cp.c5)||0)),c6:Math.max(0,Math.min(3,Number(cp.c6)||0)),c7:Math.max(0,Math.min(3,Number(cp.c7)||0)),c8:Math.max(0,Math.min(3,Number(cp.c8)||0))};
  const cs7=s.chapterStats&&typeof s.chapterStats==='object'?s.chapterStats:{};s.chapterStats={c2:{secrets:Math.max(0,Number(cs7.c2?.secrets)||0)},c3:{secrets:Math.max(0,Number(cs7.c3?.secrets)||0)},c4:{secrets:Math.max(0,Number(cs7.c4?.secrets)||0)},c5:{secrets:Math.max(0,Number(cs7.c5?.secrets)||0)},c6:{secrets:Math.max(0,Number(cs7.c6?.secrets)||0)},c7:{secrets:Math.max(0,Number(cs7.c7?.secrets)||0)},c8:{secrets:Math.max(0,Number(cs7.c8?.secrets)||0)}};
  return s;
}
export function createNewGamePlus(source){
  const prev=normalizeSave(source);if(!prev.phase12Complete||!['normal','dark','true'].includes(prev.ending))return null;
  const next=defaultSave(),cycle=Math.max(1,(prev.ngPlusCycle||0)+1),seen=[...new Set([...(prev.endingsSeen||[]),prev.ending].filter(x=>['normal','dark','true'].includes(x)))];
  const trait=prev.ending==='normal'?'witness-thread':prev.ending==='dark'?'tenant-mark':'open-hand';
  next.ngPlus=true;next.ngPlusCycle=cycle;next.ngPlusSourceEnding=prev.ending;next.ngPlusTrait=trait;next.endingsSeen=seen;next.achievements=[...new Set(prev.achievements||[])];
  next.legacyLore=[...new Set([...(prev.legacyLore||[]),...(prev.lore||[])])];next.legacySigils=[...new Set([...(prev.legacySigils||[]),...(prev.sigils||[])])];
  next.legacyPlaySeconds=Math.max(0,Number(prev.legacyPlaySeconds)||0)+Math.max(0,Number(prev.playSeconds)||0);
  next.ngPlusHistory=[...(prev.ngPlusHistory||[]),{cycle:prev.ngPlusCycle||0,ending:prev.ending,playSeconds:Math.max(0,Number(prev.playSeconds)||0),completedAt:Date.now()}].slice(-12);
  next.flags=[`ngplus:cycle:${cycle}`,`ngplus:source:${prev.ending}`];next.ngPlusEchoes=[];next.ngPlusEchoComplete=false;
  const bonus=prev.ending==='normal'?['ward-mind-i']:prev.ending==='dark'?['brand-void-i']:['reveal-mind-i','mend-flesh-i'];if(seen.length===3)bonus.push('shift-void-i');next.sigils=[...new Set(['bind-void-i',...bonus])];next.equippedSigil='bind-void-i';next.sigilMaxIntensity=1;next.sigilIntensity=1;
  next.achievements.push('second-reading');if(seen.length===3)next.achievements.push('three-versions');next.achievements=[...new Set(next.achievements)];
  return normalizeSave(next);
}
export function loadSlot(n){return normalizeSave(safeParse(storageGet(slotKey(n)),null));}
export function saveSlot(n,save){
  const key=slotKey(n),existing=storageGet(key);if(existing)storageSet(backupKey(n),existing);
  const clean=normalizeSave(save);clean.updatedAt=Date.now();storageSet(key,JSON.stringify(clean));return clean;
}
export function recoverSlot(n){const raw=safeParse(storageGet(backupKey(n)),null);if(!raw)return null;const clean=normalizeSave(raw);storageSet(slotKey(n),JSON.stringify(clean));return clean;}
export function clearSlot(n){storageRemove(slotKey(n));storageRemove(backupKey(n));}
export function getSlotSummary(n){const raw=safeParse(storageGet(slotKey(n)),null);if(!raw)return {slot:n,empty:true};const s=normalizeSave(raw);return {slot:n,empty:false,room:s.room,complete:s.phase12Complete||s.phase9Complete||s.phase8Complete||s.phase7Complete||s.phase6Complete||s.phase5Complete||s.phase4Complete||s.phase3Complete||s.phase2Complete||s.sliceComplete,phase2:s.phase2Complete,phase3:s.phase3Complete,phase4:s.phase4Complete,phase5:s.phase5Complete,phase6:s.phase6Complete,phase7:s.phase7Complete,phase8:s.phase8Complete,phase9:s.phase9Complete,phase12:s.phase12Complete,ending:s.ending,endingsSeen:s.endingsSeen,ngPlus:s.ngPlus,ngPlusCycle:s.ngPlusCycle,ngPlusSourceEnding:s.ngPlusSourceEnding,ngPlusEchoes:s.ngPlusEchoes,updatedAt:s.updatedAt,playSeconds:s.playSeconds,legacyPlaySeconds:s.legacyPlaySeconds};}
export function getActiveSlot(){return Math.max(1,Math.min(3,Number(storageGet(ACTIVE_SLOT_KEY))||1));}
export function setActiveSlot(n){const v=Math.max(1,Math.min(3,Number(n)||1));storageSet(ACTIVE_SLOT_KEY,String(v));return v;}
export const parseSettings=()=>safeParse(storageGet(SETTINGS_KEY),{});
export const saveSettings=s=>storageSet(SETTINGS_KEY,JSON.stringify(s));
