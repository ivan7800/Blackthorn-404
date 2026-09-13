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
def close_message(page,max_clicks=50):
    for _ in range(max_clicks):
        if not page.locator('#messageDialog').evaluate('(e)=>e.open'): return
        page.locator('#messageNextBtn').click();page.wait_for_timeout(6)
    assert not page.locator('#messageDialog').evaluate('(e)=>e.open')
def load_room(page,room):
    page.evaluate('r=>__BT404__.engine.loadRoom(r,false)',room);page.wait_for_timeout(45);close_message(page)
def interact_at(page,x,y):
    page.evaluate('([x,y])=>{const e=__BT404__.engine;e.player.x=x;e.player.y=y;e.mode="playing";e.interact()}',[x,y]);page.wait_for_timeout(18)
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1000})
    page.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    page.goto('about:blank')
    page.on('console',lambda m: errors.append(('console',m.type,m.text)) if m.type=='error' else None)
    page.on('pageerror',lambda e: errors.append(('pageerror','error',str(e))))
    page.set_content(html,wait_until='domcontentloaded');page.add_style_tag(content=css);page.add_script_tag(content=js);page.wait_for_timeout(100)
    page.locator('#newGameBtn').click();page.locator('.slot-card').first.click();page.wait_for_timeout(60);close_message(page)
    assert page.evaluate('__BT404__.save.schema===12 && __BT404__.save.phase6Complete===false && __BT404__.save.memorySafeRoom==="echo-priory-gate"')
    ok('phase6_boot_schema6')

    migrated=page.evaluate("()=>normalizeSave({schema:5,sliceComplete:true,phase2Complete:true,phase3Complete:true,phase4Complete:true,phase5Complete:true,room:'manor-memory-vault',health:90,perception:80,stability:70,stamina:60,weapon:'candlestick',weapons:['candlestick'],ammo:{},flags:[],notes:[],achievements:[],bosses:[],rooms:['manor-memory-vault'],sigils:['bind-void-i'],equippedSigil:'bind-void-i'})")
    assert migrated['schema']==12 and migrated['phase5Complete'] is True and migrated['phase6Complete'] is False and migrated['chapter1PuzzleStep']==0 and migrated['memorySafeRoom']=='echo-priory-gate'
    ok('schema5_to_schema6_migration')

    counts=page.evaluate("()=>{const rs=Object.values(ROOMS).filter(r=>r.area==='Memory Echo · Saint Orren');return {rooms:rs.length,notes:rs.flatMap(r=>r.interact||[]).filter(i=>i.kind==='note').length,types:[...new Set(rs.flatMap(r=>r.enemies||[]).map(e=>e.type))]}}")
    assert counts['rooms']==10 and counts['notes']>=8 and len(counts['types'])>=5
    ok('saint_orren_ten_rooms_documents_enemy_variety')

    load_room(page,'manor-gallery')
    interact_at(page,248,100);close_message(page);page.wait_for_timeout(50);close_message(page)
    assert page.evaluate("__BT404__.save.room==='echo-priory-gate' && __BT404__.save.flags.includes('anchor:saint-orren')")
    ok('anchor_launches_full_1349_chapter')

    load_room(page,'echo-infirmary-court')
    before=page.evaluate('__BT404__.engine.enemies.length')
    interact_at(page,234,46);close_message(page)
    after=page.evaluate('__BT404__.engine.enemies.length')
    assert after==before+1 and page.evaluate('__BT404__.engine.noisePulse>0 && __BT404__.save.chapter1Stats.hollowsDrawn===1')
    ok('sound_lure_attracts_hollow')

    load_room(page,'echo-apothecary')
    interact_at(page,270,126);close_message(page)
    assert page.evaluate("__BT404__.save.memorySafeRoom==='echo-apothecary' && __BT404__.engine.player.hp===100")
    ok('echo_local_checkpoint')

    interact_at(page,63,60);close_message(page)
    interact_at(page,116,92);close_message(page)
    assert page.evaluate("__BT404__.save.flags.includes('chapter:vinegar') && __BT404__.save.flags.includes('chapter:myrrh')")
    load_room(page,'echo-cloister');interact_at(page,87,110);close_message(page)
    assert page.evaluate("__BT404__.save.flags.includes('chapter:juniper')")
    ok('plague_ward_ingredients_collected')

    load_room(page,'echo-plague-ward')
    page.evaluate("()=>{const e=__BT404__.engine;e.save.flags=e.save.flags.filter(x=>x!=='chapter:myrrh');e.persist('qa-remove')}" )
    interact_at(page,141,108)
    assert page.locator('#messageDialog').evaluate('(e)=>e.open') and 'INCOMPLETE' in page.locator('#messageLines').inner_text();close_message(page)
    assert not page.evaluate("__BT404__.save.flags.includes('chapter:ward-mixture')")
    ok('ward_mixture_rejects_missing_reagent')

    page.evaluate("()=>{const e=__BT404__.engine;e.addFlag('chapter:myrrh');e.player.x=141;e.player.y=108;e.interact()}" );page.wait_for_timeout(20);close_message(page)
    assert page.evaluate("__BT404__.save.flags.includes('chapter:ward-mixture')")
    ok('ward_mixture_completed')

    # Wrong resonance resets.
    load_room(page,'echo-cloister');interact_at(page,184,108);close_message(page)
    assert page.evaluate('__BT404__.save.chapter1PuzzleStep===0')
    ok('resonance_wrong_order_resets')

    load_room(page,'echo-nave');interact_at(page,246,112);close_message(page)
    assert page.evaluate('__BT404__.save.chapter1PuzzleStep===1')
    load_room(page,'echo-cloister');interact_at(page,184,108);close_message(page)
    assert page.evaluate('__BT404__.save.chapter1PuzzleStep===2')
    load_room(page,'echo-ossuary');interact_at(page,150,66);close_message(page)
    assert page.evaluate("__BT404__.save.chapter1PuzzleStep===3 && __BT404__.save.flags.includes('chapter:sound-route') && __BT404__.save.achievements.includes('three-resonators')")
    ok('three_resonator_sequence_opens_memory_door')

    page.evaluate("()=>{const e=__BT404__.engine;e.save.flags=e.save.flags.filter(x=>x!=='chapter:sound-route')}" )
    blocked=page.evaluate("()=>__BT404__.engine.blockedExit(__BT404__.engine.room(),'right')")
    assert blocked and 'sequence' in ' '.join(blocked).lower()
    page.evaluate("()=>__BT404__.engine.addFlag('chapter:sound-route')")
    assert page.evaluate("()=>__BT404__.engine.blockedExit(__BT404__.engine.room(),'right')===null")
    ok('ossuary_threshold_gated_by_sound_puzzle')

    load_room(page,'echo-plague-ward');interact_at(page,218,46);close_message(page)
    assert page.evaluate("__BT404__.save.flags.includes('secret:patient-nine') && __BT404__.save.chapter1Stats.secrets===1 && __BT404__.save.achievements.includes('patient-nine')")
    ok('optional_ninth_cot_secret')

    # Chapter death returns to the memory checkpoint, not the manor safe room.
    page.evaluate("()=>{const e=__BT404__.engine;e.save.memorySafeRoom='echo-apothecary';e.player.hp=1;e.invuln=0;e.hitPlayer(20,{bound:0,hp:999})}");page.wait_for_timeout(20);close_message(page);page.wait_for_timeout(45);close_message(page)
    assert page.evaluate("__BT404__.save.room==='echo-apothecary'")
    ok('memory_death_uses_echo_checkpoint')

    load_room(page,'echo-crypt')
    assert page.evaluate("()=>__BT404__.engine.room().lockedExit==='right' && __BT404__.engine.enemies.some(e=>!e.dead)")
    page.evaluate("()=>{const e=__BT404__.engine;e.enemies.forEach(x=>{x.dead=true});}")
    assert not page.evaluate("()=>__BT404__.engine.enemies.some(e=>!e.dead)")
    ok('bell_crypt_combat_gate')

    load_room(page,'echo-bell-chamber')
    boss=page.evaluate("()=>({hp:__BT404__.engine.enemies[0].hp,max:__BT404__.engine.enemies[0].maxHp})")
    assert boss['max']==78
    page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies[0];b.hp=b.maxHp*.5;e.updateBoss(b,.016)}");page.wait_for_timeout(15);close_message(page)
    assert page.evaluate('__BT404__.engine.bossPhase===2')
    page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies[0];b.hp=b.maxHp*.2;e.updateBoss(b,.016)}");page.wait_for_timeout(15);close_message(page)
    assert page.evaluate('__BT404__.engine.bossPhase===3 && __BT404__.engine.bossVulnerable===0')
    ok('boss_phase_three_requires_deliberate_sound')

    interact_at(page,145,30);close_message(page)
    assert page.evaluate('__BT404__.engine.bossVulnerable>4')
    ok('bell_frame_reveals_final_phase')

    page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies[0];b.hp=1;e.bossVulnerable=5;e.player.x=b.x-15;e.player.y=b.y;e.player.facing='right';e.attackCd=0}")
    page.keyboard.press('KeyZ');page.wait_for_timeout(30);close_message(page);page.wait_for_timeout(80);close_message(page)
    assert page.evaluate("__BT404__.save.phase6Complete===true && __BT404__.save.sliceComplete===true && __BT404__.save.houseStage>=2 && __BT404__.save.room==='manor-gallery-after' && __BT404__.save.achievements.includes('saint-orren-complete')")
    if page.locator('#completeDialog').evaluate('(e)=>e.open'):
        assert 'MEMORY I RECOVERED' in page.locator('#completeKicker').inner_text();page.locator('#completeCloseBtn').click()
    ok('full_chapter_completion_returns_to_evolved_manor')

    page.locator('#leaveBtn').click();page.wait_for_timeout(20);page.locator('#continueBtn').click();page.wait_for_timeout(15);page.locator('.slot-card').first.click();page.wait_for_timeout(60);close_message(page)
    assert page.evaluate("__BT404__.save.schema===12 && __BT404__.save.phase6Complete===true && __BT404__.save.flags.includes('chapter:saint-orren-complete')")
    ok('phase6_save_reload')

    # Mobile and desktop captures.
    page.set_viewport_size({'width':390,'height':844});load_room(page,'echo-plague-ward');page.wait_for_timeout(40)
    assert page.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1')
    page.screenshot(path=str(ROOT/'QA_PHASE6_MOBILE.png'),full_page=True);ok('phase6_mobile_390x844')
    page.set_viewport_size({'width':1440,'height':1000});load_room(page,'echo-bell-chamber');page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies[0];b.hp=b.maxHp*.2;e.bossPhase=3;e.bossVulnerable=5;e.hud()}");page.wait_for_timeout(30)
    page.screenshot(path=str(ROOT/'QA_PHASE6_DESKTOP.png'),full_page=True);ok('phase6_desktop_boss_capture')

    assert not errors,errors;ok('phase6_zero_console_page_errors')
    browser.close()
print('PHASE6_E2E_PASS')
for name,status in results: print(f'{status:4} {name}')
