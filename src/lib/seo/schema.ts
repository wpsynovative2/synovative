import { site } from "@/content/site";
import { absoluteUrl } from "./metadata";
import type { BlogPost, Faq, JobPosting, Service } from "@/types";

/**
 * JSON-LD builders. Each returns a plain object that `<JsonLd>` serialises into
 * a `application/ld+json` script tag. Keeping them here (rather than inline in
 * pages) means the organisation details are stated once and every schema stays
 * consistent with the rest of the site.
 */

const ORGANIZATION_ID = absoluteUrl("/#organization");
const WEBSITE_ID = absoluteUrl("/#website");

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.png"),
    description: site.description,
    foundingDate: site.founded,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs: site.socials.map((social) => social.url),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#localbusiness"),
    name: site.name,
    image: absoluteUrl("/opengraph-image"),
    url: absoluteUrl("/"),
    telephone: site.contact.phone,
    email: site.contact.email,
    priceRange: "₹₹",
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: site.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    sameAs: site.socials.map((social) => social.url),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: site.name,
    description: site.description,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** `trail` is ordered root-first; the current page is the last entry. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": absoluteUrl(`/blogs/${post.slug}#article`),
    headline: post.title,
    description: post.excerpt,
    image: [absoluteUrl(`/blogs/${post.slug}/opengraph-image`)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blogs/${post.slug}`),
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    wordCount: post.body.trim().split(/\s+/).length,
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function jobPostingSchema(job: JobPosting) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: [
      job.description,
      `Responsibilities: ${job.responsibilities.join("; ")}`,
      `Requirements: ${job.requirements.join("; ")}`,
    ].join(" "),
    datePosted: job.postedAt,
    validThrough: job.validThrough,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: site.name,
      sameAs: absoluteUrl("/"),
      logo: absoluteUrl("/icon.png"),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
    },
    ...(job.salaryRange
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: job.salaryRange.currency,
            value: {
              "@type": "QuantitativeValue",
              minValue: job.salaryRange.min,
              maxValue: job.salaryRange.max,
              unitText: job.salaryRange.unit,
            },
          },
        }
      : {}),
    experienceRequirements: job.experience,
    industry: "Marketing and Advertising",
    directApply: true,
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    serviceType: service.name,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: site.address.countryName },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} deliverables`,
      itemListElement: service.deliverables.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };
}
