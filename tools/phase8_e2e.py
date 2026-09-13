#!/usr/bin/env python3
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'index.html').read_text(encoding='utf-8')
import re
html=re.sub(r'<script src="js/bundle.js\?v=[^"]+" defer></script>','',html)
html=re.sub(r'<link rel="stylesheet"[^>]+>','',html)
html=re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]+>','',html)
css=(ROOT/'css/app.css').read_text(encoding='utf-8');js=(ROOT/'js/bundle.js').read_text(encoding='utf-8')
errors=[];results=[]
def ok(n): results.append((n,'PASS')); print('PASS',n,flush=True)
def close_message(page,max_clicks=100):
    for _ in range(max_clicks):
        if not page.locator('#messageDialog').evaluate('(e)=>e.open'): return
        page.locator('#messageNextBtn').click(); page.wait_for_timeout(3)
    assert not page.locator('#messageDialog').evaluate('(e)=>e.open')
def load_room(page,r):
    page.evaluate('r=>__BT404__.engine.loadRoom(r,false)',r);page.wait_for_timeout(12);close_message(page)
def interact(page,x,y):
    page.evaluate('([x,y])=>{const e=__BT404__.engine;e.player.x=x;e.player.y=y;e.mode="playing";e.interact()}',[x,y]);page.wait_for_timeout(7)
def kill_boss(page):
    page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies.find(x=>x.boss&&!x.dead);b.hp=1;e.bossVulnerable=5.5;e.player.x=b.x-15;e.player.y=b.y;e.player.facing='right';e.attackCd=0;e.save.stamina=100}")
    page.keyboard.press('KeyZ');page.wait_for_timeout(20);close_message(page);page.wait_for_timeout(20);close_message(page)
