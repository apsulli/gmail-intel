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
