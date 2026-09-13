/* Blackthorn 404 generated static bundle. Do not edit directly. */
"use strict";

/* ===== data.js ===== */
const VERSION='1.1.1';
const SAVE_SCHEMA=12;
const GAME_TITLE='Blackthorn 404: The Unremembered';
const INTERNAL_W=320;
const INTERNAL_H=180;

// Final release balance values remain centralised so combat, perception and NG+ can be
// audited without scattering magic numbers through the engine. Save schema remains 12.
const BALANCE={
  stamina:{idleRegen:16,guardRegen:3.5,chargeRegen:2.5,quickDelay:.32,heavyDelay:.58,dodgeDelay:.62,blockDelay:.42,dodgeCost:20,blockCost:11},
  perception:{corruptDrain:1.15,enemyPressureScale:.04,safeStabilityRegen:12,safePerceptionRegen:4},
  boss:{bellWindow:5.75,focusWindow:6.25,finalWindow:9.5},
  ngPlus:{hpPerCycle:.05,hpCap:1.15,damagePerCycle:.04,damageCap:1.12,speedPerCycle:.015,speedCap:1.05},
};

const WEAPONS=[
  {id:'candlestick',name:'Iron Candlestick',type:'melee',damage:5,heavy:10,reach:18,cooldown:.27,quickStamina:4,stamina:15,poise:6,heavyPoise:14,chargeMax:.7,desc:'Fast improvised weapon. Low stagger, forgiving recovery.'},
  {id:'woodsman-axe',name:"Woodsman\'s Axe",type:'melee',damage:8,heavy:17,reach:21,cooldown:.43,quickStamina:7,stamina:24,poise:11,heavyPoise:25,chargeMax:1.05,desc:'Slow, forceful and extremely good at breaking poise.'},
  {id:'ritual-dagger',name:'Blackthorn Ritual Dagger',type:'melee',damage:4,heavy:9,reach:16,cooldown:.19,quickStamina:3,stamina:12,poise:4,heavyPoise:11,chargeMax:.55,parryBonus:.045,desc:'Very fast. Extends the perfect-parry window slightly.'},
  {id:'service-revolver',name:'Webley Service Revolver',type:'ranged',damage:11,heavy:18,reach:0,cooldown:.38,quickStamina:2,stamina:14,poise:9,heavyPoise:18,chargeMax:.85,ammoType:'revolver',clip:6,reserveStart:18,projectileSpeed:185,reload:1.05,desc:'Six deliberate shots. Empty-cylinder attack begins an automatic reload.'},
  {id:'bronze-star-spear',name:'Bronze Star Spear',type:'melee',damage:7,heavy:15,reach:34,cooldown:.38,quickStamina:6,stamina:21,poise:10,heavyPoise:23,chargeMax:.92,desc:'A long Bronze Age spear weighted for measured thrusts and constellation spacing.'},
  {id:'census-gladius',name:'Census Gladius',type:'melee',damage:7,heavy:14,reach:22,cooldown:.30,quickStamina:5,stamina:18,poise:9,heavyPoise:20,chargeMax:.76,desc:'A late-Roman short sword: compact, reliable and suited to narrow archives.'},
  {id:'anatomist-rapier',name:"Anatomist's Rapier",type:'melee',damage:6,heavy:14,reach:29,cooldown:.25,quickStamina:4,stamina:17,poise:7,heavyPoise:18,chargeMax:.68,parryBonus:.025,desc:'A precise sixteenth-century blade with fast recovery and a slightly wider parry window.'},
  {id:'duelling-sabre',name:'Blackthorn Duelling Sabre',type:'melee',damage:7,heavy:15,reach:28,cooldown:.30,quickStamina:6,stamina:18,poise:8,heavyPoise:19,chargeMax:.72,parryBonus:.018,desc:'Eleanor’s balanced sabre rewards measured spacing and clean parries.'},
  {id:'trench-club',name:'Ravelin Trench Club',type:'melee',damage:9,heavy:19,reach:20,cooldown:.46,quickStamina:8,stamina:25,poise:14,heavyPoise:30,chargeMax:1.02,desc:'Short, brutal and stamina-hungry; built to break poise in cramped trenches.'},
  {id:'heavy-torch',name:'Northmere Heavy Torch',type:'melee',damage:7,heavy:14,reach:23,cooldown:.34,quickStamina:5,stamina:18,poise:9,heavyPoise:19,chargeMax:.78,desc:'A radio engineer’s tool turned defensive weapon; steady rather than elegant.'},
  {id:'flare-pistol',name:'Northmere Flare Pistol',type:'ranged',damage:19,heavy:25,reach:0,cooldown:.80,quickStamina:4,stamina:16,poise:16,heavyPoise:24,chargeMax:.95,ammoType:'flare',clip:1,reserveStart:5,projectileSpeed:125,reload:1.5,desc:'One bright emergency shot at a time. Powerful, scarce and slow to reload.'},
  {id:'pry-bar',name:'Restoration Pry Bar',type:'melee',damage:8,heavy:17,reach:24,cooldown:.38,quickStamina:6,stamina:21,poise:12,heavyPoise:26,chargeMax:.9,desc:'Theo’s restoration tool: ugly, reliable and excellent at forcing a stagger.'},
];

const SIGILS=[
  {id:'bind-void-i',verb:'BIND',school:'VOID',short:'BIND',cost:[14,22,32],cooldown:[4.5,6,8],desc:'Pins manifested enemies to a remembered threshold.',effect:'bind'},
  {id:'sever-void-i',verb:'SEVER',school:'VOID',short:'SEVER',cost:[16,25,36],cooldown:[3.8,5.2,7],desc:'Cuts a hostile pattern and tears at its poise.',effect:'sever'},
  {id:'brand-void-i',verb:'BRAND',school:'VOID',short:'BRAND',cost:[12,18,26],cooldown:[4,5.5,7],desc:'Marks an enemy so the next physical hits land harder.',effect:'brand'},
  {id:'shift-void-i',verb:'SHIFT',school:'VOID',short:'SHIFT',cost:[13,20,29],cooldown:[4.2,5.8,7.4],desc:'Steps Elena through a short fold in remembered space.',effect:'shift'},
  {id:'ward-mind-i',verb:'WARD',school:'MIND',short:'WARD',cost:[12,18,27],cooldown:[6,7.5,9],desc:'Stabilises attention and reduces Perception pressure.',effect:'ward'},
  {id:'reveal-mind-i',verb:'REVEAL',school:'MIND',short:'REVEAL',cost:[10,16,24],cooldown:[4,5.5,7],desc:'Exposes false architecture, hidden objects and memory seams.',effect:'reveal'},
  {id:'lure-mind-i',verb:'LURE',school:'MIND',short:'LURE',cost:[13,20,29],cooldown:[5,6.5,8],desc:'Distracts hostile attention and breaks attack intent.',effect:'lure'},
  {id:'echo-mind-i',verb:'ECHO',school:'MIND',short:'ECHO',cost:[9,14,21],cooldown:[3.5,5,6.5],desc:'Reads the nearest room for a usable clue or remembered contradiction.',effect:'echo'},
  {id:'mend-flesh-i',verb:'MEND',school:'FLESH',short:'MEND',cost:[15,23,34],cooldown:[7,8.5,10],desc:'Trades stability for immediate physical recovery.',effect:'mend'},
  {id:'fortify-flesh-i',verb:'FORTIFY',school:'FLESH',short:'FORTIFY',cost:[12,19,28],cooldown:[6,7.5,9],desc:'Hardens the body against incoming damage for a short time.',effect:'fortify'},
  {id:'purge-flesh-i',verb:'PURGE',school:'FLESH',short:'PURGE',cost:[14,21,31],cooldown:[6,7.5,9],desc:'Suppresses local corruption and restores stability.',effect:'purge'},
  {id:'siphon-flesh-i',verb:'SIPHON',school:'FLESH',short:'SIPHON',cost:[17,26,38],cooldown:[5,6.5,8],desc:'Drains vitality from the nearest manifested enemy.',effect:'siphon'},
];

const ENEMY_TYPES={
  'hollow-drifter':{name:'Hollow Drifter',family:'Hollow',hp:18,speed:24,damage:7,perception:4,behavior:'sound',size:[12,15],poise:18,windup:.28},
  'pale-listener':{name:'Pale Listener',family:'Pale Ones',hp:14,speed:28,damage:6,perception:7,behavior:'listener',size:[10,16],poise:13,windup:.2},
  'wall-witness':{name:'Wall Witness',family:'Witness',hp:20,speed:20,damage:5,perception:9,behavior:'edge',size:[13,16],poise:24,windup:.34},
  'plague-hollow':{name:'Plague Hollow',family:'Hollow',hp:22,speed:25,damage:7,perception:5,behavior:'sound',size:[12,16],poise:20,windup:.3},
  'choir-listener':{name:'Choir Listener',family:'Witness',hp:17,speed:29,damage:6,perception:9,behavior:'listener',size:[11,17],poise:15,windup:.22},
  'ash-verger':{name:'Ash Verger',family:'Ashborn',hp:30,speed:20,damage:9,perception:6,behavior:'edge',size:[14,18],poise:34,windup:.4},
  'grave-bearer':{name:'Grave Bearer',family:'Cultborn',hp:42,speed:18,damage:11,perception:8,behavior:'sound',size:[16,20],poise:46,windup:.46},
  'salt-wretch':{name:'Salt Wretch',family:'Ashborn',hp:24,speed:26,damage:7,perception:6,behavior:'sound',size:[12,16],poise:21,windup:.28},
  'starved-navigator':{name:'Starved Navigator',family:'Archivists',hp:20,speed:30,damage:6,perception:8,behavior:'orbit',size:[11,16],poise:16,windup:.22},
  'brine-husk':{name:'Brine Husk',family:'Night Flesh',hp:31,speed:20,damage:9,perception:7,behavior:'ambush',size:[14,18],poise:32,windup:.38},
  'glass-scarab':{name:'Glass Scarab',family:'Voidbound',hp:16,speed:36,damage:5,perception:5,behavior:'flee',size:[10,10],poise:10,windup:.18},
  'salt-priest':{name:'Salt Priest',family:'Cultborn',hp:48,speed:19,damage:11,perception:10,behavior:'orbit',size:[15,20],poise:46,windup:.44},
  'salt-astronomer':{name:'The Salt Astronomer',family:'Boss',hp:86,speed:20,damage:11,perception:13,behavior:'boss',size:[23,29],poise:58,windup:.34},
  'census-shade':{name:'Census Shade',family:'Archivists',hp:21,speed:29,damage:7,perception:8,behavior:'listener',size:[11,17],poise:17,windup:.23},
  'wax-soldier':{name:'Wax Soldier',family:'Cultborn',hp:34,speed:22,damage:10,perception:6,behavior:'edge',size:[14,18],poise:36,windup:.39},
  'erased-citizen':{name:'Erased Citizen',family:'Pale Ones',hp:25,speed:27,damage:8,perception:10,behavior:'ambush',size:[12,17],poise:23,windup:.31},
  'ink-leech':{name:'Ink Leech',family:'Voidbound',hp:15,speed:37,damage:5,perception:7,behavior:'flee',size:[10,9],poise:9,windup:.17},
  'ledger-knight':{name:'Ledger Knight',family:'Archivists',hp:52,speed:19,damage:12,perception:9,behavior:'edge',size:[16,20],poise:50,windup:.46},
  'last-enumerator':{name:'The Last Enumerator',family:'Boss',hp:92,speed:21,damage:11,perception:14,behavior:'boss',size:[23,30],poise:61,windup:.35},
  'anatomical-husk':{name:'Anatomical Husk',family:'Night Flesh',hp:28,speed:25,damage:8,perception:8,behavior:'sound',size:[13,18],poise:26,windup:.31},
  'shadow-page':{name:'Shadow Page',family:'Witness',hp:19,speed:33,damage:6,perception:11,behavior:'blink',size:[11,16],poise:14,windup:.21},
  'mirror-child':{name:'Mirror Child',family:'Pale Ones',hp:22,speed:31,damage:7,perception:12,behavior:'orbit',size:[11,15],poise:16,windup:.24},
  'stitched-witness':{name:'Stitched Witness',family:'Night Flesh',hp:37,speed:20,damage:10,perception:9,behavior:'ambush',size:[15,19],poise:39,windup:.41},
  'shadow-surgeon':{name:'Shadow Surgeon',family:'Witness',hp:55,speed:20,damage:12,perception:12,behavior:'blink',size:[16,20],poise:52,windup:.45},
  'anatomist-shadow':{name:"The Anatomist's Shadow",family:'Boss',hp:96,speed:23,damage:12,perception:15,behavior:'boss',size:[22,30],poise:64,windup:.33},
  'bell-boss':{name:'The Bell Without a Tongue',family:'Boss',hp:78,speed:22,damage:10,perception:12,behavior:'boss',size:[22,28],poise:54,windup:.32},
  'plaster-servant':{name:"Plaster Servant",family:"Cultborn",hp:29,speed:24,damage:8,perception:7,behavior:"ambush",size:[13,18],poise:28,windup:0.32},
  'survey-wraith':{name:"Survey Wraith",family:"Archivists",hp:23,speed:30,damage:7,perception:9,behavior:"orbit",size:[11,17],poise:19,windup:0.24},
  'hinge-crawler':{name:"Hinge Crawler",family:"Voidbound",hp:17,speed:36,damage:6,perception:8,behavior:"flee",size:[10,11],poise:11,windup:0.19},
  'ash-tenant':{name:"Ash Tenant",family:"Ashborn",hp:38,speed:21,damage:10,perception:11,behavior:"blink",size:[15,19],poise:41,windup:0.4},
  'first-tenant':{name:"The First Tenant",family:"Boss",hp:102,speed:22,damage:12,perception:16,behavior:"boss",size:[23,30],poise:68,windup:0.35},
  'mud-hollow':{name:"Mud Hollow",family:"Hollow",hp:30,speed:23,damage:9,perception:8,behavior:"sound",size:[13,18],poise:30,windup:0.33},
  'faceless-orderly':{name:"Faceless Orderly",family:"Pale Ones",hp:25,speed:28,damage:8,perception:11,behavior:"ambush",size:[12,18],poise:22,windup:0.27},
  'wire-witness':{name:"Wire Witness",family:"Witness",hp:34,speed:20,damage:10,perception:10,behavior:"edge",size:[14,19],poise:36,windup:0.4},
  'shell-shade':{name:"Shell Shade",family:"Ashborn",hp:21,speed:32,damage:7,perception:12,behavior:"blink",size:[11,17],poise:16,windup:0.22},
  'company-without-faces':{name:"The Company Without Faces",family:"Boss",hp:108,speed:21,damage:13,perception:17,behavior:"boss",size:[25,31],poise:72,windup:0.36},
  'signal-husk':{name:"Signal Husk",family:"Witness",hp:26,speed:27,damage:8,perception:12,behavior:"listener",size:[12,18],poise:23,windup:0.27},
  'carrier-ghost':{name:"Carrier Ghost",family:"Archivists",hp:22,speed:31,damage:7,perception:13,behavior:"orbit",size:[11,17],poise:18,windup:0.23},
  'static-child':{name:"Static Child",family:"Pale Ones",hp:18,speed:36,damage:6,perception:14,behavior:"flee",size:[10,15],poise:12,windup:0.18},
  'relay-witness':{name:"Relay Witness",family:"Witness",hp:40,speed:22,damage:11,perception:14,behavior:"blink",size:[15,20],poise:43,windup:0.4},
  'dead-frequency':{name:"The Dead Frequency",family:"Boss",hp:110,speed:23,damage:13,perception:18,behavior:"boss",size:[24,30],poise:74,windup:0.33},
  'restoration-double':{name:"Restoration Double",family:"Night Flesh",hp:31,speed:27,damage:9,perception:12,behavior:"ambush",size:[13,18],poise:29,windup:0.3},
  'tape-wraith':{name:"Tape Wraith",family:"Archivists",hp:24,speed:32,damage:8,perception:14,behavior:"blink",size:[11,17],poise:18,windup:0.23},
  'frame-crawler':{name:"Frame Crawler",family:"Voidbound",hp:19,speed:38,damage:6,perception:11,behavior:"flee",size:[10,10],poise:11,windup:0.18},
  'survey-shadow':{name:"Survey Shadow",family:"Witness",hp:36,speed:22,damage:10,perception:15,behavior:"orbit",size:[14,19],poise:38,windup:0.38},
  'man-missing-frame':{name:"The Man in the Missing Frame",family:"Boss",hp:116,speed:24,damage:14,perception:19,behavior:"boss",size:[24,31],poise:78,windup:0.32},
  'relation-husk':{name:'Relation Husk',family:'Night Flesh',hp:34,speed:26,damage:10,perception:16,behavior:'ambush',size:[14,19],poise:34,windup:.32},
  'index-moth':{name:'Index Moth',family:'Archivists',hp:18,speed:39,damage:6,perception:14,behavior:'flee',size:[10,10],poise:10,windup:.18},
  'pale-archivist':{name:'Pale Archivist',family:'Pale Ones',hp:31,speed:25,damage:9,perception:18,behavior:'orbit',size:[13,19],poise:30,windup:.31},
  'void-echo':{name:'Void Echo',family:'Voidbound',hp:27,speed:34,damage:9,perception:20,behavior:'blink',size:[12,18],poise:23,windup:.24},
  'the-unremembered':{name:'The Unremembered',family:'Boss',hp:150,speed:25,damage:15,perception:24,behavior:'boss',size:[26,32],poise:92,windup:.30},
};

const BESTIARY_RANKS=Object.freeze({
  elite:['ash-verger','brine-husk','wax-soldier','stitched-witness','plaster-servant','faceless-orderly','restoration-double','relation-husk'],
  miniboss:['grave-bearer','salt-priest','ledger-knight','shadow-surgeon','ash-tenant','wire-witness','relay-witness','survey-shadow'],
});
function bestiaryRank(id){return ENEMY_TYPES[id]?.family==='Boss'?'BOSS':BESTIARY_RANKS.miniboss.includes(id)?'MINIBOSS':BESTIARY_RANKS.elite.includes(id)?'ELITE':'CREATURE';}

const BOSS_PROFILES={
  'bell-boss':{
    movement:'anchor',accent:'#a45a66',pattern:'bell-ring',preferred:64,
    phases:[
      {interval:1.95,shots:5,speed:42,damage:6,perception:2.2,melee:1.00,line:'It listens for the space between footsteps. The first rings are sparse enough to read.'},
      {interval:1.45,shots:7,speed:48,damage:7,perception:3.0,melee:1.08,line:'The chamber becomes the bell. Alternating rings close the safe angles.'},
      {interval:1.08,shots:9,speed:55,damage:8,perception:4.2,melee:1.18,line:'No tongue. No metal. Ring the empty frame to give the sound an outline.'},
    ]},
  'salt-astronomer':{
    movement:'orbit',accent:'#b5a06b',pattern:'salt-star',preferred:78,
    phases:[
      {interval:2.05,shots:7,speed:44,damage:6,perception:2.0,melee:.95,line:'Seven vectors. One destination has been removed from the sky.'},
      {interval:1.52,shots:7,speed:52,damage:7,perception:2.8,melee:1.04,line:'The constellation rotates around Nara instead of the heavens.'},
      {interval:1.12,shots:7,speed:60,damage:8,perception:3.8,melee:1.12,line:'Turn the seventh-star lens toward him. A navigator can be wounded only after he has a destination.'},
    ]},
  'last-enumerator':{
    movement:'ledger',accent:'#a58b70',pattern:'census-cross',preferred:66,
    phases:[
      {interval:2.10,shots:4,speed:46,damage:6,perception:2.1,melee:1.00,line:'It attacks in counted axes: one line, one omission, one body.'},
      {interval:1.58,shots:6,speed:52,damage:7,perception:3.0,melee:1.10,line:'The count begins to include Marcus. Gaps in the ledger become projectiles.'},
      {interval:1.16,shots:8,speed:58,damage:8,perception:4.0,melee:1.18,line:'Read the restored census aloud. Force the Enumerator to become one entry among many.'},
    ]},
  'anatomist-shadow':{
    movement:'mirror',accent:'#8f7398',pattern:'mirror-fan',preferred:72,
    phases:[
      {interval:1.90,shots:5,speed:47,damage:6,perception:2.5,melee:.96,line:'It mirrors Lucia half a beat late. The delay is the first weakness.'},
      {interval:1.42,shots:7,speed:54,damage:7,perception:3.3,melee:1.05,line:'The second body begins choosing the reflection before Lucia moves.'},
      {interval:1.04,shots:9,speed:61,damage:8,perception:4.4,melee:1.15,line:'Collapse the triple mirror. Body and absence must occupy the same outline.'},
    ]},
  'first-tenant':{
    movement:'threshold',accent:'#9b6f5d',pattern:'tenant-doors',preferred:58,
    phases:[
      {interval:2.00,shots:4,speed:45,damage:7,perception:2.3,melee:1.05,line:'It enters through doors that do not exist yet.'},
      {interval:1.46,shots:6,speed:52,damage:8,perception:3.1,melee:1.14,line:'Every wall becomes a possible threshold. Eleanor must hold the room geometry in mind.'},
      {interval:1.06,shots:8,speed:59,damage:9,perception:4.1,melee:1.22,line:'Use the foundation nameplate. A tenant can be evicted only from a house that admits where it stands.'},
    ]},
  'company-without-faces':{
    movement:'formation',accent:'#7f756a',pattern:'company-volley',preferred:84,
    phases:[
      {interval:2.15,shots:3,speed:50,damage:7,perception:2.2,melee:1.00,line:'The company advances as one silhouette, but its shots come from different memories.'},
      {interval:1.60,shots:5,speed:56,damage:8,perception:3.0,melee:1.08,line:'The firing line splits. Each witness remembers a different position.'},
      {interval:1.18,shots:7,speed:62,damage:9,perception:4.0,melee:1.16,line:'Pair the identity discs. Give the formation names before it can be fought as bodies.'},
    ]},
  'dead-frequency':{
    movement:'signal',accent:'#668b91',pattern:'frequency-band',preferred:92,
    phases:[
      {interval:2.05,shots:4,speed:54,damage:7,perception:2.8,melee:.90,line:'A carrier wave crosses the room in readable bands.'},
      {interval:1.48,shots:6,speed:61,damage:8,perception:3.8,melee:1.00,line:'The signal folds back on itself. Silence is now part of the waveform.'},
      {interval:1.02,shots:8,speed:68,damage:9,perception:5.0,melee:1.10,line:'Lock the carrier. The dead frequency becomes dangerous only when it cannot drift between stations.'},
    ]},
  'man-missing-frame':{
    movement:'stutter',accent:'#846b91',pattern:'missing-frame',preferred:70,
    phases:[
      {interval:1.95,shots:4,speed:50,damage:7,perception:2.7,melee:.98,line:'He exists only on alternating frames. Attacks arrive where Theo was looking, not where he is looking now.'},
      {interval:1.38,shots:6,speed:58,damage:8,perception:3.7,melee:1.08,line:'Cuts appear without edits. The missing frames begin predicting movement.'},
      {interval:.98,shots:8,speed:66,damage:9,perception:4.8,melee:1.18,line:'Use the splice deck. Continuity must be made deliberately before the missing frame can hold a body.'},
    ]},
  'the-unremembered':{
    movement:'relation',accent:'#a65b76',pattern:'unremembered',preferred:82,
    phases:[
      {interval:1.85,shots:6,speed:50,damage:8,perception:3.5,melee:1.00,line:'It borrows attack patterns from histories Elena has already recovered.'},
      {interval:1.28,shots:9,speed:59,damage:9,perception:4.8,melee:1.10,line:'It stops attacking Elena and attacks the relationships around her.'},
      {interval:.90,shots:12,speed:68,damage:10,perception:6.0,melee:1.22,line:'Its final shape is not a body. Use all three schools, accept altered Perception, then speak the relationships.'},
    ]},
};

const perimeter=(exits={})=>{
  const out=[];
  if(exits.up){out.push([0,0,142,16],[178,0,142,16]);}else out.push([0,0,320,16]);
  if(exits.down){out.push([0,164,142,16],[178,164,142,16]);}else out.push([0,164,320,16]);
  if(exits.left){out.push([0,0,16,65],[0,112,16,68]);}else out.push([0,0,16,180]);
  if(exits.right){out.push([304,0,16,65],[304,112,16,68]);}else out.push([304,0,16,180]);
  return out;
};
const manor=(id,name,{exits={},map=[0,0,0],decor='hall',obstacles=[],lights=[[72,48,42],[248,48,42]],interact=[],enter=[],exitRules={},safe=false,corruption=[]}={})=>({
  id,era:'2026',area:'Blackthorn Manor',name,tone:'manor',floor:map[0],mapX:map[1],mapY:map[2],decor,safe,spawn:[34,126],exits,exitRules,
  obstacles:[...perimeter(exits),...obstacles],lights,interact,enter,corruption,
});

const memoryRoom=(id,era,area,name,weapon,{exits={},decor='archive',safe=false,boss=false,enemies=[],interact=[],exitRules={},lockedExit=null,clearUnlock=false,corruption=[],lights=[[160,48,34]],obstacles=[],enter=[]}={})=>({id,era,area,name,weapon,tone:boss?'boss':'echo',decor,safe,boss,spawn:[34,126],exits,exitRules,lockedExit,clearUnlock,obstacles:[...perimeter(exits),...obstacles],lights,corruption,enemies,interact,enter});

