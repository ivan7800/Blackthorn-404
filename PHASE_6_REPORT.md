# Blackthorn 404: The Unremembered — Phase 6 Report

**Release:** v0.6.0  
**Phase:** Historical Chapter I — *The Bell Without a Tongue*  
**Protagonist:** Ysabel Thorne  
**Era:** 1349  
**Location:** Priory of Saint Orren

## What changed

The former four-room Saint Orren vertical slice has been replaced by a complete ten-room historical chapter:

1. Quarantine Gate
2. Infirmary Court
3. Apothecary
4. Ruined Nave
5. Rain Cloister
6. Plague Ward
7. Ossuary Passage
8. Bell Crypt
9. Belfry Stair
10. Bell Chamber

The chapter has its own local checkpoint, authored route gates, documents, optional secret and four additional chapter enemy definitions: Plague Hollow, Choir Listener, Ash Verger and Grave Bearer. Ysabel's Woodsman's Axe remains a fixed-memory weapon.

## Core chapter mechanics

### Sound / resonance
Sound is now a gameplay signal rather than only ambience. The covered handbell creates a noise pulse and attracts a Hollow. Three stone resonators must then be struck in the correct order across different rooms. A wrong order resets the sequence and costs Perception; the correct order makes the ossuary wall remember a doorway.

### Plague warding
Ysabel must recover vinegar, myrrh and juniper, then prepare a fumigation ward in the Plague Ward. The ossuary route is blocked until the mixture exists. The mechanic is framed as protection against mnemonic absence, not as a historical medical claim.

### Memory checkpoint
The Apothecary's steady flame creates an echo-local checkpoint. Death inside the historical memory returns to that checkpoint without contaminating Blackthorn Manor's present-day safe-room state.

### Optional secret
The Ninth Cot is an optional contradiction: a warm occupied bed with no visible patient and a token bearing the name “MARA”. It is tracked separately and awards the `The Ninth Cot` achievement.

## Boss revision

**The Bell Without a Tongue** now has 78 HP and three explicit combat phases. Phase III removes automatic vulnerability: the player must deliberately interact with the empty bell frame to give the entity a temporary outline before damage can land. This closes the old loophole where the final phase could be brute-forced without using the arena mechanic.

## Save / compatibility

Save schema is now **6**. Schema 5 migrates automatically and adds:

- `phase6Complete`
- `chapter1PuzzleStep`
- `memorySafeRoom`
- `chapter1Stats.soundStrikes`
- `chapter1Stats.hollowsDrawn`
- `chapter1Stats.secrets`

Existing Phase 1–5 data, weapon inventory, Sigils, Perception metadata and Manor state remain compatible.

## Continuity correction

The design bible previously had a conflict between the canonical chronology and the implemented first Memory Spine. v0.6.0 resolves it: **1349 is canonical Chapter I because it is the first recovered memory**, while the campaign is intentionally non-chronological. Phase 7 therefore covers 1198 BCE, 395 CE and 1587 as Chapters II–IV.

## QA result

Regression suites:

- Phase 1: 20/20 PASS
- Phase 2: 19/19 PASS
- Phase 3: 19/19 PASS
- Phase 4: 20/20 PASS
- Phase 5: 28/28 PASS
- Phase 6: 22/22 PASS

**Combined: 128/128 PASS.**

No JavaScript `pageerror` or console errors were observed in the Phase 6 browser suite. Mobile layout was checked at 390×844. The final release also passes syntax checks, release gate and ZIP integrity validation.
