import type { ProcessStep, Faq } from "@/types";

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
    phone: "096734 39102",
    phoneHref: "+919673439102",
    email: "hello@synovative.com",
    careersEmail: "careers@synovative.com",
  },

  address: {
    street: "Jain Tower, Office No. 26-27 C -Wing Prabhadevi, Anand Nagar",
    locality: "Vasai West, Mumbai",
    region: "Maharashtra",
    postalCode: "401202",
    country: "IN",
    countryName: "India",
  },

  geo: { latitude: 19.3667, longitude: 72.8167 },

  /** Shown wherever opening hours are displayed. */
  hoursLabel: "Mon-Sat, 10:00 - 7:00",

  /** Used by the LocalBusiness schema. */
  openingHours: [
    {
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
  ],

  socials: [
    {
      label: "Instagram",
      url: "https://www.instagram.com/synovative",
      icon: "Instagram",
    },
    {
      label: "Facebook",
      url: "https://www.facebook.com/synovative",
      icon: "Facebook",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/synovative",
      icon: "Linkedin",
    },
    {
      label: "YouTube",
      url: "https://www.youtube.com/@synovative",
      icon: "Youtube",
    },
  ],

  /** Embedded on the contact page. */
  mapEmbedUrl:
    "https://www.google.com/maps?q=Jain+Tower+Anand+Nagar+Vasai+West+Maharashtra+401202&output=embed",
  mapLinkUrl:
    "https://www.google.com/maps/search/?api=1&query=Jain+Tower+Anand+Nagar+Vasai+West+Maharashtra+401202",

  stats: [
    { value: "8+", label: "Years of Synovating" },
    { value: "100+", label: "Happy Clients" },
    { value: "500+", label: "Projects Delivered" },
    { value: "500M+", label: "Impressions Driven" },
  ],
} as const;