const ROOMS={
  'manor-vestibule':manor('manor-vestibule','Vestibule',{map:[0,0,1],decor:'vestibule',exits:{right:'manor-hall',up:'manor-dining'},exitRules:{up:{requiresSlice:true,message:['THE INNER DOOR HAS NO KEYHOLE','After the first memory, a handle appears where the wood was seamless.']}},obstacles:[[142,62,36,16],[80,34,42,10]],interact:[
    {id:'letter',x:92,y:119,w:14,h:10,label:'Unsigned letter',kind:'note',once:true,text:['The envelope carries Elena’s address.','The handwriting is hers.','Inside: “Do not let the house remember you alone.”']},
    {id:'front-register',x:214,y:112,w:13,h:9,label:'Visitor register',kind:'note',text:['The last signed visitor arrived in 1987.','Three later pages contain dates but no names.','One date is tomorrow.']}
  ],enter:['BLACKTHORN MANOR · 2026','Rain presses against windows that disagree about their own age.']}),

  'manor-hall':manor('manor-hall','Great Hall',{map:[0,1,1],decor:'hall',exits:{left:'manor-vestibule',right:'manor-gallery',up:'manor-library',down:'manor-stairwell'},exitRules:{up:{requiresSlice:true,message:['THE LIBRARY DOOR IS PAINTED SHUT','The paint is older than the door beneath it.']},down:{requiresSlice:true,message:['NO STAIR DESCENDS HERE','Not yet.']}},obstacles:[[132,28,56,22],[132,110,56,18]],interact:[
    {id:'portrait-gap',x:154,y:44,w:14,h:18,label:'Blank portrait',kind:'note',text:['A brass plate remains below an empty frame.','The plate has been polished so often its name is gone.']},
    {id:'hall-clock',x:245,y:58,w:16,h:32,label:'Stopped clock',kind:'note',text:['The longcase clock has no hands.','Its pendulum swings anyway.','Every seventh pass makes the staircase creak.']}
  ],enter:['GREAT HALL','Four portraits. Five nameplates.']}),

  'manor-gallery':manor('manor-gallery','Portrait Gallery',{map:[0,2,1],decor:'gallery',exits:{left:'manor-hall'},obstacles:[[58,36,24,38],[111,36,24,38],[164,36,24,38],[217,36,24,38]],lights:[[40,60,35],[280,60,35]],interact:[
    {id:'memory-spine-iii',x:253,y:104,w:20,h:28,label:'Memory Spine',kind:'anchor',text:['The object is warm despite the cold room.','A date surfaces without context: 1349.','A bell rings somewhere that has no bell.']}
  ],enter:['PORTRAIT GALLERY','Something behind the last frame is breathing in time with the storm.']}),

  'manor-gallery-after':manor('manor-gallery-after','Portrait Gallery · Altered',{map:[0,2,1],decor:'gallery',exits:{left:'manor-hall',up:'manor-east-corridor'},obstacles:[[58,36,24,38],[111,36,24,38],[164,36,24,38],[217,36,24,38]],lights:[[40,60,35],[280,60,35],[158,108,28]],interact:[
    {id:'ysabel-portrait',x:217,y:36,w:24,h:38,label:'Restored portrait',kind:'note',text:['The fourth portrait now contains a woman holding an axe.','Brass plate: YSABEL THORNE · “She kept the bell silent.”','Elena remembers seeing this portrait as a child. She also remembers that it was never here.']},
    {id:'gallery-seam',x:150,y:112,w:18,h:18,label:'Architectural seam',kind:'note',text:['A hairline crack outlines a doorway that should open into the exterior wall.','Cold air leaks through it.','The house has made room for a memory.']}
  ],enter:['BLACKTHORN MANOR · 2026','The storm has stopped. The house has added one memory.']}),

  'manor-library':manor('manor-library','Library',{map:[0,1,0],decor:'library',safe:true,exits:{left:'manor-dining',right:'manor-east-corridor',down:'manor-hall'},obstacles:[[46,30,22,92],[252,30,22,92],[112,62,96,24]],lights:[[160,48,58],[74,128,30]],interact:[
    {id:'estate-plan',x:144,y:69,w:30,h:16,label:'Estate survey',kind:'map',once:true,text:['The survey is dated 1909.','Rooms are drawn where the exterior dimensions cannot contain them.','Elena marks the accessible floors. The Manor Map is now available with M.']},
    {id:'library-hearth',x:58,y:132,w:20,h:12,label:'Banked hearth',kind:'safe',text:['The coals are warm.','For a moment Blackthorn feels like an ordinary inherited house.']},
    {id:'marginalia-1909',x:251,y:58,w:12,h:16,label:'Annotated folio',kind:'note',text:['“Never map the house twice on the same day.”','A second hand has written beneath it:','“It notices the comparison.”']}
  ],enter:['THE LIBRARY','Shelves follow the wall farther than the room does.']}),

  'manor-dining':manor('manor-dining','Dining Room',{map:[0,0,0],decor:'dining',exits:{left:'manor-winter-garden',right:'manor-library',down:'manor-vestibule'},obstacles:[[92,68,136,42],[52,36,36,14],[234,36,30,14]],interact:[
    {id:'blackthorn-key',x:245,y:42,w:12,h:8,label:'Blackthorn key',kind:'key',flag:'key:blackthorn',once:true,text:['A black iron key rests in a drawer lined with newspaper from 1956.','The label reads: UPPER FLOOR.','Its teeth are freshly cut.']},
    {id:'place-setting-nine',x:152,y:78,w:14,h:10,label:'Ninth place setting',kind:'note',text:['The table is set for eight.','A ninth plate appears only in the silver serving dome.','When Elena looks directly at the table, there are eight again.']}
  ],enter:['DINING ROOM','Dust covers everything except one place setting.']}),

  'manor-winter-garden':manor('manor-winter-garden','Winter Garden',{map:[0,-1,0],decor:'garden',exits:{right:'manor-dining',down:'manor-servants-passage'},exitRules:{down:{requiresFlags:['shortcut:garden-service'],message:['A SERVICE GRILLE IS BOLTED FROM THIS SIDE','The bolt is hidden behind dead ivy.']}},obstacles:[[65,48,26,30],[121,92,28,34],[218,50,26,46]],lights:[[52,38,32],[264,38,32]],interact:[
    {id:'garden-grille',x:148,y:142,w:22,h:12,label:'Service grille',kind:'shortcut',flag:'shortcut:garden-service',once:true,text:['Elena cuts back the ivy and draws a rusted bolt.','A narrow service passage opens beneath the glasshouse.','SHORTCUT UNLOCKED.']},
    {id:'black-thorn-tree',x:211,y:62,w:34,h:48,label:'Black thorn tree',kind:'note',text:['The tree has no soil beneath it.','Its roots vanish between floor tiles.','A brass tag reads 1790 — replaced in 1917 — replaced in 1956.']}
  ],enter:['WINTER GARDEN','Rain taps glass that looks out on a night sky with the wrong stars.']}),

  'manor-east-corridor':manor('manor-east-corridor','East Corridor',{map:[0,2,0],decor:'corridor',exits:{left:'manor-library',right:'manor-chapel',down:'manor-gallery'},obstacles:[[102,28,18,78],[202,76,18,74]],lights:[[58,50,32],[268,126,32]],interact:[
    {id:'corridor-photograph',x:132,y:44,w:14,h:12,label:'Framed photograph',kind:'note',text:['Blackthorn Manor, 1956.','A woman stands in the east window.','The east wing was not built until 1963.']}
  ],enter:['EAST CORRIDOR','The corridor turns once. The floorplan says it should turn twice.']}),

  'manor-chapel':manor('manor-chapel','Private Chapel',{map:[0,3,0],decor:'chapel',exits:{left:'manor-east-corridor'},obstacles:[[76,88,52,18],[192,88,52,18],[140,36,40,24]],lights:[[160,46,55]],interact:[
    {id:'chapel-seal',x:149,y:44,w:22,h:16,label:'Empty reliquary',kind:'mark',flag:'mark:chapel',once:true,text:['The reliquary contains no saint.','Inside the lid: “A house is a body that remembers its wounds.”','A three-pronged mark matches the seam in the Portrait Gallery.']},
    {id:'chapel-kneeler',x:151,y:119,w:18,h:12,label:'Kneeler',kind:'note',text:['The cushion is indented as if someone just stood.','Wax beneath it contains fingerprints too small to belong to an adult.']}
  ],enter:['PRIVATE CHAPEL','No religious symbol survives intact. Only their outlines remain.']}),

  'manor-stairwell':manor('manor-stairwell','Central Stairwell',{map:[0,1,2],decor:'stairwell',exits:{up:'manor-upper-landing',down:'manor-cellar'},exitRules:{up:{requiresFlags:['key:blackthorn'],message:['THE UPPER DOOR IS LOCKED','A black iron escutcheon surrounds the keyway.']},down:{requiresFlags:['key:service'],message:['THE BASEMENT STAIR IS CHAINED','A service key should release the wall catch.']}},obstacles:[[60,44,60,20],[200,116,60,20],[136,64,48,52]],lights:[[160,38,34]],interact:[
    {id:'stair-scratches',x:140,y:76,w:12,h:24,label:'Banister scratches',kind:'note',text:['Height marks climb the banister.','The names beside them have been scraped away.','One line at Elena’s childhood height is dated 1987.']}
  ],enter:['CENTRAL STAIRWELL','One flight rises. Another descends behind a chained door.']}),

  'manor-servants-passage':manor('manor-servants-passage','Servants’ Passage',{map:[0,-1,1],decor:'service',exits:{up:'manor-winter-garden',right:'manor-vestibule',down:'manor-cellar'},exitRules:{up:{requiresFlags:['shortcut:garden-service']},right:{requiresFlags:['shortcut:service-vestibule'],message:['The panel has no handle on this side.']}},obstacles:[[70,42,34,16],[120,100,60,16],[236,52,30,38]],lights:[[36,56,22]],interact:[
    {id:'service-panel',x:278,y:98,w:18,h:14,label:'Hidden panel',kind:'shortcut',flag:'shortcut:service-vestibule',once:true,text:['A thumb latch releases behind the wallpaper.','The panel opens into the Vestibule coat recess.','SHORTCUT UNLOCKED.']},
    {id:'servant-roster',x:74,y:48,w:18,h:10,label:'Servant roster',kind:'note',text:['Eight staff names are written in ink.','A ninth duty column has no corresponding person.','Every entry in it says: REMEMBER THE ROOMS.']}
  ],enter:['SERVANTS’ PASSAGE','The walls are too thin. Voices move inside them.']}),

  'manor-upper-landing':manor('manor-upper-landing','Upper Landing',{map:[1,1,0],decor:'landing',exits:{left:'manor-elena-room',right:'manor-study',up:'manor-attic-stairs',down:'manor-stairwell'},obstacles:[[128,48,64,18],[140,116,40,22]],lights:[[48,44,34],[270,44,34]],interact:[
    {id:'landing-portrait',x:142,y:52,w:36,h:12,label:'Family photograph',kind:'note',text:['Nine people stand on these stairs in 1917.','The caption lists eight names.','The ninth face has been cut out without damaging the wallpaper behind it.']}
  ],enter:['UPPER LANDING','The wallpaper pattern stops whenever Elena looks directly at it.']}),

  'manor-elena-room':manor('manor-elena-room','Elena’s Room',{map:[1,0,0],decor:'bedroom',safe:true,exits:{right:'manor-upper-landing'},obstacles:[[58,48,90,44],[210,40,42,28],[210,112,50,18]],lights:[[80,118,42]],interact:[
    {id:'elena-bed',x:72,y:70,w:62,h:22,label:'Rest',kind:'safe',text:['Elena sits without sleeping.','Her pulse slows. The house moves somewhere beyond the wall.']},
    {id:'childhood-box',x:218,y:116,w:20,h:12,label:'Childhood box',kind:'note',text:['Inside: a red marble, a hotel key, and a drawing of Blackthorn.','The drawing shows the Memory Vault beneath the house.','Elena does not remember making it.']}
  ],enter:['ELENA’S ROOM','Her suitcase is open. She is certain she left it closed.']}),

  'manor-study':manor('manor-study','Blackthorn Study',{map:[1,2,0],decor:'study',exits:{left:'manor-upper-landing',right:'manor-guest-wing',down:'manor-mirror-room'},obstacles:[[52,48,64,22],[184,68,86,36],[70,118,46,16]],lights:[[62,42,35],[248,46,30]],interact:[
    {id:'service-key',x:83,y:52,w:12,h:8,label:'Service key',kind:'key',flag:'key:service',once:true,text:['A narrow brass key is taped beneath the desk drawer.','The tag says BOILER / ARCHIVE.','Someone has added in pencil: DO NOT TAKE IT BELOW ALONE.']},
    {id:'study-dictaphone',x:214,y:76,w:18,h:12,label:'Dead recorder',kind:'note',text:['The recorder has no batteries.','Pressing PLAY produces Elena’s voice:','“If you hear this before I record it, leave the root door closed.”']}
  ],enter:['BLACKTHORN STUDY','Every drawer is locked except the one that should be.']}),

  'manor-guest-wing':manor('manor-guest-wing','Guest Wing',{map:[1,3,0],decor:'guest',exits:{left:'manor-study',down:'manor-nursery'},obstacles:[[72,44,62,34],[188,44,62,34],[130,112,60,18]],lights:[[70,120,26],[250,120,26]],interact:[
    {id:'guest-book',x:146,y:116,w:18,h:10,label:'Guest book',kind:'note',text:['The guest book begins in 1790 and ends in 1987.','Several names recur decades apart in identical handwriting.','One surname has been replaced everywhere by a rectangular blank.']}
  ],enter:['GUEST WING','Two bedrooms. Three doors.']}),

  'manor-nursery':manor('manor-nursery','Nursery',{map:[1,3,1],decor:'nursery',exits:{up:'manor-guest-wing',left:'manor-mirror-room'},obstacles:[[62,48,50,28],[214,48,32,40],[132,104,54,22]],lights:[[160,48,30]],interact:[
    {id:'nursery-mobile',x:154,y:54,w:14,h:16,label:'Paper mobile',kind:'note',text:['Eight paper houses circle an empty hook.','Each house has one room shaded black.','The shaded rooms match the places Elena has visited tonight.']}
  ],enter:['NURSERY','A music box turns without playing.']}),

  'manor-mirror-room':manor('manor-mirror-room','Mirror Room',{map:[1,2,1],decor:'mirror',exits:{up:'manor-study',right:'manor-nursery'},obstacles:[[48,40,18,80],[254,40,18,80],[126,72,68,20]],lights:[[160,42,38]],corruption:[[112,40,96,90]],interact:[
    {id:'mirror-trial',x:143,y:78,w:34,h:12,label:'Covered mirror',kind:'perception-trial',text:['Under the cloth, Elena’s reflection arrives half a second late.','The glass can be used to descend through controlled layers of unreliable perception.']}
  ],enter:['MIRROR ROOM','The air here reflects sound before light.']}),

  'manor-attic-stairs':manor('manor-attic-stairs','Attic Stair',{map:[1,1,1],decor:'stairwell',exits:{down:'manor-upper-landing',up:'manor-attic'},exitRules:{up:{requiresPhase2Future:true,message:['THE ATTIC DOOR HAS BEEN SEALED FROM ABOVE','Black thread has been stitched through the frame. The house is saving this room for later.']}},obstacles:[[78,112,60,16],[120,88,60,16],[162,64,60,16]],lights:[[226,44,24]],interact:[
    {id:'attic-thread',x:148,y:26,w:24,h:12,label:'Black thread',kind:'note',text:['The thread passes through wood without puncturing it.','Touching it produces the smell of rain on Roman stone.']}
  ],enter:['ATTIC STAIR','The top step is warm.']}),

  'manor-attic':manor('manor-attic','Sealed Attic',{map:[1,1,2],decor:'attic',exits:{down:'manor-attic-stairs'},obstacles:[[52,48,48,32],[210,56,54,30],[126,108,72,24]],lights:[[160,38,22]],enter:['SEALED ATTIC','This room belongs to a later memory.']}),

  'manor-cellar':manor('manor-cellar','Wine Cellar',{map:[-1,0,0],decor:'cellar',exits:{up:'manor-stairwell',left:'manor-servants-passage',right:'manor-boiler'},exitRules:{left:{requiresFlags:['key:service']}},obstacles:[[60,48,24,84],[116,48,24,84],[184,48,24,84],[240,48,24,84]],lights:[[36,130,24]],interact:[
    {id:'cellar-wall',x:270,y:70,w:16,h:26,label:'New masonry',kind:'note',text:['A section of wall uses mortar less than a week old.','Behind it, something taps four times.','Then five.']}
  ],enter:['WINE CELLAR','The bottles are labeled by year. Several years do not exist.']}),

  'manor-boiler':manor('manor-boiler','Boiler Room',{map:[-1,1,0],decor:'boiler',exits:{left:'manor-cellar',right:'manor-family-archive'},obstacles:[[62,50,72,66],[204,44,52,76],[145,105,38,18]],lights:[[164,42,28]],interact:[
    {id:'boiler-pressure',x:92,y:56,w:18,h:14,label:'Pressure gauge',kind:'note',text:['The needle reads 404 despite a scale that ends at 300.','When Elena blinks, it returns to 82.']}
  ],enter:['BOILER ROOM','Pipes pulse like a sleeping throat.']}),

  'manor-family-archive':manor('manor-family-archive','Family Archive',{map:[-1,2,0],decor:'archive',exits:{left:'manor-boiler',right:'manor-memory-vault'},exitRules:{right:{requiresFlags:['map:estate','mark:chapel','mark:lineage'],message:['THE INNER ARCHIVE REMAINS SEALED','Three brass recesses wait for ideas, not keys: the house, the wound, the lineage.']}},obstacles:[[48,34,28,100],[96,34,28,100],[196,34,28,100],[244,34,28,100]],lights:[[160,46,28]],interact:[
    {id:'lineage-ledger',x:146,y:104,w:28,h:16,label:'Lineage ledger',kind:'mark',flag:'mark:lineage',once:true,text:['The Blackthorn ledger records births, marriages and deaths for four centuries.','Every generation contains one person whose name is represented by a blank ruled line.','The blanks form a perfect vertical column through the book.']},
    {id:'archive-index',x:145,y:48,w:30,h:14,label:'Card index',kind:'note',text:['The cards are sorted by event, not person.','FIRE. FLOOD. WAR. DISAPPEARANCE. RETURN.','A final drawer is labeled: UNREMEMBERED.']}
  ],enter:['FAMILY ARCHIVE','Paper survives here better than names.']}),

  'manor-memory-vault':manor('manor-memory-vault','Memory Vault',{map:[-1,3,0],decor:'vault',safe:true,exits:{left:'manor-family-archive',down:'manor-root-door'},obstacles:[[50,48,34,34],[236,48,34,34],[122,50,76,22],[118,112,84,20]],lights:[[160,84,58]],interact:[
    {id:'memory-index',x:143,y:58,w:34,h:20,label:'Memory index',kind:'phase2-finale',once:true,text:['Eight recesses surround a ninth empty socket.','The first holds the memory of Ysabel Thorne.','The other seven are cold, but not empty.','Blackthorn Manor is not a container for the memories. It is the index that keeps them connected.']},
    {id:'combat-imprint',x:94,y:94,w:18,h:14,label:'Weapon imprint',kind:'combat-trial',text:['A shallow brass relief contains the outline of weapons from different centuries.','The Memory Vault can reconstruct their handling without pretending Elena has mastered them.']},
    {id:'sigil-lattice',x:208,y:94,w:18,h:14,label:'Sigil lattice',kind:'sigil-trial',text:['Twelve grooves form three families around the brass plate.','Blackthorn does not teach spells. It reconstructs a grammar: VERB + SCHOOL + INTENSITY.','The lattice can calibrate that grammar without binding it to one century.']},
    {id:'spine-salt-stars',x:62,y:118,w:18,h:14,label:'Salt-star spine',kind:'memory-anchor',target:'echo-salt-shore',flag:'anchor:salt-stars',requiresFlags:['chapter:saint-orren-complete'],weapon:'bronze-star-spear',text:['A crystal spine tastes of salt without touching the tongue.','1198 BCE. A navigator maps stars that no longer exist.','NARA KESH remembers the sea withdrawing from a city that was never coastal.']},
    {id:'spine-last-census',x:242,y:118,w:18,h:14,label:'Census spine',kind:'memory-anchor',target:'echo-census-gate',flag:'anchor:last-census',requiresFlags:['chapter:salt-stars-complete'],weapon:'census-gladius',text:['Wax seals bloom across a strip of blackened vellum.','395 CE. The empire is counting people faster than it can remember them.','MARCUS AELIAN records citizens whose names vanish between one line and the next.']},
    {id:'spine-anatomy-shadow',x:274,y:80,w:18,h:14,label:'Shadow spine',kind:'memory-anchor',target:'echo-anatomy-theatre',flag:'anchor:anatomy-shadow',requiresFlags:['chapter:last-census-complete'],weapon:'anatomist-rapier',text:['A silvered sliver reflects the room one heartbeat late.','1587. An anatomist discovers a shadow that belongs to no body.','LUCIA VARETTI cuts toward an absence that has learned her outline.']},
    {id:'spine-house-name',x:44,y:78,w:16,h:13,label:'Architect spine',kind:'memory-anchor',target:'echo-1790-approach',flag:'anchor:house-name',requiresFlags:['chapter:anatomy-shadow-complete'],weapon:'duelling-sabre',text:['A folded plan has been cut into a spine of blackened vellum.','1790. Eleanor Blackthorn rebuilds a house around a room that cannot be surveyed.','The paper writes her name before she signs it.']},
    {id:'spine-mud-remembers',x:86,y:78,w:16,h:13,label:'Mud spine',kind:'memory-anchor',target:'echo-1917-trench',flag:'anchor:mud-remembers',requiresFlags:['chapter:house-name-complete'],weapon:'trench-club',text:['A trench map is stiff with dried earth that smells newly wet.','1917. Elias Ward discovers routes that exist only while two people remember them.','Someone has crossed out an entire company without changing the casualty total.']},
    {id:'spine-broadcast-eleven',x:218,y:78,w:16,h:13,label:'Broadcast spine',kind:'memory-anchor',target:'echo-1956-gate',flag:'anchor:broadcast-eleven',requiresFlags:['chapter:mud-remembers-complete'],weapon:'heavy-torch',text:['A Bakelite tuning knob clicks between ten numbered positions and an unmarked eleventh.','1956. Naomi Pike receives testimony from voices no station admits broadcasting.','The carrier wave contains a memory of Blackthorn Manor.']},
    {id:'spine-tape-zero',x:280,y:140,w:16,h:13,label:'Tape spine',kind:'memory-anchor',target:'echo-1987-drive',flag:'anchor:tape-zero',requiresFlags:['chapter:broadcast-eleven-complete'],weapon:'pry-bar',text:['A strip of magnetic tape begins before its own leader.','1987. Theo Voss records restoration work while Blackthorn edits itself between cuts.','Frame zero contains a person standing where the camera had not yet pointed.']},
    {id:'vault-lamp',x:151,y:120,w:18,h:10,label:'Memory lamp',kind:'safe',text:['The lamp burns without fuel.','Its light makes every remembered room feel equally near.']}
  ],enter:['MEMORY VAULT','The house stops creaking. Something below it begins.']}),

  'manor-root-door':manor('manor-root-door','Root Door',{map:[-1,3,1],decor:'root',exits:{up:'manor-memory-vault'},obstacles:[[80,42,160,24],[112,96,96,42]],lights:[[160,54,24]],corruption:[[88,82,144,68]],interact:[
    {id:'root-door-seal',x:135,y:104,w:50,h:26,label:'Root door',kind:'final-entry',text:['The door is not wood. It only resembles wood while Elena looks at it.','All nine depressions are warm.','The eight recovered lives are not keys. They are witnesses.']}
  ],enter:['ROOT DOOR','Not a destination. A promise the house is making to something beneath it.']}),

  'combat-imprint-arena':{
    id:'combat-imprint-arena',era:'2026',area:'Memory Vault · Controlled Imprint',name:'Weapon Memory',tone:'echo',spawn:[42,128],combatTrial:true,
    exits:{},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,180],[304,0,16,180],[136,65,48,18],[72,38,24,22],[224,112,24,22]],lights:[[160,42,46],[48,130,26]],corruption:[],
    enemies:[{type:'hollow-drifter',x:226,y:126},{type:'pale-listener',x:238,y:58},{type:'wall-witness',x:92,y:54}],
    interact:[{id:'combat-return',x:24,y:132,w:16,h:18,label:'End imprint',kind:'combat-return',text:['The brass relief cools.','The reconstructed weapons leave muscle-memory behind, not expertise.']}],
    enter:['CONTROLLED WEAPON IMPRINT','Blackthorn reconstructs pressure, timing and recoil from several memories at once.','Q / E or WEAPON changes the equipped weapon. Hold V / HEAVY, then release, to charge a heavy attack.']
  },

  'sigil-lattice-arena':{
    id:'sigil-lattice-arena',era:'2026',area:'Memory Vault · Sigil Lattice',name:'Grammar Chamber',tone:'echo',spawn:[34,130],sigilTrial:true,
    exits:{},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,180],[304,0,16,180],[134,68,52,18]],lights:[[160,42,50],[48,130,28],[270,130,28]],corruption:[[118,92,84,52]],
    enemies:[{type:'hollow-drifter',x:226,y:126},{type:'pale-listener',x:242,y:58}],
    interact:[
      {id:'lattice-mind',x:66,y:48,w:22,h:20,label:'Veiled script',kind:'sigil-puzzle',requiredSigil:'reveal-mind-i',requiredIntensity:2,text:['Letters exist only in the reflection of the brass.','The inscription describes seeing without trusting sight.','A MIND formula should reveal the hidden layer.']},
      {id:'lattice-flesh',x:146,y:118,w:28,h:18,label:'Living knot',kind:'sigil-puzzle',requiredSigil:'purge-flesh-i',requiredIntensity:2,text:['Root and tendon have been remembered as the same material.','The knot is not wounded. It is contaminated.','A FLESH formula should separate what does not belong.']},
      {id:'lattice-void',x:236,y:48,w:22,h:20,label:'Null aperture',kind:'sigil-puzzle',requiredSigil:'bind-void-i',requiredIntensity:3,text:['The aperture is less a hole than an instruction to continue falling.','Its border refuses to remain in one place.','A strong VOID binding may force it to keep an edge.']},
      {id:'sigil-return',x:24,y:132,w:16,h:18,label:'Collapse lattice',kind:'sigil-return',text:['The twelve grooves cool into one readable grammar.']}
    ],
    enter:['CONTROLLED SIGIL LATTICE','Twelve formulas. Three schools. Three intensities.','T cycles formulas · F opens the Sigil Codex · R casts. Use the Codex to set intensity.']
  },

  'echo-priory-gate':{
    id:'echo-priory-gate',era:'1349',area:'Memory Echo · Saint Orren',name:'Quarantine Gate',tone:'echo',decor:'priory',spawn:[35,126],weapon:'woodsman-axe',
    exits:{right:'echo-infirmary-court'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,180],[304,0,16,65],[304,112,16,68],[120,94,55,13],[210,40,22,55]],lights:[[52,52,42]],corruption:[[230,88,58,60]],
    enemies:[{type:'plague-hollow',x:224,y:126}],interact:[
      {id:'quarantine-mark',x:78,y:52,w:12,h:14,label:'Quarantine mark',kind:'note',text:['The painted mark is fresh.','The date beneath it is six days old.','Ysabel remembers painting it. The memory insists she did not.']},
      {id:'prior-order',x:132,y:112,w:16,h:10,label:'Prior’s order',kind:'note',text:['“No burial after sunset. No bell after compline.”','The lower line has been scraped away.','Enough ink remains to read: “Do not answer if it rings itself.”']}
    ],enter:['MEMORY ECHO · 1349','YSABEL THORNE · PRIORY OF SAINT ORREN','The valley has been sealed for nine days. The grave count says twelve. Ysabel remembers twenty-one names.']
  },
  'echo-infirmary-court':{
    id:'echo-infirmary-court',era:'1349',area:'Memory Echo · Saint Orren',name:'Infirmary Court',tone:'echo',decor:'infirmary',spawn:[34,126],weapon:'woodsman-axe',
    exits:{left:'echo-priory-gate',right:'echo-apothecary'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[58,42,70,18],[191,42,72,18],[126,104,68,18]],lights:[[46,52,34],[272,48,30]],corruption:[[130,120,70,35]],
    enemies:[{type:'choir-listener',x:236,y:124}],interact:[
      {id:'infirmary-tally',x:68,y:48,w:18,h:10,label:'Patient tally',kind:'note',text:['Four cots. Seven bowls. Nine names.','Two names are crossed out without any sign of death.','Beside them Ysabel has written: “They did not leave. We stopped having known them.”']},
      {id:'handbell-test',x:238,y:50,w:12,h:12,label:'Covered handbell',kind:'sound-lure',flag:'sound:infirmary',spawnEnemy:'plague-hollow',text:['Ysabel strikes the wrapped bell once.','The cloth kills the note. Something in the corridor turns toward it anyway.','Sound does not need to be heard to be remembered.']}
    ],enter:['INFIRMARY COURT','The sick whisper names to keep them attached to the world.']
  },
  'echo-apothecary':{
    id:'echo-apothecary',era:'1349',area:'Memory Echo · Saint Orren',name:'Apothecary',tone:'echo',decor:'apothecary',spawn:[34,126],weapon:'woodsman-axe',safe:true,
    exits:{left:'echo-infirmary-court',right:'echo-nave'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[58,38,24,92],[112,38,24,92],[238,38,24,92]],lights:[[160,48,44],[278,128,24]],interact:[
      {id:'ingredient-vinegar',x:67,y:64,w:10,h:10,label:'Vinegar flask',kind:'chapter-item',flag:'chapter:vinegar',once:true,text:['Sharp wine vinegar. Enough for a fumigation wash.','Ysabel marks the flask with a knot so she will remember taking it.']},
      {id:'ingredient-myrrh',x:120,y:96,w:10,h:10,label:'Myrrh resin',kind:'chapter-item',flag:'chapter:myrrh',once:true,text:['Myrrh resin, almost gone.','Brother Anselm claimed the smoke made the forgotten visible at the edge of lamplight.']},
      {id:'ysabel-ledger',x:244,y:62,w:12,h:14,label:'Ysabel’s ledger',kind:'note',text:['Ysabel has begun writing every patient twice.','The duplicate entries are not for medicine.','“If one account changes, trust the disagreement.”']},
      {id:'apothecary-rest',x:274,y:130,w:16,h:12,label:'Steady flame',kind:'chapter-safe',text:['The lamp flame does not bend toward the crypt.','Ysabel allows herself one minute to breathe.','This room becomes the memory checkpoint.']}
    ],enter:['APOTHECARY','Herbs remember touch better than people do.']
  },
  'echo-nave':{
    id:'echo-nave',era:'1349',area:'Memory Echo · Saint Orren',name:'Ruined Nave',tone:'echo',decor:'priory',spawn:[34,126],weapon:'woodsman-axe',exits:{left:'echo-apothecary',right:'echo-cloister'},
    obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[82,50,18,72],[150,50,18,72],[218,50,18,72]],lights:[[39,47,34],[278,47,30]],corruption:[[104,120,112,35]],
    enemies:[{type:'wall-witness',x:262,y:54}],interact:[
      {id:'ward-recipe',x:120,y:42,w:12,h:10,label:'Chalk ward',kind:'sigil',sigil:'ward-mind-i',text:['Three marks repeat around the pillar.','WARD. MIND. FIRST INTENSITY.','The pattern does not command reality. It asks attention to hold.']},
      {id:'nave-resonator',x:250,y:116,w:14,h:12,label:'Stone resonator I',kind:'sound-seal',step:1,text:['The first carved basin is shallow enough to sing when struck.','The inscription begins: LOW — PAUSE — HIGH.']},
      {id:'missing-homily',x:156,y:86,w:12,h:10,label:'Torn homily',kind:'note',text:['“A soul may die once. A name may die many times.”','The remainder has been removed with a knife.','The cut follows a shape Ysabel later sees in the bell chamber.']}
    ],enter:['RUINED NAVE','The bell rope moves. There is no bell above it.']
  },
  'echo-cloister':{
    id:'echo-cloister',era:'1349',area:'Memory Echo · Saint Orren',name:'Rain Cloister',tone:'echo',decor:'cloister',spawn:[34,126],weapon:'woodsman-axe',exits:{left:'echo-nave',right:'echo-plague-ward'},
    obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[70,42,18,82],[142,42,18,82],[214,42,18,82]],lights:[[42,48,26],[276,48,26]],corruption:[[18,128,284,28]],
    enemies:[{type:'plague-hollow',x:236,y:124}],interact:[
      {id:'ingredient-juniper',x:91,y:114,w:12,h:10,label:'Juniper bundle',kind:'chapter-item',flag:'chapter:juniper',once:true,text:['Juniper, soaked by rain but still resinous.','The fumigation recipe can now be completed if the other reagents survived.']},
      {id:'cloister-resonator',x:188,y:112,w:14,h:12,label:'Stone resonator II',kind:'sound-seal',step:2,text:['The second basin answers at a higher pitch.','For one breath every Hollow in the cloister faces the same wall.']},
      {id:'grave-map',x:246,y:52,w:14,h:12,label:'Grave map',kind:'note',text:['The cemetery plan marks twenty-one graves.','The burial ledger lists twelve bodies.','Nine rectangles have no names because no one remembers whom they were dug for.']}
    ],enter:['RAIN CLOISTER','Rain strikes the roof in a rhythm the patients have begun to repeat in their sleep.']
  },
  'echo-plague-ward':{
    id:'echo-plague-ward',era:'1349',area:'Memory Echo · Saint Orren',name:'Plague Ward',tone:'echo',decor:'infirmary',spawn:[34,126],weapon:'woodsman-axe',exits:{left:'echo-cloister',right:'echo-ossuary'},exitRules:{right:{requiresFlags:['chapter:ward-mixture'],message:['THE LOWER DOOR BREATHES COLD AIR','Ysabel will not enter the ossuary unwarded. The fumigation mixture is incomplete.']}},
    obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[48,44,64,20],[128,44,64,20],[208,44,64,20],[88,112,144,16]],lights:[[42,44,28],[278,44,28],[160,122,26]],corruption:[[118,70,84,34]],
    enemies:[{type:'plague-hollow',x:70,y:126}],interact:[
      {id:'ward-mixture',x:145,y:112,w:28,h:14,label:'Fumigation brazier',kind:'chapter-mixture',requiresFlags:['chapter:vinegar','chapter:myrrh','chapter:juniper'],flag:'chapter:ward-mixture',text:['Vinegar, myrrh and juniper burn with an oily blue edge.','The ward does not cure plague. It keeps absence from crossing the skin for a little while.']},
      {id:'patient-nine',x:222,y:50,w:18,h:12,label:'Ninth cot',kind:'chapter-secret',flag:'secret:patient-nine',text:['The cot is warm and indented. No patient is visible.','Under the mattress: a wooden token carved “MARA”.','The name means nothing to Ysabel — but Elena feels the memory recoil.']}
    ],enter:['PLAGUE WARD','Nine beds are occupied. Ysabel can only see eight patients.']
  },
  'echo-ossuary':{
    id:'echo-ossuary',era:'1349',area:'Memory Echo · Saint Orren',name:'Ossuary Passage',tone:'echo',decor:'ossuary',spawn:[34,126],weapon:'woodsman-axe',exits:{left:'echo-plague-ward',right:'echo-crypt'},exitRules:{right:{requiresFlags:['chapter:sound-route'],message:['THE STONE ARCH HAS NO OPENING','Three resonators share one memory. The sequence is not complete.']}},
    obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[54,46,46,18],[137,42,46,18],[220,46,46,18]],lights:[[160,38,24]],corruption:[[18,82,284,74]],
    enemies:[{type:'ash-verger',x:220,y:122},{type:'choir-listener',x:112,y:122}],interact:[
      {id:'ossuary-resonator',x:154,y:70,w:14,h:12,label:'Stone resonator III',kind:'sound-seal',step:3,text:['The third basin is almost silent.','When struck after the other two, the wall remembers that it once contained a door.']},
      {id:'bone-tags',x:72,y:58,w:16,h:10,label:'Bone tags',kind:'note',text:['The tags are numbered, never named.','Numbers 13–21 are present. No corresponding bones remain.','Someone kept evidence of people after the bodies — and memories — were gone.']}
    ],enter:['OSSUARY PASSAGE','Every skull faces inward, toward a wall with no door.']
  },
  'echo-crypt':{
    id:'echo-crypt',era:'1349',area:'Memory Echo · Saint Orren',name:'Bell Crypt',tone:'echo',decor:'crypt',spawn:[35,126],weapon:'woodsman-axe',exits:{left:'echo-ossuary',right:'echo-belfry-stairs'},lockedExit:'right',clearUnlock:true,
    obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[55,55,44,15],[139,42,42,15],[222,60,46,15]],lights:[[160,38,26]],corruption:[[18,86,284,72]],
    enemies:[{type:'grave-bearer',x:210,y:124},{type:'choir-listener',x:158,y:82}],interact:[
      {id:'bind-recipe',x:157,y:68,w:12,h:10,label:'Stone seal',kind:'sigil',sigil:'bind-void-i',text:['A cut line interrupts the masonry.','BIND. VOID. FIRST INTENSITY.','The seal holds only what has already crossed the threshold.']},
      {id:'clapper-record',x:244,y:72,w:14,h:10,label:'Clapper record',kind:'note',text:['“Clapper removed by order of Ysabel Thorne.”','Below it: “Not to silence the bell. To deny it a tongue.”','The final signature is Ysabel’s — dated tomorrow.']}
    ],enter:['BELL CRYPT','Something below the floor answers each footstep one beat late.']
  },
  'echo-belfry-stairs':{
    id:'echo-belfry-stairs',era:'1349',area:'Memory Echo · Saint Orren',name:'Belfry Stair',tone:'echo',decor:'stairwell',spawn:[34,126],weapon:'woodsman-axe',exits:{left:'echo-crypt',right:'echo-bell-chamber'},
    obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[76,126,76,8],[110,100,76,8],[144,74,76,8],[178,48,76,8]],lights:[[252,42,26],[64,132,22]],corruption:[[198,26,80,126]],
    enemies:[{type:'ash-verger',x:232,y:94}],interact:[
      {id:'ysabel-confession',x:198,y:57,w:16,h:10,label:'Ysabel’s confession',kind:'note',text:['“I have heard the bell inside my own memory.”','“It rings whenever I try to recall the faces of the nine.”','“If I fail, remove the tongue again. Do not trust me if I ask you to restore it.”']}
    ],enter:['BELFRY STAIR','Each step upward makes the valley below harder to remember.']
  },
  'echo-bell-chamber':{
    id:'echo-bell-chamber',era:'1349',area:'Memory Echo · Saint Orren',name:'Bell Chamber',tone:'boss',decor:'belfry',spawn:[42,128],weapon:'woodsman-axe',boss:true,exits:{left:'echo-belfry-stairs'},
    obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,180],[304,0,16,180],[128,26,64,18]],lights:[[160,54,38]],corruption:[[20,82,280,74]],
    enemies:[{type:'bell-boss',x:230,y:112,boss:true}],interact:[{id:'bell-frame',x:149,y:34,w:22,h:22,label:'Bell frame',kind:'bell',text:['An iron frame hangs from the ceiling.','There is no bell. The room rings anyway.']}],enter:['BOSS MEMORY · THE BELL WITHOUT A TONGUE','Silence is its camouflage. Make the room remember sound.','When it has almost no shape left, the frame itself must be rung.']
  },

  // CHAPTER II · 1198 BCE · SALT UNDER THE STARS · NARA KESH
  'echo-salt-shore':{id:'echo-salt-shore',era:'1198 BCE',area:'Memory Echo · Asterion Salt City',name:'Drowned Shore',tone:'echo',decor:'salt',spawn:[34,126],weapon:'bronze-star-spear',exits:{right:'echo-salt-steps'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,180],[304,0,16,65],[304,112,16,68],[92,104,54,12],[206,54,34,42]],lights:[[54,52,38]],corruption:[[228,88,60,58]],enemies:[{type:'salt-wretch',x:232,y:126}],interact:[{id:'c2-tide-tablet',x:86,y:50,w:14,h:12,label:'Tide tablet',kind:'note',text:['The tablet lists tides for a sea that lies three days away.','The final line reads: “When the seventh star drowns, follow the salt inland.”']},{id:'c2-secret-shell',x:245,y:92,w:12,h:10,label:'Black shell',kind:'memory-secret',chapter:'c2',flag:'secret:black-shell',achievement:'black-shell',text:['The shell is dry inside.','When Nara holds it to her ear, she hears a child reciting a name Elena knows from Blackthorn.']}],enter:['MEMORY ECHO · 1198 BCE','NARA KESH · ASTERION SALT CITY','The sea has withdrawn overnight. Salt remains in constellations across the stone.']},
  'echo-salt-steps':{id:'echo-salt-steps',era:'1198 BCE',area:'Memory Echo · Asterion Salt City',name:'Salt Steps',tone:'echo',decor:'salt',spawn:[34,126],weapon:'bronze-star-spear',exits:{left:'echo-salt-shore',right:'echo-star-court'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[72,124,52,8],[108,99,52,8],[144,74,52,8],[180,49,52,8]],lights:[[270,44,28]],enemies:[{type:'salt-wretch',x:180,y:74}],interact:[{id:'c2-star-key',x:205,y:46,w:12,h:10,label:'Star shard',kind:'memory-item',flag:'c2:star-shard',text:['A bronze shard is punched with seven tiny holes.','Held to the sky, six align with stars. The seventh points below the horizon.']}],enter:['SALT STEPS','Every stair is crusted white except the ones no one remembers climbing.']},
  'echo-star-court':{id:'echo-star-court',era:'1198 BCE',area:'Memory Echo · Asterion Salt City',name:'Star Court',tone:'echo',decor:'observatory',spawn:[34,126],weapon:'bronze-star-spear',exits:{left:'echo-salt-steps',right:'echo-brine-cistern'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[136,54,48,48]],lights:[[160,62,44],[42,126,22]],corruption:[[202,28,78,54]],enemies:[{type:'starved-navigator',x:234,y:122}],interact:[{id:'c2-lens-one',x:73,y:54,w:16,h:16,label:'Dawn lens',kind:'memory-sequence',chapter:'c2',step:1,total:3,completeFlag:'c2:alignment',text:['The first salt lens catches the eastern star.','Its groove is marked DAWN — ZENITH — DROWNED.']},{id:'c2-map',x:242,y:48,w:14,h:10,label:'Sky map',kind:'note',text:['Nara has scratched one constellation out and drawn it again beneath the horizon.','The erased shape resembles Blackthorn Manor seen from above.']}],enter:['STAR COURT','Bronze sighting arms point inland, away from every known star.']},
  'echo-brine-cistern':{id:'echo-brine-cistern',era:'1198 BCE',area:'Memory Echo · Asterion Salt City',name:'Brine Cistern',tone:'echo',decor:'cistern',spawn:[34,126],weapon:'bronze-star-spear',safe:true,exits:{left:'echo-star-court',right:'echo-tide-archive'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[65,52,52,44],[204,52,52,44]],lights:[[160,126,34]],corruption:[[128,34,64,62]],enemies:[],interact:[{id:'c2-safe',x:148,y:128,w:22,h:12,label:'Fresh-water jar',kind:'memory-safe',text:['One sealed jar contains fresh water.','Nara drinks and the memory stops tasting of salt.']},{id:'c2-brine-note',x:78,y:58,w:12,h:10,label:'Cistern marks',kind:'note',text:['Seven waterlines descend the wall.','The newest line is above the ceiling.','Someone has been measuring a flood that moves upward.']}],enter:['BRINE CISTERN','The water reflects stars even with the roof intact.']},
  'echo-tide-archive':{id:'echo-tide-archive',era:'1198 BCE',area:'Memory Echo · Asterion Salt City',name:'Archive of Tides',tone:'echo',decor:'archive',spawn:[34,126],weapon:'bronze-star-spear',exits:{left:'echo-brine-cistern',right:'echo-zenith-gallery'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[54,36,26,96],[110,36,26,96],[218,36,26,96]],lights:[[164,44,32]],enemies:[{type:'glass-scarab',x:242,y:126},{type:'starved-navigator',x:176,y:70}],interact:[{id:'c2-lens-two',x:153,y:104,w:16,h:16,label:'Zenith lens',kind:'memory-sequence',chapter:'c2',step:2,total:3,completeFlag:'c2:alignment',text:['The second lens turns only when the bronze shard is nearby.','The light climbs to the ceiling and stops at an impossible noon.']},{id:'c2-captain-log',x:225,y:51,w:12,h:10,label:'Navigator log',kind:'note',text:['“We did not discover Asterion. We found its absence and built around it.”','The last symbol is the same blank vertical stroke found in the Blackthorn lineage ledger.']}],enter:['ARCHIVE OF TIDES','Clay remembers water after water has forgotten clay.']},
  'echo-zenith-gallery':{id:'echo-zenith-gallery',era:'1198 BCE',area:'Memory Echo · Asterion Salt City',name:'Zenith Gallery',tone:'echo',decor:'observatory',spawn:[34,126],weapon:'bronze-star-spear',exits:{left:'echo-tide-archive',right:'echo-sacrifice-vault'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[76,44,18,84],[151,38,18,90],[226,44,18,84]],lights:[[160,40,50]],corruption:[[100,116,120,34]],enemies:[{type:'salt-priest',x:234,y:120}],interact:[{id:'c2-lens-three',x:151,y:74,w:16,h:16,label:'Drowned lens',kind:'memory-sequence',chapter:'c2',step:3,total:3,completeFlag:'c2:alignment',text:['The final lens points below the floor.','Salt lines flare into a constellation whose missing star is the room itself.']}],enter:['ZENITH GALLERY','The observatory has no roof. Nara can still feel one above her.']},
  'echo-sacrifice-vault':{id:'echo-sacrifice-vault',era:'1198 BCE',area:'Memory Echo · Asterion Salt City',name:'Offering Vault',tone:'echo',decor:'crypt',spawn:[34,126],weapon:'bronze-star-spear',exits:{left:'echo-zenith-gallery',right:'echo-asterion-bridge'},exitRules:{right:{requiresFlags:['c2:alignment'],message:['THE BRIDGE HAS NO HORIZON','Three salt lenses must agree on where the drowned star belongs.']}},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[58,48,42,20],[138,48,42,20],[218,48,42,20]],lights:[[160,124,28]],corruption:[[18,80,284,76]],enemies:[{type:'brine-husk',x:232,y:124},{type:'salt-wretch',x:90,y:124}],interact:[{id:'c2-offering',x:146,y:48,w:24,h:12,label:'Salt effigy',kind:'note',text:['The effigy has no face, only a smooth place where one should be.','Nara has written beneath it: “We offered memory because the sea asked for names, not blood.”']}],enter:['OFFERING VAULT','The city kept its dead dry. It did not keep them remembered.']},
  'echo-asterion-bridge':{id:'echo-asterion-bridge',era:'1198 BCE',area:'Memory Echo · Asterion Salt City',name:'Drowned-Star Bridge',tone:'echo',decor:'bridge',spawn:[34,126],weapon:'bronze-star-spear',exits:{left:'echo-sacrifice-vault',right:'echo-salt-sanctum'},lockedExit:'right',clearUnlock:true,obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[92,62,136,18]],lights:[[160,52,34]],corruption:[[88,88,144,60]],enemies:[{type:'salt-priest',x:222,y:122},{type:'starved-navigator',x:105,y:122}],interact:[{id:'c2-last-inscription',x:146,y:68,w:18,h:10,label:'Bridge inscription',kind:'note',text:['“A map is a promise that two places remain connected.”','Someone has added later, in another hand: “So is a memory.”']}],enter:['DROWNED-STAR BRIDGE','Beyond the bridge, the sky has one star too few.']},
  'echo-salt-sanctum':{id:'echo-salt-sanctum',era:'1198 BCE',area:'Memory Echo · Asterion Salt City',name:'Sanctum of the Seventh Star',tone:'boss',decor:'observatory',spawn:[40,128],weapon:'bronze-star-spear',boss:true,chapterBoss:'c2',exits:{left:'echo-asterion-bridge'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,180],[304,0,16,180],[132,30,56,20]],lights:[[160,54,44]],corruption:[[20,78,280,78]],enemies:[{type:'salt-astronomer',x:230,y:112,boss:true}],interact:[{id:'c2-boss-focus',x:148,y:38,w:24,h:18,label:'Seventh-star lens',kind:'boss-focus',bossType:'salt-astronomer',text:['The lens shows a star below the floor.','Turn it toward the Astronomer to force the missing constellation to include him.']}],enter:['BOSS MEMORY · THE SALT ASTRONOMER','He navigated by removing destinations from the sky.','In the final phase, make the seventh lens remember where he stands.']},

  // CHAPTER III · 395 CE · THE LAST CENSUS · MARCUS AELIAN
  'echo-census-gate':{id:'echo-census-gate',era:'395 CE',area:'Memory Echo · Vespera',name:'Eastern Census Gate',tone:'echo',decor:'roman',spawn:[34,126],weapon:'census-gladius',exits:{right:'echo-census-hall'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,180],[304,0,16,65],[304,112,16,68],[126,46,68,22]],lights:[[50,52,34]],enemies:[{type:'census-shade',x:234,y:126}],interact:[{id:'c3-token-one',x:86,y:54,w:14,h:10,label:'Citizen token',kind:'memory-item',flag:'c3:token-a',text:['Bronze token: LUCAN · dyer · quarter IV.','The reverse has been scraped smooth except for the number 404.']},{id:'c3-gate-order',x:150,y:52,w:12,h:10,label:'Prefect order',kind:'note',text:['“Count bodies at dawn. Count names at dusk. If the totals disagree, trust the names.”','A later hand has reversed the final instruction.']}],enter:['MEMORY ECHO · 395 CE','MARCUS AELIAN · VESPERA','The empire has split. The census has not.']},
  'echo-census-hall':{id:'echo-census-hall',era:'395 CE',area:'Memory Echo · Vespera',name:'Census Hall',tone:'echo',decor:'archive',spawn:[34,126],weapon:'census-gladius',exits:{left:'echo-census-gate',right:'echo-forum'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[52,38,24,94],[102,38,24,94],[218,38,24,94],[268,38,24,94]],lights:[[160,44,34]],enemies:[{type:'ink-leech',x:238,y:124},{type:'census-shade',x:174,y:74}],interact:[{id:'c3-name-one',x:148,y:108,w:18,h:14,label:'Register line I',kind:'memory-sequence',chapter:'c3',step:1,total:3,completeFlag:'c3:register-restored',text:['Marcus rewrites LUCAN from the bronze token.','The ink tries to crawl back into the pen.']},{id:'c3-ledger-note',x:220,y:48,w:12,h:10,label:'Double ledger',kind:'note',text:['One ledger counts 4,812 citizens. The other counts 4,811 names.','The missing line is physically present. It simply refuses to contain letters.']}],enter:['CENSUS HALL','Every desk has an abacus. One bead moves by itself.']},
  'echo-forum':{id:'echo-forum',era:'395 CE',area:'Memory Echo · Vespera',name:'Abandoned Forum',tone:'echo',decor:'roman',spawn:[34,126],weapon:'census-gladius',exits:{left:'echo-census-hall',right:'echo-basilica-archive'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[72,42,18,88],[151,42,18,88],[230,42,18,88]],lights:[[42,48,26],[278,48,26]],corruption:[[108,112,104,40]],enemies:[{type:'erased-citizen',x:230,y:124}],interact:[{id:'c3-token-two',x:151,y:84,w:14,h:10,label:'Citizen token',kind:'memory-item',flag:'c3:token-b',text:['Bone token: SABINA · baker · quarter II.','Marcus remembers buying bread from her yesterday. Nobody else remembers the bakery.']},{id:'c3-statue',x:235,y:54,w:14,h:12,label:'Nameless statue',kind:'note',text:['The statue still has a face.','Its inscription reads only: “TO THE CITIZEN WHO…” and then polished stone.']}],enter:['ABANDONED FORUM','A market can survive without customers. A city cannot survive without witnesses.']},
  'echo-basilica-archive':{id:'echo-basilica-archive',era:'395 CE',area:'Memory Echo · Vespera',name:'Basilica Archive',tone:'echo',decor:'archive',spawn:[34,126],weapon:'census-gladius',safe:true,exits:{left:'echo-forum',right:'echo-aqueduct-records'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[50,36,28,96],[96,36,28,96],[198,36,28,96],[244,36,28,96]],lights:[[160,48,38]],enemies:[],interact:[{id:'c3-safe',x:146,y:128,w:28,h:12,label:'Oil brazier',kind:'memory-safe',text:['Marcus burns a duplicate scrap containing his own name.','The original remains. For now, so does he.']},{id:'c3-name-two',x:148,y:78,w:18,h:14,label:'Register line II',kind:'memory-sequence',chapter:'c3',step:2,total:3,completeFlag:'c3:register-restored',requiresFlags:['c3:token-b'],text:['SABINA returns to the page.','Somewhere in the city, an oven becomes warm again.']}],enter:['BASILICA ARCHIVE','The shelves are arranged by tax obligation, then by degree of remembered existence.']},
  'echo-aqueduct-records':{id:'echo-aqueduct-records',era:'395 CE',area:'Memory Echo · Vespera',name:'Aqueduct Records',tone:'echo',decor:'cistern',spawn:[34,126],weapon:'census-gladius',exits:{left:'echo-basilica-archive',right:'echo-scriptorium'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[68,52,64,52],[190,52,64,52]],lights:[[160,126,30]],corruption:[[132,42,56,60]],enemies:[{type:'wax-soldier',x:232,y:122},{type:'census-shade',x:98,y:122}],interact:[{id:'c3-token-three',x:208,y:64,w:14,h:10,label:'Citizen token',kind:'memory-item',flag:'c3:token-c',text:['Lead token: TERTIA · water carrier · no quarter listed.','The city map shows a street shaped around a house that has disappeared.']}],enter:['AQUEDUCT RECORDS','Water still reaches addresses that the census says do not exist.']},
  'echo-scriptorium':{id:'echo-scriptorium',era:'395 CE',area:'Memory Echo · Vespera',name:'Imperial Scriptorium',tone:'echo',decor:'archive',spawn:[34,126],weapon:'census-gladius',exits:{left:'echo-aqueduct-records',right:'echo-catacomb-registry'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[74,50,58,20],[188,50,58,20],[132,108,56,18]],lights:[[160,42,34]],enemies:[{type:'ledger-knight',x:230,y:122}],interact:[{id:'c3-name-three',x:146,y:108,w:18,h:14,label:'Register line III',kind:'memory-sequence',chapter:'c3',step:3,total:3,completeFlag:'c3:register-restored',requiresFlags:['c3:token-c'],text:['TERTIA returns to the census.','The restored line adds one house to every map in the room.']},{id:'c3-secret-name',x:82,y:54,w:12,h:10,label:'Unfiled name',kind:'memory-secret',chapter:'c3',flag:'secret:vespera-child',achievement:'vespera-child',text:['A child has written MARA in charcoal beneath a desk.','The same name appeared under Saint Orren’s Ninth Cot.']}],enter:['IMPERIAL SCRIPTORIUM','Scribes copy orders to provinces that no longer answer.']},
  'echo-catacomb-registry':{id:'echo-catacomb-registry',era:'395 CE',area:'Memory Echo · Vespera',name:'Catacomb Registry',tone:'echo',decor:'ossuary',spawn:[34,126],weapon:'census-gladius',exits:{left:'echo-scriptorium',right:'echo-prefect-vault'},exitRules:{right:{requiresFlags:['c3:register-restored'],message:['THE PREFECT VAULT HAS NO LEGAL OWNER','Restore the three erased citizens before opening the state seal.']}},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[54,46,46,18],[137,42,46,18],[220,46,46,18]],lights:[[160,38,24]],corruption:[[18,82,284,74]],enemies:[{type:'erased-citizen',x:232,y:122},{type:'ink-leech',x:112,y:122}],interact:[{id:'c3-death-roll',x:152,y:66,w:16,h:10,label:'Death roll',kind:'note',text:['The death roll is shorter than the census by exactly one name.','Marcus writes his own name in the margin to see what happens. It disappears before the ink dries.']}],enter:['CATACOMB REGISTRY','The dead are easier to count because they no longer move between categories.']},
  'echo-prefect-vault':{id:'echo-prefect-vault',era:'395 CE',area:'Memory Echo · Vespera',name:'Prefect Vault',tone:'echo',decor:'archive',spawn:[34,126],weapon:'census-gladius',exits:{left:'echo-catacomb-registry',right:'echo-enumerator-rotunda'},lockedExit:'right',clearUnlock:true,obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[68,44,34,88],[218,44,34,88],[132,86,56,18]],lights:[[160,48,30]],corruption:[[118,110,84,40]],enemies:[{type:'ledger-knight',x:232,y:122}],interact:[{id:'c3-prefect-letter',x:142,y:92,w:18,h:10,label:'Prefect letter',kind:'note',text:['“The census is not discovering losses. It is causing them.”','“Every corrected omission produces another blank elsewhere.”','The final instruction: “Stop counting.”']}],enter:['PREFECT VAULT','The state seal is intact. The state around it is not.']},
  'echo-enumerator-rotunda':{id:'echo-enumerator-rotunda',era:'395 CE',area:'Memory Echo · Vespera',name:'Rotunda of Names',tone:'boss',decor:'roman',spawn:[40,128],weapon:'census-gladius',boss:true,chapterBoss:'c3',exits:{left:'echo-prefect-vault'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,180],[304,0,16,180],[130,32,60,18]],lights:[[160,58,44]],corruption:[[20,82,280,74]],enemies:[{type:'last-enumerator',x:228,y:112,boss:true}],interact:[{id:'c3-boss-focus',x:146,y:39,w:28,h:18,label:'Restored census',kind:'boss-focus',bossType:'last-enumerator',text:['Three restored names now remain on the page.','Read them aloud to force the Enumerator to occupy a countable body.']}],enter:['BOSS MEMORY · THE LAST ENUMERATOR','It counts omissions instead of people.','In the final phase, use the restored census to make it count itself.']},

  // CHAPTER IV · 1587 · THE ANATOMY OF A SHADOW · LUCIA VARETTI
  'echo-anatomy-theatre':{id:'echo-anatomy-theatre',era:'1587',area:'Memory Echo · Collegium Varetti',name:'Anatomy Theatre',tone:'echo',decor:'theatre',spawn:[34,126],weapon:'anatomist-rapier',exits:{right:'echo-specimen-hall'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,180],[304,0,16,65],[304,112,16,68],[104,54,112,30]],lights:[[160,48,42]],corruption:[[218,96,62,52]],enemies:[{type:'anatomical-husk',x:232,y:126}],interact:[{id:'c4-lecture-note',x:142,y:60,w:18,h:10,label:'Lecture notes',kind:'note',text:['Lucia has drawn the same body twice: once with organs, once with shadows.','Only the second drawing contains an extra structure behind the heart.']},{id:'c4-secret-scalpel',x:242,y:104,w:12,h:10,label:'Cold scalpel',kind:'memory-secret',chapter:'c4',flag:'secret:cold-scalpel',achievement:'cold-scalpel',text:['The scalpel casts two shadows.','One belongs to a hand that is not holding it.']}],enter:['MEMORY ECHO · 1587','LUCIA VARETTI · COLLEGIUM VARETTI','A body on the table has been dead for three days. Its shadow moved this morning.']},
  'echo-specimen-hall':{id:'echo-specimen-hall',era:'1587',area:'Memory Echo · Collegium Varetti',name:'Specimen Hall',tone:'echo',decor:'apothecary',spawn:[34,126],weapon:'anatomist-rapier',exits:{left:'echo-anatomy-theatre',right:'echo-print-shop'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[52,36,26,96],[108,36,26,96],[236,36,26,96]],lights:[[160,48,36]],enemies:[{type:'shadow-page',x:238,y:124},{type:'anatomical-husk',x:174,y:76}],interact:[{id:'c4-silver-one',x:112,y:104,w:14,h:10,label:'Silver shutter',kind:'memory-sequence',chapter:'c4',step:1,total:3,completeFlag:'c4:optics-aligned',text:['Lucia closes the western shutter.','The specimen jars lose one reflection but gain another.']}],enter:['SPECIMEN HALL','The jars are labeled with organs. One label reads simply: MEMORY.']},
  'echo-print-shop':{id:'echo-print-shop',era:'1587',area:'Memory Echo · Collegium Varetti',name:'Forbidden Print Shop',tone:'echo',decor:'archive',spawn:[34,126],weapon:'anatomist-rapier',exits:{left:'echo-specimen-hall',right:'echo-glass-chapel'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[72,48,70,24],[190,48,70,24],[132,112,56,18]],lights:[[160,40,32]],enemies:[{type:'mirror-child',x:230,y:122}],interact:[{id:'c4-vellum',x:202,y:54,w:14,h:10,label:'Anatomy plate',kind:'memory-item',flag:'c4:vellum',text:['A forbidden plate depicts a human silhouette with a second nervous system drawn outside the skin.','The caption calls it “the remembered body.”']},{id:'c4-printer-note',x:88,y:54,w:12,h:10,label:'Printer note',kind:'note',text:['“The image changes when nobody reads the caption.”','“Do not print plate IX after sunset.”']}],enter:['FORBIDDEN PRINT SHOP','Wet ink smells stronger than blood.']},
  'echo-glass-chapel':{id:'echo-glass-chapel',era:'1587',area:'Memory Echo · Collegium Varetti',name:'Chapel of Glass',tone:'echo',decor:'chapel',spawn:[34,126],weapon:'anatomist-rapier',safe:true,exits:{left:'echo-print-shop',right:'echo-dissection-room'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[86,92,52,12],[184,92,52,12]],lights:[[160,44,50]],enemies:[],interact:[{id:'c4-safe',x:148,y:126,w:22,h:12,label:'Clear candle',kind:'memory-safe',text:['The candle has no shadow at all.','Lucia trusts it enough to breathe.']},{id:'c4-silver-two',x:154,y:48,w:14,h:14,label:'North mirror',kind:'memory-sequence',chapter:'c4',step:2,total:3,completeFlag:'c4:optics-aligned',text:['The north mirror turns until it reflects the anatomy plate without reflecting Lucia.']}],enter:['CHAPEL OF GLASS','Every saint in the windows has had the face replaced by a mirror.']},
  'echo-dissection-room':{id:'echo-dissection-room',era:'1587',area:'Memory Echo · Collegium Varetti',name:'Dissection Room',tone:'echo',decor:'theatre',spawn:[34,126],weapon:'anatomist-rapier',exits:{left:'echo-glass-chapel',right:'echo-shadow-corridor'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[98,68,124,32]],lights:[[160,50,38]],corruption:[[118,106,84,42]],enemies:[{type:'stitched-witness',x:232,y:124},{type:'anatomical-husk',x:86,y:124}],interact:[{id:'c4-autopsy',x:145,y:76,w:26,h:14,label:'Autopsy table',kind:'note',text:['The cadaver has no wound corresponding to the missing shadow.','Lucia writes: “Absence is not damage. It is a second anatomy.”']}],enter:['DISSECTION ROOM','The body is still. The shadow is not.']},
  'echo-shadow-corridor':{id:'echo-shadow-corridor',era:'1587',area:'Memory Echo · Collegium Varetti',name:'Shadow Corridor',tone:'echo',decor:'mirror',spawn:[34,126],weapon:'anatomist-rapier',exits:{left:'echo-dissection-room',right:'echo-apothecary-loft'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[62,40,30,82],[145,40,30,82],[228,40,30,82]],lights:[[42,48,20],[278,48,20]],corruption:[[18,124,284,34]],enemies:[{type:'shadow-page',x:230,y:120},{type:'mirror-child',x:112,y:120}],interact:[{id:'c4-silver-three',x:151,y:76,w:14,h:14,label:'East shutter',kind:'memory-sequence',chapter:'c4',step:3,total:3,completeFlag:'c4:optics-aligned',requiresFlags:['c4:vellum'],text:['The third shutter closes over the anatomy plate.','Three reflections collapse into one shadow that finally points somewhere.']}],enter:['SHADOW CORRIDOR','Lucia’s shadow reaches each doorway before she does.']},
  'echo-apothecary-loft':{id:'echo-apothecary-loft',era:'1587',area:'Memory Echo · Collegium Varetti',name:'Apothecary Loft',tone:'echo',decor:'apothecary',spawn:[34,126],weapon:'anatomist-rapier',exits:{left:'echo-shadow-corridor',right:'echo-mirror-observatory'},exitRules:{right:{requiresFlags:['c4:optics-aligned'],message:['THE OBSERVATORY REFLECTS NO DOOR','Align the three optical shutters and carry plate IX into the shadow corridor.']}},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[52,36,26,96],[108,36,26,96],[236,36,26,96]],lights:[[160,46,30]],enemies:[{type:'shadow-surgeon',x:228,y:122}],interact:[{id:'c4-lucia-letter',x:116,y:54,w:14,h:10,label:'Lucia letter',kind:'note',text:['“Father believes a shadow proves a body blocks light.”','“I think some shadows prove something is blocking memory.”','“If mine stops following me, do not trust the version that remains.”']}],enter:['APOTHECARY LOFT','Every bottle is labeled twice: substance and recollection.']},
  'echo-mirror-observatory':{id:'echo-mirror-observatory',era:'1587',area:'Memory Echo · Collegium Varetti',name:'Mirror Observatory',tone:'echo',decor:'mirror',spawn:[34,126],weapon:'anatomist-rapier',exits:{left:'echo-apothecary-loft',right:'echo-shadow-theatre'},lockedExit:'right',clearUnlock:true,obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,65],[0,112,16,68],[304,0,16,65],[304,112,16,68],[72,46,36,76],[212,46,36,76]],lights:[[160,42,34]],corruption:[[120,92,80,58]],enemies:[{type:'shadow-surgeon',x:226,y:122}],interact:[{id:'c4-observer',x:146,y:54,w:28,h:12,label:'Black mirror',kind:'note',text:['The black mirror shows Lucia standing behind herself.','The second Lucia mouths one word: BLACKTHORN.']}],enter:['MIRROR OBSERVATORY','The telescope points at an interior wall and shows a night sky.']},
  'echo-shadow-theatre':{id:'echo-shadow-theatre',era:'1587',area:'Memory Echo · Collegium Varetti',name:'Theatre of the Second Body',tone:'boss',decor:'theatre',spawn:[40,128],weapon:'anatomist-rapier',boss:true,chapterBoss:'c4',exits:{left:'echo-mirror-observatory'},obstacles:[[0,0,320,16],[0,164,320,16],[0,0,16,180],[304,0,16,180],[104,34,112,22]],lights:[[160,58,46]],corruption:[[20,82,280,74]],enemies:[{type:'anatomist-shadow',x:228,y:112,boss:true}],interact:[{id:'c4-boss-focus',x:145,y:40,w:30,h:18,label:'Triple mirror',kind:'boss-focus',bossType:'anatomist-shadow',text:['The aligned shutters give the mirror only one possible image.','Force the shadow to share Lucia’s outline, then strike the overlap.']}],enter:["BOSS MEMORY · THE ANATOMIST'S SHADOW",'It is not Lucia’s shadow. It is the memory of a body that wants hers.','In the final phase, collapse the triple mirror until body and absence overlap.']},

  // PHASE 8 · HISTORICAL CHAPTERS V–VIII
  "echo-1790-approach":memoryRoom("echo-1790-approach","1790","Memory Echo · First Blackthorn House","Foundation Approach","duelling-sabre",{exits:{"right":"echo-1790-drawing"},decor:"foundation",safe:false,boss:false,enemies:[{"type":"plaster-servant","x":228,"y":120}],interact:[{"id":"c5-item","x":78,"y":92,"w":20,"h":14,"label":"Measured plan","kind":"memory-item","flag":"c5:blueprint","text":["The object carries context the rest of this memory depends on.","Its contradiction is deliberate evidence, not an error."]},{"id":"c5-secret","x":78,"y":50,"w":18,"h":12,"label":"Contradictory evidence","kind":"memory-secret","chapter":"c5","flag":"secret:first-blackthorn-name","achievement":"first-blackthorn-name","text":["This evidence should not exist in this year.","Blackthorn preserves it precisely because a tidy history would erase it."]}],enter:["MEMORY ECHO · 1790","ELEANOR BLACKTHORN · FIRST BLACKTHORN HOUSE","A ninth room exists before the house does. Eleanor chooses to build around the contradiction."]}),
  "echo-1790-drawing":memoryRoom("echo-1790-drawing","1790","Memory Echo · First Blackthorn House","Rotating Drawing Room","duelling-sabre",{exits:{"left":"echo-1790-approach","right":"echo-1790-survey"},decor:"drawing",safe:false,boss:false,enemies:[{"type":"survey-wraith","x":228,"y":120},{"type":"hinge-crawler","x":92,"y":116}],interact:[{"id":"c5-sequence-1","x":145,"y":92,"w":20,"h":14,"label":"First alignment","kind":"memory-sequence","chapter":"c5","step":1,"total":3,"completeFlag":"c5:aligned","text":["Rotating Drawing Room contributes the 1 part of the memory pattern.","The sequence is preserved instead of simplified."]}],enter:["ROTATING DRAWING ROOM","The memory grows less willing to agree with itself."]}),
  "echo-1790-survey":memoryRoom("echo-1790-survey","1790","Memory Echo · First Blackthorn House","Survey Hall","duelling-sabre",{exits:{"left":"echo-1790-drawing","right":"echo-1790-stair"},decor:"hall",safe:false,boss:false,enemies:[{"type":"hinge-crawler","x":228,"y":120}],interact:[{"id":"c5-note-2","x":82,"y":56,"w":16,"h":10,"label":"Recovered note","kind":"note","text":["A fragment from Survey Hall contradicts the official account.","The inconsistency points forward to Blackthorn rather than backward to an explanation."]}],enter:["SURVEY HALL","The memory grows less willing to agree with itself."]}),
  "echo-1790-stair":memoryRoom("echo-1790-stair","1790","Memory Echo · First Blackthorn House","Miscounted Stair","duelling-sabre",{exits:{"left":"echo-1790-survey","right":"echo-1790-library"},decor:"stairwell",safe:false,boss:false,enemies:[{"type":"ash-tenant","x":228,"y":120}],interact:[{"id":"c5-sequence-2","x":145,"y":92,"w":20,"h":14,"label":"Second alignment","kind":"memory-sequence","chapter":"c5","step":2,"total":3,"completeFlag":"c5:aligned","text":["Miscounted Stair contributes the 2 part of the memory pattern.","The sequence is preserved instead of simplified."]}],enter:["MISCOUNTED STAIR","The memory grows less willing to agree with itself."]}),
  "echo-1790-library":memoryRoom("echo-1790-library","1790","Memory Echo · First Blackthorn House","First Library","duelling-sabre",{exits:{"left":"echo-1790-stair","right":"echo-1790-engine"},decor:"library",safe:true,boss:false,enemies:[],interact:[{"id":"c5-safe","x":150,"y":124,"w":22,"h":12,"label":"Stable threshold","kind":"memory-safe","text":["The memory steadies here.","For a moment, physical place and remembered place agree."]}],enter:["FIRST LIBRARY","The memory grows less willing to agree with itself."]}),
  "echo-1790-engine":memoryRoom("echo-1790-engine","1790","Memory Echo · First Blackthorn House","Palimpsest Foundation","duelling-sabre",{exits:{"left":"echo-1790-library","right":"echo-1790-ninth"},decor:"root",safe:false,boss:false,enemies:[{"type":"plaster-servant","x":228,"y":120}],interact:[{"id":"c5-sequence-3","x":145,"y":92,"w":20,"h":14,"label":"Final alignment","kind":"memory-sequence","chapter":"c5","step":3,"total":3,"completeFlag":"c5:aligned","text":["Palimpsest Foundation contributes the 3 part of the memory pattern.","The sequence is preserved instead of simplified."],"requiresFlags":["c5:blueprint"]}],enter:["PALIMPSEST FOUNDATION","The memory grows less willing to agree with itself."]}),
  "echo-1790-ninth":memoryRoom("echo-1790-ninth","1790","Memory Echo · First Blackthorn House","The Ninth Room","duelling-sabre",{exits:{"left":"echo-1790-engine","right":"echo-1790-tenant-hall"},decor:"vault",safe:false,boss:false,enemies:[{"type":"ash-tenant","x":228,"y":120},{"type":"plaster-servant","x":88,"y":118}],interact:[{"id":"c5-note-6","x":82,"y":56,"w":16,"h":10,"label":"Recovered note","kind":"note","text":["A fragment from The Ninth Room contradicts the official account.","The inconsistency points forward to Blackthorn rather than backward to an explanation."]}],enter:["THE NINTH ROOM","The memory grows less willing to agree with itself."],exitRules:{"right":{"requiresFlags":["c5:aligned"],"message":["THE ROUTE IS STILL CONTRADICTORY","Complete the three-part memory pattern first."]}}}),
  "echo-1790-tenant-hall":memoryRoom("echo-1790-tenant-hall","1790","Memory Echo · First Blackthorn House","Tenant Hall","duelling-sabre",{exits:{"left":"echo-1790-ninth","right":"echo-1790-tenant"},decor:"hall",safe:false,boss:false,enemies:[{"type":"ash-tenant","x":228,"y":120}],interact:[{"id":"c5-note-7","x":82,"y":56,"w":16,"h":10,"label":"Recovered note","kind":"note","text":["A fragment from Tenant Hall contradicts the official account.","The inconsistency points forward to Blackthorn rather than backward to an explanation."]}],enter:["TENANT HALL","The memory grows less willing to agree with itself."],lockedExit:"right",clearUnlock:true}),
  "echo-1790-tenant":memoryRoom("echo-1790-tenant","1790","Memory Echo · First Blackthorn House","The Impossible Lease","duelling-sabre",{exits:{"left":"echo-1790-tenant-hall"},decor:"boss",safe:false,boss:true,enemies:[{"type":"first-tenant","x":228,"y":110,"boss":true}],interact:[{"id":"c5-focus","x":145,"y":42,"w":28,"h":18,"label":"Foundation nameplate","kind":"boss-focus","bossType":"first-tenant","text":["Foundation nameplate forces the final form to occupy one consistent relationship.","The boss can be harmed again for a few seconds."]}],enter:["BOSS MEMORY · THE FIRST TENANT","The final phase cannot be solved by damage alone. Use the room."],corruption:[[20,82,280,72]],lights:[[160,54,46]]}),
  "echo-1917-trench":memoryRoom("echo-1917-trench","1917","Memory Echo · Ravelin Wood","Ravelin Trench","trench-club",{exits:{"right":"echo-1917-aid"},decor:"trench",safe:false,boss:false,enemies:[{"type":"mud-hollow","x":228,"y":120}],interact:[{"id":"c6-item","x":78,"y":92,"w":20,"h":14,"label":"Mud map","kind":"memory-item","flag":"c6:field-map","text":["The object carries context the rest of this memory depends on.","Its contradiction is deliberate evidence, not an error."]}],enter:["MEMORY ECHO · 1917","ELIAS WARD · RAVELIN WOOD","A trench survives only while two people remember walking it."]}),
  "echo-1917-aid":memoryRoom("echo-1917-aid","1917","Memory Echo · Ravelin Wood","Forward Aid Post","trench-club",{exits:{"left":"echo-1917-trench","right":"echo-1917-wire"},decor:"infirmary",safe:false,boss:false,enemies:[{"type":"faceless-orderly","x":228,"y":120}],interact:[{"id":"c6-sequence-1","x":145,"y":92,"w":20,"h":14,"label":"First alignment","kind":"memory-sequence","chapter":"c6","step":1,"total":3,"completeFlag":"c6:witness-chain","text":["Forward Aid Post contributes the 1 part of the memory pattern.","The sequence is preserved instead of simplified."]}],enter:["FORWARD AID POST","The memory grows less willing to agree with itself."]}),
  "echo-1917-wire":memoryRoom("echo-1917-wire","1917","Memory Echo · Ravelin Wood","Wire Traverse","trench-club",{exits:{"left":"echo-1917-aid","right":"echo-1917-dugout"},decor:"bridge",safe:false,boss:false,enemies:[{"type":"wire-witness","x":228,"y":120},{"type":"mud-hollow","x":92,"y":122}],interact:[{"id":"c6-note-2","x":82,"y":56,"w":16,"h":10,"label":"Recovered note","kind":"note","text":["A fragment from Wire Traverse contradicts the official account.","The inconsistency points forward to Blackthorn rather than backward to an explanation."]}],enter:["WIRE TRAVERSE","The memory grows less willing to agree with itself."]}),
  "echo-1917-dugout":memoryRoom("echo-1917-dugout","1917","Memory Echo · Ravelin Wood","Company Dugout","trench-club",{exits:{"left":"echo-1917-wire","right":"echo-1917-sunken"},decor:"cellar",safe:false,boss:false,enemies:[{"type":"faceless-orderly","x":228,"y":120}],interact:[{"id":"c6-sequence-2","x":145,"y":92,"w":20,"h":14,"label":"Second alignment","kind":"memory-sequence","chapter":"c6","step":2,"total":3,"completeFlag":"c6:witness-chain","text":["Company Dugout contributes the 2 part of the memory pattern.","The sequence is preserved instead of simplified."]}],enter:["COMPANY DUGOUT","The memory grows less willing to agree with itself."]}),
  "echo-1917-sunken":memoryRoom("echo-1917-sunken","1917","Memory Echo · Ravelin Wood","Sunken Dressing Station","trench-club",{exits:{"left":"echo-1917-dugout","right":"echo-1917-map"},decor:"infirmary",safe:true,boss:false,enemies:[],interact:[{"id":"c6-safe","x":150,"y":124,"w":22,"h":12,"label":"Stable threshold","kind":"memory-safe","text":["The memory steadies here.","For a moment, physical place and remembered place agree."]}],enter:["SUNKEN DRESSING STATION","The memory grows less willing to agree with itself."]}),
  "echo-1917-map":memoryRoom("echo-1917-map","1917","Memory Echo · Ravelin Wood","Map Room","trench-club",{exits:{"left":"echo-1917-sunken","right":"echo-1917-crater"},decor:"archive",safe:false,boss:false,enemies:[{"type":"shell-shade","x":228,"y":120}],interact:[{"id":"c6-sequence-3","x":145,"y":92,"w":20,"h":14,"label":"Final alignment","kind":"memory-sequence","chapter":"c6","step":3,"total":3,"completeFlag":"c6:witness-chain","text":["Map Room contributes the 3 part of the memory pattern.","The sequence is preserved instead of simplified."],"requiresFlags":["c6:field-map"]}],enter:["MAP ROOM","The memory grows less willing to agree with itself."]}),
  "echo-1917-crater":memoryRoom("echo-1917-crater","1917","Memory Echo · Ravelin Wood","Memory Crater","trench-club",{exits:{"left":"echo-1917-map","right":"echo-1917-company"},decor:"crypt",safe:false,boss:false,enemies:[{"type":"wire-witness","x":228,"y":120},{"type":"shell-shade","x":88,"y":118}],interact:[{"id":"c6-secret","x":78,"y":50,"w":18,"h":12,"label":"Contradictory evidence","kind":"memory-secret","chapter":"c6","flag":"secret:ward-class","achievement":"ward-class","text":["This evidence should not exist in this year.","Blackthorn preserves it precisely because a tidy history would erase it."]}],enter:["MEMORY CRATER","The memory grows less willing to agree with itself."],exitRules:{"right":{"requiresFlags":["c6:witness-chain"],"message":["THE ROUTE IS STILL CONTRADICTORY","Complete the three-part memory pattern first."]}}}),
  "echo-1917-company":memoryRoom("echo-1917-company","1917","Memory Echo · Ravelin Wood","Company Line","trench-club",{exits:{"left":"echo-1917-crater","right":"echo-1917-faces"},decor:"trench",safe:false,boss:false,enemies:[{"type":"faceless-orderly","x":228,"y":120}],interact:[{"id":"c6-note-7","x":82,"y":56,"w":16,"h":10,"label":"Recovered note","kind":"note","text":["A fragment from Company Line contradicts the official account.","The inconsistency points forward to Blackthorn rather than backward to an explanation."]}],enter:["COMPANY LINE","The memory grows less willing to agree with itself."],lockedExit:"right",clearUnlock:true}),
  "echo-1917-faces":memoryRoom("echo-1917-faces","1917","Memory Echo · Ravelin Wood","No-Man’s Memory","trench-club",{exits:{"left":"echo-1917-company"},decor:"boss",safe:false,boss:true,enemies:[{"type":"company-without-faces","x":228,"y":110,"boss":true}],interact:[{"id":"c6-focus","x":145,"y":42,"w":28,"h":18,"label":"Paired identity discs","kind":"boss-focus","bossType":"company-without-faces","text":["Paired identity discs forces the final form to occupy one consistent relationship.","The boss can be harmed again for a few seconds."]}],enter:["BOSS MEMORY · THE COMPANY WITHOUT FACES","The final phase cannot be solved by damage alone. Use the room."],corruption:[[20,82,280,72]],lights:[[160,54,46]]}),
  "echo-1956-gate":memoryRoom("echo-1956-gate","1956","Memory Echo · Northmere Relay","Relay Perimeter","heavy-torch",{exits:{"right":"echo-1956-generator"},decor:"relay",safe:false,boss:false,enemies:[{"type":"signal-husk","x":228,"y":120}],interact:[{"id":"c7-item","x":78,"y":92,"w":20,"h":14,"label":"Night engineer log","kind":"memory-item","flag":"c7:log","text":["The object carries context the rest of this memory depends on.","Its contradiction is deliberate evidence, not an error."]}],enter:["MEMORY ECHO · 1956","NAOMI PIKE · NORTHMERE RELAY","Ten licensed frequencies. One impossible carrier that remembers its listeners."]}),
  "echo-1956-generator":memoryRoom("echo-1956-generator","1956","Memory Echo · Northmere Relay","Generator Room","heavy-torch",{exits:{"left":"echo-1956-gate","right":"echo-1956-control"},decor:"boiler",safe:false,boss:false,enemies:[{"type":"carrier-ghost","x":228,"y":120}],interact:[{"id":"c7-sequence-1","x":145,"y":92,"w":20,"h":14,"label":"First alignment","kind":"memory-sequence","chapter":"c7","step":1,"total":3,"completeFlag":"c7:carrier-lock","text":["Generator Room contributes the 1 part of the memory pattern.","The sequence is preserved instead of simplified."]}],enter:["GENERATOR ROOM","The memory grows less willing to agree with itself."]}),
  "echo-1956-control":memoryRoom("echo-1956-control","1956","Memory Echo · Northmere Relay","Control Room","heavy-torch",{exits:{"left":"echo-1956-generator","right":"echo-1956-tower"},decor:"archive",safe:false,boss:false,enemies:[{"type":"static-child","x":228,"y":120},{"type":"signal-husk","x":90,"y":120}],interact:[{"id":"c7-note-2","x":82,"y":56,"w":16,"h":10,"label":"Recovered note","kind":"note","text":["A fragment from Control Room contradicts the official account.","The inconsistency points forward to Blackthorn rather than backward to an explanation."]}],enter:["CONTROL ROOM","The memory grows less willing to agree with itself."]}),
  "echo-1956-tower":memoryRoom("echo-1956-tower","1956","Memory Echo · Northmere Relay","Aerial Tower Base","heavy-torch",{exits:{"left":"echo-1956-control","right":"echo-1956-listening"},decor:"bridge",safe:false,boss:false,enemies:[{"type":"relay-witness","x":228,"y":120}],interact:[{"id":"c7-sequence-2","x":145,"y":92,"w":20,"h":14,"label":"Second alignment","kind":"memory-sequence","chapter":"c7","step":2,"total":3,"completeFlag":"c7:carrier-lock","text":["Aerial Tower Base contributes the 2 part of the memory pattern.","The sequence is preserved instead of simplified."]}],enter:["AERIAL TOWER BASE","The memory grows less willing to agree with itself."]}),
  "echo-1956-listening":memoryRoom("echo-1956-listening","1956","Memory Echo · Northmere Relay","Listening Booth","heavy-torch",{exits:{"left":"echo-1956-tower","right":"echo-1956-archive"},decor:"safe",safe:true,boss:false,enemies:[],interact:[{"id":"c7-safe","x":150,"y":124,"w":22,"h":12,"label":"Stable threshold","kind":"memory-safe","text":["The memory steadies here.","For a moment, physical place and remembered place agree."]}],enter:["LISTENING BOOTH","The memory grows less willing to agree with itself."]}),
  "echo-1956-archive":memoryRoom("echo-1956-archive","1956","Memory Echo · Northmere Relay","Recorded Calls Archive","heavy-torch",{exits:{"left":"echo-1956-listening","right":"echo-1956-transmitter"},decor:"archive",safe:false,boss:false,enemies:[{"type":"signal-husk","x":228,"y":120}],interact:[{"id":"c7-sequence-3","x":145,"y":92,"w":20,"h":14,"label":"Final alignment","kind":"memory-sequence","chapter":"c7","step":3,"total":3,"completeFlag":"c7:carrier-lock","text":["Recorded Calls Archive contributes the 3 part of the memory pattern.","The sequence is preserved instead of simplified."],"requiresFlags":["c7:log"]}],enter:["RECORDED CALLS ARCHIVE","The memory grows less willing to agree with itself."]}),
  "echo-1956-transmitter":memoryRoom("echo-1956-transmitter","1956","Memory Echo · Northmere Relay","Transmitter Hall","heavy-torch",{exits:{"left":"echo-1956-archive","right":"echo-1956-roof"},decor:"relay",safe:false,boss:false,enemies:[{"type":"relay-witness","x":228,"y":120},{"type":"carrier-ghost","x":90,"y":118}],interact:[{"id":"c7-secret","x":78,"y":50,"w":18,"h":12,"label":"Contradictory evidence","kind":"memory-secret","chapter":"c7","flag":"secret:lullaby-eleven","achievement":"lullaby-eleven","text":["This evidence should not exist in this year.","Blackthorn preserves it precisely because a tidy history would erase it."]}],enter:["TRANSMITTER HALL","The memory grows less willing to agree with itself."],exitRules:{"right":{"requiresFlags":["c7:carrier-lock"],"message":["THE ROUTE IS STILL CONTRADICTORY","Complete the three-part memory pattern first."]}}}),
  "echo-1956-roof":memoryRoom("echo-1956-roof","1956","Memory Echo · Northmere Relay","Aerial Roof","heavy-torch",{exits:{"left":"echo-1956-transmitter","right":"echo-1956-frequency"},decor:"observatory",safe:false,boss:false,enemies:[{"type":"carrier-ghost","x":228,"y":120}],interact:[{"id":"c7-note-7","x":82,"y":56,"w":16,"h":10,"label":"Recovered note","kind":"note","text":["A fragment from Aerial Roof contradicts the official account.","The inconsistency points forward to Blackthorn rather than backward to an explanation."]}],enter:["AERIAL ROOF","The memory grows less willing to agree with itself."],lockedExit:"right",clearUnlock:true}),
  "echo-1956-frequency":memoryRoom("echo-1956-frequency","1956","Memory Echo · Northmere Relay","Carrier Null","heavy-torch",{exits:{"left":"echo-1956-roof"},decor:"boss",safe:false,boss:true,enemies:[{"type":"dead-frequency","x":228,"y":110,"boss":true}],interact:[{"id":"c7-focus","x":145,"y":42,"w":28,"h":18,"label":"Carrier lock","kind":"boss-focus","bossType":"dead-frequency","text":["Carrier lock forces the final form to occupy one consistent relationship.","The boss can be harmed again for a few seconds."]}],enter:["BOSS MEMORY · THE DEAD FREQUENCY","The final phase cannot be solved by damage alone. Use the room."],corruption:[[20,82,280,72]],lights:[[160,54,46]]}),
  "echo-1987-drive":memoryRoom("echo-1987-drive","1987","Memory Echo · Blackthorn Restoration","Restoration Drive","pry-bar",{exits:{"right":"echo-1987-site"},decor:"construction",safe:false,boss:false,enemies:[{"type":"restoration-double","x":228,"y":120}],interact:[{"id":"c8-item","x":78,"y":92,"w":20,"h":14,"label":"Tape zero","kind":"memory-item","flag":"c8:tape-zero","text":["The object carries context the rest of this memory depends on.","Its contradiction is deliberate evidence, not an error."]}],enter:["MEMORY ECHO · 1987","THEO VOSS · BLACKTHORN RESTORATION","The tape contains thirteen seconds recorded before Theo pressed RECORD."]}),
  "echo-1987-site":memoryRoom("echo-1987-site","1987","Memory Echo · Blackthorn Restoration","Site Office","pry-bar",{exits:{"left":"echo-1987-drive","right":"echo-1987-hall"},decor:"archive",safe:false,boss:false,enemies:[{"type":"tape-wraith","x":228,"y":120}],interact:[{"id":"c8-sequence-1","x":145,"y":92,"w":20,"h":14,"label":"First alignment","kind":"memory-sequence","chapter":"c8","step":1,"total":3,"completeFlag":"c8:continuity","text":["Site Office contributes the 1 part of the memory pattern.","The sequence is preserved instead of simplified."]}],enter:["SITE OFFICE","The memory grows less willing to agree with itself."]}),
  "echo-1987-hall":memoryRoom("echo-1987-hall","1987","Memory Echo · Blackthorn Restoration","Stripped Great Hall","pry-bar",{exits:{"left":"echo-1987-site","right":"echo-1987-tape"},decor:"hall",safe:false,boss:false,enemies:[{"type":"frame-crawler","x":228,"y":120},{"type":"tape-wraith","x":92,"y":118}],interact:[{"id":"c8-note-2","x":82,"y":56,"w":16,"h":10,"label":"Recovered note","kind":"note","text":["A fragment from Stripped Great Hall contradicts the official account.","The inconsistency points forward to Blackthorn rather than backward to an explanation."]}],enter:["STRIPPED GREAT HALL","The memory grows less willing to agree with itself."]}),
  "echo-1987-tape":memoryRoom("echo-1987-tape","1987","Memory Echo · Blackthorn Restoration","Tape Room","pry-bar",{exits:{"left":"echo-1987-hall","right":"echo-1987-attic"},decor:"archive",safe:false,boss:false,enemies:[{"type":"survey-shadow","x":228,"y":120}],interact:[{"id":"c8-sequence-2","x":145,"y":92,"w":20,"h":14,"label":"Second alignment","kind":"memory-sequence","chapter":"c8","step":2,"total":3,"completeFlag":"c8:continuity","text":["Tape Room contributes the 2 part of the memory pattern.","The sequence is preserved instead of simplified."]}],enter:["TAPE ROOM","The memory grows less willing to agree with itself."]}),
  "echo-1987-attic":memoryRoom("echo-1987-attic","1987","Memory Echo · Blackthorn Restoration","Restoration Attic","pry-bar",{exits:{"left":"echo-1987-tape","right":"echo-1987-basement"},decor:"attic",safe:true,boss:false,enemies:[],interact:[{"id":"c8-safe","x":150,"y":124,"w":22,"h":12,"label":"Stable threshold","kind":"memory-safe","text":["The memory steadies here.","For a moment, physical place and remembered place agree."]}],enter:["RESTORATION ATTIC","The memory grows less willing to agree with itself."]}),
  "echo-1987-basement":memoryRoom("echo-1987-basement","1987","Memory Echo · Blackthorn Restoration","Opened Foundation","pry-bar",{exits:{"left":"echo-1987-attic","right":"echo-1987-splice"},decor:"root",safe:false,boss:false,enemies:[{"type":"restoration-double","x":228,"y":120},{"type":"frame-crawler","x":92,"y":118}],interact:[{"id":"c8-secret","x":78,"y":50,"w":18,"h":12,"label":"Contradictory evidence","kind":"memory-secret","chapter":"c8","flag":"secret:elena-slate","achievement":"elena-slate","text":["This evidence should not exist in this year.","Blackthorn preserves it precisely because a tidy history would erase it."]}],enter:["OPENED FOUNDATION","The memory grows less willing to agree with itself."]}),
  "echo-1987-splice":memoryRoom("echo-1987-splice","1987","Memory Echo · Blackthorn Restoration","Editing Bench","pry-bar",{exits:{"left":"echo-1987-basement","right":"echo-1987-camera"},decor:"archive",safe:false,boss:false,enemies:[{"type":"survey-shadow","x":228,"y":120}],interact:[{"id":"c8-sequence-3","x":145,"y":92,"w":20,"h":14,"label":"Final alignment","kind":"memory-sequence","chapter":"c8","step":3,"total":3,"completeFlag":"c8:continuity","text":["Editing Bench contributes the 3 part of the memory pattern.","The sequence is preserved instead of simplified."],"requiresFlags":["c8:tape-zero"]}],enter:["EDITING BENCH","The memory grows less willing to agree with itself."],exitRules:{"right":{"requiresFlags":["c8:continuity"],"message":["THE ROUTE IS STILL CONTRADICTORY","Complete the three-part memory pattern first."]}}}),
  "echo-1987-camera":memoryRoom("echo-1987-camera","1987","Memory Echo · Blackthorn Restoration","Camera Corridor","pry-bar",{exits:{"left":"echo-1987-splice","right":"echo-1987-missing"},decor:"mirror",safe:false,boss:false,enemies:[{"type":"tape-wraith","x":228,"y":120}],interact:[{"id":"c8-note-7","x":82,"y":56,"w":16,"h":10,"label":"Recovered note","kind":"note","text":["A fragment from Camera Corridor contradicts the official account.","The inconsistency points forward to Blackthorn rather than backward to an explanation."]}],enter:["CAMERA CORRIDOR","The memory grows less willing to agree with itself."],lockedExit:"right",clearUnlock:true}),
  "echo-1987-missing":memoryRoom("echo-1987-missing","1987","Memory Echo · Blackthorn Restoration","Missing Frame Room","pry-bar",{exits:{"left":"echo-1987-camera"},decor:"boss",safe:false,boss:true,enemies:[{"type":"man-missing-frame","x":228,"y":110,"boss":true}],interact:[{"id":"c8-focus","x":145,"y":42,"w":28,"h":18,"label":"Splice deck","kind":"boss-focus","bossType":"man-missing-frame","text":["Splice deck forces the final form to occupy one consistent relationship.","The boss can be harmed again for a few seconds."]}],enter:["BOSS MEMORY · THE MAN IN THE MISSING FRAME","The final phase cannot be solved by damage alone. Use the room."],corruption:[[20,82,280,72]],lights:[[160,54,46]]}),

  'final-pale-threshold':memoryRoom('final-pale-threshold','2026','Final Chapter · Pale Interval','The Room Behind Memory','candlestick',{exits:{right:'final-index-loss'},decor:'root',safe:false,enemies:[{type:'relation-husk',x:232,y:120}],interact:[{id:'final-threshold-note',x:80,y:54,w:18,h:12,label:'Ninth witness',kind:'note',text:['Eight memories stand behind Elena. A ninth shadow stands beside them.','The shadow has her posture and no face.','Blackthorn did not preserve history. It preserved relationships that history kept trying to simplify.']}],enter:['FINAL CHAPTER · 2026','ELENA VOSS · THE ROOM BEHIND MEMORY','The Root Door opens inward, but there is no room on the other side of the wall.']}),
  'final-index-loss':memoryRoom('final-index-loss','2026','Final Chapter · Pale Interval','Index of Loss','candlestick',{exits:{left:'final-pale-threshold',right:'final-contradiction'},decor:'archive',enemies:[{type:'index-moth',x:238,y:120},{type:'pale-archivist',x:214,y:58}],interact:[{id:'final-seq-1',x:145,y:92,w:22,h:14,label:'Saint Orren index',kind:'final-sequence',step:1,total:3,flag:'final:route-coherent',text:['The index does not list the dead. It lists who still remembers them.','Ysabel’s twenty-one names form the first relation.']}],enter:['INDEX OF LOSS','Every shelf contains a catalogue of absences rather than objects.']}),
  'final-contradiction':memoryRoom('final-contradiction','2026','Final Chapter · Pale Interval','Gallery of Contradictions','candlestick',{exits:{left:'final-index-loss',right:'final-suture'},decor:'gallery',enemies:[{type:'void-echo',x:236,y:122}],interact:[{id:'final-choice-witness-preserve',x:86,y:72,w:22,h:14,label:'Keep both accounts',kind:'final-choice',choiceGroup:'witness',choiceValue:'preserve',text:['Elena leaves two contradictory witness statements side by side.','Neither is declared false simply to make the archive neat.']},{id:'final-choice-witness-collapse',x:214,y:72,w:22,h:14,label:'Choose one account',kind:'final-choice',choiceGroup:'witness',choiceValue:'collapse',text:['Elena seals one account and lets the other become the official version.','The room becomes quieter. Too quiet.']}],enter:['GALLERY OF CONTRADICTIONS','The walls only stay solid while two incompatible memories are allowed to coexist.']}),
  'final-suture':memoryRoom('final-suture','2026','Final Chapter · Pale Interval','Suture Corridor','candlestick',{exits:{left:'final-contradiction',right:'final-three-schools'},decor:'theatre',enemies:[{type:'relation-husk',x:226,y:122},{type:'index-moth',x:250,y:60}],interact:[{id:'final-seq-2',x:145,y:92,w:22,h:14,label:'Census suture',kind:'final-sequence',step:2,total:3,flag:'final:route-coherent',text:['Marcus’s erased citizens and Lucia’s second shadow occupy the same seam.','The second relation is not identity. It is recognition.']}],enter:['SUTURE CORRIDOR','Architecture, body and record have been stitched with the same impossible thread.']}),
  'final-three-schools':memoryRoom('final-three-schools','2026','Final Chapter · Pale Interval','Three-School Lattice','candlestick',{exits:{left:'final-suture',right:'final-name-vault'},decor:'vault',enemies:[{type:'pale-archivist',x:236,y:120}],interact:[{id:'final-lattice-mind',x:72,y:56,w:20,h:16,label:'Mind aperture',kind:'final-sigil-puzzle',requiredSigil:'reveal-mind-i',requiredIntensity:3,text:['The aperture contains every room Blackthorn has pretended not to have.','REVEAL + MIND + III can force the omissions to remain visible.']},{id:'final-lattice-flesh',x:150,y:118,w:20,h:16,label:'Flesh suture',kind:'final-sigil-puzzle',requiredSigil:'purge-flesh-i',requiredIntensity:3,text:['A root and a vein share one remembered pulse.','PURGE + FLESH + III can separate contamination from inheritance.']},{id:'final-lattice-void',x:238,y:56,w:20,h:16,label:'Void bracket',kind:'final-sigil-puzzle',requiredSigil:'bind-void-i',requiredIntensity:3,text:['The room is trying to become an exit from itself.','BIND + VOID + III can force the boundary to stay local.']}],exitRules:{right:{requiresFlags:['final:lattice-complete'],message:['THE THREE SCHOOLS DISAGREE','Mind, Flesh and Void must each hold one part of the room before Elena can continue.']}},enter:['THREE-SCHOOL LATTICE','Blackthorn asks for grammar, not faith. Cast beside each aperture.']}),
  'final-name-vault':memoryRoom('final-name-vault','2026','Final Chapter · Pale Interval','Name Vault','candlestick',{exits:{left:'final-three-schools',right:'final-engine'},decor:'archive',safe:true,enemies:[],interact:[{id:'final-name-safe',x:148,y:126,w:22,h:12,label:'Stable name',kind:'memory-safe',text:['Elena writes her full name once and does not look away while the ink dries.']},{id:'final-choice-name-keep',x:82,y:58,w:22,h:14,label:'Keep Theo’s warning',kind:'final-choice',choiceGroup:'name',choiceValue:'keep',text:['Elena keeps Theo’s impossible warning intact, including the line that should not have existed in 1987.']},{id:'final-choice-name-erase',x:216,y:58,w:22,h:14,label:'Erase Theo’s warning',kind:'final-choice',choiceGroup:'name',choiceValue:'erase',text:['Elena strikes Theo’s warning from the working index.','The paper beneath it remains indented with every letter.']}],enter:['NAME VAULT','Names are stored here as relationships: daughter, witness, stranger, betrayer, remembered.']}),
  'final-engine':memoryRoom('final-engine','2026','Final Chapter · Pale Interval','Palimpsest Engine','candlestick',{exits:{left:'final-name-vault',right:'final-antechamber'},decor:'root',enemies:[{type:'void-echo',x:238,y:120},{type:'relation-husk',x:212,y:62}],interact:[{id:'final-seq-3',x:145,y:92,w:22,h:14,label:'Eight-spine engine',kind:'final-sequence',step:3,total:3,flag:'final:route-coherent',requiresFlags:['final:lattice-complete'],text:['All eight Memory Spines enter the mechanism without becoming one story.','The third relation is choice: memory preserved without compulsory agreement.']}],exitRules:{right:{requiresFlags:['final:route-coherent'],message:['THE ENGINE HAS NO CONSENSUS','The three relations must be assembled before the last threshold can exist.']}},enter:['PALIMPSEST ENGINE','It is not a machine that stores memories. It stores the distance between them.']}),
  'final-antechamber':memoryRoom('final-antechamber','2026','Final Chapter · Pale Interval','Antechamber of Burden','candlestick',{exits:{left:'final-engine',right:'final-unremembered'},decor:'mirror',safe:true,enemies:[],interact:[{id:'final-choice-burden-carry',x:82,y:62,w:22,h:14,label:'Carry the eight lives',kind:'final-choice',choiceGroup:'burden',choiceValue:'carry',text:['Elena refuses to treat the eight recovered lives as tools used up by the investigation.','She carries their unresolved contradictions into the final room.']},{id:'final-choice-burden-release',x:216,y:62,w:22,h:14,label:'Release the eight lives',kind:'final-choice',choiceGroup:'burden',choiceValue:'release',text:['Elena lets the eight lives separate from Blackthorn’s mechanism.','The corridor becomes lighter and less certain.']}],enter:['ANTECHAMBER OF BURDEN','The last door asks no question aloud.']}),
  'final-unremembered':memoryRoom('final-unremembered','2026','Final Chapter · Pale Interval','The Pale Interval','candlestick',{exits:{left:'final-antechamber'},decor:'boss',boss:true,enemies:[{type:'the-unremembered',x:224,y:108,boss:true}],interact:[{id:'final-boss-mind',x:64,y:48,w:20,h:16,label:'Witness aperture',kind:'final-sigil-puzzle',requiredSigil:'reveal-mind-i',requiredIntensity:3,text:['A face appears only when Elena remembers who once looked back.','REVEAL + MIND + III must hold the relationship in view.']},{id:'final-boss-flesh',x:150,y:126,w:20,h:16,label:'Living suture',kind:'final-sigil-puzzle',requiredSigil:'purge-flesh-i',requiredIntensity:3,text:['The entity wears borrowed grief like tissue.','PURGE + FLESH + III can separate pain from ownership.']},{id:'final-boss-void',x:244,y:48,w:20,h:16,label:'Boundary bracket',kind:'final-sigil-puzzle',requiredSigil:'bind-void-i',requiredIntensity:3,text:['The entity keeps becoming the room around Elena.','BIND + VOID + III can force it to remain one thing.']},{id:'final-perception-anchor',x:150,y:46,w:20,h:14,label:'Look into the absence',kind:'final-perception-anchor',text:['Elena stops trying to make the absence look human.','PERCEPTION drops, but the lie becomes easier to distinguish from the room.']},{id:'final-boss-focus',x:142,y:84,w:36,h:18,label:'Speak the relationships',kind:'final-boss-focus',bossType:'the-unremembered',text:['Elena names relationships instead of facts: who remembered whom, who contradicted whom, who chose to keep looking.','The Unremembered is forced into a single local outline.']}],enter:['THE UNREMEMBERED','It has no face because a face would imply someone once knew it.','The final phase requires all three Sigil schools, deliberate low Perception and the choices Elena carried here.'],corruption:[[18,66,284,92]],lights:[[160,42,52]]}),

};


