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
    tagLabel: "Social Media\nMarketing",
    tagline: "Show up daily, sound like yourself",
    summary:
      "Strategy, content calendars, reels and community management that keep a brand present without turning it into noise.",
    icon: "Megaphone",
    tone: "brand",
    hero: {
      heading: "Feeds people actually stop for.",
      subheading:
        "We plan, shoot, edit and publish a month of content at a time — so your brand shows up every day with one voice instead of whatever fits before the deadline.",
    },
    sections: [
      {
        title: "Overview",
        body: "Most brands do not have a content problem, they have a consistency problem. We fix that with a monthly cycle: one strategy session, one production day, thirty days of scheduled output. Everything is written, shot and edited by the same small team, so the fifteenth post sounds like the first.",
      },
      {
        title: "Content Strategy",
        body: "Before anything is produced we map your audience, the three or four things you are actually trying to say, and the formats that carry them. The output is a content pillar document and a rolling 30-day calendar you can see and approve in advance.",
        bullets: [
          "Audience and competitor audit",
          "Content pillars and tone-of-voice guide",
          "Rolling 30-day calendar, approved in advance",
          "Hook and caption library built for your category",
        ],
      },
      {
        title: "Reel Production",
        body: "Short-form is where attention is, and it is unforgiving of half-effort. Our in-house film unit shoots and cuts reels on a fixed monthly cadence — scripted hooks, clean sound, captions burned in, trend formats adapted rather than copied.",
        bullets: [
          "Scripted hooks written for the first 1.5 seconds",
          "Monthly studio or on-site shoot days",
          "Colour, sound, captions and thumbnails included",
          "Vertical cutdowns for Reels, Shorts and Stories",
        ],
      },
      {
        title: "Creative Design",
        body: "Static still does the heavy lifting for offers, credibility posts and carousels. Every design comes off the same grid and palette as your brand book, so the feed reads as one surface rather than a pile of templates.",
      },
      {
        title: "Brand Visibility",
        body: "Organic reach alone is not a plan. We pair the calendar with boosted distribution, collaborations, and placement in the communities your buyers already sit in — so consistency compounds instead of plateauing.",
      },
      {
        title: "Audience Growth Strategy",
        body: "Followers are a vanity number unless they convert. We track saves, shares, profile visits and DMs as the real leading indicators, and adjust the calendar monthly against them. Growth targets are set with you and reported honestly.",
        bullets: [
          "Saves, shares and profile visits as primary KPIs",
          "Monthly report with what we are changing and why",
          "Community management and DM response playbook",
          "Quarterly strategy resets against results",
        ],
      },
      {
        title: "Case Studies",
        body: "A Mira Road residential launch went from 900 to 14,000 followers in five months on a purely organic calendar plus ₹40,000 of boosting, producing 260 qualified site-visit enquiries. A hospitality client tripled reel completion rate by cutting run time from 45 to 22 seconds.",
      },
    ],
    deliverables: [
      "Monthly content strategy and approved calendar",
      "12–20 static designs per month",
      "6–10 produced reels per month",
      "Story sequences and highlight covers",
      "Community management and DM handling",
      "Monthly performance report",
    ],
    cta: {
      heading: "Let's fill next month's calendar.",
      body: "Send us your handle and we'll come back with a free audit of your last 30 posts — what's working, what isn't, and what we'd do differently.",
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
      heading: "Built to be recognised at 100 metres.",
      subheading:
        "A brand is not a logo file. It is the system that keeps a hoarding, a brochure and an Instagram post looking like the same company — and we build the whole system.",
    },
    sections: [
      {
        title: "Why Branding Matters",
        body: "In real estate and hospitality, the buyer meets your brand a dozen times before they meet a person. A hoarding on the highway, a newspaper insert, a brochure at the site office, an ad in the feed. If those four look like four different companies, every impression starts from zero instead of adding up. Branding is what makes them add up.",
      },
      {
        title: "Logo Design & Identity",
        body: "We design marks that work in one colour, at one centimetre, and under a bad printer — because that is where most logos fail. Every identity ships with a usage guide covering clear space, minimum sizes, colour breakdowns for print and screen, and the type system that goes with it.",
        bullets: [
          "Primary, secondary and monogram lockups",
          "CMYK, RGB, Pantone and single-colour variants",
          "Typography system and hierarchy rules",
          "Written usage guidelines your vendors can follow",
        ],
      },
      {
        title: "Brochure Design",
        body: "Property brochures do the closing when nobody from your team is in the room. We handle the full production: information architecture, copy, floor-plan redraws, renders, paper stock recommendations and print-ready artwork with bleed and crop marks checked.",
      },
      {
        title: "Site Branding",
        body: "Everything that dresses the physical project — entry arches, site hoardings, safety barricades, sample-flat graphics, signage and wayfinding. Designed to spec, supplied as print-ready files, and colour-matched so the site reads as one piece.",
      },
      {
        title: "Banner & DOOH Advertising",
        body: "Hoardings, gantries, digital screens and transit media. Large-format demands its own rules: three-second legibility, high-contrast hierarchy, and artwork built at the right resolution for the viewing distance rather than scaled up and hoped for.",
        bullets: [
          "Highway hoardings and unipoles",
          "Digital out-of-home motion creative",
          "Mall, transit and society media",
          "Resolution and legibility checked per placement",
        ],
      },
      {
        title: "Pamphlets & Newspaper Inserts",
        body: "Still the cheapest qualified reach in a launch radius. We design inserts and pamphlets against the constraints that actually matter — newsprint dot gain, single-colour runs, and the fold sequence — and coordinate directly with your printer on specs.",
      },
      {
        title: "Branding Portfolio",
        body: "Our identity work spans residential launches, hospitality groups and retail. Scroll the featured projects below for the full range, from single logo engagements to complete launch identities covering print, site and digital.",
      },
    ],
    deliverables: [
      "Logo suite and full identity system",
      "Written brand usage guidelines",
      "Print-ready brochure artwork",
      "Site branding and signage pack",
      "Hoarding and DOOH creative",
      "Newspaper insert and pamphlet design",
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
    name: "Property Shooting & Editing",
    tagLabel: "Property\nShot & Edit",
    tagline: "Film that sells the space, not the camera",
    summary:
      "Drone aerials, walkthrough films, influencer shoots and post-production, produced end-to-end by our in-house film unit.",
    icon: "Camera",
    tone: "brand",
    hero: {
      heading: "Make people feel the space before they visit it.",
      subheading:
        "Drone aerials, walkthroughs, influencer collaborations and brand films — scripted, shot and cut by the same in-house unit, so nothing is lost between the shoot and the edit.",
    },
    sections: [
      {
        title: "Drone Aerial Videos",
        body: "Aerials do one job better than any other format: they show context. The distance to the highway, the view from the eleventh floor, the size of the podium. We fly licensed pilots, plan shot lists against your actual selling points, and deliver stabilised, colour-graded footage in every aspect ratio you need.",
        bullets: [
          "Licensed pilots and permitted airspace planning",
          "Site context, elevation reveal and view-line shots",
          "4K source, stabilised and colour-graded",
          "16:9, 9:16 and 1:1 deliverables from one shoot",
        ],
      },
      {
        title: "Influencer Shoots",
        body: "We handle the whole collaboration: shortlisting creators whose audience actually overlaps with your buyer, negotiating deliverables, running the shoot day on site, and making sure the disclosure and brand-safety terms are right before anything publishes.",
      },
      {
        title: "Brand Awareness Videos",
        body: "Longer-form films for launches, developer credibility and hospitality positioning. Scripted with you, storyboarded before the shoot day, and cut in versions — a 90-second hero film plus the 30, 15 and 6-second cutdowns that the media plan actually needs.",
        bullets: [
          "Script and storyboard approved before the shoot",
          "Professional lighting, audio and gimbal work",
          "Hero film plus a full set of paid-media cutdowns",
          "Voiceover, subtitling and music licensing handled",
        ],
      },
      {
        title: "Video Editing",
        body: "Post-production as a standalone service too, if you already have footage. Colour grading, sound design, motion graphics, floor-plan animation and subtitling. We work from your raw files and return graded masters plus platform-ready exports.",
      },
      {
        title: "Sample Videos",
        body: "The films below are cut from recent residential and hospitality projects. Each one was shot, graded and delivered by the in-house unit — no outsourced production.",
      },
      {
        title: "Before / After",
        body: "Grading and clean-up change how a space reads more than most people expect. Drag the sliders in the showcase below to compare the raw camera file against the delivered master on real project footage.",
      },
    ],
    deliverables: [
      "Licensed drone aerial coverage",
      "Scripted walkthrough and brand films",
      "Influencer shoot production and coordination",
      "Colour grading and sound design",
      "Floor-plan and motion-graphic animation",
      "Platform cutdowns in every aspect ratio",
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
    name: "Website & Mobile App Development",
    tagLabel: "Website\nDevelopment",
    tagline: "Fast sites that turn traffic into enquiries",
    summary:
      "Websites, landing pages, SEO and ongoing maintenance — built to load quickly, rank properly and capture leads cleanly.",
    icon: "Globe",
    tone: "accent",
    hero: {
      heading: "The page your ads land on decides everything.",
      subheading:
        "You can buy perfect traffic and still lose it in four seconds. We build sites and landing pages that load fast, read clearly on a phone, and put the enquiry form where people will actually use it.",
    },
    sections: [
      {
        title: "Website Design & Development",
        body: "Corporate sites, project micro-sites and hospitality bookings — designed and built to your brand system rather than a bought template. Everything ships responsive, accessible, and wired to analytics so you can see where visitors stall.",
        bullets: [
          "Responsive across phone, tablet and desktop",
          "Core Web Vitals treated as a launch requirement",
          "Accessible markup and keyboard navigation",
          "Analytics and conversion tracking configured",
        ],
      },
      {
        title: "Landing Page Development",
        body: "Campaign pages built for one job: convert the traffic the media plan is sending. Single message, visible form, fast load on a mid-range phone over 4G, and A/B variants set up from day one so the page improves while it runs.",
      },
      {
        title: "Website SEO",
        body: "On-page SEO done properly at build time rather than bolted on later — title and meta structure, heading hierarchy, structured data, image optimisation, internal linking and a clean sitemap. Plus technical fixes, indexing monitoring and content recommendations after launch.",
        bullets: [
          "Keyword research and page-level mapping",
          "Titles, meta descriptions and OG tags",
          "Schema markup and automatic sitemap generation",
          "Search Console setup and indexing monitoring",
        ],
      },
      {
        title: "Website Maintenance",
        body: "Sites rot quietly. Our maintenance retainer covers core and plugin updates, security patching, off-site backups, uptime monitoring and a monthly content-update allowance, so problems are found by us and not by your buyers.",
      },
      {
        title: "Technologies We Use",
        body: "WordPress where you need your own team editing content daily, and Next.js where speed and custom functionality matter more. Hosting, SSL, CDN, domain and email configuration are all set up and documented as part of the handover — nothing is left as a mystery for the next vendor.",
        bullets: [
          "WordPress for content-led sites",
          "Next.js and React for custom builds",
          "Managed hosting, SSL and CDN configuration",
          "Documented handover with full credentials",
        ],
      },
    ],
    deliverables: [
      "Design system and page templates",
      "Responsive, accessible front-end build",
      "Campaign landing pages with A/B variants",
      "On-page SEO and schema markup",
      "Hosting, SSL and CDN setup",
      "Monthly maintenance and backups",
    ],
    cta: {
      heading: "Get a free page speed teardown.",
      body: "Send us your current URL. We'll return a plain-English report on what's slowing it down and what's costing you enquiries.",
      label: "Request a site teardown",
    },
    relatedCategories: ["featured-websites"],
    seo: {
      title: "Website & Mobile App Development",
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
      heading: "Every rupee accounted for.",
      subheading:
        "We plan, run and optimise Meta and Google campaigns against one number that matters: cost per qualified lead. The spend stays on your ad account, and the report tells you the truth.",
    },
    sections: [
      {
        title: "Meta Ads",
        body: "Facebook and Instagram campaigns across the full funnel — reach and video views at the top, lead forms and site conversions at the bottom. Creative is produced in-house against the campaign, so we can test five hooks in a week instead of waiting on a production cycle.",
        bullets: [
          "Full-funnel campaign architecture",
          "Instant Forms and on-site conversion campaigns",
          "Creative testing cycles run weekly",
          "Pixel, CAPI and offline conversion setup",
        ],
      },
      {
        title: "Google Ads",
        body: "Search, Performance Max, Display and YouTube. Search captures the people already looking for what you sell, and it is where most wasted spend hides — so we build tight ad groups, negative keyword lists that are actually maintained, and landing pages matched to intent.",
      },
      {
        title: "Budget Management & Optimisation",
        body: "Budgets are phased, not dumped. We start with a learning allocation across a small set of hypotheses, kill the losers early, and shift spend towards what produces qualified leads. You see the allocation and the reasoning every month, before it changes.",
        bullets: [
          "Phased learning-to-scale budget plan",
          "Weekly optimisation against cost per qualified lead",
          "Spend stays on your own ad account",
          "No hidden percentage cut of media budget",
        ],
      },
      {
        title: "Audience Targeting",
        body: "Custom audiences from your CRM, lookalikes from actual closed buyers rather than all leads, geo-fencing around the site and competing projects, and exclusion lists so you stop paying to reach people who already enquired.",
      },
      {
        title: "Keyword Research",
        body: "Category, competitor, locality and intent-stage keyword mapping, with search volume and realistic cost per click for your city. You get the full sheet — including the keywords we recommend not bidding on, and why.",
      },
      {
        title: "Ad Results & ROI",
        body: "A Naigaon residential launch ran at ₹340 per qualified site-visit enquiry against a category benchmark near ₹900, producing 412 enquiries in one quarter. A hospitality client cut blended cost per booking by 46% in two months, mostly by killing three campaigns rather than adding any.",
      },
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
  "property-shooting-editing": "Property Shooting & Editing",
  "website-app-development": "Website & Mobile App Development",
  "performance-marketing": "Performance Marketing",
  general: "General enquiry",
};
