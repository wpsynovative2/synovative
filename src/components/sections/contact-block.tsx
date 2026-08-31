import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Container, SectionHeading, Sheet, StickyNote } from "@/components/paper/primitives";
import { PaperSection } from "@/components/paper/torn-edge";
import { LeadForm } from "@/components/forms/lead-form";
import { SocialIcon } from "@/components/ui/icon";
import type { ServiceSlug } from "@/types";

/**
 * Contact details beside an enquiry form. Appears on the home page, the contact
 * page and the foot of every service page — `defaultService` pre-selects the
 * offering when it is dropped onto a service page.
 */
export function ContactBlock({
  defaultService = "general",
  heading = "Tell us what you're building.",
  description = "One form, one reply, within a working day. No call centre, no automated sequence — a person from the team who would actually run the work.",
  tone = "paper",
  tearBottom,
  tearTop,
}: {
  defaultService?: ServiceSlug | "general";
  heading?: string;
  description?: string;
  tone?: "paper" | "tint" | "raised";
  tearBottom?: string;
  tearTop?: string;
}) {
  return (
    <PaperSection id="enquiry" tone={tone} tearBottom={tearBottom} tearTop={tearTop}>
      <Container className="scroll-mt-32 py-24 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Details */}
          <div>
            <SectionHeading
              eyebrow="Get in touch"
              watermark="Hello"
              title={heading}
              description={description}
            />

            <ul className="mt-10 space-y-5">
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-wash text-brand">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-ink">Studio</p>
                  <address className="mt-0.5 text-sm leading-relaxed text-ink-soft not-italic">
                    {site.address.street}
                    <br />
                    {site.address.locality}, {site.address.region} {site.address.postalCode}
                  </address>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-wash text-brand">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-ink">Call</p>
                  <p className="mt-0.5 text-sm text-ink-soft">
                    <a href={`tel:${site.contact.phoneHref}`} className="hover:text-brand">
                      {site.contact.phone}
                    </a>
                    <span className="mx-1.5 text-ink-faint">·</span>
                    {site.contact.altPhone}
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-wash text-brand">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-ink">Email</p>
                  <p className="mt-0.5 text-sm text-ink-soft">
                    <a href={`mailto:${site.contact.email}`} className="hover:text-brand">
                      {site.contact.email}
                    </a>
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-wash text-brand">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-ink">Hours</p>
                  <p className="mt-0.5 text-sm text-ink-soft">
                    Mon–Fri, 10:00–19:00 · Sat, 10:00–16:00
                  </p>
                </div>
              </li>
            </ul>

            <ul className="mt-8 flex gap-2.5">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper-raised text-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand hover:text-on-brand"
                  >
                    <SocialIcon name={social.icon} className="h-[1.1rem] w-[1.1rem]" />
                  </a>
                </li>
              ))}
            </ul>

            <StickyNote tone="accent" tiltSeed="contact-note" className="mt-10 max-w-xs">
              <p className="font-hand text-lg leading-snug">
                Prefer to skip the form? Call the studio — someone who does the
                work will pick up.
              </p>
            </StickyNote>
          </div>

          {/* Form */}
          <Sheet className="p-6 sm:p-9">
            <p className="eyebrow mb-1">Enquiry</p>
            <h3 className="font-display text-2xl font-semibold text-ink">
              Start the conversation
            </h3>
            <p className="mt-2 mb-7 text-sm text-ink-soft">
              The more you tell us here, the more useful our first reply will be.
            </p>
            <LeadForm defaultService={defaultService} />
          </Sheet>
        </div>
      </Container>
    </PaperSection>
  );
}
