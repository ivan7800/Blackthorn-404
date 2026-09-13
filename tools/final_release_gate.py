#!/usr/bin/env python3
from pathlib import Path
from bs4 import BeautifulSoup
import json,re,subprocess,sys
ROOT=Path(__file__).resolve().parents[1]; errors=[]; passes=[]
def check(cond,name):
    (passes if cond else errors).append(name)
html=(ROOT/'index.html').read_text(encoding='utf-8'); soup=BeautifulSoup(html,'html.parser')
check('<title>Blackthorn 404: The Unremembered</title>' in html,'final_title')
check(all(x not in html for x in ['PHASE 14','PHASE 15','PHASE COMPLETE']),'no_dev_phase_chrome')
for idv in ['newGameBtn','continueBtn','newGamePlusBtn','recordsBtn','creditsBtn','gameCanvas','pauseRecordsBtn','recordsDialog','creditsDialog','musicVolume','fxVolume']:
    check(soup.find(id=idv) is not None,f'html_{idv}')
ids=[x.get('id') for x in soup.find_all(attrs={'id':True})];check(len(ids)==len(set(ids)),'html_unique_ids')
for f in ['js/bundle.js','js/app.js','js/engine.js','js/data.js','js/save.js','js/audio.js','js/perception.js','js/combat.js','js/sigils.js','sw.js']:
    r=subprocess.run(['node','--check',str(ROOT/f)],capture_output=True,text=True);check(r.returncode==0,f'syntax_{f}')
# Runtime must remain local-only.
remote=[]
for f in list(ROOT.rglob('*.js'))+list(ROOT.rglob('*.html'))+list(ROOT.rglob('*.css')):
    txt=f.read_text(encoding='utf-8',errors='ignore')
    if re.search(r'https?://',txt):remote.append(str(f.relative_to(ROOT)))
check(not remote,'no_remote_runtime_urls')
# No debug leftovers or dynamic-code execution.
for token in ['TODO','FIXME','debugger;','eval(','new Function(','document.write(']:
    hits=[]
    for f in list(ROOT.rglob('*.js'))+list(ROOT.rglob('*.html')):
        if token in f.read_text(encoding='utf-8',errors='ignore'):hits.append(str(f.relative_to(ROOT)))
    check(not hits,f'no_{token.replace("(","").replace(";","")}')
# Local refs in document exist.
refs=[]
for tag in soup.find_all(True):
    for a in ('src','href'):
        if tag.has_attr(a):
            v=tag[a]
            if v.startswith(('./','css/','js/','assets/')):
                q=v.split('?',1)[0].split('#',1)[0]; q=q[2:] if q.startswith('./') else q
                if q and not (ROOT/q).exists():refs.append(v)
check(not refs,'html_local_refs_exist')
manifest=json.loads((ROOT/'manifest.webmanifest').read_text())
check(manifest.get('start_url')=='./' and manifest.get('scope')=='./' and manifest.get('id')=='./','manifest_relative_scope')
check(all((ROOT/(i['src'][2:] if i['src'].startswith('./') else i['src'])).exists() for i in manifest.get('icons',[])),'manifest_icons_exist')
sw=(ROOT/'sw.js').read_text();check("CACHE='blackthorn404-v1.1.1-release'" in sw,'final_cache_namespace');check("event.request.mode==='navigate'" in sw and "k.startsWith('blackthorn404-')" in sw and 'SKIP_WAITING' in sw,'sw_update_offline_strategy')
data=(ROOT/'js/data.js').read_text();check("VERSION='1.1.1'" in data and 'SAVE_SCHEMA=12' in data,'version_schema');check('export const BESTIARY_RANKS=' in data and 'export function bestiaryRank' in data,'bestiary_data')
# Exact bestiary distribution derived from source IDs.
block=data.split('export const ENEMY_TYPES={',1)[1].split('};\n\nexport const BESTIARY_RANKS',1)[0]
rows=[]
for line in block.splitlines():
    m=re.match(r"\s*['\"]([^'\"]+)['\"]:\{.*?family:['\"]([^'\"]+)",line)
    if m: rows.append(m.groups())
elite=re.search(r"elite:\[([^\]]+)\]",data).group(1);mini=re.search(r"miniboss:\[([^\]]+)\]",data).group(1)
elites=set(re.findall(r"'([^']+)'",elite)); minis=set(re.findall(r"'([^']+)'",mini)); bosses={i for i,f in rows if f=='Boss'}; normals={i for i,f in rows if f!='Boss'}-elites-minis
check((len(normals),len(elites),len(minis),len(bosses))==(26,8,8,9),'bestiary_distribution_26_8_8_9')
check('SLICE_ACHIEVEMENTS=[' in data,'achievement_catalog')
cat_block=data.split('export const SLICE_ACHIEVEMENTS=[',1)[1].split('];',1)[0]
catalog=set(re.findall(r"\{id:'([^']+)',name:",cat_block))
unlock=set()
for f in [ROOT/'js/engine.js',ROOT/'js/data.js',ROOT/'js/save.js']:
    txt=f.read_text(encoding='utf-8')
    unlock.update(re.findall(r"unlockAchievement\('([^']+)'\)",txt))
    unlock.update(re.findall(r"achievement:'([^']+)'",txt))
check(unlock.issubset(catalog),'all_unlockable_achievements_catalogued')
audio=(ROOT/'js/audio.js').read_text();check(all(t in audio for t in ['startAmbient()','stopAmbient()','musicVolume','setScene(room)']),'procedural_ambience_channel')
app=(ROOT/'js/app.js').read_text();check(all(t in app for t in ['openRecords()','renderRecords()','pauseRecordsBtn','creditsBtn','musicVolume']),'records_credits_audio_ui')
check('PHASE 7 COMPLETE' not in app and 'Phases 1–6' not in app,'no_dev_milestones_in_runtime_ui')
# Expected project files.
for f in ['BLACKTHORN_GAME_BIBLE.md','README.md','PHASE_16_REPORT.md','QA_REPORT.md','tools/phase16_e2e.py','tools/balance_check.py']:
    check((ROOT/f).exists(),f'file_{f}')
if errors:
    print('FINAL_RELEASE_GATE_FAIL');print('\n'.join('FAIL '+e for e in errors));print('\nPassed',len(passes));sys.exit(1)
print(f'FINAL_RELEASE_GATE_PASS {len(passes)}/{len(passes)}')
for x in passes:print('PASS',x)
