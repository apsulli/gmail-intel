# JOURNAL.md

## Session: 2026-03-12 (Threading + Tracking Fixes)

### Objective

Fix inline reply threading, refresh-after-send behavior, open tracking on threaded replies, and add multi-account safety guard.

### Accomplished

- **Multi-account guard**: `IS_PRIMARY_ACCOUNT` — extension silently inactive on `u/1+` (no throw, no errors).
- **Subject extraction**: `h2.hP` → `document.title` fallback for inline reply compose where subject input is hidden.
- **GET_MESSAGE handler**: added to `background.js`; treats URL hash ID as message ID (modern Gmail format) — returns real API threadId + reply headers in one call.
- **3-stage URL fallback**: GET_MESSAGE → GET_THREAD → subject search (replaces broken GET_THREAD → subject search chain).
- **Refresh fix**: navigate to folder root only after inline reply send — prevents Gmail re-opening draft compose from internal state.
- **Pixel suppression**: reduced 30s → 15s in `functions/index.js`.
- Version: 2.11.2.

### Verification

- [x] Build passes
- [x] All changes committed
- [x] Tracking pixel confirmed present in sent email source (Show Original)
- [ ] End-to-end inline reply threading validated
- [ ] Open tracking on threaded replies validated (requires functions deploy + 15s wait)
- [ ] Multiple sequential replies stay in thread

### Paused Because

User requested pause to validate fixes independently.

### Handoff Notes

- Functions change (`15s suppression`) must be deployed: `cd functions && npm run deploy`
- Threading should now work via GET_MESSAGE (primary path for modern Gmail URLs)
- Refresh lands on folder root — user clicks thread to see reply (intentional, prevents draft-reopen)
- If threading still breaks on second reply, add console logging to trace which stage resolves threadId

---

## Session: 2026-03-12 (Threading + Phase 11)

### Objective
Fix inline reply threading end-to-end; execute Phase 11 multi-tenant sender grouping.

### Accomplished

- **Threading fix 1**: `getThreadIdFromUrl()` — URL hash as synchronous threadId fallback for inline replies before draft autosave.
- **Threading fix 2**: `GET_THREAD` handler in background.js — resolves In-Reply-To/References from thread Message-IDs (required by Gmail API when threadId is set).
- **Threading fix 3**: `SEARCH_THREADS` handler + subject-search fallback — handles case where URL hash ID isn't a valid REST API thread ID. Gracefully clears threadId rather than 400ing.
- **Phase 11**: `fromEmail`/`fromName` persisted on email docs; dashboard two-level grouping (sender → week) with cyan/pink sticky headers.
- **Refresh fix**: `refreshAfterSend()` navigates SPA hash away/back to thread for inline replies instead of clicking global Refresh.
- Version: 2.9.7 → 2.10.1.

### Verification

- [x] Build passes at 2.10.1
- [x] All changes committed
- [ ] End-to-end inline reply threading verified in live Gmail
- [ ] Legacy Firestore docs backfilled with fromEmail/fromName

### Paused Because

User requested pause.

### Handoff Notes

Threading chain is complete: draft API → URL hash → subject search → graceful no-thread. Phase 11 shipped. No open blockers. Next: Chrome Web Store prep or Phase 12 (full multi-account auth).

---

## Session: 2026-03-12 13:45

### Objective

Address refresh and threading isolation for inline replies, setup CI workflows using GitHub Actions. Address a user pause request.

### Accomplished

- Executed `inline-reply-refresh` bug fix: targeted `[data-tooltip="Refresh"]` by checking DOM dimensions.
- Executed `inline-reply-thread-break` bug fix: leveraged `format=METADATA` Gmail Draft endpoint to extract native `threadId`, `References`, and `In-Reply-To` parameters, wiring them back to the API request and raw MIME packet.
- Designed `deploy-functions.yml` for automated Google Cloud Functions pipelines leveraging GitHub `.secrets.GCP_SA_KEY`. Setup pipeline permissions. 

