"use server";

import { revalidatePath } from "next/cache";
import { getAdminUser } from "@/lib/auth/session";
import { COLLECTIONS, updateDocument } from "@/lib/firebase/collections";
import type { ApiResult, JobApplication, Lead } from "@/types";

/**
 * Mutations for the admin panel.
 *
 * Server Actions are independently addressable endpoints — the layout's redirect
 * does not protect them — so every action re-verifies the session itself before
 * touching data. Status values are checked against a fixed list rather than
 * trusted from the client.
 */

const LEAD_STATUSES: Lead["status"][] = ["new", "contacted", "qualified", "won", "lost"];
const APPLICATION_STATUSES: JobApplication["status"][] = [
  "new",
  "shortlisted",
  "interviewing",
  "hired",
  "rejected",
];

async function requireAdmin(): Promise<ApiResult | null> {
  const user = await getAdminUser();
  return user ? null : { ok: false, error: "Your session has expired. Sign in again." };
}

export async function updateLeadStatus(id: string, status: string): Promise<ApiResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!LEAD_STATUSES.includes(status as Lead["status"])) {
    return { ok: false, error: "Unknown status." };
  }

  try {
    const updated = await updateDocument(COLLECTIONS.leads, id, {
      status,
      updatedAt: new Date().toISOString(),
    });
    if (!updated) return { ok: false, error: "Firebase isn't connected." };

    revalidatePath("/admin/leads");
    revalidatePath("/admin");
    return { ok: true, data: undefined };
  } catch (error) {
    console.error("[admin] updateLeadStatus failed:", error);
    return { ok: false, error: "Could not save that change." };
  }
}

export async function updateApplicationStatus(
  id: string,
  status: string,
): Promise<ApiResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!APPLICATION_STATUSES.includes(status as JobApplication["status"])) {
    return { ok: false, error: "Unknown status." };
  }

  try {
    const updated = await updateDocument(COLLECTIONS.applications, id, {
      status,
      updatedAt: new Date().toISOString(),
    });
    if (!updated) return { ok: false, error: "Firebase isn't connected." };

    revalidatePath("/admin/jobs");
    revalidatePath("/admin");
    return { ok: true, data: undefined };
  } catch (error) {
    console.error("[admin] updateApplicationStatus failed:", error);
    return { ok: false, error: "Could not save that change." };
  }
}

/** Toggles whether a project appears in the home page's featured grid. */
export async function toggleProjectFeatured(
  id: string,
  featured: boolean,
): Promise<ApiResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const updated = await updateDocument(COLLECTIONS.projects, id, { featured });
    if (!updated) return { ok: false, error: "Firebase isn't connected." };

    revalidatePath("/admin/projects");
    revalidatePath("/portfolio");
    revalidatePath("/");
    return { ok: true, data: undefined };
  } catch (error) {
    console.error("[admin] toggleProjectFeatured failed:", error);
    return { ok: false, error: "Could not save that change." };
  }
}
