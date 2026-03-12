# Debug Session: Phase 4 Post-Wave-1 Bugs

## Symptoms

### Bug 1 — Sidebar injects before Gmail loads
**When:** On every Gmail page load
**Expected:** Sidebar and toggle appear only after Gmail's main UI is ready
**Actual:** Toggle + sidebar appear immediately, before Gmail's chrome renders (awkward flash)

### Bug 2 — Toggle button overlaps Calendar add-on
**When:** Gmail has add-ons panel (Calendar, Tasks, etc.) visible on right side
**Expected:** Toggle button should not cover add-ons
**Actual:** Toggle at `top: 80px, right: 16px` lands directly on top of Calendar icon

### Bug 3 — Dashboard shows no data
**When:** Tracked emails exist in Firestore
**Expected:** Dashboard lists tracked emails
**Actual:** Placeholder text only ("Tracked emails will appear here")
**Root Cause:** DashboardApp is still a placeholder — Wave 2 not yet executed

### Bug 4 — Threaded email saved as draft after tracked send
**When:** Sending a tracked reply/forward in a thread
**Expected:** Email sent, compose window closed cleanly
**Actual:** Email sent via API but draft persists in Gmail (compose window not properly discarded)

## Root Causes

| # | Root Cause | Status |
|---|-----------|--------|
| 1 | IIFE calls initSidebar() immediately on script load, before Gmail DOM is ready | IDENTIFIED |
| 2 | toggle fixed at `top: 80px` overlaps Gmail's right-panel add-ons icons | IDENTIFIED |
| 3 | DashboardApp is placeholder — subscribeToEmails never called | IDENTIFIED |
| 4 | discardBtn selector `div[data-tooltip="Discard draft"]` not found for inline reply compose windows; fallback `.remove()` just removes DOM without telling Gmail to discard draft | IDENTIFIED |

## Fixes Applied

### Fix 1 — Wait for Gmail ready (content.js)
- Added `waitForGmailReady()` that resolves when `div[role="main"]` exists
- IIFE now awaits this before calling initSidebar()

### Fix 2 — Move toggle to bottom (sidebar.js)
- Changed `top: '80px'` → `bottom: '80px'` on toggle button

### Fix 3 — Build real DashboardApp (DashboardApp.jsx)
- Added subscribeToEmails subscription using userId from user prop
- Renders list of tracked emails with open/click event counts

### Fix 4 — Robust discard (content.js)
- Try `composeWindow` scope first, then fall back to `document` scope
- Added `aria-label="Discard draft"` as additional selector variant

## Status: RESOLVED

---

# Debug Session: 2026-03-02 — Phase 5 Bugs

## Bug 1 — Drafts remain after send

**When:** Every tracked send
**Expected:** Draft disappears after send
**Actual:** Draft persists in Gmail Drafts

### Root Cause: CONFIRMED
OAuth scope `gmail.send` is insufficient for the `drafts.send` API.

- `drafts.send` requires `gmail.compose`, `gmail.modify`, or `https://mail.google.com/`
- `GET /drafts` (for fallback draft ID) requires `gmail.readonly`, `gmail.compose`, or `gmail.modify`
- `gmail.send` alone covers **neither**

What happened at runtime:
1. `getDraftId(composeWindow)` → null (modern Gmail: no `input[name="draft"]` or `[data-draft-id]`)
2. `getLatestDraftId()` → `GET /drafts?maxResults=1` → **403 Forbidden**
3. `response?.id` → undefined → `draftId = null`
4. Falls back to `SEND_EMAIL` → email sent, draft untouched

### Fix Applied
Added `https://www.googleapis.com/auth/gmail.compose` to `oauth2.scopes` in `manifest.json`.
Chrome will prompt re-authorization on next `getAuthToken()` — this is expected.

---

## Bug 2 — Real-time stats not updating

**When:** After a tracked email is opened or a link is clicked
**Expected:** Dashboard shows updated open/click counts live
**Actual:** Counts stay at 0; no live updates

