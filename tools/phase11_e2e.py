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
errors=[];results=[]
def ok(n): results.append((n,'PASS')); print('PASS',n,flush=True)
def close_message(page,max_clicks=80):
    for _ in range(max_clicks):
        if not page.locator('#messageDialog').evaluate('(e)=>e.open'): return
        page.locator('#messageNextBtn').click();page.wait_for_timeout(3)
    assert not page.locator('#messageDialog').evaluate('(e)=>e.open')
def load_room(page,r):
    page.evaluate('r=>__BT404__.engine.loadRoom(r,false)',r);page.wait_for_timeout(8);close_message(page)
def inspect_item(page,room,item_id):
    load_room(page,room)
    info=page.evaluate("id=>{const i=__BT404__.engine.room().interact.find(x=>x.id===id);return i?{x:i.x,y:i.y}:null}",item_id)
    assert info,(room,item_id)
    page.evaluate("p=>{const e=__BT404__.engine;e.player.x=p.x;e.player.y=p.y;e.mode='playing';e.interact()}",info)
    page.wait_for_timeout(5);close_message(page)

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1000})
    page.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    page.goto('about:blank');page.on('console',lambda m: errors.append(('console',m.type,m.text)) if m.type=='error' else None);page.on('pageerror',lambda e: errors.append(('pageerror','error',str(e))))
    page.set_content(html,wait_until='domcontentloaded');page.add_style_tag(content=css);page.add_script_tag(content=js);page.wait_for_timeout(50)
    page.locator('#newGameBtn').click();page.locator('.slot-card').first.click();page.wait_for_timeout(20);close_message(page)
    assert page.evaluate("VERSION==='1.1.1' && SAVE_SCHEMA===12 && __BT404__.save.schema===12");ok('phase11_boot_version_schema10')

    counts=page.evaluate("()=>({total:Object.keys(LORE_CATALOG).length,...Object.values(LORE_CATALOG).reduce((a,e)=>(a[e.type]=(a[e.type]||0)+1,a),{})})")
    assert counts=={'total':87,'document':40,'note':20,'recording':12,'secret':15},counts;ok('lore_target_counts_40_20_12_15')
    assert page.evaluate("()=>Object.values(LORE_CATALOG).every(e=>e.title&&e.era&&e.room&&e.thread&&e.annotation&&Array.isArray(e.text)&&e.text.length>=2)");ok('all_lore_entries_authored_and_threaded')
    assert page.evaluate("()=>new Set(Object.keys(LORE_CATALOG)).size===87");ok('lore_ids_unique')

    migration=page.evaluate("()=>normalizeSave({schema:10,room:'manor-vestibule',notes:['letter'],flags:[]})")
    assert migration['schema']==12 and migration['lore']==[];ok('schema10_to_11_ending_migration_preserves_lore')

    inspect_item(page,'manor-vestibule','letter')
    assert page.evaluate("__BT404__.engine.save.lore.includes('letter')");ok('inspection_unlocks_archive_entry')
    before=page.evaluate("__BT404__.engine.save.lore.length")
    inspect_item(page,'manor-vestibule','letter')
    assert page.evaluate("__BT404__.engine.save.lore.length")==before;ok('repeat_inspection_no_duplicate_lore')

    new_secrets=page.evaluate("()=>Object.values(ROOMS).flatMap(r=>(r.interact||[]).filter(i=>i.kind==='lore-secret').map(i=>[r.id,i.id]))")
    assert len(new_secrets)==7;ok('seven_new_counter_memory_locations')
    # Inspect one new secret and prove it persists independently of normal notes.
    inspect_item(page,'manor-attic-stairs','secret-manor-attic')
    assert page.evaluate("__BT404__.engine.save.lore.includes('secret-manor-attic') && __BT404__.engine.save.flags.includes('secret:secret-manor-attic')");ok('new_counter_memory_collects_and_flags')

    # Runtime rewrites must replace Phase 8 generic placeholder prose.
    phase8_text=page.evaluate("()=>Object.values(ROOMS).filter(r=>['1790','1917','1956','1987'].includes(r.era)).flatMap(r=>(r.interact||[]).flatMap(i=>i.text||[])).join('\\n')")
    banned=['contributes the 1 part','contributes the 2 part','contributes the 3 part','The object carries context the rest of this memory depends on.','A fragment from Survey Hall contradicts the official account.']
    assert all(x not in phase8_text for x in banned);ok('phase8_placeholder_lore_replaced_at_runtime')
    assert all(x in phase8_text for x in ['seven-foot surplus','tomorrow’s casualty list','Frequency Eleven','Thirteen seconds exist before Theo presses RECORD']);ok('phase8_authored_cross_era_clues_present')

    mara=page.evaluate("()=>Object.values(LORE_CATALOG).filter(e=>e.thread==='MARA / RECURRING NAME').map(e=>e.id)")
    assert len(mara)==5 and 'secret-final-first-erasure' in mara;ok('mara_counter_memory_thread')
    assert page.evaluate("()=>LORE_LINKS['patient-nine'].includes('secret-final-first-erasure') && LORE_LINKS['c8-secret'].includes('c5-secret')");ok('cross_era_connection_graph')

    # Seed archive with all evidence to test actual UI/filtering without replaying the entire campaign.
    page.evaluate("()=>{const e=__BT404__.engine;e.save.lore=Object.keys(LORE_CATALOG);e.persist('qa-lore-all');e.mode='playing'}")
    page.keyboard.press('j');page.wait_for_timeout(15)
    assert page.locator('#archiveDialog').evaluate('(e)=>e.open');ok('archive_keyboard_j_opens')
    assert '87/87' in page.locator('#archiveCount').inner_text();ok('archive_completion_count_visible')
    assert page.locator('#archiveList .archive-row').count()==87;ok('archive_lists_all_recovered_evidence')
    page.locator('#archiveFilters button[data-filter="recording"]').click();page.wait_for_timeout(5)
    assert page.locator('#archiveList .archive-row').count()==12;ok('archive_recording_filter_12')
    page.locator('#archiveFilters button[data-filter="secret"]').click();page.wait_for_timeout(5)
    assert page.locator('#archiveList .archive-row').count()==15;ok('archive_secret_filter_15')
    page.locator('#archiveList .archive-row').first.click();page.wait_for_timeout(4)
    assert page.locator('#archiveDetail .archive-thread').count()==1 and page.locator('#archiveDetail .archive-annotation').count()==1;ok('archive_detail_thread_annotation')
    page.keyboard.press('j');page.wait_for_timeout(5)
    assert not page.locator('#archiveDialog').evaluate('(e)=>e.open') and page.evaluate("__BT404__.engine.mode==='playing'");ok('archive_keyboard_j_closes_to_game')

    # Pause -> Archive -> return to Pause preserves paused state.
    page.keyboard.press('Escape');page.wait_for_timeout(4);assert page.locator('#pauseDialog').evaluate('(e)=>e.open')
    page.locator('#pauseArchiveBtn').click();page.wait_for_timeout(5)
    assert page.locator('#archiveDialog').evaluate('(e)=>e.open') and page.evaluate("__BT404__.engine.mode==='archive'");ok('pause_archive_button_opens')
    page.locator('#archiveCloseBtn').click();page.wait_for_timeout(5)
    assert page.locator('#pauseDialog').evaluate('(e)=>e.open') and page.evaluate("__BT404__.engine.mode==='paused'");ok('archive_returns_to_paused_state')
    page.locator('#resumeBtn').click();page.wait_for_timeout(3)

    # Mobile archive must fit without horizontal overflow.
    page.set_viewport_size({'width':390,'height':844});page.keyboard.press('j');page.wait_for_timeout(10)
    page.locator('#archiveFilters button[data-filter="all"]').click();page.wait_for_timeout(3)
    assert page.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1');ok('phase11_mobile_archive_no_horizontal_overflow')
    page.screenshot(path=str(ROOT/'QA_PHASE11_MOBILE.png'),full_page=True)
    page.set_viewport_size({'width':1440,'height':1000});page.wait_for_timeout(5);page.screenshot(path=str(ROOT/'QA_PHASE11_DESKTOP.png'),full_page=True);ok('phase11_archive_captures')
    page.locator('#archiveCloseBtn').click();page.wait_for_timeout(3)
    assert not errors,errors;ok('phase11_zero_console_page_errors')
    browser.close()
print('PHASE11_E2E_PASS')
for n,s in results: print(f'{s:4} {n}')
