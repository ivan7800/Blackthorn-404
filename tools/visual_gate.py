#!/usr/bin/env python3
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];checks=[]
def ck(n,v):checks.append(bool(v));print('PASS' if v else 'FAIL',n)
arts=['title_hero.jpg','scene_manor.png','scene_medieval.png','scene_ancient.png','scene_modern.png','scene_boss.png','scene_void.png']
for a in arts:ck('asset_'+a,(ROOT/'assets/art'/a).exists() and (ROOT/'assets/art'/a).stat().st_size>5000)
e=(ROOT/'js/engine.js').read_text();c=(ROOT/'css/app.css').read_text();h=(ROOT/'index.html').read_text();w=(ROOT/'sw.js').read_text();d=(ROOT/'js/data.js').read_text()
ck('scene_backdrops','loadSceneImages()' in e and 'drawSceneBackdrop' in e and all('assets/art/'+x in e for x in ['scene_manor.png','scene_medieval.png','scene_ancient.png','scene_modern.png','scene_boss.png','scene_void.png']) and 'data:image/png;base64' not in e);ck('large_sprites','Math.max(30,e.w*2.1)' in e);ck('gothic_ui','SNES DARK FANTASY RELEASE HARDENING' in c and "../assets/art/title_hero.jpg" in c and 'data:image/jpeg;base64' not in c);ck('label','SNES VISUAL EDITION' in h);ck('pwa_cache',all('assets/art/'+a in w for a in arts));ck('version',"VERSION='1.1.1'" in d)
print(f'VISUAL GATE {sum(checks)}/{len(checks)} PASS');raise SystemExit(0 if all(checks) else 1)
