# Blackthorn 404 — Phase 1 Report

**Version:** 0.1.0  
**Phase:** Architecture + Vertical Slice  
**Status:** IMPLEMENTED / REGRESSION PASS / ZIP READY

## Scope delivered

Phase 1 establishes the technical and experiential identity of Blackthorn 404 without pretending the final 8-chapter campaign already exists.

Playable slice:

`Blackthorn Manor · Vestibule → Great Hall → Portrait Gallery → 1349 Memory Echo → Quarantine Gate → Ruined Nave → Bell Crypt → Bell Chamber → altered Portrait Gallery`

## Implemented systems

- original title / UI / visual identity;
- Canvas 2D 320×180 runtime with pixel-perfect CSS scaling;
- 16-bit procedural room rendering and lighting;
- keyboard + pointer/touch input abstraction;
- quick attack, heavy attack, stamina, guard, parry and dodge;
- Health / Perception / Stability;
- Perception drain from corruption and enemy pressure;
- safe visual Perception effects confined to the game frame;
- BIND + VOID + I;
- WARD + MIND + I;
- three normal enemy behaviours;
- boss weakness mechanic based on ringing the empty bell frame;
- three boss phases;
- notes / Memory Anchor interactions;
- altered present-day return state after boss completion;
- 3 local save slots;
- schema normalization;
- pre-save local backup and recovery function;
- responsive desktop/mobile controls;
- pause and settings;
- procedural local Web Audio;
- PWA manifest and versioned Service Worker;
- strict relative runtime paths / GitHub Pages-compatible structure;
- generated static `bundle.js` workflow;
- static release gate and Chromium regression script.

## Reuse from Pocket 404 DX v6.1.0

The phase keeps the proven engineering approach of the supplied base: Canvas game loop, unified keyboard/touch control layer, room transitions, local-first save slots, save normalization, procedural audio, static bundle, PWA shell, relative URLs, responsive game framing, and automated browser regression.

The game-specific layer is replaced: Veyra data, Rune Quest naming, maps, weapons, runes, enemies, narrative, chapter cards, bright adventure rendering, progression and endings are not carried over.

## Important defect found and fixed during Phase 1

An autosave could leave the engine and UI holding different in-memory save objects. Persistent storage remained valid, but immediate UI/state reads could become stale. The save callback now keeps the engine object and application state synchronized after normalization and persistence.

This was discovered by regression, fixed in the implementation, and the full regression was rerun afterward.

## Visual QA

Screenshots included:

- `QA_PHASE1_DESKTOP.png`
- `QA_PHASE1_MOBILE.png`

The game screen remains the visual focus. Touch controls are separate from the canvas, readable and available at 390×844 without horizontal overflow.

## Not part of Phase 1

The following are intentionally deferred to their roadmap phases: complete Manor, all Perception hallucination classes, final combat tuning, all 12 Sigils, eight full historical chapters, 24+8 enemy roster implementation, all nine final bosses, 40 documents, three final endings, NG+, full remapping, final flash-intensity controls, long-session mobile balance and complete campaign playthrough.

## Next phase

**Phase 2 — Blackthorn Manor**: complete evolving HUB, room discovery, shortcuts, safe rooms, map, Memory Spine integration and chapter-trigger architecture.
