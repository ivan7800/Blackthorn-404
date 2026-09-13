# Blackthorn 404 — Phase 3 Report

**Version:** 0.3.0  
**Phase:** PERCEPTION  
**Status:** IMPLEMENTED / PHASE 1+2 REGRESSION PASS / PHASE 3 E2E PASS / ZIP READY

## Objective

Turn the early Perception meter into a real four-level psychological-horror system. The implementation must alter the player's interpretation of the game without performing destructive or deceptive actions outside the game itself.

## Four Perception levels delivered

### Level I — sensory drift (`76 → 51`)

- subtle pitch bending in local/procedural audio;
- false shadows that appear and fade without collision;
- unstable light intensity;
- no fake doors, HUD lies or glitches yet.

### Level II — unreliable architecture (`50 → 26`)

- doors can appear visually sealed while remaining mechanically traversable;
- ghost geometry makes room proportions appear inconsistent;
- illusory enemies manifest as non-damaging threats;
- striking an illusory enemy dissipates it and returns a small amount of Stability;
- real enemy state and collisions remain separate.

### Level III — unreliable interpretation (`25 → 11`)

- optional false HUD readings for Health / Stability / Stamina / Perception;
- occasional false room label;
- diegetic memory-echo text inside the game canvas;
- more frequent illusory threats;
- accessibility option **Keep HUD values truthful** disables false numerical readings without changing actual Perception mechanics.

### Level IV — memory signal instability (`10 → 0`)

- canvas-only scanline / memory-signal glitches;
- explicit in-game label `MEMORY SIGNAL // LOCAL FICTION` during glitch bursts;
- interactable objects may temporarily become visually absent when the player is not close to them;
- nearby interactables are always rendered, so critical interaction cannot be hidden at the point of use;
- no object, inventory item, save, browser file or user data is actually deleted.

## Safety boundary

The Phase 3 implementation deliberately does **not**:

- close or reload the browser;
- delete or corrupt real saves;
- manipulate files;
- imitate operating-system dialogs or malware;
- change browser chrome;
- create fake external notifications;
- block a real exit merely because a hallucinated wall is drawn.

All deception is limited to the 320×180 game canvas and the game's own HUD.

## Mirror Room calibration

After Phase 2 is complete, the Covered Mirror becomes a diegetic test of the system. Each interaction deliberately descends one tier:

1. Perception 70 — Level I;
2. Perception 45 — Level II;
3. Perception 20 — Level III;
4. Perception 8 — Level IV;
5. final interaction restores stable readings and marks Phase 3 complete.

This sequence exists so the system can be experienced and QA-tested without waiting for normal campaign drain to reach every threshold.

The calibration cannot start before `phase2Complete`.

## Save migration

Save schema increased from 2 to 3. New fields:

- `phase3Complete`;
- `perceptionTiersSeen`;
- `perceptionMaxTier`;
- `perceptionTrialStep`.

Schema 1 and schema 2 saves normalize directly to schema 3. Existing Phase 1 / Phase 2 state is preserved.

## Accessibility

Phase 3 keeps the existing intensity selector:

- **Full** — complete sensory / architecture / HUD / glitch behavior;
- **Reduced** — lower-intensity presentation;
- **Minimal** — keeps only a restrained shadow cue and suppresses false architecture, false HUD, object veiling and glitch bursts.

New option:

- **Keep HUD values truthful** — actual values remain exact at all Perception levels.

Existing Reduce Motion and Disable Screen Shake remain respected.

## Audio

The procedural Web Audio engine now accepts the current Perception tier. It applies small local pitch/detune changes and safe in-game echo tones at higher levels. No streaming or remote audio was introduced.

## QA result

- Phase 1 regression: **20/20 PASS**.
- Phase 2 regression: **19/19 PASS**.
- Phase 3 suite: **19/19 PASS**.
- Combined automated browser checks: **58 PASS**.
- JavaScript/page errors: **0** across all three suites.
- Mobile viewport: **390×844 PASS**.
- Schema 2 → 3 migration: **PASS**.
- False enemy dissipation: **PASS**.
- Truthful HUD accessibility override: **PASS**.
- Level IV save-integrity guard: **PASS**.
- Save / Continue after Phase 3: **PASS**.

## Next phase

**Phase 4 — Combat**: expand the current vertical-slice combat into the campaign-grade system: clearer attack states, weapon-specific behavior, charge/strong attacks, defense/parry tuning, stamina economy, ranged limits, stagger/poise, hit telegraphing and reusable enemy-combat interfaces.
