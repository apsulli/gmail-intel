---
slug: "inline-reply-thread-break"
plan_version: 1
created: "2026-03-12T13:28:00Z"
updated: "2026-03-12T13:28:00Z"
---

# Plan: inline-reply-thread-break

## Root Cause Confirmation
- **Confirmed Cause:** The extension was building and sending brand new MIME messages without any of the threading metadata (like `threadId` in the API payload, or `In-Reply-To` and `References` headers in the MIME). Because of this, Gmail always processed sent emails as entirely new conversations. 
- **Evidence:** `src/api/gmail.js` and `src/background.js` did not support `threadId` or threading headers. The draft was only being used to delete it.
- **Confidence:** HIGH

## Fix Strategy
Since we already retrieve the `draftId` of the current compose window, we can query the Gmail API for that draft *before* deleting it. This allows us to extract the real `threadId`, the precise `Subject` (which often has "Re:" prefixed naturally), and the `In-Reply-To` / `References` headers. We will then inject these into our custom MIME email and correctly specify the `threadId` in the `messages/send` API call.

### Files to Modify
1. **`src/background.js`** — Change: Add `GET_DRAFT` listener to fetch full draft details. Update `SEND_EMAIL` to selectively pass `threadId` on the body.
2. **`src/api/gmail.js`** — Change: Accept `threadId`, `inReplyTo`, and `references` params in `sendTrackedEmail` and insert the headers into the raw array. Pipe `threadId` to background msg.
3. **`src/content.js`** — Change: After resolving the `draftId`, send `GET_DRAFT` to background. Extract threading properties and pass them forward to `sendTrackedEmail`.

### Implementation Steps
1. Add `GET_DRAFT` background message listener that does `fetch(drafts/${id}?format=full)`.
2. Update `SEND_EMAIL` in `background.js` to look for `message.threadId`.
3. Update `src/api/gmail.js` structure.
4. Update `src/content.js` to query draft, pull headers, and route them down the pipeline.

### Testing Criteria
- [ ] Bug reproduction: Reply to a thread inline, ensure the reply goes into the specific thread.
- [ ] Fix verification: Re-build, check console for draft details fetch success, confirm thread remains intact.

## Risk Assessment
- **Risk Level:** LOW
- **Potential Side Effects:** If API draft fetch fails, we fall back to not keeping threading, which was the status quo. 
- **Mitigation:** Wrap logic in fail-safes.
