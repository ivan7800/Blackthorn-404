#!/usr/bin/env python3
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];checks=[]
def ck(n,v):checks.append(bool(v));print('PASS' if v else 'FAIL',n)
arts=['scene_manor_detail.png','protagonists.png','bosses.png','enemy-families.png','eras-ancient.png','eras-modern.png','eras-final.png']
for a in arts:ck('asset_'+a,(ROOT/'assets/art'/a).exists() and (ROOT/'assets/art'/a).stat().st_size>5000)
e=(ROOT/'js/engine.js').read_text();p=(ROOT/'js/pixel-art.js').read_text();c=(ROOT/'css/app.css').read_text();h=(ROOT/'index.html').read_text();w=(ROOT/'sw.js').read_text();d=(ROOT/'js/data.js').read_text()
ck('scene_backdrops','this.art.scene(c,room)' in e and all('assets/art/'+a in p for a in arts) and 'data:image/png;base64' not in e)
ck('character_and_boss_atlases',all(token in p for token in ['HERO_BY_ERA','BOSS_ART','FAMILY_ART']) and all(token in e for token in ["'protagonists'","'bosses'","'enemies'"]))
ck('gothic_ui',"../assets/art/scene_manor_detail.png" in c and 'data:image/jpeg;base64' not in c)
ck('map','drawHistoricalMap(c)' in e)
ck('pwa_cache',all('assets/art/'+a in w for a in arts))
ck('bundle_source','/* ===== pixel-art.js ===== */' in (ROOT/'js/bundle.js').read_text())
ck('version',"VERSION='1.1.1'" in d)
print(f'VISUAL GATE {sum(checks)}/{len(checks)} PASS');raise SystemExit(0 if all(checks) else 1)
