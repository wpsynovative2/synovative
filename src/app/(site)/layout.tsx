import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/seo/schema";

/**
 * Shell for the public site.
 *
 * The admin panel deliberately sits outside this group so it gets no marketing
 * chrome. Organization, LocalBusiness and WebSite schema are emitted once here
 * rather than per page — they describe the site, not the route.
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <JsonLd schema={[organizationSchema(), localBusinessSchema(), websiteSchema()]} />
      {/* Smooth scrolling for the marketing site; the admin panel keeps native scroll. */}
      <SmoothScroll />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-semibold focus:text-on-brand"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