// PHASE 11 · NARRATIVE / LORE
// Evidence is collected by inspecting physical objects. The archive preserves
// contradictions instead of flattening every century into one canonical account.
const PHASE11_REWRITES={
  'c5-item':{label:'Eleanor’s measured plan',text:['Exterior width: sixty-four feet. Interior east-west run: seventy-one.','Eleanor circles the seven-foot surplus and writes: “Do not correct it. Build around it.”','A second line, in much newer pencil, reads: “That was the first mistake we survived.”']},
  'c5-secret':{label:'Name beneath the plaster',text:['Behind wet lime, Eleanor finds a surveyor’s mark: E. VOSS.','Her 1790 account book names no Voss, and the family archive claims the name first entered Blackthorn in 1987.','Someone has tried to plaster the letters twice.']},
  'c5-sequence-1':{label:'West datum pin',text:['Eleanor rotates the drawing room until the west wall meets the ink stain on her plan.','The windows stop migrating between measurements.','First relation fixed: room to drawing.']},
  'c5-note-2':{label:'Mason’s daybook',text:['“Paid six men for the ninth room before the foundation trench was opened.”','The foreman later crosses out ninth and writes “storage”.','The wage total still pays six men for a room the corrected page denies.']},
  'c5-sequence-2':{label:'Fourteenth riser',text:['The stair has thirteen risers from below and fourteen from above.','Eleanor marks the impossible riser with chalk rather than rebuilding it.','Second relation fixed: path to witness.']},
  'c5-safe':{label:'Eleanor’s reading chair',text:['A list of names has been stitched into the chair lining.','Each name belongs to someone who remembered a room after everyone else forgot it.','The memory steadies while Eleanor reads them aloud.']},
  'c5-sequence-3':{label:'Foundation triangle',text:['Three brass datum pins refuse ordinary geometry.','Using the surplus seven feet from Eleanor’s plan, they form a stable triangle around empty ground.','Third relation fixed: house to absence.']},
  'c5-note-6':{label:'The impossible lease',text:['TENANT: blank. TERM: “while remembered by another.” RENT: “one relation per generation.”','Eleanor’s signature appears as landlord and witness.','A second witness line contains only an indentation where a name was removed.']},
  'c5-note-7':{label:'Relationship plates',text:['The hall portraits carry no names: MOTHER, BUILDER, WITNESS, STRANGER.','One plate reads TENANT though the frame is empty.','Eleanor writes: “A name can be removed. A relation leaves a shape.”']},
  'c5-focus':{label:'Foundation covenant',text:['The brass plate reads: BLACKTHORN HOUSE — BUILT AROUND WHAT MUST NOT BE MADE ONE.','Eleanor’s final annotation: “If the Tenant becomes the whole house, force it back into one room.”']},

  'c6-item':{label:'Two-soldier mud map',text:['Elias overlays maps drawn by Corporals Finch and Arendt. Their trenches disagree by thirty yards.','Where both men remember the same turn, the paper stays dry.','Where only one remembers it, mud beads on the map from nowhere.']},
  'c6-sequence-1':{label:'Casualty tag pair',text:['A wounded man has two identity tags and two witnesses who disagree on his surname.','Elias keeps both testimonies instead of choosing one.','First relation fixed: body to witnesses.']},
  'c6-note-2':{label:'Dead field telephone',text:['The handset rings after the line is cut.','A voice reads tomorrow’s casualty list, then adds: “Do not let the clerk make us agree.”','Elias recognizes his own voice, older and exhausted.']},
  'c6-sequence-2':{label:'Dugout testimonies',text:['Two diaries describe the same shell burst from incompatible positions.','Both contain the sentence: “Ward pulled me under cover.”','Second relation fixed: event to contradiction.']},
  'c6-safe':{label:'Unshared cup of tea',text:['Someone has kept one enamel cup warm for a soldier whose bunk is empty.','No one can supply his name, but three men remember how he took his tea.','The memory steadies around the habit.']},
  'c6-sequence-3':{label:'Overlaid trench sheets',text:['Elias overlays the two field maps without erasing either route.','The contradictory loop becomes the only path that reaches Company Line.','Third relation fixed: place to disagreement.']},
  'c6-secret':{label:'School register from 1974',text:['Inside a 1917 map case is a school register dated 1974.','Pupil: THEODORE VOSS. Emergency contact: BLACKTHORN MANOR.','Elias has never heard either name, yet remembers the boy’s handwriting.']},
  'c6-note-7':{label:'Company roll call',text:['Thirty-two names are written. Thirty-one soldiers answer.','At the blank between Finch and Ward, two different voices answer “present.”','The lieutenant orders the clerk to leave the discrepancy untouched.']},
  'c6-focus':{label:'Paired identity discs',text:['Two discs bear different names but the same service number.','Elias locks them together: neither account is allowed to become the only man.','The Company Without Faces is forced to occupy one remembered formation.']},

  'c7-item':{label:'Night engineer reel',text:['Naomi records ten licensed frequencies and one carrier with no transmitter.','Frequency Eleven appears only when two listeners monitor together.','Alone, each listener hears ordinary static.']},
  'c7-sequence-1':{label:'Generator phase recording',text:['[REEL 3A] Naomi offsets the generator by seven degrees.','A voice emerges beneath the hum: “Relationship is the carrier.”','First lock established: power to signal.']},
  'c7-note-2':{label:'Control-room dictation',text:['[DICTATION] “Bearing places the transmission west. Signal delay places it beneath us.”','Naomi adds: “The equipment disagrees because it is measuring place and memory as if they were the same thing.”']},
  'c7-sequence-2':{label:'Aerial bearing tape',text:['[TAPE] The aerial turns toward a dead bearing and Frequency Eleven strengthens.','A child hums three notes before any microphone is opened.','Second lock established: direction to listener.']},
  'c7-safe':{label:'Listening-booth silence',text:['Naomi removes the headphones. The impossible carrier stops.','Her colleague still hears it.','For thirty seconds, they write separate transcripts without comparing them.']},
  'c7-sequence-3':{label:'Three-call composite',text:['[COMPOSITE] Three calls share one phrase despite different voices and dates: “Keep both versions.”','One caller gives the year as 1790. Another says 1917. The third says tonight.','Third lock established: signal to recurrence.']},
  'c7-secret':{label:'Unbroadcast lullaby',text:['A sealed reel contains a lullaby Naomi never aired.','The melody is the one Elena Voss remembers from childhood.','A voice at the end whispers: “You heard this before I recorded it.”']},
  'c7-note-7':{label:'Roof microphone test',text:['[FIELD TAPE] Lightning outlines an east wing that will not exist on the estate plan for seven more years.','The microphone captures a door closing inside that future wing.','Naomi says nothing for eleven seconds.']},
  'c7-focus':{label:'Carrier lock',text:['Naomi stops tuning for coordinates and tunes for paired listeners.','Frequency Eleven collapses into one local carrier.','The Dead Frequency can no longer hide across every receiver at once.']},

  'c8-item':{label:'Tape Zero',text:['[TAPE 0 · 00:00–00:13] Thirteen seconds exist before Theo presses RECORD.','An older Elena says: “Theo, do not fix the room into one version.”','Theo has no daughter, niece or colleague named Elena.']},
  'c8-sequence-1':{label:'Site-office slate',text:['[VIDEO SLATE] Theo places Eleanor’s 1790 plan beside the 1987 restoration drawings.','The same seven-foot surplus appears in both, though the modern survey claims it was corrected.','First continuity point: plan to restoration.']},
  'c8-note-2':{label:'Great Hall camera log',text:['[CAMERA LOG] Frame 1842 shows Theo entering from a doorway not yet uncovered.','Frame 1843 shows intact plaster where he emerged.','The timecode advances normally.']},
  'c8-sequence-2':{label:'Dual-camera sync',text:['[SYNC TEST] Camera A loses one frame. Camera B gains the same frame from a different angle.','Theo keeps both reels untrimmed.','Second continuity point: loss to witness.']},
  'c8-safe':{label:'Attic cassette shelf',text:['Theo labels each cassette before recording it.','One label already reads TOMORROW — DO NOT ERASE.','He leaves it sealed and the room stops changing.']},
  'c8-secret':{label:'Slate addressed to Elena',text:['A restoration slate reads: KEEP ELENA VOSS OUT OF THE ROOT ROOM.','The slate is dated 17 OCT 1987.','Theo underlines VOSS three times, then writes: “If she exists, I failed and succeeded.”']},
  'c8-sequence-3':{label:'Impossible splice',text:['[EDIT BENCH] Theo refuses to cut the missing frame out of continuity.','He marks the splice with black leader and leaves the contradiction visible.','Third continuity point: edit to evidence.']},
  'c8-note-7':{label:'Camera-corridor voice memo',text:['[VOICE MEMO] “The camera sees me leave a room that the building has not made yet.”','Theo breathes, then adds: “Eleanor did not build a haunted house. She built an argument against erasure.”']},
  'c8-focus':{label:'Splice deck',text:['Theo traps the missing frame between two intact shots instead of deleting it.','The Man in the Missing Frame is forced to exist at one edit point long enough to strike.']},
};

