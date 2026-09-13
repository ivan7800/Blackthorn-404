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
def ok(n):results.append((n,'PASS'));print('PASS',n,flush=True)
def drain(page,loops=8):
    for _ in range(loops):
        page.wait_for_timeout(30)
        if page.locator('#messageDialog').evaluate('(e)=>e.open'):
            for __ in range(30):
                if not page.locator('#messageDialog').evaluate('(e)=>e.open'):break
                page.locator('#messageNextBtn').click();page.wait_for_timeout(4)
        page.wait_for_timeout(70)
def new_slot(page,idx=0):
    page.locator('#newGameBtn').click();page.wait_for_timeout(5);page.locator('.slot-card').nth(idx).click();page.wait_for_timeout(15);drain(page)

def completed_source_js(ending='normal',seen=None):
    seen=seen or [ending]
    return f"""()=>{{const s=defaultSave();s.phase9Complete=true;s.phase12Complete=true;s.ending='{ending}';s.endingsSeen={seen!r};s.achievements=['paper-trail','ending-house-witnesses'];s.lore=['letter','estate-plan','patient-nine'];s.sigils=SIGILS.map(x=>x.id);s.sigilMaxIntensity=3;s.playSeconds=777;s.room='manor-root-door';return normalizeSave(s)}}"""

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1000})
    page.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    page.goto('about:blank');page.on('console',lambda m:errors.append(('console',m.type,m.text)) if m.type=='error' else None);page.on('pageerror',lambda e:errors.append(('pageerror','error',str(e))))
    page.set_content(html,wait_until='domcontentloaded');page.add_style_tag(content=css);page.add_script_tag(content=js);page.wait_for_timeout(60)

    assert page.evaluate("VERSION==='1.1.1' && SAVE_SCHEMA===12");ok('phase13_boot_version_schema12')
    mig=page.evaluate("()=>normalizeSave({schema:11,room:'manor-root-door',phase12Complete:true,ending:'normal',endingsSeen:['normal']})")
    assert mig['schema']==12 and mig['ngPlus'] is False and mig['ngPlusCycle']==0 and mig['legacyLore']==[] and mig['ngPlusEchoes']==[];ok('schema11_to_12_ngplus_migration')
    assert page.locator('#newGamePlusBtn').is_disabled();ok('ngplus_locked_without_completed_ending')
    assert page.evaluate("()=>NGPLUS_ECHO_TARGET===9 && Object.keys(NGPLUS_ECHOES).length===9 && Object.keys(NGPLUS_TRAITS).length===3");ok('ngplus_content_targets_exact')

    normal=page.evaluate(completed_source_js('normal',['normal']))
    ngn=page.evaluate("s=>createNewGamePlus(s)",normal)
    assert ngn and ngn['ngPlus'] and ngn['ngPlusCycle']==1 and ngn['ngPlusSourceEnding']=='normal' and ngn['ngPlusTrait']=='witness-thread';ok('normal_ending_creates_witness_thread_cycle')
    assert ngn['room']=='manor-vestibule' and not ngn['phase2Complete'] and not ngn['phase9Complete'] and not ngn['phase12Complete'] and ngn['bosses']==[];ok('ngplus_resets_campaign_progress')
    assert ngn['lore']==[] and set(ngn['legacyLore'])=={'letter','estate-plan','patient-nine'} and ngn['endingsSeen']==['normal'];ok('ngplus_preserves_meta_knowledge_not_current_evidence')
    assert 'paper-trail' in ngn['achievements'] and 'second-reading' in ngn['achievements'] and 'ward-mind-i' in ngn['sigils'] and ngn['sigilMaxIntensity']==1;ok('normal_legacy_unlocks_ward_without_skipping_sigil_progression')
    assert ngn['legacyPlaySeconds']==777 and len(ngn['ngPlusHistory'])==1 and ngn['ngPlusHistory'][0]['ending']=='normal';ok('ngplus_history_and_total_time_preserved')

    dark=page.evaluate(completed_source_js('dark',['normal','dark']))
    ngd=page.evaluate("s=>createNewGamePlus(s)",dark)
    assert ngd['ngPlusTrait']=='tenant-mark' and 'brand-void-i' in ngd['sigils'] and 'ward-mind-i' not in ngd['sigils'];ok('dark_legacy_unlocks_brand')
    true=page.evaluate(completed_source_js('true',['normal','dark','true']))
    ngt=page.evaluate("s=>createNewGamePlus(s)",true)
    assert ngt['ngPlusTrait']=='open-hand' and all(x in ngt['sigils'] for x in ['reveal-mind-i','mend-flesh-i','shift-void-i']) and 'three-versions' in ngt['achievements'];ok('true_all_endings_legacy_and_three_versions_bonus')

    # Put a completed source into slot 1 and make title react without restarting page.
    page.evaluate("s=>{saveSlot(1,s);showView('title')}",normal);page.wait_for_timeout(10)
    assert not page.locator('#newGamePlusBtn').is_disabled();ok('completed_slot_unlocks_title_ngplus_button')
    page.locator('#newGamePlusBtn').click();page.wait_for_timeout(6)
    cards=page.locator('.slot-card');assert cards.nth(0).is_enabled() and cards.nth(1).is_disabled() and 'Choose a completed memory' in page.locator('#slotsTitle').inner_text();ok('ngplus_slot_picker_only_allows_completed_slots')
    page.locator('.slot-card').nth(0).click();page.wait_for_timeout(20);drain(page,12)
    assert page.evaluate("__BT404__.save.ngPlus===true && __BT404__.save.ngPlusCycle===1 && __BT404__.save.ngPlusSourceEnding==='normal'");ok('ui_starts_new_game_plus_in_same_slot')
    assert 'NG+1' in page.locator('#roomLabel').inner_text();ok('hud_marks_ngplus_cycle')
    # NG+ scaling is deliberately modest and capped.
    scale=page.evaluate("()=>{const e=__BT404__.engine,x=e.spawnEnemy({type:'signal-husk',x:10,y:10},99),b=ENEMY_TYPES['signal-husk'];return {hp:x.hp,base:b.hp,damage:x.damage,baseDamage:b.damage,speed:x.speed,baseSpeed:b.speed}}");
    assert scale['hp']>scale['base'] and scale['damage']>scale['baseDamage'] and scale['speed']>scale['baseSpeed'];ok('ngplus_enemy_scaling_active')

    # Actual in-world interaction with a Refracted Memory.
    page.evaluate("()=>{const e=__BT404__.engine;e.loadRoom('manor-library',false);e.mode='playing';const x=e.ngPlusEchoForRoom();e.player.x=x.x;e.player.y=x.y;e.interact()}");page.wait_for_timeout(8)
    assert page.locator('#messageDialog').evaluate('(e)=>e.open') and 'HOUSE OF WITNESSES' in page.locator('#messageLines').inner_text()+page.evaluate("()=>messageQueue.join(' ')");ok('refracted_memory_reacts_to_previous_ending')
    drain(page)
    assert page.evaluate("__BT404__.engine.save.ngPlusEchoes.includes('ngp-library')");ok('refracted_memory_collects_once')
    before=page.evaluate("__BT404__.engine.save.ngPlusEchoes.length")
    page.evaluate("()=>{const e=__BT404__.engine;e.mode='playing';e.interact()}");page.wait_for_timeout(5)
    after=page.evaluate("__BT404__.engine.save.ngPlusEchoes.length");assert before==after==1;ok('refracted_memory_cannot_duplicate')

    # Collect remaining echoes through engine API; each still uses the same persistent collection logic.
    page.evaluate("""()=>{const e=__BT404__.engine;for(const roomId of Object.keys(NGPLUS_ECHOES)){if(e.save.ngPlusEchoes.includes(NGPLUS_ECHOES[roomId].id))continue;e.save.room=roomId;const x=e.ngPlusEchoForRoom(ROOMS[roomId]);e.collectNgPlusEcho(x);if(document.querySelector('#messageDialog').open){document.querySelector('#messageDialog').close();e.mode='playing';}}e.persist('qa-all-refracted')}""");page.wait_for_timeout(6)
    assert page.evaluate("__BT404__.engine.save.ngPlusEchoes.length===9 && __BT404__.engine.save.ngPlusEchoComplete && __BT404__.engine.save.achievements.includes('refracted-nine')");ok('all_nine_refracted_memories_complete_meta_set')

    # Legacy evidence is readable but does not count as rediscovered current evidence.
    page.evaluate("()=>{const e=__BT404__.engine;e.mode='playing';openLoreArchive()}");page.wait_for_timeout(8)
    txt=page.locator('#archiveCount').inner_text();assert 'CURRENT 0/87' in txt and 'REMEMBERED 3/87' in txt and 'REFRACTED 9/9' in txt;ok('archive_separates_current_and_legacy_evidence')
    assert page.locator('.archive-legacy').count()>=1;ok('legacy_evidence_marked_read_only_context')
    page.locator('#archiveCloseBtn').click();page.wait_for_timeout(4)
    page.evaluate("()=>{__BT404__.engine.collectLore('letter');__BT404__.engine.persist('qa-current-evidence');openLoreArchive()}");page.wait_for_timeout(6)
    assert 'CURRENT 1/87' in page.locator('#archiveCount').inner_text();ok('rediscovered_evidence_counts_only_in_current_cycle')
    page.locator('#archiveCloseBtn').click();page.wait_for_timeout(3)

    # Save/reload preserves cycle metadata and collected refracted memories.
    persisted=page.evaluate("()=>{__BT404__.engine.persist('qa-ngplus-save');const s=loadSlot(1);return {schema:s.schema,ng:s.ngPlus,cycle:s.ngPlusCycle,echoes:s.ngPlusEchoes.length,legacy:s.legacyLore.length,seen:s.endingsSeen.length}}");
    assert persisted=={'schema':12,'ng':True,'cycle':1,'echoes':9,'legacy':3,'seen':1};ok('ngplus_save_reload_integrity')
    # A completed NG+ can start cycle 2 without accumulating campaign state.
    cyc2=page.evaluate("()=>{const s=loadSlot(1);s.phase12Complete=true;s.phase9Complete=true;s.ending='dark';s.endingsSeen=[...new Set([...s.endingsSeen,'dark'])];s.playSeconds=120;const n=createNewGamePlus(s);return {cycle:n.ngPlusCycle,source:n.ngPlusSourceEnding,phase2:n.phase2Complete,room:n.room,history:n.ngPlusHistory.length,legacyTime:n.legacyPlaySeconds,seen:n.endingsSeen}}");
    assert cyc2['cycle']==2 and cyc2['source']=='dark' and not cyc2['phase2'] and cyc2['room']=='manor-vestibule' and cyc2['history']==2 and cyc2['legacyTime']==897 and set(cyc2['seen'])=={'normal','dark'};ok('successive_ngplus_cycle_increments_without_progress_leak')

    # Mobile UX.
    page.set_viewport_size({'width':390,'height':844});page.wait_for_timeout(10)
    assert page.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1');ok('phase13_mobile_no_horizontal_overflow')
    page.screenshot(path=str(ROOT/'QA_PHASE13_MOBILE.png'),full_page=True);ok('phase13_mobile_capture')
    page.set_viewport_size({'width':1440,'height':1000});page.wait_for_timeout(5)
    page.screenshot(path=str(ROOT/'QA_PHASE13_DESKTOP.png'),full_page=True);ok('phase13_desktop_capture')
    assert not errors,errors;ok('phase13_zero_console_page_errors')
    browser.close()

print('PHASE13_E2E_PASS')
for n,st in results:print(f'{st:4} {n}')
