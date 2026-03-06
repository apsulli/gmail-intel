// src/api/seen.js
// Tracks which emails the user has expanded ("seen") in the dashboard.
// Persisted in chrome.storage.local so state survives page reloads.

export async function markSeen(emailId) {
  const data = await chrome.storage.local.get('seenEmails');
  const seen = data.seenEmails ?? {};
  seen[emailId] = true;
  await chrome.storage.local.set({ seenEmails: seen });
}

export async function getSeenMap() {
  const data = await chrome.storage.local.get('seenEmails');
  return data.seenEmails ?? {};
}
