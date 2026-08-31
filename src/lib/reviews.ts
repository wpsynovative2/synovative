import "server-only";

import { testimonials as seedTestimonials } from "@/content/team";
import type { Testimonial } from "@/types";

/**
 * Google Business Profile reviews for the home page testimonials.
 *
 * Uses the Places API (New) `places/{id}` endpoint, which returns up to five
 * reviews per place — enough for the testimonial grid. When the API key or
 * place id is missing, or the call fails, the seed testimonials are served
 * instead, so the section never renders empty.
 *
 * Setup:
 *   1. Enable "Places API (New)" in Google Cloud.
 *   2. Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in the environment.
 *   3. Find the place id via the Place ID Finder, or a Text Search call.
 */

interface PlacesReview {
  name?: string;
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; photoUri?: string };
  publishTime?: string;
}

interface PlacesResponse {
  reviews?: PlacesReview[];
}

/** Cached for a day — reviews change slowly and the API is billed per call. */
const REVALIDATE_SECONDS = 86_400;

export async function fetchGoogleReviews(): Promise<Testimonial[] | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          // Field mask is required by the Places API (New) and keeps billing
          // at the cheapest tier by requesting only what we render.
          "X-Goog-FieldMask": "reviews",
        },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );

    if (!response.ok) {
      console.error(`[reviews] Places API returned HTTP ${response.status}`);
      return null;
    }

    const data = (await response.json()) as PlacesResponse;
    if (!data.reviews?.length) return null;

    return data.reviews
      .map((review, index): Testimonial | null => {
        const quote = review.text?.text ?? review.originalText?.text ?? "";
        const author = review.authorAttribution?.displayName;
        // A review with no text is not usable as a testimonial.
        if (!quote.trim() || !author) return null;

        return {
          id: review.name ?? `gbp-${index}`,
          author,
          avatar: review.authorAttribution?.photoUri,
          rating: review.rating ?? 5,
          quote: quote.trim(),
          source: "google",
          publishedAt: review.publishTime ?? new Date().toISOString(),
        };
      })
      .filter((review): review is Testimonial => review !== null);
  } catch (error) {
    console.error("[reviews] failed to fetch Google reviews:", error);
    return null;
  }
}

/** Live GBP reviews when available, otherwise the curated seed set. */
export async function getTestimonials(): Promise<Testimonial[]> {
  return (await fetchGoogleReviews()) ?? seedTestimonials;
}
