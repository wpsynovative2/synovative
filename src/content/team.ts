import type { TeamMember, Testimonial } from "@/types";

/**
 * The team, rendered as playing cards that flip front-to-back on scroll —
 * the "CALL ME CEO" treatment from the theme mockup.
 */
export const team: TeamMember[] = [
  {
    id: "t-rahul",
    name: "Rahul Sharma",
    role: "Founder & CEO",
    photo: "synovative/team/rahul",
    bio: "Thirteen years across brand and performance. Sits in on every kickoff and reads every monthly report before it goes out.",
    suit: "spade",
  },
  {
    id: "t-aditi",
    name: "Aditi Menon",
    role: "Creative Director",
    photo: "synovative/team/aditi",
    bio: "Runs the design floor. Believes a logo that fails at one centimetre has failed, however good the deck looked.",
    suit: "heart",
  },
  {
    id: "t-imran",
    name: "Imran Qureshi",
    role: "Head of Film",
    photo: "synovative/team/imran",
    bio: "Licensed drone pilot and colourist. Has shot more podium reveals than he can count and still plans every shot list.",
    suit: "club",
  },
  {
    id: "t-priya",
    name: "Priya Nair",
    role: "Head of Performance",
    photo: "synovative/team/priya",
    bio: "Media buyer with an allergy to vanity metrics. Will happily turn off a campaign that looks good and converts badly.",
    suit: "diamond",
  },
  {
    id: "t-vikram",
    name: "Vikram Deshpande",
    role: "Lead Developer",
    photo: "synovative/team/vikram",
    bio: "Builds the sites the campaigns land on. Treats Core Web Vitals as a launch blocker, not a nice-to-have.",
    suit: "spade",
  },
  {
    id: "t-sneha",
    name: "Sneha Rao",
    role: "Content Strategist",
    photo: "synovative/team/sneha",
    bio: "Writes the calendars and the hooks. Can explain why the first 1.5 seconds of a reel decide the other 28.",
    suit: "heart",
  },
];

/**
 * Fallback testimonials. When `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID`
 * are configured, `lib/reviews.ts` replaces these with live Google Business
 * Profile reviews.
 */
export const testimonials: Testimonial[] = [
  {
    id: "r-1",
    author: "Mahesh Patil",
    role: "Director, Dhyan Siddhi Realty",
    rating: 5,
    quote:
      "We had run campaigns with three agencies before this. Synovative is the first one that showed us the numbers we did not want to see. Cost per site visit dropped by more than half in a quarter.",
    source: "google",
    publishedAt: "2025-11-04",
  },
  {
    id: "r-2",
    author: "Fatima Shaikh",
    role: "Marketing Head, JMS Group",
    rating: 5,
    quote:
      "The drone films changed how our sales team pitches. Buyers understand the location in thirty seconds instead of ten minutes of explaining.",
    source: "google",
    publishedAt: "2025-09-18",
  },
  {
    id: "r-3",
    author: "Anand Kulkarni",
    role: "Partner, Centenary Developers",
    rating: 5,
    quote:
      "Brochure, hoarding and site branding all came from one team and finally matched. Sounds obvious. Took us four years and three vendors to get there.",
    source: "google",
    publishedAt: "2025-07-22",
  },
  {
    id: "r-4",
    author: "Reshma Iyer",
    role: "GM, Coastline Hospitality",
    rating: 5,
    quote:
      "They turned off two campaigns we were emotionally attached to and our bookings went up. Honest to a fault, which is exactly what we were paying for.",
    source: "google",
    publishedAt: "2025-05-30",
  },
  {
    id: "r-5",
    author: "Nikhil Bhatt",
    role: "Founder, Urban Roots Retail",
    rating: 5,
    quote:
      "The micro-site loaded faster than our old homepage did on wifi, on a phone, on 4G. That alone paid for the project.",
    source: "google",
    publishedAt: "2025-03-11",
  },
];
