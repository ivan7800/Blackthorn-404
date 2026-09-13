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
def close_message(page,max_clicks=40):
    for _ in range(max_clicks):
        if not page.locator('#messageDialog').evaluate('(e)=>e.open'): return
        page.locator('#messageNextBtn').click();page.wait_for_timeout(8)
    assert not page.locator('#messageDialog').evaluate('(e)=>e.open')
def load_room(page,room):
    page.evaluate("r=>__BT404__.engine.loadRoom(r,false)",room);page.wait_for_timeout(40);close_message(page)
def prepare_cast(page,sigil,intensity=1,x=120,y=140):
    page.evaluate("([id,n,x,y])=>{const e=__BT404__.engine;e.save.equippedSigil=id;e.save.sigilMaxIntensity=3;e.save.sigilIntensity=n;e.save.stability=100;e.sigilCooldown=0;e.player.x=x;e.player.y=y;e.player.facing='right';}",[sigil,intensity,x,y])
def cast(page):
    page.keyboard.press('KeyR');page.wait_for_timeout(18)
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1000})
    page.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    page.goto('about:blank')
    page.on('console',lambda m: errors.append(('console',m.type,m.text)) if m.type=='error' else None)
    page.on('pageerror',lambda e: errors.append(('pageerror','error',str(e))))
    page.set_content(html,wait_until='domcontentloaded');page.add_style_tag(content=css);page.add_script_tag(content=js);page.wait_for_timeout(100)
    page.locator('#newGameBtn').click();page.locator('.slot-card').first.click();page.wait_for_timeout(60);close_message(page)
    assert page.evaluate('__BT404__.save.schema===12 && __BT404__.save.sigilMaxIntensity===1 && __BT404__.save.sigilIntensity===1')
    ok('phase5_boot_schema5')

    migrated=page.evaluate("()=>normalizeSave({schema:4,sliceComplete:true,phase2Complete:true,phase3Complete:true,phase4Complete:true,room:'manor-memory-vault',health:90,perception:80,stability:70,stamina:60,weapon:'candlestick',weapons:['candlestick'],ammo:{},flags:[],notes:[],achievements:[],bosses:[],rooms:['manor-memory-vault'],sigils:['bind-void-i','ward-mind-i'],equippedSigil:'ward-mind-i'})")
    assert migrated['schema']==12 and migrated['phase4Complete'] is True and migrated['phase5Complete'] is False and migrated['sigilMaxIntensity']==1 and migrated['sigilPuzzleFlags']==[]
    ok('schema4_to_schema5_migration')

    data=page.evaluate("()=>({count:SIGILS.length,schools:[...new Set(SIGILS.map(s=>s.school))].sort(),valid:SIGILS.every(s=>Array.isArray(s.cost)&&s.cost.length===3&&s.cost[0]<s.cost[2]&&Array.isArray(s.cooldown)&&s.cooldown.length===3),effects:new Set(SIGILS.map(s=>s.effect)).size})")
    assert data['count']==12 and data['schools']==['FLESH','MIND','VOID'] and data['valid'] and data['effects']==12
    ok('twelve_distinct_formulas_three_schools_three_intensities')

    load_room(page,'manor-memory-vault')
    page.evaluate("()=>{const e=__BT404__.engine;e.player.x=205;e.player.y=91;e.interact()}");page.wait_for_timeout(18)
    assert page.evaluate("__BT404__.save.room==='manor-memory-vault'") and page.locator('#messageDialog').evaluate('(e)=>e.open');close_message(page)
    ok('sigil_lattice_gated_before_phase4')

    page.evaluate("()=>{const e=__BT404__.engine;e.save.sliceComplete=true;e.save.phase2Complete=true;e.save.phase3Complete=true;e.save.phase4Complete=true;e.persist('qa-phase4');e.player.x=205;e.player.y=91;e.interact()}");page.wait_for_timeout(18);close_message(page);page.wait_for_timeout(50);close_message(page)
    assert page.evaluate("__BT404__.save.room==='sigil-lattice-arena' && __BT404__.save.sigils.length===12 && __BT404__.save.sigilMaxIntensity===3")
    ok('sigil_lattice_unlocks_full_grammar')

    # Codex keyboard + selection + intensity UI.
    page.keyboard.press('KeyF');page.wait_for_timeout(20)
    assert page.locator('#sigilDialog').evaluate('(e)=>e.open') and page.locator('.sigil-card').count()==12 and page.evaluate("__BT404__.engine.mode==='sigils'")
    page.locator('[data-sigil-id="sever-void-i"]').click();page.locator('#sigilIntensity button[data-intensity="3"]').click();assert page.evaluate("__BT404__.save.equippedSigil==='sever-void-i' && __BT404__.save.sigilIntensity===3")
    page.locator('#sigilCloseBtn').click();assert page.evaluate("__BT404__.engine.mode==='playing'")
    ok('sigil_codex_keyboard_select_and_intensity')

    # Touch codex opening.
    page.locator('[data-control="sigils"]').dispatch_event('pointerdown',{'pointerId':31,'pointerType':'touch'});page.locator('[data-control="sigils"]').dispatch_event('pointerup',{'pointerId':31,'pointerType':'touch'});page.wait_for_timeout(15)
    assert page.locator('#sigilDialog').evaluate('(e)=>e.open');page.locator('#sigilCloseBtn').click()
    ok('sigil_codex_touch')

    # T cycles formulas; G cycles intensity.
    page.evaluate("()=>{const e=__BT404__.engine;e.save.equippedSigil='bind-void-i';e.save.sigilIntensity=1;e.save.sigilMaxIntensity=3}")
    page.keyboard.press('KeyT');page.wait_for_timeout(10);assert page.evaluate("__BT404__.save.equippedSigil==='sever-void-i'")
    page.keyboard.press('KeyG');page.wait_for_timeout(10);assert page.evaluate('__BT404__.save.sigilIntensity===2')
    ok('quick_cycle_formula_and_intensity')

    # Keep enemies controlled during isolated formula checks.
    page.evaluate("()=>{const e=__BT404__.engine;e.enemies.forEach((x,i)=>{x.dead=false;x.hp=80;x.maxHp=80;x.bound=0;x.stagger=0;x.confused=0;x.branded=0;x.attackCd=99;x.x=170+i*28;x.y=140})}")
    prepare_cast(page,'bind-void-i',3,130,140);cast(page);assert page.evaluate('__BT404__.engine.enemies.filter(e=>e.bound>0).length===2');close_message(page)
    ok('bind_void_iii_multi_target')

    prepare_cast(page,'ward-mind-i',2,120,140);page.evaluate("()=>{__BT404__.save.perception=40}");cast(page);assert page.evaluate('__BT404__.engine.sigilBuffs.ward>0 && __BT404__.engine.perceptionSystem.wardTimer>0 && __BT404__.save.achievements.includes("hold-attention")');close_message(page)
    ok('ward_mind_reduces_perception_pressure')

    page.evaluate("()=>{const e=__BT404__.engine;const t=e.enemies[0];t.dead=false;t.hp=80;t.poise=40;t.maxPoise=40;t.x=165;t.y=140}")
    prepare_cast(page,'sever-void-i',2,130,140);cast(page);assert page.evaluate('__BT404__.engine.enemies[0].hp<80 && __BT404__.engine.enemies[0].poise<40');close_message(page)
    ok('sever_void_damage_and_poise')

    page.evaluate("()=>{const e=__BT404__.engine;const t=e.enemies[0];t.dead=false;t.hp=100;t.maxHp=100;t.x=156;t.y=140;e.player.x=130;e.player.y=140;e.player.facing='right'}")
    prepare_cast(page,'brand-void-i',3,130,140);cast(page);close_message(page);assert page.evaluate('__BT404__.engine.enemies[0].branded>0');page.evaluate("()=>{const e=__BT404__.engine;e.performAttack(10,false,0,1)}");assert page.evaluate('__BT404__.engine.enemies[0].hp<87')
    ok('brand_void_amplifies_physical_hit')

    prepare_cast(page,'shift-void-i',3,80,140);x0=page.evaluate('__BT404__.engine.player.x');cast(page);close_message(page);x1=page.evaluate('__BT404__.engine.player.x');assert x1>x0+35 and page.evaluate('__BT404__.engine.invuln>0')
    ok('shift_void_repositions_with_invulnerability')

    page.evaluate("()=>{const e=__BT404__.engine;e.phantoms=[{type:'enemy',x:250,y:100,w:11,h:17,life:4}];e.fakeGlitches=[{y:50,h:4,dx:3,life:.2}]}")
    prepare_cast(page,'reveal-mind-i',2,120,140);cast(page);close_message(page);assert page.evaluate('__BT404__.engine.sigilBuffs.reveal>0 && __BT404__.engine.phantoms.length===0 && __BT404__.engine.fakeGlitches.length===0')
    ok('reveal_mind_clears_false_layers')

    page.evaluate("()=>{const e=__BT404__.engine;const t=e.enemies[0];t.dead=false;t.x=160;t.y=140;t.confused=0;t.pendingAttack=true}")
    prepare_cast(page,'lure-mind-i',2,130,140);cast(page);close_message(page);assert page.evaluate('__BT404__.engine.enemies[0].confused>0 && __BT404__.engine.enemies[0].pendingAttack===false')
    ok('lure_mind_breaks_enemy_intent')

    prepare_cast(page,'echo-mind-i',2,120,140);page.evaluate('__BT404__.engine.echoes=[]');cast(page);close_message(page);assert page.evaluate('__BT404__.engine.echoes.some(e=>e.text.startsWith("ECHO:"))')
    ok('echo_mind_produces_context_clue')

    prepare_cast(page,'mend-flesh-i',2,120,140);page.evaluate("()=>{__BT404__.engine.player.hp=35;__BT404__.save.health=35}");cast(page);close_message(page);assert page.evaluate('__BT404__.engine.player.hp>=60')
    ok('mend_flesh_recovers_health')

    prepare_cast(page,'fortify-flesh-i',2,120,140);cast(page);close_message(page);page.evaluate("()=>{const e=__BT404__.engine;e.player.hp=100;e.invuln=0;e.guard=false;e.hitPlayer(20,e.enemies[0])}");hp=page.evaluate('__BT404__.engine.player.hp');assert 86<hp<90
    ok('fortify_flesh_reduces_incoming_damage')

    prepare_cast(page,'purge-flesh-i',2,120,140);page.evaluate("()=>{__BT404__.save.perception=35;__BT404__.save.stability=100}");cast(page);close_message(page);assert page.evaluate('__BT404__.engine.sigilBuffs.purge>0 && __BT404__.save.perception>35')
    ok('purge_flesh_suppresses_corruption_pressure')

    page.evaluate("()=>{const e=__BT404__.engine;const t=e.enemies[0];t.dead=false;t.hp=80;t.maxHp=80;t.x=160;t.y=140;e.player.hp=40;e.save.health=40}")
    prepare_cast(page,'siphon-flesh-i',2,130,140);page.evaluate("()=>{__BT404__.engine.player.hp=40;__BT404__.save.health=40}");cast(page);close_message(page);assert page.evaluate('__BT404__.engine.enemies[0].hp<80 && __BT404__.engine.player.hp>40')
    ok('siphon_flesh_damage_and_recovery')

    # Puzzle integration uses exact school + formula + minimum intensity.
    page.evaluate("()=>{const e=__BT404__.engine;e.enemies.forEach(x=>x.dead=true);e.save.sigilPuzzleFlags=[]}")
    prepare_cast(page,'reveal-mind-i',2,62,48);cast(page);close_message(page);assert page.evaluate('__BT404__.save.sigilPuzzleFlags.includes("lattice-mind")')
    ok('mind_formula_resolves_environmental_lock')
    prepare_cast(page,'purge-flesh-i',2,145,118);cast(page);close_message(page);assert page.evaluate('__BT404__.save.sigilPuzzleFlags.includes("lattice-flesh")')
    ok('flesh_formula_resolves_environmental_lock')
    prepare_cast(page,'bind-void-i',2,232,48);cast(page);close_message(page);assert not page.evaluate('__BT404__.save.sigilPuzzleFlags.includes("lattice-void")')
    prepare_cast(page,'bind-void-i',3,232,48);cast(page);close_message(page);assert page.evaluate('__BT404__.save.sigilPuzzleFlags.includes("lattice-void") && __BT404__.save.achievements.includes("grammar-of-three")')
    ok('void_lock_requires_intensity_iii')

    page.evaluate("()=>{const e=__BT404__.engine;e.player.x=22;e.player.y=130;e.interact()}");page.wait_for_timeout(20);close_message(page);page.wait_for_timeout(55);close_message(page)
    assert page.evaluate("__BT404__.save.phase5Complete===true && __BT404__.save.room==='manor-memory-vault' && __BT404__.save.sigilMaxIntensity===3 && __BT404__.save.achievements.includes('twelve-words')")
    if page.locator('#completeDialog').evaluate('(e)=>e.open'):
        assert 'SIGIL GRAMMAR RECOVERED' in page.locator('#completeKicker').inner_text();page.locator('#completeCloseBtn').click()
    ok('phase5_sigil_lattice_complete')

    page.evaluate("document.querySelector('#leaveBtn').click()");page.wait_for_timeout(20);page.locator('#continueBtn').click();page.wait_for_timeout(15);page.locator('.slot-card').first.click();page.wait_for_timeout(60);close_message(page)
    assert page.evaluate("__BT404__.save.schema===12 && __BT404__.save.phase5Complete===true && __BT404__.save.sigils.length===12 && __BT404__.save.sigilMaxIntensity===3")
    ok('phase5_save_reload')

    # Mobile codex and no horizontal overflow.
    page.set_viewport_size({'width':390,'height':844});page.wait_for_timeout(50);page.keyboard.press('KeyF');page.wait_for_timeout(20)
    assert page.locator('#sigilDialog').evaluate('(e)=>e.open') and page.locator('.sigil-school').count()==3 and page.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1')
    page.screenshot(path=str(ROOT/'QA_PHASE5_MOBILE.png'),full_page=True);page.locator('#sigilCloseBtn').click();ok('phase5_mobile_codex_390x844')
    page.set_viewport_size({'width':1440,'height':1000});load_room(page,'sigil-lattice-arena');page.evaluate("()=>{const e=__BT404__.engine;e.save.sigils=SIGILS.map(s=>s.id);e.save.sigilMaxIntensity=3;e.save.sigilIntensity=3;e.save.equippedSigil='bind-void-i';e.hud()}");page.keyboard.press('KeyF');page.wait_for_timeout(30)
    page.screenshot(path=str(ROOT/'QA_PHASE5_DESKTOP.png'),full_page=True);page.locator('#sigilCloseBtn').click();ok('phase5_desktop_codex_capture')

    assert not errors,errors;ok('phase5_zero_console_page_errors')
    browser.close()
print('PHASE5_E2E_PASS')
for name,status in results: print(f'{status:4} {name}')
