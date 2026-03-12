---
slug: "inline-reply-thread-break"
status: researching
trigger: "Fix \"Refresh\" when replying from inline email. Currently, when sending a fresh email from the popup, it appears that triggering the native refresh functionality works, but this does not work when replying from an in-line email... Actually this issue is bigger. It does not appear that inline email replies are maintained as part of the thread. Why would this be?"
created: "2026-03-12T13:23:45Z"
updated: "2026-03-12T13:23:45Z"
---

# Research: inline-reply-thread-break

## Symptom Analysis
- **Description:** When an inline reply is sent using the extension (which intercepts the send and pushes via the Gmail API), the resulting sent email is detached from the existing email thread. It appears as a separate conversation.
- **When:** Reproducible on every tracked inline email reply.
- **Expected:** The reply should append to the existing conversation thread.
- **Actual:** The reply starts a new thread.
- **Started:** Since the inception of the extension, as the raw email constructor was relatively basic and did not include threading features.

## Error Evidence
- The Gmail API (`/users/me/messages/send`) requires the `threadId` to be provided in the request body to stitch a newly sent message back into an existing thread.
- A quick review of `src/api/gmail.js` and `src/content.js` reveals that the `threadId` is neither extracted from the DOM nor included in the `sendTrackedEmail` payload.
- In `src/background.js`, we likely just send `{ "raw": b64Safe }` to the `/messages/send` endpoint.

## Root Cause Hypotheses
| # | Hypothesis | Likelihood | Status |
|---|------------|------------|--------|
| 1 | The `threadId` is missing from the Gmail API `POST /messages/send` request payload. | 95% | UNTESTED |
| 2 | The MIME message is missing `In-Reply-To` and `References` headers. | 60% | UNTESTED |

## Investigation Notes
- **2026-03-12**: Looked at `src/api/gmail.js`. `sendTrackedEmail` builds a raw MIME string. It accepts `{ to, subject, body, trackingPixelHtml, from }` but no `threadId` or threading-related headers.
- **Next steps**: Need to check how `background.js` handles the `SEND_EMAIL` message. And then need to figure out how to extract the `threadId` from the Gmail DOM or URL for inline replies.

## Next Steps
- **Current Focus:** Check `background.js` to see the payload structure sent to Google, then determine how to extract `threadId` in `content.js` and pipe it through.
- **Test Plan:** Modify `content.js` to find `threadId`, pass it to `sendTrackedEmail`, which passes it to `background.js` in the `SEND_EMAIL` request.
- **Blockers:** Finding the reliable `threadId` extraction pattern in Gmail's DOM.