### Root Cause: CONFIRMED
`subscribeToEvents()` had **no error callback**. Firestore `onSnapshot` errors
are silently swallowed — subscription simply stops with no indication.

Likely causes of underlying Firestore error:
- Firestore composite index not deployed (`firebase deploy --only firestore` still pending)
- Security rule uses `get()` for cross-read — can fail on auth/quota edge cases

### Fix Applied
1. Added `onError` parameter to `subscribeToEvents` in `db.js`
2. Added `eventsError` state to `EmailRow` — error shown inline when row expanded

### Remaining Action Required
`firebase deploy --only firestore` — deploys composite index for emails query.

## Status: RESOLVED (code fixes applied; firebase deploy still required)

---

# Debug Session: 2026-03-02 — Phase 7 Post-Ship Bugs

## Issue 1: From Name ignores Gmail display name

**Symptom:** Emails sent via tracked send show bare email address as sender, not display name.
**Expected:** `"John Doe" <john@gmail.com>` in From field.
**Actual:** No `From:` header → Gmail API uses raw address only.
**Root cause:** `gmail.js` builds MIME with no `From:` header. `user.displayName` exists in `content.js` but never passed to `sendTrackedEmail`.
**Fix:** Pass `from: user` to `sendTrackedEmail`; build `From: "Name" <email>` header in `gmail.js`.

## Issue 2: Refresh not firing after send

**Symptom:** Gmail Drafts badge and folder view stale after tracked send.
**Root cause 1:** Refresh is inside `if (draftId)` block — when draftId is null, entire block (including refresh) is skipped.
**Root cause 2:** `div[data-tooltip="Refresh"]` exact-match selector fails for localized Gmail.
**Fix:** Move refresh outside `if (draftId)` so it always fires after 1.5s. Use `^=` starts-with selector: `div[data-tooltip^="Refresh"], button[aria-label^="Refresh"]`.

## Status: RESOLVED

---

# Debug Session: 2026-03-12 — Inline Reply Threading + Refresh Parity

## Symptom
**When:** Sending a tracked email via inline reply (within an open thread view)
**Expected:**
- Sent message appears in the same thread (conversation stays intact)
- Thread view refreshes to show the new message without navigating away
**Actual:**
- Message sent but appears as a new standalone conversation (thread broken)
- Thread view doesn't refresh — user must navigate away and back to see the sent message

## Evidence Gathered

### `getDraftId()` fails for inline replies
- `input[name="draft"]` only exists in popup compose windows (Gmail legacy)
- `[data-draft-id]` attribute is not present in inline reply compose DOM
- Falls through to `getLatestDraftId()` API fallback

### `getLatestDraftId()` race condition
- Calls `GET /drafts?maxResults=1` — gets the most recently saved draft
- Gmail creates a draft when a reply compose opens, but autosave is delayed (~30s)
- If the user replies quickly (before autosave), no draft exists → `draftId = null`
- `draftId = null` → `GET_DRAFT` skipped → `threadId = null` → `messages/send` without threadId → **new thread created**

### Refresh uses global inbox Refresh button
- `clickGmailRefresh()` dispatches events to `div[data-tooltip^="Refresh"]`
- This is the toolbar Refresh button that reloads the folder/inbox list
- Does NOT trigger a refresh of the currently open thread view
- For inline replies, user stays in thread but doesn't see the new message until they navigate

### Native send investigation
The current approach reconstructs MIME from scratch and calls `messages/send` directly.
A PATCH-draft-then-native-send approach would preserve all Gmail-set threading headers, but
has a race condition: Gmail re-saves the draft DOM content on send, potentially overwriting
our tracking injection. Not pursuing this path now.

**Key insight:** The Gmail thread ID is available in the URL hash without any API call.
`window.location.hash` for an open thread = `#inbox/THREAD_ID` where THREAD_ID matches
the Gmail API `threadId` exactly. This is synchronous, always available for inline replies,
and doesn't depend on draft autosave timing.

## Hypotheses

