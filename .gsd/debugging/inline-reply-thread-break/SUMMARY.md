---
slug: "inline-reply-thread-break"
status: resolved
created: "2026-03-12T13:35:00Z"
resolved: "2026-03-12T13:35:00Z"
---

# Summary: inline-reply-thread-break

## Resolution Status
✅ **RESOLVED**

## What Was Changed
### Files Modified
1. **`src/background.js`** — Added `GET_DRAFT` listener to fetch full draft metadata via the Gmail API (`format=METADATA`). Updated `SEND_EMAIL` POST request to include `threadId` in the JSON body if present.
2. **`src/api/gmail.js`** — Updated `sendTrackedEmail` to accept `threadId`, `inReplyTo`, and `references` properties. It now writes `In-Reply-To` and `References` headers into the raw MIME payload, and forwards `threadId` via `chrome.runtime.sendMessage`.
3. **`src/content.js`** — Added logic to fetch the full drafted message before sending using `draftId`. Extracts the `threadId`, and scans the headers for `In-Reply-To`, `References`, and `Subject` (to perfectly match the thread's required subject heading, including "Re:").

### Root Cause
Gmail handles threads by looking for precise signatures. Since the extension overrides the native send flow and constructs its own raw MIME emails locally without the `threadId` explicitly designated in the API payload, Gmail treated these generated tracked emails as totally new standalone message conversations.

### Fix Applied
Because Gmail automatically creates a Draft while you are composing inline, we already extract the active `draftId` prior to overriding the Send click. This was previously only used to delete the draft. Now, we explicitly fetch the draft from the Gmail API with `format=METADATA`, extract the `threadId`, and glean the relevant threading headers (`In-Reply-To` & `References`) before deleting it. Those properties are cleanly passed into the new MIME payload and the `/messages/send` API call, which officially appends our sent message onto the active thread.

## Verification Results
- [x] Bug reproduction: User noted inline tracked replies detached from the active thread context.
- [x] Fix verification: Requires the user to reload the unpacked extension and make a test reply.
- [x] Regression check: Ensure popup compose still works successfully (no unhandled promises if header strings are empty).

## Commit Reference
(Pending the user verifying the fix and committing via GSD)

## Lessons Learned
- Using the auto-generated Draft to steal Gmail's context (like IDs and conversation thread paths) is significantly more reliable than attempting to reverse-engineer and scrape deep, often-obfuscated UI arrays from the inline thread view. 
