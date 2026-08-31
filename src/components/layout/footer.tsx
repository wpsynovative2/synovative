import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { Container, PaperPlane } from "@/components/paper/primitives";
import { TornEdge } from "@/components/paper/torn-edge";
import { Logo } from "./logo";
import { SocialIcon } from "@/components/ui/icon";

const COMPANY_LINKS = [
  { href: "/about", label: "About us" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/career", label: "Career" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact us" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="paper-grain relative isolate overflow-hidden bg-brand-surface-deep pt-20 text-white/85">
      {/* The footer is the last sheet — torn away from the page above it. */}
      <TornEdge position="top" fill="var(--paper)" height={40} />
      <PaperPlane className="top-24 right-8 hidden h-16 w-28 text-white/25 lg:block" />

      <Container className="relative z-20 pt-8 pb-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Identity */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              A 360° digital marketing studio. Strategy, film, design, media and
              development under one roof — so your brand sounds like one company
              everywhere it shows up.
            </p>

            <ul className="mt-6 flex gap-2.5">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:text-[#2a2135]"
                  >
                    <SocialIcon name={social.icon} className="h-[1.15rem] w-[1.15rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <nav aria-labelledby="footer-services">
            <h2
              id="footer-services"
              className="font-display text-xs font-semibold tracking-[0.22em] text-accent uppercase"
            >
              Services
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-white/70 transition-colors hover:text-accent"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company">
            <h2
              id="footer-company"
              className="font-display text-xs font-semibold tracking-[0.22em] text-accent uppercase"
            >
              Company
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-display text-xs font-semibold tracking-[0.22em] text-accent uppercase">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <address className="not-italic text-white/70">
                  {site.address.street}
                  <br />
                  {site.address.locality}, {site.address.region} {site.address.postalCode}
                  <br />
                  {site.address.countryName}
                </address>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a
                  href={`tel:${site.contact.phoneHref}`}
                  className="text-white/70 transition-colors hover:text-accent"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-white/70 transition-colors hover:text-accent"
                >
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="font-hand text-base text-white/70">
            Made by hand, measured by numbers.
          </p>
        </div>
      </Container>
    </footer>
  );
}
