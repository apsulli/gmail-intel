# Gmail Intel — Email Tracking Extension

A lightweight Chrome extension that tracks email opens and link clicks natively within Gmail, with a live dashboard injected directly into the Gmail UI.

## Features

- **Open tracking** — Embeds a pixel in sent emails; logs when recipients open them
- **Click tracking** — Rewrites links to track clicks and redirect transparently
- **In-Gmail dashboard** — React sidebar injected into Gmail showing open/click activity per email and recipient
- **Per-recipient breakdown** — Stats, timestamps, and clicked URLs per recipient

## Tech Stack

- **Chrome Extension** — Manifest V3, content script + service worker
- **React** — Sidebar dashboard rendered inside Gmail
- **Firebase** — Firestore (data storage), Cloud Functions (pixel/click endpoints)
- **Google Identity** — OAuth via `chrome.identity` API

## Development

```bash
npm install
npm run dev        # Vite dev server with hot reload
npm run build      # Build to dist/
npm run zip        # Build and package as zip for Chrome Web Store
```

Load the extension: open `chrome://extensions`, enable Developer Mode, click **Load unpacked**, select `dist/`.

## Firebase (Cloud Functions)

```bash
cd functions
npm run serve      # Run locally
npm run deploy     # Deploy to Firebase
npm run logs       # Stream logs
```

## Architecture

```
src/
  content.js        # Core tracking engine — runs inside mail.google.com
  background.js     # Service worker — OAuth proxy, Gmail API send
  sidebar.js        # Sidebar DOM injection
  dashboard/        # React dashboard (injected into Gmail)
  api/
    db.js           # Firestore read/write
    gmail.js        # Gmail API (RFC 2822 message builder)

functions/
  index.js          # trackPixel + trackClick Cloud Functions
```

### Data flow

1. User enables tracking toggle and clicks Send
2. Content script intercepts → gets OAuth token → rewrites links + appends pixel → sends via Gmail API
3. Recipient opens email → pixel hits `trackPixel` → logged as "open" in Firestore
4. Recipient clicks link → `trackClick` logs "click" → redirects to original URL
5. Dashboard polls Firestore every 30s and displays activity

### Firestore schema

```
users/{userId}/emails/{emailId}
  subject, recipients[], sentAt

users/{userId}/emails/{emailId}/events/{eventId}
  type ("open"|"click"), recipientId, timestamp, targetUrl
```

## Firebase Project

- **Project ID**: `gm-intel`
- **Region**: `us-central1`
