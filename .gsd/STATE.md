# GSD State

## Current Position

- **Phase**: Phase 5 — Polish & Per-Recipient Analytics
- **Task**: All Phase 5 plans executed and bugs resolved. Verified by user.
- **Status**: Paused at 2026-03-02

## Last Session Summary

- Executed Phase 5 plans (5.1, 5.2, 5.3) — toggle push, per-recipient analytics, draft deletion redesign
- Fixed 5 post-execution bugs:
  - Added `gmail.compose` OAuth scope (was blocking `drafts.send` and `GET /drafts`)
  - Added error handler to `subscribeToEvents` (silent Firestore failures now surface)
  - Fixed Firestore events security rule (removed `get()` cross-read causing permission-denied)
  - Deployed Firestore composite index + rules via `firebase deploy --only firestore`
  - Fixed draft deletion order-of-operations: close compose UI first, then DELETE draft after 1.5s delay
  - Switched compose close from discard button click (crashing Gmail internals) to direct DOM removal
- Untracked `dist/` and `.firebase/` from git (were committed before .gitignore)
- Version bumped to 2.4.1

## In-Progress Work

- No uncommitted changes.

## Blockers

- None.

## Context Dump

### Draft Deletion — Final Working Approach

1. `getDraftId(composeWindow)` — DOM extraction (rarely succeeds in modern Gmail)
2. `getLatestDraftId(token)` — `GET /drafts?maxResults=1` fallback (requires `gmail.compose` scope)
3. Send all recipients via `messages.send` (unchanged, reliable)
4. Log to Firestore
5. Remove compose window via `composeWindow.closest('[role="dialog"]').remove()` — direct DOM removal, NOT discard button click (discard button crashes Gmail's internal code post-send)
6. After 1.5s delay: `DELETE /drafts/{draftId}` — draft is gone from backend

### Why discard button click was abandoned
Clicking `[data-tooltip="Discard draft"]` after send causes Gmail internal errors
(`offsetHeight` of null, `classList` of null) leaving compose in minimized zombie state.
Direct DOM removal via `closest('[role="dialog"]')` is clean and scope-safe.

### Firestore Events Security Rule
Changed from `get()` cross-read to `request.auth != null`. The `get()` approach
caused `permission-denied` on `onSnapshot` listeners. Safe because emailIds are
`crypto.randomUUID()` — effectively unguessable.

### Files of Interest
- `src/content.js`: `getDraftId`, `getLatestDraftId`, `handleTrackedSend`
- `src/background.js`: `GET_LATEST_DRAFT_ID`, `DELETE_DRAFT_BY_ID` handlers
- `src/api/gmail.js`: `sendTrackedEmail` (always uses `SEND_EMAIL`)
- `src/dashboard/DashboardApp.jsx`: per-recipient stats grid, `eventsError` state
- `firestore.rules`: events rule now `request.auth != null`

## Next Steps

1. Plan and execute Phase 6 (see ROADMAP.md for upcoming phases)
2. Consider Chrome Web Store submission (see `.ai/outputs/chrome-web-store-publishing.md`)
