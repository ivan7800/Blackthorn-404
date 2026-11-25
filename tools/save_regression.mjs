import assert from 'node:assert/strict';
import {defaultSave,normalizeSave} from '../js/save.js';
import {ROOMS,ENEMY_TYPES} from '../js/data.js';

const old=normalizeSave({...defaultSave(),houseStage:9,phase9Complete:true,
  bosses:['bell-without-tongue','bell-boss','the-unremembered','unknown']});
assert.equal(old.houseStage,9,'the final house stage survives reload');
assert.deepEqual(old.bosses,['bell-boss','the-unremembered'],
  'old bell IDs migrate and invalid bestiary IDs are discarded');

const complete=normalizeSave({...defaultSave(),rooms:Object.keys(ROOMS),
  bosses:['bell-without-tongue',...Object.keys(ENEMY_TYPES).filter(id=>ENEMY_TYPES[id].family==='Boss')]});
const discovered=new Set(complete.bosses);
for(const id of complete.rooms)for(const enemy of ROOMS[id].enemies||[])discovered.add(enemy.type);
assert.equal(discovered.size,Object.keys(ENEMY_TYPES).length,
  'a completed campaign cannot display more bestiary entries than the catalog');
console.log('SAVE_REGRESSION_PASS');
