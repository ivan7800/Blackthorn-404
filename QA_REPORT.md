# BLACKTHORN 404 — FINAL QA REPORT

## Status

**v1.0.0 FINAL — RELEASE GATE PASS**

## Automated functional regression

| Suite | Result |
|---|---:|
| Phase 1 | 20/20 |
| Phase 2 | 19/19 |
| Phase 3 | 19/19 |
| Phase 4 | 20/20 |
| Phase 5 | 28/28 |
| Phase 6 | 22/22 |
| Phase 7 | 23/23 |
| Phase 8 | 20/20 |
| Phase 9 | 22/22 |
| Phase 10 | 27/27 |
| Phase 11 | 25/25 |
| Phase 12 | 25/25 |
| Phase 13 | 29/29 |
| Phase 14 | 32/32 |
| Phase 15 | 30/30 |
| Phase 16 | 27/27 |
| **TOTAL** | **388/388** |

## Additional gates

- Balance gate: **31/31 PASS**
- JavaScript syntax: **PASS**
- Service Worker syntax: **PASS**
- Relative GitHub Pages paths: **PASS**
- No runtime CDN/backend/private API: **PASS**
- Manifest icons present: **PASS**
- Local asset references: **PASS**
- Mobile portrait 390×844: **PASS**
- Mobile landscape 844×390: **PASS** (Phase 14 regression)
- Touch target minimums: **PASS**
- Save migration to schema 12: **PASS**
- Normal/Dark/True endings: **PASS**
- New Game+: **PASS**
- Records / Achievements / Bestiary: **PASS**
- Credits: **PASS**
- Separate ambience and FX volume: **PASS**
- Zero JS/pageerror in final desktop/mobile suite: **PASS**

## Final caveat

A real Service Worker installation/offline reload must be repeated on the deployed HTTPS GitHub Pages origin because this environment does not permit the required localhost browser round-trip. No claim of that specific runtime check is fabricated.
