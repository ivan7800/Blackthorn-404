# Blackthorn 404 — Phase 15 Balance Report

Version: **0.15.0**  
Save schema: **12 (unchanged)**  
Scope: campaign balance only. Narrative progression, endings and NG+ meta-state remain compatible with v0.13/v0.14 saves.

## Goal

Phase 15 converts the accumulated campaign tuning into a deliberate difficulty curve rather than allowing chapter-by-chapter additions to define balance accidentally. The pass covers stamina economy, encounter density, safe rooms, weapon outliers, ammunition budgets, Sigil economy, PERCEPTION pressure, boss vulnerability windows and NG+ caps.

## Changes implemented

### 1. Central balance profile

Runtime tuning is centralized in `BALANCE` in `js/data.js` so future phases cannot silently drift values across several files.

Stamina profile:

- idle regeneration: **16 / s**
- guarding regeneration: **3.5 / s**
- heavy-charge regeneration: **2.5 / s**
- quick-attack recovery delay: **0.32 s**
- heavy-attack recovery delay: **0.58 s**
- dodge recovery delay: **0.62 s**
- blocked-hit recovery delay: **0.42 s**
- dodge cost: **20**
- block cost: **11**

The practical result is that fast weapons can still feel fast, but passive regeneration can no longer erase their stamina cost during uninterrupted pressure.

### 2. Historical encounter curve

Enemy density was normalized without deleting rooms or chapter mechanics.

| Memory | Enemies including boss |
|---|---:|
| 1349 | 11 |
| 1198 BCE | 11 |
| 395 CE | 11 |
| 1587 | 11 |
| 1790 | 10 |
| 1917 | 10 |
| 1956 | 10 |
| 1987 | 10 |

Later memories use tougher individual enemies and selected mixed encounters instead of simply stacking more actors into each room. Total campaign room count remains **108** and boss count remains **9**.

### 3. Safe rooms

Every authored historical checkpoint/safe threshold is mechanically enemy-free. Recovery rooms no longer contain latent enemy definitions that contradict their narrative function.

### 4. Weapon normalization

- **Blackthorn Duelling Sabre**: cooldown **0.30 s**, quick stamina **6**. It remains responsive but no longer exceeds the intended fast-melee band through stamina-neutral pressure.
- **Northmere Heavy Torch**: quick damage **7**, heavy **14**, poise **9**, heavy poise **19**. It now remains viable despite its deliberately awkward reach/cadence.
- Existing ammunition economies remain finite: Service Revolver **24** total starting rounds; Flare Pistol **6**.

The static balance gate verifies melee quick-DPS and heavy-efficiency bands rather than demanding identical weapons.

### 5. PERCEPTION pacing

Ambient corruption pressure is slightly smoother while scripted shocks and authored low-PERCEPTION sequences remain intact.

- corrupt drain coefficient: **1.15**
- enemy pressure scale: **0.04**
- safe-room Stability recovery: **12 / s**
- safe-room PERCEPTION recovery: **4 / s**

The system still creates sustained psychological pressure, but ordinary traversal is less likely to avalanche into Level IV merely because combat took longer than expected.

### 6. Boss readability / weapon fairness

Phase III vulnerability windows were lengthened enough to support heavy historical weapons without trivializing the environmental gate:

- Bell Without a Tongue: **5.75 s**
- normal historical focus windows: **6.25 s**
- The Unremembered final window: **9.5 s**

Boss HP remains a non-decreasing campaign curve: **78, 86, 92, 96, 102, 108, 110, 116, 150**.

### 7. New Game+ caps

NG+ still becomes sharper, but deep cycles cannot turn into exponential stat inflation.

- HP: **+5% per cycle**, cap **+15%**
- damage: **+4% per cycle**, cap **+12%**
- speed: **+1.5% per cycle**, cap **+5%**

Narrative gates, Refracted Memories, legacies and ending logic are unchanged.

## Automated balance gate

`tools/balance_check.py` now release-gates the numeric contract. Result:

**31 / 31 PASS**

The gate covers version/schema, 108 rooms, 12 weapons, 12 Sigils, 9 bosses, safe-room integrity, all eight checkpoints, historical density, weapon bands, ammunition, Sigil III costs/cooldowns, stamina delays/regeneration, PERCEPTION smoothing, boss HP/windows and NG+ caps.

## Phase 15 runtime QA

`tools/phase15_e2e.py` result:

**30 / 30 PASS**

Runtime checks include:

- current version / schema boot;
- live central BALANCE profile;
- room/boss/content counts;
- encounter curve;
- fast-weapon stamina exhaustion;
- idle stamina recovery;
- dodge and block recovery delays;
- corrupt-zone / safe-room PERCEPTION behavior;
- historical and Bell Phase III focus windows;
- NG+ cycle-1 scaling and deep-cycle caps;
- unchanged True Ending requirements;
- late mixed encounter on 390×844 touch/mobile;
- no horizontal overflow;
- zero JavaScript `console.error` / `pageerror` in the Phase 15 harness.

An early harness read sampled stamina after the live `requestAnimationFrame` had already resumed regeneration. The test was corrected to perform the action and sample the value atomically. This was a test race, not a runtime defect.

## Full regression

All Phase 1–14 suites were rerun against v0.15.0.

**331 / 331 inherited checks PASS**  
**30 / 30 Phase 15 runtime checks PASS**  
**361 / 361 functional checks PASS**

The Phase 7 combined run hit the external Playwright process limit (`EPIPE`) after reaching Chapter IV without a failed assertion. It was rerun alone and completed **23/23 PASS**. No game code was changed to hide the timeout.

The separate data-driven balance gate is **31/31 PASS** and is reported independently from the functional 361-check total.

## Release status

Phase 15 is considered complete when the final bundle additionally passes `tools/release_gate.py`, JavaScript/Service Worker syntax checks and ZIP integrity. Phase 16 remains the final release/QA audit; Phase 15 does not claim the project is final yet.
