#!/usr/bin/env python3
from pathlib import Path
from playwright.sync_api import sync_playwright
import re
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'index.html').read_text(encoding='utf-8')
html=re.sub(r'<script src="js/bundle.js\?v=[^"]+" defer></script>','',html)
html=re.sub(r'<link rel="stylesheet"[^>]+>','',html)
html=re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]+>','',html)
css=(ROOT/'css/app.css').read_text(encoding='utf-8'); js=(ROOT/'js/bundle.js').read_text(encoding='utf-8')
results=[];errors=[]
def ok(n): results.append((n,'PASS'));print('PASS',n,flush=True)
def boot(page):
    page.goto('about:blank');page.on('console',lambda m:errors.append(('console',m.type,m.text)) if m.type=='error' else None);page.on('pageerror',lambda e:errors.append(('pageerror','error',str(e))))
    page.set_content(html,wait_until='domcontentloaded');page.add_style_tag(content=css);page.add_script_tag(content=js);page.wait_for_timeout(90)
def close_message(page,max_clicks=30):
    for _ in range(max_clicks):
        if not page.locator('#messageDialog').evaluate('(e)=>e.open'): return
        page.locator('#messageNextBtn').click();page.wait_for_timeout(8)
    assert not page.locator('#messageDialog').evaluate('(e)=>e.open')
