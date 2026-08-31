import type { ProcessStep, TimelineEntry, Faq } from "@/types";

/**
 * Single source of truth for company identity — used by the navbar, footer,
 * contact blocks, metadata defaults and the Organization/LocalBusiness schema.
 * Swap these values for the real ones before launch.
 */
export const site = {
  name: "Synovative",
  legalName: "Synovative Digital Marketing Solutions",
  tagline: "A 360° Digital Marketing Solution",
  description:
    "Synovative is a 360° digital marketing agency helping real-estate and lifestyle brands grow through social media, branding, property films, performance marketing and web development.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://synovative.com",
  locale: "en_IN",
  founded: "2019",

  contact: {
    phone: "+91 98209 83315",
    phoneHref: "+919820983315",
    altPhone: "+91 98197 24958",
    email: "hello@synovative.com",
    careersEmail: "careers@synovative.com",
  },

  address: {
    street: "Office No. 204, Business Hub",
    locality: "Mira Road",
    region: "Maharashtra",
    postalCode: "401107",
    country: "IN",
    countryName: "India",
  },

  geo: { latitude: 19.2813, longitude: 72.8686 },

  /** Used by the LocalBusiness schema and the contact page. */
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "19:00" },
    { days: ["Saturday"], opens: "10:00", closes: "16:00" },
  ],

  socials: [
    { label: "Instagram", url: "https://www.instagram.com/synovative", icon: "Instagram" },
    { label: "Facebook", url: "https://www.facebook.com/synovative", icon: "Facebook" },
    { label: "LinkedIn", url: "https://www.linkedin.com/company/synovative", icon: "Linkedin" },
    { label: "YouTube", url: "https://www.youtube.com/@synovative", icon: "Youtube" },
  ],

  /** Embedded on the contact page. */
  mapEmbedUrl:
    "https://www.google.com/maps?q=Mira+Road+Maharashtra+India&output=embed",
  mapLinkUrl: "https://www.google.com/maps/search/?api=1&query=Mira+Road+Maharashtra+India",

  stats: [
    { value: "6+", label: "Years in business" },
    { value: "180+", label: "Projects delivered" },
    { value: "60+", label: "Happy clients" },
    { value: "12M+", label: "Impressions driven" },
  ],
} as const;

export const aboutCopy = {
  short:
    "We are a paper-and-pixels studio. Synovative brings together strategists, designers, film-makers and media buyers under one roof so a brand's story stays consistent from the first sketch to the last click.",
  long: [
    "Synovative started in 2019 with a single desk, a borrowed camera and a stubborn belief that marketing should feel handmade rather than mass-produced. Six years on we are a full 360° team, but the belief has not moved.",
    "We work primarily with real-estate developers, hospitality brands and lifestyle businesses — categories where trust is earned slowly and lost quickly. That shapes how we work: research before creative, systems before campaigns, and numbers reported honestly whether or not they flatter us.",
    "Everything lives under one roof. The team that writes the strategy also shoots the reel, designs the hoarding, builds the landing page and runs the ads against it. Nothing gets lost in a handover, because there isn't one.",
  ],
};

export const ceo = {
  name: "Rahul Sharma",
  role: "Founder & Chief Executive Officer",
  // Cloudinary public id, like every other image reference. Resolving through
  // `cloudinaryUrl` means it falls back to the placeholder before media is
  // uploaded, rather than 404ing against `public/`.
  photo: "synovative/team/ceo",
  quote: "Good marketing is not louder. It is more honest, more often.",
  bio: [
    "Rahul founded Synovative in 2019 after seven years running growth for real-estate developers across Mumbai. He still personally sits in on every brand kickoff.",
    "His view is simple: a campaign that cannot explain its own numbers is decoration, not marketing. That standard runs through every retainer the studio takes on.",
  ],
  highlights: [
    "13+ years across brand and performance marketing",
    "Led launch campaigns for 40+ residential projects",
    "Built Synovative's in-house drone and film unit",
    "Speaks regularly on real-estate brand storytelling",
    "Personally reviews every monthly client report",
  ],
};

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Listen",
    body: "We start with your numbers, your market and your last three campaigns — the good and the bad.",
    icon: "Ear",
  },
  {
    step: 2,
    title: "Sketch",
    body: "Positioning, messaging and a creative territory, on paper, before a single asset is produced.",
    icon: "PencilLine",
  },
  {
    step: 3,
    title: "Make",
    body: "Films, designs, sites and ad creative, produced in-house so the tone never drifts between channels.",
    icon: "Scissors",
  },
  {
    step: 4,
    title: "Launch",
    body: "Media goes live in measured phases so we learn what works before the budget is committed.",
    icon: "Rocket",
  },
  {
    step: 5,
    title: "Sharpen",
    body: "Weekly reads, monthly reports, honest calls on what to cut and what to double down on.",
    icon: "TrendingUp",
  },
];

