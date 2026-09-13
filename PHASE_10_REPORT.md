# Phase 10 — Boss Reforging

## Release

Blackthorn 404: The Unremembered **v0.10.0**. Save schema remains **9** because this phase changes runtime combat behavior rather than persistent campaign structure.

## Problem found

Before Phase 10 the nine bosses had authored names, arenas and Phase III interactions, but their runtime AI still relied on almost the same radial projectile routine and generic phase-transition wording. This made several encounters feel statistically different rather than mechanically different.

## Implementation

A data-driven `BOSS_PROFILES` system now gives every boss a unique movement grammar, projectile pattern, cadence, damage/perception curve, accent and three phase-specific directives.

| Boss | Movement | Projectile grammar | Final authored gate |
|---|---|---|---|
| The Bell Without a Tongue | anchored resonance | alternating rings | ring the empty bell frame |
| The Salt Astronomer | orbit | seven-point star + comet | seventh-star lens |
| The Last Enumerator | measured ledger axes | cross/count volleys | restored census |
| The Anatomist's Shadow | mirrored flank + blink | mirrored fans | triple mirror |
| The First Tenant | threshold-axis pursuit | door/threshold spokes | foundation nameplate |
| The Company Without Faces | formation distance control | delayed firing-line volleys | paired identity discs |
| The Dead Frequency | lateral signal drift | opposing frequency bands | carrier lock |
| The Man in the Missing Frame | temporal stutter/teleport | delayed missing-frame cuts | splice deck |
| The Unremembered | relational orbit | mixed memory rings + relation cuts | three schools + low Perception + choices |

## Combat rules corrected

- Phase I and II bosses are no longer arbitrarily invulnerable when a short vulnerability timer expires.
- Phase III is the deliberate gated phase: the historical bosses require their arena interaction; The Unremembered keeps its multi-system final gate.
- Delayed projectiles now render a visible telegraph before activation.
- Boss phase-transition text is unique to each boss and describes the mechanic rather than using final-boss prose everywhere.
- Boss projectile colors now reinforce encounter identity without changing the limited 16-bit visual language.

## Compatibility

The Phase 9 story, saves and endings hooks remain unchanged. Existing schema-9 saves load directly. All historical boss completion callbacks and campaign progression remain intact.

## Result

The nine encounters now share a combat engine but no longer share one combat personality. Phase 10 establishes the boss foundation for later balance and QA phases without rewriting chapter progression.
