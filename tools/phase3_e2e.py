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
def close_message(page,max_clicks=30):
    for _ in range(max_clicks):
        if not page.locator('#messageDialog').evaluate('(e)=>e.open'): return
        page.locator('#messageNextBtn').click();page.wait_for_timeout(12)
    assert not page.locator('#messageDialog').evaluate('(e)=>e.open')
def load_room(page,room):
    page.evaluate("r=>__BT404__.engine.loadRoom(r,false)",room);page.wait_for_timeout(45);close_message(page)
def mirror_interact(page):
    page.evaluate("()=>{const e=__BT404__.engine;e.player.x=140;e.player.y=74;e.interact()}");page.wait_for_timeout(20)
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1000})
    page.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},removed:[],getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){this.removed.push(k);delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    page.goto('about:blank')
    page.on('console',lambda m: errors.append(('console',m.type,m.text)) if m.type=='error' else None)
    page.on('pageerror',lambda e: errors.append(('pageerror','error',str(e))))
    page.set_content(html,wait_until='domcontentloaded');page.add_style_tag(content=css);page.add_script_tag(content=js);page.wait_for_timeout(100)
    page.locator('#newGameBtn').click();page.locator('.slot-card').first.click();page.wait_for_timeout(65);close_message(page);ok('phase3_boot_new_save')

    migrated=page.evaluate("()=>normalizeSave({schema:2,sliceComplete:true,phase2Complete:true,room:'manor-memory-vault',health:90,perception:63,stability:80,stamina:70,flags:['map:estate'],notes:[],achievements:[],bosses:['bell-without-tongue'],rooms:['manor-memory-vault'],sigils:['bind-void-i'],equippedSigil:'bind-void-i'})")
    assert migrated['schema']==12 and migrated['phase2Complete'] is True and migrated['phase3Complete'] is False and migrated['perceptionTiersSeen']==[]
    ok('schema2_to_schema4_migration')

    load_room(page,'manor-mirror-room')
    mirror_interact(page);assert page.evaluate('__BT404__.save.perceptionTrialStep===0');assert page.locator('#messageDialog').evaluate('(e)=>e.open');close_message(page);ok('trial_gated_by_phase2')
    page.evaluate("()=>{const e=__BT404__.engine;e.save.sliceComplete=true;e.save.phase2Complete=true;e.save.houseStage=1;e.persist('qa-phase2')}")

    # Level I: altered sensory layer, shadows/lights/audio only.
    mirror_interact(page);assert page.evaluate('__BT404__.save.perception===70 && __BT404__.save.perceptionTrialStep===1');close_message(page)
    fx1=page.evaluate("()=>__BT404__.engine.perceptionSystem.fx(__BT404__.save.perception,__BT404__.settings)")
    assert fx1['tier']==1 and fx1['audioBend'] and fx1['falseShadows'] and not fx1['doorVeil']
    page.evaluate("()=>{const e=__BT404__.engine;e.perceptionSystem.shadowClock=0;e.updatePerception(.016)}")
    assert page.evaluate("__BT404__.engine.phantoms.some(p=>p.type==='shadow')")
    ok('perception_level1_sensory_drift')

    # Level II: false architecture and intangible threats.
    mirror_interact(page);assert page.evaluate('__BT404__.save.perception===45 && __BT404__.save.perceptionTrialStep===2');close_message(page)
    fx2=page.evaluate("()=>__BT404__.engine.perceptionSystem.fx(__BT404__.save.perception,__BT404__.settings)")
    assert fx2['tier']==2 and fx2['doorVeil'] and fx2['roomShift'] and fx2['falseEnemies']
    page.evaluate("()=>{const e=__BT404__.engine;e.perceptionSystem.phantomClock=0;e.updatePerception(.016)}")
    assert page.evaluate("__BT404__.engine.phantoms.some(p=>p.type==='enemy')");ok('perception_level2_false_architecture_threats')
    page.evaluate("()=>{const e=__BT404__.engine;const p=e.phantoms.find(x=>x.type==='enemy');e.player.x=p.x-14;e.player.y=p.y;e.player.facing='right';e.attackCd=0}")
    page.keyboard.press('KeyZ');page.wait_for_timeout(20)
    assert page.evaluate("__BT404__.engine.phantoms.filter(p=>p.type==='enemy').every(p=>p.life<=0)")
    ok('illusory_enemy_dissipates_without_damage_logic')

    # Level III: HUD/room label may lie, but optional truthful HUD overrides it.
    mirror_interact(page);assert page.evaluate('__BT404__.save.perception===20 && __BT404__.save.perceptionTrialStep===3');close_message(page)
    page.evaluate("()=>{const e=__BT404__.engine;e.roomTime=1;e.player.hp=83;e.save.health=83;e.save.stamina=61;e.settings.truthfulHud=false;e.hud()}")
    hud_lie=int(page.locator('#healthText').inner_text());assert hud_lie!=83;assert 'HUD UNRELIABLE' in page.locator('#perceptionState').inner_text();ok('perception_level3_hud_lie')
    page.evaluate("()=>{const e=__BT404__.engine;__BT404__.settings.truthfulHud=true;e.settings=__BT404__.settings;e.hud()}")
    assert int(page.locator('#healthText').inner_text())==83;assert 'HUD UNRELIABLE' not in page.locator('#perceptionState').inner_text();ok('truthful_hud_accessibility_override')
    page.evaluate("()=>{const e=__BT404__.engine;__BT404__.settings.truthfulHud=false;e.settings=__BT404__.settings;e.perceptionSystem.echoClock=0;e.updatePerception(.016)}")
    assert page.evaluate('__BT404__.engine.echoes.length>0');ok('level3_memory_echo_text')

    # Level IV: local canvas glitches + temporary object veiling only.
    mirror_interact(page);assert page.evaluate('__BT404__.save.perception===8 && __BT404__.save.perceptionTrialStep===4');close_message(page)
    fx4=page.evaluate("()=>__BT404__.engine.perceptionSystem.fx(__BT404__.save.perception,__BT404__.settings)")
    assert fx4['tier']==4 and fx4['fakeGlitch'] and fx4['objectVeil'] and fx4['heavy']
    page.evaluate("()=>{const e=__BT404__.engine;e.perceptionSystem.glitchClock=0;e.updatePerception(.016)}")
    assert page.evaluate('__BT404__.engine.fakeGlitches.length>0');ok('perception_level4_canvas_glitch')
    veil=page.evaluate("()=>{const e=__BT404__.engine,fx=e.perceptionSystem.fx(8,e.settings);let hidden=false;for(let t=0;t<10;t+=.1)if(!e.perceptionSystem.objectVisible('mirror-trial',fx,t,false)){hidden=true;break;}return {hidden,near:e.perceptionSystem.objectVisible('mirror-trial',fx,1,true)}}")
    assert veil['hidden'] and veil['near'];ok('object_veil_is_visual_and_nearby_safe')
    assert page.evaluate("localStorage.removed.length===0 && !!localStorage.getItem('blackthorn404.slot.1')");ok('level4_does_not_delete_real_save')

    # Minimal effects suppress deceptive/high-intensity layers while mechanics remain unchanged.
    minimal=page.evaluate("()=>{const e=__BT404__.engine;const before=e.save.perception;e.settings.perceptionFx=.15;const fx=e.perceptionSystem.fx(8,e.settings);return {before,door:fx.doorVeil,hud:fx.hudLie,glitch:fx.fakeGlitch,veil:fx.objectVeil,shadow:fx.falseShadows}}")
    assert minimal['before']<=8.1 and minimal['before']>6 and not minimal['door'] and not minimal['hud'] and not minimal['glitch'] and not minimal['veil'] and minimal['shadow'];ok('minimal_fx_accessibility')
    page.evaluate("()=>{__BT404__.engine.settings.perceptionFx=1;__BT404__.settings.perceptionFx=1}")

    # Complete the controlled descent and return to stable values.
    mirror_interact(page);page.wait_for_timeout(20);assert page.evaluate('__BT404__.save.phase3Complete===true && __BT404__.save.perception===100 && __BT404__.save.stability===100 && __BT404__.save.perceptionTrialStep===0');close_message(page)
    if page.locator('#completeDialog').evaluate('(e)=>e.open'):
        assert 'MIRROR CALIBRATED' in page.locator('#completeKicker').inner_text();page.locator('#completeCloseBtn').click()
    assert page.evaluate("__BT404__.save.achievements.includes('unreliable-witness')")
    assert page.evaluate("JSON.stringify(__BT404__.save.perceptionTiersSeen)==='[1,2,3,4]'")
    ok('phase3_calibration_complete')

    # Settings persistence for truthful HUD.
    page.locator('#settingsBtn').click();page.wait_for_timeout(10);page.evaluate("()=>{const x=document.querySelector('#truthfulHud');x.checked=true;x.dispatchEvent(new Event('change',{bubbles:true}));}");assert page.evaluate("JSON.parse(localStorage.getItem('blackthorn404.settings.v1')).truthfulHud===true");page.locator('#settingsDialog').evaluate('(e)=>e.close()');ok('truthful_hud_setting_persists')

    # Save/reload keeps Phase 3 state and schema.
    page.evaluate("document.querySelector('#leaveBtn').click()");page.wait_for_timeout(25);page.locator('#continueBtn').click();page.wait_for_timeout(15);page.locator('.slot-card').first.click();page.wait_for_timeout(65);close_message(page)
    assert page.evaluate('__BT404__.save.schema===12 && __BT404__.save.phase3Complete===true && __BT404__.save.perception>95');ok('phase3_save_reload')

    page.set_viewport_size({'width':390,'height':844});page.wait_for_timeout(60);assert page.locator('#perceptionState').is_visible();assert page.locator('[data-control="attack"]').is_visible();assert page.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1')
    page.screenshot(path=str(ROOT/'QA_PHASE3_MOBILE.png'),full_page=True);ok('phase3_mobile_390x844')
    page.set_viewport_size({'width':1440,'height':1000});page.evaluate("()=>{const e=__BT404__.engine;e.save.perception=8;e.settings.truthfulHud=false;e.settings.perceptionFx=1;e.hud();e.render()}");page.wait_for_timeout(40);page.screenshot(path=str(ROOT/'QA_PHASE3_DESKTOP.png'),full_page=True);ok('phase3_desktop_level4_capture')
    assert not errors,errors;ok('phase3_zero_console_page_errors')
    browser.close()
print('PHASE3_E2E_PASS')
for name,status in results: print(f'{status:4} {name}')
