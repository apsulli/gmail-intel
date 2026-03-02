// src/api/gmail.js
export async function sendTrackedEmail(token, { to, subject, body, trackingPixelHtml, draftId }) {
  const boundary = "gmail_intel_boundary";
  
  // Format the raw email data with correct boundaries
  const emailLines = [
    `To: ${to}`,
    `Subject: ${subject}`,
    "Content-Type: multipart/alternative; boundary=" + boundary,
    "",
    "--" + boundary,
    "Content-Type: text/plain; charset=UTF-8",
    "",
    "Please view this email in a client that supports HTML.",
    "",
    "--" + boundary,
    "Content-Type: text/html; charset=UTF-8",
    "",
    body + trackingPixelHtml,
    "",
    "--" + boundary + "--",
  ].join("\r\n");

  const b64Safe = btoa(unescape(encodeURIComponent(emailLines)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  // Content scripts are subject to CORS restrictions in modern Chrome.
  // We must proxy this request to the background service worker!
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'SEND_EMAIL', token, payload: b64Safe }, (response) => {
      if (chrome.runtime.lastError) {
        return reject(new Error(chrome.runtime.lastError.message));
      }
      if (response.error) {
        return reject(new Error(response.error));
      }
      resolve(response.data);
    });
  });
}
