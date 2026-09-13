#!/usr/bin/env python3
from pathlib import Path
import re
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'index.html').read_text(encoding='utf-8')
html=re.sub(r'<script src="js/bundle.js\?v=[^"]+" defer></script>','',html)
html=re.sub(r'<link rel="stylesheet"[^>]+>','',html)
html=re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]+>','',html)
css=(ROOT/'css/app.css').read_text(encoding='utf-8')
js=(ROOT/'js/bundle.js').read_text(encoding='utf-8')
errors=[];results=[]
def ok(name): results.append((name,'PASS'));print('PASS',name,flush=True)
def close_message(page,max_clicks=20):
    for _ in range(max_clicks):
        if not page.locator('#messageDialog').evaluate('(e)=>e.open'): return
        page.locator('#messageNextBtn').click();page.wait_for_timeout(15)
    assert not page.locator('#messageDialog').evaluate('(e)=>e.open')
def load_room(page,room):
    page.evaluate("r=>__BT404__.engine.loadRoom(r,false)",room);page.wait_for_timeout(55);close_message(page)
def interact_at(page,x,y):
    page.evaluate("p=>{const e=__BT404__.engine;e.player.x=p[0];e.player.y=p[1];e.interact()}",[x,y]);page.wait_for_timeout(20);close_message(page)
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1000})
    page.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    page.goto('about:blank')
    page.on('console',lambda m: errors.append(('console',m.type,m.text)) if m.type=='error' else None)
    page.on('pageerror',lambda e: errors.append(('pageerror','error',str(e))))
    page.set_content(html,wait_until='domcontentloaded');page.add_style_tag(content=css);page.add_script_tag(content=js);page.wait_for_timeout(100)
    page.locator('#newGameBtn').click();page.locator('.slot-card').first.click();page.wait_for_timeout(70);close_message(page);ok('phase2_boot_new_save')

    # New saves cannot enter the expanded house before Memory I is completed.
    load_room(page,'manor-hall');page.evaluate("()=>{const e=__BT404__.engine;e.player.x=155;e.player.y=2;e.checkExits()}");page.wait_for_timeout(20)
    assert page.evaluate("__BT404__.save.room")== 'manor-hall';assert page.locator('#messageDialog').evaluate('(e)=>e.open');close_message(page);ok('pre_slice_hub_gate')

    # Schema 1 migration keeps old Phase 1 saves valid and upgrades the gallery alias.
    migrated=page.evaluate("()=>normalizeSave({schema:1,sliceComplete:true,room:'manor-gallery',health:90,perception:70,stability:80,stamina:75,flags:[],notes:[],achievements:[],bosses:['bell-without-tongue'],rooms:['manor-gallery'],sigils:['bind-void-i'],equippedSigil:'bind-void-i'})")
    assert migrated['schema']==12 and migrated['houseStage']==1 and migrated['room']=='manor-gallery-after';ok('schema1_to_schema4_migration')

    # Start Phase 2 state without replaying the boss (Phase 1 regression is a separate full test).
    page.evaluate("()=>{const e=__BT404__.engine;e.save.sliceComplete=true;e.save.houseStage=1;e.save.bosses=['bell-without-tongue'];e.loadRoom('manor-gallery-after',true)}");page.wait_for_timeout(60);close_message(page)
    assert page.evaluate("__BT404__.save.room")== 'manor-gallery-after';ok('altered_manor_entry')

    # Library estate plan unlocks the real in-game map.
    load_room(page,'manor-library');interact_at(page,140,64)
    assert page.evaluate("__BT404__.save.mapUnlocked===true")
    assert page.evaluate("__BT404__.save.flags.includes('map:estate')")
    assert page.evaluate("__BT404__.save.achievements.includes('cartographer')");ok('estate_plan_unlocks_map')
    page.keyboard.press('KeyM');page.wait_for_timeout(25);assert page.evaluate("__BT404__.engine.mode==='map'");page.screenshot(path=str(ROOT/'QA_PHASE2_MAP.png'));page.keyboard.press('KeyM');assert page.evaluate("__BT404__.engine.mode==='playing'");ok('map_keyboard_toggle')

    # The Blackthorn key gates the upper floor.
    load_room(page,'manor-dining');interact_at(page,240,37);assert page.evaluate("__BT404__.save.flags.includes('key:blackthorn')");ok('blackthorn_key')
    load_room(page,'manor-stairwell');page.evaluate("()=>{const e=__BT404__.engine;e.player.x=155;e.player.y=2;e.checkExits()}");page.wait_for_timeout(60);close_message(page)
    assert page.evaluate("__BT404__.save.room")== 'manor-upper-landing';ok('upper_floor_gate_unlock')

    # Safe room becomes the Manor death checkpoint and restores core resources.
    load_room(page,'manor-elena-room');page.evaluate("()=>{const e=__BT404__.engine;e.player.hp=34;e.save.health=34;e.save.perception=39;e.save.stability=21;e.save.stamina=12}");interact_at(page,74,72)
    safe=page.evaluate("()=>({hp:__BT404__.engine.player.hp,p:__BT404__.save.perception,s:__BT404__.save.stability,st:__BT404__.save.stamina,room:__BT404__.save.safeRoom})")
    assert safe['hp']==100 and safe['s']==100 and safe['st']==100 and safe['p']>=67 and safe['room']=='manor-elena-room';ok('safe_room_checkpoint_restore')

    # Service key opens the basement.
    load_room(page,'manor-study');interact_at(page,78,48);assert page.evaluate("__BT404__.save.flags.includes('key:service')");ok('service_key')
    load_room(page,'manor-stairwell');page.evaluate("()=>{const e=__BT404__.engine;e.player.x=155;e.player.y=154;e.checkExits()}");page.wait_for_timeout(60);close_message(page)
    assert page.evaluate("__BT404__.save.room")== 'manor-cellar';ok('basement_gate_unlock')

    # Physical shortcuts are opened from within the environment.
    load_room(page,'manor-winter-garden');interact_at(page,145,136);assert page.evaluate("__BT404__.save.flags.includes('shortcut:garden-service')");
    load_room(page,'manor-servants-passage');interact_at(page,272,94);assert page.evaluate("__BT404__.save.flags.includes('shortcut:service-vestibule')");assert page.evaluate("__BT404__.save.achievements.includes('two-ways-home')");ok('two_manor_shortcuts')

    # Chapel mark + archive lineage are required for the Memory Vault.
    load_room(page,'manor-chapel');interact_at(page,145,40);assert page.evaluate("__BT404__.save.flags.includes('mark:chapel')");ok('chapel_mark')
    load_room(page,'manor-family-archive')
    page.evaluate("()=>{const e=__BT404__.engine;e.player.x=296;e.player.y=82;e.checkExits()}");page.wait_for_timeout(20);assert page.evaluate("__BT404__.save.room")== 'manor-family-archive';assert page.locator('#messageDialog').evaluate('(e)=>e.open');close_message(page);ok('vault_locked_without_lineage')
    interact_at(page,142,100);assert page.evaluate("__BT404__.save.flags.includes('mark:lineage')");
    page.evaluate("()=>{const e=__BT404__.engine;e.player.x=296;e.player.y=82;e.checkExits()}");page.wait_for_timeout(60);close_message(page);assert page.evaluate("__BT404__.save.room")== 'manor-memory-vault';ok('memory_vault_three_part_gate')

    # Final Phase 2 interaction marks the hub as complete without launching a future chapter.
    interact_at(page,140,54);assert page.evaluate("__BT404__.save.phase2Complete===true");assert page.evaluate("__BT404__.save.achievements.includes('house-indexed')");
    if page.locator('#completeDialog').evaluate('(e)=>e.open'):
        assert 'MANOR INDEXED' in page.locator('#completeKicker').inner_text();page.locator('#completeCloseBtn').click()
    ok('phase2_memory_index_complete')

    # Save / reload preserves the complete hub state and schema.
    page.evaluate("document.querySelector('#leaveBtn').click()");page.wait_for_timeout(20);page.locator('#continueBtn').click();page.wait_for_timeout(15);page.locator('.slot-card').first.click();page.wait_for_timeout(70);close_message(page)
    assert page.evaluate("__BT404__.save.schema===12 && __BT404__.save.phase2Complete===true && __BT404__.save.mapUnlocked===true");ok('phase2_save_reload')

    # Mobile controls include MAP and remain within viewport.
    page.set_viewport_size({'width':390,'height':844});page.wait_for_timeout(80);assert page.locator('[data-control="map"]').is_visible();assert page.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1')
    page.locator('[data-control="map"]').dispatch_event('pointerdown',{'pointerId':7,'pointerType':'touch'});page.locator('[data-control="map"]').dispatch_event('pointerup',{'pointerId':7,'pointerType':'touch'});page.wait_for_timeout(20);assert page.evaluate("__BT404__.engine.mode==='map'");ok('mobile_map_control')
    page.screenshot(path=str(ROOT/'QA_PHASE2_MOBILE.png'),full_page=True)
    page.evaluate("__BT404__.engine.toggleMap()")
    page.set_viewport_size({'width':1440,'height':1000});page.wait_for_timeout(40);page.screenshot(path=str(ROOT/'QA_PHASE2_DESKTOP.png'),full_page=True)
    assert not errors,errors;ok('phase2_zero_console_page_errors')
    browser.close()
print('PHASE2_E2E_PASS')
for name,status in results: print(f'{status:4} {name}')
