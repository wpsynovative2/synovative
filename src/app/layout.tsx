import type { Metadata, Viewport } from "next";
import { Caveat, Fredoka, Nunito } from "next/font/google";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/seo/metadata";
import { themeInitScript } from "@/components/layout/theme-toggle";
import "./globals.css";

/**
 * Type system:
 *  - Fredoka  — rounded geometric display, matching the papercraft wordmark.
 *  - Nunito   — warm, highly readable body face that pairs with it.
 *  - Caveat   — handwritten marker, used sparingly for margin notes.
 *
 * All three are variable, so a single self-hosted file per family covers every
 * weight the design uses.
 */

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — ${site.tagline}`,
    // Every page supplies its own title; this appends the brand consistently.
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: SITE_URL }],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: { telephone: true, address: true, email: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#5f3ca7" },
    { media: "(prefers-color-scheme: dark)", color: "#17131f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fredoka.variable} ${nunito.variable} ${caveat.variable} h-full`}
    >
      <head>
        {/*
         * Applies the stored theme before first paint. Without this the page
         * would render light and then snap to dark on hydration.
         */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
