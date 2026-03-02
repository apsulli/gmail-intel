# GSD State

## Current Position

- **Phase**: Phase 3 — Chrome Extension & Gmail API Integration
- **Task**: Debugging recipient extraction from Gmail compose DOM
- **Status**: Paused at 2026-03-02 13:50

## Last Session Summary

- Fixed OAuth "Authorization page could not be loaded" error by verifying Chrome App credential setup
- Fixed CORS error: moved Gmail API `fetch` from content script → background service worker proxy
- Updated MutationObserver to detect both popup compose windows AND inline reply forms
- Defaulted "Track Email" toggle to checked (true)
- Added Google Site Verification meta tag → deployed hosting → domain verification in Search Console
- Added extensive 🔍 debug logging to recipient extraction (awaiting user's console output)

## In-Progress Work

- Recipient extraction is failing ("Please add at least one recipient") — the debug logging was added but user paused before providing console output
- Files modified since last commit:
  - `src/content.js` — Major refactors: DOM observer, recipient parsing with ascending loop, debug logging
  - `src/background.js` — Added `SEND_EMAIL` message handler (Gmail API proxy)
  - `src/api/gmail.js` — Refactored to proxy through background SW instead of direct fetch
  - `hosting/index.html` — Added Google Site Verification meta tag

## Blockers

**Primary blocker**: Recipient extraction from Gmail's DOM is failing. The `input[name="to"]` elements exist in Gmail's DOM but their `.value` property may be empty — Gmail may store the actual email address in a different attribute or element. The `data-hovercard-id` chip fallback and `[email]` attribute fallback are also not finding recipients.

**Root cause hypothesis**: The `composeWindow` variable (set by the MutationObserver's ascending DOM walk) may not be a high enough ancestor to contain the recipient inputs. OR Gmail's hidden `input[name="to"]` fields have empty `.value` and the actual email is stored elsewhere (e.g., in `span[email]` elements inside recipient chips, or in `data-tooltip` attributes).

## Context Dump

### Decisions Made

- **CORS bypass via background.js**: Content scripts in MV3 cannot make cross-origin fetches to `gmail.googleapis.com`. Solution: proxy through background service worker via `chrome.runtime.sendMessage`. This is the standard pattern.
- **MutationObserver anchored on `div[aria-label="Message Body"]`**: This element exists in both popup compose and inline reply forms, making it a reliable anchor. We ascend up to 15 levels to find the Send button container.
- **WeakMap for tracking state**: Each compose window gets its own tracking toggle state stored in a `WeakMap` keyed by the compose window DOM element.

### Approaches Tried

- `input[name="to"]` hidden inputs → Found inputs but `.value` was empty
- `[data-hovercard-id]` on recipient chips → Also returned empty
- `[email]` attribute fallback → Not yet confirmed in console output
- Ascending DOM loop from `bodyDiv` → Finds `to` inputs but values are empty

### Current Hypothesis

Gmail's recipient chips likely store the email address in a `span[email="user@example.com"]` attribute on the chip element itself, NOT in the hidden `input[name="to"]` `.value`. The next step should be:

1. Get the 🔍 console logs from the user to confirm what depth the inputs are found at and what their values are
2. If inputs have empty values, try: `composeWindow.querySelectorAll('span[email]')` and extract the `email` attribute
3. Also try: `composeWindow.querySelectorAll('div[data-hovercard-id]')` at the `composeWindow` level (not just within the ascending loop)

### Files of Interest

- `src/content.js`: Lines 46-96 — the recipient extraction logic with debug logging
- `src/background.js`: Lines 19-49 — the SEND_EMAIL proxy handler
- `src/api/gmail.js`: Lines 19-40 — the refactored sendTrackedEmail using chrome.runtime.sendMessage
- `hosting/index.html`: Line 6 — Google Site Verification meta tag

## Next Steps

1. **Get console log output** — Reload extension, send test email, copy the 🔍 logs. This will reveal exactly where the loop stops and what values it finds.
2. **Fix recipient extraction** — Based on logs, likely need to add `span[email]` selector as the primary extraction method (Gmail stores recipient email in `email` attribute on span elements inside chips).
3. **Remove debug logging** — Once recipient extraction is fixed, strip the verbose 🔍 logs.
4. **Test end-to-end** — Verify: tracked email sends → links rewritten → pixel appended → Firestore entry created → opening email triggers trackPixel → clicking link triggers trackClick.
5. **Phase 4** — Build the in-Gmail React Dashboard (currently a stub).

## Key Project Info

- **Firebase Project ID**: `gm-intel`
- **Cloud Functions URLs**:
  - `https://us-central1-gm-intel.cloudfunctions.net/trackPixel`
  - `https://us-central1-gm-intel.cloudfunctions.net/trackClick`
- **Extension Client ID**: `649396916340-6558v2b3n9a1s354dr37pf3gch570463.apps.googleusercontent.com`
- **Homepage**: `https://gm-intel.web.app/`
- **Privacy Policy**: `https://gm-intel.web.app/privacy.html`
