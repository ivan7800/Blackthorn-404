#!/usr/bin/env python3
from pathlib import Path
import json, subprocess, sys, re
ROOT=Path(__file__).resolve().parents[1]
errors=[]
required=['index.html','manifest.webmanifest','sw.js','css/app.css','js/bundle.js','js/app.js','js/engine.js','js/data.js','js/save.js','js/audio.js','js/perception.js','js/combat.js','js/sigils.js','BLACKTHORN_GAME_BIBLE.md','PHASE_1_REPORT.md','PHASE_2_REPORT.md','PHASE_3_REPORT.md','PHASE_4_REPORT.md','PHASE_5_REPORT.md','PHASE_6_REPORT.md','PHASE_7_REPORT.md','PHASE_8_REPORT.md','PHASE_9_REPORT.md','PHASE_10_REPORT.md','PHASE_11_REPORT.md','PHASE_12_REPORT.md','PHASE_13_REPORT.md','PHASE_14_REPORT.md','PHASE_15_REPORT.md','PHASE_16_REPORT.md','QA_REPORT.md','README.md','tools/phase1_e2e.py','tools/phase2_e2e.py','tools/phase3_e2e.py','tools/phase4_e2e.py','tools/phase5_e2e.py','tools/phase6_e2e.py','tools/phase7_e2e.py','tools/phase8_e2e.py','tools/phase9_e2e.py','tools/phase10_e2e.py','tools/phase11_e2e.py','tools/phase12_e2e.py','tools/phase13_e2e.py','tools/phase14_e2e.py','tools/phase15_e2e.py','tools/phase16_e2e.py','tools/balance_check.py','tools/final_release_gate.py']
for f in required:
    if not (ROOT/f).exists(): errors.append(f'missing:{f}')
html=(ROOT/'index.html').read_text(encoding='utf-8')
for token in ['id="newGameBtn"','id="continueBtn"','id="gameCanvas"','data-control="attack"','data-control="heavy"','data-control="weapon"','data-control="sigil"','data-control="sigils"','id="sigilDialog"','id="sigilIntensity"','id="truthfulHud"','manifest.webmanifest?v=1.1.1','bundle.js?v=1.1.1','id="archiveDialog"','id="pauseArchiveBtn"','id="endingDialog"','id="endingNextBtn"','id="newGamePlusBtn"']:
    if token not in html: errors.append(f'html_missing:{token}')
for f in ['js/bundle.js','js/app.js','js/engine.js','js/data.js','js/save.js','js/perception.js','js/audio.js','js/sigils.js','sw.js']:
    r=subprocess.run(['node','--check',str(ROOT/f)],capture_output=True,text=True)
    if r.returncode: errors.append(f'syntax:{f}:{r.stderr.strip()}')
manifest=json.loads((ROOT/'manifest.webmanifest').read_text())
if not manifest.get('start_url','').startswith('./'): errors.append('manifest_start_url_not_relative')
if not manifest.get('scope','').startswith('./'): errors.append('manifest_scope_not_relative')
sw=(ROOT/'sw.js').read_text(encoding='utf-8')
if "CACHE='blackthorn404-v1.1.1-release'" not in sw: errors.append('sw_cache_version')
for token in ['app.css?v=1.1.1','bundle.js?v=1.1.1','manifest.webmanifest?v=1.1.1','assets/art/title_hero.jpg','assets/art/scene_manor.png','assets/art/scene_void.png']:
    if token not in sw: errors.append(f'sw_missing:{token}')
for token in ['PHASE_10_REPORT.md','PHASE_11_REPORT.md','QA_REPORT.md']:
    if token in sw: errors.append(f'sw_should_not_precache_qa_doc:{token}')
data=(ROOT/'js/data.js').read_text(encoding='utf-8')
for token in ['export const BOSS_PROFILES=',"pattern:'bell-ring'","pattern:'salt-star'","pattern:'census-cross'","pattern:'mirror-fan'","pattern:'tenant-doors'","pattern:'company-volley'","pattern:'frequency-band'","pattern:'missing-frame'","pattern:'unremembered'"]:
    if token not in data: errors.append(f'boss_profile_missing:{token}')
