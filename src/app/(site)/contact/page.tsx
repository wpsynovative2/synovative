import { ExternalLink } from "lucide-react";
import { faqs, site } from "@/content/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { Container, SectionHeading, Sheet } from "@/components/paper/primitives";
import { PaperSection } from "@/components/paper/torn-edge";
import { Reveal } from "@/components/paper/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { ContactBlock } from "@/components/sections/contact-block";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: `Talk to Synovative. Call ${site.contact.phone}, email ${site.contact.email}, or send an enquiry — we reply within one working day.`,
  path: "/contact",
  keywords: [
    "contact digital marketing agency",
    "marketing agency Mira Road",
    "synovative contact",
  ],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        schema={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact Us", path: "/contact" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Contact"
        watermark="Say hello"
        title={
          <>
            Let&apos;s start with a{" "}
            <span className="marker-underline text-brand">conversation.</span>
          </>
        }
        description="No discovery-call funnel, no automated sequence. You write, a person from the team writes back — usually the person who would run the work."
      />

      <ContactBlock tone="paper" />

      {/* Map */}
      <PaperSection tone="sunken" tearTop="var(--paper)">
        <Container className="py-24 sm:py-28">
          <SectionHeading
            eyebrow="Find us"
            watermark="Studio"
            align="center"
            title="Come by the studio"
            description={`${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`}
            className="mb-12"
          />

          <Sheet className="overflow-hidden p-2.5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-paper-sunken sm:aspect-[21/9]">
              <iframe
                src={site.mapEmbedUrl}
                title={`Map showing the ${site.name} studio in ${site.address.locality}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </Sheet>

          <div className="mt-6 flex justify-center">
            <a
              href={site.mapLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand hover:underline"
            >
              Open in Google Maps
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </Container>
      </PaperSection>

      {/* FAQs */}
      <PaperSection tone="paper" tearTop="var(--paper-sunken)">
        <Container size="narrow" className="py-24 sm:py-28">
          <SectionHeading
            eyebrow="Before you write"
            watermark="FAQ"
            align="center"
            title="Questions we get asked a lot"
            description="Answered plainly, including the ones about money."
            className="mb-12"
          />

          <ul className="space-y-4">
            {faqs.map((faq, index) => (
              <Reveal as="li" key={faq.question} delay={index * 60}>
                {/*
                 * Native disclosure rather than a JS accordion: it works
                 * without hydration, is keyboard accessible by default, and
                 * lets browser find-in-page reach collapsed answers.
                 */}
                <details className="sheet paper-grain group overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-display text-base font-semibold text-ink sm:p-6 sm:text-lg">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-wash text-brand transition-transform duration-300 group-open:rotate-45"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <div className="border-t border-line px-5 py-5 leading-relaxed text-ink-soft sm:px-6">
                    {faq.answer}
                  </div>
                </details>
              </Reveal>
            ))}
          </ul>
        </Container>
      </PaperSection>
    </>
  );
}
