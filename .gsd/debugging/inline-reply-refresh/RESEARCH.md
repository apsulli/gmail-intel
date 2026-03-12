---
slug: "inline-reply-refresh"
status: researching
trigger: "Fix \"Refresh\" when replying from inline email. Currently, when sending a fresh email from the popup, it appears that triggering the native refresh functionality works, but this does not work when replying from an in-line email."
created: "2026-03-12T13:20:00Z"
updated: "2026-03-12T13:20:00Z"
---

# Research: inline-reply-refresh

## Symptom Analysis
- **Description:** When sending a tracked email via an inline reply, the global "Refresh" button doesn't seem to trigger effectively, meaning the thread might not show the newly sent email right away.
- **When:** Occurs when replying inline (as opposed to a popup compose window).
- **Expected:** The thread should refresh and show the new email (and draft should disappear).
- **Actual:** The refresh functionality fails.
- **Started:** Phase 5 implemented the `clickGmailRefresh()` workaround for drafted states.

## Error Evidence
- The current implementation of `clickGmailRefresh` uses `document.querySelector('div[data-tooltip^="Refresh"], div[aria-label^="Refresh"], button[aria-label^="Refresh"]')`.
- `document.querySelector` returns the *first* matching element in the DOM.
- In a thread view (inline reply), there may be multiple elements matching this selector, and the first one might be hidden, inactive, or not the global refresh button that actually works for the thread.

## Root Cause Hypotheses
| # | Hypothesis | Likelihood | Status |
|---|------------|------------|--------|
| 1 | The first matching "Refresh" button in the DOM is hidden or inactive when reading a thread. | 80% | UNTESTED |
| 2 | The refresh button requires focus or a different event sequence in thread view. | 10% | UNTESTED |
| 3 | The selector doesn't match the valid refresh button in thread view. | 10% | UNTESTED |

## Investigation Notes
- **2026-03-12**: Checked `clickGmailRefresh` logic in `src/content.js`. It just grabs the first `refreshBtn` and dispatches `mousedown`, `mouseup`, `click`. If multiple buttons exist, finding a `.offsetWidth > 0` visible button is much safer.

## Next Steps
- **Current Focus:** Update `clickGmailRefresh` to filter for a visible button and possibly add more broad selectors if needed.
- **Test Plan:** Modify `clickGmailRefresh` so it uses `querySelectorAll` and `#find` with `offsetWidth > 0 && offsetHeight > 0`.
