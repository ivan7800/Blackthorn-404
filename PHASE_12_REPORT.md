# Blackthorn 404: The Unremembered — Phase 12 Report

## Release

- Version: **0.12.0**
- Save schema: **11**
- Phase: **12 — Endings**
- Status: **GitHub Pages release candidate**

## What Phase 12 adds

Phase 12 resolves the campaign into three authored endings without showing an ending selector. The result is calculated only after The Unremembered has been defeated and Elena returns to the Root Door. The three final choices remain discrete decisions made in the Pale Interval; evidence, counter-memories and Sigil mastery are evaluated afterward.

### Normal Ending — THE HOUSE OF WITNESSES

Default completed-campaign resolution when the requirements for Dark or True are not met. Blackthorn remains an archive of contradictory testimony, but no longer relies on a single human witness to hold every recovered life in place.

### Dark Ending — THE NINTH TENANT

Triggered when at least **two of three erasure signals** are present in the existing final choices:

- witness account collapsed to one official version;
- Theo's warning erased;
- the eight lives carried/owned rather than released.

The result is not selected at the ending screen. It is the consequence of choices already stored in `finalChoices`.

### True Ending — NO ONE REMEMBERS ALONE

Requires all of the following:

- final choices: **preserve both witness accounts / keep Theo's warning / release the eight lives**;
- **15/15 counter-memories**;
- **9/9 key evidence records** spanning the campaign;
- all **12 Sigil formulas** known and maximum intensity unlocked;
- the final MIND / FLESH / VOID grammar flags used against The Unremembered.

The True Ending releases the eight recovered lives from Blackthorn's mnemonic mechanism without deleting their evidence or forcing their contradictions into one canonical account.

## Ending presentation

A dedicated 16-bit epilogue modal was added with authored multi-page sequences, ending-specific accents, mobile layout and final-state summary. There is only one interaction in this modal: **Continue / Return to Title**. Escape is explicitly blocked while an ending is active so the pause layer cannot open underneath the modal.

## Persistence

Schema 11 adds:

- `phase12Complete`
- `ending`
- `endingsSeen[]`
- `endingStats{}`

Existing schema-10 saves migrate without changing their final choices, evidence archive or final-chapter completion state. Ending completion is visible in save-slot summaries and is ready for Phase 13 New Game+ integration.

## Fix discovered during QA

Pressing Escape while the ending modal was active originally left the epilogue open but also allowed the gameplay Escape handler to open Pause underneath it. The pause dialog then intercepted pointer events and could block the ending's Continue button. Phase 12 now consumes all gameplay keyboard input while the ending modal is open; Enter/C/Space advance the epilogue and Escape does nothing.

## QA

Phase 12 specific suite: **25/25 PASS**.

Full regression: **270/270 PASS** across Phases 1–12.

See `QA_REPORT.md` for the consolidated matrix.
