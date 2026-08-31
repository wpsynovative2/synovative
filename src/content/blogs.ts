import type { BlogPost } from "@/types";

/**
 * Seed blog posts. `body` uses a tiny subset of Markdown rendered by
 * `components/blog/post-body.tsx`: `## heading`, `> quote`, `- bullet`,
 * `**bold**` and blank-line-separated paragraphs.
 */
export const posts: BlogPost[] = [
  {
    id: "b-cost-per-lead",
    slug: "cost-per-lead-is-lying-to-you",
    title: "Your cost per lead is lying to you",
    excerpt:
      "A ₹200 lead that never picks up the phone is more expensive than a ₹900 lead that books a site visit. Here is how to measure the number that actually matters.",
    coverImage: "synovative/blog/cost-per-lead",
    author: { name: "Priya Nair", role: "Head of Performance" },
    category: "Performance",
    tags: ["performance marketing", "meta ads", "lead generation"],
    publishedAt: "2026-08-12",
    readingMinutes: 6,
    status: "published",
    body: `Every real-estate marketer has been shown a dashboard with a triumphant cost per lead on it. And most of those dashboards are measuring the wrong thing.

## The number everyone reports

Cost per lead is spend divided by form fills. It is easy to calculate, easy to move, and easy to game. Loosen the targeting, run a lead form with two fields, offer a discount that does not exist, and you can halve it by Friday.

What you have actually bought is a longer list of people who will not answer the phone.

## The number that matters

**Cost per qualified lead** is spend divided by the leads your sales team would call twice. Getting to it requires one uncomfortable step: someone has to mark, every week, which leads were real.

- Did they answer?
- Did they know which project they enquired about?
- Are they inside the budget band?
- Did they book a site visit?

That is it. Four questions, a shared sheet, ten minutes a week.

## What changes when you measure it

On a Naigaon launch we ran last year, the raw cost per lead was ₹118 — genuinely excellent by any benchmark. The cost per lead that booked a site visit was ₹340. Meanwhile a "worse" campaign sat at ₹260 raw and ₹295 qualified.

The second campaign was nearly twice as efficient. The dashboard said it was losing.

> If your reporting cannot tell those two campaigns apart, your optimisation is guesswork with good graphic design.

## How to set it up this week

Push your lead source into the CRM with the campaign name attached. Have sales mark a single qualified yes-or-no field within 48 hours. Feed that back to Meta as an offline conversion so the algorithm optimises towards it rather than towards form fills.

It takes about two hours to wire up, and it changes every budget decision you make afterwards.`,
  },
  {
    id: "b-reel-first-second",
    slug: "the-first-one-point-five-seconds",
    title: "The first 1.5 seconds decide the other 28",
    excerpt:
      "Reel retention graphs are brutally consistent: if you survive the first second and a half, you keep most of the audience. Here is what we changed to survive it.",
    coverImage: "synovative/blog/reel-hooks",
    author: { name: "Sneha Rao", role: "Content Strategist" },
    category: "Social",
    tags: ["reels", "content strategy", "social media"],
    publishedAt: "2026-07-28",
    readingMinutes: 5,
    status: "published",
    body: `Pull up the retention graph on any reel you have posted. There is a cliff at the start and then a gentle slope. Almost everything that determines a reel's reach happens on that cliff.

## What the cliff actually is

Viewers are not deciding whether your content is good. They are deciding whether it is *for them*, and they are deciding it before they have consciously read anything. Motion, a face, a legible line of text, or a recognisable place — one of those has to land immediately.

## Four things that moved our numbers

- **Open on the subject, not the establishing shot.** The drone push-in is beautiful and it belongs at second nine, not second zero.
- **Put the promise in text on frame one.** Not a title card. Text over the first shot, large enough to read on a phone at arm's length.
- **Cut the run time before you cut anything else.** We took a hospitality client's reels from 45 seconds to 22 and completion rate tripled. Same footage.
- **Say the location out loud.** In real estate, geography is the qualifier. "Naigaon" in the first line filters the audience better than any targeting setting.

## What did not work

Trending audio, used mechanically. Adding a hook line to a video that was structurally slow. Faster cuts on the same boring opening shot. None of it survived a fair test.

> The hook is not a decoration on top of the video. It is the first design decision, made before the shoot.

## Test it properly

Run three hooks against the same body edit, same spend, same day. You will usually see a clear winner within 48 hours, and the gap is rarely subtle — two-to-one on completion rate is common.`,
  },
  {
    id: "b-logo-one-centimetre",
    slug: "if-it-fails-at-one-centimetre",
    title: "If it fails at one centimetre, it has failed",
    excerpt:
      "Most logos are approved on a 27-inch monitor and then spend their life at the size of a thumbnail. A simple test that catches the problem before it ships.",
    coverImage: "synovative/blog/logo-test",
    author: { name: "Aditi Menon", role: "Creative Director" },
    category: "Branding",
    tags: ["branding", "logo design", "identity"],
    publishedAt: "2026-07-09",
    readingMinutes: 4,
    status: "published",
    body: `A logo gets presented full-screen on a big monitor. Everyone nods. Then it lives its actual life at 32 pixels on a browser tab, embossed on a pen, and stitched into a polo shirt.

## The test

Print it at one centimetre wide. In black only. On a cheap office printer.

If you cannot tell what it is, it does not work — no matter how good the presentation was.

## What usually breaks

- **Thin strokes.** They vanish in print and disappear entirely in embroidery.
- **Tight counters.** The holes in letters like a, e and o fill in with ink.
- **Gradients doing structural work.** If the shape only reads because of a colour transition, it has no shape.
- **Taglines locked to the mark.** At one centimetre the tagline becomes a grey smudge attached to your logo.

## What to deliver instead

Every identity we ship includes a monogram or reduced mark specifically for small sizes, a single-colour version tested in print, and a written minimum size in the guidelines.

> Design the smallest version first. Scaling up is free; scaling down is where identities die.

That order costs nothing at the start of a project and saves a redesign eighteen months later, when the client's vendor has already stretched the logo onto a barricade.`,
  },
  {
    id: "b-landing-page-speed",
    slug: "four-seconds-and-they-are-gone",
    title: "Four seconds, and they're gone",
    excerpt:
      "You can buy perfect traffic and still lose it before the page paints. What we check on every landing page before a single rupee of media goes live.",
    coverImage: "synovative/blog/page-speed",
    author: { name: "Vikram Deshpande", role: "Lead Developer" },
    category: "Web",
    tags: ["web development", "core web vitals", "landing pages"],
    publishedAt: "2026-06-21",
    readingMinutes: 5,
    status: "published",
    body: `The campaign is targeted correctly, the creative is strong, the cost per click is fine — and the leads are not there. Nine times out of ten, we find the problem on the landing page rather than in the ad account.

## Test on the phone people actually own

Not your phone. A mid-range Android on throttled 4G. Chrome DevTools will simulate both in about thirty seconds, and the difference from your own device is often three-fold.

## The checklist we run before launch

- **Largest contentful paint under 2 seconds** on that simulated device.
- **Hero image served at the size it displays**, in a modern format, with explicit width and height so nothing jumps.
- **No layout shift after paint.** A form that moves 200ms after you tap it is a lost lead.
- **Form above the fold on a phone**, not below three scrolls of amenities.
- **Fonts self-hosted**, not fetched from a third party mid-render.
- **Tracking loaded after paint**, never before it.

## The one that surprises people

Third-party scripts. A chat widget, two pixels, a heatmap tool and a popup builder will comfortably add three seconds on a mid-range phone. Each one was added by someone reasonable for a reasonable purpose.

> Audit your tag manager the way you audit your ad spend. Both accumulate quietly.

On the Nirvaana micro-site we got largest contentful paint to 0.9 seconds and form conversion landed at 11.2% — roughly triple what the client's previous page managed on the same traffic.`,
  },
  {
    id: "b-drone-permissions",
    slug: "drone-permissions-in-mumbai",
    title: "What flying legally in Mumbai actually involves",
    excerpt:
      "Airspace zones, pilot licensing and site permissions — the practical version, from a unit that files the paperwork every month.",
    coverImage: "synovative/blog/drone-permits",
    author: { name: "Imran Qureshi", role: "Head of Film" },
    category: "Film",
    tags: ["drone", "property videography", "production"],
    publishedAt: "2026-06-03",
    readingMinutes: 6,
    status: "published",
    body: `Most drone footage of Mumbai property was shot without permission. That is fine until a project gets large enough for someone to care, and then it becomes a problem attached to your brand rather than to the freelancer.

## The three things that must be true

- **The pilot is licensed.** A remote pilot certificate from a DGCA-approved training organisation, held by the person actually on the sticks.
- **The drone is registered.** A unique identification number, issued on the Digital Sky platform, physically on the aircraft.
- **The airspace is green.** Mumbai has extensive red and yellow zones around the airports. Yellow needs clearance. Red is a no.

## The one everyone forgets

Site permission. Airspace being legal does not make it legal to fly over a plot you do not control, or over the residential building next door. Get written permission from the developer, and for a populated surround, plan the flight path so you are not over people.

## What it costs in time

For a straightforward green-zone site, the paperwork is about a day and largely a formality. Yellow-zone clearance runs a week or more, and we plan shoot dates around it rather than hoping.

> Budget the permissions into the schedule at briefing. Discovering a yellow zone the morning of the shoot costs a crew day.

## Why bother

Beyond the obvious: insured, licensed shoots mean the footage is usable in paid media without a compliance question, and a developer's legal team can sign it off without a conversation.`,
  },
  {
    id: "b-agency-brief",
    slug: "how-to-brief-an-agency",
    title: "How to brief an agency so you get what you wanted",
    excerpt:
      "The briefs that produce good work all share four things — and none of them is a longer document.",
    coverImage: "synovative/blog/briefing",
    author: { name: "Rahul Sharma", role: "Founder & CEO" },
    category: "Strategy",
    tags: ["strategy", "agency", "process"],
    publishedAt: "2026-05-16",
    readingMinutes: 4,
    status: "published",
    body: `We have received briefs that were forty slides long and told us nothing, and briefs written in a WhatsApp message that told us everything. Length is not the variable.

## The four things a good brief has

- **One business problem, stated plainly.** "Site visits are down 30% year on year" is a brief. "We need a 360° campaign" is a purchase order.
- **The constraint you are least willing to move.** Budget, deadline, or the thing the promoter will never approve. Tell us the immovable one at the start, not in round three of revisions.
- **What you have already tried.** Especially the failures. We will otherwise spend your money rediscovering them.
- **Who decides.** Not who attends the meeting. Who signs.

## What actively hurts

Solutions dressed as briefs. When a brief specifies the deliverable — "we need eight reels and two hoardings" — you have quietly done the strategy yourself and hired us as production. Sometimes that is genuinely what you want. Be sure that it is.

> Bring us the problem and the constraints. If you bring the answer, you have already limited what you can get back.

## A test

If your brief could be sent to three different agencies and produce three genuinely different approaches, it is a good brief. If it would produce three versions of the same thing, it is a specification.`,
  },
];

export function getPublishedPosts(): BlogPost[] {
  return [...posts]
    .filter((post) => post.status === "published")
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug && post.status === "published");
}

export function getLatestPosts(limit = 3): BlogPost[] {
  return getPublishedPosts().slice(0, limit);
}

/** Same-category posts first, topped up with the most recent, excluding self. */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPost(slug);
  if (!current) return getLatestPosts(limit);

  const others = getPublishedPosts().filter((post) => post.slug !== slug);
  const sameCategory = others.filter((post) => post.category === current.category);
  const rest = others.filter((post) => post.category !== current.category);

  return [...sameCategory, ...rest].slice(0, limit);
}
