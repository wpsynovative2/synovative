import "server-only";

/**
 * Firebase Admin SDK — server side only.
 *
 * Used by the API routes to write leads and applications, and by the admin
 * panel's server components to read them. The whole module degrades to `null`
 * when credentials are absent, which is what lets the site build and run from a
 * fresh clone with no Firebase project attached: the read paths fall back to the
 * seed content in `src/content` and the write paths return a clear error.
 */

import {
  cert,
  getApps,
  initializeApp,
  type App,
  type ServiceAccount,
} from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

const APP_NAME = "synovative-admin";

function readServiceAccount(): ServiceAccount | null {
  // Preferred: the whole service-account JSON in one variable.
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as {
        project_id: string;
        client_email: string;
        private_key: string;
      };
      return {
        projectId: parsed.project_id,
        clientEmail: parsed.client_email,
        privateKey: parsed.private_key.replace(/\\n/g, "\n"),
      };
    } catch {
      console.error(
        "[firebase] FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON — admin features are disabled.",
      );
      return null;
    }
  }

  // Fallback: the three fields as separate variables, which some hosts prefer.
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (projectId && clientEmail && privateKey) {
    return { projectId, clientEmail, privateKey: privateKey.replace(/\\n/g, "\n") };
  }

  return null;
}

let cachedApp: App | null | undefined;

function getAdminApp(): App | null {
  if (cachedApp !== undefined) return cachedApp;

  const serviceAccount = readServiceAccount();
  if (!serviceAccount) {
    cachedApp = null;
    return null;
  }

  const existing = getApps().find((app) => app.name === APP_NAME);
  cachedApp = existing ?? initializeApp({ credential: cert(serviceAccount) }, APP_NAME);
  return cachedApp;
}

/** True when server-side Firestore/Auth are usable. */
export function isFirebaseAdminConfigured(): boolean {
  return getAdminApp() !== null;
}

export function getAdminDb(): Firestore | null {
  const app = getAdminApp();
  return app ? getFirestore(app) : null;
}

export function getAdminAuth(): Auth | null {
  const app = getAdminApp();
  return app ? getAuth(app) : null;
}
