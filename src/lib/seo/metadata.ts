import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * One place that knows how a Synovative page describes itself.
 *
 * Every route calls `buildMetadata` rather than hand-writing a `Metadata`
 * object, so titles, canonicals, OG and Twitter cards stay consistent and no
 * page can quietly ship without them.
 */

export const SITE_URL = site.url.replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

interface BuildMetadataInput {
  title: string;
  description: string;
  /** Site-relative path, used for the canonical and OG URLs. */
  path: string;
  keywords?: string[];
  /** Absolute or site-relative image URL for the OG/Twitter card. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image?.startsWith("http") ? image : absoluteUrl(image ?? "/opengraph-image");

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(type === "article" ? { publishedTime, modifiedTime, authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
