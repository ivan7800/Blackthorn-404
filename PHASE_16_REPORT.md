# PHASE 16 — FINAL QA / RELEASE REPORT

## Release decision

**PASS — Blackthorn 404: The Unremembered v1.0.0 FINAL is suitable for publication as a static GitHub Pages release.**

Phase 16 was treated as a release audit rather than a feature phase. Existing campaign systems were preserved unless the audit found a promise from the original design that was not actually exposed to the player.

## Blocking issues found and corrected

1. **Development-phase chrome was still visible.** The v0.15 title screen still advertised Phase 14/15 and milestone dialogs exposed internal development labels. The final UI now presents narrative milestones only.
2. **Credits were missing.** A Credits surface is now available from the title screen and identifies I. Roig / Universo 404.
3. **Achievements existed only in save data.** Records now exposes the achievement catalogue and unlocked state.
4. **Bestiary was promised but not exposed.** Records now contains a Bestiary derived from already-visited rooms and defeated/encountered bosses; no save-schema inflation was required. Final distribution: 26 creatures, 8 elites, 8 minibosses and 9 bosses.
5. **Audio controls did not meet the original split-volume requirement.** A procedural ambience/drone channel now has an independent Music / ambience volume control while FX retains its own control and global mute still works.
6. **One real achievement was missing from the visible catalogue.** `unreliable-witness` could be unlocked but had no Records entry. It is now represented as **Unreliable Witness**.
7. **Records achievement counter could include legacy/internal IDs.** It now counts only achievements present in the public catalogue.

## Final content inventory

- 108 playable rooms
- Blackthorn Manor 2026 hub
- 8 historical Memory Spines + final 2026 chapter
- 12 weapons
- 12 Sigils across FLESH / MIND / VOID, intensity I–III
- 26 standard creatures
- 8 elites
- 8 minibosses
- 9 three-phase bosses
- 87 evidence entries
- 47 achievement entries
- 51 Bestiary entries
- 3 endings
- New Game+ with 9 Refracted Memories
- 3 local save slots + backup/recovery + migrations
- keyboard and touch controls
- accessibility / safe-area / left-handed / performance options
- separate ambience and FX volume + mute
- PWA shell and offline fallback

## Regression result

All phase suites were rerun against the v1.0.0 bundle, not against archived phase builds.

- Phases 1–15: **361/361 PASS**
- Phase 16 final-release suite: **27/27 PASS**
- Functional total: **388/388 PASS**
- Balance gate: **31/31 PASS**

Phase 15 produced one timing false negative when run directly after other Chromium suites: the live game loop had already reduced a 6.25-second boss-vulnerability timer below the test's `>6` threshold. Re-running the same suite in isolation passed 30/30 with no code or balance changes.

## PWA note

The Service Worker, manifest, cache namespace, relative paths, offline fallback strategy and old-cache cleanup are statically validated. Shell resources are also checked as local project files. A true install/offline round-trip in Chromium cannot be claimed inside the current execution environment when localhost navigation is administratively blocked; this remains the one verification to repeat after GitHub Pages deployment over HTTPS.

## Final versioning

- Game version: **1.0.0**
- Save schema: **12**
- Service Worker cache: `blackthorn404-v1.0.0-final`

The save schema deliberately remains 12 because Records is derived from existing room/achievement state and the new audio preference lives in the existing settings object. Existing v0.13–v0.15 saves remain compatible.
