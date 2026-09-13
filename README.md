# Blackthorn 404: The Unremembered

**v1.1.1 — SNES DARK FANTASY RELEASE HARDENING**

Original 16-bit psychological / cosmic-horror web adventure for the Universo 404 ecosystem. Static HTML/CSS/vanilla JavaScript + Canvas 2D, prepared for GitHub Pages and installable PWA use.

## Complete campaign

`Blackthorn Manor 2026 → 8 historical Memory Spines → Pale Interval → The Unremembered → 3 endings → New Game+`

## Release content

- evolving Blackthorn Manor HUB;
- 108 playable rooms across the Manor, eight historical memories and the final chapter;
- four-level PERCEPTION system;
- 12 SIGIL formulas across FLESH / MIND / VOID, intensity I–III;
- stamina / quick / charged heavy / guard / perfect parry / dodge;
- 12-weapon campaign arsenal with ranged ammunition and reload;
- 26 standard creatures, 8 elites, 8 miniboss-class encounters and 9 three-phase bosses in the Bestiary;
- 87-entry evidence archive;
- achievements and Bestiary available from Records;
- Normal / Dark / True Ending resolved from play state;
- New Game+ with ending legacies and 9 Refracted Memories;
- three local save slots, local backups and schema migrations;
- keyboard + touch controls, safe-area mobile layouts, left-handed mode and Focus Mode;
- accessibility options, separate music/ambience + FX volume, procedural Web Audio and mute;
- local-only runtime with no accounts, telemetry, backend, CDN or private API keys;
- PWA shell with offline fallback and cache migration.

## Save schema

Current schema: **12**. v1.1.1 is a release-hardening patch over the v1.1.0 visual edition, so the save schema remains unchanged. Existing v1.0.0/v1.1.0 saves remain compatible.

## QA

See `QA_REPORT.md`, `PHASE_16_REPORT.md`, `tools/final_release_gate.py`, and all phase regression suites.

## v1.1.1 release hardening

- Restores browser pinch-zoom accessibility.
- Loads hero/scene art from the existing local assets instead of duplicated Base64 payloads.
- Hardens corrupted/tampered local save normalization for rooms, weapons and sigils.
- Bumps the PWA cache namespace for clean updates from v1.1.0.

## v1.1.0 visual overhaul

- SNES-inspired dark-fantasy art direction with gothic/Soulslike atmosphere.
- New cinematic title artwork and ornate medieval UI skin.
- Six embedded pixel-art environment backdrops selected by era / boss context.
- Larger player and enemy rendering while preserving original collision boxes.
- Bosses render at a larger visual scale with stronger telegraphs and aura effects.
- Stronger torch lighting, perspective floor treatment, gothic thresholds and projectile glow.
- Mobile portrait and landscape layouts preserved; 44px minimum touch targets remain enforced.
- No gameplay, balance, campaign, ending or save-schema changes.

## GitHub Pages

Upload the ZIP contents to the repository root and publish that branch with GitHub Pages. All runtime paths are relative. Service Worker cache namespace: `blackthorn404-v1.1.1-release`.
