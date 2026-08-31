"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

/**
 * Site navigation.
 *
 * A floating cream pill that sticks to the top of the viewport and tightens
 * once the page scrolls. The Services dropdown opens on hover for pointers and
 * on click/Enter for keyboards and touch.
 */

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", dropdown: true },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/career", label: "Career" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Navigating closes both menus. Done in the link handlers rather than an
   * effect on `pathname`, so there is no extra render pass on every route
   * change just to reset two booleans.
   */
  function closeMenus() {
    setMobileOpen(false);
    setServicesOpen(false);
  }

  // Dismiss the dropdown on outside click and on Escape.
  useEffect(() => {
    if (!servicesOpen) return;

    function onPointerDown(event: PointerEvent) {
      if (!servicesRef.current?.contains(event.target as Node))
        setServicesOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setServicesOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  // Lock body scroll behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        // A floating pill that sticks to the top rather than a full-width band.
        // The header itself stays transparent; the `nav` below is the pill, so
        // the paper texture of each page shows through around it.
        "fixed top-0 w-full left-0 z-50",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-4 mt-5 rounded-full border backdrop-blur-xl transition-all duration-500",
          scrolled
            ? "border-line bg-paper-raised/85 px-5 py-2 shadow-lift-lg"
            : "border-transparent bg-paper-raised/55 px-5 py-3",
        )}
      >
        <Logo priority />

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) =>
            link.dropdown ? (
              <li
                key={link.href}
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setServicesOpen((open) => !open)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 font-display text-sm font-medium tracking-wide text-ink-soft uppercase transition-colors",
                    "hover:bg-brand-wash hover:text-brand",
                    isActive(link.href) && "bg-brand-wash text-brand",
                  )}
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      servicesOpen && "rotate-180",
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "absolute top-full left-1/2 w-80 -translate-x-1/2 pt-3 transition-all duration-200",
                    servicesOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0",
                  )}
                >
                  <ul className="sheet paper-grain overflow-hidden p-2">
                    <li>
                      <Link
                        href="/services"
                        onClick={closeMenus}
                        className="block rounded-xl px-3 py-2 font-display text-xs font-semibold tracking-[0.18em] text-brand uppercase hover:bg-brand-wash"
                      >
                        All services
                      </Link>
                    </li>
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          onClick={closeMenus}
                          className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-brand-wash"
                        >
                          <span
                            className={cn(
                              "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                              service.tone === "brand"
                                ? "bg-brand-soft text-brand-deep"
                                : "bg-accent text-[#2a2135]",
                            )}
                          >
                            <Icon name={service.icon} className="h-4 w-4" />
                          </span>
                          <span>
                            <span className="block font-display text-sm font-semibold text-ink">
                              {service.name}
                            </span>
                            <span className="block text-xs text-ink-faint">
                              {service.tagline}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenus}
                  className={cn(
                    "block rounded-full px-4 py-2 font-display text-sm font-medium tracking-wide text-ink-soft uppercase transition-colors",
                    "hover:bg-brand-wash hover:text-brand",
                    isActive(link.href) && "bg-brand-wash text-brand",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink
            href="/contact#enquiry"
            variant="accent"
            size="sm"
            className="hidden xl:inline-flex"
          >
            Let&apos;s talk
          </ButtonLink>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-ink lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen ? "visible" : "invisible pointer-events-none",
        )}
      >
        <button
          type="button"
          tabIndex={mobileOpen ? 0 : -1}
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className={cn(
            "absolute inset-0 bg-[#2a2135]/60 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          // The sheet has its own scroll container; Lenis must not smooth it.
          data-lenis-prevent
          className={cn(
            "paper-grain absolute inset-y-0 right-0 w-[min(22rem,88vw)] overflow-y-auto bg-paper-raised px-6 py-6 shadow-lift-lg transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="mb-8 flex items-center justify-between">
            <Logo plate={false} width={128} />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <ul className="space-y-1">
            {LINKS.filter((link) => !link.dropdown).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenus}
                  className={cn(
                    "block rounded-xl px-4 py-3 font-display text-base font-semibold text-ink transition-colors hover:bg-brand-wash",
                    isActive(link.href) && "bg-brand-wash text-brand",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-6 mb-2 px-4">Services</p>
          <ul className="space-y-1">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-ink-soft transition-colors hover:bg-brand-wash hover:text-brand"
                >
                  <Icon
                    name={service.icon}
                    className="h-4 w-4 shrink-0 text-brand"
                  />
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>

          <ButtonLink
            href="/contact#enquiry"
            onClick={closeMenus}
            variant="accent"
            className="mt-8 w-full"
          >
            Let&apos;s talk
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
