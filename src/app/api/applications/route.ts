import { NextResponse, type NextRequest } from "next/server";
import { COLLECTIONS, createDocument } from "@/lib/firebase/collections";
import { isEmail, isPhone, truncate } from "@/lib/utils";
import type { ApiResult, JobApplication } from "@/types";

/** Receives candidate applications from the career page. */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResult<{ id: string | null }>>> {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Honeypot — accept and discard rather than telling a bot it was caught.
  if (typeof body.portfolio_hidden === "string" && body.portfolio_hidden.trim() !== "") {
    return NextResponse.json({ ok: true, data: { id: null } });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const jobId = String(body.jobId ?? "").trim();
  const message = String(body.message ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) fieldErrors.name = "Please tell us your name.";
  if (!isEmail(email)) fieldErrors.email = "That email address doesn't look right.";
  if (!isPhone(phone)) fieldErrors.phone = "Enter a 10-digit mobile number.";
  if (!jobId) fieldErrors.jobId = "Pick the role you're applying for.";
  if (message.length < 20) fieldErrors.message = "Tell us a little more.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  const application: Omit<JobApplication, "id"> = {
    jobId: truncate(jobId, 120),
    jobTitle: truncate(String(body.jobTitle ?? "Open application"), 160),
    name: truncate(name, 120),
    email: truncate(email, 160),
    phone: truncate(phone, 24),
    experience: truncate(String(body.experience ?? "").trim(), 80),
    portfolioUrl: body.portfolioUrl ? truncate(String(body.portfolioUrl), 500) : undefined,
    resumeUrl: body.resumeUrl ? truncate(String(body.resumeUrl), 500) : undefined,
    message: truncate(message, 4000),
    status: "new",
    createdAt: new Date().toISOString(),
  };

  try {
    const id = await createDocument(COLLECTIONS.applications, application);

    if (!id) {
      console.warn("[applications] Firebase not configured — not persisted:", application);
    }

    return NextResponse.json({ ok: true, data: { id } });
  } catch (error) {
    console.error("[applications] failed to store application:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't save that. Please email your CV to careers@synovative.com.",
      },
      { status: 500 },
    );
  }
}
