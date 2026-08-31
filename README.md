# Synovative

Marketing site and admin panel for **Synovative**, a 360° digital marketing
agency. Built as a papercraft theme — torn paper edges, taped-down prints,
hanging luggage tags and playing cards — in brand purple `#5f3ca7` and amber
`#faac37`.

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · Firebase ·
Cloudinary.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

**The site runs with no configuration at all.** Content falls back to the seed
data in `src/content`, images fall back to an inline SVG placeholder, and forms
accept submissions and log them to the server console. Configure the
environment only when you want real persistence and the admin panel.

```bash
cp .env.example .env.local
```

Every variable is documented in `.env.example`.

## Structure

```
src/
├── app/
│   ├── (site)/              Public site — shares navbar, footer and site schema
│   │   ├── page.tsx         Home
│   │   ├── about/
│   │   ├── services/        Index + [service] (5 pages, prerendered)
│   │   ├── portfolio/
│   │   ├── career/
│   │   ├── blogs/           Index + [slug]
│   │   └── contact/
│   ├── admin/
│   │   ├── login/           Firebase email/password sign-in
│   │   └── (dashboard)/     Session-guarded: dashboard, leads, jobs, projects
│   ├── api/
│   │   ├── leads/           Enquiry submissions
│   │   ├── applications/    Candidate applications
│   │   ├── indexing/        Revalidate + notify search engines
│   │   └── admin/session/   ID token → httpOnly session cookie
│   ├── layout.tsx           Fonts, metadata defaults, no-flash theme script
│   ├── globals.css          Design tokens and paper primitives
│   ├── sitemap.ts           robots.ts, not-found.tsx, error.tsx alongside
│   └── ...
├── components/
│   ├── paper/               Torn edges, sheets, tape, tags, flip cards, doodles
│   ├── sections/            Heroes, cards, testimonials, CTA, contact block
│   ├── layout/              Navbar, footer, logo, theme toggle
│   ├── forms/               Fields, lead form, application form
│   ├── blog/                Post body renderer
│   ├── admin/               Admin shell primitives
│   ├── seo/                 JSON-LD serialiser
│   └── ui/                  Buttons, icon resolver, social marks
├── content/                 Seed content: site, services, projects, blogs,
│                            team, jobs — edit these to change copy
├── lib/
│   ├── firebase/            Client SDK, Admin SDK, repository layer
│   ├── seo/                 Metadata builder, JSON-LD schemas, IndexNow
│   ├── auth/                Admin session verification
│   ├── cloudinary.ts        Delivery URL building
│   ├── reviews.ts           Google Business Profile reviews
│   └── utils.ts
└── types/                   Domain model shared across the app
```

`design/` holds the source theme PDF and reference mockups. It is gitignored —
those files are large and are not shipped.

## How data works

Every page reads through `src/lib/firebase/collections.ts`. Each reader tries
Firestore first and falls back to `src/content` when Firebase is unconfigured,
returns nothing, or errors. Pages never need to know which source answered, and
a database outage degrades the site to its last known content rather than
taking it down.

To move content into Firestore, create collections named `projects`, `posts`,
`jobs` and `testimonials` with documents matching the interfaces in
`src/types/index.ts`. They take over automatically.

## SEO

- Per-page metadata through `buildMetadata()` — canonical, OG and Twitter tags
  are generated consistently and no page can ship without them.
- JSON-LD: Organization, LocalBusiness and WebSite site-wide; BreadcrumbList on
  every page; Article per blog post; FAQPage on contact; JobPosting per role;
  Service per service page.
- `sitemap.ts` covers static routes, all five services, every published post and
  every open job, revalidating hourly.
- `robots.ts` disallows `/admin` and `/api`.

### Automatic indexing on publish

`POST /api/indexing` revalidates the affected paths and notifies search engines.

```bash
curl -X POST https://synovative.com/api/indexing \
  -H "Content-Type: application/json" \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" \
  -d '{"paths":["/blogs/my-new-post","/blogs"]}'
```

It pings **IndexNow** (Bing, Yandex, Seznam, Naver) when `INDEXNOW_KEY` is set —
also create `public/<key>.txt` containing just the key — and the **Google
Indexing API** when `GOOGLE_INDEXING_ENABLED=true`. Both are best-effort: a
failed notification is logged and never fails the publish.

## Admin panel

`/admin` is protected by a Firebase session cookie. The browser signs in with
the client SDK, posts the ID token to `/api/admin/session`, and receives an
httpOnly cookie that every server render verifies against Firebase — including
revocation, so disabling an account signs it out immediately.

Access is limited to the addresses in `ADMIN_EMAILS`. An empty allowlist locks
the panel rather than opening it.

To create the first admin: add a user in Firebase console → Authentication →
Users, then add that address to `ADMIN_EMAILS`.

## Theming

Colours, type and shadows are CSS custom properties in `src/app/globals.css`,
exposed to Tailwind through `@theme inline`. Dark mode is a `.dark` class on
`<html>`, applied before first paint by an inline script so there is no flash.

Paper texture, torn edges, tape, sticky notes and the reveal animation are all
CSS and inline SVG — no images, no animation library.

## Scripts

```bash
npm run dev      # Turbopack dev server
npm run build    # Production build
npm run start    # Serve the production build
npm run lint     # ESLint
```
