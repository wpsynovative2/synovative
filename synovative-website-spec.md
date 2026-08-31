# Project Brief: SYNOVATIVE — 360° Digital Marketing Solution Website

## 1. Overview
Build a full-stack marketing website with an admin panel for **Synovative**, a 360° digital marketing agency.

## 2. Tech Stack
- **Frontend:** Next.js, TypeScript, Tailwind CSS, Three.js
- **Backend:** Firebase (Database + Authentication)
- **Storage:** Cloudinary (images, videos, media assets)

## 3. Brand Colors
- Primary: `#faac37` (amber/gold)
- Secondary: `#5f3ca7` (purple)
- Additional supporting colors may be introduced as needed for contrast, states, and accents.

## 4. Typography
Select modern, professional web-safe font pairing (e.g., a strong display font for headings + a clean sans-serif for body text). Optimize for readability and brand tone (bold, creative, professional).

## 5. Global Requirements
- **Dark/Light mode toggle** in the navbar
- **On-page SEO** across all pages (meta titles, descriptions, OG tags, canonical URLs)
- **Structured data (JSON-LD schema)**: Organization, LocalBusiness, BreadcrumbList, Article (for blogs), FAQPage (contact page), JobPosting (career page)
- **Automatic blog indexing**: sitemap.xml, robots.txt, and mechanisms to notify Google of new blog posts (e.g., IndexNow / Google Indexing API) so blogs are crawled and indexed automatically on publish
- Fully responsive across mobile, tablet, and desktop

---

## 6. Site Navigation (Navbar)
1. Logo → links to Home
2. About Us
3. Services (dropdown containing: Social Media Marketing, Branding, Property Shooting & Editing, Performance Marketing, Website & Mobile App Development)
4. Portfolio
5. Career
6. Blogs
7. Contact Us
8. Dark/Light mode toggle button

---

## 7. Public Pages

### 7.1 Home (`/`)
1. Hero Section
2. About Company (short overview)
3. Our Services (grid/preview of all 5 service offerings)
4. Featured Projects (organized by category)
5. Latest Blogs (card layout)
6. Testimonials — fetched from Google Business Profile (GBP) reviews, displayed as cards
7. Contact Info + Contact Form

### 7.2 About Us (`/about`)
1. Hero Section (short intro + description)
2. About Company (detailed)
3. CEO Section
4. Team Section
5. Our Working Process
6. Company Timeline (2019 → 2026)

### 7.3 Service Pages (`/services/[service]`)
Common structure for all 5 service pages:
1. Hero Section (service-specific visuals/messaging)
2. Featured Projects related to this service
3. CTA Section (encouraging users to inquire/book the service)
4. Additional supporting sections (structured per service — see below)
5. Contact Info + Contact Form

**A. Social Media Marketing** (`/services/social-media-marketing`)
- Overview
- Content Strategy
- Reel Production
- Creative Design
- Brand Visibility
- Audience Growth Strategy
- Case Studies
- CTA

**B. Branding** (`/services/branding`)
- Why Branding Matters
- Services: Brochure Design, Site Branding, Logo Design, Banner & DOOH Advertising, Pamphlets & Newspaper Inserts
- Branding Portfolio

**C. Property Shooting & Editing** (`/services/property-shooting-editing`)
- Services: Drone Aerial Videos, Influencer Shoots, Brand Awareness Videos, Video Editing
- Sample Videos (embedded YouTube)
- Before / After Showcase

**D. Website & Mobile App Development** (`/services/website-app-development`)
- Services: Website Design, Landing Page Development, Website SEO, Website Maintenance
- Technologies Used: WordPress, Hosting

**E. Performance Marketing** (`/services/performance-marketing`)
- Services: Meta Ads, Google Ads, Budget Management & Optimization, Audience Targeting, Keyword Research
- Ad Results / ROI Case Studies

### 7.4 Portfolio (`/portfolio`)
1. Hero Section (showcasing company portfolio)
2. All Projects, organized by category
3. About Company (brief)
4. Our Office Tour
5. Additional sections as appropriate (e.g., client logos, awards/recognition, process highlights)

### 7.5 Career (`/career`)
1. Hero Section (short description of working at Synovative)
2. All Job Postings (cards)
3. Contact Info + Application Form (for candidates)

### 7.6 Blogs (`/blogs`)
1. Hero Section (basic)
2. All Blog Cards (sorted by date/time)
3. CTA Section

### 7.7 Single Blog Page (`/blogs/[slug]`)
- Opens when a blog card is clicked
- Full blog content, author info, publish date, related posts
- SEO metadata + Article schema per post

### 7.8 Contact Us (`/contact`)
1. Hero Section (basic)
2. Office Location (embedded Google Map)
3. Contact Details (phone, email, address, socials)
4. Contact Form
5. FAQs (with FAQPage schema)

---

## 8. Admin Panel (`/admin`)
1. **Login** — Firebase Authentication
2. **Dashboard** — overview/analytics summary
3. **Leads** — manage form submissions from Home/Contact/Service pages
4. **Job Postings & Applications** — create/edit job posts, view candidate applications
5. **Projects** — manage portfolio/featured projects (create, edit, categorize, upload media via Cloudinary)

---

## 9. Data & Integrations Summary
- **Firebase**: authentication (admin login) + database (leads, jobs, applications, projects, blogs)
- **Cloudinary**: storage for images/videos across services, portfolio, blogs
- **Google Business Profile**: pull testimonials/reviews for Home page
- **Google Maps**: embedded map on Contact page
- **YouTube embeds**: sample videos for Property Shooting & Editing page
