// Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
  console.log("Gmail Intel Extension Installed.");
});

// Handle OAuth token retrieval for the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_AUTH_TOKEN') {
    chrome.identity.getAuthToken({ interactive: true }, function(token) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        sendResponse({ error: chrome.runtime.lastError.message });
        return;
      }
      sendResponse({ token: token });
    });
    return true; // We will respond asynchronously
  }

  // Get the most recent draft ID (fallback when DOM extraction fails)
  if (message.type === 'GET_LATEST_DRAFT_ID') {
    const { token } = message;
    fetch('https://gmail.googleapis.com/gmail/v1/users/me/drafts?maxResults=1', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(r => r.json())
    .then(data => {
      const id = data.drafts?.[0]?.id ?? null;
      sendResponse({ id });
    })
    .catch(e => sendResponse({ error: e.message }));
    return true;
  }

  // Get thread messages with Message-ID headers (for inline reply threading when no draft)
  if (message.type === 'GET_THREAD') {
    const { token, threadId } = message;
    fetch(`https://gmail.googleapis.com/gmail/v1/users/me/threads/${threadId}?format=METADATA&metadataHeaders=Message-ID`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(r => r.json())
    .then(data => sendResponse({ data }))
    .catch(e => sendResponse({ error: e.message }));
    return true;
  }

  // Search for threads by subject — used to resolve a valid API thread ID when the
  // URL hash ID doesn't match the Gmail REST API format.
  if (message.type === 'SEARCH_THREADS') {
    const { token, subject } = message;
    const q = encodeURIComponent(`subject:"${subject}"`);
    fetch(`https://gmail.googleapis.com/gmail/v1/users/me/threads?q=${q}&maxResults=5`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(r => r.json())
    .then(data => sendResponse({ data }))
    .catch(e => sendResponse({ error: e.message }));
    return true;
  }

  // Get full draft details (for thread IDs & headers)
  if (message.type === 'GET_DRAFT') {
    const { token, draftId } = message;
    fetch(`https://gmail.googleapis.com/gmail/v1/users/me/drafts/${draftId}?format=METADATA`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(r => r.json())
    .then(data => sendResponse({ data }))
    .catch(e => sendResponse({ error: e.message }));
    return true;
  }


  // Delete a draft by ID (used after sending tracked email)
  if (message.type === 'DELETE_DRAFT_BY_ID') {
    const { token, draftId } = message;
    fetch(`https://gmail.googleapis.com/gmail/v1/users/me/drafts/${draftId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      sendResponse({ ok: response.ok, status: response.status });
    })
    .catch(e => sendResponse({ error: e.message }));
    return true;
  }

  if (message.type === 'SET_BADGE') {
    const count = message.count ?? 0;
    const text = count > 0 ? String(count) : '';
    chrome.action.setBadgeText({ text });
    if (count > 0) {
      chrome.action.setBadgeBackgroundColor({ color: '#FF1493' });
    }
    sendResponse({ ok: true });
    return true;
  }

  // Handle the Gmail API Send request internally to bypass content script CORS
  if (message.type === 'SEND_EMAIL') {
    const { token, payload, threadId } = message;
    
    console.log("🔍 Background: Sending email via Gmail API...");

    const reqBody = { raw: payload };
    if (threadId) {
      reqBody.threadId = threadId;
    }

    fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
    .then(async (response) => {
      if (!response.ok) {
        const errText = await response.text();
        console.error("🔍 Gmail API Error:", errText);
        sendResponse({ error: `Gmail Error [${response.status}]: ${errText}` });
      } else {
        const data = await response.json();
        console.log("🔍 Gmail API Success:", data);
        sendResponse({ data: data });
      }
    })
    .catch((error) => {
      console.error("🔍 Fetch Network Error:", error);
      sendResponse({ error: "Network Error: " + error.message });
    });

    return true; // Asynchronous response
  }
});
