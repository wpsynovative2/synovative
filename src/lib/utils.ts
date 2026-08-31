import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, with later Tailwind utilities winning. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(value: string | Date, opts?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...opts,
  }).format(new Date(value));
}

export function formatDateTime(value: string | Date) {
  return formatDate(value, { hour: "2-digit", minute: "2-digit" });
}

export function formatCurrency(amount: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Rough reading time, used when a post is created from the admin panel. */
export function readingMinutes(body: string) {
  return Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));
}

export function truncate(value: string, max: number) {
  return value.length <= max ? value : `${value.slice(0, max - 1).trimEnd()}…`;
}

/**
 * Deterministic pseudo-random in [0, 1) from a string seed.
 *
 * The paper theme scatters cards at slightly different angles. Using
 * `Math.random()` for that would produce different values on the server and the
 * client and trip a hydration mismatch, so tilt is derived from a stable key.
 */
export function seededRandom(seed: string) {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) % 10000) / 10000;
}

/** A small, stable rotation in degrees for a given key. */
export function seededTilt(seed: string, maxDegrees = 2.5) {
  return (seededRandom(seed) * 2 - 1) * maxDegrees;
}

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

/** Accepts Indian mobile numbers with or without +91, spaces or dashes. */
export const isPhone = (value: string) =>
  /^(\+?\d{1,3}[\s-]?)?[6-9]\d{9}$/.test(value.replace(/[\s-]/g, ""));
