import "server-only";

/**
 * Data access for every managed entity.
 *
 * Each reader tries Firestore first and falls back to the seed content in
 * `src/content` when Firebase is not configured (or when a query fails). That
 * single rule is what makes the site work identically on a fresh clone with no
 * credentials and on a fully connected production deployment — pages never need
 * to know which one they are talking to.
 */

import { getAdminDb } from "./admin";
import { fetchGoogleReviews } from "@/lib/reviews";
import { posts as seedPosts } from "@/content/blogs";
import { jobs as seedJobs } from "@/content/jobs";
import { projects as seedProjects } from "@/content/projects";
import { testimonials as seedTestimonials } from "@/content/team";
import type {
  BlogPost,
  JobApplication,
  JobPosting,
  Lead,
  Project,
  Testimonial,
} from "@/types";

export const COLLECTIONS = {
  leads: "leads",
  projects: "projects",
  posts: "posts",
  jobs: "jobs",
  applications: "applications",
  testimonials: "testimonials",
} as const;

/**
 * Run a Firestore query, falling back to seed data on any failure.
 *
 * A CMS outage should degrade the site to its last known content rather than
 * take the marketing site down, so read errors are logged and swallowed.
 */
async function withFallback<T>(
  label: string,
  query: (db: NonNullable<ReturnType<typeof getAdminDb>>) => Promise<T>,
  fallback: T,
): Promise<T> {
  const db = getAdminDb();
  if (!db) return fallback;

  try {
    return await query(db);
  } catch (error) {
    console.error(`[firestore] ${label} failed, serving seed content:`, error);
    return fallback;
  }
}

/** Firestore stores the id on the document, not in the data. Merge them back. */
function docsToArray<T>(
  snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>,
): T[] {
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T);
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                   */
/* -------------------------------------------------------------------------- */

export async function fetchProjects(): Promise<Project[]> {
  return withFallback(
    "fetchProjects",
    async (db) => {
      const snapshot = await db
        .collection(COLLECTIONS.projects)
        .orderBy("year", "desc")
        .get();
      return snapshot.empty ? seedProjects : docsToArray<Project>(snapshot);
    },
    seedProjects,
  );
}

export async function fetchFeaturedProjects(limit = 6): Promise<Project[]> {
  const all = await fetchProjects();
  return all.filter((project) => project.featured).slice(0, limit);
}

export async function fetchProjectsForService(
  slug: string,
  limit = 6,
): Promise<Project[]> {
  const all = await fetchProjects();
  return all
    .filter((project) => project.services.includes(slug as Project["services"][number]))
    .slice(0, limit);
}

/* -------------------------------------------------------------------------- */
/* Blog posts                                                                 */
/* -------------------------------------------------------------------------- */

function sortByPublished(items: BlogPost[]) {
  return [...items].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
}

const seedPublished = sortByPublished(
  seedPosts.filter((post) => post.status === "published"),
);

export async function fetchPosts(): Promise<BlogPost[]> {
  return withFallback(
    "fetchPosts",
    async (db) => {
      const snapshot = await db
        .collection(COLLECTIONS.posts)
        .where("status", "==", "published")
        .orderBy("publishedAt", "desc")
        .get();
      return snapshot.empty ? seedPublished : docsToArray<BlogPost>(snapshot);
    },
    seedPublished,
  );
}

export async function fetchPost(slug: string): Promise<BlogPost | null> {
  const all = await fetchPosts();
  return all.find((post) => post.slug === slug) ?? null;
}

export async function fetchLatestPosts(limit = 3): Promise<BlogPost[]> {
  return (await fetchPosts()).slice(0, limit);
}

