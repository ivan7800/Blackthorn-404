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
errors=[]; results=[]
def ok(n): results.append((n,'PASS')); print('PASS',n,flush=True)
def close_message(page,max_clicks=80):
    for _ in range(max_clicks):
        if not page.locator('#messageDialog').evaluate('(e)=>e.open'): return
        page.locator('#messageNextBtn').click();page.wait_for_timeout(3)
    assert not page.locator('#messageDialog').evaluate('(e)=>e.open')
def new_slot(page,idx):
    page.locator('#newGameBtn').click();page.wait_for_timeout(3)
    page.locator('.slot-card').nth(idx).click();page.wait_for_timeout(12);close_message(page)
def seed_ending(page,kind):
    page.evaluate("""kind=>{
      const e=__BT404__.engine,s=e.save;
      s.phase9Complete=true;s.phase12Complete=false;s.ending=null;s.endingsSeen=[];s.endingStats={};
      s.flags=[...new Set([...(s.flags||[]),'chapter:final-complete','final-boss-mind','final-boss-flesh','final-boss-void'])];
      s.sigilMaxIntensity=3;s.sigils=SIGILS.map(x=>x.id);
      if(kind==='true'){s.finalChoices={witness:'preserve',name:'keep',burden:'release'};s.lore=Object.keys(LORE_CATALOG);}
      else if(kind==='dark'){s.finalChoices={witness:'collapse',name:'erase',burden:'release'};s.lore=['letter'];}
      else{s.finalChoices={witness:'preserve',name:'keep',burden:'carry'};s.lore=['letter','estate-plan'];}
      e.loadRoom('manor-root-door',false);e.mode='playing';e.persist('qa-ending-seed');
    }""",kind)
    page.wait_for_timeout(5);close_message(page)
def trigger_root(page):
    page.evaluate("""()=>{const e=__BT404__.engine,i=e.room().interact.find(x=>x.id==='root-door-seal');e.player.x=i.x+12;e.player.y=i.y+8;e.mode='playing';e.interact()}""")
    page.wait_for_timeout(10)
