# Publishing Gmail Intel to the Chrome Web Store (Unlisted)

Publishing as **unlisted** means the extension won't appear in Chrome Web Store search results — only people with the direct link can install it. It still goes through Google's full review process and enables Chrome sync across devices.

---

## Prerequisites

- A Google account
- One-time $5 developer registration fee at [chrome.google.com/webstore/devconsole](https://chrome.google.com/webstore/devconsole)
- A hosted privacy policy URL (can be a simple GitHub Gist or Firebase Hosting page)

---

## Step 1: Build the Extension

```bash
npm run build
```

This outputs a production-ready extension to `dist/`.

---

## Step 2: Create the ZIP File

The ZIP must have `manifest.json` at the root. Since CRXJS outputs the manifest to `dist/`, zip the contents of `dist/` directly:

```bash
cd dist && zip -r ../gmail-intel.zip . && cd ..
```

Verify the ZIP structure:
```
gmail-intel.zip
├── manifest.json          ← must be at root
├── index.html
├── manifest.json
├── service-worker-loader.js
└── assets/
    ├── background.js-*.js
    ├── content.js-*.js
    └── ...
```

---

## Step 3: Prepare Required Assets

All images must be PNG unless noted.

| Asset | Dimensions | Notes |
|-------|-----------|-------|
| Extension icon | 128×128 | 96×96 artwork + 16px transparent padding on each side |
| Promotional tile | 440×280 | Required even for unlisted |
| Screenshot(s) | 1280×800 or 640×400 | At least 1 required (PNG or JPG) |
| Marquee image | 1400×560 | Optional |

**Suggested screenshots:**
1. Gmail compose window with the "Track Email" toggle visible
2. The Gmail Intel sidebar dashboard showing tracked email list
3. An email row expanded showing open/click counts

---

## Step 4: Prepare Store Listing Text

**Title** (45 char max)
```
Gmail Intel - Email Tracker
```

**Short Description** (132 char max)
```
Track when recipients open your emails and click links. Real-time analytics via Firebase, right inside Gmail.
```

**Full Description** (4,000 char max) — cover:
- What it does (tracking pixel + link rewriting)
- The opt-in toggle (explicit consent per email)
- Where data is stored (Firebase/Firestore, your own project)
- What permissions are used and why (see Step 7)

---

## Step 5: Write a Privacy Policy

Host a simple page covering:
- What data is collected: email subject, recipient addresses, open events (IP, timestamp, user agent), click events (URL, timestamp)
- Where it's stored: Google Firebase Firestore, scoped to the sender's account
- User consent: tracking only occurs when the "Track Email" toggle is enabled
- Data retention and deletion
- No data is sold or shared with third parties

A GitHub Gist or a page on Firebase Hosting (`firebase deploy --only hosting`) works fine.

---

## Step 6: Submit to the Chrome Developer Dashboard

1. Go to [chrome.google.com/webstore/devconsole](https://chrome.google.com/webstore/devconsole)
2. Click **Add new item**
3. Upload `gmail-intel.zip`
4. Complete the **Store Listing** tab:
   - Category: **Productivity**
   - Language: English

   **Title** (45 char max):
   ```
   Gmail Intel — Email Open & Click Tracker
   ```

   **Short Description** (132 char max):
   ```
   Track when recipients open your emails and click your links. Per-email opt-in toggle, real-time event log, all inside Gmail.
   ```

   **Full Description**:
   ```
   Gmail Intel adds lightweight email tracking to Gmail — no external dashboards, no complicated setup. When you compose an email, a "Track Email" toggle appears next to the Send button. Enable it and Gmail Intel handles the rest.

   HOW IT WORKS

   • Tracking pixel — A tiny invisible image is appended to each outgoing email. When a recipient loads the email, the image request is logged as an "open" event.
   • Link rewriting — Every link in the email body is rewritten to pass through a tracking redirect. When a recipient clicks a link, the click is logged and they are instantly redirected to the original URL.
   • Per-recipient tracking — If you send to multiple recipients, each one gets a unique tracking ID so you can see exactly who opened and who clicked.

   OPT-IN BY DEFAULT, OFF WHEN YOU WANT

   Tracking is controlled per email with a simple checkbox. Disable it and the email is sent normally through Gmail with zero modification. No tracking code is injected unless you explicitly opt in.

   YOUR DATA, YOUR FIREBASE PROJECT

   All tracking data is stored in your own Firebase Firestore project — not on a third-party server. Each email record includes the subject, recipients, and a timestamped event log of opens and clicks. Firestore security rules ensure that only you can access your own data.

   Data stored per event:
   – Event type (open or click)
   – Timestamp
   – Recipient identifier
   – User agent and IP address
   – Target URL (for clicks)

   PERMISSIONS EXPLAINED

   • Identity — Authenticates you with Google so the extension can send emails via the Gmail API and sign in to Firebase.
   • Scripting & ActiveTab — Injects the tracking toggle UI into Gmail's compose window.
   • Storage — Caches local extension state.
   • Host permissions (mail.google.com, googleapis.com) — Required to run inside Gmail and call Google APIs.

   BUILT WITH

   Chrome Extension Manifest V3, Firebase Auth, Firestore, Cloud Functions, Vite + CRXJS.

   This extension is intended for personal use and small teams. It is not affiliated with or endorsed by Google.
   ```
5. Upload assets in the **Store Listing** tab:
   - Extension icon (128×128)
   - Promotional tile (440×280)
   - At least one screenshot
6. Complete the **Privacy** tab:
   - Paste your privacy policy URL
   - Justify each permission (see Step 7)
7. Go to the **Distribution** tab:
   - Under **Visibility**, select **Unlisted**
8. Click **Submit for review**

---

## Step 7: Permission Justifications

Google will ask you to justify each permission during submission. Use these explanations:

| Permission | Justification |
|-----------|--------------|
| `identity` | Obtain an OAuth token to authenticate the user with Firebase and call the Gmail API to send tracked emails |
| `scripting` | Inject the Track Email toggle UI into Gmail's compose window |
| `activeTab` | Interact with the active Gmail tab to detect compose windows |
| `storage` | Cache extension state locally |
| `https://mail.google.com/*` | Content script access to run inside Gmail |
| `https://gmail.googleapis.com/*` | Call the Gmail API to send emails on behalf of the user |
| `https://*.firebaseio.com/*` | Access Firebase Realtime Database and Firestore for reading and writing email tracking data |
| `https://*.googleapis.com/*` | Access Firebase Auth, Firestore, and other Google APIs |
| **Host permissions (combined)** | The extension requires host access to `mail.google.com` to inject the tracking toggle UI into Gmail's compose window, `gmail.googleapis.com` to send emails via the Gmail API, `*.firebaseio.com` to read/write tracking data in Firestore, and `*.googleapis.com` to authenticate via Firebase Auth and access other Google APIs. All host permissions are scoped to Google-owned domains only — no third-party hosts are contacted. |

---

## Step 8: Review Process

- **Timeline:** Typically 1–3 business days, can take up to a week
- Google checks: manifest compliance, permission justification, privacy policy accuracy, no malware
- You'll receive an email when approved or if changes are required

---

## Step 9: Install on Other Devices

Once approved, Google provides a permanent URL:
```
https://chrome.google.com/webstore/detail/[extension-id]
```

- Share this link with anyone who should have access
- Install it on your other devices — Chrome sync will keep it updated automatically
- The extension ID in the URL is stable and won't change

---

## Updating the Extension

1. Increment the version in `manifest.json` and `package.json`
2. Run `npm run build`
3. Re-zip: `cd dist && zip -r ../gmail-intel.zip . && cd ..`
4. Dashboard → your extension → **Package** tab → **Upload new package**
5. Submit for review (updates go through review too, usually faster)

---

## Resources

- [Chrome Web Store Publish Guide](https://developer.chrome.com/docs/webstore/publish)
- [Image Specifications](https://developer.chrome.com/docs/webstore/images)
- [Distribution & Visibility Options](https://developer.chrome.com/docs/webstore/cws-dashboard-distribution)
- [Permission Best Practices](https://developer.chrome.com/docs/webstore/best_practices)
- [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole)
