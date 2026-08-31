import type { Project, ProjectCategory } from "@/types";

/** Category labels and ordering for the portfolio filter bar. */
export const projectCategories: { slug: ProjectCategory; label: string }[] = [
  { slug: "featured-posts", label: "Featured Posts" },
  { slug: "featured-videos", label: "Featured Videos" },
  { slug: "featured-websites", label: "Featured Websites" },
  { slug: "branding", label: "Branding" },
  { slug: "other-projects", label: "Other Projects" },
];

export const categoryLabels = Object.fromEntries(
  projectCategories.map((c) => [c.slug, c.label]),
) as Record<ProjectCategory, string>;

/**
 * Seed portfolio. `image` values are Cloudinary public ids resolved through
 * `lib/cloudinary.ts`; once the admin panel is connected to Firestore these are
 * replaced by managed records with the same shape.
 */
export const projects: Project[] = [
  {
    id: "p-dhyan-happiness",
    slug: "dhyan-siddhi-happiness-launch",
    title: "Happiness Ghar Hai — Launch Campaign",
    client: "Dhyan Siddhi Realty",
    category: "featured-posts",
    services: ["social-media-marketing", "branding", "performance-marketing"],
    summary:
      "A full launch identity and social calendar for a 1BHK residential project, built around one line the sales team could actually repeat.",
    image: "synovative/projects/dhyan-happiness",
    featured: true,
    year: 2025,
    metrics: [
      { label: "Enquiries", value: "412" },
      { label: "Cost per lead", value: "₹340" },
      { label: "Reach", value: "2.1M" },
    ],
  },
  {
    id: "p-nirvaana-shaanti",
    slug: "nirvaana-shaanti-ke-saath",
    title: "Shaanti Ke Saath — Wellness Positioning",
    client: "Nirvaana by JMS Group",
    category: "featured-posts",
    services: ["social-media-marketing", "branding"],
    summary:
      "Repositioned a Naigaon project around wellness rather than price, with a hoarding and social system that carried the same calm.",
    image: "synovative/projects/nirvaana-shaanti",
    featured: true,
    year: 2025,
    metrics: [
      { label: "Follower growth", value: "+13.4K" },
      { label: "Saves", value: "8,900" },
    ],
  },
  {
    id: "p-shanti-heights",
    slug: "shanti-heights-peace-has-address",
    title: "Peace Has A New Address",
    client: "Shanti Heights",
    category: "featured-posts",
    services: ["branding", "social-media-marketing"],
    summary:
      "Premium launch creative across print, hoarding and digital for a luxury tower, colour-matched from newsprint to LED.",
    image: "synovative/projects/shanti-heights",
    featured: true,
    year: 2024,
  },
  {
    id: "p-lord-of-seas",
    slug: "lord-of-seas-identity",
    title: "Lord of Seas — Project Identity",
    client: "Centenary Developers",
    category: "branding",
    services: ["branding"],
    summary:
      "A pearl-and-shell identity system for a seafront tower: logo suite, brochure, site branding and sales-gallery graphics.",
    image: "synovative/projects/lord-of-seas",
    featured: true,
    year: 2024,
  },
  {
    id: "p-modern-needs",
    slug: "modern-needs-lifestyle-campaign",
    title: "Modern Needs — Lifestyle Campaign",
    client: "Idhar Hai Developers",
    category: "featured-videos",
    services: ["property-shooting-editing", "social-media-marketing"],
    summary:
      "A lifestyle film series shot across the podium, clubhouse and open spaces, cut into a hero film plus eleven paid cutdowns.",
    image: "synovative/projects/modern-needs",
    youtubeId: "aqz-KE-bpKQ",
    featured: true,
    year: 2025,
    metrics: [
      { label: "Video views", value: "1.8M" },
      { label: "Completion rate", value: "41%" },
    ],
  },
  {
    id: "p-aerial-naigaon",
    slug: "naigaon-aerial-series",
    title: "Naigaon Aerial Series",
    client: "Multiple developers",
    category: "featured-videos",
    services: ["property-shooting-editing"],
    summary:
      "Licensed drone coverage across six Naigaon projects, establishing view lines, connectivity and podium scale in a single flight day each.",
    image: "synovative/projects/naigaon-aerial",
    youtubeId: "ScMzIvxBSi4",
    beforeAfter: {
      before: "synovative/projects/naigaon-aerial-raw",
      after: "synovative/projects/naigaon-aerial-graded",
    },
    featured: true,
    year: 2025,
  },
  {
    id: "p-1day-to-go",
    slug: "one-day-to-go-countdown",
    title: "1 Day To Go — Countdown Series",
    client: "Dhyan Siddhi Realty",
    category: "featured-posts",
    services: ["social-media-marketing", "performance-marketing"],
    summary:
      "A seven-day countdown built as one continuous illustration, cut into daily posts that only made sense as a set.",
    image: "synovative/projects/one-day-to-go",
    featured: false,
    year: 2024,
  },
  {
    id: "p-nirvaana-site",
    slug: "nirvaana-project-microsite",
    title: "Nirvaana Project Micro-site",
    client: "Nirvaana by JMS Group",
    category: "featured-websites",
    services: ["website-app-development", "performance-marketing"],
    summary:
      "A single-page micro-site for the launch campaign: 0.9s largest contentful paint on 4G, with the enquiry form above the fold.",
    image: "synovative/projects/nirvaana-site",
    externalUrl: "https://example.com/nirvaana",
    featured: true,
    year: 2025,
    metrics: [
      { label: "LCP", value: "0.9s" },
      { label: "Form conversion", value: "11.2%" },
    ],
  },
  {
    id: "p-centenary-corporate",
    slug: "centenary-corporate-website",
    title: "Centenary Developers — Corporate Site",
    client: "Centenary Developers",
    category: "featured-websites",
    services: ["website-app-development"],
    summary:
      "A ten-page corporate site with a project archive the client's own team maintains, plus full schema markup and SEO groundwork.",
    image: "synovative/projects/centenary-site",
    externalUrl: "https://example.com/centenary",
    featured: false,
    year: 2024,
  },
  {
    id: "p-hoarding-suite",
    slug: "highway-hoarding-suite",
    title: "Western Express Hoarding Suite",
    client: "Various",
    category: "branding",
    services: ["branding"],
    summary:
      "Twelve highway hoardings designed to the three-second rule, each built at placement-correct resolution and viewing distance.",
    image: "synovative/projects/hoarding-suite",
    featured: false,
    year: 2025,
  },
  {
    id: "p-insert-campaign",
    slug: "newspaper-insert-campaign",
    title: "Launch Insert Campaign",
    client: "Shanti Heights",
    category: "other-projects",
    services: ["branding"],
    summary:
      "A four-fold newspaper insert designed against newsprint dot gain, distributed across 180,000 copies in the launch radius.",
    image: "synovative/projects/newspaper-insert",
    featured: false,
    year: 2024,
  },
  {
    id: "p-influencer-series",
    slug: "influencer-walkthrough-series",
    title: "Influencer Walkthrough Series",
    client: "Idhar Hai Developers",
    category: "other-projects",
    services: ["property-shooting-editing", "social-media-marketing"],
    summary:
      "Eight creator collaborations shot on site across a quarter, with deliverables, disclosure and usage rights negotiated up front.",
    image: "synovative/projects/influencer-series",
    featured: false,
    year: 2025,
  },
];

export function getFeaturedProjects(limit?: number): Project[] {
  const featured = projects.filter((project) => project.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((project) => project.category === category);
}

export function getProjectsForService(slug: string, limit = 6): Project[] {
  return projects
    .filter((project) => project.services.includes(slug as Project["services"][number]))
    .slice(0, limit);
}
