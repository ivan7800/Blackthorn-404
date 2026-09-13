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
    page.set_content(html,wait_until='domcontentloaded');page.add_style_tag(content=css);page.add_script_tag(content=js);page.wait_for_timeout(100)
def close_message(page,max_clicks=30):
    for _ in range(max_clicks):
        if not page.locator('#messageDialog').evaluate('(e)=>e.open'): return
        page.locator('#messageNextBtn').click();page.wait_for_timeout(5)
    assert not page.locator('#messageDialog').evaluate('(e)=>e.open')
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--autoplay-policy=no-user-gesture-required'])
    page=browser.new_page(viewport={'width':1440,'height':1000})
    page.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    boot(page)
    assert page.evaluate("VERSION==='1.1.1' && SAVE_SCHEMA===12");ok('final_version_schema12')
    assert 'PHASE 14' not in html and 'PHASE 15' not in html and 'PHASE COMPLETE' not in html;ok('development_phase_chrome_removed')
    assert page.locator('#recordsBtn').is_visible() and page.locator('#creditsBtn').is_visible();ok('records_and_credits_on_title')
    page.locator('#creditsBtn').click();assert page.locator('#creditsDialog').evaluate('(e)=>e.open');assert 'I. Roig' in page.locator('#creditsDialog').inner_text();ok('credits_dialog_authorship')
    page.locator('#creditsCloseBtn').click();page.wait_for_timeout(10);assert not page.locator('#creditsDialog').evaluate('(e)=>e.open');ok('credits_close')
    # Records on an empty slot.
    page.locator('#recordsBtn').click();assert page.locator('#recordsDialog').evaluate('(e)=>e.open');assert 'ACHIEVEMENTS' in page.locator('#recordsCount').inner_text();ok('records_open_from_title')
    page.locator('[data-record-tab="bestiary"]').click();assert '0/51 BESTIARY ENTRIES' in page.locator('#recordsCount').inner_text();ok('bestiary_empty_state')
    page.locator('#recordsCloseBtn').click();
    # Static bestiary structure: 26 normal + 8 elite + 8 miniboss + 9 boss.
    ranks=page.evaluate("()=>Object.keys(ENEMY_TYPES).map(id=>bestiaryRank(id)).reduce((a,r)=>(a[r]=(a[r]||0)+1,a),{})")
    assert ranks=={'CREATURE':26,'ELITE':8,'MINIBOSS':8,'BOSS':9},ranks;ok('bestiary_rank_distribution_26_8_8_9')
    assert page.evaluate('SLICE_ACHIEVEMENTS.length>=40');ok('achievement_catalog_present')
    # Start game and verify music/ambience plus FX settings are separate and mutable.
    page.locator('#newGameBtn').click();page.locator('.slot-card').first.click();page.wait_for_timeout(80);close_message(page)
    assert page.evaluate('__BT404__.engine!==null && __BT404__.audio.ambGain!==null');ok('procedural_ambience_running')
    page.locator('#settingsBtn').click();page.locator('#musicVolume').evaluate("e=>{e.value='20';e.dispatchEvent(new Event('change',{bubbles:true}))}");page.locator('#fxVolume').evaluate("e=>{e.value='80';e.dispatchEvent(new Event('change',{bubbles:true}))}");
    vals=page.evaluate('()=>({music:__BT404__.settings.musicVolume,fx:__BT404__.settings.fxVolume})');assert abs(vals['music']-.2)<.001 and abs(vals['fx']-.8)<.001,vals;ok('separate_music_fx_volume')
    page.locator('#settingsCloseBtn').click();page.wait_for_timeout(10)
    # Records from pause restore pause state cleanly.
    page.evaluate("()=>{const e=__BT404__.engine;e.togglePause()}");page.wait_for_timeout(10);assert page.locator('#pauseDialog').evaluate('(e)=>e.open')
    page.locator('#pauseRecordsBtn').click();assert page.locator('#recordsDialog').evaluate('(e)=>e.open') and page.evaluate("__BT404__.engine.mode==='records'");ok('records_open_from_pause')
    page.locator('#recordsCloseBtn').click();page.wait_for_timeout(10);assert page.locator('#pauseDialog').evaluate('(e)=>e.open') and page.evaluate("__BT404__.engine.mode==='paused'");ok('records_returns_to_pause')
    page.locator('#resumeBtn').click();page.wait_for_timeout(10)
    # Make all existing records discoverable without changing campaign logic; UI must render without errors.
    page.evaluate("()=>{const e=__BT404__.engine;e.save.rooms=Object.keys(ROOMS);e.save.bosses=Object.keys(ENEMY_TYPES).filter(id=>ENEMY_TYPES[id].family==='Boss');e.save.achievements=SLICE_ACHIEVEMENTS.map(a=>a.id);e.persist('qa-records')}")
    page.keyboard.press('KeyK');page.wait_for_timeout(10);assert page.locator('#recordsDialog').evaluate('(e)=>e.open');page.locator('[data-record-tab="achievements"]').click();expected=f"{page.evaluate('SLICE_ACHIEVEMENTS.length')}/{page.evaluate('SLICE_ACHIEVEMENTS.length')} ACHIEVEMENTS";actual=page.locator('#recordsCount').inner_text();assert expected in actual,(expected,actual);ok('all_achievements_render')
    page.locator('[data-record-tab="bestiary"]').click();assert '51/51 BESTIARY ENTRIES' in page.locator('#recordsCount').inner_text();assert page.locator('.record-row').count()==51;ok('full_bestiary_renders_51')
    page.keyboard.press('KeyK');page.wait_for_timeout(10);assert not page.locator('#recordsDialog').evaluate('(e)=>e.open');ok('records_keyboard_toggle')
    # Narrative milestone UI no longer exposes development phase labels.
    page.evaluate("()=>showComplete('phase7')");txt=page.locator('#completeDialog').inner_text();assert 'FOUR MEMORIES RECOVERED' in txt and 'PHASE 7' not in txt and 'Phases 1' not in txt;ok('narrative_milestone_not_dev_label')
    page.locator('#completeCloseBtn').click()
    # Save normalization keeps old schema 11/12 compatible and leaves settings independent.
    mig=page.evaluate("()=>{const s=normalizeSave({schema:11,room:'manor-vestibule',health:80,perception:80,stability:80,stamina:80});return {schema:s.schema,room:s.room,health:s.health}}")
    assert mig=={'schema':12,'room':'manor-vestibule','health':80},mig;ok('legacy_save_migrates_to_schema12')
    assert page.evaluate("()=>{const s=defaultSave();return !('musicVolume' in s)}");ok('audio_preference_not_polluting_campaign_save')
    # Leave game must stop ambient nodes.
    page.locator('#leaveBtn').click();page.wait_for_timeout(20);assert page.evaluate('__BT404__.engine===null && __BT404__.audio.ambGain===null');ok('leave_game_stops_ambience')
    assert not errors,errors;ok('final_desktop_zero_console_page_errors')
    page.screenshot(path=str(ROOT/'QA_PHASE16_DESKTOP.png'),full_page=True);ok('final_desktop_capture')
    # Mobile smoke: title actions, records, settings and game controls stay within viewport.
    ctx=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=3)
    mob=ctx.new_page();moberr=[]
    mob.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    mob.goto('about:blank');mob.on('console',lambda m:moberr.append(('console',m.type,m.text)) if m.type=='error' else None);mob.on('pageerror',lambda e:moberr.append(('pageerror','error',str(e))))
    mob.set_content(html,wait_until='domcontentloaded');mob.add_style_tag(content=css);mob.add_script_tag(content=js);mob.wait_for_timeout(90)
    assert mob.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1');ok('final_mobile_title_no_horizontal_overflow')
    mob.locator('#recordsBtn').click();assert mob.locator('#recordsDialog').evaluate('(e)=>e.open');assert mob.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1');ok('final_mobile_records_fit')
    mob.locator('#recordsCloseBtn').click();mob.locator('#newGameBtn').click();mob.locator('.slot-card').first.click();mob.wait_for_timeout(60)
    for _ in range(20):
        if not mob.locator('#messageDialog').evaluate('(e)=>e.open'):break
        mob.locator('#messageNextBtn').click();mob.wait_for_timeout(4)
    boxes=mob.locator('.touch-controls button').evaluate_all('(els)=>els.map(e=>{const r=e.getBoundingClientRect();return {l:r.left,r:r.right,t:r.top,b:r.bottom,w:r.width,h:r.height}})')
    assert all(b['l']>=-1 and b['r']<=391 and b['w']>=43 and b['h']>=43 for b in boxes),boxes;ok('final_mobile_touch_targets_fit')
    assert not moberr,moberr;ok('final_mobile_zero_console_page_errors')
    mob.screenshot(path=str(ROOT/'QA_PHASE16_MOBILE.png'),full_page=True);ok('final_mobile_capture')
    ctx.close();browser.close()
print('PHASE16_E2E_PASS')
for n,st in results: print(f'{st:4} {n}')
