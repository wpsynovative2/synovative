import { NextResponse, type NextRequest } from "next/server";
import { COLLECTIONS, createDocument } from "@/lib/firebase/collections";
import { serviceSlugs } from "@/content/services";
import { isEmail, isPhone, truncate } from "@/lib/utils";
import type { ApiResult, Lead } from "@/types";

/**
 * Receives enquiries from the site's lead forms.
 *
 * Validation is repeated here rather than trusted from the client, and the
 * payload is truncated before storage so an oversized body cannot bloat a
 * Firestore document.
 */

/** Crude per-IP rate limit. Fine for a marketing site's enquiry volume. */
const RATE_LIMIT = { windowMs: 60_000, max: 5 };
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return false;
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT.max) return true;

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5_000) {
    for (const [key, value] of hits) {
      if (now > value.resetAt) hits.delete(key);
    }
  }
  return false;
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResult<{ id: string | null }>>> {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: only a bot fills the hidden field, so accept and discard.
  if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
    return NextResponse.json({ ok: true, data: { id: null } });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();
  const company = String(body.company ?? "").trim();
  const service = String(body.service ?? "general");
  const source = String(body.source ?? "/");

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) fieldErrors.name = "Please tell us your name.";
  if (!isEmail(email)) fieldErrors.email = "That email address doesn't look right.";
  if (!isPhone(phone)) fieldErrors.phone = "Enter a 10-digit mobile number.";
  if (message.length < 10) fieldErrors.message = "A sentence or two, please.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  const lead: Omit<Lead, "id"> = {
    name: truncate(name, 120),
    email: truncate(email, 160),
    phone: truncate(phone, 24),
    company: company ? truncate(company, 120) : undefined,
    service: (serviceSlugs as string[]).includes(service)
      ? (service as Lead["service"])
      : "general",
    message: truncate(message, 4000),
    source: truncate(source, 200),
    status: "new",
    createdAt: new Date().toISOString(),
  };

  try {
    const id = await createDocument(COLLECTIONS.leads, lead);

    if (!id) {
      // Firebase is not configured. Accept the enquiry rather than showing an
      // error the visitor can do nothing about, and log it so it is recoverable.
      console.warn("[leads] Firebase not configured — enquiry not persisted:", lead);
    }

    return NextResponse.json({ ok: true, data: { id } });
  } catch (error) {
    console.error("[leads] failed to store enquiry:", error, lead);
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't save that. Please call or email us directly and we'll pick it up.",
      },
      { status: 500 },
    );
  }
}
