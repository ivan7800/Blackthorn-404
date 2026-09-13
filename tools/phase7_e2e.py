#!/usr/bin/env python3
from pathlib import Path
import re
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'index.html').read_text(encoding='utf-8')
html=re.sub(r'<script src="js/bundle.js\?v=[^"]+" defer></script>','',html)
html=re.sub(r'<link rel="stylesheet"[^>]+>','',html)
html=re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]+>','',html)
css=(ROOT/'css/app.css').read_text(encoding='utf-8');js=(ROOT/'js/bundle.js').read_text(encoding='utf-8')
errors=[];results=[]
def ok(n): results.append((n,'PASS')); print('PASS',n,flush=True)
def close_message(page,max_clicks=60):
    for _ in range(max_clicks):
        if not page.locator('#messageDialog').evaluate('(e)=>e.open'): return
        page.locator('#messageNextBtn').click(); page.wait_for_timeout(5)
    assert not page.locator('#messageDialog').evaluate('(e)=>e.open')
def load_room(page,r): page.evaluate('r=>__BT404__.engine.loadRoom(r,false)',r); page.wait_for_timeout(25); close_message(page)
def interact(page,x,y): page.evaluate('([x,y])=>{const e=__BT404__.engine;e.player.x=x;e.player.y=y;e.mode="playing";e.interact()}',[x,y]); page.wait_for_timeout(15)
def kill_boss(page):
    page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies.find(x=>x.boss&&!x.dead);b.hp=1;e.bossVulnerable=5.5;e.player.x=b.x-15;e.player.y=b.y;e.player.facing='right';e.attackCd=0;e.save.stamina=100}")
    page.keyboard.press('KeyZ');page.wait_for_timeout(30);close_message(page);page.wait_for_timeout(45);close_message(page)
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1000})
    page.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    page.goto('about:blank');page.on('console',lambda m: errors.append(('console',m.type,m.text)) if m.type=='error' else None);page.on('pageerror',lambda e: errors.append(('pageerror','error',str(e))))
    page.set_content(html,wait_until='domcontentloaded');page.add_style_tag(content=css);page.add_script_tag(content=js);page.wait_for_timeout(80)
    page.locator('#newGameBtn').click();page.locator('.slot-card').first.click();page.wait_for_timeout(50);close_message(page)
    assert page.evaluate('__BT404__.save.schema===12 && __BT404__.save.phase7Complete===false')
    ok('phase7_boot_schema7')
    counts=page.evaluate("()=>({c2:Object.values(ROOMS).filter(r=>r.area==='Memory Echo · Asterion Salt City').length,c3:Object.values(ROOMS).filter(r=>r.area==='Memory Echo · Vespera').length,c4:Object.values(ROOMS).filter(r=>r.area==='Memory Echo · Collegium Varetti').length,weapons:WEAPONS.length,newTypes:Object.keys(ENEMY_TYPES).filter(k=>['salt-astronomer','last-enumerator','anatomist-shadow'].includes(k)).length})")
    assert counts=={'c2':9,'c3':9,'c4':9,'weapons':12,'newTypes':3};ok('three_chapters_27_rooms_9_weapons_3_bosses')
    migrated=page.evaluate("()=>normalizeSave({schema:6,phase6Complete:true,flags:['chapter:saint-orren-complete'],room:'manor-memory-vault',health:90,perception:80,stability:70,stamina:60,weapon:'candlestick',weapons:['candlestick'],ammo:{},notes:[],achievements:[],bosses:[],rooms:['manor-memory-vault'],sigils:['bind-void-i'],equippedSigil:'bind-void-i'})")
    assert migrated['schema']==12 and migrated['phase6Complete'] is True and migrated['phase7Complete'] is False and migrated['chapterProgress']['c2']==0 and migrated['chapterProgress']['c3']==0 and migrated['chapterProgress']['c4']==0;ok('schema6_to_schema7_migration')

    # Anchor gating & C2 launch
    page.evaluate("()=>{const e=__BT404__.engine;e.addFlag('chapter:saint-orren-complete');e.loadRoom('manor-memory-vault',true)}");page.wait_for_timeout(20);close_message(page)
    interact(page,58,114);close_message(page);page.wait_for_timeout(25);close_message(page)
    assert page.evaluate("__BT404__.save.room==='echo-salt-shore' && __BT404__.save.weapon==='bronze-star-spear' && __BT404__.save.flags.includes('anchor:salt-stars')")
    ok('chapter2_anchor_and_weapon')
    # C2 sequence wrong then correct + gate + checkpoint + secret
    load_room(page,'echo-tide-archive');interact(page,149,100);close_message(page);assert page.evaluate('__BT404__.save.chapterProgress.c2===0');ok('c2_wrong_alignment_resets')
    load_room(page,'echo-star-court');interact(page,69,50);close_message(page)
    load_room(page,'echo-tide-archive');interact(page,149,100);close_message(page)
    load_room(page,'echo-zenith-gallery');interact(page,147,70);close_message(page)
    assert page.evaluate("__BT404__.save.chapterProgress.c2===3 && __BT404__.save.flags.includes('c2:alignment')");ok('c2_three_lens_alignment')
    load_room(page,'echo-brine-cistern');interact(page,144,124);close_message(page);assert page.evaluate("__BT404__.save.memorySafeRoom==='echo-brine-cistern'");ok('c2_checkpoint')
    load_room(page,'echo-salt-shore');interact(page,241,88);close_message(page);assert page.evaluate("__BT404__.save.flags.includes('secret:black-shell')");ok('c2_secret')
    load_room(page,'echo-salt-sanctum');page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies[0];b.hp=b.maxHp*.2;e.updateBoss(b,.016)}");page.wait_for_timeout(10);close_message(page);assert page.evaluate('__BT404__.engine.bossPhase===3 && __BT404__.engine.bossVulnerable===0');interact(page,144,34);close_message(page);assert page.evaluate('__BT404__.engine.bossVulnerable>5');ok('c2_boss_environmental_final_phase')
    kill_boss(page);assert page.evaluate("__BT404__.save.flags.includes('chapter:salt-stars-complete') && __BT404__.save.houseStage>=3 && __BT404__.save.room==='manor-memory-vault'");ok('c2_completion_returns_to_manor')

    # C3 launch and restored census sequence
    interact(page,238,114);close_message(page);page.wait_for_timeout(25);close_message(page);assert page.evaluate("__BT404__.save.room==='echo-census-gate' && __BT404__.save.weapon==='census-gladius'");ok('chapter3_anchor_and_weapon')
    load_room(page,'echo-census-hall');interact(page,144,104);close_message(page)
    load_room(page,'echo-forum');interact(page,147,80);close_message(page)
    load_room(page,'echo-basilica-archive');interact(page,144,74);close_message(page)
    load_room(page,'echo-aqueduct-records');interact(page,204,60);close_message(page)
    load_room(page,'echo-scriptorium');interact(page,142,104);close_message(page)
    assert page.evaluate("__BT404__.save.chapterProgress.c3===3 && __BT404__.save.flags.includes('c3:register-restored')");ok('c3_restore_three_citizens')
    load_room(page,'echo-scriptorium');interact(page,78,50);close_message(page);assert page.evaluate("__BT404__.save.flags.includes('secret:vespera-child')");ok('c3_recurring_mara_secret')
    load_room(page,'echo-enumerator-rotunda');page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies[0];b.hp=b.maxHp*.2;e.updateBoss(b,.016)}");page.wait_for_timeout(10);close_message(page);interact(page,142,35);close_message(page);kill_boss(page)
    assert page.evaluate("__BT404__.save.flags.includes('chapter:last-census-complete') && __BT404__.save.houseStage>=4");ok('c3_completion')

    # C4 optics sequence & completion
    interact(page,270,76);close_message(page);page.wait_for_timeout(25);close_message(page);assert page.evaluate("__BT404__.save.room==='echo-anatomy-theatre' && __BT404__.save.weapon==='anatomist-rapier'");ok('chapter4_anchor_and_weapon')
    load_room(page,'echo-specimen-hall');interact(page,108,100);close_message(page)
    load_room(page,'echo-glass-chapel');interact(page,150,44);close_message(page)
    load_room(page,'echo-print-shop');interact(page,198,50);close_message(page)
    load_room(page,'echo-shadow-corridor');interact(page,147,72);close_message(page)
    assert page.evaluate("__BT404__.save.chapterProgress.c4===3 && __BT404__.save.flags.includes('c4:optics-aligned')");ok('c4_optics_alignment')
    load_room(page,'echo-anatomy-theatre');interact(page,238,100);close_message(page);assert page.evaluate("__BT404__.save.flags.includes('secret:cold-scalpel')");ok('c4_secret')
    load_room(page,'echo-shadow-theatre');page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies[0];b.hp=b.maxHp*.2;e.updateBoss(b,.016)}");page.wait_for_timeout(10);close_message(page);interact(page,141,36);close_message(page);kill_boss(page)
    assert page.evaluate("__BT404__.save.phase7Complete===true && __BT404__.save.flags.includes('chapter:anatomy-shadow-complete') && __BT404__.save.achievements.includes('phase7-complete') && __BT404__.save.houseStage>=5 && __BT404__.save.room==='manor-memory-vault'");ok('phase7_all_three_chapters_complete')
    if page.locator('#completeDialog').evaluate('(e)=>e.open'):
        assert 'FOUR MEMORIES RECOVERED' in page.locator('#completeKicker').inner_text();page.locator('#completeCloseBtn').click()
    # AI behavior availability
    behaviors=page.evaluate("()=>[...new Set(Object.values(ENEMY_TYPES).map(e=>e.behavior))]")
    assert all(x in behaviors for x in ['ambush','orbit','flee','blink']);ok('phase7_distinct_ai_behaviors')
    # save reload
    page.locator('#leaveBtn').click();page.wait_for_timeout(15);page.locator('#continueBtn').click();page.wait_for_timeout(10);page.locator('.slot-card').first.click();page.wait_for_timeout(45);close_message(page)
    assert page.evaluate("__BT404__.save.schema===12 && __BT404__.save.phase7Complete===true && __BT404__.save.bosses.includes('salt-astronomer') && __BT404__.save.bosses.includes('last-enumerator') && __BT404__.save.bosses.includes('anatomist-shadow')");ok('phase7_save_reload')
    page.set_viewport_size({'width':390,'height':844});load_room(page,'echo-shadow-corridor');page.wait_for_timeout(25);assert page.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1');page.screenshot(path=str(ROOT/'QA_PHASE7_MOBILE.png'),full_page=True);ok('phase7_mobile_390x844')
    page.set_viewport_size({'width':1440,'height':1000});load_room(page,'echo-salt-sanctum');page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies[0];b.hp=b.maxHp*.2;e.bossPhase=3;e.bossVulnerable=5;e.hud()}");page.wait_for_timeout(25);page.screenshot(path=str(ROOT/'QA_PHASE7_DESKTOP.png'),full_page=True);ok('phase7_desktop_capture')
    assert not errors,errors;ok('phase7_zero_console_page_errors')
    browser.close()
print('PHASE7_E2E_PASS')
for n,s in results: print(f'{s:4} {n}')