/** Same-category posts first, topped up with the most recent, excluding self. */
export async function fetchRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  const all = await fetchPosts();
  const current = all.find((post) => post.slug === slug);
  const others = all.filter((post) => post.slug !== slug);
  if (!current) return others.slice(0, limit);

  const sameCategory = others.filter((post) => post.category === current.category);
  const rest = others.filter((post) => post.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/* -------------------------------------------------------------------------- */
/* Jobs                                                                       */
/* -------------------------------------------------------------------------- */

const seedOpenJobs = seedJobs.filter((job) => job.status === "open");

export async function fetchJobs(): Promise<JobPosting[]> {
  return withFallback(
    "fetchJobs",
    async (db) => {
      const snapshot = await db
        .collection(COLLECTIONS.jobs)
        .where("status", "==", "open")
        .orderBy("postedAt", "desc")
        .get();
      return snapshot.empty ? seedOpenJobs : docsToArray<JobPosting>(snapshot);
    },
    seedOpenJobs,
  );
}

export async function fetchJob(slug: string): Promise<JobPosting | null> {
  const all = await fetchJobs();
  return all.find((job) => job.slug === slug) ?? null;
}

/* -------------------------------------------------------------------------- */
/* Testimonials                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Testimonials, in order of preference: live Google Business Profile reviews,
 * then curated Firestore records, then the seed set. GBP wins because the brief
 * asks for real reviews on the home page; the other two keep the section
 * populated when the Places API is unconfigured or down.
 */
export async function fetchTestimonials(): Promise<Testimonial[]> {
  const googleReviews = await fetchGoogleReviews();
  if (googleReviews && googleReviews.length > 0) return googleReviews;

  return withFallback(
    "fetchTestimonials",
    async (db) => {
      const snapshot = await db
        .collection(COLLECTIONS.testimonials)
        .orderBy("publishedAt", "desc")
        .limit(12)
        .get();
      return snapshot.empty ? seedTestimonials : docsToArray<Testimonial>(snapshot);
    },
    seedTestimonials,
  );
}

/* -------------------------------------------------------------------------- */
/* Leads and applications (admin-only reads, API-route writes)                */
/* -------------------------------------------------------------------------- */

export async function fetchLeads(limit = 100): Promise<Lead[]> {
  return withFallback(
    "fetchLeads",
    async (db) => {
      const snapshot = await db
        .collection(COLLECTIONS.leads)
        .orderBy("createdAt", "desc")
        .limit(limit)
        .get();
      return docsToArray<Lead>(snapshot);
    },
    [],
  );
}

export async function fetchApplications(limit = 100): Promise<JobApplication[]> {
  return withFallback(
    "fetchApplications",
    async (db) => {
      const snapshot = await db
        .collection(COLLECTIONS.applications)
        .orderBy("createdAt", "desc")
        .limit(limit)
        .get();
      return docsToArray<JobApplication>(snapshot);
    },
    [],
  );
}

/**
 * Persist a form submission.
 *
 * Returns `null` when Firebase is not configured so the caller can decide
 * whether that is acceptable — the public forms treat it as a soft success and
 * log the payload, because losing an enquiry to a misconfigured env var is
 * worse than accepting it optimistically.
 */
export async function createDocument<T extends Record<string, unknown>>(
  collection: (typeof COLLECTIONS)[keyof typeof COLLECTIONS],
  data: T,
): Promise<string | null> {
  const db = getAdminDb();
  if (!db) return null;

  const ref = await db.collection(collection).add(data);
  return ref.id;
}

export async function updateDocument(
  collection: (typeof COLLECTIONS)[keyof typeof COLLECTIONS],
  id: string,
  data: Record<string, unknown>,
): Promise<boolean> {
  const db = getAdminDb();
  if (!db) return false;

  await db.collection(collection).doc(id).update(data);
  return true;
}

export async function deleteDocument(
  collection: (typeof COLLECTIONS)[keyof typeof COLLECTIONS],
  id: string,
): Promise<boolean> {
  const db = getAdminDb();
  if (!db) return false;

  await db.collection(collection).doc(id).delete();
  return true;
}
