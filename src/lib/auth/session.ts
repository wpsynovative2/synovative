import "server-only";

import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebase/admin";

/**
 * Admin session handling.
 *
 * The browser signs in with the Firebase client SDK, posts the resulting ID
 * token to `/api/admin/session`, and gets back an httpOnly session cookie. The
 * ID token itself is never stored anywhere JavaScript can read it, and every
 * server render verifies the cookie against Firebase — including its revocation
 * state, so disabling an account logs it out immediately rather than at expiry.
 */

export const SESSION_COOKIE = "synovative_session";
/** Firebase caps session cookies at 14 days. */
export const SESSION_MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;

export interface AdminUser {
  uid: string;
  email: string | null;
  name: string | null;
}

/** The signed-in admin, or `null` when the request has no valid session. */
export async function getAdminUser(): Promise<AdminUser | null> {
  const auth = getAdminAuth();
  if (!auth) return null;

  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  if (!session) return null;

  try {
    const claims = await auth.verifySessionCookie(session, true);
    return {
      uid: claims.uid,
      email: claims.email ?? null,
      name: (claims.name as string | undefined) ?? null,
    };
  } catch {
    // Expired, malformed or revoked — treat all three as signed out.
    return null;
  }
}
