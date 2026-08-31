import "server-only";

import { absoluteUrl, SITE_URL } from "./metadata";

/**
 * Automatic search-engine notification when content is published.
 *
 * Two independent mechanisms, either of which can be enabled on its own:
 *
 *  - IndexNow (Bing, Yandex, Seznam, Naver) — a single unauthenticated POST,
 *    verified by a key file served at `/{key}.txt`. Cheap and worth having on.
 *  - Google Indexing API — requires the Firebase/GCP service account to have
 *    the Indexing API enabled and the site verified in Search Console. Google
 *    officially supports it for JobPosting and BroadcastEvent pages; other URL
 *    types are submitted on a best-effort basis.
 *
 * Both are fire-and-forget: a failure to notify must never fail a publish.
 */

const INDEXNOW_KEY = process.env.INDEXNOW_KEY;

export interface PingResult {
  target: string;
  ok: boolean;
  detail: string;
}

export async function pingIndexNow(paths: string[]): Promise<PingResult> {
  if (!INDEXNOW_KEY) {
    return { target: "indexnow", ok: false, detail: "INDEXNOW_KEY is not set" };
  }

  const host = new URL(SITE_URL).host;

  try {
    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: absoluteUrl(`/${INDEXNOW_KEY}.txt`),
        urlList: paths.map((path) => absoluteUrl(path)),
      }),
    });

    // IndexNow answers 200 or 202 on success; both mean "accepted".
    return {
      target: "indexnow",
      ok: response.ok,
      detail: `HTTP ${response.status}`,
    };
  } catch (error) {
    return {
      target: "indexnow",
      ok: false,
      detail: error instanceof Error ? error.message : "request failed",
    };
  }
}

/**
 * Exchange the service-account key for an access token scoped to the Indexing
 * API. Implemented with a hand-rolled JWT so the whole `google-auth-library`
 * dependency is not pulled in for one call.
 */
async function getIndexingAccessToken(): Promise<string | null> {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;

  let credentials: { client_email: string; private_key: string };
  try {
    credentials = JSON.parse(raw);
  } catch {
    return null;
  }

  const { createSign } = await import("node:crypto");
  const now = Math.floor(Date.now() / 1000);

  const encode = (value: object) =>
    Buffer.from(JSON.stringify(value))
      .toString("base64url");

  const header = encode({ alg: "RS256", typ: "JWT" });
  const claims = encode({
    iss: credentials.client_email,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  });

  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const signature = signer.sign(
    credentials.private_key.replace(/\\n/g, "\n"),
    "base64url",
  );

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${signature}`,
    }),
  });

  if (!response.ok) return null;
  const token = (await response.json()) as { access_token?: string };
  return token.access_token ?? null;
}

export async function pingGoogleIndexing(
  paths: string[],
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED",
): Promise<PingResult> {
  if (process.env.GOOGLE_INDEXING_ENABLED !== "true") {
    return {
      target: "google",
      ok: false,
      detail: "GOOGLE_INDEXING_ENABLED is not 'true'",
    };
  }

  try {
    const accessToken = await getIndexingAccessToken();
    if (!accessToken) {
      return { target: "google", ok: false, detail: "could not obtain access token" };
    }

    const results = await Promise.all(
      paths.map((path) =>
        fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: absoluteUrl(path), type }),
        }),
      ),
    );

    const failed = results.filter((response) => !response.ok).length;
    return {
      target: "google",
      ok: failed === 0,
      detail: failed === 0 ? `${results.length} URLs submitted` : `${failed} of ${results.length} failed`,
    };
  } catch (error) {
    return {
      target: "google",
      ok: false,
      detail: error instanceof Error ? error.message : "request failed",
    };
  }
}

/** Notify every configured engine about the given site-relative paths. */
export async function notifySearchEngines(paths: string[]): Promise<PingResult[]> {
  if (paths.length === 0) return [];
  return Promise.all([pingIndexNow(paths), pingGoogleIndexing(paths)]);
}
