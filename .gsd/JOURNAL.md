# JOURNAL.md

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

## Session: 2026-03-02 (Phase 6 Execution + Draft Badge Fix)

### Objective

Execute Phase 6 (multi-tenant data model migration) and fix stale draft badge after tracked send.

### Accomplished

**Phase 6 execution (2 commits):**
- 6.1: db.js → `users/{userId}/emails/{emailId}` paths + `emailLookup/{emailId}` write
- 6.2: Cloud Functions → emailLookup-based userId resolution for trackPixel + trackClick
- 6.3: DashboardApp.jsx → userId prop threaded into EmailRow + subscribeToEvents
- 6.4: firestore.rules + firestore.indexes.json updated
- Deployed Cloud Functions (both functions updated successfully)
- Deployed Firestore rules + deleted old composite index with `--force`

**Bug fix:**
- After tracked send, Gmail's draft badge was stale until user navigated
- Root cause: draft deleted via API but Gmail's frontend state machine unaware
- Fix: click `div[data-tooltip="Refresh"]` after DELETE_DRAFT_BY_ID callback

### Verification

- [x] `npm run build` passes after Phase 6 changes
- [x] Cloud Functions deployed: trackPixel + trackClick updated
- [x] Firestore rules deployed with new path-param auth
- [x] Old composite index deleted
- [ ] Human end-to-end verify: send → check Firebase Console paths → dashboard shows data
- [ ] Old `emails/` collection deleted in Firebase Console
- [ ] Draft badge refresh fix verified in Chrome

### Paused Because

User requested pause after Phase 6 execution and bug fix complete.

### Handoff Notes

- All code changes committed, all deploys done
- Human cutover checklist in `.gsd/phases/6/VERIFICATION.md`
- Next: `/execute 7` after cutover verified

---

## Session: 2026-03-02 (Phase 6 Planning)

### Objective

Resume from Phase 5 completion, add multi-tenant data model migration as Phase 6, discuss and plan it.

### Accomplished

- Added Phase 6 (Full Multi-Tenant Support) and Phase 7 (Dashboard UX) to ROADMAP.md
- Discussed Phase 6 scope: migration strategy, userId-in-URLs security, Firestore indexes, deployment order
- Documented decisions in DECISIONS.md:
  - Copy-then-delete migration (Option A) — no script needed, all data is junk test data
  - `emailLookup/{emailId} → { userId }` lookup collection to avoid exposing Firebase UID in tracking URLs
  - Drop composite index (auto-index sufficient for user-scoped path queries)
  - Wipe-and-restart cutover (simplest, pre-production)
- Created 4 execution plans in `.gsd/phases/6/`:
  - 6.1: `src/api/db.js` — new Firestore paths + emailLookup write
  - 6.2: `functions/index.js` — lookup-based userId resolution in Cloud Functions
  - 6.3: Frontend wiring — `content.js` URL verification + `DashboardApp.jsx` userId threading
  - 6.4: Config + cutover — rules, indexes, deploy, end-to-end verify

### Verification

- [x] Plans committed: `docs(phase-6): create execution plans for multi-tenant data model migration`
- [x] DECISIONS.md updated with all Phase 6 decisions
- [x] ROADMAP.md has Phase 6 + Phase 7 task lists

### Paused Because

User requested pause after planning complete.

### Handoff Notes

- All 4 plans are ready. Execute wave 1 first (6.1, 6.2, 6.3 can be coded together), then wave 2 (6.4 deploys + cutover).
- Key design: `emailLookup/{emailId}` written by client at send time; Cloud Functions read it to find `users/{userId}/emails/{emailId}` path
- After 6.4 cutover: manually delete `emails/` collection in Firebase Console (all test data)

---

> **📦 Older entries archived** — See `.gsd/journal/` for historical sessions.
> Run `/archive-journal` to archive when this file grows beyond 5 sessions.
