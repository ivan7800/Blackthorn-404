#!/usr/bin/env python3
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'index.html').read_text(encoding='utf-8')
import re
html=re.sub(r'<script src="js/bundle.js\?v=[^"]+" defer></script>','',html)
html=re.sub(r'<link rel="stylesheet"[^>]+>','',html)
html=re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]+>','',html)
css=(ROOT/'css/app.css').read_text(encoding='utf-8');js=(ROOT/'js/bundle.js').read_text(encoding='utf-8')
errors=[];results=[]
def ok(n): results.append((n,'PASS')); print('PASS',n,flush=True)
def close_message(page,max_clicks=120):
    for _ in range(max_clicks):
        if not page.locator('#messageDialog').evaluate('(e)=>e.open'): return
        page.locator('#messageNextBtn').click(); page.wait_for_timeout(4)
    assert not page.locator('#messageDialog').evaluate('(e)=>e.open')
def load_room(page,r):
    page.evaluate('r=>__BT404__.engine.loadRoom(r,false)',r);page.wait_for_timeout(15);close_message(page)
def interact(page,x,y):
    page.evaluate('([x,y])=>{const e=__BT404__.engine;e.player.x=x;e.player.y=y;e.mode="playing";e.interact()}',[x,y]);page.wait_for_timeout(8);close_message(page)