export const timeline: TimelineEntry[] = [
  { year: "2019", title: "The first desk", body: "Synovative opens with two people, one camera and three real-estate clients in Mira Road." },
  { year: "2020", title: "Going remote, going digital", body: "Lockdown pushes site visits online. We build our first virtual property walkthroughs and never look back." },
  { year: "2021", title: "The film unit", body: "Drone and editing brought fully in-house. Property films become our signature service." },
  { year: "2022", title: "Performance desk opens", body: "A dedicated media buying team joins, closing the loop between creative and conversion." },
  { year: "2023", title: "100 projects", body: "We cross a hundred delivered projects and move into a studio built for shooting and editing under one roof." },
  { year: "2024", title: "Web & app practice", body: "Development team formed, so landing pages and micro-sites ship as fast as the campaigns that feed them." },
  { year: "2025", title: "Beyond real estate", body: "Hospitality and lifestyle brands become a third of the book. The playbook travels well." },
  { year: "2026", title: "The next sheet", body: "A studio of 30, still handmade, still measuring everything." },
];

export const faqs: Faq[] = [
  {
    question: "What does a 360° digital marketing agency actually do?",
    answer:
      "It means one team handles everything that touches your audience — brand identity, social content, photography and film, the website people land on, and the paid media that drives them there. You get one strategy and one point of contact instead of four vendors blaming each other.",
  },
  {
    question: "Do you only work with real-estate brands?",
    answer:
      "Real estate is where we started and where we are strongest, and it is still roughly two-thirds of our work. The remaining third is hospitality, retail and lifestyle brands. If your category depends on trust and considered purchases, our approach transfers well.",
  },
  {
    question: "What does a typical engagement cost?",
    answer:
      "Monthly retainers start around ₹45,000 for social media management and scale with production volume and ad spend. One-off projects — a brand identity, a property film, a website — are quoted per scope. We send a written scope and cost before any work begins.",
  },
  {
    question: "How quickly can you start?",
    answer:
      "Onboarding takes about a week: a kickoff session, access handover, and a documented plan. Production usually starts in week two, and the first campaign goes live inside 21 days for most retainers.",
  },
  {
    question: "Do you handle the ad budget as well?",
    answer:
      "Yes. We plan, run and optimise Meta and Google campaigns, and the spend stays on your own ad account so you keep full ownership of the data and history. Our fee is separate from the media budget and never a hidden cut of it.",
  },
  {
    question: "Who owns the creative work you produce?",
    answer:
      "You do. On final payment for a project, all raw footage, source files and design assets are handed over to you. We ask only for permission to show the finished work in our portfolio.",
  },
  {
    question: "How do you report on results?",
    answer:
      "Every retainer gets a live dashboard plus a written monthly report covering reach, engagement, leads, cost per lead and what we are changing next month. We report the misses as plainly as the wins.",
  },
];

export const careersCopy = {
  heading: "Come make things by hand.",
  intro:
    "Synovative is a studio, not a factory. Small teams, real ownership, and work that ships instead of sitting in a deck. If you would rather cut and paste actual paper than slide number 47, you will fit in here.",
  perks: [
    { title: "Own the work", body: "You present your own work to the client. No layers, no ghost-writing.", icon: "Hand" },
    { title: "Kit that keeps up", body: "Current cameras, drones, licences and machines. We do not make you fight your tools.", icon: "Camera" },
    { title: "Learn on the clock", body: "A yearly budget for courses and conferences, plus Friday craft sessions.", icon: "GraduationCap" },
    { title: "Real hours", body: "Ten to seven, alternate Saturdays off, and crunch treated as a planning failure.", icon: "Clock" },
  ],
};
