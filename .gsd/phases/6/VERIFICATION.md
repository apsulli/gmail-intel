## Phase 6 Verification

### Must-Haves

- [x] `npm run build` passes — VERIFIED (✓ built in ~910ms, zero errors)
- [x] `logEmailSent` writes to `users/{userId}/emails/{emailId}` — VERIFIED (db.js line 56)
- [x] `logEmailSent` also writes `emailLookup/{emailId}` — VERIFIED (db.js line 60)
- [x] `subscribeToEmails` queries subcollection path with no where clause — VERIFIED (db.js line 14)
- [x] `subscribeToEvents` signature is `(userId, emailId, callback, onError)` — VERIFIED (db.js line 33)
- [x] `getEmailWithEvents` signature is `(userId, emailId)` — VERIFIED (db.js line 49)
- [x] Cloud Functions read `emailLookup` to resolve userId — VERIFIED (functions/index.js trackPixel + trackClick)
- [x] Tracking URLs in content.js do NOT contain `userId` — VERIFIED (grep shows only logEmailSent call)
- [x] `EmailRow` in DashboardApp.jsx receives and uses `userId` prop — VERIFIED
- [x] `subscribeToEvents` called with `(userId, email.id, ...)` — VERIFIED (DashboardApp.jsx)
- [x] `firestore.rules` matches `users/{userId}/emails/{emailId}` with path-param auth — VERIFIED
- [x] `emailLookup` rule present (allow create for authed users) — VERIFIED
- [x] `firestore.indexes.json` has empty indexes array — VERIFIED (grep -c fieldPath = 0)
- [x] Cloud Functions deployed successfully — VERIFIED (trackPixel + trackClick updated)
- [x] Firestore rules deployed — VERIFIED (firebase deploy --only firestore succeeded)
- [x] Old composite index deleted — VERIFIED (firebase deploy --force deleted 1 index)

### Pending (Human Verification Required)

- [ ] Send a tracked email and verify `users/{uid}/emails/{emailId}` doc created in Firebase Console
- [ ] Verify `emailLookup/{emailId}` doc created with correct userId
- [ ] Verify pixel fires and event logged to `users/{uid}/emails/{emailId}/events/`
- [ ] Verify dashboard shows email + open/click counts after send
- [ ] Delete old top-level `emails/` collection in Firebase Console

### Verdict: PASS (automated) — awaiting human end-to-end verify