def cast_at(page,room,x,y,sigil):
    load_room(page,room)
    page.evaluate('([x,y,s])=>{const e=__BT404__.engine;e.player.x=x;e.player.y=y;e.save.sigilMaxIntensity=3;e.save.sigilIntensity=3;if(!e.save.sigils.includes(s))e.save.sigils.push(s);e.save.equippedSigil=s;e.save.stability=100;e.sigilCooldown=0;e.mode="playing";e.cast()}',[x,y,sigil]);page.wait_for_timeout(10);close_message(page)
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1000})
    page.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    page.goto('about:blank');page.on('console',lambda m: errors.append(('console',m.type,m.text)) if m.type=='error' else None);page.on('pageerror',lambda e: errors.append(('pageerror','error',str(e))))
    page.set_content(html,wait_until='domcontentloaded');page.add_style_tag(content=css);page.add_script_tag(content=js);page.wait_for_timeout(70)
    page.locator('#newGameBtn').click();page.locator('.slot-card').first.click();page.wait_for_timeout(35);close_message(page)
    assert page.evaluate('__BT404__.save.schema===12 && __BT404__.save.phase9Complete===false');ok('phase9_boot_schema9')
    counts=page.evaluate("()=>({rooms:Object.values(ROOMS).filter(r=>r.area==='Final Chapter · Pale Interval').length,boss:!!ENEMY_TYPES['the-unremembered'],bosses:Object.values(ENEMY_TYPES).filter(e=>e.family==='Boss').length})")
    assert counts['rooms']==9 and counts['boss'] and counts['bosses']>=9;ok('phase9_9_final_rooms_ninth_boss')
    migrated=page.evaluate("()=>normalizeSave({schema:8,phase8Complete:true,flags:['chapter:tape-zero-complete'],room:'manor-root-door',health:91,perception:81,stability:71,stamina:61,weapon:'candlestick',weapons:['candlestick'],ammo:{},notes:[],achievements:[],bosses:[],rooms:['manor-root-door'],sigils:['bind-void-i'],equippedSigil:'bind-void-i'})")
    assert migrated['schema']==12 and migrated['phase8Complete'] and not migrated['phase9Complete'] and migrated['finalSequenceStep']==0 and migrated['finalSigilFlags']==[] and migrated['finalChoices']=={};ok('schema8_to_schema9_migration')
    # root locked before phase8
    load_room(page,'manor-root-door');interact(page,140,100)
    assert page.evaluate("__BT404__.save.room==='manor-root-door'");ok('root_door_locked_before_eight_spines')
    page.evaluate("()=>{const e=__BT404__.engine;e.save.phase8Complete=true;e.addFlag('chapter:tape-zero-complete');e.persist('qa-phase8')}")
    interact(page,140,100);page.wait_for_timeout(15);close_message(page)
    assert page.evaluate("__BT404__.save.room==='final-pale-threshold' && __BT404__.save.flags.includes('final:entered') && __BT404__.save.achievements.includes('root-door-open')");ok('root_door_opens_after_phase8')
    # final relation sequence + witness choice
    load_room(page,'final-index-loss');interact(page,141,88)
    assert page.evaluate('__BT404__.save.finalSequenceStep===1');ok('final_relation_one')
    load_room(page,'final-contradiction');interact(page,82,68)
    assert page.evaluate("__BT404__.save.finalChoices.witness==='preserve' && __BT404__.save.flags.includes('final:choice-witness')");ok('final_discrete_witness_choice')
    load_room(page,'final-suture');interact(page,141,88)
    assert page.evaluate('__BT404__.save.finalSequenceStep===2');ok('final_relation_two')
    # three-school lattice
    cast_at(page,'final-three-schools',68,52,'reveal-mind-i')
    cast_at(page,'final-three-schools',146,114,'purge-flesh-i')
    cast_at(page,'final-three-schools',234,52,'bind-void-i')
    assert page.evaluate("__BT404__.save.flags.includes('final:lattice-complete') && ['final-lattice-mind','final-lattice-flesh','final-lattice-void'].every(x=>__BT404__.save.finalSigilFlags.includes(x))");ok('final_three_school_lattice')
    # name choice and relation three
    load_room(page,'final-name-vault');interact(page,78,54)
    assert page.evaluate("__BT404__.save.finalChoices.name==='keep'");ok('final_discrete_name_choice')
    load_room(page,'final-engine');interact(page,141,88)
    assert page.evaluate("__BT404__.save.finalSequenceStep===3 && __BT404__.save.flags.includes('final:route-coherent') && __BT404__.save.achievements.includes('three-relations')");ok('final_relation_three_route')
    load_room(page,'final-antechamber');interact(page,78,58)
    assert page.evaluate("__BT404__.save.finalChoices.burden==='carry'");ok('final_discrete_burden_choice')
    # final boss phase 3
    load_room(page,'final-unremembered')
    page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies.find(x=>x.boss);b.hp=b.maxHp*.2;e.updateBoss(b,.016)}");page.wait_for_timeout(8);close_message(page)
    assert page.evaluate("__BT404__.engine.bossPhase===3 && __BT404__.engine.bossVulnerable===0 && __BT404__.save.perception<=28");ok('unremembered_phase3_forces_perception')
    # boss sigils
    for x,y,sig in [(60,44,'reveal-mind-i'),(146,122,'purge-flesh-i'),(240,44,'bind-void-i')]:
        page.evaluate('([x,y,s])=>{const e=__BT404__.engine;e.player.x=x;e.player.y=y;e.save.sigilMaxIntensity=3;e.save.sigilIntensity=3;if(!e.save.sigils.includes(s))e.save.sigils.push(s);e.save.equippedSigil=s;e.save.stability=100;e.sigilCooldown=0;e.mode="playing";e.cast()}',[x,y,sig]);page.wait_for_timeout(8);close_message(page)
    assert page.evaluate("['final:boss-mind','final:boss-flesh','final:boss-void'].every(x=>__BT404__.save.flags.includes(x))");ok('unremembered_requires_three_sigils')
    interact(page,146,42)
    assert page.evaluate("__BT404__.save.flags.includes('final:perception-accepted') && __BT404__.save.perception<=24");ok('unremembered_perception_anchor')
    interact(page,138,80)
    assert page.evaluate("__BT404__.engine.bossVulnerable>8 && __BT404__.save.flags.includes('final:boss-local')");ok('unremembered_choices_unlock_local_form')
    # kill only after systems solved
    page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies.find(x=>x.boss&&!x.dead);b.hp=1;e.bossVulnerable=9;e.player.x=b.x-15;e.player.y=b.y;e.player.facing='right';e.attackCd=0;e.save.stamina=100;e.mode='playing'}")
    page.keyboard.press('KeyZ');page.wait_for_timeout(25);close_message(page);page.wait_for_timeout(20);close_message(page)
    assert page.evaluate("__BT404__.save.phase9Complete===true && __BT404__.save.flags.includes('chapter:final-complete') && __BT404__.save.bosses.includes('the-unremembered') && __BT404__.save.achievements.includes('phase9-complete')");ok('phase9_final_boss_completion')
    if page.locator('#completeDialog').evaluate('(e)=>e.open'):
        close_message(page)
        assert 'ROOT MEMORY STABILIZED' in page.locator('#completeKicker').inner_text();page.locator('#completeCloseBtn').click()
    assert page.evaluate("__BT404__.save.room==='manor-root-door'");ok('phase9_returns_root_door')
    # save/reload
    page.locator('#leaveBtn').click();page.wait_for_timeout(8);page.locator('#continueBtn').click();page.wait_for_timeout(8);page.locator('.slot-card').first.click();page.wait_for_timeout(25);close_message(page)
    assert page.evaluate("__BT404__.save.schema===12 && __BT404__.save.phase9Complete===true && __BT404__.save.finalChoices.witness==='preserve' && __BT404__.save.finalChoices.name==='keep' && __BT404__.save.finalChoices.burden==='carry'");ok('phase9_save_reload_choices')
    # mobile + desktop captures
    page.set_viewport_size({'width':390,'height':844});load_room(page,'final-three-schools');assert page.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1');page.screenshot(path=str(ROOT/'QA_PHASE9_MOBILE.png'),full_page=True);ok('phase9_mobile_390x844')
    page.set_viewport_size({'width':1440,'height':1000});load_room(page,'final-unremembered');page.evaluate("()=>{const e=__BT404__.engine,b=e.enemies[0];b.hp=b.maxHp*.2;e.bossPhase=3;e.bossVulnerable=0;e.save.perception=22;e.hud()}");page.wait_for_timeout(18);page.screenshot(path=str(ROOT/'QA_PHASE9_DESKTOP.png'),full_page=True);ok('phase9_desktop_capture')
    assert not errors,errors;ok('phase9_zero_console_page_errors')
    browser.close()
print('PHASE9_E2E_PASS')
for n,s in results: print(f'{s:4} {n}')
