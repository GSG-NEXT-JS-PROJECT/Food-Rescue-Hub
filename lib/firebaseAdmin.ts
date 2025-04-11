import admin from 'firebase-admin';

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       // Your Firebase service account JSON
//     }),
//   });
// }
// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const serviceAccount = require("@/service_key.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const sendPushNotification = async (token: string, message: string) => {
  try {
    await admin.messaging().send({
      notification: {
        title: 'Food Rescue Hub',
        body: message,
      },
      token,
    });
    console.log('Push notification sent');
  } catch (error) {
    console.error('Error sending push:', error);
  }
};