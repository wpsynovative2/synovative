"use client";

/**
 * Firebase browser SDK, used only by the admin panel for authentication.
 *
 * Everything is created lazily so that importing this module from a component
 * that never signs in does not pull the SDK into that route's bundle, and so a
 * missing `.env.local` produces a clear message rather than a crash at import.
 */

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** True when the browser SDK has enough configuration to sign a user in. */
export const isFirebaseClientConfigured = Boolean(config.apiKey && config.projectId);

export function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseClientConfigured) {
    throw new Error(
      "Firebase is not configured. Copy .env.example to .env.local and fill in the NEXT_PUBLIC_FIREBASE_* values.",
    );
  }
  return getApps().length ? getApp() : initializeApp(config);
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}
