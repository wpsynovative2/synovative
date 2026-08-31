import { NextResponse, type NextRequest } from "next/server";
import { getAdminAuth } from "@/lib/firebase/admin";
import { SESSION_COOKIE, SESSION_MAX_AGE_MS } from "@/lib/auth/session";
import type { ApiResult } from "@/types";

/**
 * Exchanges a Firebase ID token for an httpOnly session cookie (POST), and
 * clears it on sign-out (DELETE).
 *
 * Access is restricted to the addresses listed in `ADMIN_EMAILS`. Anyone else
 * with a valid Firebase account in the project is rejected here, so admin
 * access is not implicitly granted by the ability to sign in.
 */

function allowedEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResult>> {
  const auth = getAdminAuth();
  if (!auth) {
    return NextResponse.json(
      { ok: false, error: "Firebase Admin is not configured on the server." },
      { status: 503 },
    );
  }

  let idToken: string;
  try {
    ({ idToken } = await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  if (!idToken) {
    return NextResponse.json({ ok: false, error: "Missing ID token." }, { status: 400 });
  }

  try {
    const decoded = await auth.verifyIdToken(idToken, true);

    const allowed = allowedEmails();
    const email = decoded.email?.toLowerCase();

    // An empty allowlist locks everyone out rather than letting everyone in.
    if (allowed.length === 0) {
      console.error("[admin] ADMIN_EMAILS is not set — refusing every sign-in.");
      return NextResponse.json(
        { ok: false, error: "Admin access is not configured." },
        { status: 503 },
      );
    }

    if (!email || !allowed.includes(email)) {
      return NextResponse.json(
        { ok: false, error: "This account doesn't have admin access." },
        { status: 403 },
      );
    }

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_MAX_AGE_MS,
    });

    const response = NextResponse.json<ApiResult>({ ok: true, data: undefined });
    response.cookies.set(SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_MS / 1000,
    });
    return response;
  } catch (error) {
    console.error("[admin] sign-in failed:", error);
    return NextResponse.json(
      { ok: false, error: "Could not verify that sign-in. Please try again." },
      { status: 401 },
    );
  }
}

export async function DELETE(): Promise<NextResponse<ApiResult>> {
  const response = NextResponse.json<ApiResult>({ ok: true, data: undefined });
  response.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
