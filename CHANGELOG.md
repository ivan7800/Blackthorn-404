# Changelog

## 1.1.1 — Release hardening

- Replaced duplicated Base64 hero/scene payloads with existing local art assets.
- Reduced runtime CSS + engine + bundle payload from roughly 1.41 MB to 0.41 MB before compression.
- Restored browser pinch zoom by removing `user-scalable=no`.
- Added accessible names to all native dialogs.
- Hardened local-save normalization for invalid room, weapon and Sigil identifiers and invalid numeric metadata.
- Escaped the rendered save-slot room label defensively.
- Bumped the PWA cache namespace and asset query version.
- Removed QA/documentation files and an unused portrait asset from PWA precaching.
- Added `.gitignore` and a dedicated release-hardening E2E check.
- Removed regenerable QA screenshots and Python cache files from the publication package.

## 1.1.0 — SNES Dark Fantasy visual edition

- Historical visual release retained in the phase/visual reports.
