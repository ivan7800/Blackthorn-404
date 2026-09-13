# Blackthorn 404 — Phase 13 Report

## Release

- Version: **0.13.0**
- Phase: **13 — New Game+**
- Save schema: **12**
- Target: GitHub Pages / static PWA

## Goal

Add a replay layer that meaningfully changes a second run without bypassing the authored campaign. New Game+ must preserve knowledge and history, not completed chapter state.

## Implemented

### New Game+ entry
A completed Phase 12 ending unlocks `NEW GAME+` on the title screen. Only completed slots are selectable as NG+ sources.

### Clean campaign reset
The following reset for each cycle: room/chapter progression, bosses, puzzles, keys/flags, current evidence, weapons, ammo state, phase completion, final choices and ending resolution.

### Persistent meta-memory
The following persist: `endingsSeen`, achievements, legacy evidence, legacy Sigil knowledge, prior-cycle summaries and accumulated legacy play time.

### Ending legacies
- Normal → **Witness Thread** → WARD + MIND I.
- Dark → **Tenant Mark** → BRAND + VOID I.
- True → **Open Hand** → REVEAL + MIND I + MEND + FLESH I.
- All three endings seen → SHIFT + VOID I + `three-versions` achievement.

These do not bypass the Phase 5 Lattice; maximum intensity resets to I.

### Refracted Memories
Nine NG+-exclusive interactables are distributed across Blackthorn and the eight historical memories. They react to the source ending, cannot be duplicated, persist in save data and unlock `Nine Refracted Memories` when all are recovered.

### Legacy Archive
Evidence from previous cycles is readable in the Archive but is clearly marked as remembered context and does **not** count as rediscovered current-cycle evidence. This prevents the True Ending requirements from being silently auto-completed.

### NG+ balance
Enemy health, damage and speed receive modest capped scaling per cycle. Historical forced weapons and all authored boss/puzzle gates remain unchanged.

## Bugs / risks checked

- no phase-completion leakage into NG+
- no current evidence inherited as completion credit
- no duplicate Refracted Memory collection
- no ending or achievement loss across cycles
- no Sigil Intensity III carry-over
- no chapter unlock carry-over
- save/reload retains cycle metadata
- repeated NG+ correctly increments cycle history
- normal non-NG saves remain unchanged

## QA

Phase 13 dedicated suite: **29/29 PASS**.
Full regression Phases 1–13: **299/299 PASS**.

See `QA_REPORT.md` for the consolidated matrix.
