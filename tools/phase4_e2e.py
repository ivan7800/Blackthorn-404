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
        page.locator('#messageNextBtn').click();page.wait_for_timeout(10)
    assert not page.locator('#messageDialog').evaluate('(e)=>e.open')
def load_room(page,room):
    page.evaluate("r=>__BT404__.engine.loadRoom(r,false)",room);page.wait_for_timeout(45);close_message(page)
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1000})
    page.add_init_script("""Object.defineProperty(window,'localStorage',{value:{_m:{},getItem(k){return Object.prototype.hasOwnProperty.call(this._m,k)?this._m[k]:null},setItem(k,v){this._m[k]=String(v)},removeItem(k){delete this._m[k]},clear(){this._m={}}},configurable:true});""")
    page.goto('about:blank')
    page.on('console',lambda m: errors.append(('console',m.type,m.text)) if m.type=='error' else None)
    page.on('pageerror',lambda e: errors.append(('pageerror','error',str(e))))
    page.set_content(html,wait_until='domcontentloaded');page.add_style_tag(content=css);page.add_script_tag(content=js);page.wait_for_timeout(100)
    page.locator('#newGameBtn').click();page.locator('.slot-card').first.click();page.wait_for_timeout(65);close_message(page)
    assert page.evaluate('__BT404__.save.schema===12') and page.evaluate("__BT404__.save.weapons.length===1 && __BT404__.save.weapons[0]==='candlestick'")
    ok('phase4_boot_schema4')

    migrated=page.evaluate("()=>normalizeSave({schema:3,sliceComplete:true,phase2Complete:true,phase3Complete:true,room:'manor-memory-vault',health:90,perception:100,stability:100,stamina:70,weapon:'candlestick',flags:[],notes:[],achievements:[],bosses:['bell-without-tongue'],rooms:['manor-memory-vault'],sigils:['bind-void-i'],equippedSigil:'bind-void-i'})")
    assert migrated['schema']==12 and migrated['phase3Complete'] is True and migrated['phase4Complete'] is False and migrated['weapons']==['candlestick'] and migrated['ammo']['revolver']['clip']==6
    ok('schema3_to_schema4_migration')

    load_room(page,'manor-memory-vault')
    page.evaluate("()=>{const e=__BT404__.engine;e.player.x=91;e.player.y=90;e.interact()}");page.wait_for_timeout(20)
    assert page.evaluate("__BT404__.save.room==='manor-memory-vault'") and page.locator('#messageDialog').evaluate('(e)=>e.open');close_message(page)
    ok('combat_imprint_gated_before_phase3')

    page.evaluate("()=>{const e=__BT404__.engine;e.save.sliceComplete=true;e.save.phase2Complete=true;e.save.phase3Complete=true;e.persist('qa-phase3');e.player.x=91;e.player.y=90;e.interact()}");page.wait_for_timeout(20);close_message(page);page.wait_for_timeout(65);close_message(page)
    assert page.evaluate("__BT404__.save.room==='combat-imprint-arena'")
    assert page.evaluate("['candlestick','woodsman-axe','ritual-dagger','service-revolver'].every(x=>__BT404__.save.weapons.includes(x))")
    ok('combat_imprint_unlocks_four_weapon_archetypes')

    # Q/E and touch weapon cycling.
    assert page.evaluate("__BT404__.save.weapon==='candlestick'")
    page.keyboard.press('KeyE');page.wait_for_timeout(15);assert page.evaluate("__BT404__.save.weapon==='woodsman-axe'")
    page.keyboard.press('KeyQ');page.wait_for_timeout(15);assert page.evaluate("__BT404__.save.weapon==='candlestick'")
    page.locator('[data-control="weapon"]').dispatch_event('pointerdown',{'pointerId':21,'pointerType':'touch'});page.locator('[data-control="weapon"]').dispatch_event('pointerup',{'pointerId':21,'pointerType':'touch'});page.wait_for_timeout(15);assert page.evaluate("__BT404__.save.weapon==='woodsman-axe'")
    ok('weapon_cycle_keyboard_touch')

    # Data-level differentiation is substantial, not cosmetic.
    diff=page.evaluate("()=>{const a=WEAPONS.find(w=>w.id==='woodsman-axe'),d=WEAPONS.find(w=>w.id==='ritual-dagger'),r=WEAPONS.find(w=>w.id==='service-revolver');return {axeCd:a.cooldown,dagCd:d.cooldown,axePoise:a.heavyPoise,dagPoise:d.heavyPoise,dagParry:d.parryBonus,ranged:r.type,clip:r.clip}}")
    assert diff['dagCd']<diff['axeCd'] and diff['axePoise']>diff['dagPoise'] and diff['dagParry']>0 and diff['ranged']=='ranged' and diff['clip']==6
    ok('weapon_archetypes_are_mechanically_distinct')

    # Charged heavy scales damage and records heavy hits.
    page.evaluate("()=>{const e=__BT404__.engine;e.save.weapon='woodsman-axe';const t=e.enemies[0];t.dead=false;t.hp=100;t.maxHp=100;t.poise=100;t.maxPoise=100;t.x=145;t.y=110;e.player.x=124;e.player.y=110;e.player.facing='right';e.save.stamina=100;e.heavyCd=0;e.hitStop=0}")
    page.keyboard.down('KeyV');page.wait_for_timeout(550);page.keyboard.up('KeyV');page.wait_for_timeout(30)
    charged=page.evaluate("()=>({hp:__BT404__.engine.enemies[0].hp,st:__BT404__.save.stamina,h:__BT404__.save.combatStats.heavyHits})")
    assert charged['hp']<86 and charged['st']<100 and charged['h']>=1
    ok('charged_heavy_scales_damage')

    # Axe breaks poise and produces an actual stagger state.
    page.evaluate("()=>{const e=__BT404__.engine;e.hitStop=0;e.heavyCd=0;e.save.stamina=100;const t=e.enemies[1];t.dead=false;t.hp=100;t.maxHp=100;t.maxPoise=18;t.poise=18;t.stagger=0;t.x=150;t.y=112;e.player.x=126;e.player.y=112;e.player.facing='right';e.heavyAttack(1)}");page.wait_for_timeout(20)
    assert page.evaluate("__BT404__.engine.enemies[1].stagger>0") and page.evaluate("__BT404__.save.combatStats.staggers>=1") and page.evaluate("__BT404__.save.achievements.includes('break-the-shape')")
    ok('poise_break_causes_stagger')

    # Enemies telegraph before damage; they no longer damage instantly on contact.
    page.evaluate("()=>{const e=__BT404__.engine;e.hitStop=0;const t=e.enemies[2];t.dead=false;t.bound=0;t.stagger=0;t.pendingAttack=false;t.attackCd=0;t.x=150;t.y=110;e.player.x=151;e.player.y=111;e.player.hp=100;e.guard=false;e.invuln=0;e.updateEnemies(.016)}")
    tele=page.evaluate("()=>({pending:__BT404__.engine.enemies[2].pendingAttack,hp:__BT404__.engine.player.hp,windup:__BT404__.engine.enemies[2].windup})")
    assert tele['pending'] and tele['hp']==100 and tele['windup']>0
    ok('enemy_melee_has_real_windup_telegraph')

    # Perfect parry consumes the telegraphed strike and staggers the source.
    page.evaluate("()=>{const e=__BT404__.engine;const t=e.enemies[2];e.player.hp=100;e.invuln=0;e.startGuard();t.pendingAttack=true;t.windup=.01;t.x=e.player.x+4;t.y=e.player.y;e.updateEnemies(.02)}")
    parry=page.evaluate("()=>({hp:__BT404__.engine.player.hp,p:__BT404__.save.combatStats.parries,stagger:__BT404__.engine.enemies[2].stagger,ach:__BT404__.save.achievements.includes('perfect-answer')})")
    assert parry['hp']==100 and parry['p']>=1 and parry['stagger']>0 and parry['ach']
    page.keyboard.up('KeyX')
    ok('perfect_parry_cancels_damage')

    # Guard break is distinct from a parry and cannot block forever with zero stamina.
    page.evaluate("()=>{const e=__BT404__.engine;const t=e.enemies[0];e.player.hp=100;e.invuln=0;e.guard=true;e.parryTimer=0;e.save.stamina=5;e.hitPlayer(12,t)}")
    gb=page.evaluate("()=>({hp:__BT404__.engine.player.hp,guard:__BT404__.engine.guard,st:__BT404__.save.stamina})")
    assert gb['hp']<100 and gb['guard'] is False and gb['st']==0
    ok('guard_break_on_exhausted_stamina')

    # Revolver uses finite ammunition and player projectiles can hit enemies.
    page.evaluate("()=>{const e=__BT404__.engine;e.save.weapon='service-revolver';e.save.ammo.revolver={clip:6,reserve:12};e.attackCd=0;e.reloadTimer=0;e.hitStop=0;e.enemies.slice(1).forEach(x=>x.dead=true);const t=e.enemies[0];t.dead=false;t.hp=60;t.maxHp=60;t.poise=30;t.maxPoise=30;t.x=190;t.y=110;e.player.x=120;e.player.y=110;e.player.facing='right';e.save.stamina=100;e.quickAttack()}")
    assert page.evaluate("__BT404__.save.ammo.revolver.clip===5 && __BT404__.engine.projectiles.some(p=>!p.hostile)")
    page.evaluate("()=>{const e=__BT404__.engine;for(let i=0;i<30;i++)e.updateProjectiles(.02)}");page.wait_for_timeout(15)
    ranged=page.evaluate("()=>({hp:__BT404__.engine.enemies[0].hp,hits:__BT404__.save.combatStats.rangedHits})")
    assert ranged['hp']<60 and ranged['hits']>=1
    ok('ranged_projectile_ammo_and_hit')

    # Empty cylinder triggers an automatic reload, taking only available reserve rounds.
    page.evaluate("()=>{const e=__BT404__.engine;e.save.weapon='service-revolver';e.save.ammo.revolver={clip:0,reserve:4};e.reloadTimer=0;e.attackCd=0;e.hitStop=0;e.quickAttack()}")
    assert page.evaluate("__BT404__.engine.reloadTimer>0")
    page.evaluate("()=>{const e=__BT404__.engine;e.reloadTimer=.01;e.update(.02)}")
    assert page.evaluate("__BT404__.save.ammo.revolver.clip===4 && __BT404__.save.ammo.revolver.reserve===0 && __BT404__.engine.reloadTimer===0")
    ok('automatic_reload_respects_reserve')

    # Historical memory still fixes its authored weapon despite global inventory.
    load_room(page,'echo-priory-gate');before=page.evaluate('__BT404__.save.weapon');page.keyboard.press('KeyE');page.wait_for_timeout(15);after=page.evaluate('__BT404__.save.weapon')
    assert before=='woodsman-axe' and after=='woodsman-axe'
    ok('historical_chapter_weapon_lock')

    # Touch heavy is press-and-release charge, not a one-frame duplicate button.
    load_room(page,'combat-imprint-arena');page.evaluate("()=>{const e=__BT404__.engine;e.save.weapon='ritual-dagger';e.save.stamina=100;e.heavyCd=0}")
    st0=page.evaluate('__BT404__.save.stamina');page.locator('[data-control="heavy"]').dispatch_event('pointerdown',{'pointerId':22,'pointerType':'touch'});page.wait_for_timeout(240);assert page.evaluate('__BT404__.engine.charging===true');page.locator('[data-control="heavy"]').dispatch_event('pointerup',{'pointerId':22,'pointerType':'touch'});page.wait_for_timeout(20);st1=page.evaluate('__BT404__.save.stamina')
    assert st1<st0 and page.evaluate('__BT404__.engine.charging===false')
    ok('touch_charged_heavy_press_release')

    # Complete the controlled imprint; phase flag and persistent combat unlocks survive.
    page.evaluate("()=>{const e=__BT404__.engine;e.enemies.forEach((x,i)=>{if(i<e.enemies.length-1){x.dead=true}else{x.dead=false;x.hp=1;x.x=150;x.y=112}});e.save.weapon='candlestick';e.player.x=132;e.player.y=112;e.player.facing='right';e.attackCd=0;e.hitStop=0;e.quickAttack()}");page.wait_for_timeout(25);close_message(page);page.wait_for_timeout(60);close_message(page)
    assert page.evaluate("__BT404__.save.phase4Complete===true && __BT404__.save.room==='manor-memory-vault'") and page.evaluate("__BT404__.save.achievements.includes('four-ways-to-hurt')")
    if page.locator('#completeDialog').evaluate('(e)=>e.open'):
        assert 'WEAPON IMPRINT STABLE' in page.locator('#completeKicker').inner_text();page.locator('#completeCloseBtn').click()
    ok('phase4_combat_imprint_complete')

    page.evaluate("document.querySelector('#leaveBtn').click()");page.wait_for_timeout(20);page.locator('#continueBtn').click();page.wait_for_timeout(15);page.locator('.slot-card').first.click();page.wait_for_timeout(70);close_message(page)
    assert page.evaluate("__BT404__.save.schema===12 && __BT404__.save.phase4Complete===true && __BT404__.save.weapons.includes('service-revolver')")
    ok('phase4_save_reload')

    page.set_viewport_size({'width':390,'height':844});page.wait_for_timeout(80)
    assert page.locator('[data-control="weapon"]').is_visible() and page.locator('#combatState').is_visible() and page.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1')
    page.screenshot(path=str(ROOT/'QA_PHASE4_MOBILE.png'),full_page=True);ok('phase4_mobile_390x844')
    page.set_viewport_size({'width':1440,'height':1000});load_room(page,'combat-imprint-arena');page.evaluate("()=>{const e=__BT404__.engine;e.save.weapon='service-revolver';e.player.x=128;e.player.y=112;e.player.facing='right';const t=e.enemies[0];t.x=158;t.y=112;t.pendingAttack=true;t.windup=t.windupMax*.5;e.hud();e.render()}");page.wait_for_timeout(30)
    page.screenshot(path=str(ROOT/'QA_PHASE4_DESKTOP.png'),full_page=True);ok('phase4_desktop_combat_capture')
    assert not errors,errors;ok('phase4_zero_console_page_errors')
    browser.close()
print('PHASE4_E2E_PASS')
for name,status in results: print(f'{status:4} {name}')
