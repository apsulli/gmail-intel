# GSD State

## Current Position

- **Phase**: Phase 11 (Multi-Tenant Support)
- **Task**: Resolving inline-reply email threads and multi-tenant logic
- **Status**: Paused at 2026-03-12 13:45Z

## Last Session Summary

- Addressed "inline-reply-refresh" (changed `clickGmailRefresh()` to use offset visibility) and "inline-reply-thread-break" (added threading Headers from drafted data).
- Verified these fixes are failing to adequately maintain threaded state and refresh UI in Gmail.
- Added GitHub Actions `.github/workflows/deploy-functions.yml` pipeline with `GCP_SA_KEY` resolution to automate Cloud Function deployments.

## In-Progress Work

- `src/content.js` and `src/api/gmail.js` threading implementation requires further inspection.
- Cloud Functions deployment pipeline exists but features local dedup codebase.

## Blockers

- ~~1. **Inline Refresh Missing**: The UI does not correctly refresh following an inline threaded reply from the popup.~~ FIXED (337e6b4)
- ~~2. **Context Missing**: Inline threaded replies are visibly breaking the conversation tree.~~ FIXED (337e6b4)
- 3. **Data Model**: Multi-tenant database schema needs to ensure distinct email tracking histories for separate user accounts.

## Context Dump

### Current Hypothesis
- Gmail's threading algorithms may inspect raw `.eml` differently than the REST API assumes, or the native Gmail frontend does not recognize our raw API insertion for real-time thread rendering. 
- A multi-tenant split implies that the Firestore structure (`/users/{userId}`) is active but `userId` boundaries might be leaking, or local storage doesn't differentiate account sign-ins properly.

## Next Steps

1. Diagnose and fix the inline threaded refresh mechanism (possibly relying on postMessage/Gmail UI internals instead of DOM clicks).
2. Deep dive on correct MIME `References` threading configuration.
3. Architect the multi-tenant tracking history split.
