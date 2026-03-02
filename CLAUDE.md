# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Extension Development
```bash
npm run dev        # Start Vite dev server with hot reload (extension auto-reloads in Chrome)
npm run build      # Build the extension to dist/
```

### Firebase Cloud Functions
```bash
cd functions && npm run serve   # Run Cloud Functions locally
cd functions && npm run deploy  # Deploy Cloud Functions to Firebase
cd functions && npm run logs    # Stream function logs
```

### Firebase Deployment
```bash
firebase deploy --only functions     # Deploy only Cloud Functions
firebase deploy --only firestore     # Deploy only Firestore rules
firebase deploy --only hosting       # Deploy only hosting pages
firebase deploy                      # Deploy everything
```

### Loading the Extension
After `npm run build`, load `dist/` as an unpacked extension in Chrome at `chrome://extensions` with Developer Mode enabled. Reload the extension after each rebuild.

## Architecture

This is a **Manifest V3 Chrome Extension** that instruments Gmail to track email opens and link clicks, backed by **Firebase** (Firestore + Cloud Functions).

### Extension Components

**`src/content.js`** — The core tracking engine. Runs inside `mail.google.com`:
- Uses `MutationObserver` to detect Gmail compose windows as they open
- Injects a "Track Email" checkbox toggle next to Gmail's Send button
- Intercepts the Send action (click + Cmd/Ctrl+Enter keyboard shortcut)
- On send: extracts all recipients (handles Gmail's chip elements and autocomplete), rewrites `<a href>` links through the `trackClick` Cloud Function, appends a tracking pixel `<img>` pointing to `trackPixel`, then sends individual emails per recipient via Gmail API
- Saves email metadata to Firestore

**`src/background.js`** — The Manifest V3 service worker. Acts as a proxy for two things:
- OAuth token acquisition via `chrome.identity.getAuthToken()` (can't be called from content scripts)
- Gmail API `send` requests (bypasses CORS restrictions that block content scripts)
- Listens for `GET_AUTH_TOKEN` and `SEND_EMAIL` messages from the content script

**`src/App.jsx` / `src/main.jsx`** — React popup shown when clicking the extension icon. Currently a placeholder; Phase 4 is building the real in-Gmail dashboard here.

### Backend (Firebase)

**`functions/index.js`** — Two HTTP Cloud Functions:
- `trackPixel` — Logs an "open" event to Firestore sub-collection, returns a 1×1 transparent GIF
- `trackClick` — Logs a "click" event with the target URL, then 302-redirects to the original URL

**`src/api/db.js`** — Firestore writes: saves email documents (`emails/{emailId}`) with userId, subject, recipients array

**`src/api/gmail.js`** — Builds RFC 2822 MIME messages and calls the Gmail API `/gmail/v1/users/me/messages/send` endpoint

### Firestore Data Model
```
emails/{emailId}
  userId, subject, recipients[], sentAt
  events/{eventId}
    type ("open"|"click"), recipientId, timestamp, userAgent, ip, targetUrl
```

Security rules enforce that users can only access emails where `userId == request.auth.uid`.

### Build System

**Vite + CRXJS** (`vite.config.js`) — CRXJS reads `manifest.json` and outputs a correctly-structured Chrome extension to `dist/`. The manifest is the source of truth for permissions, scripts, and OAuth config.

Key permissions in `manifest.json`: `identity` (for OAuth), `scripting`, `activeTab`, `storage`. Host permissions cover `mail.google.com` and `gmail.googleapis.com`.

### Email Tracking Data Flow

1. User enables tracking toggle and clicks Send in Gmail
2. Content script intercepts → calls background for OAuth token → authenticates Firebase
3. For each recipient: rewrites links + appends pixel → sends via Gmail API (through background proxy) → writes to Firestore
4. Recipient opens email → pixel request hits `trackPixel` Cloud Function → logged as "open"
5. Recipient clicks link → `trackClick` logs "click" → redirects to original URL

### Project Documentation

`.gsd/` contains GSD framework docs: `ARCHITECTURE.md`, `ROADMAP.md`, `SPEC.md`, `STATE.md`, `DECISIONS.md`. Check `STATE.md` for current phase status and `ROADMAP.md` for planned phases.

Current state: Phase 4 (in-Gmail React Dashboard) — sidebar injection into Gmail + real-time Firestore subscriptions.

## Firebase Project

- **Project ID**: `gm-intel`
- **Cloud Functions region**: `us-central1`
- **OAuth Client ID**: `649396916340-6558v2b3n9a1s354dr37pf3gch570463.apps.googleusercontent.com`
- Firebase config is in `src/firebase-config.js` (API key is a public identifier, not a secret)
