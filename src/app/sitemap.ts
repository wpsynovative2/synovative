import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { fetchJobs, fetchPosts } from "@/lib/firebase/collections";
import { absoluteUrl } from "@/lib/seo/metadata";

/**
 * Sitemap covering every indexable route.
 *
 * Blog posts and jobs are read through the same repository the pages use, so a
 * post published from the admin panel appears here on the next revalidation
 * without any extra wiring. `/admin` is deliberately absent — it is also
 * disallowed in `robots.ts`.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, jobs] = await Promise.all([fetchPosts(), fetchJobs()]);
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/portfolio"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/career"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/blogs"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blogs/${post.slug}`),
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Job detail pages do not exist yet; the anchors keep the postings crawlable.
  const jobRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: absoluteUrl(`/career#${job.slug}`),
    lastModified: new Date(job.postedAt),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...postRoutes, ...jobRoutes];
}
