# GSD State

## Current Position

- **Phase**: Phase 5 — Polish & Per-Recipient Analytics
- **Task**: Phase 5 fully planned. Ready to execute plans 5.1, 5.2, 5.3.
- **Status**: Paused at 2026-03-02

## Last Session Summary

- Fixed 4 bugs from Wave 1 post-mortem (commit 65017ea):
  - Sidebar now waits for Gmail's `div[role="main"]` before injecting (no more flash)
  - Toggle button moved to `bottom: 80px` (no longer overlaps Calendar add-on)
  - Built real DashboardApp with live `subscribeToEmails`/`subscribeToEvents` data
  - Draft discard now searches document-wide for discard button
- Fixed 2 more bugs (commit 363e746):
  - Draft deletion switched to Gmail Drafts API (`DELETE_DRAFT_BY_SUBJECT`)
  - Dashboard surfaced Firestore errors (missing index was causing silent "Loading…")
- Bumped version to 2.2.0 and rebuilt (commit after version bump)
- Added Phase 5 to ROADMAP with 3 execution plans (commit cd35cdb)
- Created `.ai/outputs/chrome-web-store-publishing.md` instruction manual

## In-Progress Work

- No uncommitted changes.
- Files modified this session: `src/sidebar.js`, `src/content.js`, `src/dashboard/DashboardApp.jsx`, `src/api/db.js`, `src/background.js`, `manifest.json`, `package.json`

## Blockers

- **Draft deletion still failing**: `DELETE_DRAFT_BY_SUBJECT` (subject-based search) is unreliable due to Gmail search index latency. Plan 5.1 redesigns this to use `drafts.send` + DOM draft ID extraction.
- **Firestore index not deployed**: User needs to run `firebase deploy --only firestore` to fix "Loading…" dashboard. Error is now surfaced in the UI.

## Context Dump

### Decisions Made

- Draft deletion root cause confirmed: Gmail search index latency makes subject-search unreliable. Plan 5.1 switches to `drafts.send` (atomic send + delete).
- Toggle push fix: animate `toggle.style.right` between `16px` (closed) and `376px` (open) with matching `0.3s ease` transition.
- Per-recipient stats: no Firestore schema change needed — events already have `recipientId`. Correlation done in-UI.

### Approaches Tried

- `DELETE_DRAFT_BY_SUBJECT` (Plan commit 363e746): fires after send, searches by subject. **FAILED** — draft still persists. Root cause: search index latency.
- UI discard button click (earlier): unreliable across compose types. **ABANDONED**.

### Current Hypothesis

Draft deletion will be solved by Plan 5.1: extracting draft ID from DOM before send, then using `drafts.send` which atomically sends + deletes. If DOM extraction fails, fall back to `GET /drafts?maxResults=1`.

### Files of Interest

- `src/background.js`: `DELETE_DRAFT_BY_SUBJECT` handler (to be replaced by `SEND_DRAFT` + `GET_LATEST_DRAFT_ID` in 5.1)
- `src/content.js`: `handleTrackedSend` (draft ID extraction + send flow)
- `src/api/gmail.js`: `sendTrackedEmail` (needs `draftId` param)
- `src/sidebar.js`: toggle click handler (needs `right` animation for 5.2)
- `src/dashboard/DashboardApp.jsx`: `EmailRow` expanded section (per-recipient stats for 5.3)

## Next Steps

1. `firebase deploy --only firestore` — deploy composite index to fix dashboard loading
2. `/execute 5` — execute Phase 5 plans in order: 5.1 → 5.2 → 5.3
3. Reload extension after each plan, verify fixes
