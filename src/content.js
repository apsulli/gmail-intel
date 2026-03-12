import { logEmailSent } from './api/db.js';
import { sendTrackedEmail } from './api/gmail.js';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth/web-extension';
import { initSidebar } from './sidebar.js';
import { mountDashboard } from './dashboard/index.jsx';

console.log("Gmail Intel Content Script Loaded.");

async function initDashboardAuth() {
  try {
    const token = await getAuthToken();
    const user = await authenticateFirebase(token);
    return user;
  } catch (e) {
    console.warn("Gmail Intel: dashboard auth failed", e);
    return null;
  }
}

function waitForGmailReady() {
  return new Promise((resolve) => {
    if (document.querySelector('div[role="main"]')) { resolve(); return; }
    const obs = new MutationObserver(() => {
      if (document.querySelector('div[role="main"]')) { obs.disconnect(); resolve(); }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  });
}

(async () => {
  await waitForGmailReady();
  const { container, close } = initSidebar();
  const user = await initDashboardAuth();
  mountDashboard(container, user, close);
})();

const TRACKING_STATE = new WeakMap();

// Configuration
const PIXEL_URL = "https://us-central1-gm-intel.cloudfunctions.net/trackPixel";
const CLICK_URL = "https://us-central1-gm-intel.cloudfunctions.net/trackClick";

function generateId() {
  return crypto.randomUUID();
}

async function getAuthToken() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'GET_AUTH_TOKEN' }, (response) => {
      if (chrome.runtime.lastError || response?.error) {
        reject(chrome.runtime.lastError || response?.error);
      } else {
        resolve(response.token);
      }
    });
  });
}

async function authenticateFirebase(token) {
  const auth = getAuth();
  if (!auth.currentUser) {
    const credential = GoogleAuthProvider.credential(null, token);
    await signInWithCredential(auth, credential);
  }
  return auth.currentUser;
}

function getDraftId(composeWindow) {
  // 1. Input with name="draft" (legacy compose popups)
  const input = composeWindow.querySelector('input[name="draft"]');
  if (input?.value) return input.value;

  // 2. data-draft-id attribute anywhere in compose
  const el = composeWindow.querySelector('[data-draft-id]');
  if (el) return el.getAttribute('data-draft-id');

  return null;
}

async function getLatestDraftId(token) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'GET_LATEST_DRAFT_ID', token }, (response) => {
      resolve(response?.id ?? null);
    });
  });
}

// Extract the Gmail thread ID from the current URL hash.
// Gmail thread views use hashes like #inbox/THREAD_ID or #all/THREAD_ID.
// The thread ID matches the Gmail API threadId field exactly, so this is
// a reliable synchronous fallback when the draft hasn't been autosaved yet.
function getThreadIdFromUrl() {
  const parts = window.location.hash.split('/');
  const candidate = parts[parts.length - 1];
  // Gmail thread IDs are hex strings, typically 16+ chars
  if (candidate && /^[A-Za-z0-9]{8,}$/.test(candidate)) return candidate;
  return null;
}

