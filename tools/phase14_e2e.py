#!/usr/bin/env python3
from pathlib import Path
from playwright.sync_api import sync_playwright
import re, json
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'index.html').read_text(encoding='utf-8')
html=re.sub(r'<script src="js/bundle.js\?v=[^"]+" defer></script>','',html)
html=re.sub(r'<link rel="stylesheet"[^>]+>','',html)
html=re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]+>','',html)
css=(ROOT/'css/app.css').read_text(encoding='utf-8'); js=(ROOT/'js/bundle.js').read_text(encoding='utf-8')
results=[];errors=[]
def ok(n): results.append((n,'PASS')); print('PASS',n,flush=True)
def boot(page):
    page.goto('about:blank')
    page.on('console',lambda m:errors.append(('console',m.type,m.text)) if m.type=='error' else None)
    page.on('pageerror',lambda e:errors.append(('pageerror','error',str(e))))
    page.set_content(html,wait_until='domcontentloaded'); page.add_style_tag(content=css); page.add_script_tag(content=js); page.wait_for_timeout(80)

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1000})
    page.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    boot(page)
    assert page.evaluate("VERSION==='1.1.1' && SAVE_SCHEMA===12"); ok('phase14_boot_version_schema12')
    assert page.locator('#installBtn').count()==1 and page.locator('#pwaStatus').count()==1 and page.locator('#orientationHint').count()==1; ok('pwa_and_orientation_ui_present')
    for sel in ['#touchMode','#touchSize','#leftHanded','#performanceMode','#orientationHintSetting']:
        assert page.locator(sel).count()==1
    ok('mobile_ergonomics_settings_present')
    assert 'safe-area-inset-top' in css and '100dvh' in css and '--app-height' in css; ok('safe_area_dynamic_viewport_css_present')
    assert '@media(pointer:coarse)and(orientation:landscape)' in css.replace(' ',''); ok('coarse_landscape_layout_rule_present')
    assert 'prefers-reduced-motion:reduce' in css; ok('system_reduce_motion_respected')
    manifest=json.loads((ROOT/'manifest.webmanifest').read_text())
    assert manifest['start_url']=='./' and manifest['scope']=='./' and manifest['display']=='standalone' and 'fullscreen' in manifest['display_override'] and manifest['id']=='./'; ok('manifest_installability_fields')
    sw=(ROOT/'sw.js').read_text()
    assert "CACHE='blackthorn404-v1.1.1-release'" in sw and "event.request.mode==='navigate'" in sw and 'Promise.allSettled' in sw and "k.startsWith('blackthorn404-')" in sw and 'SKIP_WAITING' in sw; ok('service_worker_network_first_and_cache_migration')
    # Settings behavior and persistence.
    page.locator('#settingsBtn').click();page.wait_for_timeout(10)
    page.locator('#touchSize').select_option('large');page.locator('#leftHanded').check();page.locator('#performanceMode').select_option('battery');page.locator('#touchMode').select_option('hidden');page.wait_for_timeout(10)
    classes=page.locator('body').get_attribute('class') or ''
    assert all(x in classes for x in ['touch-large','left-handed','perf-battery','touch-hidden']); ok('settings_apply_runtime_classes')
    saved=page.evaluate("JSON.parse(localStorage.getItem('blackthorn404.settings.v1'))")
    assert saved['touchSize']=='large' and saved['leftHanded'] and saved['performanceMode']=='battery' and saved['touchMode']=='hidden'; ok('ux_settings_persist_locally')
    page.locator('#settingsCloseBtn').click();
    # Battery mode drops expensive cosmetic layers.
    assert page.evaluate("getComputedStyle(document.querySelector('.grain')).display==='none'"); ok('battery_mode_reduces_cosmetic_layers')
    # Fullscreen fallback is usable even without requestFullscreen.
    page.evaluate("document.querySelector('#gameShell').requestFullscreen=undefined")
    page.evaluate("showView('game')")
    page.locator('#fullscreenBtn').click();page.wait_for_timeout(10)
    assert 'focus-mode' in (page.locator('body').get_attribute('class') or '') and 'EXIT' in page.locator('#fullscreenBtn').inner_text(); ok('focus_mode_fallback_without_fullscreen_api')
    page.locator('#fullscreenBtn').click();page.wait_for_timeout(5)
    assert 'focus-mode' not in (page.locator('body').get_attribute('class') or ''); ok('focus_mode_exits_cleanly')
    # Install prompt UI can be surfaced without actually installing.
    page.evaluate("""()=>{const e=new Event('beforeinstallprompt');Object.defineProperty(e,'prompt',{value:async()=>{}});Object.defineProperty(e,'userChoice',{value:Promise.resolve({outcome:'dismissed'})});window.dispatchEvent(e)}""")
    assert not page.locator('#installBtn').evaluate('(e)=>e.classList.contains("hidden")') and 'INSTALLABLE' in page.locator('#pwaStatus').inner_text(); ok('install_prompt_exposed_when_available')
    page.locator('#installBtn').click();page.wait_for_timeout(20)
    assert page.locator('#installBtn').evaluate('(e)=>e.classList.contains("hidden")'); ok('install_prompt_choice_cleans_up_button')
    # Status functions are non-blocking and accessible.
    page.evaluate("updatePwaStatus('OFFLINE READY')")
    assert 'OFFLINE READY' in page.locator('#pwaStatus').inner_text() and page.locator('#pwaStatus').get_attribute('role')=='status'; ok('offline_ready_status_accessible')
    # Desktop touch hide option can remove console controls when desired.
    page.evaluate("__BT404__.settings.touchMode='hidden';applySettings()")
    assert page.evaluate("getComputedStyle(document.querySelector('.touch-controls')).display==='none'"); ok('touch_controls_can_be_hidden')
    page.evaluate("__BT404__.settings.touchMode='always';__BT404__.settings.touchSize='standard';__BT404__.settings.leftHanded=false;__BT404__.settings.performanceMode='quality';applySettings()")
    assert page.evaluate("getComputedStyle(document.querySelector('.touch-controls')).display!=='none'"); ok('touch_controls_restore_without_reload')
    page.screenshot(path=str(ROOT/'QA_PHASE14_DESKTOP.png'),full_page=True); ok('phase14_desktop_capture')

    # Mobile / coarse pointer page for portrait + landscape ergonomics.
    context=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=3)
    mobile=context.new_page()
    mobile.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    mob_errors=[]
    mobile.goto('about:blank');mobile.on('console',lambda m:mob_errors.append(('console',m.type,m.text)) if m.type=='error' else None);mobile.on('pageerror',lambda e:mob_errors.append(('pageerror','error',str(e))))
    mobile.set_content(html,wait_until='domcontentloaded');mobile.add_style_tag(content=css);mobile.add_script_tag(content=js);mobile.wait_for_timeout(80)
    mobile.evaluate("showView('game')");mobile.wait_for_timeout(10)
    assert not mobile.locator('#orientationHint').evaluate('(e)=>e.classList.contains("hidden")'); ok('portrait_phone_landscape_hint')
    assert mobile.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1'); ok('portrait_no_horizontal_overflow')
    # Minimum target sizes in portrait.
    dims=mobile.evaluate("""()=>[...document.querySelectorAll('.touch-controls button')].map(b=>{const r=b.getBoundingClientRect();return [r.width,r.height]})""")
    assert dims and all(w>=43 and h>=43 for w,h in dims); ok('portrait_touch_targets_minimum_44px')
    mobile.screenshot(path=str(ROOT/'QA_PHASE14_MOBILE.png'),full_page=True); ok('phase14_mobile_portrait_capture')
    mobile.set_viewport_size({'width':844,'height':390});mobile.evaluate('updateViewportState()');mobile.wait_for_timeout(40)
    assert mobile.locator('#orientationHint').evaluate('(e)=>e.classList.contains("hidden")'); ok('landscape_hint_disappears')
    assert mobile.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1'); ok('landscape_no_horizontal_overflow')
    rects=mobile.evaluate("""()=>{const s=document.querySelector('.screen-bezel').getBoundingClientRect(),t=document.querySelector('.touch-controls').getBoundingClientRect();return {screen:[s.left,s.top,s.right,s.bottom],touch:[t.left,t.top,t.right,t.bottom],vw:innerWidth,vh:innerHeight}}""")
    assert rects['screen'][2] <= rects['vw']+1 and rects['touch'][2] <= rects['vw']+1 and rects['screen'][3] <= rects['vh']+1 and rects['touch'][3] <= rects['vh']+1; bounds=mobile.evaluate("""()=>[...document.querySelectorAll('.touch-controls button')].map(b=>{const r=b.getBoundingClientRect();return [r.left,r.top,r.right,r.bottom]})""");assert all(l>=-1 and t>=-1 and r<=rects['vw']+1 and b<=rects['vh']+1 for l,t,r,b in bounds); ok('landscape_game_and_controls_fit_viewport')
    ldims=mobile.evaluate("""()=>[...document.querySelectorAll('.touch-controls button')].map(b=>{const r=b.getBoundingClientRect();return [r.width,r.height]})""")
    assert all(w>=43 and h>=43 for w,h in ldims); ok('landscape_touch_targets_minimum_44px')
    mobile.screenshot(path=str(ROOT/'QA_PHASE14_LANDSCAPE.png'),full_page=True); ok('phase14_mobile_landscape_capture')
    # Left-handed swap changes grid placement without DOM reorder.
    mobile.evaluate("__BT404__.settings.leftHanded=true;applySettings()")
    pos=mobile.evaluate("""()=>{const d=document.querySelector('.dpad').getBoundingClientRect(),a=document.querySelector('.action-pad').getBoundingClientRect();return {d:d.left,a:a.left}}""")
    assert pos['a'] < pos['d']; ok('left_handed_layout_swaps_action_and_dpad')
    # Large mode remains bounded.
    mobile.evaluate("__BT404__.settings.touchSize='large';applySettings()")
    assert mobile.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1'); ok('large_touch_mode_no_horizontal_overflow')
    assert not mob_errors,mob_errors; ok('phase14_mobile_zero_console_page_errors')
    context.close()
    assert not errors,errors; ok('phase14_desktop_zero_console_page_errors')
    browser.close()

print('PHASE14_E2E_PASS')
for n,st in results: print(f'{st:4} {n}')
