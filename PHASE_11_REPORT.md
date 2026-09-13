# Blackthorn 404: The Unremembered — Phase 11 Report

## Release

- Version: **0.11.0**
- Save schema: **10**
- Phase: **Narrative / Lore**
- Target: turn the existing campaign into a coherent evidence network rather than a sequence of disconnected horror episodes.

## Implemented

### Blackthorn Evidence Archive

A persistent in-game archive is now available with **J** or **Pause → Archive**. Evidence is only unlocked after the player physically inspects the corresponding object in the Manor or a Memory Echo. The archive supports filtering and full entry inspection on desktop and mobile.

The authored corpus contains exactly:

- **40 documents**
- **20 personal notes**
- **12 recordings / transcriptions**
- **15 counter-memory secrets**
- **87 total evidence entries**

Every entry stores era, room, evidence type, narrative thread, full recovered text and an interpretive evidence annotation. Selected entries expose known cross-era connections when the related evidence has also been found.

### Cross-era narrative threads

The archive now makes the campaign's recurring ideas explicit without resolving them into one official truth:

1. **MARA / recurring name** — Saint Orren, Vespera, hidden Manor evidence and the Pale Interval reveal that “Mara” is not one immortal person; different erased people have partially collapsed to the same surviving name-shape.
2. **Geometry of absence** — Asterion's thorn-star mark precedes Blackthorn by millennia and later reappears in Roman administrative evidence.
3. **Records that disagree** — Marcus Aelian's census establishes contradiction as positive evidence rather than an error to correct.
4. **The second body** — Lucia Varetti links anatomy, shadow and relational identity.
5. **House as memory** — Eleanor Blackthorn's 1790 material now explains why the Manor was intentionally built around impossible measurements rather than accidentally haunted.
6. **Two witnesses** — Elias Ward's 1917 material demonstrates that two imperfect accounts can resist a single perfect erasure.
7. **The eleventh carrier** — Naomi Pike's 1956 recordings define Frequency Eleven as a relationship-dependent carrier rather than an ordinary broadcast.
8. **Frame Zero** — Theo Voss's 1987 tapes preserve impossible continuity instead of editing it away and connect directly to Elena.
9. **Relationship / erasure** — the final chapter reframes The Unremembered as an entity that destroys distinctions and relationships first; missing facts are the secondary symptom.

### Chapters V–VIII narrative rewrite

The generic placeholder prose left from the rapid Phase 8 content build has been replaced at runtime with authored evidence. Important examples include:

- Eleanor's **seven-foot surplus** and the impossible 1790 lease.
- Elias's **tomorrow casualty list**, contradictory trench maps and impossible 1974 school register.
- Naomi's **Frequency Eleven**, paired-listener behaviour and unbroadcast lullaby remembered by Elena.
- Theo's **Tape Zero**, containing thirteen seconds recorded before RECORD and an older Elena's warning.

### Seven new counter-memories

Seven additional secret evidence objects were placed across the full campaign:

- Ribbon behind the lath — Blackthorn attic
- Layered service plate — Manor boiler room
- Unburied MARA bone tag — Saint Orren crypt
- Thorn-star tablet — Asterion
- Tax for no address — Vespera
- Future anatomical plate — Collegium Varetti
- MARA index — Pale Interval

Together with the eight pre-existing historical secrets this brings the secret archive to the required **15 entries**.

### Save compatibility

Schema **9 → 10** adds a persistent `lore` array. Older saves migrate with an empty archive and retain all campaign progression, choices, combat state, Sigils, bosses and chapter completion. Evidence IDs are deduplicated during normalization.

### Achievements

- **Paper Trail** — recover 20 pieces of evidence.
- **Counter-Memory** — recover the complete 87-entry archive.

## UX / accessibility

- Archive can be opened with **J** while playing.
- Pause → Archive works on touch/mobile without requiring a keyboard.
- Closing the Archive from Pause returns to the paused state instead of resuming the game unexpectedly.
- Filters: All / Documents / Notes / Recordings / Secrets.
- Mobile layout uses stacked list/detail panes and was validated at **390×844** without horizontal overflow.

## Scope deliberately deferred

Phase 11 does **not** decide the game's final ending. The three carried choices and evidence completion are now in a form that Phase 12 can evaluate for Normal / Dark / True Ending.