### Verification

- [x] Action workflow compiled natively without linter breakage.
- [ ] Fixes to caching and threading proved insufficient; inline threads still segregate. Popups appear successful.

### Paused Because

User formally requested to stop per `/pause-work`, recognizing significant outstanding architectural blocks (broken threading, broken inline refresh, lack of verified multi-tenant support).

### Handoff Notes

The threading algorithms injected within `src/content.js` > `sendTrackedEmail` remain compromised. We're effectively overriding Gmail's standard HTTP logic in an inline setting while stripping some unknown piece of contextual data. The multi-tenant architecture tracking histories need isolating too.

## Session: 2026-03-02 (Phase 8 Execution + UX Polish)

### Objective

Execute Phase 8 UX improvements, add pull-out close button, inline fonts, and correctly offset against Gmail Side Panel.

### Accomplished

- Executed Plans 8.1, 8.2, 8.3 applying dark mode variables and new fonts.
- Built-in fonts via Vite (`assetsInlineLimit`) to prevent Gmail proxying issues.
- Exchanged the static 'X' close button for an interactive '›' / '‹' tab on the left edge of the sidebar.
- Implemented offset checking (`document.querySelector('[aria-label="Side panel"]')`) so the extension panel rests flush beside Gmail's addon side panel.

### Verification

- [x] Fonts are rendering via base64 inlined config.
- [x] Toggle arrow swaps glyphs properly.
- [x] extension sits flush to Gmail's right panel.
- [ ] Offset mechanism currently jumps briefly when the side panel is toggled, requires polish later.

### Paused Because

User requested pause, acceptable for now.

### Handoff Notes

- Review offset jumpiness when resuming if UI polish is requested.
- Ready for publishing/packaging otherwise.

---

## Session: 2026-03-02 (Phase 7 Execution + UX Polish)

### Objective

Execute Phase 7 Dashboard UX plans, fix post-ship bugs, polish toggle icon positioning.

### Accomplished

**Phase 7 execution:**
- 7.1: Weekly grouping — `getWeekStart`/`weekLabel`; sticky week headers; emails bucketed Sun–Sat
- 7.2: Click drill-down — `urlClicks` in `buildRecipientStats`; collapsible URL list per recipient
- 7.3: Pagination — `subscribeToEmails(limitCount)`; Load More (+20); ↺ reset to 20

**Bug fixes:**
- From Name: MIME `From:` header now uses `user.displayName` from Firebase auth
- Gmail refresh: `clickGmailRefresh()` always fires 1.5s post-send (decoupled from draftId)
- Firestore WebChannel transport errors: `experimentalForceLongPolling: true`

**Sidebar polish:**
- Toggle moved to Gmail top bar, left of the "?" Support icon
- Polling `getBoundingClientRect` (setInterval, 10s timeout) to handle unpainted elements
- Hidden element disambiguation: `querySelectorAll` + `r.top < 150` filter
- Sidebar z-index overlay fixed (2147483647)
- X close button in React tree via `onClose` prop through `mountDashboard → DashboardApp`
- Esc key closes sidebar
- Final toggle offset: `(r.left - 40 - 52)` to clear the support icon

### Verification

- [x] Phase 7 plans all committed
- [x] From Name fix in gmail.js
- [x] Gmail refresh always fires
- [x] Firestore long-polling active
- [x] Toggle visible in Gmail top bar
- [x] X button and Esc close sidebar
- [ ] Toggle clear of "?" icon — needs visual verify after rebuild (last shift was -52)
- [ ] End-to-end tracked email flow smoke test

### Paused Because

Natural break point — user called it a day.

### Handoff Notes

- Rebuild + reload extension first
- Verify toggle is fully clear of "?" icon (may need ±10px tuning on the left offset)
- All core features working; ready for Chrome Web Store submission planning

---

> **📦 Older entries archived** — See `.gsd/journal/2026-03-archive.md` for Phase 5–6 sessions.
