#!/usr/bin/env python3
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]
order=['data.js','save.js','perception.js','combat.js','sigils.js','audio.js','engine.js','app.js']
out=['/* Blackthorn 404 generated static bundle. Do not edit directly. */','"use strict";']
for name in order:
    text=(ROOT/'js'/name).read_text(encoding='utf-8')
    text=re.sub(r'^import\s+.*?;\s*$', '', text, flags=re.M)
    text=re.sub(r'^export\s+', '', text, flags=re.M)
    out.append(f'\n/* ===== {name} ===== */\n{text.strip()}\n')
(ROOT/'js'/'bundle.js').write_text('\n'.join(out),encoding='utf-8')
print('BUILT',ROOT/'js'/'bundle.js')
