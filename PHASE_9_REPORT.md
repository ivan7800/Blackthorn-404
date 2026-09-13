# Blackthorn 404: The Unremembered — Phase 9 Report

**Build:** v0.9.0  
**Phase:** 9 — The Room Behind Memory  
**Target:** GitHub Pages / static PWA

## Implemented

Phase 9 completes the playable 2026 final chapter after all eight historical Memory Spines have been recovered.

### Final chapter structure

The Root Door now remains locked until Phase 8 is complete. Once opened, it leads to nine authored spaces in the Pale Interval:

1. The Room Behind Memory
2. Index of Loss
3. Gallery of Contradictions
4. Suture Corridor
5. Three-School Lattice
6. Name Vault
7. Palimpsest Engine
8. Antechamber of Burden
9. The Pale Interval

Together with the Root Door itself, the final route comprises ten linked spaces.

### Final narrative mechanics

The final chapter reconstructs three relationships rather than forcing history into one authoritative account:

- contradiction;
- recognition;
- choice.

Three discreet choices are recorded without an “important decision” banner:

- witness: preserve / collapse;
- name: keep / erase;
- burden: carry / release.

These choices persist in the save but are deliberately not converted into endings yet. Phase 12 will consume them.

### Sigils + Perception integration

The Three-School Lattice requires maximum-intensity use of:

- `REVEAL + MIND + III`
- `PURGE + FLESH + III`
- `BIND + VOID + III`

The final boss repeats those three relationships during Phase III. The boss-room Sigil anchors cannot be solved before Phase III.

The final encounter also includes a deliberate low-PERCEPTION anchor. The player must accept the altered reading before the final local form can be created.

### Ninth boss

**The Unremembered** is the ninth campaign boss. It has three combat phases and cannot be resolved by damage alone.

Phase III requires:

- three maximum-intensity Sigil relations;
- deliberate low Perception;
- all three narrative choice groups already carried into the room;
- environmental interaction to force the entity into one local outline.

Only then can the final physical damage window be opened.

### New enemies

- Relation Husk
- Index Moth
- Pale Archivist
- Void Echo
- The Unremembered

### Save system

Save schema advanced from **8 → 9**.

New persisted fields:

- `phase9Complete`
- `finalSequenceStep`
- `finalSigilFlags[]`
- `finalChoices{}`

Schema 8 saves migrate without discarding Phase 1–8 progression.

## Regression fixes and safeguards

- Legacy QA suites were updated to validate the current schema instead of hardcoding schema 8.
- Final boss Sigil anchors are explicitly gated to boss Phase III.
- The Root Door cannot open before all eight historical chapters are complete.
- Final choices become immutable once made, preventing accidental state flipping.

## Result

Phase 9 is implemented and playable end-to-end. The campaign now contains the complete prologue/hub flow, eight historical chapters, final 2026 chapter and nine bosses.

The ending cinematics/branch resolution remain intentionally deferred to **Phase 12 — Endings** according to the agreed roadmap.
