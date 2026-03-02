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
