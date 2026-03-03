# GSD State

## Current Position

- **Phase**: Phase 7 — Dashboard UX
- **Task**: All tasks complete + post-ship polish complete
- **Status**: Active (resumed 2026-03-02)
- **Note**: Added Phase 8 (Sidebar Look-and-Feel UX Improvements)

## Last Session Summary

Phase 7 executed. Post-ship bugs fixed. Toggle icon positioning polished.

- **Phase 7 execution**: weekly grouping, click drill-down, pagination
- **From Name fix**: MIME `From:` header now uses `user.displayName` from Firebase auth (`src/api/gmail.js`)
- **Gmail refresh fix**: `clickGmailRefresh()` decoupled from `draftId` — always fires after 1.5s post-send
- **Firestore WebChannel fix**: switched to `initializeFirestore` with `experimentalForceLongPolling: true`
- **Sidebar toggle repositioned**: moved to Gmail's top bar, left of the "?" Support icon; polling `getBoundingClientRect` until element is painted; z-index overlay fixed
- **X close button**: lives in React tree as `onClose` prop passed through `mountDashboard → DashboardApp`; Esc key also closes
- **Toggle shift**: formula `(r.left - 40 - 52)` to clear the support icon with 52px gap

## In-Progress Work

- No uncommitted changes. Toggle shift (`-52`) may need minor tuning after visual verification.

## Blockers

- None

## Context Dump

### Toggle Positioning (sidebar.js)

- `findVisibleToolbarAnchor()` polls via `setInterval` every 100ms (10s timeout)
- Filters `querySelectorAll` hits by `r.top >= 0 && r.top < 150` to skip hidden duplicate elements
- Formula: `toggle.style.top = Math.round(r.top + (r.height - 40) / 2) + 'px'`
- Formula: `toggle.style.left = (r.left - 40 - 52) + 'px'`
- Fallback (if no anchor found): fixed bottom-right with blue background
- Sidebar z-index: `2147483647`; toggle z-index: `2147483646`

### X Close Button Architecture

- `initSidebar` returns `{ container: content, close: closeSidebar }` — `content` is an inner div, React mounts into it
- `mountDashboard(container, user, close)` passes `close` as `onClose` prop to `DashboardApp`
- ✕ button rendered in React header alongside ↺ reset button

### Multi-Tenant Design (Fully Implemented)

- Email docs: `users/{userId}/emails/{emailId}`
- `emailLookup/{emailId} → { userId }` written by client at send time
- Tracking URLs: `?emailId=X&recipientId=Y` only — no userId exposed

### Files of Interest

- `src/sidebar.js`: toggle positioning logic
- `src/dashboard/DashboardApp.jsx`: onClose prop, ✕ button, week buckets, click drill-down, pagination
- `src/dashboard/index.jsx`: mountDashboard — passes onClose
- `src/content.js`: IIFE destructures `{ container, close }` from initSidebar; clickGmailRefresh decoupled
- `src/api/gmail.js`: From header using user.displayName
- `src/api/db.js`: experimentalForceLongPolling

## Next Steps

1. Rebuild + reload extension; verify toggle is fully clear of the "?" icon
2. End-to-end smoke test: send tracked email → open/click events appear in sidebar
3. Decide next phase: Chrome Web Store submission or additional features