const PHASE11_SECRETS=[
  ['manor-attic-stairs',{id:'secret-manor-attic',x:250,y:54,w:11,h:9,label:'Ribbon behind the lath',kind:'lore-secret',text:['A child’s black ribbon is pinned behind the wall lath.','Inside the fold: MARA, stitched in faded red thread.','The timber around it was installed decades before the nursery existed.']}],
  ['manor-boiler',{id:'secret-boiler-date',x:246,y:118,w:13,h:10,label:'Layered service plate',kind:'lore-secret',text:['Four maintenance plates occupy the same screw holes: 1790, 1917, 1956, 1987.','The oldest plate describes a boiler. The house had no boiler in 1790.','Each plate carries the same tiny three-pronged repair mark.']}],
  ['echo-crypt',{id:'secret-c1-mara-choir',x:76,y:54,w:13,h:10,label:'Unburied bone tag',kind:'lore-secret',text:['Bone tag: MARA — choir — NOT BURIED.','The grave map has no Mara, but Patient Nine’s wooden token carries the same name.','Ysabel’s ledger records neither object.']}],
  ['echo-sacrifice-vault',{id:'secret-c2-blackthorn-star',x:246,y:122,w:12,h:10,label:'Thorn-star tablet',kind:'lore-secret',text:['Asterion’s seventh-star tablet ends in a black thorn-shaped mark.','The mark matches Blackthorn’s chapel seal three thousand years later.','Nara calls it “the sign for a place built around absence.”']}],
  ['echo-prefect-vault',{id:'secret-c3-blank-tax',x:244,y:120,w:13,h:10,label:'Tax for no address',kind:'lore-secret',text:['A tax assessment charges grain to HOUSE WITHOUT ADDRESS.','The owner field is blank; the witness field carries the same thorn-star mark found in Asterion.','Marcus refuses the clerk’s request to strike the line.']}],
  ['echo-mirror-observatory',{id:'secret-c4-elena-anatomy',x:76,y:118,w:13,h:10,label:'Future anatomical plate',kind:'lore-secret',text:['Behind the black mirror is an anatomical plate on machine-made paper.','The margin reads: E. VOSS · 2026 · “Relation persists after image loss.”','Lucia cannot read the language, but recognizes her own diagram beneath it.']}],
  ['final-index-loss',{id:'secret-final-first-erasure',x:246,y:52,w:13,h:10,label:'MARA index',kind:'lore-secret',text:['MARA is not one immortal witness. The index contains several unrelated people whose surviving records collapsed to the same four letters.','Blackthorn kept the repeated shape because the relationships around each Mara were different.','The Unremembered erases distinctions first; coincidence is sometimes the scar it leaves.']}],
];
for(const [roomId,item] of PHASE11_SECRETS){if(ROOMS[roomId]&&!ROOMS[roomId].interact.some(x=>x.id===item.id))ROOMS[roomId].interact.push(item);}
for(const room of Object.values(ROOMS))for(const item of room.interact||[])if(PHASE11_REWRITES[item.id])Object.assign(item,PHASE11_REWRITES[item.id]);

const LORE_DOCUMENT_IDS=['letter','front-register','estate-plan','marginalia-1909','corridor-photograph','servant-roster','landing-portrait','childhood-box','c3-token-one','lineage-ledger','archive-index','prior-order','infirmary-tally','ysabel-ledger','missing-homily','grave-map','bone-tags','clapper-record','ysabel-confession','c2-tide-tablet','c2-map','c2-captain-log','c2-offering','c2-last-inscription','c3-gate-order','c3-ledger-note','c3-statue','c3-death-roll','c3-prefect-letter','c4-lecture-note','c4-vellum','c4-printer-note','c4-autopsy','c4-lucia-letter','c5-item','c5-note-2','c5-note-6','c6-item','c6-note-2','c3-token-three'];
const LORE_NOTE_IDS=['portrait-gap','hall-clock','ysabel-portrait','gallery-seam','place-setting-nine','black-thorn-tree','chapel-kneeler','stair-scratches','nursery-mobile','attic-thread','cellar-wall','boiler-pressure','quarantine-mark','c2-brine-note','c4-observer','c5-note-7','c6-note-7','final-threshold-note','guest-book','c3-token-two'];
const LORE_RECORDING_IDS=['study-dictaphone','c7-item','c7-sequence-1','c7-note-2','c7-sequence-2','c7-sequence-3','c8-item','c8-sequence-1','c8-note-2','c8-sequence-2','c8-sequence-3','c8-note-7'];
const LORE_SECRET_IDS=['patient-nine','c2-secret-shell','c3-secret-name','c4-secret-scalpel','c5-secret','c6-secret','c7-secret','c8-secret','secret-manor-attic','secret-boiler-date','secret-c1-mara-choir','secret-c2-blackthorn-star','secret-c3-blank-tax','secret-c4-elena-anatomy','secret-final-first-erasure'];
const LORE_TARGETS=Object.freeze({document:40,note:20,recording:12,secret:15,total:87});
const maraIds=new Set(['patient-nine','c3-secret-name','secret-manor-attic','secret-c1-mara-choir','secret-final-first-erasure']);
const threadFor=(room,id)=>maraIds.has(id)?'MARA / RECURRING NAME':id.startsWith('c2-')||room.era==='1198 BCE'?'GEOMETRY OF ABSENCE':id.startsWith('c3-')||room.era==='395 CE'?'RECORDS THAT DISAGREE':id.startsWith('c4-')||room.era==='1587'?'THE SECOND BODY':id.startsWith('c5-')||room.era==='1790'?'HOUSE AS MEMORY':id.startsWith('c6-')||room.era==='1917'?'TWO WITNESSES':id.startsWith('c7-')||room.era==='1956'?'THE ELEVENTH CARRIER':id.startsWith('c8-')||room.era==='1987'?'FRAME ZERO':id.startsWith('final-')?'RELATIONSHIP / ERASURE':room.area==='Blackthorn Manor'?'BLACKTHORN INDEX':'SAINT ORREN';
const annotationFor=t=>t==='secret'?'COUNTER-MEMORY · This evidence conflicts with the tidiest surviving account.':t==='recording'?'RECORDED EVIDENCE · Order, silence and the presence of another listener may matter.':t==='document'?'DOCUMENTARY EVIDENCE · Dates and administrative certainty are not guarantees of truth.':'PERSONAL NOTE · Useful because memory can be sincere and still be wrong.';
const wanted=new Map([...LORE_DOCUMENT_IDS.map(id=>[id,'document']),...LORE_NOTE_IDS.map(id=>[id,'note']),...LORE_RECORDING_IDS.map(id=>[id,'recording']),...LORE_SECRET_IDS.map(id=>[id,'secret'])]);
const LORE_CATALOG={};
for(const room of Object.values(ROOMS))for(const item of room.interact||[]){const type=wanted.get(item.id);if(!type)continue;LORE_CATALOG[item.id]={id:item.id,type,title:item.label,era:room.era,area:room.area,room:room.name,thread:threadFor(room,item.id),annotation:annotationFor(type),text:[...(item.text||[item.label])]};}
const LORE_LINKS={
  'patient-nine':['secret-c1-mara-choir','c3-secret-name','secret-final-first-erasure'],
  'secret-c1-mara-choir':['patient-nine','c3-secret-name','secret-final-first-erasure'],
  'c3-secret-name':['patient-nine','secret-manor-attic','secret-final-first-erasure'],
  'secret-final-first-erasure':['patient-nine','c3-secret-name','secret-c1-mara-choir'],
  'c5-secret':['corridor-photograph','c8-secret','secret-boiler-date'],
  'c7-secret':['childhood-box','study-dictaphone','c8-item'],
  'c8-secret':['c5-secret','c8-item','final-threshold-note'],
  'secret-c2-blackthorn-star':['chapel-seal','secret-c3-blank-tax'],
  'secret-c3-blank-tax':['secret-c2-blackthorn-star','lineage-ledger'],
  'secret-c4-elena-anatomy':['c4-observer','final-threshold-note'],
  'final-threshold-note':['lineage-ledger','c8-secret','secret-final-first-erasure'],
};


// PHASE 12 · ENDINGS
// Endings are consequences of existing play-state. There is no ending picker.
const TRUE_ENDING_KEY_EVIDENCE=Object.freeze([
  'ysabel-confession','c2-last-inscription','c3-prefect-letter','c4-lucia-letter',
  'c5-note-6','c6-item','c7-sequence-3','c8-item','secret-final-first-erasure'
]);
const ENDING_PROFILES=Object.freeze({
  normal:{
    id:'normal',title:'THE HOUSE OF WITNESSES',subtitle:'Normal Ending · The Door Stays Open',achievement:'ending-house-witnesses',
    accent:'#9f796b',
    pages:[
      ['DAWN · BLACKTHORN MANOR','Rain stops without anyone noticing when it happened.','Elena reaches the Root Door and finds ordinary wood where the Pale Interval had been.'],
      ['THE ARCHIVE REMAINS','She refuses to turn Blackthorn into proof of one clean history. The archive keeps contradictions beside one another.','Some names remain incomplete. Some rooms still measure wrong. They are allowed to.'],
      ['A WITNESS, NOT A WARDEN','Elena stays long enough to catalogue what can be shared and lock away what can only be understood in context.','The house no longer asks one person to remember everyone.'],
      ['EPILOGUE','Months later, the visitor register contains new handwriting. Researchers disagree over dates, rooms and people — and nobody disappears because of the disagreement.','Blackthorn still remembers. It simply no longer remembers alone.']
    ]
  },
  dark:{
    id:'dark',title:'THE NINTH TENANT',subtitle:'Dark Ending · One Version Survives',achievement:'ending-ninth-tenant',
    accent:'#815b69',
    pages:[
      ['DAWN DOES NOT ENTER','The storm ends, but the windows keep reflecting night.','Elena discovers that every corridor now agrees with the estate plan. Nothing is missing. Nothing contradicts anything.'],
      ['THE PERFECT RECORD','The archive has become beautifully consistent. Duplicate testimonies are gone. Impossible warnings are gone. The eight lives fit into eight neat folders.','The silence feels like relief until Elena notices how many names she can no longer say.'],
      ['THE NEW RELATION','Blackthorn needed no monster beneath it. It needed a single witness willing to decide which memory counted.','On the brass plate outside the Root Door, a ninth role appears: TENANT.'],
      ['EPILOGUE','The next owner finds a house with impeccable records and one locked room that does not appear on any plan.','Inside is a visitor register. Every page contains the same careful signature: ELENA VOSS.']
    ]
  },
  true:{
    id:'true',title:'NO ONE REMEMBERS ALONE',subtitle:'True Ending · The House Lets Go',achievement:'ending-no-one-alone',
    accent:'#b29375',
    pages:[
      ['THE LAST CONTRADICTION','Elena returns to the Root Door carrying every counter-memory she could find.','The house offers one final temptation: preserve everything here forever, safe from ordinary forgetting. She refuses the premise.'],
      ['EIGHT LIVES, EIGHT EXITS','Ysabel, Nara, Marcus, Lucia, Eleanor, Elias, Naomi and Theo are not merged into Blackthorn and not reduced to lessons for Elena.','Their records separate. The Memory Spines go cold one by one. Nothing is destroyed. Nothing is required to remain trapped.'],
      ['THE ENGINE OPENS','MIND keeps the contradictions visible. FLESH separates inheritance from contamination. VOID gives the absence a boundary and then releases it.','The Palimpsest Engine stops storing the distance between memories. The impossible seven feet vanish from the house.'],
      ['MARA','The recurring four letters resolve not into one immortal person, but into many erased people whose records had been forced into the same empty shape.','Elena writes their separate names where they are known — and leaves honest blanks where they are not.'],
      ['EPILOGUE','By winter, Blackthorn Manor is an old, difficult building with drafts, bad plumbing and exactly the number of rooms shown on its plans.','For the first time, Blackthorn forgets — and nobody is lost.']
    ]
  }
});

function evaluateEnding(save){
  const choices=save?.finalChoices||{},lore=new Set(save?.lore||[]),sigils=new Set(save?.sigils||[]);
  const secretCount=[...lore].filter(id=>LORE_CATALOG[id]?.type==='secret').length;
  const keyEvidence=TRUE_ENDING_KEY_EVIDENCE.filter(id=>lore.has(id));
  const choicesTrue=choices.witness==='preserve'&&choices.name==='keep'&&choices.burden==='release';
  const sigilMastery=SIGILS.every(x=>sigils.has(x.id))&&Number(save?.sigilMaxIntensity||0)>=3;
  const finalGrammar=['final-boss-mind','final-boss-flesh','final-boss-void'].every(id=>(save?.flags||[]).includes(id));
  const trueReady=!!save?.phase9Complete&&choicesTrue&&secretCount===15&&keyEvidence.length===TRUE_ENDING_KEY_EVIDENCE.length&&sigilMastery&&finalGrammar;
  const darkSignals=[choices.witness==='collapse',choices.name==='erase',choices.burden==='carry'].filter(Boolean).length;
  const id=trueReady?'true':darkSignals>=2?'dark':'normal';
  return {id,profile:ENDING_PROFILES[id],trueReady,secretCount,keyEvidence:keyEvidence.length,keyEvidenceTarget:TRUE_ENDING_KEY_EVIDENCE.length,sigilMastery,finalGrammar,darkSignals,choicesTrue};
}


// PHASE 13 · NEW GAME+
// A second reading restarts campaign progression but preserves meta-knowledge.
const NGPLUS_TRAITS=Object.freeze({
  normal:{id:'witness-thread',name:'WITNESS THREAD',sigils:['ward-mind-i'],desc:'A remembered habit of preserving more than one account.'},
  dark:{id:'tenant-mark',name:'TENANT MARK',sigils:['brand-void-i'],desc:'A trace of the version that chose one record over the others.'},
  true:{id:'open-hand',name:'OPEN HAND',sigils:['reveal-mind-i','mend-flesh-i'],desc:'Released memories return as knowledge rather than possession.'}
});
const NGPLUS_ECHOES=Object.freeze({
  'manor-library':{id:'ngp-library',x:282,y:132,w:9,h:9,label:'Refracted ink',text:['A sentence appears in the margin before Elena opens the estate plan.','“A second reading is not the same event repeated. It is a witness carrying context.”']},
  'echo-nave':{id:'ngp-saint-orren',x:282,y:132,w:9,h:9,label:'Second bell-mark',text:['A hairline ring is scratched around the bell inventory. Ysabel did not make it the first time.','Twenty-one names remain twenty-one even when the reader already knows how the bell ends.']},
  'echo-star-court':{id:'ngp-asterion',x:282,y:132,w:9,h:9,label:'Eighth horizon',text:['The drowned star now has a second notation: not a destination, but a return path.','Nara’s map distinguishes remembering a place from remembering that you have remembered it before.']},
  'echo-basilica-archive':{id:'ngp-vespera',x:282,y:132,w:9,h:9,label:'Duplicate hand',text:['A census correction is written in Elena’s hand centuries before her birth.','The line does not replace Marcus’s record. It sits beside it: SECOND READING — DO NOT MERGE.']},
  'echo-mirror-observatory':{id:'ngp-varetti',x:282,y:132,w:9,h:9,label:'Third reflection',text:['Lucia’s black mirror reflects the room Elena finished in another history.','The reflection carries consequences, not objects. That difference appears to matter.']},
  'echo-1790-library':{id:'ngp-eleanor',x:282,y:132,w:9,h:9,label:'Palimpsest clause',text:['Eleanor has added a clause beneath her first survey: “Never let the first reading become the house.”','The ink is dry before she reaches the library.']},
  'echo-1917-dugout':{id:'ngp-elias',x:282,y:132,w:9,h:9,label:'Returned route',text:['The trench map includes a dotted route marked ONLY FOR ONE WHO HAS ALREADY RETURNED.','Elias has never walked it. Elena remembers that she has.']},
  'echo-1956-control':{id:'ngp-naomi',x:282,y:132,w:9,h:9,label:'Cycle carrier',text:['Frequency Eleven carries a second signal beneath the first.','It contains no voice — only the timing of choices Elena made after Naomi died.']},
  'echo-1987-tape':{id:'ngp-theo',x:282,y:132,w:9,h:9,label:'Second take',text:['Tape Zero has acquired a second leader labelled TAKE TWO / KEEP BOTH.','Theo’s recorder remembers that Elena once reached an ending he has not lived to see.']}
});
const NGPLUS_ECHO_TARGET=Object.keys(NGPLUS_ECHOES).length;

const MANOR_FLOORS=[
  {id:1,label:'UPPER FLOOR'},
  {id:0,label:'GROUND FLOOR'},
  {id:-1,label:'BASEMENT'},
];