/** The full address on one line, as printed in the contact details. */
export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`;

export const homeCopy = {
  about: {
    eyebrow: "Who We Are",
    title: "You’ve reached HOME. Good place to start.",
    body: "Real estate has always been our thing. Your end goal is “SOLD OUT.” Ours is getting you there. The big idea. The tiny detail. The thing that makes someone stop scrolling. The thing that gets them to enquire. We know about all of it.",
  },
  services: {
    eyebrow: "What We Do",
    title: "We break the fourth wall and tell the story",
    description:
      "Whether you need one piece or the whole property package, we’re in",
  },
  testimonials: {
    eyebrow: "Not To Brag, But…",
    title: "No copywriter touched these.",
    description:
      "Straight from the people who’ve worked with us, including the ones who made us wince.",
  },
};

export const contactCopy = {
  eyebrow: "Get In Touch",
  heading: "Got a project? A problem? A “hear me out” idea?",
  description:
    "We’re listening. Fill in the form and we’ll take it from there.",
  note: [
    "Prefer to skip the form? Call the agency.",
    "Your brief might meet its match.",
  ],
  promise: "We reply within one working day. Promise.",
};

export const footerCopy = {
  title: "A 360° real estate marketing agency.",
  body: "From the first thought to the final click, we keep every part of your project's story in the same room.",
  signoff: "Made by hand, measured by numbers.",
};

export const aboutCopy = {
  title: "An agency that puts the story in storey.",
  intro:
    "We know real estate has more to it than square feet. We look beyond the elevation, the amenities, and the carpet area to find what makes a project worth talking about, then build the story around it.",
  process: {
    title: "How Synovative works",
    description:
      "A brief tour of what happens before the first hoarding goes up.",
  },
  team: {
    eyebrow: "The Team",
    title: "A full deck",
    description:
      "Hover or scroll a card to see the brains locked in Synovative.",
  },
  fluent: {
    title: "We are fluent in real estate",
    description:
      "No matter what you’re building, we know how to get you buyers",
  },
  cta: {
    eyebrow: "Work with us",
    heading: "Want this team on your brand?",
    body: "Tell us what you’re launching. We’ll bring the ideas, the thinking, and hopefully fewer “luxury redefined”s.",
  },
};

export const ceo = {
  name: "Ammar Azmi",
  role: "Founder & Chief Executive Officer",
  // Cloudinary public id, like every other image reference. Resolving through
  // `cloudinaryUrl` means it falls back to the placeholder before media is
  // uploaded, rather than 404ing against `public/`.
  photo: "synovative/team/ceo",
  quote:
    "If you can’t explain the idea, the numbers, and the why, it’s not ready.",
  bio: [
    "Founded Synovative in 2019.",
    "Has a soft spot for good ideas and brutally honest reports. Keeps strategy, creativity, and performance in the same room.",
  ],
  highlights: [
    "500+ projects in 8+ years.",
    "Countless campaigns.",
    "Still joins brand kickoffs. Yes, all of them.",
    "Personally reviews the work that goes out.",
  ],
  signoff: "Occasionally says, “One more version?”",
};

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "FIRST, WE LOOK AT THE PROJECT",
    body: "The location. The product. The price. The view. The competition.",
    icon: "Building2",
  },
  {
    step: 2,
    title: "THEN, WE LOOK AT THE BUYER",
    body: "Tons of questions, gallons of tea to know the buyer.",
    icon: "Users",
  },
  {
    step: 3,
    title: "THEN, WE FIND THE STORY",
    body: "The idea that can travel from the hoarding to the brochure, from Instagram to the site visit.",
    icon: "Lightbulb",
  },
  {
    step: 4,
    title: "THEN, WE MAKE THE THING",
    body: "Campaigns, content, films, websites, ads, and everything else the project needs.",
    icon: "Scissors",
  },
  {
    step: 5,
    title: "THEN, WE LOOK AT THE NUMBERS.",
    body: "Because a pretty campaign is nice. A campaign that moves enquiries is nicer.",
    icon: "TrendingUp",
  },
];

/** The property types on the About page's "fluent in real estate" grid. */
export const realEstateTypes = [
  {
    title: "HOMES",
    body: "Apartments, luxury homes, villas, second homes",
    icon: "Home",
  },
  {
    title: "COMMERCIAL",
    body: "Offices, shops, showrooms, business spaces",
    icon: "Store",
  },
  {
    title: "INDUSTRIAL",
    body: "Galas, sheds, warehouses, industrial estates",
    icon: "Factory",
  },
  {
    title: "PLOTS",
    body: "Residential plots, NA plots, township plots",
    icon: "Map",
  },
  {
    title: "TOWNSHIPS",
    body: "Large-scale and integrated developments",
    icon: "Building2",
  },
  {
    title: "HOSPITALITY",
    body: "Hotels, resorts, holiday & managed residences",
    icon: "Hotel",
  },
];

export const portfolioCopy = {
  eyebrow: "Portfolio",
  title: "Work we’d happily put on a billboard.",
  intro:
    "A growing collection of projects that made it out of the brainstorming sessions and into the real estate world.",
  team: {
    eyebrow: "Who made all that?",
    title: "One team. Many tabs open.",
    description:
      "Strategists, writers, designers, filmmakers, and media minds who spend a suspicious amount of time asking, “But what makes this project different?”",
  },
};

export const blogsCopy = {
  eyebrow: "Blogs",
  title: "Notes from people who stare at property all day",
  intro:
    "What we’re noticing across projects, markets, campaigns, buyers and the business of making real estate worth noticing.",
  cta: {
    eyebrow: "LIKE WHAT YOU READ?",
    heading: "Good. Now give us a brief.",
    body: "Tell us what you’re working on. We’ll tell you what we’d do with it.",
    label: "Start a project",
  },
};

export const contactPageCopy = {
  eyebrow: "Contact",
  title: "Your project. Our two cents.",
  intro:
    "Send us the brief. The floor plan. The half-baked idea. We’ll take it from there.",
  findUs: { eyebrow: "Find Us", title: "Come by. We’ll put the kettle on." },
  faq: {
    eyebrow: "Before you write",
    title: "Questions we get asked a lot",
    description: "Answered plainly. No jargon, no mysterious agency language.",
  },
};

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
  eyebrow: "Career",
  heading: "Bring your ideas to the site.",
  intro:
    "If you’ve got a head full of ideas and a healthy dislike for average, there’s probably a spot for you here.",
  perks: [
    {
      title: "GOOD IDEAS GET HEARD",
      body: "We always appreciate the best thought in the room, whether it comes from the intern or the person running the room.",
    },
    {
      title: "BRING YOUR “WHAT IF?”",
      body: "We like people who can look at the obvious answer and wonder if there’s a better one.",
    },
    {
      title: "YOUR WORK GETS OUT",
      body: "Campaigns launch. Films go live. Websites get visited. The work actually goes somewhere.",
    },
    {
      title: "HOURS YOU ENJOY",
      body: "Because good ideas come easier when you’re having a good time.",
    },
  ],
  openings: {
    eyebrow: "Open Roles",
    title: "Come be part of the plot.",
    description:
      "Your next career move has a floor plan; consider this your site visit.",
  },
  apply: {
    eyebrow: "Apply",
    title: "Show us what you’ve got.",
    body: "A portfolio, a project, a campaign, a particularly good piece of work. We’ll take a look at anything that shows us how you think.",
    note: [
      { label: "FOUND YOUR ROLE?", text: "Go for it." },
      {
        label: "DIDN’T?",
        text: "Send us your work anyway. We’ll figure it out.",
      },
    ],
  },
};