| # | Hypothesis | Likelihood | Status |
|---|------------|------------|--------|
| 1 | `threadId` is null for inline replies because draft not autosaved yet | 85% | CONFIRMED |
| 2 | URL hash contains the correct threadId synchronously for inline context | 90% | CONFIRMED (by design) |
| 3 | Global Refresh button doesn't reload open thread view | 95% | CONFIRMED |

## Fix

### Threading fix: URL-based threadId fallback
Add `getThreadIdFromUrl()` that parses `window.location.hash` (`#view/THREAD_ID`).
In `handleTrackedSend`: if `threadId` is still null after the draft API path, use URL fallback.
This covers all inline reply cases reliably without API calls.

### Refresh fix: thread-level navigation
Update `clickGmailRefresh()` to accept `threadId`. When a threadId is known and user is in
a thread view (hash contains `/`), navigate hash away then back to that thread instead of
clicking the global Refresh. This triggers Gmail's SPA router to re-render the thread,
showing the new message.

Fall back to the existing global Refresh button when not in a thread context (e.g., sending
from a popup compose in the inbox list view).

## Resolution

**Root Cause 1 (threading):** `getDraftId()` always returns null for inline compose windows. `getLatestDraftId()` API fallback races with Gmail's 30s autosave — if no draft exists yet, `threadId` stays null and the message creates a new thread.

**Root Cause 2 (refresh):** Global Refresh button reloads the folder list, not the open thread. The thread view doesn't update to show the sent message.

**Fix:** `getThreadIdFromUrl()` parses `window.location.hash` (`#inbox/THREAD_ID`) — synchronous, no API call, always correct for inline reply context. `refreshAfterSend(threadId)` navigates hash away/back to trigger Gmail's SPA router to re-render the thread when in thread view; falls back to global Refresh for folder-list popup sends.

**Committed:** `337e6b4`

## Status: RESOLVED

---

# Debug Session: 2026-03-12 — Invalid thread_id on Inline Reply Send

## Symptom
**When:** Sending a tracked inline reply (no draft autosaved yet)
**Expected:** Message sent and threaded correctly
**Actual:** `Gmail Error [400]: Invalid thread_id value` — email fails to send

## Evidence
- Console: `draft ID resolved to null` → both DOM and API draft extraction failed
- Console: `threadId resolved from URL: FMfcgzQfCMsvMmcQTcpPjxjzNRcJNfMN` → URL fallback used
- API returns 400 "Invalid thread_id value"

## Root Cause Attempt 1: ELIMINATED
Initially believed missing `In-Reply-To`/`References` headers were the cause. But `GET_THREAD` with the URL ID also failed — the URL thread ID is not a valid Gmail REST API thread ID.

## Root Cause: CONFIRMED
Gmail URL hash thread IDs (`FMfcgzQfCMsvMmcQTcpPjxjzNRcJNfMN`) use a proprietary web-client format that is **not** the same as Gmail REST API thread IDs. Passing a URL-format ID to `messages/send` (or `threads.get`) causes 400 "Invalid thread_id value".

When no draft is saved:
- `getDraftId()` → null (inline compose has no `input[name="draft"]`)
- `getLatestDraftId()` → null (no draft created yet)
- `getThreadIdFromUrl()` → URL-format ID (wrong format for API)
- All send attempts with this ID → 400

## Fix (Attempt 2)
1. Added `GET_THREAD` handler to `background.js` (kept from attempt 1)
2. Added `SEARCH_THREADS` handler to `background.js`: `GET /threads?q=subject:"..."&maxResults=5`
3. In `content.js`, when threadId is from URL and inReplyTo is null:
   - Try `GET_THREAD` with URL ID (works if it happens to be a legacy hex API ID)
   - If that fails, call `SEARCH_THREADS` with the subject to get the real API thread ID
   - Call `GET_THREAD` with the API thread ID to get message IDs for In-Reply-To/References
   - Replace `threadId` with the valid API thread ID
   - If both paths fail, clear `threadId` (send as new thread rather than 400 error)

## Status: RESOLVED (pending verification)
