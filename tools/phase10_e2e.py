#!/usr/bin/env python3
from pathlib import Path
from playwright.sync_api import sync_playwright
import re
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'index.html').read_text(encoding='utf-8')
html=re.sub(r'<script src="js/bundle.js\?v=[^"]+" defer></script>','',html)
html=re.sub(r'<link rel="stylesheet"[^>]+>','',html)
html=re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]+>','',html)
css=(ROOT/'css/app.css').read_text(encoding='utf-8');js=(ROOT/'js/bundle.js').read_text(encoding='utf-8')
errors=[];results=[]
def ok(n): results.append((n,'PASS')); print('PASS',n,flush=True)
def close_message(page,max_clicks=100):
    for _ in range(max_clicks):
        if not page.locator('#messageDialog').evaluate('(e)=>e.open'): return
        page.locator('#messageNextBtn').click();page.wait_for_timeout(3)
    assert not page.locator('#messageDialog').evaluate('(e)=>e.open')
def load_room(page,r):
    page.evaluate('r=>__BT404__.engine.loadRoom(r,false)',r);page.wait_for_timeout(10);close_message(page)
def trigger_pattern(page,room,expected):
    load_room(page,room)
    kinds=page.evaluate("""expected=>{const e=__BT404__.engine,b=e.enemies.find(x=>x.boss);e.projectiles=[];e.bossAttackTimer=0;e.updateBoss(b,.016);return [...new Set(e.projectiles.map(p=>p.kind))] }""",expected)
    assert expected in kinds,(room,expected,kinds)
    ok('pattern_'+expected.replace('-','_'))
def phase3_focus(page,room):
    load_room(page,room)
    page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies.find(x=>x.boss);b.hp=b.maxHp*.2;e.updateBoss(b,.016)}");page.wait_for_timeout(5);close_message(page)
    assert page.evaluate("__BT404__.engine.bossPhase===3 && __BT404__.engine.bossCanBeHit(__BT404__.engine.enemies.find(x=>x.boss))===false")
    info=page.evaluate("""()=>{const e=__BT404__.engine,r=e.room(),it=(r.interact||[]).find(i=>i.kind==='boss-focus'||i.kind==='bell');return {x:it.x,y:it.y}}""")
    page.evaluate("([x,y])=>{const e=__BT404__.engine;e.player.x=x;e.player.y=y;e.mode='playing';e.interact()}",[info['x'],info['y']]);page.wait_for_timeout(6);close_message(page)
    assert page.evaluate("__BT404__.engine.bossCanBeHit(__BT404__.engine.enemies.find(x=>x.boss)) && __BT404__.engine.bossVulnerable>4")
    ok('phase3_focus_'+room.replace('echo-','').replace('-','_'))

boss_rooms=[
 ('echo-bell-chamber','bell-ring'),
 ('echo-salt-sanctum','salt-star'),
 ('echo-enumerator-rotunda','census-axis'),
 ('echo-shadow-theatre','mirror-left'),
 ('echo-1790-tenant','tenant-threshold'),
 ('echo-1917-faces','company-volley'),
 ('echo-1956-frequency','frequency-band'),
 ('echo-1987-missing','missing-frame'),
 ('final-unremembered','unremembered-ring'),
]
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1000})
    page.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    page.goto('about:blank');page.on('console',lambda m: errors.append(('console',m.type,m.text)) if m.type=='error' else None);page.on('pageerror',lambda e: errors.append(('pageerror','error',str(e))))
    page.set_content(html,wait_until='domcontentloaded');page.add_style_tag(content=css);page.add_script_tag(content=js);page.wait_for_timeout(60)
    page.locator('#newGameBtn').click();page.locator('.slot-card').first.click();page.wait_for_timeout(25);close_message(page)
    assert page.evaluate("VERSION==='1.1.1' && SAVE_SCHEMA===12 && __BT404__.save.schema===12");ok('phase10_boot_version_schema')
    summary=page.evaluate("()=>({profiles:Object.keys(BOSS_PROFILES).length,patterns:new Set(Object.values(BOSS_PROFILES).map(p=>p.pattern)).size,moves:new Set(Object.values(BOSS_PROFILES).map(p=>p.movement)).size,bosses:Object.values(ENEMY_TYPES).filter(x=>x.family==='Boss').length})")
    assert summary=={'profiles':9,'patterns':9,'moves':9,'bosses':9};ok('nine_distinct_boss_profiles')
    lines=page.evaluate("()=>Object.values(BOSS_PROFILES).flatMap(p=>p.phases.map(x=>x.line))")
    assert len(lines)==27 and len(set(lines))==27;ok('twenty_seven_unique_phase_directives')
    balance=page.evaluate("()=>Object.values(BOSS_PROFILES).every(p=>p.phases.length===3&&p.phases.every((q,i)=>q.interval>.75&&q.interval<2.3&&q.damage>=6&&q.damage<=10&&(i===0||q.interval<p.phases[i-1].interval)))")
    assert balance;ok('boss_phase_cadence_balance_bounds')
    # phase I/II remain damageable; phase III is the authored environmental gate.
    load_room(page,'echo-salt-sanctum');page.evaluate("()=>{const e=__BT404__.engine;e.bossVulnerable=0;e.bossPhase=1}")
    assert page.evaluate("__BT404__.engine.bossCanBeHit(__BT404__.engine.enemies[0])");ok('bosses_not_arbitrarily_invulnerable_phase1')
    for room,kind in boss_rooms: trigger_pattern(page,room,kind)
    for room,_ in boss_rooms[:-1]: phase3_focus(page,room)
    # Final boss keeps its multi-system Phase III gate from Phase 9.
    load_room(page,'final-unremembered')
    page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies[0];b.hp=b.maxHp*.2;e.updateBoss(b,.016)}");page.wait_for_timeout(5);close_message(page)
    assert page.evaluate("__BT404__.engine.bossPhase===3 && !__BT404__.engine.bossCanBeHit(__BT404__.engine.enemies[0]) && __BT404__.save.perception<=28")
    ok('unremembered_phase3_system_gate_preserved')
    # Delayed telegraphs exist for formation / frequency / missing-frame patterns.
    load_room(page,'echo-1917-faces');page.evaluate("()=>{const e=__BT404__.engine;e.projectiles=[];e.bossAttackTimer=0;e.updateBoss(e.enemies[0],.016)}")
    assert page.evaluate("__BT404__.engine.projectiles.some(p=>(p.delay||0)>0)");ok('delayed_projectile_telegraphs')
    page.set_viewport_size({'width':390,'height':844});load_room(page,'echo-1956-frequency');page.evaluate("()=>{const e=__BT404__.engine;e.bossAttackTimer=0;e.updateBoss(e.enemies[0],.016);e.hud()}");page.wait_for_timeout(12);assert page.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1');page.screenshot(path=str(ROOT/'QA_PHASE10_MOBILE.png'),full_page=True);ok('phase10_mobile_390x844')
    page.set_viewport_size({'width':1440,'height':1000});load_room(page,'final-unremembered');page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies[0];b.hp=b.maxHp*.2;e.bossPhase=3;e.bossVulnerable=0;e.bossAttackTimer=0;e.updateBoss(b,.016);e.hud()}");page.wait_for_timeout(12);page.screenshot(path=str(ROOT/'QA_PHASE10_DESKTOP.png'),full_page=True);ok('phase10_desktop_boss_capture')
    assert not errors,errors;ok('phase10_zero_console_page_errors')
    browser.close()
print('PHASE10_E2E_PASS')
for n,s in results: print(f'{s:4} {n}')
