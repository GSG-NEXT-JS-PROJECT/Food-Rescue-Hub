import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNk7hIK6mpe2QbWcPT8ob5m6W4cDbZF1g",
  authDomain: "food-rescue-hub.firebaseapp.com",
  projectId: "food-rescue-hub",
  storageBucket: "food-rescue-hub.firebasestorage.app",
  messagingSenderId: "355848523350",
  appId: "1:355848523350:web:0215d6e3410c63a17775f7",
  measurementId: "G-B0YZ61WX8D",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();

    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      const url = `/api/register-device`;
      await fetch(url, {
        method: "POST",
        body: JSON.stringify({ token }), // Send token and userId to backend
        headers: { "Content-Type": "application/json" },
      });
      console.log(token)
      return token;
    }
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
