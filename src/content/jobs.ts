import type { JobPosting } from "@/types";

/** Seed job postings. Replaced by Firestore records once the admin panel is live. */
export const jobs: JobPosting[] = [
  {
    id: "j-video-editor",
    slug: "senior-video-editor",
    title: "Senior Video Editor",
    department: "Film",
    location: "Mira Road, Mumbai (on-site)",
    employmentType: "FULL_TIME",
    experience: "3–6 years",
    salaryRange: { min: 45000, max: 75000, currency: "INR", unit: "MONTH" },
    description:
      "You will cut property films, brand videos and short-form reels from footage our own unit shoots — usually the same week it was shot. This is a craft role with real ownership: you sit in on the shot-list planning, so what lands on your timeline is footage you asked for.",
    responsibilities: [
      "Cut hero films plus the full set of paid-media cutdowns",
      "Grade footage and design sound for delivered masters",
      "Build floor-plan and motion-graphic sequences",
      "Join shoot planning so coverage matches the edit",
      "Maintain the project archive and delivery specs",
    ],
    requirements: [
      "3+ years editing commercial or real-estate video",
      "Strong Premiere Pro or DaVinci Resolve, plus After Effects",
      "A reel that shows pacing, not just effects",
      "Comfortable working to a fixed weekly delivery rhythm",
    ],
    postedAt: "2026-07-14",
    validThrough: "2026-10-31",
    status: "open",
  },
  {
    id: "j-performance",
    slug: "performance-marketing-executive",
    title: "Performance Marketing Executive",
    department: "Performance",
    location: "Mira Road, Mumbai (hybrid)",
    employmentType: "FULL_TIME",
    experience: "2–4 years",
    salaryRange: { min: 40000, max: 65000, currency: "INR", unit: "MONTH" },
    description:
      "Run Meta and Google campaigns for a small book of real-estate and hospitality clients. You will own the accounts you run — the plan, the weekly optimisation and the monthly conversation with the client about what worked and what did not.",
    responsibilities: [
      "Build and run full-funnel Meta and Google campaigns",
      "Set up pixel, CAPI and offline conversion tracking",
      "Run weekly creative tests with the design floor",
      "Write the monthly client report, misses included",
      "Maintain negative keyword and exclusion lists",
    ],
    requirements: [
      "2+ years managing live ad budgets, not just reporting on them",
      "Meta Ads Manager and Google Ads to a working depth",
      "Able to explain a cost-per-lead movement without a template",
      "Spreadsheet fluency; SQL or Looker Studio a bonus",
    ],
    postedAt: "2026-08-02",
    validThrough: "2026-11-30",
    status: "open",
  },
  {
    id: "j-designer",
    slug: "graphic-designer-branding",
    title: "Graphic Designer — Branding",
    department: "Design",
    location: "Mira Road, Mumbai (on-site)",
    employmentType: "FULL_TIME",
    experience: "2–5 years",
    salaryRange: { min: 35000, max: 60000, currency: "INR", unit: "MONTH" },
    description:
      "Design identities, brochures, hoardings and inserts that hold together across wildly different sizes. Print craft matters here — you will be checking bleed and dot gain as often as you are picking a typeface.",
    responsibilities: [
      "Design logo suites and full identity systems",
      "Produce print-ready brochure and insert artwork",
      "Build large-format hoarding and DOOH creative",
      "Write and maintain brand usage guidelines",
      "Coordinate specs directly with printers and fabricators",
    ],
    requirements: [
      "2+ years in a design studio or agency",
      "Portfolio showing print work, not only screen",
      "Fluent in Illustrator, InDesign and Photoshop",
      "Understands CMYK, Pantone, bleed and trapping",
    ],
    postedAt: "2026-08-19",
    validThrough: "2026-11-30",
    status: "open",
  },
  {
    id: "j-social",
    slug: "social-media-manager",
    title: "Social Media Manager",
    department: "Social",
    location: "Mira Road, Mumbai (hybrid)",
    employmentType: "FULL_TIME",
    experience: "1–3 years",
    salaryRange: { min: 28000, max: 45000, currency: "INR", unit: "MONTH" },
    description:
      "Own the monthly calendar for three to four brands end to end: strategy input, copy, scheduling, community management and the monthly read. You will work beside the film and design teams rather than briefing them from a distance.",
    responsibilities: [
      "Build and publish rolling 30-day content calendars",
      "Write hooks, captions and story sequences",
      "Run community management and DM responses",
      "Track saves, shares and profile visits weekly",
      "Present the monthly performance read to clients",
    ],
    requirements: [
      "1+ year managing brand social accounts professionally",
      "Genuinely good writing in English; Hindi or Marathi a plus",
      "Knows the difference between a trend worth using and one to skip",
      "Comfortable presenting your own work to a client",
    ],
    postedAt: "2026-08-26",
    validThrough: "2026-12-15",
    status: "open",
  },
];

export function getOpenJobs(): JobPosting[] {
  return jobs.filter((job) => job.status === "open");
}

export function getJob(slug: string): JobPosting | undefined {
  return jobs.find((job) => job.slug === slug);
}
