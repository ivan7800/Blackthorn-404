#!/usr/bin/env python3
from pathlib import Path
import json, subprocess, sys
ROOT=Path(__file__).resolve().parents[1]
node=r'''
import {VERSION,SAVE_SCHEMA,BALANCE,WEAPONS,SIGILS,ENEMY_TYPES,ROOMS} from './js/data.js';
console.log(JSON.stringify({VERSION,SAVE_SCHEMA,BALANCE,WEAPONS,SIGILS,ENEMY_TYPES,rooms:Object.values(ROOMS)}));
'''
r=subprocess.run(['node','--input-type=module','-e',node],cwd=ROOT,capture_output=True,text=True)
if r.returncode:
    print(r.stderr);sys.exit(1)
d=json.loads(r.stdout);checks=[]
def check(name,cond,detail=''):
    checks.append((name,bool(cond),detail));print(('PASS' if cond else 'FAIL'),name,detail)

def enemies_for(era):
    rs=[x for x in d['rooms'] if x.get('era')==era and x.get('tone')!='manor']
    es=[e for x in rs for e in x.get('enemies',[])]
    return rs,es
check('version_1_1_visual',d['VERSION']=='1.1.1')
check('save_schema_stays_12',d['SAVE_SCHEMA']==12)
check('room_target_90_110',90<=len(d['rooms'])<=110,f"rooms={len(d['rooms'])}")
check('weapon_count_12',len(d['WEAPONS'])==12)
check('sigil_count_12',len(d['SIGILS'])==12)
check('boss_count_9',sum(1 for x in d['rooms'] if x.get('boss'))==9)
safe=[x for x in d['rooms'] if x.get('safe') and x.get('tone')!='manor']
check('safe_rooms_enemy_free',all(not x.get('enemies') for x in safe),f"safe={len(safe)}")
order=['1349','1198 BCE','395 CE','1587','1790','1917','1956','1987']
expected=[11,11,11,11,10,10,10,10]
counts=[]
for era in order:
    rs,es=enemies_for(era);counts.append(len(es))
    check(f'{era}_has_checkpoint',sum(1 for x in rs if x.get('safe'))==1)
check('historical_density_curve',counts==expected,f"counts={counts}")
# Weapon burst identity without a runaway melee outlier.
melee=[w for w in d['WEAPONS'] if w.get('type')=='melee']
qdps={w['id']:w['damage']/w['cooldown'] for w in melee}
check('melee_quick_dps_band',all(18<=v<=24.5 for v in qdps.values()),str({k:round(v,1) for k,v in qdps.items()}))
heff={w['id']:(w['heavy']*1.22)/w['stamina'] for w in melee}
check('melee_heavy_efficiency_band',all(.78<=v<=1.06 for v in heff.values()))
check('sabre_no_longer_dps_outlier',qdps['duelling-sabre']<24)
check('heavy_torch_viable',20<=qdps['heavy-torch']<=22)
rev=next(w for w in d['WEAPONS'] if w['id']=='service-revolver'); flare=next(w for w in d['WEAPONS'] if w['id']=='flare-pistol')
check('revolver_ammo_budget',rev['clip']+rev['reserveStart']==24)
check('flare_ammo_budget',flare['clip']+flare['reserveStart']==6)
check('sigil_iii_cost_band',all(20<=s['cost'][2]<=38 for s in d['SIGILS']))
check('sigil_iii_cooldown_band',all(6.5<=s['cooldown'][2]<=10 for s in d['SIGILS']))
# Fastest attack recovers only after the attack cadence, so passive regen cannot fully erase spam cost.
fast=min(w['cooldown'] for w in melee)
check('stamina_recovery_delay_beats_fastest_attack',d['BALANCE']['stamina']['quickDelay']>fast,f"delay={d['BALANCE']['stamina']['quickDelay']} fastest={fast}")
check('idle_stamina_regen_reasonable',14<=d['BALANCE']['stamina']['idleRegen']<=18)
check('guard_regen_lower_than_idle',d['BALANCE']['stamina']['guardRegen']<d['BALANCE']['stamina']['idleRegen'])
check('perception_pressure_smoothed',d['BALANCE']['perception']['enemyPressureScale']<=.04 and d['BALANCE']['perception']['corruptDrain']<=1.15)
# Boss HP should rise across campaign order.
boss_ids=['bell-boss','salt-astronomer','last-enumerator','anatomist-shadow','first-tenant','company-without-faces','dead-frequency','man-missing-frame','the-unremembered']
hps=[d['ENEMY_TYPES'][x]['hp'] for x in boss_ids]
check('boss_hp_curve_non_decreasing',hps==sorted(hps),f"hp={hps}")
check('boss_focus_window_heavy_friendly',6<=d['BALANCE']['boss']['focusWindow']<=7)
ng=d['BALANCE']['ngPlus']
check('ngplus_caps_moderate',ng['hpCap']<=1.15 and ng['damageCap']<=1.12 and ng['speedCap']<=1.05)
failed=[x for x in checks if not x[1]]
if failed:
    print(f'BALANCE_CHECK_FAIL {len(failed)}/{len(checks)}');sys.exit(1)
print(f'BALANCE_CHECK_PASS {len(checks)}/{len(checks)}')
