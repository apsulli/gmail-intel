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

**Status**: ⬜ Not Started
**Objective**: Build and inject a React dashboard into the Gmail interface to display tracking data.
**Requirements**: REQ-06, REQ-07
