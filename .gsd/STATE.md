# GSD State

## Current Position

- **Phase**: Phase 6 — Complete + post-phase bug fixes done
- **Task**: All done this session — Phase 6 executed + draft badge refresh fix
- **Status**: Paused at 2026-03-02

## Last Session Summary

- Executed all 4 Phase 6 plans (multi-tenant data model migration):
  - 6.1: `src/api/db.js` → `users/{userId}/emails/{emailId}` paths + `emailLookup/{emailId}` write
  - 6.2: `functions/index.js` → both Cloud Functions resolve userId via emailLookup lookup
  - 6.3: `DashboardApp.jsx` → userId threaded into EmailRow; content.js verified correct
  - 6.4: `firestore.rules` + `firestore.indexes.json` updated; all deployed to Firebase
- Deployed Cloud Functions (trackPixel + trackClick both updated)
- Deployed Firestore rules + deleted old composite index (`--force`)
- Fixed post-send stale draft badge: after `DELETE_DRAFT_BY_ID`, now clicks Gmail's Refresh button (`div[data-tooltip="Refresh"]`) to sync Gmail's frontend state

## In-Progress Work

- No uncommitted changes.

## Blockers

- Human end-to-end verification still needed (see `.gsd/phases/6/VERIFICATION.md`)

## Context Dump

### Multi-Tenant Design (Fully Implemented)

- Email docs: `users/{userId}/emails/{emailId}` — userId from path, not field
- `emailLookup/{emailId} → { userId }` written by client at send time
- Cloud Functions read emailLookup to resolve userId without it in tracking URLs
- Tracking URLs: `?emailId=X&recipientId=Y` only — no userId exposed
- Events: `users/{userId}/emails/{emailId}/events/{eventId}`
- Firestore rules use path-param `userId` for auth (cleaner than `resource.data.userId`)

### Draft Badge Refresh Fix

- Root cause: Draft deleted via Gmail API, but Gmail's frontend state machine bypassed
- Fix: After DELETE_DRAFT_BY_ID callback fires, click `div[data-tooltip="Refresh"]` (Gmail's own Refresh button)
- Fires ~1.5s after send (inside the existing setTimeout)
- Fallback selector: `button[aria-label="Refresh"]`

### Files of Interest

- `src/content.js`: `handleTrackedSend` — draft delete + refresh button click at line ~216
- `src/api/db.js`: all Firestore paths updated to multi-tenant model
- `functions/index.js`: emailLookup-based path resolution for both functions
- `src/dashboard/DashboardApp.jsx`: userId prop on EmailRow
- `firestore.rules`: path-param auth, emailLookup rule
- `firestore.indexes.json`: empty (old composite index removed)

## Next Steps

1. Human end-to-end cutover verify:
   - Reload extension in Chrome
   - Send a tracked email → verify `users/{uid}/emails/{id}` + `emailLookup/{id}` in Firebase Console
   - Open the email → verify event logged at `users/{uid}/emails/{id}/events/`
   - Dashboard shows email + counts
   - Delete old `emails/` collection in Firebase Console
2. `/execute 7` — Dashboard UX (weekly grouping, click drill-down, pagination)