const MANOR_REQUIRED_PHASE2=['map:estate','key:blackthorn','mark:chapel','key:service','mark:lineage'];
const SLICE_SEQUENCE=['manor-vestibule','manor-hall','manor-gallery','echo-priory-gate','echo-infirmary-court','echo-apothecary','echo-nave','echo-cloister','echo-plague-ward','echo-ossuary','echo-crypt','echo-belfry-stairs','echo-bell-chamber','manor-gallery-after'];
const SLICE_ACHIEVEMENTS=[
  {id:'first-step',name:'The House Opens',desc:'Enter Blackthorn Manor.'},
  {id:'first-anchor',name:'Borrowed Century',desc:'Enter a Memory Echo.'},
  {id:'clear-crypt',name:'No Grave Keeps Quiet',desc:'Clear the Bell Crypt.'},
  {id:'bell-silenced',name:'Tongueless',desc:'Defeat the Bell Without a Tongue.'},
  {id:'saint-orren-complete',name:'Twenty-One Names',desc:'Complete Ysabel Thorne’s full Saint Orren memory.'},
  {id:'three-resonators',name:'The Wall Remembers a Door',desc:'Strike the Saint Orren resonators in the correct order.'},
  {id:'patient-nine',name:'The Ninth Cot',desc:'Find the optional patient hidden from ordinary memory.'},
  {id:'hold-attention',name:'Hold Attention',desc:'Use WARD + MIND + I below 50 Perception.'},
  {id:'unreliable-witness',name:'Unreliable Witness',desc:'Complete Blackthorn’s four-level Perception calibration.'},
  {id:'cartographer',name:'Impossible Survey',desc:'Recover Blackthorn Manor’s estate plan.'},
  {id:'house-indexed',name:'The House Is an Index',desc:'Reach and understand the Memory Vault.'},
  {id:'two-ways-home',name:'Servants Knew Better',desc:'Open both Manor shortcuts.'},
  {id:'perfect-answer',name:'Perfect Answer',desc:'Land a perfect parry.'},
  {id:'break-the-shape',name:'Break the Shape',desc:'Stagger an enemy by breaking its poise.'},
  {id:'four-ways-to-hurt',name:'Four Ways to Hurt',desc:'Complete the controlled weapon imprint.'},
  {id:'grammar-of-three',name:'Grammar of Three',desc:'Resolve all three Sigil Lattice schools.'},
  {id:'twelve-words',name:'Twelve Words',desc:'Complete the controlled Sigil Lattice.'},
  {id:'salt-stars-complete',name:'Salt Under the Stars',desc:'Complete Nara Kesh’s 1198 BCE memory.'},
  {id:'black-shell',name:'The Sea Remembers',desc:'Find the impossible black shell in Asterion.'},
  {id:'last-census-complete',name:'The Last Census',desc:'Complete Marcus Aelian’s 395 CE memory.'},
  {id:'vespera-child',name:'A Name Under the Desk',desc:'Find the hidden recurring name in Vespera.'},
  {id:'anatomy-shadow-complete',name:'The Anatomy of a Shadow',desc:'Complete Lucia Varetti’s 1587 memory.'},
  {id:'cold-scalpel',name:'Two Shadows',desc:'Find Lucia’s impossible scalpel.'},
  {id:'phase7-complete',name:'Three Recovered Centuries',desc:'Complete historical Chapters II–IV.'},
  {id:'house-name-complete',name:'The House Learns Your Name',desc:'Complete Eleanor Blackthorn’s 1790 memory.'},
  {id:'first-blackthorn-name',name:'Name Under Plaster',desc:'Find the impossible Voss name beneath the first house.'},
  {id:'mud-remembers-complete',name:'Mud Remembers',desc:'Complete Elias Ward’s 1917 memory.'},
  {id:'ward-class',name:'The Pupil Who Wasn’t Born',desc:'Find Elias Ward’s impossible class register.'},
  {id:'broadcast-eleven-complete',name:'Broadcast Eleven',desc:'Complete Naomi Pike’s 1956 memory.'},
  {id:'lullaby-eleven',name:'Before You Were Born',desc:'Find the unbroadcast Northmere lullaby.'},
  {id:'tape-zero-complete',name:'Tape Zero',desc:'Complete Theo Voss’s 1987 memory.'},
  {id:'elena-slate',name:'Keep Her Out',desc:'Find Theo’s impossible warning about Elena.'},
  {id:'phase8-complete',name:'Eight Memory Spines',desc:'Recover all eight historical chapters.'},
  {id:'root-door-open',name:'The Ninth Witness',desc:'Open the Root Door after recovering all eight Memory Spines.'},
  {id:'three-relations',name:'Three Relations',desc:'Reconstruct the final route through contradiction, recognition and choice.'},
  {id:'three-schools-final',name:'Grammar Against Oblivion',desc:'Use Mind, Flesh and Void at maximum intensity in the Pale Interval.'},
  {id:'unremembered-defeated',name:'The Unremembered',desc:'Defeat the entity behind Blackthorn’s erased relationships.'},
  {id:'phase9-complete',name:'The Room Behind Memory',desc:'Complete the 2026 final chapter.'},
  {id:'paper-trail',name:'Paper Trail',desc:'Recover twenty pieces of evidence.'},
  {id:'counter-memory',name:'Counter-Memory',desc:'Recover the complete 87-entry Blackthorn evidence archive.'},
  {id:'ending-house-witnesses',name:'The House of Witnesses',desc:'Reach the Normal Ending.'},
  {id:'ending-ninth-tenant',name:'The Ninth Tenant',desc:'Reach the Dark Ending.'},
  {id:'ending-no-one-alone',name:'No One Remembers Alone',desc:'Reach the True Ending.'},
  {id:'true-ending',name:'Nothing Made One',desc:'Preserve the contradictions, recover the counter-memories and release Blackthorn’s eight lives.'},
  {id:'second-reading',name:'Second Reading',desc:'Begin New Game+ without carrying campaign progression across the threshold.'},
  {id:'refracted-nine',name:'Nine Refracted Memories',desc:'Recover all nine New Game+ refracted memories in one cycle.'},
  {id:'three-versions',name:'Three Incompatible Endings',desc:'Begin a New Game+ cycle after seeing Normal, Dark and True endings.'},
];


/* ===== save.js ===== */
const SETTINGS_KEY='blackthorn404.settings.v1';
const ACTIVE_SLOT_KEY='blackthorn404.activeSlot';
const SLOT_PREFIX='blackthorn404.slot.';
const BACKUP_PREFIX='blackthorn404.backup.';
const ROOM_IDS=new Set(Object.keys(ROOMS));
const WEAPON_IDS=new Set(WEAPONS.map(x=>x.id));
const SIGIL_IDS=new Set(SIGILS.map(x=>x.id));
const knownRoom=(id,fallback)=>typeof id==='string'&&ROOM_IDS.has(id)?id:fallback;
const finiteNonNegative=(value,fallback=0)=>{const n=Number(value);return Number.isFinite(n)&&n>=0?n:fallback;};
const safeParse=(v,f)=>{try{return JSON.parse(v)??f}catch{return f}};
const storageGet=k=>{try{return localStorage.getItem(k)}catch{return null}};
const storageSet=(k,v)=>{try{localStorage.setItem(k,v);return true}catch{return false}};
const storageRemove=k=>{try{localStorage.removeItem(k);return true}catch{return false}};
const slotKey=n=>`${SLOT_PREFIX}${n}`;
const backupKey=n=>`${BACKUP_PREFIX}${n}`;

function defaultSave(){return {
  schema:SAVE_SCHEMA,createdAt:Date.now(),updatedAt:Date.now(),room:'manor-vestibule',previousRoom:null,
  health:100,perception:100,stability:100,stamina:100,weapon:'candlestick',weapons:['candlestick'],ammo:{revolver:{clip:6,reserve:18},bolt:{clip:1,reserve:8},flare:{clip:1,reserve:5}},sigils:['bind-void-i'],equippedSigil:'bind-void-i',
  flags:[],notes:[],lore:[],achievements:[],bosses:[],rooms:['manor-vestibule'],playSeconds:0,deaths:0,sliceComplete:false,
  houseStage:0,mapUnlocked:false,phase2Complete:false,phase3Complete:false,phase4Complete:false,phase5Complete:false,phase6Complete:false,phase7Complete:false,phase8Complete:false,phase9Complete:false,phase12Complete:false,ending:null,endingsSeen:[],endingStats:{},ngPlus:false,ngPlusCycle:0,ngPlusSourceEnding:null,ngPlusTrait:null,ngPlusEchoes:[],ngPlusEchoComplete:false,legacyLore:[],legacySigils:[],ngPlusHistory:[],legacyPlaySeconds:0,finalSequenceStep:0,finalSigilFlags:[],finalChoices:{},chapterProgress:{c2:0,c3:0,c4:0,c5:0,c6:0,c7:0,c8:0},chapterStats:{c2:{secrets:0},c3:{secrets:0},c4:{secrets:0},c5:{secrets:0},c6:{secrets:0},c7:{secrets:0},c8:{secrets:0}},chapter1PuzzleStep:0,memorySafeRoom:'echo-priory-gate',chapter1Stats:{soundStrikes:0,hollowsDrawn:0,secrets:0},sigilIntensity:1,sigilMaxIntensity:1,sigilPuzzleFlags:[],sigilStats:{casts:0,schools:{FLESH:0,MIND:0,VOID:0},maxIntensity:1},safeRoom:'manor-vestibule',manorVisits:0,
  perceptionTiersSeen:[],perceptionMaxTier:0,perceptionTrialStep:0,combatStats:{parries:0,staggers:0,rangedHits:0,heavyHits:0},
};}

