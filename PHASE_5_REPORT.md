# Blackthorn 404: The Unremembered — Phase 5 Report

## Release
- Version: **v0.5.0**
- Phase: **5 — SIGILS**
- Save schema: **5**
- Target: static GitHub Pages / PWA / Canvas 2D / vanilla JavaScript

## What changed
Phase 5 replaces the original two hard-coded sigils with one shared grammar: **Verb + School + Intensity**. The three schools are **FLESH**, **MIND**, and **VOID**. Every formula supports intensity **I, II, III**, with increasing Stability cost, cooldown and effect.

### 12 production formulas
**VOID**
- BIND — immobilises manifested enemies; higher intensity affects more targets for longer.
- SEVER — direct pattern damage plus poise damage.
- BRAND — marks a target so subsequent physical hits are amplified.
- SHIFT — short spatial displacement with a brief invulnerability window.

**MIND**
- WARD — stabilises Perception pressure and preserves the existing Phase 1 WARD behaviour.
- REVEAL — clears false Perception layers and exposes hidden/veiled interactables.
- LURE — breaks hostile attack intent and temporarily confuses an enemy.
- ECHO — extracts a contextual clue/contradiction from the current room.

**FLESH**
- MEND — converts Stability into immediate health recovery.
- FORTIFY — temporary incoming-damage reduction.
- PURGE — suppresses local corruption pressure and restores Perception/Stability.
- SIPHON — damages a manifested enemy and returns health to Elena.

## Sigil Codex
A new modal Sigil Codex is available with **F** or the mobile **SIGILS · F** control. It:
- groups known formulas by school;
- supports direct formula selection;
- supports intensity I/II/III selection;
- displays the selected school, Stability cost and cooldown;
- pauses simulation while open;
- is responsive down to 390×844 without horizontal overflow.

Legacy quick controls remain valid:
- **R** — cast selected formula;
- **T** — cycle formula;
- **G** — cycle intensity;
- **F** — open/close Codex.

## Controlled Sigil Lattice
The Memory Vault now contains a **Sigil Lattice** after Phase 4. Entering it reconstructs all 12 formulas for calibration and opens a controlled Grammar Chamber.

Three environmental locks prove that Sigils are not combat-only:
- **REVEAL + MIND + II** resolves the Veiled Script;
- **PURGE + FLESH + II** resolves the Living Knot;
- **BIND + VOID + III** resolves the Null Aperture.

Completing all three sets `phase5Complete`, records the grammar achievements and returns Elena to the Memory Vault.

## Save migration
Schema 4 saves migrate to schema 5 without losing combat, Manor or Perception progress. New persisted fields include:
- `phase5Complete`;
- `sigilIntensity`;
- `sigilMaxIntensity`;
- `sigilPuzzleFlags`;
- `sigilStats` with total casts, school counts and highest intensity used.

Existing `bind-void-i` and `ward-mind-i` IDs are retained for backwards compatibility.

## Integration notes
- BRAND modifies both melee and player projectile damage.
- FORTIFY is applied before guard/parry resolution.
- PURGE and WARD alter Perception pressure without bypassing the Perception accessibility settings.
- REVEAL suppresses false shadows/enemies/glitches while active and makes veiled interactables visible.
- LURE cancels pending enemy wind-up rather than only changing a visual state.
- Puzzle resolution checks formula ID, minimum intensity and spatial proximity.

## Result
Phase 5 is a **system foundation**, not the final campaign distribution of spells. The grammar is complete and production-usable; later historical chapters can decide when formulas or intensity tiers are narratively discovered without needing another magic-system rewrite.
