# DECISIONS.md

## ADR Log

| Decision                                                   | Date       | Status      |
| ---------------------------------------------------------- | ---------- | ----------- |
| Phase 4: Dashboard Location — Gmail Sidebar Panel          | 2026-03-02 | Accepted    |
| Phase 4: Dashboard Features — Summary + Detail + Real-time | 2026-03-02 | Accepted    |
| Data Model Fix: setDoc with UUID as doc ID                 | 2026-03-02 | Implemented |

## Phase 4 Decisions

**Date:** 2026-03-02

### Scope

- Summary view: list of tracked emails with subject, recipients, open/click counts
- Detail view: drill into one email to see per-recipient open/click activity with timestamps
- Real-time updates via Firestore `onSnapshot` listeners
- Aggregate stats (e.g., total emails, open rate) — nice-to-have, not blocking

### Approach

- **Chose:** Gmail Sidebar Panel (injected into right side of Gmail UI)
- **Reason:** Matches spec requirement of "embedded directly within the Gmail UI." Non-disruptive, familiar pattern from Google's own add-ons (Calendar, Keep, Tasks). Adequate space (~350px) for summary/detail views of a personal-use tool.

### Data Model Fix

- **Problem:** `addDoc` was creating auto-generated Firestore doc IDs, but Cloud Functions write events to `emails/{UUID}/events/...` using the tracking UUID. Events were orphaned.
- **Fix:** Switched `logEmailSent` to use `setDoc(doc(db, "emails", emailId), ...)` so the Firestore doc ID matches the UUID used in tracking pixel/click URLs.
- **Status:** Implemented and deployed.
