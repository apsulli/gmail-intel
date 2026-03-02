# JOURNAL.md

## Session: 2026-03-02 13:59

### Objective

Investigate user's tracking issues in Gmail extension. Initialize the overall project structure.

### Accomplished

- Executed `/new-project` workflow to initialize the .gsd files (`SPEC.md`, `ROADMAP.md`, `REQUIREMENTS.md`, etc.).
- Received logs for tracking extraction errors. Ascending algorithm to find recipient input fields is NOT working ("Found 0 to/cc/bcc inputs") up to depth 35.

### Verification

- [ ] Project initialized
- [ ] Bug located: Yes, the inputs are not found by `composeWindow.querySelectorAll` at any level.

### Paused Because

User requested `/pause-work` with a log dump showing the error. Pausing to document the findings and ensure context is stored cleanly for the next run.

### Handoff Notes

- The log says `Initial container: <div id=":6f" ... aria-label="Message Body" ...>`. It checks up to Depth 35 and finds nothing. This implies the strategy of ascending up the DOM from `aria-label="Message Body"` and looking for inputs at each step is flawed. Either the inputs are not placed in the `to`/`cc`/`bcc` arrays, or they don't exist as `<input>` forms in that segment of the DOM tree. We need to query for something like `span[email]` somewhere else on the page OR the `composeWindow` is not the correct ancestor for the recipient fields.

## Session: 2026-03-02 13:50

### Objective

Fix OAuth verification issues and get the Gmail Intel Chrome extension's email tracking flow working end-to-end.

### Accomplished

- Injected Google Site Verification meta tag into `hosting/index.html` and deployed to Firebase Hosting for domain ownership verification
- Fixed CORS error: refactored `src/api/gmail.js` to proxy Gmail API requests through the background service worker (`src/background.js`) instead of direct `fetch` from content script
- Added `SEND_EMAIL` message handler to `src/background.js` for Gmail API proxy
- Updated `MutationObserver` in `src/content.js` to detect both popup compose windows AND inline reply/forward forms (anchored on `div[aria-label="Message Body"]` instead of `div[role="dialog"]`)
- Changed `injectToggle()` to accept `sendButton` as a parameter from the observer
- Defaulted "Track Email" toggle to `checked = true` with matching active-state styling
- Aggressively intercepted Send button events (`click`, `mousedown`, `mouseup`, `pointerdown`, `pointerup`) plus `Cmd+Enter` / `Ctrl+Enter` keyboard shortcuts
- Added extensive debug logging (🔍) to recipient extraction logic
- Added fallback recipient extraction: ascending DOM loop → `data-hovercard-id` chips → `[email]` attribute scan

### Verification

- [x] Extension builds successfully (`npm run build`)
- [x] CORS error resolved (interceptor activates, no more CORS reject in console)
- [x] Firebase Hosting deployed with site verification meta tag
- [ ] Recipient extraction still failing — "Please add at least one recipient" error persists
- [ ] End-to-end tracked email send not yet verified
- [ ] Firestore logging not yet verified
- [ ] trackPixel / trackClick Cloud Functions not yet verified with real data

### Paused Because

User requested `/pause-work`. Recipient extraction debugging is in progress — debug logging was added but console output not yet collected.

### Handoff Notes

- The critical next step is to **get the 🔍 console log output** from the user after they click Send. This will reveal whether the ascending DOM loop finds `input[name="to"]` elements and what their `.value` contains.
- Strong hypothesis: Gmail stores recipient emails in `span[email="..."]` attributes on chip elements, not in hidden input `.value`. Try `composeWindow.querySelectorAll('span[email]')` as the primary selector.
- The `composeWindow` variable itself may need inspection — it's set by the MutationObserver's ascending walk from `bodyDiv`, and may not be high enough to contain recipient fields for all compose window types.