def load_room(page,rid):
    page.evaluate("rid=>__BT404__.engine.loadRoom(rid,false)",rid);page.wait_for_timeout(20);close_message(page)
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1000})
    page.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    boot(page)
    assert page.evaluate("VERSION==='1.1.1' && SAVE_SCHEMA===12");ok('phase15_boot_version_schema12')
    assert page.evaluate("BALANCE.stamina.quickDelay===.32 && BALANCE.boss.focusWindow===6.25");ok('central_balance_profile_loaded')
    assert page.evaluate("Object.keys(ROOMS).length===108");ok('room_count_preserved_108')
    assert page.evaluate("Object.values(ROOMS).filter(r=>r.boss).length===9");ok('boss_count_preserved_9')
    assert page.evaluate("Object.values(ROOMS).filter(r=>r.safe&&r.tone!=='manor').every(r=>(r.enemies||[]).length===0)");ok('all_memory_safe_rooms_enemy_free')
    counts=page.evaluate("""()=>['1349','1198 BCE','395 CE','1587','1790','1917','1956','1987'].map(era=>Object.values(ROOMS).filter(r=>r.era===era&&r.tone!=='manor').flatMap(r=>r.enemies||[]).length)""")
    assert counts==[11,11,11,11,10,10,10,10],counts;ok('historical_encounter_density_curve')
    assert page.evaluate("WEAPONS.length===12 && SIGILS.length===12");ok('arsenal_and_sigils_counts_preserved')
    assert page.evaluate("(()=>{const w=WEAPONS.find(x=>x.id==='duelling-sabre');return w.cooldown===.30&&w.quickStamina===6})()");ok('sabre_normalized')
    assert page.evaluate("(()=>{const w=WEAPONS.find(x=>x.id==='heavy-torch');return w.damage===7&&w.heavy===14&&w.poise===9})()");ok('heavy_torch_corrected')
    assert page.evaluate("(()=>{const w=WEAPONS.find(x=>x.id==='service-revolver');return w.clip+w.reserveStart===24})()");ok('revolver_ammo_budget')
    assert page.evaluate("(()=>{const w=WEAPONS.find(x=>x.id==='flare-pistol');return w.clip+w.reserveStart===6})()");ok('flare_ammo_budget')
    assert page.evaluate("SIGILS.every(s=>s.cost[2]>=20&&s.cost[2]<=38&&s.cooldown[2]>=6.5&&s.cooldown[2]<=10)");ok('sigil_economy_bounds')
    page.locator('#newGameBtn').click();page.locator('.slot-card').first.click();page.wait_for_timeout(60);close_message(page)
    assert page.evaluate('__BT404__.engine!==null');ok('phase15_game_boots_for_runtime_balance')
    # Continuous dagger pressure must now spend stamina instead of being erased by passive regen.
    load_room(page,'combat-imprint-arena')
    st=page.evaluate("()=>{const e=__BT404__.engine;e.mode='playing';e.enemies.forEach(x=>x.dead=true);e.save.weapon='ritual-dagger';e.save.stamina=100;e.attackCd=0;e.staminaRegenDelay=0;for(let i=0;i<20;i++){e.quickAttack();e.update(.20)}return e.save.stamina}")
    assert st<=45,st;ok('fast_weapon_spam_now_fatigues')
    # Idle recovery remains quick once the post-action delay expires.
    recovered=page.evaluate("()=>{const e=__BT404__.engine;e.enemies.forEach(x=>x.dead=true);e.save.stamina=40;e.staminaRegenDelay=0;e.guard=false;e.charging=false;for(let i=0;i<60;i++)e.update(.034);return e.save.stamina}")
    assert recovered>70,recovered;ok('idle_stamina_recovery_remains_generous')
    # Dodge and block both create a deliberate recovery pause.
    d=page.evaluate("()=>{const e=__BT404__.engine;e.mode='playing';e.save.stamina=100;e.staminaRegenDelay=0;e.dodgeTimer=0;e.dodge();return {st:e.save.stamina,delay:e.staminaRegenDelay}}")
    assert d['st']==80 and d['delay']>=.6,d;ok('dodge_cost_and_recovery_delay')
    b=page.evaluate("()=>{const e=__BT404__.engine;e.mode='playing';e.player.hp=100;e.invuln=0;e.guard=true;e.parryTimer=0;e.save.stamina=100;e.staminaRegenDelay=0;e.hitPlayer(10,{hp:999,bound:0});return {st:e.save.stamina,delay:e.staminaRegenDelay}}")
    assert b['st']==89 and b['delay']>=.4,b;ok('blocked_hit_cost_and_recovery_delay')
    # Perception pacing: corruption still matters but no longer avalanches immediately.
    vals=page.evaluate("()=>{const p=new PerceptionSystem(),s={stability:100,perception:100};for(let i=0;i<300;i++)p.update(.034,s,{corrupt:true});return s}")
    assert 92<vals['perception']<100 and 90<vals['stability']<100,vals;ok('corruption_pressure_smoothed_but_active')
    vals=page.evaluate("()=>{const p=new PerceptionSystem(),s={stability:60,perception:60};for(let i=0;i<150;i++)p.update(.034,s,{safe:true});return s}")
    assert vals['stability']>=99 and vals['perception']>=79,vals;ok('safe_room_recovery_curve')
    # Boss Phase III focus windows are long enough for slow charged weapons.
    load_room(page,'echo-salt-sanctum');page.evaluate("()=>{const e=__BT404__.engine;e.bossPhase=3;e.bossVulnerable=0;e.player.x=145;e.player.y=38;e.interact()}");page.wait_for_timeout(10)
    assert page.evaluate('__BT404__.engine.bossVulnerable')>6;ok('historical_boss_focus_window')
    load_room(page,'echo-bell-chamber');page.evaluate("()=>{const e=__BT404__.engine;e.bossPhase=3;e.bossVulnerable=0;e.player.x=142;e.player.y=43;e.interact()}");page.wait_for_timeout(10)
    assert page.evaluate('__BT404__.engine.bossVulnerable')>5.5;ok('bell_boss_focus_window')
    # NG+ scaling is visible on cycle 1 and capped on deep cycles.
    page.evaluate("()=>{const e=__BT404__.engine;e.save.ngPlus=true;e.save.ngPlusCycle=1;e.loadRoom('echo-priory-gate',true)}")
    ng1=page.evaluate("()=>{const e=__BT404__.engine.enemies[0],d=ENEMY_TYPES[e.type];return {hp:e.hp,baseHp:d.hp,damage:e.damage,baseDamage:d.damage,speed:e.speed,baseSpeed:d.speed}}")
    assert ng1['hp']>ng1['baseHp'] and ng1['damage']>ng1['baseDamage'] and ng1['speed']>ng1['baseSpeed'];ok('ngplus_cycle1_scaling_active')
    page.evaluate("()=>{const e=__BT404__.engine;e.save.ngPlus=true;e.save.ngPlusCycle=99;e.loadRoom('echo-priory-gate',true)}")
    cap=page.evaluate("()=>{const e=__BT404__.engine.enemies[0],d=ENEMY_TYPES[e.type];return {hp:e.hp/d.hp,damage:e.damage/d.damage,speed:e.speed/d.speed}}")
    assert cap['hp']<=1.151 and cap['damage']<=1.121 and cap['speed']<=1.051,cap;ok('ngplus_scaling_caps_enforced')
    # Existing ending logic remains unchanged by balancing.
    true_eval=page.evaluate("""()=>{const s=defaultSave();s.phase9Complete=true;s.finalChoices={witness:'preserve',name:'keep',burden:'release'};s.lore=Object.keys(LORE_CATALOG);s.sigils=SIGILS.map(x=>x.id);s.sigilMaxIntensity=3;s.flags=['final-boss-mind','final-boss-flesh','final-boss-void'];return evaluateEnding(s).id}""")
    assert true_eval=='true';ok('true_ending_requirements_unchanged')
    assert not errors,errors;ok('phase15_desktop_zero_console_page_errors')
    load_room(page,'echo-1956-control');page.evaluate("()=>{__BT404__.engine.mode='playing'}");page.screenshot(path=str(ROOT/'QA_PHASE15_DESKTOP.png'),full_page=True);ok('phase15_desktop_capture')
    # Mobile smoke check on a denser late encounter.
    context=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=3)
    mobile=context.new_page();mob_errors=[]
    mobile.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    mobile.goto('about:blank');mobile.on('console',lambda m:mob_errors.append(('console',m.type,m.text)) if m.type=='error' else None);mobile.on('pageerror',lambda e:mob_errors.append(('pageerror','error',str(e))))
    mobile.set_content(html,wait_until='domcontentloaded');mobile.add_style_tag(content=css);mobile.add_script_tag(content=js);mobile.wait_for_timeout(80);mobile.locator('#newGameBtn').click();mobile.locator('.slot-card').first.click();mobile.wait_for_timeout(50);
    for _ in range(20):
        if not mobile.locator('#messageDialog').evaluate('(e)=>e.open'): break
        mobile.locator('#messageNextBtn').click();mobile.wait_for_timeout(5)
    mobile.evaluate("__BT404__.engine.loadRoom('echo-1956-control',true)");mobile.wait_for_timeout(40);close_message(mobile);mobile.evaluate("()=>{__BT404__.engine.mode='playing'}")
    assert mobile.evaluate("__BT404__.engine.enemies.length===2");ok('late_mixed_encounter_mobile')
    assert mobile.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1');ok('phase15_mobile_no_horizontal_overflow')
    assert not mob_errors,mob_errors;ok('phase15_mobile_zero_console_page_errors')
    mobile.screenshot(path=str(ROOT/'QA_PHASE15_MOBILE.png'),full_page=True);ok('phase15_mobile_capture')
    context.close();browser.close()
print('PHASE15_E2E_PASS')
for n,st in results:print(f'{st:4} {n}')
