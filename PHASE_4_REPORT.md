# Blackthorn 404 — Phase 4 Report

**Version:** 0.4.0  
**Phase:** 4 — COMBAT  
**Status:** PASS / GitHub Pages release candidate

## Objective

Turn the Phase 1 combat prototype into a reusable campaign combat grammar without turning Elena into a conventional action hero or breaking the authored weapon identity of historical chapters.

## Implemented combat foundation

- weapon inventory with Q/E and touch cycling;
- authored chapter weapon locks (historical memories can force their own weapon);
- four currently playable weapon archetypes in the controlled Weapon Imprint:
  - Iron Candlestick — fast improvised melee;
  - Woodsman's Axe — slow, high-poise damage;
  - Blackthorn Ritual Dagger — fastest recovery and extended perfect-parry window;
  - Webley Service Revolver — finite magazine/reserve ammunition;
- two additional production definitions prepared for later chapters: Ashwood Pilgrim Spear and Blackthorn Crossbow;
- quick attacks now consume weapon-specific stamina;
- hold/release heavy attack with charge scaling;
- guard movement penalty;
- perfect-parry window with source stagger;
- guard break when stamina is exhausted;
- enemy poise and stagger states;
- hit-stop on confirmed impacts;
- enemy melee wind-up / telegraph before damage;
- friendly player projectiles for ranged weapons;
- finite ammo, reserve ammo and automatic reload;
- combat statistics persisted in saves;
- schema 3 → 4 migration;
- combat state / ammo / charge feedback in the HUD;
- touch WEAPON selector and press/release heavy charge.

## Controlled Weapon Imprint

After Phase 3 is complete, the Memory Vault exposes a diegetic **Weapon Imprint**. It reconstructs weapon handling from several memories inside a contained arena rather than turning the game into a chapter-select menu.

The imprint validates:

- melee speed/reach differences;
- charged heavy attacks;
- poise break / stagger;
- attack telegraphs;
- perfect parry;
- guard break;
- ranged fire;
- ammunition and reload;
- keyboard and touch weapon switching.

Completing it sets `phase4Complete`, awards `four-ways-to-hurt`, and returns Elena to the Memory Vault.

## Design guardrails

- Elena remains vulnerable; stamina prevents attack/guard spam.
- Historical chapter weapons remain authored by the chapter and cannot be cycled away during that memory.
- Poise is separate from HP, so “heavy” means more than a larger damage number.
- Ranged weapons are resource-limited.
- Enemy contact itself does not instantly deal melee damage; a wind-up precedes the strike.
- Perception illusions remain outside real enemy damage logic.

## Regression result

- Phase 1: 20/20 PASS
- Phase 2: 19/19 PASS
- Phase 3: 19/19 PASS
- Phase 4: 20/20 PASS

**Total: 78/78 automated browser checks PASS.**

`0` JavaScript console/page errors were observed by the four browser suites.

## Deferred by design

Phase 4 builds the shared combat system; it does **not** claim that the final 9–12 weapon campaign roster, all 24 normal enemies, elites, minibosses or later boss movesets are finished. Those are authored into the historical chapters and later boss/content phases.