async function handleTrackedSend(composeWindow, sendButton) {
  try {
    // 1. Get Auth Token
    console.log("Interceptor activated! Sending tracked email payload...");
    sendButton.innerText = "Sending...";
    const token = await getAuthToken();
    const user = await authenticateFirebase(token);

    const bodyDiv = composeWindow.querySelector('div[aria-label="Message Body"]');

    // Parse recipients by searching the entire composeWindow container first
    let recipients = [];
    let subject = "(No Subject)";
    
    console.log("🔍 Extracting recipients from container:", composeWindow);

    // Function to extract from ANY element using a set of known selectors
    const extractFrom = (container) => {
        const found = [];
        
        // 1. Hidden inputs (legacy/some popups)
        const inputs = container.querySelectorAll('input[name="to"], input[name="cc"], input[name="bcc"]');
        inputs.forEach(input => {
            if (input.value && input.value.includes('@')) found.push(input.value);
        });

        // 2. Chip elements (Modern Gmail) - span[email] is the most reliable
        const emailSpans = container.querySelectorAll('span[email]');
        emailSpans.forEach(span => {
            const email = span.getAttribute('email');
            if (email && email.includes('@')) found.push(email);
        });

        // 3. Hovercard chips
        const hovercards = container.querySelectorAll('[data-hovercard-id]');
        hovercards.forEach(card => {
            const email = card.getAttribute('data-hovercard-id');
            if (email && email.includes('@')) found.push(email);
        });

        return found;
    };

    recipients = extractFrom(composeWindow);
    console.log("🔍 Initial extraction from composeWindow found:", recipients);

    // If still empty, the recipients might be cousins (common in inline replies)
    // We'll ascend up to 5 levels from the composeWindow to find a larger context
    if (recipients.length === 0) {
        let broaderContext = composeWindow;
        for (let i = 0; i < 5; i++) {
            broaderContext = broaderContext.parentElement;
            if (!broaderContext || broaderContext === document.body) break;
            
            const extra = extractFrom(broaderContext);
            if (extra.length > 0) {
                console.log(`🔍 Found recipients at Parent Level ${i+1}:`, extra);
                recipients = extra;
                break;
            }
        }
    }

    // Try to find subject
    const subjectInput = composeWindow.querySelector('input[name="subjectbox"]') || 
                         document.querySelector('input[name="subjectbox"]'); // Global fallback for subject
    if (subjectInput) subject = subjectInput.value;

    // Deduplicate recipients
    recipients = [...new Set(recipients)];
    console.log("🔍 Final deduplicated recipients array:", recipients);

    if (recipients.length === 0) {
      alert("Please add at least one recipient.");
      sendButton.innerText = "Send";
      return;
    }

    const emailId = generateId();
    const rawBodyHtml = bodyDiv ? bodyDiv.innerHTML : "";

    // Extract draft ID before sending — used to atomically send+delete the draft
    const draftId = getDraftId(composeWindow) ?? await getLatestDraftId(token);
    console.log("Gmail Intel: draft ID resolved to", draftId);

    let threadId = null;
    let inReplyTo = null;
    let references = null;

    if (draftId) {
      const draftData = await new Promise(resolve => {
        chrome.runtime.sendMessage({ type: 'GET_DRAFT', token, draftId }, res => resolve(res?.data));
      });
      if (draftData && draftData.message) {
        threadId = draftData.message.threadId;
        const headers = draftData.message.payload?.headers || [];
        inReplyTo = headers.find(h => h.name.toLowerCase() === 'in-reply-to')?.value;
        references = headers.find(h => h.name.toLowerCase() === 'references')?.value;
        const draftSubject = headers.find(h => h.name.toLowerCase() === 'subject')?.value;
        if (draftSubject) {
          subject = draftSubject; // Overrides the DOM extracted subject to match exactly
        }
      }
    }

    // Fallback: if draft API didn't give us a threadId (no draft yet / inline reply
    // before autosave), extract it directly from the Gmail URL hash.
    // This covers inline replies reliably without requiring a saved draft.
    if (!threadId) {
      threadId = getThreadIdFromUrl();
      if (threadId) console.log("Gmail Intel: threadId resolved from URL:", threadId);
    }

    // When using URL-based threadId fallback (no draft), two problems exist:
    // 1. Gmail URL hash IDs use a proprietary format that differs from the Gmail REST API
    //    thread ID format — passing the URL ID to messages/send causes "Invalid thread_id value"
    // 2. We have no In-Reply-To/References headers (required by messages/send when threadId is set)
    //
    // Strategy: try GET_THREAD with the URL ID first (works for legacy hex-format URLs).
    // If that fails, search by subject to get the real API thread ID, then fetch its headers.
    if (threadId && !inReplyTo) {
      const tryGetThreadHeaders = async (apiThreadId) => {
        const threadData = await new Promise(resolve => {
          chrome.runtime.sendMessage({ type: 'GET_THREAD', token, threadId: apiThreadId }, res => resolve(res?.data));
        });
        if (threadData?.messages?.length > 0) {
          const messageIds = threadData.messages
            .map(msg => msg.payload?.headers?.find(h => h.name.toLowerCase() === 'message-id')?.value)
            .filter(Boolean);
          if (messageIds.length > 0) {
            inReplyTo = messageIds[messageIds.length - 1];
            references = messageIds.join(' ');
            console.log("Gmail Intel: inReplyTo/references resolved for thread:", apiThreadId);
            return true;
          }
        }
        return false;
      };

      const directOk = await tryGetThreadHeaders(threadId);
      if (!directOk) {
        // URL ID isn't a valid API ID — search by subject to find the real API thread ID
        console.log("Gmail Intel: URL threadId not valid for API, searching by subject:", subject);
        const searchData = await new Promise(resolve => {
          chrome.runtime.sendMessage({ type: 'SEARCH_THREADS', token, subject }, res => resolve(res?.data));
        });
        if (searchData?.threads?.length > 0) {
          const apiThreadId = searchData.threads[0].id;
          console.log("Gmail Intel: API threadId resolved via subject search:", apiThreadId);
          const searchOk = await tryGetThreadHeaders(apiThreadId);
          if (searchOk) {
            threadId = apiThreadId; // Replace URL-format ID with valid API ID
          } else {
            console.warn("Gmail Intel: GET_THREAD also failed for search result, clearing threadId");
            threadId = null; // Can't thread reliably — send as new thread rather than 400 error
          }
        } else {
          console.warn("Gmail Intel: subject search returned no threads, clearing threadId");
          threadId = null;
        }
      }
    }

    const recipientLogs = [];

    // 3. Process Mail Merge
    for (const recipient of recipients) {
      const recipientId = generateId();

      // Rewrite links
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = rawBodyHtml;
      const links = tempDiv.querySelectorAll('a');
      links.forEach(link => {
        const originalUrl = link.href;
        link.href = `${CLICK_URL}?emailId=${emailId}&recipientId=${recipientId}&targetUrl=${encodeURIComponent(originalUrl)}`;
      });

      const bodyHtml = tempDiv.innerHTML;
      const trackingPixelHtml = `<img src="${PIXEL_URL}?emailId=${emailId}&recipientId=${recipientId}" width="1" height="1" style="display:none" />`;

      await sendTrackedEmail(token, { to: recipient, subject, body: bodyHtml, trackingPixelHtml, from: user, threadId, inReplyTo, references });
      recipientLogs.push({ email: recipient, id: recipientId });
    }

    // 4. Log to Firestore
    await logEmailSent({
      emailId: emailId,
      userId: user.uid,
      subject: subject,
      recipients: recipientLogs,
      fromEmail: user.email ?? '',
      fromName: user.displayName ?? null,
    });

    // 5. Remove the compose window directly from the DOM.
    // The draft is already deleted via API — clicking Gmail's discard button
    // crashes Gmail's internal code (offsetHeight/classList of null) because
    // the window is in a post-send state. Direct removal is the clean path.
    // Safety: composeWindow is already scoped to THIS compose (the smallest
    // ancestor containing its Send button). closest('[role="dialog"]') only
    // walks UP from that node, so it finds this compose's dialog, never a
    // sibling compose. Falls back to composeWindow itself for inline replies.
    const composeContainer = composeWindow.closest('[role="dialog"]') || composeWindow;
    composeContainer.remove();

    // 6. Delete the draft by ID after a short delay so Gmail has fully
    // stopped autosaving before we remove the draft from the backend.
    // After deletion (or if no draft ID), refresh the view so the sent
    // message and draft badge are up to date.
    //
    // For inline replies (inside a thread view), we navigate the Gmail SPA
    // hash away and back to the same thread — this re-renders the thread and
    // shows the newly sent message. The global Refresh button only reloads
    // the folder list and doesn't update an open thread.
    //
    // For popup compose (inbox list view), we fall back to clicking the
    // global Refresh button as before.
    const refreshAfterSend = (resolvedThreadId) => {
      const hash = window.location.hash;
      const isInThreadView = resolvedThreadId && hash.includes('/');

      if (isInThreadView) {
        // Navigate to the folder root (e.g. #inbox), then back to the thread.
        // This triggers Gmail's SPA router to re-render the thread view with
        // the new message visible.
        const hashBase = hash.substring(0, hash.lastIndexOf('/'));
        window.location.hash = hashBase;
        setTimeout(() => {
          window.location.hash = hashBase + '/' + resolvedThreadId;
        }, 300);
      } else {
        // Folder list view: click the global Refresh button to sync draft badge.
        // Gmail toolbar buttons require a full mouse-event sequence; a bare
        // .click() is sometimes ignored by Gmail's internal event handlers.
        const refreshBtns = document.querySelectorAll(
          'div[data-tooltip^="Refresh"], div[aria-label^="Refresh"], button[aria-label^="Refresh"]'
        );
        const refreshBtn = Array.from(refreshBtns).find(btn => btn.offsetWidth > 0 && btn.offsetHeight > 0);
        if (refreshBtn) {
          ['mousedown', 'mouseup', 'click'].forEach(type =>
            refreshBtn.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window }))
          );
        } else {
          console.warn('Gmail Intel: Refresh button not found in DOM');
        }
      }
    };

    if (draftId) {
      setTimeout(() => {
        chrome.runtime.sendMessage({ type: 'DELETE_DRAFT_BY_ID', token, draftId }, (res) => {
          console.log(`Gmail Intel: draft delete status ${res?.status ?? 'error'} for ID ${draftId}`);
          refreshAfterSend(threadId);
        });
      }, 1500);
    } else {
      // No draft to delete; still refresh to sync Gmail's UI state
      setTimeout(() => refreshAfterSend(threadId), 1500);
    }

  } catch (error) {
    console.error("Tracking Error:", error);
    alert("Failed to send tracked email. See console.");
    sendButton.innerText = "Send";
  }
}

