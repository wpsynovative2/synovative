import type { Service, ServiceSlug } from "@/types";

/**
 * The five offerings. This array is the single source for the navbar dropdown,
 * the home page services strip, `/services`, every `/services/[service]` page,
 * `generateStaticParams`, and the sitemap.
 */
export const services: Service[] = [
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    tagLabel: "Social Media",
    tagline: "Show up daily, sound like yourself",
    summary:
      "Strategy, content calendars, reels and community management that keep a brand present without turning it into noise.",
    icon: "Megaphone",
    tone: "brand",
    hero: {
      heading: "Make your project worth the scroll.",
      subheading:
        "We find the stories hiding behind the floor plans, amenities, views, and location, then turn them into content people actually want to see.",
    },
    note: "Make noise worth stopping for.",
    headings: {
      work: "Social Media Marketing in the wild",
      workDescription: "A few projects where social did more than fill a content calendar.",
    },
    sections: [
      { title: "Find Your Voice" },
      { title: "Plan The Feed" },
      { title: "Make The Content" },
      { title: "Win The Scroll" },
      { title: "See What Sticks" },
    ],
    deliverables: [
      "CONTENT GAME PLAN",
      "SCROLL-WORTHY STUFF",
      "REELS, NOT FILLERS",
      "STORIES WITH A POINT",
      "DMs, HANDLED",
      "NUMBERS, NO FAIRYTALES",
    ],
    cta: {
      eyebrow: "Social media marketing",
      heading: "Let’s fill next month’s calendar.",
      body: "Send us your handle. We’ll review what you’re posting, what’s getting noticed, and where there’s room to make things a lot more interesting.",
      label: "Get a free feed audit",
    },
    relatedCategories: ["featured-posts", "featured-videos"],
    seo: {
      title: "Social Media Marketing Agency",
      description:
        "Monthly social media strategy, reel production, creative design and community management for real-estate and lifestyle brands. Get a free 30-post feed audit.",
      keywords: [
        "social media marketing agency",
        "reel production",
        "instagram marketing",
        "content strategy",
        "social media management India",
      ],
    },
  },

  {
    slug: "branding",
    name: "Branding",
    tagLabel: "Branding",
    tagline: "An identity that survives contact with reality",
    summary:
      "Logos, brand systems, brochures, hoardings and print that hold together whether they're 30 metres tall or 3 centimetres wide.",
    icon: "PenTool",
    tone: "accent",
    hero: {
      heading: "Make your project stand out from the next tower.",
      subheading:
        "Branding isn’t a logo file. It’s the identity that makes your project recognisable even 100 metres away from the hoarding.",
    },
    note: "A brand that doesn’t disappear into the crowd.",
    sections: [
      { title: "Give It An Identity" },
      { title: "Set The Brand Rules" },
      { title: "Make The Brochure Count" },
      { title: "Take It To Site" },
      { title: "Put It Outdoors" },
      { title: "Get It In Print" },
      { title: "Take It Digital" },
      { title: "Make It Recognisable" },
    ],
    deliverables: [
      "Brand Identity",
      "Brand Guidelines",
      "Site Branding",
      "Print Collateral",
      "OOH Design",
      "Digital Assets",
    ],
    cta: {
      heading: "Bring us your brand, however messy.",
      body: "Half-finished logo, inconsistent files, five versions of the same brochure — that's a normal starting point. Send it over and we'll tell you what's salvageable.",
      label: "Start a branding project",
    },
    relatedCategories: ["branding", "featured-posts"],
    seo: {
      title: "Branding & Identity Design Agency",
      description:
        "Logo design, brand identity systems, property brochures, site branding, hoardings and newspaper inserts — designed as one system and delivered print-ready.",
      keywords: [
        "branding agency",
        "logo design",
        "brochure design",
        "site branding",
        "DOOH advertising",
        "real estate branding",
      ],
    },
  },

  {
    slug: "property-shooting-editing",
    name: "Shoots, Films & Drone",
    pageTitle: "Shoots, Films & Drones",
    tagLabel: "Shoots, Films\n& Drone",
    tagline: "Film that sells the space, not the camera",
    summary:
      "Drone aerials, walkthrough films, influencer shoots and post-production, produced end-to-end by our in-house film unit.",
    icon: "Camera",
    tone: "brand",
    hero: {
      heading: "Make people feel the sample flat before they visit it",
      subheading:
        "From aerials to walkthroughs, reels to brand films, we turn square feet into something people can picture themselves in.",
    },
    headings: {
      includes: "Every property shooting & editing engagement includes",
      process: "How property shooting & editing works here",
    },
    sections: [
      { title: "Find The Story" },
      { title: "Plan The Shot" },
      { title: "Shoot The Space" },
      { title: "Fly The Drone" },
      { title: "Influencer Walks In" },
      { title: "Turn Footage Into Films" },
      { title: "Deliver The Goods" },
    ],
    deliverables: [
      "Drone Aerials",
      "Property Walkthroughs",
      "Brand Films",
      "Influencer Content",
      "Post-Production",
      "Motion Graphics",
      "Before/After",
    ],
    cta: {
      heading: "Book a shoot day.",
      body: "Tell us the project, the site and the deadline. We'll come back with a shot list, a crew plan and a fixed quote.",
      label: "Book a property shoot",
    },
    relatedCategories: ["featured-videos", "featured-posts"],
    seo: {
      title: "Property Videography, Drone Shoots & Video Editing",
      description:
        "Licensed drone aerials, property walkthrough films, influencer shoots and professional video editing for real-estate and hospitality brands.",
      keywords: [
        "property videography",
        "drone shoot real estate",
        "property walkthrough video",
        "video editing services",
        "real estate video production",
      ],
    },
  },

  {
    slug: "website-app-development",
    name: "Website Development",
    pageTitle: "Website",
    tagLabel: "Website\nDevelopment",
    tagline: "Fast sites that turn traffic into enquiries",
    summary:
      "Websites, landing pages, SEO and ongoing maintenance — built to load quickly, rank properly and capture leads cleanly.",
    icon: "Globe",
    tone: "accent",
    hero: {
      heading: "Before the *site visit*, they visit your *site*",
      subheading:
        "Before someone visits the property, they’ve already seen the price, floor plans, and amenities. We build a digital journey that makes people want to take the next step.",
      ctaLabel: "Let’s build your website",
    },
    note: "Fast sites. Clear journeys. More enquiries.",
    headings: {
      includes: "Every website development includes",
    },
    sections: [
      { title: "Understand the project" },
      { title: "Structure the pages" },
      { title: "Design the interface" },
      { title: "Develop" },
      { title: "Build in SEO" },
      { title: "Test across devices" },
      { title: "Hit Launch" },
    ],
    deliverables: [
      "Website Design & Development",
      "Campaign Landing Pages",
      "Hosting setup",
      "On-page SEO & schema markup",
      "Monthly maintenance",
    ],
    cta: {
      heading: "Get a free page speed teardown.",
      body: "Send us your current URL. We'll return a plain-English report on what's slowing it down and what's costing you enquiries.",
      label: "Request a site teardown",
    },
    relatedCategories: ["featured-websites"],
    seo: {
      title: "Website Development",
      description:
        "Fast, responsive websites, campaign landing pages, on-page SEO and ongoing maintenance. Built on WordPress or Next.js with hosting fully configured.",
      keywords: [
        "website development agency",
        "landing page development",
        "website SEO services",
        "wordpress development",
        "website maintenance",
      ],
    },
  },

  {
    slug: "performance-marketing",
    name: "Performance Marketing",
    tagLabel: "Performance\nMarketing",
    tagline: "Spend that reports for itself",
    summary:
      "Meta and Google campaigns planned, run and optimised against cost per qualified lead — on your ad account, with your data.",
    icon: "TrendingUp",
    tone: "brand",
    hero: {
      heading: "Every rupee pushes the buyer to your site",
      subheading:
        "We build and optimise Meta and Google campaigns around what actually matters in real estate: qualified enquiries and genuine site visits.",
    },
    note: "Because “boost post” is not a strategy.",
    headings: {
      process: "How Performance Marketing works here",
    },
    sections: [
      { title: "Find The Right People" },
      { title: "Plan The Spend" },
      { title: "Build The Campaigns" },
      { title: "Track The Action" },
      { title: "Watch What Works" },
      { title: "Make The Money Smarter" },
    ],
    deliverables: [
      "Media plan with phased budget allocation",
      "Meta and Google campaign build",
      "Pixel, CAPI and conversion tracking setup",
      "Weekly optimisation and creative testing",
      "Keyword and audience research sheets",
      "Monthly report on cost per qualified lead",
    ],
    cta: {
      heading: "Get a free ad account audit.",
      body: "Give us read access to your Meta or Google account and we'll come back with the three things costing you the most money right now.",
      label: "Request an ad audit",
    },
    relatedCategories: ["featured-posts", "featured-websites"],
    seo: {
      title: "Performance Marketing — Meta & Google Ads",
      description:
        "Meta and Google Ads planned, run and optimised against cost per qualified lead. Transparent budgets, your own ad account, honest monthly reporting.",
      keywords: [
        "performance marketing agency",
        "meta ads management",
        "google ads agency",
        "lead generation ads",
        "real estate lead generation",
      ],
    },
  },
];

/** Lookup used by `/services/[service]` and the API routes. */
export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceSlugs = services.map((service) => service.slug);

/** Label lookup for lead records and admin tables. */
export const serviceNames: Record<ServiceSlug | "general", string> = {
  "social-media-marketing": "Social Media Marketing",
  branding: "Branding",
  "property-shooting-editing": "Shoots, Films & Drone",
  "website-app-development": "Website Development",
  "performance-marketing": "Performance Marketing",
  general: "General enquiry",
};
