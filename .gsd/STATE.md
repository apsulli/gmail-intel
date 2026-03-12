# GSD State

## Current Position

- **Phase**: Phase 11 (complete)
- **Task**: All tasks complete
- **Status**: Paused at 2026-03-12

## Last Session Summary

- Fixed inline reply threading (threadId from URL hash fallback).
- Fixed 400 "Invalid thread_id value": added GET_THREAD handler + In-Reply-To/References resolution from thread Message-IDs.
- Fixed 400 when URL hash ID isn't a valid API thread ID: added SEARCH_THREADS handler (subject search) as second-stage fallback; clears threadId gracefully if both fail.
- Executed Phase 11: persist `fromEmail`/`fromName` on email docs; two-level sender→week grouping in dashboard (cyan sender headers / pink week headers).
- Version: 2.10.1

## In-Progress Work

None. All changes committed.

## Blockers

None currently known.

## Context Dump

### Threading Resolution Chain (content.js handleTrackedSend)

Three-stage threadId/header resolution for inline replies:

1. **Draft API** (`GET_DRAFT`): if `draftId` found from DOM or `getLatestDraftId()`, fetch draft METADATA → threadId + In-Reply-To + References. Best path — Gmail's own headers.
2. **URL hash fallback** (`getThreadIdFromUrl()`): parse `window.location.hash` last segment. Try `GET_THREAD` with it → extract Message-IDs for In-Reply-To/References. Works when URL ID matches API format.
3. **Subject search fallback** (`SEARCH_THREADS`): if GET_THREAD returns no messages, search `subject:"<subject>"` to find real API thread ID, then GET_THREAD again. If still fails, set threadId = null (send as new thread, no 400 error).

### Dashboard Grouping

Two-level: sender (outer, cyan, zIndex 2) → week (inner, pink, zIndex 1, top: 33px).
`fromEmail`/`fromName` stored on every new email doc. Legacy docs fall back to "Unknown Sender".

### Outstanding: Backfill Legacy Docs

Existing Firestore docs pre-Phase 11 have no `fromEmail`/`fromName`. User needs to manually add these fields in Firebase Console (or run a one-shot Admin SDK script). No code work needed.

## Next Steps

1. Verify end-to-end: inline reply threads correctly in Gmail UI.
2. Backfill `fromEmail`/`fromName` on legacy Firestore docs if desired.
3. Consider Chrome Web Store submission prep (next major milestone).
4. Full multi-account auth (Phase 12) when ready — chrome.identity per-account tokens + multiple Firebase sessions.
