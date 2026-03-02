const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

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
      const userId = lookupSnap.data().userId;
      await db
        .collection("users").doc(userId)
        .collection("emails").doc(emailId)
        .collection("events")
        .add({
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
        await db
          .collection("users").doc(userId)
          .collection("emails").doc(emailId)
          .collection("events")
          .add({
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