function normalizeSave(raw){
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
function createNewGamePlus(source){
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
function loadSlot(n){return normalizeSave(safeParse(storageGet(slotKey(n)),null));}
function saveSlot(n,save){
  const key=slotKey(n),existing=storageGet(key);if(existing)storageSet(backupKey(n),existing);
  const clean=normalizeSave(save);clean.updatedAt=Date.now();storageSet(key,JSON.stringify(clean));return clean;
}
function recoverSlot(n){const raw=safeParse(storageGet(backupKey(n)),null);if(!raw)return null;const clean=normalizeSave(raw);storageSet(slotKey(n),JSON.stringify(clean));return clean;}
function clearSlot(n){storageRemove(slotKey(n));storageRemove(backupKey(n));}
function getSlotSummary(n){const raw=safeParse(storageGet(slotKey(n)),null);if(!raw)return {slot:n,empty:true};const s=normalizeSave(raw);return {slot:n,empty:false,room:s.room,complete:s.phase12Complete||s.phase9Complete||s.phase8Complete||s.phase7Complete||s.phase6Complete||s.phase5Complete||s.phase4Complete||s.phase3Complete||s.phase2Complete||s.sliceComplete,phase2:s.phase2Complete,phase3:s.phase3Complete,phase4:s.phase4Complete,phase5:s.phase5Complete,phase6:s.phase6Complete,phase7:s.phase7Complete,phase8:s.phase8Complete,phase9:s.phase9Complete,phase12:s.phase12Complete,ending:s.ending,endingsSeen:s.endingsSeen,ngPlus:s.ngPlus,ngPlusCycle:s.ngPlusCycle,ngPlusSourceEnding:s.ngPlusSourceEnding,ngPlusEchoes:s.ngPlusEchoes,updatedAt:s.updatedAt,playSeconds:s.playSeconds,legacyPlaySeconds:s.legacyPlaySeconds};}
function getActiveSlot(){return Math.max(1,Math.min(3,Number(storageGet(ACTIVE_SLOT_KEY))||1));}
function setActiveSlot(n){const v=Math.max(1,Math.min(3,Number(n)||1));storageSet(ACTIVE_SLOT_KEY,String(v));return v;}
const parseSettings=()=>safeParse(storageGet(SETTINGS_KEY),{});
const saveSettings=s=>storageSet(SETTINGS_KEY,JSON.stringify(s));


/* ===== perception.js ===== */
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

class PerceptionSystem{
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


/* ===== combat.js ===== */
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const overlaps=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
function attackBox(player,reach=18){
  const p={x:player.x,y:player.y,w:player.w,h:player.h};
  if(player.facing==='left')return {x:p.x-reach,y:p.y-3,w:reach+4,h:p.h+6};
  if(player.facing==='right')return {x:p.x+p.w-4,y:p.y-3,w:reach+4,h:p.h+6};
  if(player.facing==='up')return {x:p.x-4,y:p.y-reach,w:p.w+8,h:reach+4};
  return {x:p.x-4,y:p.y+p.h-4,w:p.w+8,h:reach+4};
}
function damageActor(actor,amount,knock={x:0,y:0}){actor.hp=Math.max(0,actor.hp-amount);actor.hitFlash=.14;actor.x+=knock.x||0;actor.y+=knock.y||0;return actor.hp<=0;}
function phaseForBoss(hp,max){const r=hp/max;return r>.66?1:r>.33?2:3;}


/* ===== sigils.js ===== */
const sigilById=id=>SIGILS.find(s=>s.id===id)||SIGILS[0];
const romanIntensity=n=>['I','II','III'][Math.max(1,Math.min(3,Number(n)||1))-1];
const sigilLabel=(sigil,intensity=1)=>`${sigil.verb} + ${sigil.school} + ${romanIntensity(intensity)}`;
function sigilStats(sigil,intensity=1){const i=Math.max(1,Math.min(3,Number(intensity)||1))-1;return {cost:Array.isArray(sigil.cost)?sigil.cost[i]:sigil.cost,cooldown:Array.isArray(sigil.cooldown)?sigil.cooldown[i]:sigil.cooldown};}
function cycleSigil(save,dir=1){const owned=(save.sigils||[]).filter(id=>SIGILS.some(s=>s.id===id));if(!owned.length)return null;let i=Math.max(0,owned.indexOf(save.equippedSigil));i=(i+(dir<0?-1:1)+owned.length)%owned.length;save.equippedSigil=owned[i];return sigilById(save.equippedSigil);}
function cycleIntensity(save,dir=1){const max=Math.max(1,Math.min(3,Number(save.sigilMaxIntensity)||1));let i=Math.max(1,Math.min(max,Number(save.sigilIntensity)||1));i=((i-1+(dir<0?-1:1)+max)%max)+1;save.sigilIntensity=i;return i;}
function canCast(engine,sigil,intensity=engine.save.sigilIntensity||1){const st=sigilStats(sigil,intensity);return engine.sigilCooldown<=0&&engine.save.stability>=st.cost&&engine.mode==='playing';}
const aliveNearest=(engine,range=999)=>{const alive=engine.enemies.filter(e=>!e.dead);alive.sort((a,b)=>engine.distanceToPlayer(a)-engine.distanceToPlayer(b));return alive[0]&&engine.distanceToPlayer(alive[0])<=range?alive[0]:null;};
const hitSigil=(engine,target,damage,poise=0)=>{if(!target)return false;if(target.boss&&engine.bossVulnerable<=0){engine.spawnText('SILENT',target.x,target.y);return false;}target.hp=Math.max(0,target.hp-damage);target.hitFlash=.15;if(poise)engine.applyPoise(target,poise);engine.spawnBurst(target.x+target.w/2,target.y+target.h/2,9);if(target.hp<=0)engine.killEnemy(target);return true;};
function castSigil(engine){
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


/* ===== audio.js ===== */
class AudioSystem{
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


/* ===== engine.js ===== */
const dist=(a,b)=>Math.hypot((a.x+a.w/2)-(b.x+b.w/2),(a.y+a.h/2)-(b.y+b.h/2));
const seeded=(n)=>{const x=Math.sin(n*999.1)*43758.5453;return x-Math.floor(x)};
const hasAll=(arr,flags)=>!arr||arr.every(f=>flags.includes(f));

class BlackthornEngine{
  constructor(canvas,{save,setSave,onHud,onMessage,onPause,onComplete,onSigils,onEnding,sound,settings}){
    this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.ctx.imageSmoothingEnabled=false;
    this.save=save;this.setSave=setSave;this.onHud=onHud;this.onMessage=onMessage;this.onPause=onPause;this.onComplete=onComplete;this.onSigils=onSigils;this.onEnding=onEnding;this.sound=sound;this.settings=settings||{};
    this.perceptionSystem=new PerceptionSystem();this.keys=new Set();this.touch=new Set();this.running=false;this.mode='playing';this.last=0;
    this.attackCd=0;this.heavyCd=0;this.parryTimer=0;this.staminaRegenDelay=0;this.noisePulse=0;this.guard=false;this.dodgeTimer=0;this.invuln=0;this.charging=false;this.chargeTime=0;this.reloadTimer=0;this.reloadWeapon=null;this.combo=0;this.comboTimer=0;this.hitStop=0;this.sigilCooldown=0;this.sigilFlash=0;this.sigilBuffs={ward:0,reveal:0,fortify:0,purge:0};this.bossVulnerable=0;this.bossAttackTimer=1.4;this.bossPhase=1;this.roomTime=0;this.screenShake=0;
    this.particles=[];this.projectiles=[];this.phantoms=[];this.echoes=[];this.fakeGlitches=[];this.sceneImages=this.loadSceneImages();this.loadRoom(this.save.room||'manor-vestibule',true);
  }

  loadSceneImages(){
    const paths={
      manor:'assets/art/scene_manor.png',
      medieval:'assets/art/scene_medieval.png',
      ancient:'assets/art/scene_ancient.png',
      modern:'assets/art/scene_modern.png',
      boss:'assets/art/scene_boss.png',
      void:'assets/art/scene_void.png',
    };
    const images={};
    for(const [k,src] of Object.entries(paths)){const im=new Image();im.src=src;images[k]=im;}
    return images;
  }

  sceneKey(room){if(room.id?.startsWith('final-'))return 'void';if(room.boss)return 'boss';if(room.tone==='manor'||room.era==='1790')return 'manor';if(['1198 BCE','395'].includes(room.era))return 'ancient';if(['1917','1956','1987'].includes(room.era))return 'modern';return 'medieval';}
  drawSceneBackdrop(c,room){
    const im=this.sceneImages?.[this.sceneKey(room)];c.fillStyle='#050507';c.fillRect(0,0,INTERNAL_W,INTERNAL_H);
    if(im?.complete&&im.naturalWidth){c.save();c.globalAlpha=room.boss?.58:.44;c.drawImage(im,0,0,INTERNAL_W,INTERNAL_H);c.restore();}
    const horizon=72;c.fillStyle='rgba(4,4,7,.48)';c.fillRect(0,horizon,INTERNAL_W,INTERNAL_H-horizon);const g=c.createLinearGradient(0,horizon,0,INTERNAL_H);g.addColorStop(0,'rgba(13,12,15,.18)');g.addColorStop(1,'rgba(2,2,4,.88)');c.fillStyle=g;c.fillRect(0,horizon,INTERNAL_W,INTERNAL_H-horizon);
    c.save();c.globalAlpha=.22;c.strokeStyle='#7b695f';for(let y=82;y<180;y+=12){c.beginPath();c.moveTo(16,y);c.lineTo(304,y);c.stroke();}for(let x=20;x<304;x+=20){c.beginPath();c.moveTo(160+(x-160)*.22,72);c.lineTo(x,180);c.stroke();}c.restore();
  }

  start(){if(this.running)return;this.running=true;this.last=performance.now();requestAnimationFrame(this.loop);if(this.save.ngPlus&&!this.save.flags.includes('ngplus:intro-seen'))this.scheduleNgPlusIntro();}
  scheduleNgPlusIntro(){const tryOpen=()=>{if(!this.running||this.save.flags.includes('ngplus:intro-seen'))return;if(this.mode!=='playing'){setTimeout(tryOpen,90);return;}this.addFlag('ngplus:intro-seen');this.persist('ngplus-intro');const source=(this.save.ngPlusSourceEnding||'unknown').toUpperCase();const trait=(this.save.ngPlusTrait||'memory').replaceAll('-',' ').toUpperCase();this.message([`NEW GAME+ · CYCLE ${this.save.ngPlusCycle}`,`Previous ending: ${source}. Legacy: ${trait}.`,'Campaign doors, bosses and chapter progress have reset. Endings, achievements and remembered evidence remain in meta-memory.','Some rooms now contain Refracted Memories that did not exist on the first reading.']);};setTimeout(tryOpen,160);}
  stop(){this.running=false;}
  loop=(now)=>{if(!this.running)return;const dt=Math.min(.034,Math.max(.001,(now-this.last)/1000||.016));this.last=now;if(this.mode==='playing')this.update(dt);this.render();requestAnimationFrame(this.loop);}
  get weapon(){return WEAPONS.find(w=>w.id===this.save.weapon)||WEAPONS[0];}
  resolveRoomId(id){if(id==='manor-gallery'&&this.save.sliceComplete)return 'manor-gallery-after';return id;}
  room(){return ROOMS[this.resolveRoomId(this.save.room)]||ROOMS['manor-vestibule'];}
  persist(reason='autosave'){this.save.health=this.player?.hp??this.save.health;this.save.updatedAt=Date.now();this.setSave(this.save,reason);this.hud();}
  hud(){const room=this.room(),actual={health:this.player?.hp??this.save.health,perception:this.save.perception,stability:this.save.stability,stamina:this.save.stamina},fx=this.perceptionSystem.fx(this.save.perception,this.settings),view=this.perceptionSystem.hudView(actual,room,fx,this.roomTime),ammo=this.ammoFor(this.weapon);const sigil=sigilById(this.save.equippedSigil),sigilIntensity=this.save.sigilIntensity||1;this.onHud?.({health:view.health,perception:view.perception,stability:view.stability,stamina:view.stamina,actualHealth:actual.health,actualPerception:actual.perception,actualStability:actual.stability,actualStamina:actual.stamina,unreliable:view.unreliable,perceptionTier:fx.tier,weapon:this.weapon,ammo,sigil,sigilLabel:sigilLabel(sigil,sigilIntensity),sigilIntensity,sigilMaxIntensity:this.save.sigilMaxIntensity||1,room,roomName:view.roomName,cooldown:this.sigilCooldown,boss:this.enemies?.find(e=>e.boss&&!e.dead)||null,phase:this.bossPhase,mapUnlocked:this.save.mapUnlocked,phase2Complete:this.save.phase2Complete,phase3Complete:this.save.phase3Complete,phase4Complete:this.save.phase4Complete,phase5Complete:this.save.phase5Complete,charging:this.charging,charge:this.weapon.chargeMax?Math.min(1,this.chargeTime/this.weapon.chargeMax):0,reloading:this.reloadTimer>0,reloadRemaining:this.reloadTimer,combo:this.combo,ngPlus:!!this.save.ngPlus,ngPlusCycle:this.save.ngPlusCycle||0,ngPlusEchoes:this.save.ngPlusEchoes?.length||0});}
  message(lines,after=null){this.mode='dialogue';this.onMessage?.(lines,()=>{this.mode='playing';after?.();this.hud();});}
  unlockAchievement(id){if(!this.save.achievements.includes(id)){this.save.achievements.push(id);this.persist('achievement');}}
  addFlag(flag){if(flag&&!this.save.flags.includes(flag))this.save.flags.push(flag);}
  collectLore(id){if(!id||!LORE_CATALOG[id])return false;if(!Array.isArray(this.save.lore))this.save.lore=[];if(this.save.lore.includes(id))return false;this.save.lore.push(id);if(this.save.lore.length===20)this.unlockAchievement('paper-trail');if(this.save.lore.length===87)this.unlockAchievement('counter-memory');return true;}
  recordPerceptionTier(tier){if(tier<=0)return false;this.save.perceptionMaxTier=Math.max(this.save.perceptionMaxTier||0,tier);if(!this.save.perceptionTiersSeen.includes(tier)){this.save.perceptionTiersSeen.push(tier);this.save.perceptionTiersSeen.sort((a,b)=>a-b);return true;}return false;}
  loadRoom(rawId,heal=false){
    const id=this.resolveRoomId(rawId),room=ROOMS[id]||ROOMS['manor-vestibule'];this.save.previousRoom=this.save.room;this.save.room=id;if(!this.save.rooms.includes(id))this.save.rooms.push(id);
    if(room.weapon)this.save.weapon=room.weapon;if(room.tone==='manor')this.save.manorVisits=(this.save.manorVisits||0)+1;if(this.save.sliceComplete)this.save.houseStage=Math.max(1,this.save.houseStage||0);
    const [sx,sy]=room.spawn||[32,126];this.player={x:sx,y:sy,w:10,h:14,hp:heal?100:Math.max(1,this.save.health||100),facing:'right',speed:58,hitFlash:0};
    this.enemies=(room.enemies||[]).map((spec,i)=>this.spawnEnemy(spec,i));this.projectiles=[];this.particles=[];this.phantoms=[];this.echoes=[];this.fakeGlitches=[];this.roomTime=0;this.attackCd=0;this.heavyCd=0;this.parryTimer=0;this.staminaRegenDelay=0;this.noisePulse=0;this.guard=false;this.dodgeTimer=0;this.charging=false;this.chargeTime=0;this.reloadTimer=0;this.reloadWeapon=null;this.combo=0;this.comboTimer=0;this.hitStop=0;this.bossVulnerable=room.boss?1.8:0;this.bossAttackTimer=1.4;this.bossPhase=1;
    this.save.health=this.player.hp;this.persist('room');this.sound?.setScene?.(room);this.sound?.play('door');
    if(id==='manor-vestibule')this.unlockAchievement('first-step');
    if(room.enter?.length)setTimeout(()=>{if(this.running&&this.save.room===id&&this.mode==='playing')this.message(room.enter);},30);
  }
  spawnEnemy(spec,i){const d=ENEMY_TYPES[spec.type],size=d.size||[12,14],poise=d.poise||16,cycle=this.save.ngPlus?Math.max(1,this.save.ngPlusCycle||1):0,hpScale=cycle?Math.min(BALANCE.ngPlus.hpCap,1+cycle*BALANCE.ngPlus.hpPerCycle):1,damageScale=cycle?Math.min(BALANCE.ngPlus.damageCap,1+cycle*BALANCE.ngPlus.damagePerCycle):1,speedScale=cycle?Math.min(BALANCE.ngPlus.speedCap,1+cycle*BALANCE.ngPlus.speedPerCycle):1,hp=Math.max(1,Math.round(d.hp*hpScale));return {id:`${spec.type}-${i}`,type:spec.type,name:d.name,family:d.family,x:spec.x,y:spec.y,w:size[0],h:size[1],hp,maxHp:hp,speed:d.speed*speedScale,damage:d.damage*damageScale,perception:d.perception,behavior:d.behavior,boss:!!spec.boss,dead:false,hitFlash:0,bound:0,attackCd:.5+seeded(i)*.6,state:0,phase:1,maxPoise:poise,poise,stagger:0,windup:0,windupMax:d.windup||.26,pendingAttack:false,confused:0,branded:0,brandPower:1,bossClock:0,patternIndex:0,lastPlayerX:0,lastPlayerY:0,teleportCd:0};}
  distanceToPlayer(e){return dist(this.player,e);}
  setKey(code,down){
    if(down)this.keys.add(code);else this.keys.delete(code);if(!down)return false;
    if(code==='Escape'){if(this.mode==='map')this.toggleMap();else this.togglePause();return true;}
    if(code==='KeyM'){this.toggleMap();return true;}if(code==='KeyF'){this.onSigils?.();return true;}
    if(this.mode!=='playing')return false;
    if(code==='KeyC'||code==='Enter'){this.interact();return true;}if(code==='KeyZ'){this.quickAttack();return true;}if(code==='KeyV'){this.startHeavyCharge();return true;}if(code==='KeyQ'){this.cycleWeapon(-1);return true;}if(code==='KeyE'){this.cycleWeapon(1);return true;}if(code==='KeyR'){this.cast();return true;}if(code==='KeyT'){this.cycleSigil();return true;}if(code==='KeyG'){this.cycleSigilIntensity();return true;}if(code==='Space'){this.dodge();return true;}if(code==='KeyX'){this.startGuard();return true;}return false;
  }
  releaseKey(code){if(code==='KeyX')this.endGuard();if(code==='KeyV')this.releaseHeavyCharge();}
  setControl(name,down){
    if(down)this.touch.add(name);else this.touch.delete(name);if(!down){if(name==='guard')this.endGuard();if(name==='heavy')this.releaseHeavyCharge();return;}
    if(name==='map'){this.toggleMap();return;}if(name==='sigils'){this.onSigils?.();return;}if(this.mode!=='playing'&&name!=='pause')return;
    if(name==='attack')this.quickAttack();else if(name==='heavy')this.startHeavyCharge();else if(name==='guard')this.startGuard();else if(name==='interact')this.interact();else if(name==='sigil')this.cast();else if(name==='swap')this.cycleSigil();else if(name==='intensity')this.cycleSigilIntensity();else if(name==='weapon')this.cycleWeapon(1);else if(name==='dodge')this.dodge();else if(name==='pause')this.togglePause();
  }
  togglePause(){if(this.mode==='dialogue'||this.mode==='map')return;this.mode=this.mode==='paused'?'playing':'paused';this.onPause?.(this.mode==='paused');this.hud();}
  toggleMap(){
    if(this.mode==='dialogue'||this.mode==='paused')return;
    if(!this.save.mapUnlocked){if(this.mode==='playing')this.message(['NO RELIABLE FLOORPLAN','Blackthorn changes faster than memory. Find a survey of the house first.']);return;}
    this.mode=this.mode==='map'?'playing':'map';this.sound?.play('note');this.hud();
  }
  unlockWeapon(id,persist=true){if(!id)return false;if(!Array.isArray(this.save.weapons))this.save.weapons=[];if(this.save.weapons.includes(id))return false;this.save.weapons.push(id);if(persist)this.persist('weapon-unlock');return true;}
  availableWeapons(){const ids=(this.save.weapons||[]).filter(id=>WEAPONS.some(w=>w.id===id));return ids.length?ids:['candlestick'];}
  ammoFor(w=this.weapon){if(!w?.ammoType)return null;this.save.ammo=this.save.ammo||{};if(!this.save.ammo[w.ammoType])this.save.ammo[w.ammoType]={clip:w.clip||1,reserve:w.reserveStart||0};return this.save.ammo[w.ammoType];}
  cycleWeapon(dir=1){if(this.mode!=='playing')return null;const room=this.room();if(room.weapon&&!room.combatTrial){this.spawnText('FIXED MEMORY',this.player.x-8,this.player.y-5);return this.weapon;}const ids=this.availableWeapons();let i=Math.max(0,ids.indexOf(this.save.weapon));i=(i+(dir<0?-1:1)+ids.length)%ids.length;this.save.weapon=ids[i];this.charging=false;this.chargeTime=0;this.reloadTimer=0;this.reloadWeapon=null;this.sound?.play('note');this.persist('weapon-equip');return this.weapon;}
  startGuard(){if(this.mode!=='playing'||this.guard||this.charging)return;this.guard=true;this.parryTimer=.17+(this.weapon.parryBonus||0);this.sound?.play('note');}
  endGuard(){this.guard=false;this.parryTimer=0;}
  dodge(){if(this.mode!=='playing'||this.save.stamina<BALANCE.stamina.dodgeCost||this.dodgeTimer>0||this.charging)return;this.save.stamina-=BALANCE.stamina.dodgeCost;this.staminaRegenDelay=Math.max(this.staminaRegenDelay,BALANCE.stamina.dodgeDelay);this.dodgeTimer=.28;this.invuln=.32;const v=this.facingVector();this.tryMove(v.x*25,v.y*25);this.spawnBurst(this.player.x+5,this.player.y+8,7);}
  quickAttack(){if(this.mode!=='playing'||this.attackCd>0||this.charging||this.reloadTimer>0)return;const w=this.weapon,cost=w.quickStamina||0;if(this.save.stamina<cost){this.spawnText('TIRED',this.player.x-4,this.player.y-4);return;}if(w.type==='ranged'){this.fireWeapon(false,0);return;}this.save.stamina-=cost;this.staminaRegenDelay=Math.max(this.staminaRegenDelay,BALANCE.stamina.quickDelay);this.attackCd=w.cooldown;this.combo=this.comboTimer>0?Math.min(3,this.combo+1):1;this.comboTimer=.7;const comboScale=1+(this.combo-1)*.08;this.performAttack(w.damage*comboScale,false,w.poise||5,1);}
  startHeavyCharge(){if(this.mode!=='playing'||this.charging||this.heavyCd>0||this.reloadTimer>0||this.save.stamina<this.weapon.stamina)return;this.charging=true;this.chargeTime=0;this.guard=false;this.parryTimer=0;this.sound?.play('note');}
  releaseHeavyCharge(){if(!this.charging)return;const w=this.weapon,p=Math.max(.18,Math.min(1,this.chargeTime/(w.chargeMax||.8)));this.charging=false;this.chargeTime=0;this.heavyAttack(p);}
  heavyAttack(charge=.18){if(this.mode!=='playing'||this.heavyCd>0||this.save.stamina<this.weapon.stamina||this.reloadTimer>0)return;const w=this.weapon,p=Math.max(.18,Math.min(1,charge));this.save.stamina-=w.stamina;this.staminaRegenDelay=Math.max(this.staminaRegenDelay,BALANCE.stamina.heavyDelay);this.heavyCd=.5+(w.cooldown||.3);this.combo=0;this.comboTimer=0;if(w.type==='ranged'){this.fireWeapon(true,p,true);return;}const dmg=w.heavy*(.72+.5*p),poise=(w.heavyPoise||12)*(.75+.55*p);this.performAttack(dmg,true,poise,p);}
  performAttack(amount,heavy,poiseDamage=6,potency=1){
    const box=attackBox(this.player,this.weapon.reach+(heavy?Math.round(4+5*potency):0));let hit=false;for(const e of this.enemies){if(e.dead||!overlaps(box,e))continue;if(e.boss&&!this.bossCanBeHit(e)){this.spawnText('UNFIXED',e.x,e.y);continue;}const v=this.facingVector(),scaled=amount*(e.branded>0?(e.brandPower||1):1);const dead=damageActor(e,scaled,{x:v.x*(heavy?5+5*potency:3),y:v.y*(heavy?5+5*potency:3)});if(e.branded>0)e.branded=Math.max(0,e.branded-(heavy?2.5:1.4));this.applyPoise(e,poiseDamage);e.attackCd=Math.max(e.attackCd,.24);hit=true;this.hitStop=Math.max(this.hitStop,heavy?.055:.028);this.spawnBurst(e.x+e.w/2,e.y+e.h/2,heavy?13:8);if(heavy)this.save.combatStats.heavyHits++;if(dead)this.killEnemy(e);}
    for(const p of this.phantoms){if(p.type!=='enemy'||p.life<=0)continue;const ghost={x:p.x,y:p.y,w:p.w||11,h:p.h||16};if(overlaps(box,ghost)){p.life=0;hit=true;this.spawnText('NOTHING',p.x,p.y-3);this.save.stability=Math.min(100,this.save.stability+2);}}
    this.sound?.play(hit?'hit':'step');if(heavy)this.screenShake=.1+.1*potency;
  }
  applyPoise(e,amount){if(!e||e.dead)return false;e.poise=Math.max(0,(e.poise??e.maxPoise??16)-amount);if(e.poise>0)return false;e.stagger=e.boss?.55:1.0;e.pendingAttack=false;e.windup=0;e.bound=Math.max(e.bound||0,e.boss?.25:.5);e.poise=e.maxPoise||16;this.save.combatStats.staggers++;this.unlockAchievement('break-the-shape');this.spawnText('STAGGER',e.x-5,e.y-4);this.sound?.play('stagger');this.screenShake=Math.max(this.screenShake,.14);return true;}
  fireWeapon(heavy=false,potency=.18,staminaAlreadyPaid=false){const w=this.weapon,ammo=this.ammoFor(w);if(!ammo)return;if(this.reloadTimer>0)return;if(ammo.clip<=0){this.startReload(w);return;}const cost=staminaAlreadyPaid?0:(heavy?w.stamina:(w.quickStamina||0));if(this.save.stamina<cost){this.spawnText('TIRED',this.player.x-4,this.player.y-4);return;}this.save.stamina-=cost;if(cost>0)this.staminaRegenDelay=Math.max(this.staminaRegenDelay,heavy?BALANCE.stamina.heavyDelay:BALANCE.stamina.quickDelay);ammo.clip--;this.attackCd=w.cooldown;const v=this.facingVector(),p=Math.max(.18,Math.min(1,potency)),damage=heavy?w.heavy*(.72+.5*p):w.damage,poise=heavy?(w.heavyPoise||16)*(.75+.55*p):(w.poise||8);this.projectiles.push({x:this.player.x+5+v.x*9,y:this.player.y+7+v.y*9,vx:v.x*w.projectileSpeed,vy:v.y*w.projectileSpeed,r:2,life:1.8,damage,poise,hostile:false,weapon:w.id,heavy});this.sound?.play('shot');this.screenShake=Math.max(this.screenShake,heavy?.11:.045);if(ammo.clip===0&&ammo.reserve<=0)this.spawnText('EMPTY',this.player.x-3,this.player.y-5);}
  startReload(w=this.weapon){const ammo=this.ammoFor(w);if(!ammo||ammo.clip>=w.clip||ammo.reserve<=0||this.reloadTimer>0)return false;this.reloadTimer=w.reload||1;this.reloadWeapon=w.id;this.sound?.play('reload');this.spawnText('RELOAD',this.player.x-5,this.player.y-4);return true;}
  finishReload(){if(!this.reloadWeapon)return;const w=WEAPONS.find(x=>x.id===this.reloadWeapon),ammo=this.ammoFor(w);if(w&&ammo){const need=Math.max(0,w.clip-ammo.clip),take=Math.min(need,ammo.reserve);ammo.clip+=take;ammo.reserve-=take;}this.reloadTimer=0;this.reloadWeapon=null;this.sound?.play('note');}
  killEnemy(e){e.dead=true;this.spawnBurst(e.x+e.w/2,e.y+e.h/2,e.boss?28:15);if(e.boss){this.sound?.play('win');this.completeBoss(e);}else if(this.room().combatTrial&&this.enemies.filter(x=>!x.dead).length===0){this.completeCombatTrial();}else if(this.save.room==='echo-crypt'&&this.enemies.filter(x=>!x.dead&&!x.boss).length===0){this.unlockAchievement('clear-crypt');this.message(['THE CRYPT FALLS QUIET','The eastern threshold unseals.']);}}
  cast(){castSigil(this);}
  cycleSigil(dir=1){const s=cycleSigil(this.save,dir);if(s){this.sound?.play('note');this.persist('equip');return s;}return null;}
  cycleSigilIntensity(dir=1){const i=cycleIntensity(this.save,dir);this.sound?.play('note');this.spawnText(`INTENSITY ${['I','II','III'][i-1]}`,this.player.x-9,this.player.y-5);this.persist('sigil-intensity');return i;}
  equipSigil(id,intensity=null){if(!this.save.sigils.includes(id))return false;this.save.equippedSigil=id;if(intensity!==null)this.save.sigilIntensity=Math.max(1,Math.min(this.save.sigilMaxIntensity||1,Number(intensity)||1));this.sound?.play('note');this.persist('sigil-equip');return true;}
  facingVector(){return this.player.facing==='left'?{x:-1,y:0}:this.player.facing==='right'?{x:1,y:0}:this.player.facing==='up'?{x:0,y:-1}:{x:0,y:1};}
  ngPlusEchoForRoom(room=this.room()){
    if(!this.save.ngPlus)return null;const e=NGPLUS_ECHOES[room.id];if(!e||(this.save.ngPlusEchoes||[]).includes(e.id))return null;
    const source=this.save.ngPlusSourceEnding,sourceLine=source==='normal'?'A trace of THE HOUSE OF WITNESSES remains: contradiction is allowed to survive.':source==='dark'?'A trace of THE NINTH TENANT remains: the memory is wary of anything too perfectly consistent.':source==='true'?'A trace of NO ONE REMEMBERS ALONE remains: what was released can return without becoming property.':'The previous ending leaves no stable label.';
    const all=(this.save.endingsSeen||[]).length===3?'Three incompatible endings are now remembered at once. Blackthorn cannot make them agree.':null;
    return {...e,kind:'ngplus-echo',text:[...e.text,sourceLine,...(all?[all]:[]),`Cycle ${this.save.ngPlusCycle} · Refracted Memory ${(this.save.ngPlusEchoes||[]).length+1}/${NGPLUS_ECHO_TARGET}`]};
  }
  collectNgPlusEcho(e){if(!e||!this.save.ngPlus)return false;if(!Array.isArray(this.save.ngPlusEchoes))this.save.ngPlusEchoes=[];if(this.save.ngPlusEchoes.includes(e.id))return false;this.save.ngPlusEchoes.push(e.id);this.addFlag(`ngplus:echo:${e.id}`);if(this.save.ngPlusEchoes.length>=NGPLUS_ECHO_TARGET){this.save.ngPlusEchoComplete=true;this.unlockAchievement('refracted-nine');}this.persist('ngplus-echo');this.sound?.play('whisper');this.message(e.text);return true;}
  interact(){
    if(this.mode!=='playing')return;const room=this.room(),ngEcho=this.ngPlusEchoForRoom(room),items=ngEcho?[...(room.interact||[]),ngEcho]:(room.interact||[]);let nearest=null,nd=32;for(const it of items){if(it.once&&this.save.flags.includes(`seen:${it.id}`))continue;const d=Math.hypot((it.x+it.w/2)-(this.player.x+5),(it.y+it.h/2)-(this.player.y+7));if(d<nd){nearest=it;nd=d;}}
    if(!nearest)return;this.collectLore(nearest.id);const seen=()=>{if(nearest.once)this.addFlag(`seen:${nearest.id}`);};
    if(nearest.kind==='ngplus-echo'){this.collectNgPlusEcho(nearest);return;}
    if(nearest.kind==='anchor'){
      seen();this.addFlag('anchor:saint-orren');this.unlockAchievement('first-anchor');this.message(nearest.text,()=>{this.save.health=100;this.save.perception=Math.max(62,this.save.perception);this.save.stability=100;this.loadRoom('echo-priory-gate',true);});return;
    }
    if(nearest.kind==='memory-anchor'){
      const req=nearest.requiresFlags||[];if(!hasAll(req,this.save.flags)){this.message(['THE SPINE IS COLD','Another recovered memory must connect to this one first.']);return;}
      seen();this.addFlag(nearest.flag||`anchor:${nearest.target}`);if(nearest.weapon)this.unlockWeapon(nearest.weapon,false);this.save.health=100;this.save.perception=Math.max(62,this.save.perception);this.save.stability=100;this.save.memorySafeRoom=nearest.target;this.persist('memory-anchor');this.message(nearest.text||['A recovered century opens.'],()=>this.loadRoom(nearest.target,true));return;
    }
    if(nearest.kind==='final-entry'){
      if(this.save.phase9Complete){this.resolveEnding();return;}
      if(!this.save.phase8Complete){this.message(['THE ROOT DOOR HAS EIGHT COLD DEPRESSIONS','Recover all eight historical Memory Spines before entering the room behind memory.']);return;}
      this.addFlag('final:entered');this.unlockAchievement('root-door-open');this.save.health=100;this.save.perception=Math.max(72,this.save.perception);this.save.stability=100;this.save.memorySafeRoom='final-pale-threshold';this.persist('final-entry');this.message(nearest.text||['The Root Door opens.'],()=>this.loadRoom('final-pale-threshold',true));return;
    }
    if(nearest.kind==='final-choice'){
      const group=nearest.choiceGroup||nearest.id,value=nearest.choiceValue||nearest.id;this.save.finalChoices=this.save.finalChoices||{};
      if(this.save.finalChoices[group]){this.message(['THE CHOICE IS ALREADY PART OF THE MEMORY',`Elena chose: ${String(this.save.finalChoices[group]).toUpperCase()}.`]);return;}
      this.save.finalChoices[group]=value;this.addFlag(`final:choice-${group}`);this.addFlag(`final:choice-${group}:${value}`);this.persist('final-choice');this.sound?.play('note');this.message(nearest.text||[nearest.label]);return;
    }
    if(nearest.kind==='final-sequence'){
      const req=nearest.requiresFlags||[];if(!hasAll(req,this.save.flags)){this.message(['THE RELATION HAS NO CONTEXT','Another part of the final reconstruction is still missing.']);return;}
      const expected=(this.save.finalSequenceStep||0)+1;if(Number(nearest.step)===expected){this.save.finalSequenceStep=expected;this.spawnText(`RELATION ${expected}/${nearest.total||3}`,nearest.x-7,nearest.y-5);this.sound?.play('boss');if(expected===(nearest.total||3)){this.addFlag(nearest.flag||'final:route-coherent');this.unlockAchievement('three-relations');this.message([...nearest.text,'The final route stops trying to become one story.']);}else this.message([...nearest.text,`The relation holds: ${expected}/${nearest.total||3}.`]);}else{this.save.finalSequenceStep=0;this.perceptionSystem.shockLoss(this.save,4);this.sound?.play('hurt');this.message(['THE RELATIONS COLLAPSE','The route must be rebuilt from its first relation.']);}this.persist('final-sequence');return;
    }
    if(nearest.kind==='final-sigil-puzzle'){
      const done=this.save.finalSigilFlags?.includes(nearest.id);this.message(done?[nearest.label.toUpperCase(),'The formula is holding.']:nearest.text);return;
    }
    if(nearest.kind==='final-perception-anchor'){
      this.save.perception=Math.min(this.save.perception,24);this.save.stability=Math.max(42,this.save.stability);this.addFlag('final:perception-accepted');this.persist('final-perception');this.sound?.play('glitch');this.message(nearest.text||['Elena looks directly into the absence.']);return;
    }
    if(nearest.kind==='final-boss-focus'&&room.boss){
      const boss=this.enemies.find(e=>e.boss&&!e.dead);if(!boss||boss.type!==(nearest.bossType||'the-unremembered'))return;
      const required=['final:boss-mind','final:boss-flesh','final:boss-void','final:perception-accepted','final:choice-witness','final:choice-name','final:choice-burden'];const missing=required.filter(x=>!this.save.flags.includes(x));
      if(missing.length){this.message(['THE ENTITY STILL HAS TOO MANY EXITS','Three Sigil relations, deliberate low Perception and all three carried choices must be present at once.']);return;}
      this.bossVulnerable=BALANCE.boss.finalWindow;this.addFlag('final:boss-local');this.sound?.play('boss');this.screenShake=.45;this.message(nearest.text||['The Unremembered becomes local enough to wound.']);return;
    }
    if(nearest.kind==='sigil'&&nearest.sigil&&!this.save.sigils.includes(nearest.sigil)){this.save.sigils.push(nearest.sigil);this.save.equippedSigil=nearest.sigil;this.persist('sigil-discovery');}
    if(nearest.kind==='bell'&&room.boss){this.bossVulnerable=BALANCE.boss.bellWindow;this.perceptionSystem.shockLoss(this.save,5);this.sound?.play('boss');this.screenShake=.35;this.message(['THE FRAME RINGS WITHOUT METAL','For a few seconds the thing has an outline.']);return;}
    if(nearest.kind==='safe'){
      this.save.safeRoom=room.id;this.player.hp=100;this.save.health=100;this.save.perception=Math.min(100,this.save.perception+28);this.save.stability=100;this.save.stamina=100;this.persist('safe-room');this.sound?.play('note');this.message(nearest.text||['A stable memory forms here.']);return;
    }
    if(nearest.kind==='map'){
      seen();this.save.mapUnlocked=true;this.addFlag(nearest.flag||'map:estate');this.unlockAchievement('cartographer');this.persist('manor-map');this.message(nearest.text);return;
    }
    if(['key','mark','shortcut'].includes(nearest.kind)){
      seen();this.addFlag(nearest.flag);if(nearest.kind==='shortcut'&&this.save.flags.includes('shortcut:garden-service')&&this.save.flags.includes('shortcut:service-vestibule'))this.unlockAchievement('two-ways-home');this.persist(nearest.kind);this.sound?.play('note');this.message(nearest.text||[nearest.label]);return;
    }
    if(nearest.kind==='chapter-item'){
      seen();this.addFlag(nearest.flag);this.persist('chapter-item');this.sound?.play('note');this.message(nearest.text||[nearest.label]);return;
    }
    if(nearest.kind==='chapter-safe'){
      this.save.memorySafeRoom=room.id;this.player.hp=100;this.save.health=100;this.save.perception=Math.min(100,this.save.perception+22);this.save.stability=100;this.save.stamina=100;this.persist('chapter-checkpoint');this.sound?.play('note');this.message(nearest.text||['The memory steadies here.']);return;
    }
    if(nearest.kind==='sound-lure'){
      seen();this.noisePulse=3;this.addFlag(nearest.flag||`sound:${nearest.id}`);this.save.chapter1Stats.soundStrikes++;if(nearest.spawnEnemy){const d=ENEMY_TYPES[nearest.spawnEnemy];if(d){const spawned=this.spawnEnemy({type:nearest.spawnEnemy,x:250,y:126},this.enemies.length);spawned.attackCd=.35;this.enemies.push(spawned);this.save.chapter1Stats.hollowsDrawn++;}}this.persist('sound-lure');this.sound?.play('boss');this.screenShake=.12;this.message(nearest.text||['The sound travels farther than it should.']);return;
    }
    if(nearest.kind==='sound-seal'){
      const expected=(this.save.chapter1PuzzleStep||0)+1;this.noisePulse=3;this.save.chapter1Stats.soundStrikes++;if(Number(nearest.step)===expected){this.save.chapter1PuzzleStep=expected;this.sound?.play('boss');this.spawnText(`RESONANCE ${expected}/3`,nearest.x-5,nearest.y-5);if(expected===3){this.addFlag('chapter:sound-route');this.unlockAchievement('three-resonators');this.message([...nearest.text,'Stone grinds behind the ossuary. The wall remembers a doorway.']);}else this.message([...nearest.text,`The sequence holds: ${expected}/3.`]);}else{this.save.chapter1PuzzleStep=0;this.sound?.play('hurt');this.perceptionSystem.shockLoss(this.save,4);this.message(['THE RESONANCE COLLAPSES','The tones return in the wrong order. Begin again at the first basin.']);}this.persist('sound-seal');return;
    }
    if(nearest.kind==='chapter-mixture'){
      if(nearest.flag&&this.save.flags.includes(nearest.flag)){this.message(['THE FUMIGATION STILL BURNS','The mixture is complete. The lower route is warded.']);return;}const req=nearest.requiresFlags||[];if(!hasAll(req,this.save.flags)){const missing=req.filter(x=>!this.save.flags.includes(x)).map(x=>x.split(':').pop().toUpperCase());this.message(['THE RECIPE IS INCOMPLETE',`Missing: ${missing.join(' · ')}`,'Search the apothecary, nave and cloister before descending.']);return;}this.addFlag(nearest.flag||'chapter:ward-mixture');this.persist('chapter-mixture');this.sound?.play('win');this.message(nearest.text||['The ward holds.']);return;
    }
    if(nearest.kind==='lore-secret'){if(nearest.flag&&this.save.flags.includes(nearest.flag)){this.message(nearest.text||[nearest.label]);return;}this.addFlag(nearest.flag||`secret:${nearest.id}`);this.persist('lore-secret');this.sound?.play('whisper');this.message(nearest.text||[nearest.label]);return;}
    if(nearest.kind==='chapter-secret'){
      if(nearest.flag&&this.save.flags.includes(nearest.flag)){this.message(nearest.text||[nearest.label]);return;}this.addFlag(nearest.flag||`secret:${nearest.id}`);this.save.chapter1Stats.secrets++;this.unlockAchievement('patient-nine');this.persist('chapter-secret');this.sound?.play('whisper');this.message(nearest.text||[nearest.label]);return;
    }
    if(nearest.kind==='memory-item'){
      if(nearest.flag&&this.save.flags.includes(nearest.flag)){this.message(nearest.text||[nearest.label]);return;}seen();this.addFlag(nearest.flag||`memory:${nearest.id}`);this.persist('memory-item');this.sound?.play('note');this.message(nearest.text||[nearest.label]);return;
    }
    if(nearest.kind==='memory-safe'){
      this.save.memorySafeRoom=room.id;this.player.hp=100;this.save.health=100;this.save.perception=Math.min(100,this.save.perception+24);this.save.stability=100;this.save.stamina=100;this.persist('memory-safe');this.sound?.play('note');this.message(nearest.text||['This memory steadies here.']);return;
    }
    if(nearest.kind==='memory-secret'){
      if(nearest.flag&&this.save.flags.includes(nearest.flag)){this.message(nearest.text||[nearest.label]);return;}this.addFlag(nearest.flag||`secret:${nearest.id}`);const ch=nearest.chapter||'c2';this.save.chapterStats=this.save.chapterStats||{};this.save.chapterStats[ch]=this.save.chapterStats[ch]||{secrets:0};this.save.chapterStats[ch].secrets++;if(nearest.achievement)this.unlockAchievement(nearest.achievement);this.persist('memory-secret');this.sound?.play('whisper');this.message(nearest.text||[nearest.label]);return;
    }
    if(nearest.kind==='memory-sequence'){
      const req=nearest.requiresFlags||[];if(!hasAll(req,this.save.flags)){this.message(['THE MECHANISM LACKS CONTEXT','A related object in this memory has not been recovered yet.']);return;}const ch=nearest.chapter||'c2';this.save.chapterProgress=this.save.chapterProgress||{c2:0,c3:0,c4:0};const expected=(this.save.chapterProgress[ch]||0)+1;if(Number(nearest.step)===expected){this.save.chapterProgress[ch]=expected;this.sound?.play('boss');this.spawnText(`${ch.toUpperCase()} ${expected}/${nearest.total||3}`,nearest.x-5,nearest.y-5);if(expected===(nearest.total||3)){this.addFlag(nearest.completeFlag);this.sound?.play('win');this.message([...nearest.text,'The route now agrees with itself.']);}else this.message([...nearest.text,`The sequence holds: ${expected}/${nearest.total||3}.`]);}else{this.save.chapterProgress[ch]=0;this.perceptionSystem.shockLoss(this.save,3);this.sound?.play('hurt');this.message(['THE PATTERN LOSES COHERENCE','The sequence must be rebuilt from its first step.']);}this.persist('memory-sequence');return;
    }
    if(nearest.kind==='boss-focus'&&room.boss){const boss=this.enemies.find(e=>e.boss&&!e.dead);if(!boss){this.message(['ONLY THE AFTERIMAGE REMAINS']);return;}if(nearest.bossType&&boss.type!==nearest.bossType)return;this.bossVulnerable=BALANCE.boss.focusWindow;this.perceptionSystem.shockLoss(this.save,4);this.sound?.play('boss');this.screenShake=.3;this.message(nearest.text||['The boss is forced into a stable outline.']);return;}
    if(nearest.kind==='combat-trial'){
      if(!this.save.phase3Complete){this.message(['THE WEAPON IMPRINT REMAINS FLAT','Calibrate Perception in the Mirror Room before asking Blackthorn to reconstruct combat memories.']);return;}
      for(const id of ['candlestick','woodsman-axe','ritual-dagger','service-revolver'])this.unlockWeapon(id,false);this.save.ammo=this.save.ammo||{};this.save.ammo.revolver={clip:6,reserve:18};this.save.weapon='candlestick';this.persist('combat-imprint');this.message(nearest.text,()=>this.loadRoom('combat-imprint-arena',true));return;
    }
    if(nearest.kind==='combat-return'){
      if(this.enemies.some(e=>!e.dead)){this.message(['THE IMPRINT IS STILL ACTIVE','Three hostile patterns must be resolved before the Vault can collapse this reconstruction.']);return;}
      this.loadRoom('manor-memory-vault',true);return;
    }
    if(nearest.kind==='sigil-trial'){
      if(!this.save.phase4Complete){this.message(['THE LATTICE WILL NOT OPEN','Calibrate combat first. The grammar expects Elena to understand timing before consequence.']);return;}
      const ids=['bind-void-i','sever-void-i','brand-void-i','shift-void-i','ward-mind-i','reveal-mind-i','lure-mind-i','echo-mind-i','mend-flesh-i','fortify-flesh-i','purge-flesh-i','siphon-flesh-i'];for(const id of ids)if(!this.save.sigils.includes(id))this.save.sigils.push(id);this.save.sigilMaxIntensity=3;this.save.sigilIntensity=Math.min(3,Math.max(1,this.save.sigilIntensity||1));this.save.sigilPuzzleFlags=[];this.persist('sigil-lattice-open');this.message(nearest.text,()=>this.loadRoom('sigil-lattice-arena',true));return;
    }
    if(nearest.kind==='sigil-puzzle'){
      const done=this.save.sigilPuzzleFlags?.includes(nearest.id);this.message(done?[nearest.label.toUpperCase(),'The formula is holding. The lattice no longer resists here.']:nearest.text);return;
    }
    if(nearest.kind==='sigil-return'){
      const required=['lattice-mind','lattice-flesh','lattice-void'];if(!required.every(x=>this.save.sigilPuzzleFlags?.includes(x))){this.message(['THE GRAMMAR IS INCOMPLETE','Three fixtures remain: MIND must reveal, FLESH must purge, VOID must bind.']);return;}this.completeSigilTrial();return;
    }
    if(nearest.kind==='perception-trial'){
      if(!this.save.phase2Complete){this.message(['THE MIRROR REFUSES DEPTH','The Memory Index below the house must be understood first.']);return;}
      const current=Math.max(0,Number(this.save.perceptionTrialStep)||0);
      if(current>=4){
        this.save.perception=100;this.save.stability=100;this.save.perceptionTrialStep=0;this.save.phase3Complete=true;this.addFlag('perception:calibrated');this.unlockAchievement('unreliable-witness');this.persist('phase3-complete');this.sound?.setPerception(0,0);this.sound?.play('win');this.message(['PERCEPTION CALIBRATION COMPLETE','Elena knows the difference between a memory changing and a system actually failing.','Blackthorn can lie about what she sees. It cannot touch the browser, files or real saves.'],()=>this.onComplete?.('phase3'));return;
      }
      const step=current+1,values=[70,45,20,8],stability=[76,58,34,16];this.save.perceptionTrialStep=step;this.save.perception=values[step-1];this.save.stability=stability[step-1];this.recordPerceptionTier(step);this.persist('perception-trial');this.sound?.play(step>=3?'glitch':'whisper');const msg=this.perceptionSystem.tierMessage(step)||['PERCEPTION'];this.message([...nearest.text,...msg,step<4?'Interact with the mirror again when you are ready to descend further.':'Interact once more to end the controlled descent and restore a stable reading.']);return;
    }
    if(nearest.kind==='perception'){
      seen();this.perceptionSystem.shockLoss(this.save,14);this.save.stability=Math.max(0,this.save.stability-8);this.screenShake=.2;this.persist('perception-event');this.sound?.play('hurt');this.message(nearest.text);return;
    }
    if(nearest.kind==='phase2-finale'){
      seen();this.save.phase2Complete=true;this.addFlag('hub:index-understood');this.unlockAchievement('house-indexed');this.persist('phase2-complete');this.sound?.play('win');this.message(nearest.text,()=>this.onComplete?.('phase2'));return;
    }
    seen();if(!this.save.notes.includes(nearest.id))this.save.notes.push(nearest.id);this.sound?.play('note');this.persist('note');this.message(nearest.text||[nearest.label]);
  }
  resolveSigilPuzzle(sigil,intensity){
    const room=this.room();let changed=false;if(room.sigilTrial){for(const it of room.interact||[]){if(it.kind!=='sigil-puzzle'||this.save.sigilPuzzleFlags.includes(it.id))continue;const d=Math.hypot((it.x+it.w/2)-(this.player.x+5),(it.y+it.h/2)-(this.player.y+7));if(d>54||it.requiredSigil!==sigil.id||intensity<(it.requiredIntensity||1))continue;this.save.sigilPuzzleFlags.push(it.id);this.addFlag(`sigil:${it.id}`);this.spawnText('FORMULA HOLDS',it.x-8,it.y-5);this.sound?.play('win');changed=true;}if(changed&&['lattice-mind','lattice-flesh','lattice-void'].every(x=>this.save.sigilPuzzleFlags.includes(x)))this.unlockAchievement('grammar-of-three');}
    this.save.finalSigilFlags=this.save.finalSigilFlags||[];for(const it of room.interact||[]){if(it.kind!=='final-sigil-puzzle'||this.save.finalSigilFlags.includes(it.id))continue;if(it.id.startsWith('final-boss-')&&this.bossPhase<3)continue;const d=Math.hypot((it.x+it.w/2)-(this.player.x+5),(it.y+it.h/2)-(this.player.y+7));if(d>58||it.requiredSigil!==sigil.id||intensity<(it.requiredIntensity||1))continue;this.save.finalSigilFlags.push(it.id);this.addFlag(`final:sigil:${it.id}`);if(it.id.startsWith('final-boss-'))this.addFlag(`final:boss-${it.id.split('-').at(-1)}`);this.spawnText('RELATION HOLDS',it.x-10,it.y-5);this.sound?.play('win');changed=true;}
    if(['final-lattice-mind','final-lattice-flesh','final-lattice-void'].every(x=>this.save.finalSigilFlags.includes(x))){this.addFlag('final:lattice-complete');this.unlockAchievement('three-schools-final');}
    if(['final-boss-mind','final-boss-flesh','final-boss-void'].every(x=>this.save.finalSigilFlags.includes(x)))this.addFlag('final:boss-lattice');
    if(changed)this.persist('final-sigil');return changed;
  }
  completeSigilTrial(){if(this.save.phase5Complete){this.loadRoom('manor-memory-vault',true);return;}this.save.phase5Complete=true;this.save.sigilMaxIntensity=3;this.addFlag('sigils:calibrated');this.unlockAchievement('twelve-words');this.persist('phase5-complete');this.sound?.play('win');this.message(['SIGIL LATTICE COMPLETE','The twelve formulas are not twelve spells. They are twelve ways to phrase pressure against memory.','FLESH changes the body and corruption. MIND changes attention and interpretation. VOID changes boundaries, continuity and distance.','Intensity I is economical. II is committed. III is powerful enough to solve structures — and expensive enough to matter.'],()=>{this.loadRoom('manor-memory-vault',true);this.onComplete?.('phase5');});}
  completeCombatTrial(){if(this.save.phase4Complete)return;this.save.phase4Complete=true;this.addFlag('combat:calibrated');this.unlockAchievement('four-ways-to-hurt');this.persist('phase4-complete');this.sound?.play('win');this.message(['WEAPON IMPRINT COMPLETE','Elena has not become a soldier. She has learned what the house remembers about timing: distance, commitment, recoil and the instant before impact.','Future memories can now use the same combat grammar without sharing the same weapons.'],()=>{this.save.weapon='candlestick';this.loadRoom('manor-memory-vault',true);this.onComplete?.('phase4');});}
  resolveEnding(){
    if(!this.save.phase9Complete){this.message(['THE ROOT DOOR IS NOT AN EXIT YET']);return null;}
    const result=evaluateEnding(this.save),id=result.id;
    this.save.phase12Complete=true;this.save.ending=id;if(!Array.isArray(this.save.endingsSeen))this.save.endingsSeen=[];if(!this.save.endingsSeen.includes(id))this.save.endingsSeen.push(id);
    this.save.endingStats={secretCount:result.secretCount,keyEvidence:result.keyEvidence,keyEvidenceTarget:result.keyEvidenceTarget,sigilMastery:result.sigilMastery,finalGrammar:result.finalGrammar,darkSignals:result.darkSignals,choicesTrue:result.choicesTrue,loreCount:(this.save.lore||[]).length};
    this.addFlag(`ending:${id}`);this.unlockAchievement(result.profile.achievement);if(id==='true')this.unlockAchievement('true-ending');
    this.persist(`ending-${id}`);this.sound?.play('win');this.mode='ending';this.onEnding?.(result);return result;
  }
  completeBoss(e){if(e.type==='bell-boss'){this.completeSlice();return;}if(e.type==='the-unremembered'){this.completeFinalChapter(e);return;}const map={'salt-astronomer':'c2','last-enumerator':'c3','anatomist-shadow':'c4','first-tenant':'c5','company-without-faces':'c6','dead-frequency':'c7','man-missing-frame':'c8'};const ch=map[e.type];if(ch){this.completeHistoricalChapter(ch,e);return;}this.persist('boss');}
  completeHistoricalChapter(ch,e){
    const cfg={c2:{flag:'chapter:salt-stars-complete',boss:'salt-astronomer',achievement:'salt-stars-complete',stage:3,title:'THE SALT ASTRONOMER · FIXED',lines:['Nara restores the seventh star to the sky by admitting it was never a star at all — it was a missing destination.','Asterion was built around a hole in collective memory. Blackthorn contains the same geometry in miniature.']},c3:{flag:'chapter:last-census-complete',boss:'last-enumerator',achievement:'last-census-complete',stage:4,title:'THE LAST ENUMERATOR · COUNTED',lines:['Marcus stops correcting the census and instead preserves the contradictions.','The Unremembered thrives when records are forced to agree. Disagreement can be evidence.']},c4:{flag:'chapter:anatomy-shadow-complete',boss:'anatomist-shadow',achievement:'anatomy-shadow-complete',stage:5,title:"THE ANATOMIST'S SHADOW · SEVERED",lines:['Lucia proves the second body is made from remembered relationships, not flesh.','When the mirrors collapse, her shadow returns half a heartbeat late — but it returns.']},c5:{flag:'chapter:house-name-complete',boss:'first-tenant',achievement:'house-name-complete',stage:6,title:'THE FIRST TENANT · EVICTED',lines:['Eleanor gives the impossible room a defined relationship to the house.','Blackthorn becomes an intentional mnemonic engine.']},c6:{flag:'chapter:mud-remembers-complete',boss:'company-without-faces',achievement:'mud-remembers-complete',stage:7,title:'THE COMPANY WITHOUT FACES · NAMED',lines:['Elias preserves contradictory witness accounts instead of collapsing them.','Two imperfect memories can resist one perfect erasure.']},c7:{flag:'chapter:broadcast-eleven-complete',boss:'dead-frequency',achievement:'broadcast-eleven-complete',stage:8,title:'THE DEAD FREQUENCY · LOCKED',lines:['Naomi proves the eleventh signal is a carrier for remembered relationships.','Blackthorn is a pattern before it is a place.']},c8:{flag:'chapter:tape-zero-complete',boss:'man-missing-frame',achievement:'tape-zero-complete',stage:8,title:'THE MAN IN THE MISSING FRAME · HELD',lines:['Theo preserves the impossible frame rather than editing it away.','His final tape is addressed to Elena.']}}[ch];if(!cfg)return;if(!this.save.bosses.includes(cfg.boss))this.save.bosses.push(cfg.boss);this.addFlag(cfg.flag);this.unlockAchievement(cfg.achievement);this.save.houseStage=Math.max(cfg.stage,this.save.houseStage||0);this.save.memorySafeRoom='echo-priory-gate';if(ch==='c4'){this.save.phase7Complete=true;this.unlockAchievement('phase7-complete');}if(ch==='c8'){this.save.phase8Complete=true;this.unlockAchievement('phase8-complete');}this.persist(`chapter-${ch}-complete`);this.message([cfg.title,...cfg.lines,'The memory tears back toward Blackthorn Manor.'],()=>{this.save.weapon='candlestick';this.save.health=100;this.save.perception=Math.max(58,this.save.perception);this.save.stability=100;this.loadRoom('manor-memory-vault',true);if(ch==='c4')this.onComplete?.('phase7');if(ch==='c8')this.onComplete?.('phase8');});}
  completeFinalChapter(e){
    if(!this.save.bosses.includes('the-unremembered'))this.save.bosses.push('the-unremembered');this.save.phase9Complete=true;this.save.houseStage=Math.max(9,this.save.houseStage||0);this.addFlag('chapter:final-complete');this.unlockAchievement('unremembered-defeated');this.unlockAchievement('phase9-complete');this.persist('phase9-complete');
    const choices=this.save.finalChoices||{},w=choices.witness||'unmade',n=choices.name||'unmade',b=choices.burden||'unmade';
    this.message(['THE UNREMEMBERED · MADE LOCAL','It does not die like a body. It loses the ability to be everywhere a relationship has been erased.','Elena reaches Blackthorn again carrying three unresolved choices.',`Witness: ${w.toUpperCase()} · Name: ${n.toUpperCase()} · Burden: ${b.toUpperCase()}`,'The house has not chosen an ending for her. Not yet.'],()=>{this.save.weapon='candlestick';this.save.health=100;this.save.perception=72;this.save.stability=100;this.save.safeRoom='manor-library';this.loadRoom('manor-root-door',true);this.onComplete?.('phase9');});
  }
  completeSlice(){
    if(!this.save.bosses.includes('bell-without-tongue'))this.save.bosses.push('bell-without-tongue');this.save.sliceComplete=true;this.save.phase6Complete=true;this.save.houseStage=Math.max(2,this.save.houseStage||0);this.save.memorySafeRoom='echo-priory-gate';this.addFlag('chapter:saint-orren-complete');this.unlockAchievement('bell-silenced');this.unlockAchievement('saint-orren-complete');this.persist('boss');
    this.message(['THE BELL WITHOUT A TONGUE · SILENCED','Ysabel finally remembers all twenty-one names. Nine of them were never buried because the priory forgot they had existed.','She removed the clapper not to silence the bell — but to deny the Unremembered a tongue made from human recollection.','The memory tears open. Blackthorn has learned the whole shape of Saint Orren.'],()=>{this.save.weapon='candlestick';this.save.health=100;this.save.perception=Math.max(55,this.save.perception);this.save.stability=100;this.save.room='manor-gallery-after';this.loadRoom('manor-gallery-after',true);this.onComplete?.('phase6');});
  }
  update(dt){
    this.roomTime+=dt;this.noisePulse=Math.max(0,(this.noisePulse||0)-dt);this.staminaRegenDelay=Math.max(0,(this.staminaRegenDelay||0)-dt);if(this.hitStop>0){this.hitStop=Math.max(0,this.hitStop-dt);this.updateParticles(dt);this.hud();return;}this.attackCd=Math.max(0,this.attackCd-dt);this.heavyCd=Math.max(0,this.heavyCd-dt);this.parryTimer=Math.max(0,this.parryTimer-dt);this.invuln=Math.max(0,this.invuln-dt);this.dodgeTimer=Math.max(0,this.dodgeTimer-dt);this.sigilCooldown=Math.max(0,this.sigilCooldown-dt);this.sigilFlash=Math.max(0,this.sigilFlash-dt);for(const k of Object.keys(this.sigilBuffs))this.sigilBuffs[k]=Math.max(0,(this.sigilBuffs[k]||0)-dt);this.bossVulnerable=Math.max(0,this.bossVulnerable-dt);this.screenShake=Math.max(0,this.screenShake-dt);this.comboTimer=Math.max(0,this.comboTimer-dt);if(this.comboTimer<=0)this.combo=0;if(this.charging)this.chargeTime=Math.min(this.weapon.chargeMax||1.2,this.chargeTime+dt);if(this.reloadTimer>0){this.reloadTimer=Math.max(0,this.reloadTimer-dt);if(this.reloadTimer<=0)this.finishReload();}
    this.player.hitFlash=Math.max(0,this.player.hitFlash-dt);for(const e of this.enemies){e.hitFlash=Math.max(0,e.hitFlash-dt);e.bound=Math.max(0,e.bound-dt);e.attackCd=Math.max(0,e.attackCd-dt);e.stagger=Math.max(0,(e.stagger||0)-dt);e.confused=Math.max(0,(e.confused||0)-dt);e.branded=Math.max(0,(e.branded||0)-dt);if(e.branded<=0)e.brandPower=1;if(e.poise<e.maxPoise&&e.stagger<=0)e.poise=Math.min(e.maxPoise,e.poise+e.maxPoise*.12*dt);}
    this.save.playSeconds=(this.save.playSeconds||0)+dt;const regen=this.guard?BALANCE.stamina.guardRegen:this.charging?BALANCE.stamina.chargeRegen:BALANCE.stamina.idleRegen;if(this.staminaRegenDelay<=0)this.save.stamina=Math.min(100,this.save.stamina+regen*dt);
    this.updateMovement(dt);this.updateEnemies(dt);this.updateProjectiles(dt);this.updatePerception(dt);this.updateParticles(dt);this.checkExits();this.hud();
  }
  updateMovement(dt){
    let x=0,y=0;if(this.keys.has('ArrowLeft')||this.keys.has('KeyA')||this.touch.has('left'))x--;if(this.keys.has('ArrowRight')||this.keys.has('KeyD')||this.touch.has('right'))x++;if(this.keys.has('ArrowUp')||this.keys.has('KeyW')||this.touch.has('up'))y--;if(this.keys.has('ArrowDown')||this.keys.has('KeyS')||this.touch.has('down'))y++;
    if(!x&&!y)return;const l=Math.hypot(x,y)||1;x/=l;y/=l;if(Math.abs(x)>Math.abs(y))this.player.facing=x<0?'left':'right';else this.player.facing=y<0?'up':'down';const mult=this.guard?.5:this.charging?.58:1;this.tryMove(x*this.player.speed*mult*dt,y*this.player.speed*mult*dt);
  }
  tryMove(dx,dy){const room=this.room(),obs=room.obstacles||[];let nx={...this.player,x:this.player.x+dx};if(!obs.some(o=>overlaps(nx,{x:o[0],y:o[1],w:o[2],h:o[3]})))this.player.x=clamp(nx.x,1,INTERNAL_W-this.player.w-1);let ny={...this.player,y:this.player.y+dy};if(!obs.some(o=>overlaps(ny,{x:o[0],y:o[1],w:o[2],h:o[3]})))this.player.y=clamp(ny.y,1,INTERNAL_H-this.player.h-1);}
  pushFromExit(dir){if(dir==='right')this.player.x=286;else if(dir==='left')this.player.x=24;else if(dir==='up')this.player.y=24;else this.player.y=146;}
  blockedExit(room,dir){
    const rule=room.exitRules?.[dir];if(!rule)return null;
    if(rule.requiresSlice&&!this.save.sliceComplete)return rule.message||['THE HOUSE REFUSES THIS ROUTE'];
    if(rule.requiresFlags&&!hasAll(rule.requiresFlags,this.save.flags))return rule.message||['THE WAY IS LOCKED'];
    if(rule.requiresPhase2Future)return rule.message||['THIS ROUTE BELONGS TO A LATER MEMORY'];
    return null;
  }
  checkExits(){
    const room=this.room();let dir=null;if(this.player.x<18)dir='left';else if(this.player.x+this.player.w>302)dir='right';else if(this.player.y<18)dir='up';else if(this.player.y+this.player.h>162)dir='down';if(!dir||!room.exits?.[dir])return;
    if(room.lockedExit===dir&&room.clearUnlock&&this.enemies.some(e=>!e.dead)){this.pushFromExit(dir);this.message(['THE THRESHOLD WILL NOT OPEN','Something in the crypt still remembers you.']);return;}
    const blocked=this.blockedExit(room,dir);if(blocked){this.pushFromExit(dir);this.message(blocked);return;}
    const next=this.resolveRoomId(room.exits[dir]);this.save.health=this.player.hp;this.loadRoom(next,false);if(dir==='right')this.player.x=24;if(dir==='left')this.player.x=INTERNAL_W-36;if(dir==='down')this.player.y=24;if(dir==='up')this.player.y=INTERNAL_H-38;
  }
  updateEnemies(dt){
    const room=this.room();for(const e of this.enemies){if(e.dead)continue;if(e.boss){this.updateBoss(e,dt);continue;}if(e.bound>0||e.stagger>0)continue;const d=this.distanceToPlayer(e);if(e.confused>0){e.pendingAttack=false;const a=this.roomTime*2.1+e.x*.03;e.x=clamp(e.x+Math.cos(a)*e.speed*.35*dt,18,INTERNAL_W-e.w-18);e.y=clamp(e.y+Math.sin(a)*e.speed*.35*dt,18,INTERNAL_H-e.h-18);continue;}
      if(e.pendingAttack){e.windup=Math.max(0,e.windup-dt);if(e.windup<=0){e.pendingAttack=false;if(this.distanceToPlayer(e)<19)this.hitPlayer(e.damage,e);}continue;}
      let vx=0,vy=0;if(e.behavior==='edge'&&d>45){const center={x:160,y:90};vx=e.x<center.x?-1:1;vy=e.y<center.y?-1:1;}else if(e.behavior==='listener'){if(d<105&&(this.noisePulse>0||this.attackCd>.05||this.heavyCd>.1||Math.abs(this.player.x-e.x)<38)){vx=this.player.x-e.x;vy=this.player.y-e.y;}}else if(e.behavior==='sound'){if(d<118&&(this.noisePulse>0||this.attackCd>.05||this.heavyCd>.1)){vx=this.player.x-e.x;vy=this.player.y-e.y;}}else if(e.behavior==='ambush'){if(d<64||this.attackCd>.04||this.heavyCd>.08){vx=this.player.x-e.x;vy=this.player.y-e.y;}else{vx=Math.sin(this.roomTime+e.x)*.35;vy=Math.cos(this.roomTime*.8+e.y)*.35;}}else if(e.behavior==='orbit'){if(d<125){const tx=this.player.x-e.x,ty=this.player.y-e.y;vx=tx*.42-ty*.75;vy=ty*.42+tx*.75;}}else if(e.behavior==='flee'){if(d<70){vx=e.x-this.player.x;vy=e.y-this.player.y;}else if(d<130){vx=this.player.x-e.x;vy=this.player.y-e.y;}}else if(e.behavior==='blink'){if(d<115){vx=this.player.x-e.x;vy=this.player.y-e.y;if(Math.floor(this.roomTime*2.2+e.x)%7===0&&d>45){e.x=clamp(this.player.x+(seeded(this.roomTime+e.x)>.5?52:-52),18,INTERNAL_W-e.w-18);e.y=clamp(this.player.y+(seeded(this.roomTime+e.y)-.5)*60,18,INTERNAL_H-e.h-18);}}}else if(d<112){vx=this.player.x-e.x;vy=this.player.y-e.y;}
      const l=Math.hypot(vx,vy)||1;vx/=l;vy/=l;const oldx=e.x,oldy=e.y;e.x+=vx*e.speed*dt;e.y+=vy*e.speed*dt;if((room.obstacles||[]).some(o=>overlaps(e,{x:o[0],y:o[1],w:o[2],h:o[3]}))){e.x=oldx;e.y=oldy;}if(d<16&&e.attackCd<=0){e.pendingAttack=true;e.windup=e.windupMax;e.attackCd=1.0+e.windupMax;this.sound?.play('telegraph');}
    }
  }
  bossCanBeHit(e){return !e?.boss||this.bossPhase<3||this.bossVulnerable>0;}
  bossProfile(e){return BOSS_PROFILES[e.type]||BOSS_PROFILES['bell-boss'];}
  bossMove(e,profile,phase,dt){
    const px=this.player.x+this.player.w/2,py=this.player.y+this.player.h/2,ex=e.x+e.w/2,ey=e.y+e.h/2;let dx=px-ex,dy=py-ey,d=Math.hypot(dx,dy)||1,nx=dx/d,ny=dy/d;const preferred=profile.preferred||70,s=e.speed*(phase===3?1.14:phase===2?1.04:.96);
    e.bossClock=(e.bossClock||0)+dt;e.teleportCd=Math.max(0,(e.teleportCd||0)-dt);
    if(profile.movement==='anchor'){e.x+=Math.cos(e.bossClock*1.35)*7*dt;e.y+=Math.sin(e.bossClock*.93)*5*dt;}
    else if(profile.movement==='orbit'){const radial=(d-preferred)/Math.max(30,preferred);e.x+=(nx*radial-ny*.72)*s*dt;e.y+=(ny*radial+nx*.72)*s*dt;}
    else if(profile.movement==='ledger'){const axis=Math.floor(e.bossClock/1.3)%2;e.x+=(axis?nx:Math.sign(dx))*.55*s*dt;e.y+=(axis?Math.sign(dy):ny)*.55*s*dt;}
    else if(profile.movement==='mirror'){e.x+=(-ny*.75+nx*(d>preferred?.32:-.28))*s*dt;e.y+=(nx*.75+ny*(d>preferred?.32:-.28))*s*dt;if(e.teleportCd<=0&&phase>=2){e.teleportCd=phase===3?1.7:2.4;e.x=clamp(px-(dx>0?54:-54),24,INTERNAL_W-e.w-24);e.y=clamp(py+(seeded(e.bossClock)-.5)*72,40,INTERNAL_H-e.h-24);this.spawnText('MIRROR STEP',e.x-10,e.y-6);}}
    else if(profile.movement==='threshold'){const horizontal=Math.floor(e.bossClock/1.1)%2===0;e.x+=(horizontal?nx*.95:nx*.22)*s*dt;e.y+=(horizontal?ny*.22:ny*.95)*s*dt;}
    else if(profile.movement==='formation'){const radial=d>preferred?1:d<preferred-18?-1:.05;e.x+=(nx*radial-ny*.35)*s*.72*dt;e.y+=(ny*radial+nx*.35)*s*.72*dt;}
    else if(profile.movement==='signal'){e.x+=Math.sin(e.bossClock*2.2)*s*.72*dt;e.y+=(py-ey)*.18*dt;}
    else if(profile.movement==='stutter'){if(e.teleportCd<=0){e.teleportCd=phase===3?1.2:phase===2?1.65:2.2;e.lastPlayerX=this.player.x;e.lastPlayerY=this.player.y;e.x=clamp(px+(seeded(e.bossClock*3)>.5?66:-66),24,INTERNAL_W-e.w-24);e.y=clamp(py+(seeded(e.bossClock*7)-.5)*82,40,INTERNAL_H-e.h-24);this.spawnText('FRAME LOST',e.x-7,e.y-6);}else{e.x+=nx*s*.28*dt;e.y+=ny*s*.28*dt;}}
    else {const radial=d>preferred?1:d<preferred-22?-.7:.05;e.x+=(nx*radial-ny*.48)*s*.82*dt;e.y+=(ny*radial+nx*.48)*s*.82*dt;}
    e.x=clamp(e.x,25,INTERNAL_W-e.w-25);e.y=clamp(e.y,42,INTERNAL_H-e.h-22);
  }
  hostileShot(x,y,angle,speed,damage,kind='boss',delay=0,life=3.4){this.projectiles.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,r:2,life,damage,hostile:true,kind,delay});}
  aimedBossShot(e,speed,damage,kind='aimed',offset=0,delay=0){const x=e.x+e.w/2,y=e.y+e.h/2,a=Math.atan2((this.player.y+7)-y,(this.player.x+5)-x)+offset;this.hostileShot(x,y,a,speed,damage,kind,delay);}
  fireBossPattern(e,profile,phase){
    const cfg=profile.phases[phase-1],x=e.x+e.w/2,y=e.y+e.h/2,n=cfg.shots||6,k=profile.pattern,idx=e.patternIndex++||0;
    if(k==='bell-ring'){const rot=(idx%2)*Math.PI/n;for(let i=0;i<n;i++)this.hostileShot(x,y,rot+i*Math.PI*2/n,cfg.speed,cfg.damage,'bell-ring');}
    else if(k==='salt-star'){const rot=this.roomTime*.24;for(let i=0;i<7;i++)this.hostileShot(x,y,rot+i*Math.PI*2/7,cfg.speed,cfg.damage,'salt-star');if(phase>=2)this.aimedBossShot(e,cfg.speed*1.15,cfg.damage+1,'salt-comet',0,.18);}
    else if(k==='census-cross'){const rot=idx%2?Math.PI/4:0;for(let i=0;i<4;i++)this.hostileShot(x,y,rot+i*Math.PI/2,cfg.speed,cfg.damage,'census-axis');for(let i=0;i<Math.max(0,phase-1)*2;i++)this.aimedBossShot(e,cfg.speed,cfg.damage,'census-entry',(i-(phase-1)+.5)*.16,.12*i);}
    else if(k==='mirror-fan'){for(let i=0;i<n;i++){const spread=(i-(n-1)/2)*.13;this.aimedBossShot(e,cfg.speed,cfg.damage,'mirror-left',spread);this.aimedBossShot(e,cfg.speed,cfg.damage,'mirror-right',Math.PI-spread,.12);}}
    else if(k==='tenant-doors'){const rot=idx%2?Math.PI/4:0;for(let i=0;i<Math.max(4,n);i++)this.hostileShot(x,y,rot+i*Math.PI*2/Math.max(4,n),cfg.speed,cfg.damage,'tenant-threshold',i%2?.12:0);}
    else if(k==='company-volley'){const base=Math.atan2((this.player.y+7)-y,(this.player.x+5)-x);for(let row=0;row<Math.min(3,phase+1);row++)for(let i=0;i<n;i++){const spread=(i-(n-1)/2)*.11;this.hostileShot(x,y,base+spread,cfg.speed+row*4,cfg.damage,'company-volley',row*.22);}}
    else if(k==='frequency-band'){const ys=[50,82,114,146];for(let i=0;i<Math.min(ys.length,phase+1);i++){const yy=ys[(i+idx)%ys.length];this.projectiles.push({x:18,y:yy,vx:cfg.speed,vy:0,r:2,life:5,damage:cfg.damage,hostile:true,kind:'frequency-band',delay:i*.14});this.projectiles.push({x:302,y:yy+8,vx:-cfg.speed,vy:0,r:2,life:5,damage:cfg.damage,hostile:true,kind:'frequency-band',delay:i*.14+.08});}}
    else if(k==='missing-frame'){const tx=(e.lastPlayerX||this.player.x)+5,ty=(e.lastPlayerY||this.player.y)+7;for(let i=0;i<n;i++){const a=Math.atan2(ty-y,tx-x)+(i-(n-1)/2)*.12;this.hostileShot(x,y,a,cfg.speed,cfg.damage,'missing-frame',i*.08);}if(phase===3)this.aimedBossShot(e,cfg.speed*1.2,cfg.damage+1,'missing-cut',Math.PI,.35);}
    else {const rot=this.roomTime*.37;for(let i=0;i<n;i++)this.hostileShot(x,y,rot+i*Math.PI*2/n,cfg.speed,cfg.damage,'unremembered-ring',i%3*.08);for(let i=0;i<phase;i++)this.aimedBossShot(e,cfg.speed*1.1,cfg.damage,'relation-cut',(i-(phase-1)/2)*.18,.16*i);}
    this.perceptionSystem.shockLoss(this.save,cfg.perception||2);this.sound?.play('boss');
  }
  updateBoss(e,dt){
    const profile=this.bossProfile(e),phase=phaseForBoss(e.hp,e.maxHp),cfg=profile.phases[phase-1];
    if(phase!==this.bossPhase){this.bossPhase=phase;this.bossVulnerable=phase===3?0:Math.max(this.bossVulnerable,.35);this.screenShake=.3;this.sound?.play('boss');if(e.type==='the-unremembered'&&phase===3){this.save.perception=Math.min(this.save.perception,28);this.save.stability=Math.max(46,this.save.stability);this.finalBossPhase3=true;}this.message([`${e.name.toUpperCase()} · PHASE ${phase}`,cfg.line]);return;}
    this.bossAttackTimer-=dt;this.bossMove(e,profile,phase,dt);const d=this.distanceToPlayer(e);
    if(e.pendingAttack){e.windup=Math.max(0,e.windup-dt);if(e.windup<=0){e.pendingAttack=false;if(this.distanceToPlayer(e)<25)this.hitPlayer((e.damage+(phase-1)*2)*(cfg.melee||1),e);}}
    else if(d<23&&e.attackCd<=0){e.pendingAttack=true;e.windup=e.windupMax*(phase===3?.82:1);e.attackCd=.86+e.windupMax;this.sound?.play('telegraph');}
    if(this.bossAttackTimer<=0){this.bossAttackTimer=cfg.interval;this.fireBossPattern(e,profile,phase);}
  }
  hitPlayer(amount,source){
    if(this.invuln>0)return;if(this.sigilBuffs.fortify>0)amount*=.62;if(this.guard){if(this.parryTimer>0){if(source){source.bound=Math.max(source.bound||0,1.1);source.stagger=Math.max(source.stagger||0,.85);if(Number.isFinite(source.hp)&&source.hp<900)source.hp=Math.max(0,source.hp-2);}this.save.combatStats.parries++;this.unlockAchievement('perfect-answer');this.sound?.play('parry');this.spawnText('PARRY',this.player.x,this.player.y-4);this.hitStop=Math.max(this.hitStop,.07);return;}amount*=.35;this.save.stamina=Math.max(0,this.save.stamina-BALANCE.stamina.blockCost);this.staminaRegenDelay=Math.max(this.staminaRegenDelay,BALANCE.stamina.blockDelay);if(this.save.stamina<=0){this.guard=false;this.parryTimer=0;amount*=1.7;this.spawnText('GUARD BREAK',this.player.x-11,this.player.y-4);}}
    this.player.hp=Math.max(0,this.player.hp-amount);this.invuln=.55;this.screenShake=.18;this.perceptionSystem.shockLoss(this.save,amount*.45);this.sound?.play('hurt');if(this.player.hp<=0)this.playerDeath();
  }
  playerDeath(){this.save.deaths=(this.save.deaths||0)+1;this.save.health=100;this.save.perception=Math.max(45,this.save.perception);this.save.stability=75;const echo=this.room().tone!=='manor';const checkpoint=echo?(this.save.memorySafeRoom||'echo-priory-gate'):(this.save.safeRoom||'manor-vestibule');this.message(['MEMORY FRACTURE','The scene refuses to end here.','Blackthorn pulls the thread back to the last stable threshold.'],()=>this.loadRoom(checkpoint,true));}
  updateProjectiles(dt){for(const p of this.projectiles){if((p.delay||0)>0){p.delay=Math.max(0,p.delay-dt);p.life-=dt;if(p.life<=0)continue;continue;}p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;if(p.life<=0)continue;if(p.hostile&&this.invuln<=0&&Math.hypot((this.player.x+5)-p.x,(this.player.y+7)-p.y)<8){p.life=0;this.hitPlayer(p.damage,{bound:0,hp:999});continue;}if(!p.hostile){for(const e of this.enemies){if(e.dead||Math.hypot((e.x+e.w/2)-p.x,(e.y+e.h/2)-p.y)>Math.max(7,e.w*.7))continue;if(e.boss&&!this.bossCanBeHit(e)){p.life=0;this.spawnText('UNFIXED',e.x,e.y);break;}p.life=0;const scaled=p.damage*(e.branded>0?(e.brandPower||1):1),dead=damageActor(e,scaled,{x:Math.sign(p.vx)*4,y:Math.sign(p.vy)*4});if(e.branded>0)e.branded=Math.max(0,e.branded-(p.heavy?2.5:1.4));this.applyPoise(e,p.poise||8);this.save.combatStats.rangedHits++;if(p.heavy)this.save.combatStats.heavyHits++;this.hitStop=Math.max(this.hitStop,p.heavy ? .045 : .024);this.spawnBurst(e.x+e.w/2,e.y+e.h/2,p.heavy?12:7);this.sound?.play('hit');if(dead)this.killEnemy(e);break;}}}this.projectiles=this.projectiles.filter(p=>p.life>0&&p.x>-5&&p.x<325&&p.y>-5&&p.y<185);}
  updatePerception(dt){
    const room=this.room();let corrupt=false;if(room.corruption){for(const z of room.corruption)if(overlaps(this.player,{x:z[0],y:z[1],w:z[2],h:z[3]})){corrupt=true;break;}}
    let pressure=0;for(const e of this.enemies)if(!e.dead&&this.distanceToPlayer(e)<85)pressure+=e.perception*BALANCE.perception.enemyPressureScale;
    if(this.sigilBuffs.purge>0){corrupt=false;pressure*=.55;}if(this.sigilBuffs.ward>0)pressure*=.72;this.perceptionSystem.update(dt,this.save,{corrupt,enemyPressure:pressure,safe:!!room.safe&&!corrupt});
    const fx=this.perceptionSystem.fx(this.save.perception,this.settings),tier=fx.tier;this.sound?.setPerception(tier,fx.amount);
    if(this.recordPerceptionTier(tier)){this.persist('perception-tier');const lines=this.perceptionSystem.tierMessage(tier);if(lines)this.message(lines);}
    if(this.sigilBuffs.reveal<=0&&this.perceptionSystem.shouldSpawnShadow(fx)&&this.phantoms.filter(p=>p.type==='shadow').length<3){this.phantoms.push({type:'shadow',x:18+seeded(this.roomTime*11)*276,y:34+seeded(this.roomTime*17+2)*112,w:9,h:20,life:1.45});}
    if(this.sigilBuffs.reveal<=0&&this.perceptionSystem.shouldSpawnPhantom(fx)&&this.phantoms.filter(p=>p.type==='enemy').length<3){let x=24+seeded(this.roomTime*13+5)*264,y=38+seeded(this.roomTime*19+9)*105;if(Math.hypot(x-this.player.x,y-this.player.y)<55)x=INTERNAL_W-x-16;this.phantoms.push({type:'enemy',x,y,w:11,h:17,life:fx.tier>=3?4.6:3.4});}
    if(this.perceptionSystem.shouldEcho(fx)){this.echoes.push({text:this.perceptionSystem.echoText(this.roomTime*7+room.name.length),life:2.6});this.sound?.play('whisper');}
    if(this.sigilBuffs.reveal<=0&&this.perceptionSystem.shouldGlitch(fx)){this.fakeGlitches.push({y:20+Math.floor(seeded(this.roomTime*23)*135),h:2+Math.floor(seeded(this.roomTime*31)*7),dx:2+Math.floor(seeded(this.roomTime*41)*9),life:.22});this.sound?.play('glitch');}
  }
  updateParticles(dt){for(const p of this.particles){p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;}this.particles=this.particles.filter(p=>p.life>0);for(const p of this.phantoms)p.life-=dt;this.phantoms=this.phantoms.filter(p=>p.life>0);for(const e of this.echoes)e.life-=dt;this.echoes=this.echoes.filter(e=>e.life>0);for(const g of this.fakeGlitches)g.life-=dt;this.fakeGlitches=this.fakeGlitches.filter(g=>g.life>0);}
  spawnBurst(x,y,n=8){for(let i=0;i<n;i++){const a=seeded(this.roomTime+i)*Math.PI*2,s=12+seeded(i+this.roomTime)*24;this.particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:.25+seeded(i)*.35});}}
  spawnText(text,x,y){this.particles.push({x,y,vx:0,vy:-8,life:.65,text});}

  render(){
    const c=this.ctx,room=this.room(),fx=this.perceptionSystem.fx(this.save.perception,this.settings);c.save();let sx=0,sy=0;if(this.screenShake>0&&!this.settings.reduceMotion&&!this.settings.disableShake){sx=(Math.random()-.5)*3;sy=(Math.random()-.5)*3;}c.translate(sx,sy);
    this.drawRoom(c,room,fx);this.drawInteractables(c,room,fx);for(const p of this.phantoms)this.drawPhantom(c,p,fx);for(const e of this.enemies)if(!e.dead)this.drawEnemy(c,e,fx);this.drawPlayer(c);if(this.sigilFlash>0){c.save();c.globalAlpha=Math.min(.7,this.sigilFlash);const school=sigilById(this.save.equippedSigil).school;c.strokeStyle=school==='FLESH'?'#b1766b':school==='MIND'?'#8d89b0':'#9f78a6';const r=14+(1-this.sigilFlash)*28;c.strokeRect(this.player.x-r/2+5,this.player.y-r/2+7,r,r);c.restore();}for(const p of this.projectiles)this.drawProjectile(c,p);this.drawParticles(c);this.drawPerceptionEcho(c,fx);this.drawVignette(c,room,fx);this.drawFakeGlitches(c,fx);if(this.mode==='map')this.drawMap(c);c.restore();
  }
  palette(room){if(room.id?.startsWith('final-'))return {floor:'#16101d',wall:'#352442',trim:'#8c5d96',light:'#d49368',dark:'#030205',accent:'#b25e82'};if(room.tone==='boss')return {floor:'#160d0e',wall:'#382126',trim:'#8d594f',light:'#e0a15f',dark:'#030203',accent:'#b13d39'};if(room.tone==='manor')return {floor:'#151318',wall:'#352e31',trim:'#8f745b',light:'#e2a35f',dark:'#040405',accent:'#9e5b45'};if(['1198 BCE','395'].includes(room.era))return {floor:'#171411',wall:'#393126',trim:'#8f7958',light:'#e2ae6b',dark:'#050403',accent:'#9f6a3f'};if(['1917','1956','1987'].includes(room.era))return {floor:'#101519',wall:'#26323a',trim:'#647c82',light:'#d28c58',dark:'#030507',accent:'#7e4a3e'};return {floor:'#131416',wall:'#333332',trim:'#82745f',light:'#d9a05f',dark:'#040405',accent:'#75505c'};}
  drawRoom(c,room,fx){const p=this.palette(room);this.drawSceneBackdrop(c,room);c.save();c.globalAlpha=.82;c.fillStyle=p.floor;c.fillRect(16,78,288,86);c.restore();for(let y=82;y<164;y+=10)for(let x=20;x<304;x+=16){const j=seeded(x*7+y*13+room.name.length);c.fillStyle=j>.72?'rgba(103,91,78,.12)':j<.18?'rgba(0,0,0,.18)':'rgba(58,51,49,.10)';c.fillRect(x+(y%20?2:0),y,13,8);}for(const o of room.obstacles||[]){c.fillStyle='rgba(5,4,6,.82)';c.fillRect(o[0]+2,o[1]+4,o[2],o[3]);c.fillStyle=p.wall;c.fillRect(...o);c.fillStyle=p.trim;c.fillRect(o[0],o[1],o[2],Math.min(3,o[3]));c.fillStyle='#0a0809';c.fillRect(o[0],o[1]+o[3]-3,o[2],3);c.fillStyle='rgba(255,214,160,.09)';c.fillRect(o[0]+2,o[1]+3,1,Math.max(0,o[3]-7));}this.drawDecor(c,room,p);this.drawThresholds(c,room,p);for(let li=0;li<(room.lights||[]).length;li++){const l=room.lights[li],lf=this.perceptionSystem.lightFactor(li,fx,this.roomTime),r=l[2]*1.25,g=c.createRadialGradient(l[0],l[1],1,l[0],l[1],r);g.addColorStop(0,`rgba(255,178,87,${.30*lf})`);g.addColorStop(.25,`rgba(224,115,52,${.12*lf})`);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(l[0]-r,l[1]-r,r*2,r*2);c.globalAlpha=lf;c.fillStyle='#ffd08a';c.fillRect(l[0]-1,l[1]-3,3,5);c.fillStyle='#ff8b45';c.fillRect(l[0],l[1]-4,1,2);c.globalAlpha=1;}this.drawPerceptionArchitecture(c,room,p,fx);for(const z of room.corruption||[]){const cg=c.createRadialGradient(z[0]+z[2]/2,z[1]+z[3]/2,2,z[0]+z[2]/2,z[1]+z[3]/2,Math.max(z[2],z[3]));cg.addColorStop(0,'rgba(102,32,113,.22)');cg.addColorStop(1,'rgba(21,5,27,0)');c.fillStyle=cg;c.fillRect(...z);}if(fx.warp){c.fillStyle=`rgba(63,22,72,${.025*fx.amount})`;for(let i=0;i<8;i++)c.fillRect(0,(i*23+(this.roomTime*9)%23)|0,INTERNAL_W,1);}c.font='7px Georgia,serif';c.fillStyle='rgba(240,222,197,.86)';c.fillText(`${room.area.toUpperCase()} · ${room.era}`,9,11);c.fillStyle='rgba(223,196,166,.65)';c.fillText(room.name.toUpperCase(),INTERNAL_W-8-c.measureText(room.name.toUpperCase()).width,11);}
  drawThresholds(c,room,p){c.save();c.fillStyle='#050405';c.strokeStyle=p.trim;const ex=room.exits||{};if(ex.left){c.fillRect(0,65,16,48);c.strokeRect(4,67,11,44);c.fillStyle='rgba(216,143,75,.12)';c.fillRect(7,72,4,34);}if(ex.right){c.fillStyle='#050405';c.fillRect(304,65,16,48);c.strokeRect(304,67,11,44);c.fillStyle='rgba(216,143,75,.12)';c.fillRect(309,72,4,34);}if(ex.up){c.fillStyle='#050405';c.fillRect(142,0,36,16);c.strokeRect(144,4,32,11);}if(ex.down){c.fillStyle='#050405';c.fillRect(142,164,36,16);c.strokeRect(144,164,32,11);}c.restore();}
  drawDecor(c,room,p){const d=room.decor;if(!d)return;c.save();c.fillStyle='#221a20';
    if(d==='library'||d==='archive'){for(const x of [34,78,224,268]){c.fillStyle='#4a3535';c.fillRect(x,28,14,106);for(let y=34;y<126;y+=12){c.fillStyle=(y/12)%2?'#8b6d55':'#6d5a4e';c.fillRect(x+2,y,10,3);}}}
    if(d==='dining'){c.fillStyle='#4b3433';c.fillRect(96,72,128,34);c.fillStyle='#806755';for(let x=106;x<216;x+=22)c.fillRect(x,76,12,3);}
    if(d==='garden'){c.fillStyle='#41513d';for(const [x,y] of [[70,55],[130,96],[226,58]]){c.fillRect(x,y,3,24);c.fillRect(x-6,y+4,15,5);c.fillRect(x-10,y+10,21,5);}c.strokeStyle='#53605d';for(let x=34;x<290;x+=32)c.strokeRect(x,24,26,116);}
    if(d==='chapel'){c.fillStyle='#4b3a3a';c.fillRect(140,34,40,28);c.fillStyle='#8f745b';c.fillRect(151,38,18,4);c.fillRect(158,32,4,24);for(const x of [82,198]){c.fillStyle='#3b3032';c.fillRect(x,90,44,10);}}
    if(d==='bedroom'||d==='guest'||d==='nursery'){c.fillStyle='#4b3b43';c.fillRect(60,52,82,36);c.fillStyle='#7f6c63';c.fillRect(64,56,74,13);c.fillStyle='#3d3237';c.fillRect(212,48,38,34);}
    if(d==='study'){c.fillStyle='#513b36';c.fillRect(184,72,82,28);c.fillStyle='#86705b';c.fillRect(190,75,70,4);c.fillStyle='#473237';c.fillRect(54,52,58,16);}
    if(d==='cellar'){for(const x of [58,114,182,238]){c.fillStyle='#3b302d';c.fillRect(x,46,28,88);for(let y=53;y<126;y+=12){c.fillStyle='#705044';c.fillRect(x+4,y,20,5);}}}
    if(d==='boiler'){c.fillStyle='#493b3a';c.fillRect(64,52,66,62);c.fillStyle='#79645b';c.fillRect(70,58,54,6);c.fillStyle='#3d4748';for(let x=150;x<274;x+=22)c.fillRect(x,28,5,104);}
    if(d==='vault'){for(let i=0;i<9;i++){const a=i/9*Math.PI*2,x=160+Math.cos(a)*78,y=88+Math.sin(a)*48;c.fillStyle=i===0?'#8c6a4b':'#3e3442';c.fillRect((x-5)|0,(y-7)|0,10,14);}c.strokeStyle='#79606e';c.strokeRect(118,46,84,84);}
    if(d==='mirror'){c.fillStyle='#58616a';c.fillRect(128,40,64,76);c.fillStyle='rgba(173,185,194,.18)';c.fillRect(134,46,52,64);}
    if(d==='root'){c.strokeStyle='#5b3c45';for(let i=0;i<11;i++){c.beginPath();c.moveTo(160,130);c.lineTo(70+seeded(i)*180,30+seeded(i+9)*90);c.stroke();}}
    if(d==='stairwell'){c.fillStyle='#4a3c3d';for(let i=0;i<7;i++)c.fillRect(70+i*22,130-i*12,70,7);}
    if(d==='gallery'){for(const x of [58,111,164,217]){c.strokeStyle='#795b52';c.strokeRect(x,34,24,40);c.fillStyle='#241b22';c.fillRect(x+4,39,16,28);}}
    if(d==='priory'||d==='cloister'){c.strokeStyle='#625c55';for(let x=42;x<286;x+=48){c.strokeRect(x,28,26,98);c.beginPath();c.moveTo(x,48);c.lineTo(x+13,32);c.lineTo(x+26,48);c.stroke();}}
    if(d==='infirmary'){for(const x of [48,128,208]){c.fillStyle='#4a3d39';c.fillRect(x,54,64,16);c.fillStyle='#76665d';c.fillRect(x+4,58,56,5);}}
    if(d==='apothecary'){for(const x of [52,106,236]){c.fillStyle='#493a35';c.fillRect(x,36,26,94);for(let y=44;y<120;y+=16){c.fillStyle='#806a4f';c.fillRect(x+4,y,18,5);}}}
    if(d==='ossuary'||d==='crypt'){for(let x=44;x<280;x+=38){c.fillStyle='#736b62';c.fillRect(x,58,14,8);c.fillRect(x+3,68,8,16);c.fillStyle='#3f3938';c.fillRect(x-4,88,22,6);}}
    if(d==='belfry'){c.strokeStyle='#75615d';c.lineWidth=2;c.strokeRect(126,24,68,46);c.beginPath();c.moveTo(160,24);c.lineTo(160,92);c.stroke();c.fillStyle='#5a4743';c.fillRect(104,118,112,10);c.lineWidth=1;}
    if(d==='salt'||d==='observatory'){c.fillStyle='#5d594d';for(let i=0;i<8;i++){const x=42+i*32,y=46+(i%3)*22;c.fillRect(x,y,18,4);c.fillStyle='#8b866c';c.fillRect(x+4,y-6,2,12);c.fillStyle='#5d594d';}c.strokeStyle='#81795e';c.beginPath();c.arc(160,84,42,0,Math.PI*2);c.stroke();}
    if(d==='cistern'){c.fillStyle='#28383b';c.fillRect(36,108,248,34);c.strokeStyle='#667271';for(let x=54;x<276;x+=44)c.strokeRect(x,38,28,66);}
    if(d==='bridge'){c.fillStyle='#4b4742';c.fillRect(72,92,176,18);c.strokeStyle='#777064';c.strokeRect(72,92,176,18);}
    if(d==='roman'){c.fillStyle='#514a43';for(const x of [62,116,190,244]){c.fillRect(x,42,14,84);c.fillStyle='#80776a';c.fillRect(x-5,38,24,7);c.fillStyle='#514a43';}}
    if(d==='theatre'){c.strokeStyle='#6e5654';for(let i=0;i<4;i++)c.strokeRect(70+i*18,48+i*12,180-i*36,70-i*24);c.fillStyle='#4e3938';c.fillRect(116,104,88,20);}
    c.restore();
  }
  drawInteractables(c,room,fx){const ngEcho=this.ngPlusEchoForRoom(room),items=ngEcho?[...(room.interact||[]),ngEcho]:(room.interact||[]);for(const it of items){if(it.once&&this.save.flags.includes(`seen:${it.id}`))continue;const near=Math.hypot((it.x+it.w/2)-(this.player.x+5),(it.y+it.h/2)-(this.player.y+7))<32;if(this.sigilBuffs.reveal<=0&&!this.perceptionSystem.objectVisible(it.id,fx,this.roomTime,near))continue;const pulse=.55+.35*Math.sin(this.roomTime*3+it.x*.1);c.save();c.globalAlpha=.22+.18*pulse;c.fillStyle=it.kind==='ngplus-echo'?'#a97bc7':'#d47a45';c.beginPath();c.arc(it.x+it.w/2,it.y+it.h/2,Math.max(8,it.w*.75),0,Math.PI*2);c.fill();c.globalAlpha=1;c.fillStyle='#171116';c.fillRect(it.x,it.y+Math.max(2,it.h-5),it.w,5);c.fillStyle=it.kind==='ngplus-echo'?'#c6a6e1':'#d59a63';c.fillRect(it.x+2,it.y+2,Math.max(2,it.w-4),2);c.fillStyle='#efe0c5';c.fillRect(it.x+Math.floor(it.w/2)-1,it.y,2,3);if(near){c.fillStyle='#f4e4c6';c.font='7px Georgia,serif';const label=`C · ${it.label.toUpperCase()}`;c.fillText(label,Math.max(6,Math.min(314-c.measureText(label).width,it.x-8)),it.y-5);}c.restore();}}
  drawPlayer(c){const p=this.player,x=p.x-5,y=p.y-10,step=Math.floor(this.roomTime*8)%2;c.save();c.fillStyle='rgba(0,0,0,.55)';c.beginPath();c.ellipse(p.x+5,p.y+p.h+3,10,4,0,0,Math.PI*2);c.fill();const hurt=p.hitFlash>0;c.fillStyle=hurt?'#f6ddce':'#3a3035';c.fillRect(x+6,y+9,9,12);c.fillStyle='#1a171b';c.fillRect(x+5,y+13,11,9);c.fillStyle='#6f2227';c.fillRect(x+4,y+12,4,12);c.fillStyle='#8d3031';c.fillRect(x+7,y+17,8,7);c.fillStyle='#bcb1a1';c.fillRect(x+8,y+3,6,6);c.fillStyle='#342a2c';c.fillRect(x+7,y+2,8,3);c.fillStyle='#0b0a0c';c.fillRect(x+8,y+4,2,1);c.fillRect(x+12,y+4,2,1);c.fillStyle='#625a57';c.fillRect(x+6,y+9,2,9);c.fillRect(x+14,y+10,2,8);c.fillStyle='#171417';c.fillRect(x+7,y+21+(step?1:0),3,5);c.fillRect(x+12,y+21+(step?0:1),3,5);c.strokeStyle='#d0c2aa';if(p.facing==='left'){c.beginPath();c.moveTo(x+7,y+14);c.lineTo(x-3,y+17);c.stroke();}else if(p.facing==='right'){c.beginPath();c.moveTo(x+15,y+14);c.lineTo(x+26,y+17);c.stroke();}else if(p.facing==='up'){c.beginPath();c.moveTo(x+14,y+10);c.lineTo(x+17,y-2);c.stroke();}else{c.beginPath();c.moveTo(x+8,y+17);c.lineTo(x+5,y+29);c.stroke();}if(this.guard){c.strokeStyle=this.parryTimer>0?'#f0c27c':'#9d8e78';c.lineWidth=2;c.beginPath();c.arc(p.x+5,p.y+8,11,-1.2,1.2);c.stroke();}if(this.charging){const q=this.weapon.chargeMax?Math.min(1,this.chargeTime/this.weapon.chargeMax):0;c.strokeStyle=`rgba(216,103,67,${.45+.4*q})`;c.strokeRect(x-2-q*2,y-2-q*2,26+q*4,32+q*4);}c.restore();}
  drawEnemy(c,e,fx){let visible=true;if(e.boss&&this.bossPhase===3&&this.bossVulnerable<=0)visible=(Math.floor(this.roomTime*5)%4===0)||fx.tier>=3;if(!visible)return;const prof=e.boss?(BOSS_PROFILES[e.type]||{}):null,accent=e.boss?(prof.accent||'#9c473f'):e.family==='Pale Ones'?'#a9a69b':e.family==='Witness'?'#71627a':e.family==='Ashborn'?'#8f5137':e.family==='Cultborn'?'#76503d':'#5d4653';const vw=e.boss?Math.max(30,e.w*2.1):Math.max(17,e.w*1.35),vh=e.boss?Math.max(38,e.h*2.2):Math.max(24,e.h*1.5),x=e.x+e.w/2-vw/2,y=e.y+e.h-vh;c.save();c.fillStyle='rgba(0,0,0,.62)';c.beginPath();c.ellipse(e.x+e.w/2,e.y+e.h+3,vw*.42,Math.max(3,vh*.1),0,0,Math.PI*2);c.fill();c.fillStyle=e.hitFlash>0?'#ead4c5':'#111014';c.fillRect(x+vw*.28,y+vh*.22,vw*.44,vh*.64);c.fillStyle=accent;c.globalAlpha=e.boss?.92:.78;c.fillRect(x+vw*.18,y+vh*.43,vw*.64,vh*.42);c.globalAlpha=1;c.fillStyle='#0b090c';c.fillRect(x+vw*.08,y+vh*.74,vw*.84,vh*.16);c.fillStyle=e.boss?'#c6b39b':'#887d74';c.fillRect(x+vw*.34,y+vh*.08,vw*.32,vh*.20);c.fillStyle='#0a0709';c.fillRect(x+vw*.37,y+vh*.13,vw*.08,2);c.fillRect(x+vw*.56,y+vh*.13,vw*.08,2);c.fillStyle=e.boss?'#e35d3e':'#b05b51';c.fillRect(x+vw*.40,y+vh*.14,1,1);c.fillRect(x+vw*.59,y+vh*.14,1,1);if(e.boss){c.strokeStyle=accent;c.lineWidth=2;c.beginPath();c.moveTo(x+vw*.34,y+vh*.1);c.lineTo(x+vw*.20,y-3);c.moveTo(x+vw*.66,y+vh*.1);c.lineTo(x+vw*.80,y-3);c.stroke();c.fillStyle='rgba(212,86,57,.22)';c.beginPath();c.arc(e.x+e.w/2,e.y+e.h/2,vw*.65,0,Math.PI*2);c.fill();}if(e.pendingAttack){const t=e.windupMax?1-e.windup/e.windupMax:1;c.strokeStyle=t>.65?'#ff9b62':'#a76052';c.lineWidth=t>.65?2:1;c.strokeRect(x-3,y-3,vw+6,vh+6);}if(e.stagger>0){c.strokeStyle='#e2bc72';c.strokeRect(x-5,y-5,vw+10,vh+10);}if(e.bound>0){c.strokeStyle='#ab7fc0';c.strokeRect(x-2,y-2,vw+4,vh+4);}if(e.branded>0){c.strokeStyle='#d06e72';c.strokeRect(x-4,y-4,vw+8,vh+8);}if(e.boss&&this.bossVulnerable>0){c.strokeStyle='#f2b36f';c.strokeRect(x-2,y-2,vw+4,vh+4);}c.restore();}
  drawMap(c){
    c.fillStyle='rgba(5,4,7,.93)';c.fillRect(12,12,296,156);c.strokeStyle='#70515f';c.strokeRect(12.5,12.5,295,155);c.font='8px monospace';c.fillStyle='#e5d7ca';c.fillText('BLACKTHORN MANOR · RECOVERED SURVEY',25,27);c.font='6px monospace';c.fillStyle='#958681';c.fillText('M / ESC · CLOSE   ■ CURRENT   □ DISCOVERED',25,38);
    const manorRooms=Object.values(ROOMS).filter(r=>r.tone==='manor'&&Number.isFinite(r.floor)&&r.id!=='manor-gallery');
    const aliases=new Set(this.save.rooms.map(id=>this.resolveRoomId(id)));aliases.add(this.resolveRoomId(this.save.room));
    for(let fi=0;fi<MANOR_FLOORS.length;fi++){const fl=MANOR_FLOORS[fi],top=48+fi*39;c.fillStyle='#a47768';c.fillText(fl.label,25,top);const rooms=manorRooms.filter(r=>r.floor===fl.id&&aliases.has(r.id));for(const r of rooms){const x=58+(r.mapX+1)*43,y=top-10+r.mapY*15;const current=r.id===this.resolveRoomId(this.save.room);c.fillStyle=current?'#a46e5c':'#2b222a';c.fillRect(x,y,36,11);c.strokeStyle=current?'#e5c2a7':'#6a5660';c.strokeRect(x+.5,y+.5,35,10);c.fillStyle=current?'#160d0e':'#d0c0b6';c.font='5px monospace';const t=r.name.toUpperCase().replace(' · ALTERED','').slice(0,7);c.fillText(t,x+2,y+7);}}
    c.fillStyle='#8b7a75';c.font='6px monospace';c.fillText(`${Math.min(23,aliases.size)} MANOR SPACES REMEMBERED`,25,160);
  }
  drawPhantom(c,p,fx){if(p.type==='shadow'){c.globalAlpha=.09+.08*fx.amount;c.fillStyle='#09070d';c.fillRect(p.x,p.y,p.w||9,p.h||20);c.fillRect(p.x-4,p.y+(p.h||20)-3,(p.w||9)+8,3);}else{c.globalAlpha=.28+.18*fx.amount;c.fillStyle='#b6a5c8';c.fillRect(p.x+2,p.y,p.w-4,p.h);c.fillStyle='#17131c';c.fillRect(p.x,p.y+5,p.w,p.h-5);c.fillStyle='#d0c3dc';c.fillRect(p.x+3,p.y+5,2,2);c.fillRect(p.x+p.w-5,p.y+5,2,2);}c.globalAlpha=1;}
  drawPerceptionArchitecture(c,room,p,fx){
    if(fx.roomShift){c.save();c.globalAlpha=.12+.08*fx.amount;c.strokeStyle='#8b6c91';const drift=Math.round(Math.sin(this.roomTime*1.7)*4);for(let i=0;i<3;i++)c.strokeRect(42+i*78+drift,34+i*17,54,38);c.fillStyle='#4a344d';c.fillRect(112+drift,118,96,5);c.restore();}
    if(fx.doorVeil&&Math.sin(this.roomTime*1.35+room.name.length)>.05){const dirs=Object.keys(room.exits||{});if(dirs.length){const dir=dirs[(room.name.length+Math.floor(this.roomTime/4))%dirs.length];c.save();c.globalAlpha=.72*fx.amount;c.fillStyle=p.wall;c.strokeStyle=p.trim;if(dir==='up'||dir==='down'){const y=dir==='up'?0:164;c.fillRect(142,y,36,16);c.strokeRect(142.5,y+.5,35,15);}else{const x=dir==='left'?0:304;c.fillRect(x,65,16,47);c.strokeRect(x+.5,65.5,15,46);}c.restore();}}
  }
  drawPerceptionEcho(c,fx){if(!fx.echoes||!this.echoes.length)return;const e=this.echoes[this.echoes.length-1];c.save();c.globalAlpha=Math.min(.62,e.life*.34)*fx.amount;c.font='6px monospace';c.fillStyle='#cbbbd3';const text=e.text.slice(0,46);c.fillText(text,12,154);c.restore();}
  drawFakeGlitches(c,fx){if(!fx.fakeGlitch)return;c.save();for(const g of this.fakeGlitches){c.globalAlpha=Math.min(.7,g.life*3)*fx.amount;c.fillStyle='#7d657f';c.fillRect(g.dx,g.y,INTERNAL_W-g.dx*2,g.h);c.fillStyle='#160d19';c.fillRect(30+g.dx,g.y+1,120,g.h>3?2:1);}if(this.fakeGlitches.length&&fx.tier>=4){c.globalAlpha=.45*fx.amount;c.font='6px monospace';c.fillStyle='#d2c4d8';c.fillText('MEMORY SIGNAL // LOCAL FICTION',10,22);}c.restore();}
  drawProjectile(c,p){const delayed=(p.delay||0)>0;c.save();if(delayed){c.globalAlpha=.35;c.strokeStyle='#e0b375';c.strokeRect(p.x-4,p.y-4,8,8);c.restore();return;}const bossCols={'bell-ring':'#bb554f','salt-star':'#d2a85f','salt-comet':'#e6c77f','census-axis':'#a58b70','census-entry':'#c2aa8d','mirror-left':'#a679b4','mirror-right':'#725380','tenant-threshold':'#b76b4e','company-volley':'#8a8072','frequency-band':'#5f99a2','missing-frame':'#8a65a2','missing-cut':'#cf7bbb','unremembered-ring':'#c14369','relation-cut':'#e16483'};const col=p.hostile?(bossCols[p.kind]||'#bd5a64'):'#e3b764';c.globalAlpha=.28;c.fillStyle=col;c.beginPath();c.arc(p.x,p.y,5,0,Math.PI*2);c.fill();c.globalAlpha=1;c.fillStyle=col;c.fillRect(p.x-2,p.y-2,4,4);c.fillStyle='#fff0c2';c.fillRect(p.x-1,p.y-1,2,2);c.restore();}
  drawParticles(c){for(const p of this.particles){c.globalAlpha=Math.min(1,p.life*2);if(p.text){c.fillStyle='#ead7b9';c.font='7px monospace';c.fillText(p.text,p.x,p.y);}else{c.fillStyle='#b99878';c.fillRect(p.x|0,p.y|0,2,2);}}c.globalAlpha=1;}
  drawVignette(c,room,fx){const darkness=room.tone==='manor'?.25:.34+fx.tier*.03;const g=c.createRadialGradient(160,98,42,160,98,180);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.72,'rgba(0,0,0,.05)');g.addColorStop(1,`rgba(0,0,0,${darkness})`);c.fillStyle=g;c.fillRect(0,0,320,180);c.fillStyle='rgba(120,42,31,.06)';c.fillRect(0,0,320,3);c.fillRect(0,177,320,3);if(fx.heavy){c.fillStyle=`rgba(53,15,58,${.07*fx.amount})`;c.fillRect(0,0,320,180);}}
}


