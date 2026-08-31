import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { notifySearchEngines } from "@/lib/seo/indexnow";
import type { ApiResult } from "@/types";

/**
 * Publish hook: revalidates the affected pages and notifies search engines.
 *
 * Call this whenever content changes — from the admin panel after saving a
 * post, or from a Firestore trigger. Requests must carry the shared secret in
 * `x-revalidate-secret`; without `REVALIDATE_SECRET` set the endpoint refuses
 * every request rather than defaulting to open.
 *
 *   POST /api/indexing
 *   { "paths": ["/blogs/my-post", "/blogs"] }
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResult<{ revalidated: string[]; notified: unknown[] }>>> {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    console.error("[indexing] REVALIDATE_SECRET is not set — refusing the request.");
    return NextResponse.json(
      { ok: false, error: "Indexing endpoint is not configured." },
      { status: 503 },
    );
  }

  if (request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let body: { paths?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const paths = Array.isArray(body.paths)
    ? body.paths.filter((path): path is string => typeof path === "string" && path.startsWith("/"))
    : [];

  if (paths.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Provide a non-empty `paths` array of site-relative paths." },
      { status: 422 },
    );
  }

  // Always refresh the sitemap too, so newly published URLs appear immediately.
  const toRevalidate = [...new Set([...paths, "/sitemap.xml"])];
  for (const path of toRevalidate) {
    revalidatePath(path);
  }

  const notified = await notifySearchEngines(paths);

  return NextResponse.json({
    ok: true,
    data: { revalidated: toRevalidate, notified },
  });
}
