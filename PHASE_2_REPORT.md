# Blackthorn 404 — Phase 2 Report

**Version:** 0.2.0  
**Phase:** Blackthorn Manor  
**Status:** IMPLEMENTED / PHASE 1 REGRESSION PASS / PHASE 2 E2E PASS / ZIP READY

## Objective

Turn Blackthorn Manor from a short narrative corridor into the persistent, evolving HUB for the whole campaign without breaking the Phase 1 vertical slice.

## Manor delivered

The HUB now contains 23 physical spaces across ground, upper and basement levels. The Portrait Gallery uses two runtime states (before and after Memory I) while remaining the same physical room.

### Ground floor

Vestibule, Great Hall, Portrait Gallery, Library, Dining Room, Winter Garden, East Corridor, Private Chapel, Central Stairwell and Servants’ Passage.

### Upper floor

Upper Landing, Elena’s Room, Blackthorn Study, Guest Wing, Nursery, Mirror Room, Attic Stair and sealed Attic.

### Basement

Wine Cellar, Boiler Room, Family Archive, Memory Vault and Root Door.

## Progression architecture

The house now behaves like a HUB rather than a menu:

1. Phase 1 completion changes the Portrait Gallery and exposes deeper Manor routes.
2. The Library contains the 1909 estate survey; recovering it unlocks the diegetic map.
3. The Dining Room contains the Blackthorn Key, opening the upper floor.
4. Elena’s Room becomes a safe checkpoint and restores core resources.
5. The Study contains the Service Key, opening basement access.
6. The Winter Garden and Servants’ Passage can be physically opened into shortcuts.
7. The Private Chapel contributes the “wound” mark.
8. The Family Archive contributes the lineage mark.
9. Estate survey + chapel mark + lineage mark unlock the Memory Vault.
10. The Memory Index closes Phase 2 without prematurely launching a future chapter.

## Evolving-house implementation

After the first historical memory, `houseStage` becomes 1. Present-day rooms gain subtle architectural seam marks and the Gallery resolves automatically to its altered state. Future memory phases can extend the same mechanism instead of creating parallel HUB implementations.

## Map

The map is not a web panel and is not available by default. It is rendered directly inside the 320×180 game canvas after the player recovers the estate survey. It shows only Manor spaces that the save has actually discovered and highlights the current room.

Controls: `M` / touch `MAP`; `M` or `Esc` closes it.

## Safe-room / checkpoint design

Elena’s Room and the Memory Vault are marked stable. Interacting with a safe point:

- restores Health;
- restores Stability;
- restores Stamina;
- partially restores Perception;
- updates the Manor death checkpoint;
- autosaves locally.

This replaces the Phase 1 behavior of always returning Manor deaths to the Vestibule.

## Save migration

Save schema increased from 1 to 2. A v0.1.0 save is normalized in place:

- Phase 1 completion becomes `houseStage: 1`;
- old `manor-gallery` saves resolve to `manor-gallery-after` when appropriate;
- new map, safe-room and Phase 2 fields receive safe defaults;
- arrays are de-duplicated during normalization.

No manual save reset is required.

## Rendering

Room-specific procedural pixel dressing was added for libraries/archives, dining room, winter garden, chapel, bedrooms, study, cellar, boiler room, Memory Vault, Mirror Room, Root Door, stairwells and Gallery. No commercial game assets are used.

## Deferred intentionally

Phase 2 does **not** claim to contain later historical chapters, final Perception behavior, complete Sigil roster, full enemy roster or final endings. The Attic is physically present but sealed for a later memory. The Root Door can be inspected but not resolved.

## QA result

- Phase 1 regression: 20/20 PASS.
- Phase 2 regression: 19/19 PASS.
- Combined automated browser checks: 39 PASS.
- JavaScript/page errors: 0 in both suites.
- Mobile viewport tested: 390×844.
- Save schema migration: PASS.
- Save / Continue after Phase 2: PASS.
- Keyboard map: PASS.
- Touch map: PASS.

See `QA_REPORT.md` for the complete verification matrix.

## Next phase

**Phase 3 — Perception**: expand the current Perception/ Stability foundation into the full four-tier psychological-horror system, while preserving accessibility caps and keeping every false failure safely inside the game frame.