/* ===== app.js ===== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const state={view:'title',slot:getActiveSlot(),save:null,engine:null,settings:{musicVolume:.35,fxVolume:.65,mute:false,perceptionFx:1,truthfulHud:false,reduceMotion:false,disableShake:false,highContrast:false,textSize:1,touchMode:'always',touchSize:'standard',leftHanded:false,performanceMode:'auto',orientationHint:true,...parseSettings()},audio:null};
state.audio=new AudioSystem(state.settings);
window.__BT404__=state;

function applySettings(){document.documentElement.style.setProperty('--scale',String(state.settings.textSize||1));const b=document.body;b.classList.toggle('high-contrast',!!state.settings.highContrast);b.classList.toggle('reduce-motion',!!state.settings.reduceMotion);b.classList.toggle('left-handed',!!state.settings.leftHanded);b.classList.toggle('touch-large',state.settings.touchSize==='large');b.classList.toggle('touch-hidden',state.settings.touchMode==='hidden');b.classList.toggle('touch-auto',state.settings.touchMode==='auto');const autoBattery=state.settings.performanceMode==='auto'&&matchMedia('(pointer:coarse)').matches&&innerWidth<700;b.classList.toggle('perf-battery',state.settings.performanceMode==='battery'||autoBattery);b.classList.toggle('perf-quality',state.settings.performanceMode==='quality');state.audio.setSettings(state.settings);if(state.engine)state.engine.settings=state.settings;updateViewportState();}
function persistSettings(){saveSettings(state.settings);applySettings();}
function showView(name){state.view=name;for(const v of $$('.view'))v.classList.add('hidden');$(`#${name}View`)?.classList.remove('hidden');if(name==='title')refreshNgPlusButton();updateViewportState();}
let deferredInstallPrompt=null,pwaToastTimer=0,orientationHintTimer=0,orientationHintShown=false;
function updateViewportState(){const vv=window.visualViewport;document.documentElement.style.setProperty('--app-height',`${Math.round(vv?.height||window.innerHeight)}px`);const coarse=matchMedia('(pointer:coarse)').matches,portrait=window.innerHeight>=window.innerWidth;document.body.classList.toggle('is-coarse',coarse);document.body.classList.toggle('is-portrait',portrait);const hint=$('#orientationHint'),should=state.view==='game'&&coarse&&portrait&&state.settings.orientationHint;if(hint){if(should&&!orientationHintShown){orientationHintShown=true;hint.classList.remove('hidden');clearTimeout(orientationHintTimer);orientationHintTimer=setTimeout(()=>hint.classList.add('hidden'),3200);}else if(!should)hint.classList.add('hidden');}}
function standaloneMode(){return matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;}
function updatePwaStatus(label){const el=$('#pwaStatus');if(!el)return;const offline=!navigator.onLine,installed=standaloneMode();el.textContent=label||(offline?'OFFLINE':installed?'APP':'WEB');el.classList.toggle('offline',offline);el.classList.toggle('ready',installed||el.dataset.offlineReady==='true');}
function toast(text,ms=2600){const el=$('#pwaToast');if(!el)return;clearTimeout(pwaToastTimer);el.textContent=text;el.classList.remove('hidden');pwaToastTimer=setTimeout(()=>el.classList.add('hidden'),ms);}
function updateFullscreenLabel(){const btn=$('#fullscreenBtn');if(!btn)return;const active=!!document.fullscreenElement||document.body.classList.contains('focus-mode');btn.textContent=active?'✕ EXIT':'⛶ FULL';btn.setAttribute('aria-pressed',String(active));}
async function toggleFullscreen(){try{if(document.fullscreenElement){await document.exitFullscreen();return;}if(document.body.classList.contains('focus-mode')){document.body.classList.remove('focus-mode');updateFullscreenLabel();updateViewportState();return;}const shell=$('#gameShell');if(shell?.requestFullscreen){await shell.requestFullscreen({navigationUI:'hide'});return;}}catch{}document.body.classList.toggle('focus-mode');updateFullscreenLabel();updateViewportState();if(document.body.classList.contains('focus-mode'))$('#gameShell')?.scrollIntoView({block:'center'});}
async function installApp(){if(deferredInstallPrompt){const prompt=deferredInstallPrompt;deferredInstallPrompt=null;await prompt.prompt();const choice=await prompt.userChoice;$('#installBtn')?.classList.add('hidden');toast(choice.outcome==='accepted'?'Blackthorn 404 added to your device.':'Install dismissed.');return;}if(standaloneMode()){toast('Blackthorn 404 is already running as an installed app.');return;}toast('Install from your browser menu: Add to Home Screen / Install app.',4200);}
function fmtTime(s){const m=Math.floor((s||0)/60);const sec=Math.floor((s||0)%60);return `${m}:${String(sec).padStart(2,'0')}`;}

function slotHeadline(sum){if(sum.empty)return 'EMPTY MEMORY';const end=sum.ending==='true'?'TRUE ENDING · NO ONE REMEMBERS ALONE':sum.ending==='dark'?'DARK ENDING · THE NINTH TENANT':'NORMAL ENDING · HOUSE OF WITNESSES';if(sum.phase12)return `${sum.ngPlus?`NG+${sum.ngPlusCycle} · `:''}${end}`;if(sum.ngPlus)return `NG+${sum.ngPlusCycle} · ${sum.phase9?'THE ROOM BEHIND MEMORY COMPLETE':sum.phase8?'ALL EIGHT SPINES REMEMBERED':sum.phase7?'CHAPTERS I–IV REMEMBERED':sum.phase6?'SAINT ORREN REMEMBERED':'MEMORY ACTIVE'}`;return sum.phase9?'THE ROOM BEHIND MEMORY COMPLETE':sum.phase8?'ALL EIGHT SPINES REMEMBERED':sum.phase7?'CHAPTERS I–IV REMEMBERED':sum.phase6?'SAINT ORREN REMEMBERED':sum.phase5?'SIGIL GRAMMAR CALIBRATED':sum.phase4?'COMBAT CALIBRATED':sum.phase3?'PERCEPTION CALIBRATED':sum.phase2?'MANOR INDEXED':sum.complete?'MEMORY I COMPLETE':'MEMORY ACTIVE';}
function refreshNgPlusButton(){const b=$('#newGamePlusBtn');if(!b)return;const available=[1,2,3].some(n=>{const s=getSlotSummary(n);return !s.empty&&s.phase12;});b.disabled=!available;b.title=available?'Begin another cycle from a completed slot.':'Complete any ending to unlock New Game+.';}
function renderSlots(mode='load'){const grid=$('#slotGrid');grid.innerHTML='';for(let n=1;n<=3;n++){const sum=getSlotSummary(n),card=document.createElement('button'),eligible=mode!=='ngplus'||(!sum.empty&&sum.phase12);card.className='slot-card'+(mode==='ngplus'&&!eligible?' locked':'');card.type='button';card.dataset.slot=String(n);card.disabled=!eligible;const total=(sum.playSeconds||0)+(sum.legacyPlaySeconds||0),cycle=sum.ngPlus?` · NG+ CYCLE ${sum.ngPlusCycle}`:'';card.innerHTML=sum.empty?`<span class="slot-no">SLOT ${n}</span><b>${mode==='ngplus'?'NG+ LOCKED':'EMPTY MEMORY'}</b><small>${mode==='ngplus'?'Finish an ending in this slot first.':'Begin at Blackthorn Manor · 2026'}</small>`:`<span class="slot-no">SLOT ${n}${cycle}</span><b>${slotHeadline(sum)}</b><small>${esc(sum.room.replaceAll('-',' ').toUpperCase())}<br>${fmtTime(total)} total memory${sum.endingsSeen?.length?` · ${sum.endingsSeen.length}/3 endings seen`:''}${sum.ngPlusEchoes?.length?` · ${sum.ngPlusEchoes.length}/9 refracted`:''}</small><span class="delete-slot" data-delete="${n}">DELETE LOCAL SAVE</span>`;card.addEventListener('click',e=>{if(e.target?.dataset?.delete){e.stopPropagation();if(confirm(`Delete slot ${n}? A local backup will also be removed.`)){clearSlot(n);renderSlots(mode);refreshNgPlusButton();}return;}state.slot=setActiveSlot(n);if(mode==='new'){state.save=defaultSave();state.save=saveSlot(n,state.save);launchGame(true);}else if(mode==='ngplus'){const source=loadSlot(n),next=createNewGamePlus(source);if(!next)return;state.save=saveSlot(n,next);launchGame(false);}else{state.save=loadSlot(n);launchGame(false);}});grid.append(card);}}

function openSlots(mode){renderSlots(mode);$('#slotsTitle').textContent=mode==='new'?'Choose a slot for a new memory':mode==='ngplus'?'Choose a completed memory for New Game+':'Choose a save slot';$('#slotGrid').dataset.mode=mode;showView('slots');}
function launchGame(fresh=false){if(state.engine)state.engine.stop();state.save=fresh?saveSlot(state.slot,state.save||defaultSave()):loadSlot(state.slot);showView('game');state.engine=new BlackthornEngine($('#gameCanvas'),{save:state.save,setSave:(s,reason)=>{const saved=saveSlot(state.slot,s);Object.assign(s,saved);state.save=s;},onHud:updateHud,onMessage:openMessage,onPause:openPause,onComplete:(phase)=>showComplete(phase),onSigils:openSigilCodex,onEnding:showEnding,sound:state.audio,settings:state.settings});state.engine.start();state.audio.ensure();state.audio.startAmbient();}

function updateHud(h){
  const pct=v=>`${Math.max(0,Math.min(100,v))}%`;$('#healthBar').style.width=pct(h.health);$('#perceptionBar').style.width=pct(h.perception);$('#stabilityBar').style.width=pct(h.stability);$('#staminaBar').style.width=pct(h.stamina);$('#healthText').textContent=Math.round(h.health);$('#perceptionText').textContent=Math.round(h.perception);$('#stabilityText').textContent=Math.round(h.stability);$('#staminaText').textContent=Math.round(h.stamina);$('#weaponLabel').textContent=h.weapon.name.toUpperCase();$('#sigilLabel').textContent=h.sigilLabel||sigilLabel(h.sigil,h.sigilIntensity||1);$('#roomLabel').textContent=`${h.ngPlus?`NG+${h.ngPlusCycle} · `:''}${String(h.roomName||h.room.name).toUpperCase()} · ${h.room.era}`;
  if($('#combatState')){const ammo=h.ammo;$('#combatState').textContent=h.reloading?`RELOAD ${Math.ceil(h.reloadRemaining*10)/10}s`:h.charging?`HEAVY ${Math.round(h.charge*100)}%`:ammo?`AMMO ${ammo.clip}/${ammo.reserve}`:h.combo>1?`COMBO ×${h.combo}`:'COMBAT READY';}
  const tier=Number.isFinite(h.perceptionTier)?h.perceptionTier:(h.actualPerception>75?0:h.actualPerception>50?1:h.actualPerception>25?2:h.actualPerception>10?3:4);$('#perceptionOverlay').style.opacity=String([0,.06,.14,.24,.36][tier]*(state.settings.perceptionFx??1));$('#gameShell').classList.toggle('hud-unreliable',!!h.unreliable);$('#perceptionState').textContent=h.unreliable?`PERCEPTION ${tier} · HUD UNRELIABLE`:tier?`PERCEPTION ${tier}`:'PERCEPTION STABLE';
  const boss=h.boss;if(boss){$('#bossHud').classList.remove('hidden');$('#bossName').textContent=boss.name.toUpperCase();$('#bossBar').style.width=`${Math.max(0,boss.hp/boss.maxHp*100)}%`;$('#bossPhase').textContent=`PHASE ${['I','II','III'][Math.max(0,(h.phase||1)-1)]}`;}else $('#bossHud').classList.add('hidden');
}

let messageQueue=[],messageDone=null;
function openMessage(lines,done){messageQueue=[...(lines||[])];messageDone=done||null;$('#messageDialog').showModal();advanceMessage();}
function advanceMessage(){if(messageQueue.length){$('#messageLines').innerHTML=`<p>${String(messageQueue.shift()).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')}</p>`;$('#messageNextBtn').textContent=messageQueue.length?'CONTINUE · C / ENTER':'RETURN · C / ENTER';state.audio.play('note');return;}$('#messageDialog').close();const cb=messageDone;messageDone=null;cb?.();}
function openPause(paused){if(!paused){if($('#pauseDialog').open)$('#pauseDialog').close();return;}$('#pauseWeapon').textContent=state.engine?.weapon.name||'—';$('#pauseSigil').textContent=state.engine?sigilLabel(sigilById(state.engine.save.equippedSigil),state.engine.save.sigilIntensity||1):'—';$('#pauseRoom').textContent=state.engine?.room().name||'—';$('#pauseNotes').textContent=String(state.engine?.save.lore?.length||0);if(!$('#pauseDialog').open)$('#pauseDialog').showModal();}

let archiveFilter='all',archiveSelected=null,archiveReturn='playing';
const loreKnown=()=>{if(!state.engine)return[];const ids=[...new Set([...(state.engine.save.lore||[]),...(state.engine.save.legacyLore||[])])];return ids.map(id=>LORE_CATALOG[id]).filter(Boolean);};
const esc=t=>String(t).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function renderLoreArchive(){
  const known=loreKnown(),counts={document:0,note:0,recording:0,secret:0},current=new Set(state.engine?.save.lore||[]),legacy=new Set(state.engine?.save.legacyLore||[]);for(const e of known)counts[e.type]=(counts[e.type]||0)+1;
  $('#archiveCount').textContent=state.engine?.save.ngPlus?`CURRENT ${current.size}/${LORE_TARGETS.total} · REMEMBERED ${legacy.size}/${LORE_TARGETS.total} · REFRACTED ${state.engine.save.ngPlusEchoes?.length||0}/9`:`${known.length}/${LORE_TARGETS.total} EVIDENCE · DOC ${counts.document}/${LORE_TARGETS.document} · NOTE ${counts.note}/${LORE_TARGETS.note} · REC ${counts.recording}/${LORE_TARGETS.recording} · SECRET ${counts.secret}/${LORE_TARGETS.secret}`;
  for(const b of $$('#archiveFilters button'))b.classList.toggle('selected',b.dataset.filter===archiveFilter);
  const visible=known.filter(e=>archiveFilter==='all'||e.type===archiveFilter).sort((a,b)=>String(a.era).localeCompare(String(b.era))||a.title.localeCompare(b.title));
  if(!archiveSelected||!visible.some(e=>e.id===archiveSelected))archiveSelected=visible[0]?.id||null;
  const list=$('#archiveList');list.innerHTML='';for(const e of visible){const b=document.createElement('button');b.type='button';b.className='archive-row'+(archiveSelected===e.id?' selected':'');b.innerHTML=`<span>${e.type.toUpperCase()}</span><b>${esc(e.title)}</b><small>${esc(e.era)} · ${esc(e.room)}</small>`;b.addEventListener('click',()=>{archiveSelected=e.id;renderLoreArchive();});list.append(b);}
  const e=archiveSelected?LORE_CATALOG[archiveSelected]:null,detail=$('#archiveDetail');if(!e){detail.innerHTML='<p class="archive-empty">No recovered evidence in this filter.</p>';return;}
  const linked=(LORE_LINKS[e.id]||[]).map(id=>LORE_CATALOG[id]).filter(x=>x&&known.some(k=>k.id===x.id)),isLegacy=state.engine?.save.ngPlus&&!current.has(e.id)&&legacy.has(e.id);
  detail.innerHTML=`${isLegacy?'<p class="archive-legacy">REMEMBERED FROM A PREVIOUS CYCLE · DOES NOT COUNT AS REDISCOVERED EVIDENCE</p>':''}<p class="eyebrow">${e.type.toUpperCase()} · ${esc(e.era)}</p><h2>${esc(e.title)}</h2><p class="archive-source">${esc(e.area)} · ${esc(e.room)}</p><p class="archive-thread">THREAD · ${esc(e.thread)}</p>${e.text.map(x=>`<p>${esc(x)}</p>`).join('')}<p class="archive-annotation">${esc(e.annotation)}</p>${linked.length?`<div class="archive-links"><b>KNOWN CONNECTIONS</b>${linked.map(x=>`<span>${esc(x.era)} · ${esc(x.title)}</span>`).join('')}</div>`:''}`;
}
function openLoreArchive(){if(!state.engine)return;archiveReturn=state.engine.mode==='paused'?'paused':'playing';if($('#pauseDialog').open)$('#pauseDialog').close();if(state.engine.mode==='playing'||state.engine.mode==='paused')state.engine.mode='archive';renderLoreArchive();if(!$('#archiveDialog').open)$('#archiveDialog').showModal();}
function closeLoreArchive(){if($('#archiveDialog').open)$('#archiveDialog').close();if(!state.engine)return;state.engine.mode=archiveReturn;if(archiveReturn==='paused')openPause(true);else state.engine.hud();}



let recordsTab='achievements',recordsReturn='title';
function recordsSave(){return state.engine?.save||loadSlot(state.slot);}
function discoveredBestiary(save){const found=new Set();for(const rid of save.rooms||[]){for(const e of ROOMS[rid]?.enemies||[])found.add(e.type);}for(const id of save.bosses||[])found.add(id);return found;}
function renderRecords(){const save=recordsSave(),list=$('#recordsList');list.innerHTML='';for(const b of $$('#recordsTabs button'))b.classList.toggle('selected',b.dataset.recordTab===recordsTab);if(recordsTab==='achievements'){const unlocked=new Set(save.achievements||[]),visibleUnlocked=SLICE_ACHIEVEMENTS.filter(a=>unlocked.has(a.id)).length;$('#recordsCount').textContent=`${visibleUnlocked}/${SLICE_ACHIEVEMENTS.length} ACHIEVEMENTS`;for(const a of SLICE_ACHIEVEMENTS){const row=document.createElement('article');const yes=unlocked.has(a.id);row.className='record-row '+(yes?'unlocked':'locked');row.innerHTML=`<span>${yes?'RECOVERED':'LOCKED'}</span><div><b>${yes?esc(a.name):'????????'}</b><p>${yes?esc(a.desc):'Continue exploring Blackthorn and its Memory Echoes.'}</p></div>`;list.append(row);}}else{const found=discoveredBestiary(save),ids=Object.keys(ENEMY_TYPES);$('#recordsCount').textContent=`${found.size}/${ids.length} BESTIARY ENTRIES`;for(const id of ids){const e=ENEMY_TYPES[id],yes=found.has(id),row=document.createElement('article');row.className='record-row '+(yes?'unlocked':'locked');row.innerHTML=`<span>${yes?bestiaryRank(id):'UNKNOWN'}</span><div><b>${yes?esc(e.name):'????????'}</b><p>${yes?`${esc(e.family)} · ${esc(e.behavior.toUpperCase())} · HP ${e.hp} · PRESSURE ${e.perception}`:'Encounter this presence to stabilise its record.'}</p></div>`;list.append(row);}}}
function openRecords(){recordsReturn=state.engine?(state.engine.mode==='paused'?'paused':'playing'):'title';if($('#pauseDialog').open)$('#pauseDialog').close();if(state.engine&&(state.engine.mode==='playing'||state.engine.mode==='paused'))state.engine.mode='records';renderRecords();if(!$('#recordsDialog').open)$('#recordsDialog').showModal();}
function closeRecords(){if($('#recordsDialog').open)$('#recordsDialog').close();if(!state.engine)return;if(recordsReturn==='paused'){state.engine.mode='paused';openPause(true);}else{state.engine.mode='playing';state.engine.hud();}}

let endingPages=[],endingPage=0,endingResult=null;
function renderEndingPage(){
  const profile=endingResult?.profile;if(!profile)return;const page=endingPages[endingPage]||[];
  $('#endingDialog').style.setProperty('--ending-accent',profile.accent||'#9f796b');
  $('#endingKicker').textContent=profile.subtitle;$('#endingTitle').textContent=profile.title;
  $('#endingPage').innerHTML=page.map((x,i)=>i===0?`<h3>${esc(x)}</h3>`:`<p>${esc(x)}</p>`).join('');
  $('#endingProgress').textContent=`MEMORY ${endingPage+1} / ${endingPages.length}`;
  $('#endingNextBtn').textContent=endingPage<endingPages.length-1?'CONTINUE':'RETURN TO TITLE';
  const st=endingResult,requirements=$('#endingRequirements');
  if(endingPage===endingPages.length-1){requirements.classList.remove('hidden');requirements.innerHTML=st.id==='true'?`<b>TRUE ENDING CONDITIONS HELD</b><span>${st.secretCount}/15 counter-memories · ${st.keyEvidence}/${st.keyEvidenceTarget} key evidence · 12 Sigils at Intensity III · all three preserving choices</span>`:st.id==='dark'?`<b>THE HOUSE COUNTED ${st.darkSignals}/3 ERASURE SIGNALS</b><span>The ending followed decisions already carried into the final room. No ending was selected here.</span>`:`<b>BLACKTHORN REMAINS AN ARCHIVE</b><span>${st.secretCount}/15 counter-memories · ${st.keyEvidence}/${st.keyEvidenceTarget} key evidence. Another history remains possible in another save.</span>`;}else requirements.classList.add('hidden');
}
function showEnding(result){endingResult=result;endingPages=[...(result.profile?.pages||[])];endingPage=0;if($('#completeDialog').open)$('#completeDialog').close();if($('#pauseDialog').open)$('#pauseDialog').close();renderEndingPage();if(!$('#endingDialog').open)$('#endingDialog').showModal();}
function advanceEnding(){if(!endingResult)return;if(endingPage<endingPages.length-1){endingPage++;state.audio.play('note');renderEndingPage();return;}if($('#endingDialog').open)$('#endingDialog').close();if(state.engine){state.engine.persist('ending-title');state.engine.stop();state.engine=null;}state.audio.stopAmbient();endingResult=null;endingPages=[];endingPage=0;showView('title');}


function showComplete(phase){
  const phase9=phase==='phase9',phase8=phase==='phase8',phase7=phase==='phase7',phase6=phase==='phase6',phase5=phase==='phase5',phase4=phase==='phase4',phase3=phase==='phase3',phase2=phase==='phase2';
  $('#completeKicker').textContent=phase9?'ROOT MEMORY STABILIZED':phase8?'EIGHT MEMORIES RECOVERED':phase7?'FOUR MEMORIES RECOVERED':phase6?'MEMORY I RECOVERED':phase5?'SIGIL GRAMMAR RECOVERED':phase4?'WEAPON IMPRINT STABLE':phase3?'MIRROR CALIBRATED':phase2?'MANOR INDEXED':'MEMORY THREAD STABILIZED';
  $('#completeTitle').textContent=phase9?'The Unremembered has been made local.':phase8?'All eight Memory Spines are awake.':phase7?'The house now remembers four centuries.':phase6?'Saint Orren remembers twenty-one names.':phase5?'The house now has a grammar.':phase4?'Elena can read the instant before impact.':phase3?'The mirror can no longer pretend to be neutral.':phase2?'Blackthorn is an index.':'The house remembers Ysabel.';
  $('#completeText').textContent=phase9?'Elena crossed the Root Door, reconstructed the three final relations, used all three Sigil schools under altered Perception and defeated The Unremembered without collapsing the eight recovered lives into one official story. Her carried choices remain unresolved.':phase8?'Eleanor Blackthorn, Elias Ward, Naomi Pike and Theo Voss are fully recovered. All eight historical Memory Spines now converge on the Root Door.':phase7?'Nara Kesh, Marcus Aelian and Lucia Varetti are fully recovered. Their contradictions now coexist inside Blackthorn without being forced into one account.':phase6?'Ysabel Thorne’s memory holds together at last. Twenty-one names survive the Bell, the plague ward and the route beneath Saint Orren.':phase5?'Twelve formulas now share one grammar: Verb + School + Intensity. FLESH, MIND and VOID can press against body, attention and boundary without becoming interchangeable.':phase4?'Distance, commitment, recoil and the instant before impact have become readable memories. Blackthorn can now reconstruct violence without turning Elena into a soldier.':phase3?'Four levels of altered perception can now be recognised for what they are: pressure on attention, architecture and interpretation — never changes to the world outside the game.':phase2?'The estate plan, internal routes, safe room, family archive and Memory Vault now form a coherent map of the impossible house.':'The first Memory Echo is stable. Blackthorn Manor has opened new routes in response.';
  $('#completeCloseBtn').textContent=phase9?'RETURN TO ROOT DOOR':phase8?'RETURN TO ROOT DOOR':phase7?'RETURN TO MEMORY VAULT':phase6?'RETURN TO BLACKTHORN MANOR':phase5||phase4?'RETURN TO MEMORY VAULT':phase3?'RETURN TO MIRROR ROOM':phase2?'RETURN TO MEMORY VAULT':'EXPLORE THE MANOR';
  if(!$('#completeDialog').open)$('#completeDialog').showModal();
}

function renderSigilCodex(){
  const e=state.engine;if(!e)return;const grid=$('#sigilGrid');grid.innerHTML='';for(const school of ['FLESH','MIND','VOID']){const section=document.createElement('section');section.className=`sigil-school ${school.toLowerCase()}`;section.innerHTML=`<h3>${school}</h3>`;for(const s of SIGILS.filter(x=>x.school===school&&e.save.sigils.includes(x.id))){const b=document.createElement('button');b.type='button';b.className='sigil-card'+(e.save.equippedSigil===s.id?' selected':'');b.dataset.sigilId=s.id;b.innerHTML=`<b>${s.verb}</b><span>${s.school}</span><small>${s.desc}</small>`;b.addEventListener('click',()=>{e.equipSigil(s.id);renderSigilCodex();});section.append(b);}grid.append(section);}
  const intensity=e.save.sigilIntensity||1,max=e.save.sigilMaxIntensity||1,selected=sigilById(e.save.equippedSigil),stats=sigilStats(selected,intensity);$('#sigilSelected').textContent=sigilLabel(selected,intensity);$('#sigilMeta').textContent=`${selected.school} · STABILITY ${stats.cost} · COOLDOWN ${stats.cooldown.toFixed(1)}s`;for(const b of $$('#sigilIntensity button')){const n=Number(b.dataset.intensity);b.disabled=n>max;b.classList.toggle('selected',n===intensity);}
}
function openSigilCodex(){const e=state.engine;if(!e||e.mode!=='playing')return;e.mode='sigils';renderSigilCodex();if(!$('#sigilDialog').open)$('#sigilDialog').showModal();}
function closeSigilCodex(){if($('#sigilDialog').open)$('#sigilDialog').close();if(state.engine?.mode==='sigils'){state.engine.mode='playing';state.engine.hud();}}

function leaveGame(){if(state.engine){state.engine.persist('leave');state.engine.stop();state.engine=null;}state.audio.stopAmbient();showView('title');}
function openSettings(){const s=state.settings;$('#musicVolume').value=Math.round((s.musicVolume??.35)*100);$('#fxVolume').value=Math.round((s.fxVolume??.65)*100);$('#perceptionFx').value=String(s.perceptionFx??1);$('#truthfulHud').checked=!!s.truthfulHud;$('#reduceMotion').checked=!!s.reduceMotion;$('#disableShake').checked=!!s.disableShake;$('#highContrast').checked=!!s.highContrast;$('#textSize').value=String(s.textSize??1);$('#touchMode').value=s.touchMode||'always';$('#touchSize').value=s.touchSize||'standard';$('#leftHanded').checked=!!s.leftHanded;$('#performanceMode').value=s.performanceMode||'auto';$('#orientationHintSetting').checked=s.orientationHint!==false;$('#mute').checked=!!s.mute;if(!$('#settingsDialog').open)$('#settingsDialog').showModal();}
function bindSettings(){const bind=(id,key,fn=v=>v)=>{$(id).addEventListener('change',e=>{state.settings[key]=fn(e.target.type==='checkbox'?e.target.checked:e.target.value);persistSettings();});};bind('#musicVolume','musicVolume',v=>Number(v)/100);bind('#fxVolume','fxVolume',v=>Number(v)/100);bind('#perceptionFx','perceptionFx',Number);bind('#truthfulHud','truthfulHud',Boolean);bind('#reduceMotion','reduceMotion',Boolean);bind('#disableShake','disableShake',Boolean);bind('#highContrast','highContrast',Boolean);bind('#textSize','textSize',Number);bind('#touchMode','touchMode',String);bind('#touchSize','touchSize',String);bind('#leftHanded','leftHanded',Boolean);bind('#performanceMode','performanceMode',String);bind('#orientationHintSetting','orientationHint',Boolean);bind('#mute','mute',Boolean);}

function bind(){
  $('#endingDialog').addEventListener('cancel',e=>e.preventDefault());$('#endingNextBtn').addEventListener('click',advanceEnding);
  $('#recordsCloseBtn').addEventListener('click',closeRecords);for(const b of $$('#recordsTabs button'))b.addEventListener('click',()=>{recordsTab=b.dataset.recordTab||'achievements';renderRecords();});$('#recordsBtn').addEventListener('click',openRecords);$('#pauseRecordsBtn').addEventListener('click',openRecords);$('#creditsBtn').addEventListener('click',()=>$('#creditsDialog').showModal());$('#archiveCloseBtn').addEventListener('click',closeLoreArchive);$('#pauseArchiveBtn').addEventListener('click',openLoreArchive);for(const b of $$('#archiveFilters button'))b.addEventListener('click',()=>{archiveFilter=b.dataset.filter||'all';archiveSelected=null;renderLoreArchive();});
  $('#sigilCloseBtn').addEventListener('click',closeSigilCodex);for(const b of $$('#sigilIntensity button'))b.addEventListener('click',()=>{if(!state.engine)return;state.engine.save.sigilIntensity=Math.max(1,Math.min(state.engine.save.sigilMaxIntensity||1,Number(b.dataset.intensity)||1));state.engine.persist('sigil-intensity');renderSigilCodex();});
  $('#homeBtn').addEventListener('click',leaveGame);$('#newGameBtn').addEventListener('click',()=>openSlots('new'));$('#newGamePlusBtn').addEventListener('click',()=>openSlots('ngplus'));$('#continueBtn').addEventListener('click',()=>openSlots('load'));$('#slotsBackBtn').addEventListener('click',()=>showView('title'));$('#leaveBtn').addEventListener('click',leaveGame);$('#helpBtn').addEventListener('click',()=>$('#helpDialog').showModal());$('#settingsBtn').addEventListener('click',openSettings);$('#pauseSettingsBtn').addEventListener('click',()=>{if($('#pauseDialog').open)$('#pauseDialog').close();openSettings();});$('#resumeBtn').addEventListener('click',()=>state.engine?.togglePause());$('#messageNextBtn').addEventListener('click',advanceMessage);$('#completeCloseBtn').addEventListener('click',()=>$('#completeDialog').close());
  $('#fullscreenBtn').addEventListener('click',toggleFullscreen);$('#installBtn').addEventListener('click',installApp);
  bindSettings();
  window.addEventListener('keydown',e=>{if($('#endingDialog').open){e.preventDefault();if(e.code==='Enter'||e.code==='KeyC'||e.code==='Space')advanceEnding();return;}if($('#recordsDialog').open&&(e.code==='Escape'||e.code==='KeyK')){e.preventDefault();closeRecords();return;}if(state.view==='game'&&state.engine&&e.code==='KeyK'&&!$('#messageDialog').open&&!$('#sigilDialog').open&&!$('#archiveDialog').open){e.preventDefault();openRecords();return;}if($('#archiveDialog').open&&(e.code==='Escape'||e.code==='KeyJ')){e.preventDefault();closeLoreArchive();return;}if(state.view==='game'&&state.engine&&e.code==='KeyJ'&&!$('#messageDialog').open&&!$('#sigilDialog').open){e.preventDefault();openLoreArchive();return;}if($('#sigilDialog').open&&(e.code==='Escape'||e.code==='KeyF')){e.preventDefault();closeSigilCodex();return;}if($('#messageDialog').open&&(e.code==='Enter'||e.code==='KeyC'||e.code==='Space')){e.preventDefault();advanceMessage();return;}if($('#pauseDialog').open&&e.code==='Escape'){e.preventDefault();state.engine?.togglePause();return;}if(state.view!=='game'||!state.engine)return;const used=state.engine.setKey(e.code,true);if(used||['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();});
  window.addEventListener('keyup',e=>{state.engine?.setKey(e.code,false);state.engine?.releaseKey(e.code);});
  for(const btn of $$('[data-control]')){const name=btn.dataset.control;const down=e=>{e.preventDefault();state.audio.ensure();try{btn.setPointerCapture(e.pointerId);}catch{}state.engine?.setControl(name,true);};const up=e=>{e.preventDefault();state.engine?.setControl(name,false);};btn.addEventListener('pointerdown',down);btn.addEventListener('pointerup',up);btn.addEventListener('pointercancel',up);btn.addEventListener('contextmenu',e=>e.preventDefault());}
  window.addEventListener('resize',updateViewportState,{passive:true});window.visualViewport?.addEventListener('resize',updateViewportState,{passive:true});window.addEventListener('orientationchange',()=>setTimeout(updateViewportState,80),{passive:true});document.addEventListener('fullscreenchange',()=>{document.body.classList.remove('focus-mode');updateFullscreenLabel();updateViewportState();});window.addEventListener('online',()=>{updatePwaStatus();toast('Connection restored.');});window.addEventListener('offline',()=>{updatePwaStatus();toast('Offline mode. Cached game files remain available.');});window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstallPrompt=e;$('#installBtn').classList.remove('hidden');updatePwaStatus('INSTALLABLE');});window.addEventListener('appinstalled',()=>{deferredInstallPrompt=null;$('#installBtn').classList.add('hidden');updatePwaStatus('APP');toast('Blackthorn 404 installed.');});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&state.engine?.mode==='playing')state.engine.togglePause();});
}

async function registerSW(){updatePwaStatus();if(location.protocol==='file:'||!('serviceWorker'in navigator))return;try{const reg=await navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'});const ready=await navigator.serviceWorker.ready;const status=$('#pwaStatus');if(status){status.dataset.offlineReady='true';updatePwaStatus(navigator.onLine?(standaloneMode()?'APP · OFFLINE READY':'OFFLINE READY'):'OFFLINE');}if(reg.waiting)toast('A newer Blackthorn shell is ready. Reload to update.',4200);reg.addEventListener('updatefound',()=>{const worker=reg.installing;if(!worker)return;worker.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller)toast('Update cached. Reload when convenient.',4200);});});await reg.update();return ready;}catch(err){console.warn('Service Worker unavailable',err);updatePwaStatus('WEB');}}

applySettings();bind();refreshNgPlusButton();updateFullscreenLabel();updatePwaStatus();registerSW();
