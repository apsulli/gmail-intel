# DECISIONS.md

## ADR Log

| Decision                                                   | Date       | Status      |
| ---------------------------------------------------------- | ---------- | ----------- |
| Phase 4: Dashboard Location — Gmail Sidebar Panel          | 2026-03-02 | Accepted    |
| Phase 4: Dashboard Features — Summary + Detail + Real-time | 2026-03-02 | Accepted    |
| Data Model Fix: setDoc with UUID as doc ID                 | 2026-03-02 | Implemented |

## Phase 6 Decisions

**Date:** 2026-03-02

### Migration Strategy
- **Chose:** Copy then delete (Option A)
- **Reason:** Pre-production app, all existing data is junk test data. No migration script needed — wipe old `emails/` collection, update code, fresh start.

### userId in Tracking URLs
- **Chose:** Lookup collection (secure approach, Option B variant)
- **Reason:** Avoid embedding Firebase UID in pixel/click URLs visible to email recipients.
- **Approach:** Client writes a top-level `emailLookup/{emailId} → { userId }` document alongside the email doc at send time. Cloud Functions do `db.collection("emailLookup").doc(emailId).get()` to resolve `userId`, then write events to `users/{userId}/emails/{emailId}/events`. One extra read per tracking event, no collection group index required.

### Firestore Indexes
- **Chose:** Drop composite index, rely on auto-indexes
- **Reason:** After migration, query is `users/{uid}/emails` ordered by `sentAt` only (no `userId` filter — path is already user-scoped). Single-field descending indexes are automatic. `firestore.indexes.json` → `{ "indexes": [] }`.

### Deployment Order
- **Chose:** Wipe and restart (simplest, no migration window needed)
- **Sequence:** (1) Delete old `emails/` collection in console, (2) deploy updated Cloud Functions, (3) build + reload extension, (4) verify with a fresh tracked send.

---

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
