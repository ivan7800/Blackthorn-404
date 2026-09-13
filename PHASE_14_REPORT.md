# Blackthorn 404: The Unremembered — Phase 14 Report

**Release:** v0.14.0  
**Phase:** UX / Mobile / PWA  
**Save schema:** 12 (unchanged; no campaign-state migration required)

## Goal

Polish the finished campaign for real browser/mobile use without changing narrative progression, combat balance or save semantics. The phase targets touch ergonomics, iPhone safe areas, portrait/landscape behavior, fullscreen fallback, accessibility, low-power rendering, installability, offline shell behavior and old-cache migration.

## Implemented

- Safe-area-aware layout using `env(safe-area-inset-*)` for notched/home-indicator devices.
- Dynamic viewport height using `visualViewport` + `100dvh` fallback to reduce mobile browser chrome jumps.
- Dedicated coarse-pointer landscape layout: game screen left, controls right, all interaction targets kept inside the viewport.
- Portrait remains fully supported; a non-blocking landscape suggestion appears once for ~3.2 seconds on coarse-pointer phones.
- Touch targets are at least ~44 px in tested portrait and landscape layouts.
- New settings: touch visibility (Always/Auto/Hidden), large touch targets, left-handed layout, performance mode (Auto/Quality/Battery saver), landscape hint toggle.
- Left-handed mode swaps D-pad/action placement using CSS grid without changing control semantics or DOM order.
- Fullscreen button now has a CSS **Focus Mode** fallback for browsers/devices that do not expose `requestFullscreen()` (notably common iOS web-app cases).
- Fullscreen/focus state updates button label and viewport metrics safely.
- Battery Saver disables decorative grain/scanline/backdrop-blur work while leaving gameplay and PERCEPTION logic intact.
- System `prefers-reduced-motion` is respected in addition to the in-game Reduce Motion setting.
- PWA install status UI (`WEB`, `INSTALLABLE`, `APP`, `OFFLINE READY`, `OFFLINE`) and install prompt handling.
- Manifest hardened with app `id`, `display_override`, language/categories and standalone/fullscreen preferences.
- Service Worker upgraded:
  - v0.14 cache namespace;
  - critical shell precache separated from optional documentation;
  - network-first navigation so updated HTML is preferred when online;
  - cache-first/static stale-while-refresh behavior for same-origin assets;
  - old `blackthorn404-*` cache cleanup on activation;
  - offline navigation fallback to cached `index.html`;
  - `SKIP_WAITING` message support.
- Existing relative paths, CSP, static-only architecture, no accounts, no telemetry and GitHub Pages subpath compatibility preserved.

## Visual QA correction during Phase 14

The first landscape pass technically kept the touch-control container inside the viewport, but the absolute-positioned ATTACK button extended beyond that container and was visibly clipped at the right edge. QA was strengthened to measure every individual touch button, the action cluster was compacted to 44 px targets, and the final landscape capture is fully contained.

The initial portrait hint also remained visible indefinitely. It was changed to a one-time, ~3.2 second non-blocking hint so portrait gameplay is not obscured.

## Regression

All Phases 1–13 were rerun against v0.14.0 after the UX/PWA changes.

- Existing regression: **299/299 PASS**
- Phase 14 specific: **32/32 PASS**
- Consolidated: **331/331 PASS**

No save schema increment was made because Phase 14 stores only user preferences in the pre-existing settings key and does not alter campaign-state shape.

## Service Worker runtime caveat

The project contains and statically validates the complete Service Worker install/activate/fetch paths. This execution environment may block Chromium from navigating to local HTTP origins, so a real install/offline round-trip must still be confirmed once deployed to an HTTPS origin such as GitHub Pages. The release does not claim that unavailable environment-specific round-trip as a browser PASS.
