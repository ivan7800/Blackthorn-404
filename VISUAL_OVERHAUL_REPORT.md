# Blackthorn 404: The Unremembered — v1.1.0 Visual Overhaul

## Objective
Replace the intentionally minimal prototype-like rendering with a stronger SNES dark-fantasy presentation while preserving the complete v1.0 campaign and all gameplay systems.

## Implemented
- cinematic gothic title composition based on the approved visual direction;
- ornate dark-fantasy UI / HUD / dialog / controls;
- embedded pixel-art scene backdrops for Manor, medieval, ancient, modern, boss and Pale Interval contexts;
- perspective floor and stone treatment layered over the collision-safe room geometry;
- stronger torch pools, warm highlights, corruption haze and vignetting;
- larger visual player sprite with crimson cloak, armor, directional weapon silhouette and guard/charge feedback;
- larger enemy silhouettes and significantly larger boss rendering without changing hit boxes;
- improved interactable glow, projectile telegraphs and boss aura treatment;
- robust portrait and landscape mobile fallback.

## Compatibility
Save schema remains **12**. No campaign, balance, weapon, Sigil, boss logic, ending or NG+ state was changed.

## QA
- Phase 1–16 E2E suites: PASS after the renderer changes.
- Functional regression baseline: **388/388 PASS**.
- Visual gate: **14/14 PASS**.
- Final release gate: **50/50 PASS**.
- Balance gate: **31/31 PASS**.
- Mobile portrait: PASS.
- Mobile landscape: PASS, including 44 px touch targets and no viewport overflow.
- JavaScript / Service Worker syntax: PASS.

## Note
The visual renderer uses embedded local artwork for deterministic offline/test rendering while retaining local asset copies in `assets/art/`. No CDN, telemetry or external runtime dependency was added.
