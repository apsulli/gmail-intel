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

  // Handle the Gmail API Send request internally to bypass content script CORS
  if (message.type === 'SEND_EMAIL') {
    const { token, payload } = message;
    
    fetch("https://gmail.googleapis.com/upload/gmail/v1/users/me/messages/send?uploadType=media", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "message/rfc822",
      },
      body: payload,
    })
    .then(async (response) => {
      if (!response.ok) {
        const err = await response.text();
        console.error("Failed to send email via Gmail API", err);
        sendResponse({ error: err });
      } else {
        const data = await response.json();
        sendResponse({ data: data });
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      sendResponse({ error: error.message });
    });

    return true; // Asynchronous response
  }
});
