# GSD State

## Current Position

- **Phase**: Phase 11 (complete) + threading/tracking bugfixes
- **Task**: Awaiting user validation of threading + tracking fixes
- **Status**: Paused at 2026-03-12

## Last Session Summary

- Added multi-account guard (`IS_PRIMARY_ACCOUNT`): extension silently inactive on `u/1+` tabs.
- Fixed subject extraction for inline replies: `h2.hP` → `document.title` fallback when `input[name="subjectbox"]` absent.
- Replaced URL-based thread resolution with 3-stage chain: **GET_MESSAGE** (URL hash as message ID, primary path) → GET_THREAD (legacy hex format) → subject search (last resort).
- Added `GET_MESSAGE` handler to `background.js` — resolves real API threadId + reply headers in one call.
- Fixed `refreshAfterSend`: navigate to folder root only after inline reply — do NOT navigate back to thread (caused Gmail to re-open draft compose from internal state).
- Reduced `trackPixel` suppression window: 30s → 15s (user was opening emails before window expired).
- Version: 2.11.2 (extension) + functions updated.

## In-Progress Work

None. All changes committed. Functions change deployed by user (`cd functions && npm run deploy`).

## Blockers

None known. Awaiting user validation of:
1. Inline reply threading (thread maintained across multiple replies)
2. Refresh after send (lands on folder root, not draft view)
3. Open tracking on threaded replies (15s window should fix false negatives)

## Context Dump

### Threading Resolution Chain (content.js handleTrackedSend)

Four-stage threadId/header resolution for inline replies:

1. **Draft API** (`GET_DRAFT`): if `draftId` found from DOM or `getLatestDraftId()`, fetch draft METADATA → threadId + In-Reply-To + References. Best path.
2. **GET_MESSAGE** (new primary URL fallback): treat URL hash ID as a message ID (modern Gmail URLs use message IDs in hash). Returns real API threadId + all reply headers in one call.
3. **GET_THREAD**: treat URL hash ID as a legacy hex thread ID. Collect Message-IDs from all thread messages.
4. **Subject search** (`SEARCH_THREADS`): last resort. Uses subject from `h2.hP` or `document.title`.

### Subject Extraction for Inline Replies

`input[name="subjectbox"]` is hidden/absent in inline compose. Fallback chain:
1. `input[name="subjectbox"]` (new compose popups)
2. `h2.hP` (Gmail thread heading, always visible in thread view)
3. `document.title` parse ("Subject - user@gmail.com - Gmail")

### Refresh After Send

Navigate to folder root (`#inbox`) only — no back-navigation to thread. Navigating back caused Gmail to re-open draft compose from internal JS state. User lands on inbox, clicks thread to see reply.

### Pixel Suppression Window

`functions/index.js`: 15s window (was 30s). Google Image Proxy pre-fetch completes within a few seconds; 15s is sufficient to suppress false positives while allowing real opens.

### Multi-Account Guard

`src/content.js`: `IS_PRIMARY_ACCOUNT` flag gates all extension activity. On `u/1+`: no sidebar, no tracking toggle, no observer, no Firebase auth — completely silent.

### Outstanding

- Backfill legacy Firestore docs with `fromEmail`/`fromName` (pre-Phase 11 docs show "Unknown Sender").
- End-to-end validation of all threading + tracking fixes still pending.
- Chrome Web Store submission prep (next major milestone).

## Next Steps

1. Validate inline reply threading end-to-end (multiple replies in same thread).
2. Validate open tracking on threaded replies after deploying functions.
3. If all green: Chrome Web Store submission prep or Phase 12 (full multi-account auth).
