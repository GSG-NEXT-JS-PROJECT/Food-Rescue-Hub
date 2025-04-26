import admin from "firebase-admin";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export const sendPushNotification = async (token: string, message: string) => {
  try {
    await admin.messaging().send({
      notification: {
        title: "Food Rescue Hub",
        body: message,
      },
      token,
    });
    console.log("Push notification sent");
  } catch (error) {
    console.error("Error sending push:", error);
  }
};