def phase3_focus_and_kill(page,room):
    load_room(page,room)
    page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies.find(x=>x.boss);b.hp=b.maxHp*.2;e.updateBoss(b,.016)}")
    page.wait_for_timeout(6);close_message(page)
    assert page.evaluate('__BT404__.engine.bossPhase===3 && __BT404__.engine.bossVulnerable===0')
    interact(page,141,38);close_message(page)
    assert page.evaluate('__BT404__.engine.bossVulnerable>5')
    kill_boss(page)
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1000})
    page.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    page.goto('about:blank');page.on('console',lambda m: errors.append(('console',m.type,m.text)) if m.type=='error' else None);page.on('pageerror',lambda e: errors.append(('pageerror','error',str(e))))
    page.set_content(html,wait_until='domcontentloaded');page.add_style_tag(content=css);page.add_script_tag(content=js);page.wait_for_timeout(65)
    page.locator('#newGameBtn').click();page.locator('.slot-card').first.click();page.wait_for_timeout(30);close_message(page)
    assert page.evaluate('__BT404__.save.schema===12 && __BT404__.save.phase8Complete===false');ok('phase8_boot_schema8')
    counts=page.evaluate("()=>({c5:Object.values(ROOMS).filter(r=>r.area==='Memory Echo · First Blackthorn House').length,c6:Object.values(ROOMS).filter(r=>r.area==='Memory Echo · Ravelin Wood').length,c7:Object.values(ROOMS).filter(r=>r.area==='Memory Echo · Northmere Relay').length,c8:Object.values(ROOMS).filter(r=>r.area==='Memory Echo · Blackthorn Restoration').length,weapons:WEAPONS.length,bosses:['first-tenant','company-without-faces','dead-frequency','man-missing-frame'].filter(k=>ENEMY_TYPES[k]).length})")
    assert counts=={'c5':9,'c6':9,'c7':9,'c8':9,'weapons':12,'bosses':4};ok('phase8_36_rooms_12_weapons_4_bosses')
    migrated=page.evaluate("()=>normalizeSave({schema:7,phase7Complete:true,flags:['chapter:anatomy-shadow-complete'],room:'manor-memory-vault',health:90,perception:80,stability:70,stamina:60,weapon:'candlestick',weapons:['candlestick'],ammo:{},notes:[],achievements:[],bosses:[],rooms:['manor-memory-vault'],sigils:['bind-void-i'],equippedSigil:'bind-void-i',chapterProgress:{c2:3,c3:3,c4:3},chapterStats:{c2:{secrets:1},c3:{secrets:1},c4:{secrets:1}}})")
    assert migrated['schema']==12 and migrated['phase8Complete'] is False and migrated['chapterProgress']['c5']==0 and migrated['ammo']['flare']['clip']==1;ok('schema7_to_schema8_migration')
    # C5
    page.evaluate("()=>{const e=__BT404__.engine;e.addFlag('chapter:anatomy-shadow-complete');e.save.phase7Complete=true;e.loadRoom('manor-memory-vault',true)}");page.wait_for_timeout(12);close_message(page)
    interact(page,40,74);close_message(page);page.wait_for_timeout(12);close_message(page)
    assert page.evaluate("__BT404__.save.room==='echo-1790-approach' && __BT404__.save.weapon==='duelling-sabre'");ok('c5_anchor_weapon')
    load_room(page,'echo-1790-approach');interact(page,74,88);close_message(page)
    for r in ['echo-1790-drawing','echo-1790-stair','echo-1790-engine']:
        load_room(page,r);interact(page,141,88);close_message(page)
    assert page.evaluate("__BT404__.save.chapterProgress.c5===3 && __BT404__.save.flags.includes('c5:aligned')");ok('c5_architecture_alignment')
    phase3_focus_and_kill(page,'echo-1790-tenant')
    assert page.evaluate("__BT404__.save.flags.includes('chapter:house-name-complete') && __BT404__.save.houseStage>=6");ok('c5_boss_completion')
    # C6
    load_room(page,'manor-memory-vault');interact(page,82,74);close_message(page);page.wait_for_timeout(12);close_message(page)
    assert page.evaluate("__BT404__.save.room==='echo-1917-trench' && __BT404__.save.weapon==='trench-club'");ok('c6_anchor_weapon')
    load_room(page,'echo-1917-trench');interact(page,74,88);close_message(page)
    for r in ['echo-1917-aid','echo-1917-dugout','echo-1917-map']:
        load_room(page,r);interact(page,141,88);close_message(page)
    assert page.evaluate("__BT404__.save.flags.includes('c6:witness-chain')");ok('c6_witness_chain')
    phase3_focus_and_kill(page,'echo-1917-faces')
    assert page.evaluate("__BT404__.save.flags.includes('chapter:mud-remembers-complete') && __BT404__.save.houseStage>=7");ok('c6_boss_completion')
    # C7
    load_room(page,'manor-memory-vault');interact(page,214,74);close_message(page);page.wait_for_timeout(12);close_message(page)
    assert page.evaluate("__BT404__.save.room==='echo-1956-gate' && __BT404__.save.weapon==='heavy-torch'");ok('c7_anchor_weapon')
    load_room(page,'echo-1956-gate');interact(page,74,88);close_message(page)
    for r in ['echo-1956-generator','echo-1956-tower','echo-1956-archive']:
        load_room(page,r);interact(page,141,88);close_message(page)
    assert page.evaluate("__BT404__.save.flags.includes('c7:carrier-lock')");ok('c7_frequency_alignment')
    phase3_focus_and_kill(page,'echo-1956-frequency')
    assert page.evaluate("__BT404__.save.flags.includes('chapter:broadcast-eleven-complete') && __BT404__.save.houseStage>=8");ok('c7_boss_completion')
    # C8
    load_room(page,'manor-memory-vault');interact(page,276,136);close_message(page);page.wait_for_timeout(12);close_message(page)
    assert page.evaluate("__BT404__.save.room==='echo-1987-drive' && __BT404__.save.weapon==='pry-bar'");ok('c8_anchor_weapon')
    load_room(page,'echo-1987-drive');interact(page,74,88);close_message(page)
    for r in ['echo-1987-site','echo-1987-tape','echo-1987-splice']:
        load_room(page,r);interact(page,141,88);close_message(page)
    assert page.evaluate("__BT404__.save.flags.includes('c8:continuity')");ok('c8_false_continuity')
    load_room(page,'echo-1987-basement');interact(page,74,46);close_message(page)
    assert page.evaluate("__BT404__.save.flags.includes('secret:elena-slate')");ok('c8_secret')
    phase3_focus_and_kill(page,'echo-1987-missing')
    assert page.evaluate("__BT404__.save.phase8Complete===true && __BT404__.save.flags.includes('chapter:tape-zero-complete') && __BT404__.save.achievements.includes('phase8-complete') && __BT404__.save.bosses.includes('man-missing-frame')");ok('phase8_all_eight_spines_complete')
    if page.locator('#completeDialog').evaluate('(e)=>e.open'):
        assert 'EIGHT MEMORIES RECOVERED' in page.locator('#completeKicker').inner_text();page.evaluate("document.querySelector('#completeDialog').close()")
    reloaded=page.evaluate("""()=>{const e=__BT404__.engine;e.persist('phase8-regression');const s=loadSlot(__BT404__.slot);return {schema:s.schema,phase8:s.phase8Complete,bosses:s.bosses}}""")
    assert reloaded['schema']==12 and reloaded['phase8'] and all(x in reloaded['bosses'] for x in ['first-tenant','company-without-faces','dead-frequency','man-missing-frame']);ok('phase8_save_reload')
    page.set_viewport_size({'width':390,'height':844});load_room(page,'echo-1987-camera');assert page.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1');page.screenshot(path=str(ROOT/'QA_PHASE8_MOBILE.png'),full_page=True);ok('phase8_mobile_390x844')
    page.set_viewport_size({'width':1440,'height':1000});load_room(page,'echo-1987-missing');page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies[0];b.hp=b.maxHp*.2;e.bossPhase=3;e.bossVulnerable=5;e.hud()}");page.wait_for_timeout(18);page.screenshot(path=str(ROOT/'QA_PHASE8_DESKTOP.png'),full_page=True);ok('phase8_desktop_capture')
    assert not errors,errors;ok('phase8_zero_console_page_errors')
    browser.close()
print('PHASE8_E2E_PASS')
for n,s in results: print(f'{s:4} {n}')
