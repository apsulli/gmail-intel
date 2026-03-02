# Gmail Tracking Extension: AI Agent Bootstrap Instructions

## Project Context & Goal

You are an expert full-stack developer AI. Your task is to build a secure, multi-tenant Gmail tracking Chrome Extension with a Firebase backend. The app will be called Gmail Intel.

**Core Capabilities:**

- Track when an email is opened, how many times, and by which specific original recipient.
- Track link clicks within the email (when, how many times, and by which specific original recipient).
- Inject a React-based dashboard directly into the Gmail UI for the user to view their specific metrics.
- Ensure multi-tenant security via Google Authentication.

## Tech Stack

- **Frontend/Dashboard:** React, Vite, CRXJS Vite Plugin (for extension bundling), Firebase Web SDK.
- **Backend/Database:** Firebase Cloud Functions (Node.js), Firestore.
- **Browser Extension:** Manifest V3, Content Scripts (for UI injection).

## Execution Directives

You must create all project files, provide code, and pause to prompt the user for manual actions when required. Do not proceed to the next phase until the user confirms the manual steps are complete.

---

### Phase 1: Initial Setup & Firebase Configuration

1. Instruct the user to create a new Firebase Project.
2. Instruct the user to enable Firestore, Firebase Authentication (Google Sign-in provider), and Cloud Functions.
3. Instruct the user to set up Firestore Security Rules to ensure users can only read/write documents where the document's `userId` matches their `request.auth.uid`.
4. Instruct the user to provide the Firebase Config object.
5. **PAUSE** and wait for the user to provide the Firebase Config and confirm setup.

---

### Phase 2: Backend Development (Firebase Functions)

1. Initialize a `functions` directory.
2. Write a Cloud Function `trackPixel` that serves a 1x1 transparent GIF. It must parse URL parameters (`emailId`, `recipientId`), log the event with a timestamp to a Firestore `events` sub-collection under the specific email document, and return the image.
3. Write a Cloud Function `trackClick` that parses URL parameters (`emailId`, `recipientId`, `targetUrl`). It must log the click event to the Firestore `events` sub-collection and redirect the user to the `targetUrl`.
4. Provide deployment instructions for the functions.
5. **PAUSE** and ask the user to deploy and provide the public URLs for both functions.

---

### Phase 3: Chrome Extension & Gmail API Integration

1. Create the `manifest.json` with permissions: `identity` (for OAuth), `scripting`, `activeTab`, `storage`, and host permissions for `mail.google.com` and `https://www.googleapis.com/`.
2. Implement Firebase Auth via the Chrome Identity API to log the user in and retrieve their UID.
3. Create a content script to inject a "Track this Email" toggle into the Gmail compose UI.
4. Write logic to intercept the Gmail "Send" action.
5. When tracking is enabled, prevent the default send action.
6. Extract the subject, body, and array of recipients.
7. Use the Gmail API to iterate through the recipients and send individual emails (a mail merge).
8. For each individual email, generate a unique `recipientId`, rewrite all `<a>` tags to hit the `trackClick` URL, and append the `trackPixel` `<img>` tag.
9. Log the sent email metadata (Subject, Sent Time, `userId`, individual `recipientId`s) to Firestore.
10. **PAUSE** to ensure the extension correctly sends tracked emails and logs them to the database.

---

### Phase 4: In-Gmail React Dashboard

1. Initialize the React app using Vite and configure it to build as a content script injected into Gmail (e.g., adding a button to the Gmail sidebar that opens a modal or sliding drawer).
2. Build a Dashboard component that listens to the Firebase Auth state.
3. Fetch and display a list of the user's sent emails from Firestore, querying by their `userId`.
4. Build an expanded view for each email showing a tally of total opens, total clicks, timestamps, and the specific recipient who took the action.
5. Provide instructions for loading the final unpacked extension into Chrome.
6. **END PROTOCOL.**
