import Image from "next/image";
import { aboutCopy, ceo, processSteps, realEstateTypes } from "@/content/site";
import { team } from "@/content/team";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import {
  Container,
  PaperPlane,
  SectionHeading,
  Sheet,
  Tape,
} from "@/components/paper/primitives";
import { PaperSection } from "@/components/paper/torn-edge";
import { Reveal } from "@/components/paper/reveal";
import { TeamCard } from "@/components/paper/flip-card";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Synovative is a 360° real estate marketing agency founded in 2019. Meet the team, see how we work, and the kinds of projects we market.",
  path: "/about",
  keywords: ["about synovative", "digital marketing agency team", "marketing studio Mumbai"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />

      <PageHero
        eyebrow="About"
        watermark="Since 2019"
        title={aboutCopy.title}
        description={aboutCopy.intro}
      />

      {/* How Synovative works */}
      <PaperSection tone="paper">
        <Container className="relative py-24 sm:py-28">
          <PaperPlane className="top-16 right-0 hidden h-14 w-24 lg:block" />
          <SectionHeading
            eyebrow="How we work"
            watermark="Process"
            align="center"
            title={aboutCopy.process.title}
            description={aboutCopy.process.description}
            className="mb-16"
          />

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {processSteps.map((step, index) => (
              <Reveal as="li" key={step.step} delay={index * 110}>
                <Sheet tiltSeed={step.title} maxTilt={1.6} className="h-full p-6 text-center">
                  <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-[#2a2135] shadow-lift-sm">
                    <Icon name={step.icon} className="h-6 w-6" strokeWidth={2.2} />
                    <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand font-display text-xs font-bold text-on-brand">
                      {step.step}
                    </span>
                  </span>
                  <h3 className="mt-5 font-display text-sm font-semibold tracking-wide text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
                </Sheet>
              </Reveal>
            ))}
          </ol>
        </Container>
      </PaperSection>

      {/* CEO */}
      <PaperSection tone="tint" tearTop="var(--paper)">
        <Container className="py-24 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
            <div className="relative mx-auto w-full max-w-sm">
              <Tape className="-top-4 left-1/2 z-20 h-7 w-24 -translate-x-1/2" rotate={-5} />
              <Sheet tiltSeed="ceo-photo" maxTilt={2.2} className="p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-paper-sunken">
                  <Image
                    src={cloudinaryUrl(ceo.photo, { width: 800, height: 1000, gravity: "face" })}
                    alt={ceo.name}
                    fill
                    sizes="(max-width: 1024px) 80vw, 380px"
                    className="object-cover"
                  />
                </div>
                <div className="px-2 pt-4 pb-2 text-center">
                  <p className="font-display text-lg font-bold text-ink">{ceo.name}</p>
                  <p className="text-sm text-ink-faint">{ceo.role}</p>
                </div>
              </Sheet>
            </div>

            <div>
              <SectionHeading
                eyebrow="Call Me CEO"
                watermark="Founder"
                title="The person who signs off on everything"
              />

              <blockquote className="mt-7 border-l-4 border-accent pl-5 font-hand text-2xl leading-snug text-brand">
                {ceo.quote}
              </blockquote>

              <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
                {ceo.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>

              <ul className="mt-7 space-y-2.5">
                {ceo.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm text-ink-soft">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <p className="mt-7 font-hand text-xl text-brand">{ceo.signoff}</p>
            </div>
          </div>
        </Container>
      </PaperSection>

      {/* Team */}
      <PaperSection tone="paper" tearTop="var(--paper-tint)">
        <Container className="py-24 sm:py-28">
          <SectionHeading
            eyebrow={aboutCopy.team.eyebrow}
            watermark="Crew"
            align="center"
            title={aboutCopy.team.title}
            description={aboutCopy.team.description}
            className="mb-16"
          />

          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <li key={member.id}>
                <TeamCard member={member} index={index} />
              </li>
            ))}
          </ul>
        </Container>
      </PaperSection>

      {/* Property types we market */}
      <PaperSection tone="brand" tearTop="var(--paper)" tearBottom="var(--paper)">
        <Container className="py-24 sm:py-28">
          <SectionHeading
            eyebrow="What we market"
            watermark="Real estate"
            align="center"
            inverted
            title={aboutCopy.fluent.title}
            description={aboutCopy.fluent.description}
            className="mb-16"
          />

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {realEstateTypes.map((type, index) => (
              <Reveal as="li" key={type.title} delay={index * 80}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-white/15 bg-white/[0.07] p-6 transition-colors duration-200 hover:bg-white/[0.12]">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-[#2a2135] shadow-lift-sm">
                    <Icon name={type.icon} className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold tracking-[0.12em] text-white">
                      {type.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/75">{type.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </PaperSection>

      <CtaBand
        tone="accent"
        tearTop="var(--paper)"
        eyebrow={aboutCopy.cta.eyebrow}
        heading={aboutCopy.cta.heading}
        body={aboutCopy.cta.body}
        label="Start a conversation"
      />
    </>
  );
}
