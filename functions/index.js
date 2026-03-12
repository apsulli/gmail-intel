const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");

admin.initializeApp();
const db = admin.firestore();

// Returns a deterministic event doc ID so duplicate requests within the
// same time bucket overwrite rather than duplicate.
function dedupeId(type, recipientId, bucketMs, extra = "") {
  const bucket = Math.floor(Date.now() / bucketMs);
  const raw = `${type}_${recipientId}_${bucket}_${extra}`;
  return crypto.createHash("md5").update(raw).digest("hex");
}

// 1x1 transparent GIF buffer
const TRANSPARENT_GIF_BUFFER = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64",
);

function respondWithGif(res) {
  res.set("Content-Type", "image/gif");
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.status(200).send(TRANSPARENT_GIF_BUFFER);
}

exports.trackPixel = functions.https.onRequest(async (req, res) => {
  const emailId = req.query.emailId;
  const recipientId = req.query.recipientId;

  if (emailId && recipientId) {
    try {
      const lookupSnap = await db.collection("emailLookup").doc(emailId).get();
      if (!lookupSnap.exists) {
        return respondWithGif(res);
      }
      const { userId, sentAt } = lookupSnap.data();
      // Suppress opens within 30 seconds of send. Google Image Proxy
      // pre-fetches the pixel almost immediately when the email lands in the
      // sender's Sent folder, causing a false "open" event. Any request
      // within 30 s of sentAt is treated as a pre-fetch, not a real open.
      if (sentAt && (Date.now() - sentAt) < 30_000) {
        return respondWithGif(res);
      }
      // 60-second dedup bucket: catches duplicate proxy fetches that arrive
      // after the 30-second grace period (e.g. slow image proxy retries).
      const eventId = dedupeId("open", recipientId, 60_000);
      await db
        .collection("users").doc(userId)
        .collection("emails").doc(emailId)
        .collection("events").doc(eventId)
        .set({
          type: "open",
          recipientId: recipientId,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          userAgent: req.headers["user-agent"] || "unknown",
          ip:
            req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress ||
            "unknown",
        });
    } catch (error) {
      console.error("Error logging pixel track:", error);
    }
  }

  respondWithGif(res);
});

exports.trackClick = functions.https.onRequest(async (req, res) => {
  const emailId = req.query.emailId;
  const recipientId = req.query.recipientId;
  const targetUrl = req.query.targetUrl;

  if (emailId && recipientId && targetUrl) {
    try {
      const lookupSnap = await db.collection("emailLookup").doc(emailId).get();
      if (lookupSnap.exists) {
        const userId = lookupSnap.data().userId;
        // 5-second dedup bucket per URL: catches double-clicks and scanner
        // pre-fetches; a genuine re-click after 5 s gets its own event.
        const urlHash = crypto.createHash("md5").update(targetUrl).digest("hex").slice(0, 8);
        const eventId = dedupeId("click", recipientId, 5_000, urlHash);
        await db
          .collection("users").doc(userId)
          .collection("emails").doc(emailId)
          .collection("events").doc(eventId)
          .set({
            type: "click",
            recipientId: recipientId,
            targetUrl: targetUrl,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            userAgent: req.headers["user-agent"] || "unknown",
            ip:
              req.headers["x-forwarded-for"] ||
              req.socket.remoteAddress ||
              "unknown",
          });
      }
    } catch (error) {
      console.error("Error logging click track:", error);
    }
    res.redirect(targetUrl);
  } else if (targetUrl) {
    res.redirect(targetUrl);
  } else {
    res.status(400).send("Missing targetUrl");
  }
});
