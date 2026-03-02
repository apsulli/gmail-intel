# ROADMAP.md

> **Current Phase**: Phase 3
> **Milestone**: v1.0

## Must-Haves (from SPEC)

- [ ] Track email opens using an embedded tracking pixel
- [ ] Track link clicks within sent emails
- [ ] Display open and click activity in a React-based dashboard embedded directly within the Gmail UI

## Phases

### Phase 1: Foundation & Firebase Setup

**Status**: ✅ Complete
**Objective**: Set up Firebase project, Firestore database, and basic Chrome Extension MV3 scaffolding.
**Requirements**: REQ-01, REQ-04, REQ-05 (Backend setup)

### Phase 2: Open and Click Tracking Backend

**Status**: ✅ Complete
**Objective**: Implement Cloud Functions or backend endpoints to handle pixel loads (opens) and link redirects (clicks) and write to Firestore.
**Requirements**: REQ-04, REQ-05

### Phase 3: Gmail Integration & Tracking Injection

**Status**: 🚧 In Progress (Errors)
**Objective**: Inject tracking UI into Gmail compose window. Intercept sent emails, rewrite links, and append tracking pixel.
**Requirements**: REQ-01, REQ-02, REQ-03

### Phase 4: In-Gmail React Dashboard

**Status**: 🚧 In Progress
**Objective**: Build and inject a React dashboard into the Gmail interface to display tracking data.
**Requirements**: REQ-06, REQ-07

---

### Phase 5: Polish & Per-Recipient Analytics

**Status**: ⬜ Not Started
**Objective**: Fix remaining post-Wave-1 bugs (draft persistence, toggle overlap) and upgrade the expanded email view to show per-recipient open/click counts with last-seen timestamps.
**Depends on**: Phase 4

**Tasks**:
- [ ] 5.1 — Fix draft deletion: switch to drafts.send flow with DOM draft ID extraction
- [ ] 5.2 — Fix toggle button push: animate toggle left when sidebar opens
- [ ] 5.3 — Per-recipient analytics: open count, click count, last open, last click per recipient in expanded row

**Verification**:
- [ ] Send a tracked reply-in-thread → no draft remains in Gmail Drafts
- [ ] Open sidebar → toggle button moves left flush with sidebar edge, not on top of content
- [ ] Expand an email row → each recipient shows individual open/click counts and timestamps

---

### Phase 6: Full Multi-Tenant Support (Data Model Migration)

**Status**: ⬜ Not Started
**Objective**: Move `emails` from a top-level collection to a per-user subcollection (`users/{userId}/emails/{emailId}`). This is the correct multi-tenant data model — it eliminates the `userId` field query on the emails collection, simplifies security rules, and properly isolates data per user at the path level.
**Depends on**: Phase 5

**Scope**:

Current model:
```
emails/{emailId}           ← top-level, filtered by userId field
  userId, subject, recipients[], sentAt
  events/{eventId}
    type, recipientId, timestamp, ...
```

Target model:
```
users/{userId}/emails/{emailId}   ← user-scoped subcollection
  subject, recipients[], sentAt   ← userId field removed (redundant)
  events/{eventId}
    type, recipientId, timestamp, ...
```

**Tasks**:
- [ ] 6.1 — Update `src/api/db.js`: change all Firestore paths from `emails/{id}` to `users/{userId}/emails/{id}`; add `userId` param to `subscribeToEvents` and `getEmailWithEvents`; remove `userId` field from written docs
- [ ] 6.2 — Update `functions/index.js`: add `userId` query param to both `trackPixel` and `trackClick`; write events to `users/{userId}/emails/{emailId}/events`
- [ ] 6.3 — Update `src/content.js`: include `userId` in pixel URL and click URL query params
- [ ] 6.4 — Update `src/dashboard/DashboardApp.jsx`: pass `userId` (from `user` prop) down to `EmailRow`; update `subscribeToEvents` call to pass `userId`
- [ ] 6.5 — Update `firestore.rules`: change match path to `users/{userId}/emails/{emailId}`; use path param for auth check instead of `resource.data.userId`
- [ ] 6.6 — Add `emailLookup/{emailId} → { userId }` write in `src/api/db.js` (alongside the email doc); update Cloud Functions to resolve `userId` via lookup before writing events
- [ ] 6.7 — Update `firestore.indexes.json`: remove composite index (not needed after migration); update `firestore.rules` to cover `emailLookup/{emailId}` (create: authed user, read: deny — internal only)
- [ ] 6.8 — Cutover: delete old `emails/` collection in Firestore console; deploy functions; build + reload extension; verify with a fresh tracked send

**Verification**:
- [ ] Send a tracked email → document appears at `users/{uid}/emails/{emailId}` in Firestore console, no doc at top-level `emails/`
- [ ] Open dashboard → emails load correctly from new path
- [ ] Expand email row → events load correctly (pixel open + link click both recorded via lookup)
- [ ] Tracking URLs do NOT contain `userId` in query params
- [ ] Security rules: unauthenticated request cannot read `users/{uid}/emails/`

---

### Phase 7: Dashboard UX — Weekly Grouping, Click Drill-Down & Pagination

**Status**: ⬜ Not Started
**Objective**: Upgrade the dashboard from a flat email list to a richer, more navigable UI: emails grouped by calendar week, click events drilled down to show the specific URLs clicked, and pagination so the list doesn't become unmanageable.
**Depends on**: Phase 6

**Tasks**:
- [ ] 7.1 — Weekly grouping: group email rows by calendar week (Sun–Sat in user's local timezone); render a sticky week header (e.g. "Week of Feb 24") between groups; determine week boundaries using `Intl` or `date-fns`
- [ ] 7.2 — Click drill-down: in the expanded recipient row, replace the "Clicks: N" stat with a collapsible list of the actual URLs clicked (with click count per URL and timestamp of first/last click); source from `targetUrl` field on click events
- [ ] 7.3 — Pagination: replace the hard-coded `limit(50)` in `subscribeToEmails` with a paginated fetch (load 20 at a time, "Load more" button at bottom of list); preserve real-time updates on the visible page

**Verification**:
- [ ] Dashboard shows week headers grouping emails correctly in user's local timezone
- [ ] Expanding a recipient with clicks shows a list of URLs clicked, not just a count
- [ ] "Load more" appears after 20 emails and loads the next 20 without losing live updates on existing rows
