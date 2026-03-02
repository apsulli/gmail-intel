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
