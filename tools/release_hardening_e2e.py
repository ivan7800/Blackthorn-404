#!/usr/bin/env python3
from pathlib import Path
import re
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'index.html').read_text(encoding='utf-8')
html_inline=re.sub(r'<script src="js/bundle.js\?v=[^"]+" defer></script>','',html)
html_inline=re.sub(r'<link rel="stylesheet"[^>]+>','',html_inline)
html_inline=re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]+>','',html_inline)
css=(ROOT/'css/app.css').read_text(encoding='utf-8')
js=(ROOT/'js/bundle.js').read_text(encoding='utf-8')

def ok(name): print('PASS',name,flush=True)

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':390,'height':844})
    errors=[]
    page.on('console',lambda m: errors.append(('console',m.type,m.text)) if m.type=='error' else None)
    page.on('pageerror',lambda e: errors.append(('pageerror','error',str(e))))
    page.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    page.goto('about:blank')
    page.set_content(html_inline,wait_until='domcontentloaded'); page.add_style_tag(content=css); page.add_script_tag(content=js); page.wait_for_timeout(100)
    bad=page.evaluate("""()=>normalizeSave({schema:12,room:'<img src=x onerror=alert(1)>',previousRoom:'javascript:bad',safeRoom:'missing-safe',memorySafeRoom:'missing-memory',rooms:['manor-library','missing-room','<svg>'],weapon:'missing-weapon',weapons:['woodsman-axe','missing-weapon'],equippedSigil:'missing-sigil',sigils:['ward-mind-i','missing-sigil'],playSeconds:-99,deaths:'NaN',createdAt:-7,updatedAt:Infinity})""")
    assert bad['room']=='manor-vestibule' and bad['previousRoom'] is None
    assert bad['safeRoom']=='manor-vestibule' and bad['memorySafeRoom']=='echo-priory-gate'
    assert bad['rooms']==['manor-library','manor-vestibule']
    assert bad['weapon']=='woodsman-axe' and bad['weapons']==['woodsman-axe']
    assert bad['equippedSigil']=='ward-mind-i' and bad['sigils']==['ward-mind-i']
    assert bad['playSeconds']==0 and bad['deaths']==0 and bad['createdAt']>=0 and bad['updatedAt']>=0
    ok('corrupt_save_ids_and_numeric_metadata_normalized')

    page.evaluate("""()=>localStorage.setItem('blackthorn404.slot.1',JSON.stringify({schema:12,room:'<img src=x onerror=alert(1)>',rooms:['<img>'],weapon:'bad',weapons:['bad'],sigils:['bad'],equippedSigil:'bad'}))""")
    page.locator('#continueBtn').click(); page.wait_for_timeout(40)
    first=page.locator('.slot-card').first
    assert first.locator('img').count()==0 and '<IMG' not in first.inner_text().upper() and 'MANOR VESTIBULE' in first.inner_text().upper()
    ok('corrupt_slot_cannot_inject_markup')
    assert not errors, errors
    ok('hardening_inline_zero_console_page_errors')

    # Browser navigation to file:// / localhost is blocked by this sandbox policy.
    # Static existence/decodability and GitHub-Pages-style HTTP path checks are covered separately.
    browser.close()

viewport=re.search(r'<meta name="viewport" content="([^"]+)"',html).group(1)
assert 'user-scalable=no' not in viewport
ok('pinch_zoom_not_disabled')
assert 'data:image/jpeg;base64' not in css and 'data:image/png;base64' not in (ROOT/'js/engine.js').read_text(encoding='utf-8')
ok('runtime_visuals_not_base64_duplicated')
from PIL import Image
for rel in ['assets/art/title_hero.jpg','assets/art/scene_manor.png','assets/art/scene_medieval.png','assets/art/scene_ancient.png','assets/art/scene_modern.png','assets/art/scene_boss.png','assets/art/scene_void.png']:
    with Image.open(ROOT/rel) as im:
        im.verify()
ok('externalized_visual_assets_decode')
print('RELEASE_HARDENING_E2E_PASS')
