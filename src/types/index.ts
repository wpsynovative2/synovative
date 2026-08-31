/**
 * Domain model shared by the public site, the admin panel and the API routes.
 *
 * Every entity is plain JSON so the same shape can come from a Firestore
 * document, from the static seed content in `src/content`, or from a form
 * submission, without any conversion layer in between. Dates are ISO 8601
 * strings for the same reason.
 */

export type ServiceSlug =
  | "social-media-marketing"
  | "branding"
  | "property-shooting-editing"
  | "website-app-development"
  | "performance-marketing";

export type ProjectCategory =
  | "featured-posts"
  | "featured-videos"
  | "featured-websites"
  | "branding"
  | "other-projects";

/** A block of copy inside a service page, rendered as a paper sheet. */
export interface ServiceSection {
  title: string;
  body: string;
  bullets?: string[];
}

/** One of the five offerings. Drives `/services/[service]` and the navbar dropdown. */
export interface Service {
  slug: ServiceSlug;
  name: string;
  /** Two-line label used on the hanging tags in the services strip. */
  tagLabel: string;
  tagline: string;
  summary: string;
  /** Lucide icon name, resolved by `components/ui/icon.tsx`. */
  icon: string;
  /** Alternating tag colour in the services strip, matching the theme mockup. */
  tone: "brand" | "accent";
  hero: {
    heading: string;
    subheading: string;
    image?: string;
  };
  sections: ServiceSection[];
  /** Bullet-per-deliverable list shown as a torn-paper checklist. */
  deliverables: string[];
  cta: {
    heading: string;
    body: string;
    label: string;
  };
  /** Project categories to surface on this service page. */
  relatedCategories: ProjectCategory[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  /** Services this project should appear under. */
  services: ServiceSlug[];
  summary: string;
  /** Cloudinary public id, or an absolute URL. */
  image: string;
  /** YouTube video id for video projects. */
  youtubeId?: string;
  /** Before/after pair for the property shooting showcase. */
  beforeAfter?: { before: string; after: string };
  externalUrl?: string;
  featured: boolean;
  year: number;
  metrics?: { label: string; value: string }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Markdown-ish body; rendered by `components/blog/post-body.tsx`. */
  body: string;
  coverImage: string;
  author: { name: string; role: string; avatar?: string };
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  status: "draft" | "published";
  seo?: { title?: string; description?: string };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  /** Playing-card suit stamped in the corner, as in the theme mockup. */
  suit: "spade" | "heart" | "club" | "diamond";
  socials?: { label: string; url: string }[];
}

export interface Testimonial {
  id: string;
  author: string;
  role?: string;
  avatar?: string;
  rating: number;
  quote: string;
  /** Where the review came from — GBP reviews are labelled in the UI. */
  source: "google" | "manual";
  publishedAt: string;
}

export interface JobPosting {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType:
    | "FULL_TIME"
    | "PART_TIME"
    | "CONTRACTOR"
    | "INTERN"
    | "TEMPORARY";
  experience: string;
  salaryRange?: { min: number; max: number; currency: string; unit: "MONTH" | "YEAR" };
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedAt: string;
  validThrough?: string;
  status: "open" | "closed";
}

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  body: string;
  icon: string;
}

export interface Faq {
  question: string;
  answer: string;
}

/* -------------------------------------------------------------------------- */
/* Submissions                                                                */
/* -------------------------------------------------------------------------- */

/** A contact/enquiry form submission. Shown in the admin panel under Leads. */
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: ServiceSlug | "general";
  message: string;
  /** Path the form was submitted from, e.g. `/services/branding`. */
  source: string;
  status: "new" | "contacted" | "qualified" | "won" | "lost";
  createdAt: string;
}

/** A candidate application against a `JobPosting`. */
export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  portfolioUrl?: string;
  /** Cloudinary URL of the uploaded résumé. */
  resumeUrl?: string;
  message: string;
  status: "new" | "shortlisted" | "interviewing" | "hired" | "rejected";
  createdAt: string;
}

/** Discriminated result returned by every API route, so forms can branch on it. */
export type ApiResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };
