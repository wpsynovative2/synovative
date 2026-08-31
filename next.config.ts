import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Cloudinary — all media (images/video posters) is delivered from here.
      new URL("https://res.cloudinary.com/**"),
      // Google Business Profile reviewer avatars used by the testimonials block.
      new URL("https://lh3.googleusercontent.com/**"),
      // YouTube thumbnails for the property shooting sample videos.
      new URL("https://i.ytimg.com/**"),
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