for token in ["VERSION='1.1.1'","SAVE_SCHEMA=12",'export const BALANCE=','export const LORE_TARGETS=','export const LORE_CATALOG=',"kind:'lore-secret'","'echo-infirmary-court'","'echo-apothecary'","'echo-plague-ward'","'echo-ossuary'","'echo-belfry-stairs'","'final-pale-threshold'","'final-unremembered'",'export const ENDING_PROFILES=','export function evaluateEnding(save)','TRUE_ENDING_KEY_EVIDENCE','export const NGPLUS_TRAITS=','export const NGPLUS_ECHOES=','NGPLUS_ECHO_TARGET',"'the-unremembered'","kind:'sound-seal'","kind:'chapter-mixture'"]:
    if token not in data: errors.append(f'data_missing:{token}')
sigil_block=data.split('export const SIGILS=[',1)[1].split('];',1)[0] if 'export const SIGILS=[' in data else ''
if len(re.findall(r"\bid:'[^']+'",sigil_block)) != 12: errors.append('sigil_count_not_12')
for school in ["school:'FLESH'","school:'MIND'","school:'VOID'"]:
    if school not in sigil_block: errors.append(f'sigil_school_missing:{school}')
engine=(ROOT/'js/engine.js').read_text(encoding='utf-8')
for token in ['bossCanBeHit(','fireBossPattern(','bossMove(','hostileShot(','memory-anchor','memory-sequence','boss-focus','completeHistoricalChapter(','phase7Complete','sound-lure','sound-seal','chapter-mixture','chapter-secret','phase6Complete','cycleSigilIntensity(','equipSigil(','resolveSigilPuzzle(','completeSigilTrial(','sigilBuffs','phase5Complete','final-entry','final-choice','final-sequence','final-sigil-puzzle','final-boss-focus','completeFinalChapter(','resolveEnding(','evaluateEnding(this.save)','ngPlusEchoForRoom(','collectNgPlusEcho(','brandPower','confused','staminaRegenDelay','BALANCE.stamina','BALANCE.ngPlus','BALANCE.boss','BALANCE.perception']:
    if token not in engine: errors.append(f'engine_missing:{token}')
sigils=(ROOT/'js/sigils.js').read_text(encoding='utf-8')
for token in ['sigilStats','cycleIntensity','castSigil','case \'bind\'','case \'reveal\'','case \'fortify\'','case \'siphon\'']:
    if token not in sigils: errors.append(f'sigil_system_missing:{token}')
save=(ROOT/'js/save.js').read_text(encoding='utf-8')
for token in ['lore','phase9Complete','phase12Complete','ending','endingsSeen','endingStats','ngPlus','ngPlusCycle','ngPlusSourceEnding','ngPlusTrait','ngPlusEchoes','legacyLore','legacySigils','ngPlusHistory','legacyPlaySeconds','createNewGamePlus','phase8Complete','phase7Complete','finalSequenceStep','finalSigilFlags','finalChoices','chapterProgress','chapterStats','phase6Complete','chapter1PuzzleStep','memorySafeRoom','chapter1Stats','phase5Complete','sigilIntensity','sigilMaxIntensity','sigilPuzzleFlags','sigilStats']:
    if token not in save: errors.append(f'save_missing:{token}')
css=(ROOT/'css/app.css').read_text(encoding='utf-8')
for token in ['safe-area-inset-top','--app-height','touch-large','left-handed','perf-battery','pointer:coarse','orientation:landscape']:
    if token not in css: errors.append(f'phase14_css_missing:{token}')
for token in ['id="installBtn"','id="pwaStatus"','id="orientationHint"','id="touchMode"','id="touchSize"','id="leftHanded"','id="performanceMode"']:
    if token not in html: errors.append(f'phase14_html_missing:{token}')
app=(ROOT/'js/app.js').read_text(encoding='utf-8')
for token in ['toggleFullscreen','focus-mode','beforeinstallprompt','visualViewport','updatePwaStatus','performanceMode','orientationHintShown']:
    if token not in app: errors.append(f'phase14_app_missing:{token}')
for token in ["event.request.mode==='navigate'",'Promise.allSettled','SKIP_WAITING',"k.startsWith('blackthorn404-')"]:
    if token not in sw: errors.append(f'phase14_sw_missing:{token}')
if manifest.get('id')!='./': errors.append('manifest_id_not_relative_root')
if 'fullscreen' not in manifest.get('display_override',[]): errors.append('manifest_display_override_fullscreen_missing')
for f in ROOT.rglob('*'):
    if f.is_file() and f.suffix in {'.js','.html','.css'}:
        txt=f.read_text(encoding='utf-8',errors='ignore')
        if re.search(r'https?://',txt): errors.append(f'remote_runtime_url:{f.relative_to(ROOT)}')
if errors:
    print('RELEASE_GATE_FAIL');print('\n'.join(errors));sys.exit(1)
print('RELEASE_GATE_PASS')
