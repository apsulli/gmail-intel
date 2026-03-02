import { logEmailSent } from './api/db.js';
import { sendTrackedEmail } from './api/gmail.js';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

console.log("Gmail Intel Content Script Loaded.");

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

async function handleTrackedSend(composeWindow, sendButton) {
  try {
    // 1. Get Auth Token
    console.log("Interceptor activated! Sending tracked email payload...");
    sendButton.innerText = "Sending...";
    const token = await getAuthToken();
    const user = await authenticateFirebase(token);

    const bodyDiv = composeWindow.querySelector('div[aria-label="Message Body"]');

    // Parse recipients by ascending from the bodyDiv to find the true compose container
    // This is required because inline replies have the inputs much higher in the hierarchy
    let currentContainer = bodyDiv || composeWindow;
    let recipients = [];
    let subject = "(No Subject)";
    
    console.log("🔍 Starting recipient search. Initial container:", currentContainer);
    let depth = 0;

    while (currentContainer && currentContainer !== document.body) {
      depth++;
      const toInputs = Array.from(currentContainer.querySelectorAll('input[name="to"], input[name="cc"], input[name="bcc"]'));
      console.log(`🔍 [Depth ${depth}] Checked for inputs. Found ${toInputs.length} to/cc/bcc inputs.`);
      
      const subjectInputFound = currentContainer.querySelector('input[name="subjectbox"]');
      if (subjectInputFound) {
        subject = subjectInputFound.value;
      }

      if (toInputs.length > 0) {
        recipients = toInputs.map(input => input.value).filter(val => val && val.includes('@'));
        console.log(`🔍 [Depth ${depth}] Extracted from inputs:`, recipients);
        
        // As a fallback, try to grab visible chips inside this exact container if hidden inputs are missing values
        if (recipients.length === 0) {
            const chips = Array.from(currentContainer.querySelectorAll('[data-hovercard-id]'));
            recipients = chips.map(chip => chip.getAttribute('data-hovercard-id')).filter(val => val && val.includes('@'));
            console.log(`🔍 [Depth ${depth}] Extracted from chips (fallback 1):`, recipients);
        }
        break; // We found the compose boundary!
      }
      
      currentContainer = currentContainer.parentElement;
    }

    if (recipients.length === 0) {
       console.log("🔍 Fallback 2: Loop found nothing. Scanning the highest level composeWindow for chips.");
       const chips = Array.from(composeWindow.querySelectorAll('[email], [data-hovercard-id]'));
       console.log(`🔍 Found ${chips.length} elements with 'email' or 'data-hovercard-id' attributes.`);
       
       recipients = chips.map(chip => {
          return chip.getAttribute('email') || chip.getAttribute('data-hovercard-id');
       }).filter(val => val && val.includes('@'));
       console.log("🔍 Extracted from fallback 2:", recipients);
    }

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

      // Send via Gmail API
      await sendTrackedEmail(token, {
        to: recipient,
        subject: subject,
        body: bodyHtml,
        trackingPixelHtml: trackingPixelHtml
      });

      recipientLogs.push({ email: recipient, id: recipientId });
    }

    // 4. Log to Firestore
    await logEmailSent({
      emailId: emailId,
      userId: user.uid,
      subject: subject,
      recipients: recipientLogs
    });

    // 5. Cleanup
    // Close the compose window by clicking the discard button
    const discardBtn = composeWindow.querySelector('div[data-tooltip="Discard draft"]');
    if (discardBtn) discardBtn.click();
    else composeWindow.remove();

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
    for (let i = 0; i < 15; i++) {
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
