import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { Container, Sheet } from "@/components/paper/primitives";
import { PaperSection } from "@/components/paper/torn-edge";
import { HangingTags } from "@/components/paper/hanging-tags";
import { Reveal } from "@/components/paper/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { ContactBlock } from "@/components/sections/contact-block";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";

export const metadata = buildMetadata({
  title: "Our Services",
  description:
    "Social media marketing, branding, property shooting and editing, website development and performance marketing — five services, one studio.",
  path: "/services",
  keywords: [
    "digital marketing services",
    "360 degree marketing agency",
    "branding services",
    "performance marketing services",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <PageHero
        eyebrow="What we do"
        watermark="Services"
        title={
          <>
            Five services.{" "}
            <span className="marker-underline text-brand">One team</span> behind
            all of them.
          </>
        }
        description="Take one on its own or hand us the whole brand. Nothing gets lost in a handover, because there isn't one."
      />

      <PaperSection tone="paper">
        <Container className="pt-20 pb-8 sm:pt-24">
          <HangingTags />
        </Container>
      </PaperSection>

      <PaperSection tone="paper">
        <Container className="py-16 sm:py-20">
          <ul className="space-y-8">
            {services.map((service, index) => (
              <Reveal as="li" key={service.slug} delay={index * 70}>
                <Sheet
                  tiltSeed={service.slug}
                  maxTilt={0.6}
                  className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lift-lg"
                >
                  <div className="grid gap-6 p-7 sm:p-9 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-9">
                    <span
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-lift-sm ${
                        service.tone === "brand"
                          ? "bg-brand-soft text-brand-deep"
                          : "bg-accent text-[#2a2135]"
                      }`}
                    >
                      <Icon name={service.icon} className="h-7 w-7" strokeWidth={2} />
                    </span>

                    <div>
                      <p className="eyebrow mb-1.5">0{index + 1} · {service.tagline}</p>
                      <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                        <Link
                          href={`/services/${service.slug}`}
                          className="after:absolute after:inset-0 after:content-['']"
                        >
                          {service.name}
                        </Link>
                      </h2>
                      <p className="mt-2.5 max-w-2xl leading-relaxed text-ink-soft">
                        {service.summary}
                      </p>

                      <ul className="mt-5 flex flex-wrap gap-2">
                        {service.deliverables.slice(0, 4).map((deliverable) => (
                          <li
                            key={deliverable}
                            className="rounded-full bg-paper-sunken px-3 py-1 text-xs text-ink-soft"
                          >
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <span className="flex items-center gap-1.5 font-display text-sm font-semibold text-brand transition-transform duration-200 group-hover:translate-x-1">
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Sheet>
              </Reveal>
            ))}
          </ul>
        </Container>
      </PaperSection>

      <ContactBlock tone="tint" tearTop="var(--paper)" />
    </>
  );
}
