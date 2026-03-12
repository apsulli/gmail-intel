---
slug: "inline-reply-refresh"
plan_version: 1
created: "2026-03-12T13:25:00Z"
updated: "2026-03-12T13:25:00Z"
---

# Plan: inline-reply-refresh

## Root Cause Confirmation
- **Confirmed Cause:** `document.querySelector` on the refresh button returns the *first* matching element. When reading a thread (inline reply), there may be hidden or inactive refresh buttons in the DOM, meaning the wrong button is clicked. 
- **Evidence:** Global querySelector matches multiple `refresh` buttons, particularly if composing inline where thread headers or menus might have hidden buttons.
- **Confidence:** HIGH

## Fix Strategy
Modify `clickGmailRefresh` to find all matching refresh buttons and select the visually active one (`btn.offsetWidth > 0`). 

### Files to Modify
1. **`src/content.js`** — Change: `clickGmailRefresh` to filter `querySelectorAll` for an active button. Reason: guarantees clicking a visible, active refresh button (the one on the screen) instead of an invisible one.

### Implementation Steps
1. Change `const refreshBtn = document.querySelector(...)` to `const refreshBtns = document.querySelectorAll(...)`
2. Change `const refreshBtn = Array.from(refreshBtns).find(b => b.offsetWidth > 0 && b.offsetHeight > 0)`
3. Ensure the event sequence fires on the found button.

### Testing Criteria
- [ ] Bug reproduction: Try sending an inline reply, verify draft goes away and thread updates.
- [ ] Fix verification: Wait for user confirmation since Gmail requires a reload.
- [ ] Regression check: Send a popup email and confirm it still refreshes properly.

## Risk Assessment
- **Risk Level:** LOW
- **Potential Side Effects:** If no refresh buttons are visible, it won't click any. However, the exact same behavior would occur if it was failing before.
- **Mitigation:** Fallback logging.
