/**
 * Cloudinary URL building.
 *
 * Content records store bare public ids (`synovative/projects/foo`) rather than
 * full URLs, so the delivery transform stays a presentation concern. Anything
 * that already looks like a URL or a local `/public` path is passed straight
 * through — that keeps local placeholder assets working before media is
 * uploaded, and lets a record hold an external URL when it needs to.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const isCloudinaryConfigured = Boolean(CLOUD_NAME);

export interface CloudinaryOptions {
  width?: number;
  height?: number;
  /** `fill` crops to the box; `fit` letterboxes inside it. */
  crop?: "fill" | "fit" | "limit" | "thumb";
  gravity?: "auto" | "face" | "center";
  quality?: "auto" | number;
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  blur?: number;
}

function isPassthrough(id: string) {
  return id.startsWith("http://") || id.startsWith("https://") || id.startsWith("/");
}

export function cloudinaryUrl(publicId: string, options: CloudinaryOptions = {}): string {
  if (!publicId) return placeholderImage();
  if (isPassthrough(publicId)) return publicId;
  if (!CLOUD_NAME) return placeholderImage();

  const {
    width,
    height,
    crop = "fill",
    gravity = "auto",
    quality = "auto",
    format = "auto",
    blur,
  } = options;

  const transforms = [
    `f_${format}`,
    `q_${quality}`,
    width && `w_${width}`,
    height && `h_${height}`,
    (width || height) && `c_${crop}`,
    (width || height) && crop === "fill" && `g_${gravity}`,
    blur && `e_blur:${blur}`,
  ].filter(Boolean);

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(",")}/${publicId}`;
}

export function cloudinaryVideoUrl(publicId: string): string {
  if (isPassthrough(publicId)) return publicId;
  if (!CLOUD_NAME) return "";
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_auto/${publicId}.mp4`;
}

/**
 * Inline SVG stand-in used whenever Cloudinary is not configured yet, so the
 * whole site renders and lays out correctly on a fresh clone with no env file.
 * Kept as a data URI so it costs no request and cannot 404.
 */
export function placeholderImage(label = "Synovative"): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ece5f7"/>
        <stop offset="100%" stop-color="#fdf1dc"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="url(#g)"/>
    <text x="600" y="410" text-anchor="middle" font-family="system-ui,sans-serif"
      font-size="56" font-weight="600" fill="#5f3ca7" opacity="0.35">${label}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Tiny blurred version of the same asset, for `next/image` placeholder blur. */
export function blurDataUrl(publicId: string): string | undefined {
  if (!CLOUD_NAME || isPassthrough(publicId)) return undefined;
  return cloudinaryUrl(publicId, { width: 24, quality: 30, blur: 400 });
}

export function youtubeThumbnail(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}

export function youtubeEmbedUrl(videoId: string) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
}