def finish_ending(page):
    for _ in range(12):
        if not page.locator('#endingDialog').evaluate('(e)=>e.open'): return
        page.locator('#endingNextBtn').click();page.wait_for_timeout(5)
    assert not page.locator('#endingDialog').evaluate('(e)=>e.open')

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1000})
    page.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    page.goto('about:blank');page.on('console',lambda m: errors.append(('console',m.type,m.text)) if m.type=='error' else None);page.on('pageerror',lambda e: errors.append(('pageerror','error',str(e))))
    page.set_content(html,wait_until='domcontentloaded');page.add_style_tag(content=css);page.add_script_tag(content=js);page.wait_for_timeout(50)

    # Boot and pure resolver rules.
    new_slot(page,0)
    assert page.evaluate("VERSION==='1.1.1' && SAVE_SCHEMA===12 && __BT404__.save.schema===12");ok('phase12_boot_version_schema12')
    migration=page.evaluate("()=>normalizeSave({schema:10,room:'manor-root-door',phase9Complete:true,finalChoices:{witness:'preserve',name:'keep',burden:'release'},lore:['letter']})")
    assert migration['schema']==12 and migration['phase9Complete'] and migration['ending'] is None and migration['endingsSeen']==[];ok('schema10_to_11_ending_migration')
    assert page.evaluate("()=>Object.keys(ENDING_PROFILES).sort().join(',')==='dark,normal,true'");ok('three_ending_profiles_exact')
    assert page.evaluate("()=>TRUE_ENDING_KEY_EVIDENCE.length===9 && new Set(TRUE_ENDING_KEY_EVIDENCE).size===9");ok('true_ending_nine_key_evidence')
    assert page.evaluate("()=>{const s={phase9Complete:true,finalChoices:{witness:'preserve',name:'keep',burden:'release'},lore:Object.keys(LORE_CATALOG),sigils:SIGILS.map(x=>x.id),sigilMaxIntensity:3,flags:['final-boss-mind','final-boss-flesh','final-boss-void']};return evaluateEnding(s).id==='true'}");ok('resolver_true_path')
    assert page.evaluate("()=>evaluateEnding({phase9Complete:true,finalChoices:{witness:'collapse',name:'erase',burden:'release'},lore:[],sigils:[],flags:[]}).id==='dark'");ok('resolver_dark_two_erasure_signals')
    assert page.evaluate("()=>evaluateEnding({phase9Complete:true,finalChoices:{witness:'preserve',name:'keep',burden:'carry'},lore:['letter'],sigils:[],flags:[]}).id==='normal'");ok('resolver_normal_fallback')
    assert page.evaluate("()=>{const s={phase9Complete:true,finalChoices:{witness:'preserve',name:'keep',burden:'release'},lore:Object.keys(LORE_CATALOG).filter(id=>LORE_CATALOG[id].type!=='secret'),sigils:SIGILS.map(x=>x.id),sigilMaxIntensity:3,flags:['final-boss-mind','final-boss-flesh','final-boss-void']};return evaluateEnding(s).id==='normal'}");ok('true_path_requires_all_counter_memories')

    # Normal ending through actual Root Door interaction.
    seed_ending(page,'normal');trigger_root(page)
    assert page.locator('#endingDialog').evaluate('(e)=>e.open');ok('root_door_resolves_ending_not_reenter_final')
    assert page.locator('#endingTitle').inner_text()=='THE HOUSE OF WITNESSES';ok('normal_ending_ui')
    assert page.locator('#endingDialog button').count()==1;ok('no_ending_picker_only_continue')
    assert page.evaluate("__BT404__.engine.save.phase12Complete && __BT404__.engine.save.ending==='normal' && __BT404__.engine.save.endingsSeen.includes('normal')");ok('normal_ending_persists')
    # Escape must not cancel modal.
    page.keyboard.press('Escape');page.wait_for_timeout(5);assert page.locator('#endingDialog').evaluate('(e)=>e.open');ok('ending_escape_cannot_break_state')
    finish_ending(page);assert page.locator('#titleView').is_visible();ok('normal_ending_returns_title')

    # Dark ending in slot 2.
    new_slot(page,1);seed_ending(page,'dark');trigger_root(page)
    assert page.locator('#endingTitle').inner_text()=='THE NINTH TENANT';ok('dark_ending_ui')
    assert page.evaluate("__BT404__.engine.save.ending==='dark' && __BT404__.engine.save.endingStats.darkSignals===2");ok('dark_ending_records_erasure_signals')
    finish_ending(page)

    # True ending in slot 3, desktop capture.
    new_slot(page,2);seed_ending(page,'true');trigger_root(page)
    assert page.locator('#endingTitle').inner_text()=='NO ONE REMEMBERS ALONE';ok('true_ending_ui')
    assert page.evaluate("__BT404__.engine.save.ending==='true' && __BT404__.engine.save.endingStats.secretCount===15 && __BT404__.engine.save.endingStats.keyEvidence===9 && __BT404__.engine.save.endingStats.sigilMastery===true");ok('true_ending_records_requirements')
    assert page.evaluate("__BT404__.engine.save.achievements.includes('ending-no-one-alone') && __BT404__.engine.save.achievements.includes('true-ending')");ok('true_ending_achievements')
    # Advance to final true page and verify requirements summary.
    for _ in range(4): page.locator('#endingNextBtn').click();page.wait_for_timeout(4)
    assert '15/15' in page.locator('#endingRequirements').inner_text() and '9/9' in page.locator('#endingRequirements').inner_text();ok('true_ending_final_card_requirements')
    page.screenshot(path=str(ROOT/'QA_PHASE12_DESKTOP.png'),full_page=True);ok('phase12_desktop_capture')
    page.set_viewport_size({'width':390,'height':844});page.wait_for_timeout(10)
    assert page.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1');ok('phase12_mobile_no_horizontal_overflow')
    page.screenshot(path=str(ROOT/'QA_PHASE12_MOBILE.png'),full_page=True);ok('phase12_mobile_capture')
    page.set_viewport_size({'width':1440,'height':1000});page.wait_for_timeout(3)
    finish_ending(page)
    # Slot cards expose ending completion without offering a selector.
    page.locator('#continueBtn').click();page.wait_for_timeout(5)
    cards=[x.inner_text() for x in page.locator('.slot-card').all()]
    assert any('NORMAL ENDING' in x for x in cards) and any('DARK ENDING' in x for x in cards) and any('TRUE ENDING' in x for x in cards);ok('slot_summaries_show_three_completed_endings')
    assert not errors,errors;ok('phase12_zero_console_page_errors')
    browser.close()

print('PHASE12_E2E_PASS')
for n,s in results: print(f'{s:4} {n}')
