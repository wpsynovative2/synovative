import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Synovative Admin" },
  // The panel must never be indexed, regardless of what robots.txt says.
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Bare shell for the admin area — deliberately outside the `(site)` group, so
 * it inherits none of the marketing navigation or footer.
 */
export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return <div className="flex min-h-screen flex-col bg-paper">{children}</div>;
}