function injectToggle(composeWindow, sendButton) {
  if (TRACKING_STATE.has(composeWindow)) return;
  TRACKING_STATE.set(composeWindow, true);

  if (!sendButton) return;

  const btnContainer = sendButton.parentElement;

  // Create our toggle UI
  const toggleContainer = document.createElement('div');
  toggleContainer.style.display = 'inline-flex';
  toggleContainer.style.alignItems = 'center';
  toggleContainer.style.marginLeft = '15px';
  toggleContainer.style.cursor = 'pointer';
  toggleContainer.style.padding = '5px 10px';
  toggleContainer.style.borderRadius = '4px';
  toggleContainer.style.backgroundColor = '#e8f0fe';
  toggleContainer.style.border = '1px solid #1a73e8';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'gmail-intel-track-' + Date.now();
  checkbox.style.marginRight = '8px';
  checkbox.checked = true;

  const label = document.createElement('label');
  label.innerText = 'Track Email';
  label.htmlFor = checkbox.id;
  label.style.fontSize = '12px';
  label.style.fontWeight = 'bold';
  label.style.color = '#1a73e8';
  label.style.cursor = 'pointer';

  toggleContainer.appendChild(checkbox);
  toggleContainer.appendChild(label);

  toggleContainer.addEventListener('click', (e) => {
    if (e.target !== checkbox) {
      checkbox.checked = !checkbox.checked;
    }
    const isTracking = checkbox.checked;
    TRACKING_STATE.set(composeWindow, isTracking);
    toggleContainer.style.backgroundColor = isTracking ? '#e8f0fe' : '#f1f3f4';
    toggleContainer.style.borderColor = isTracking ? '#1a73e8' : 'transparent';
    label.style.color = isTracking ? '#1a73e8' : '#5f6368';
  });

  btnContainer.parentNode.insertBefore(toggleContainer, btnContainer.nextSibling);

  // Intercept the native send button aggressively
  // Gmail triggers native sending on various events, we must block them all.
  const interceptEvents = ['click', 'mousedown', 'mouseup', 'pointerdown', 'pointerup'];
  interceptEvents.forEach(eventType => {
    sendButton.addEventListener(eventType, (e) => {
      if (TRACKING_STATE.get(composeWindow)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        if (eventType === 'click') {
          handleTrackedSend(composeWindow, sendButton);
        }
      }
    }, true);
  });

  // Intercept Cmd+Enter / Ctrl+Enter shortcuts
  composeWindow.addEventListener('keydown', (e) => {
    if (TRACKING_STATE.get(composeWindow)) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handleTrackedSend(composeWindow, sendButton);
      }
    }
  }, true);
}

const observer = new MutationObserver(() => {
  // Find all message bodies, which exist in both popups and inline replies
  const bodyDivs = document.querySelectorAll('div[aria-label="Message Body"]');
  
  bodyDivs.forEach(bodyDiv => {
    let composeWindow = bodyDiv;
    let sendButton = null;
    
    // Ascend the DOM tree to find the common container holding both the body and the send button
    // We go up to 20 levels to ensure we capture the full compose context
    for (let i = 0; i < 20; i++) {
        if (!composeWindow) break;
        sendButton = composeWindow.querySelector('div[role="button"][data-tooltip^="Send"]');
        if (sendButton) break;
        composeWindow = composeWindow.parentElement;
    }

    if (composeWindow && sendButton) {
      injectToggle(composeWindow, sendButton);
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
