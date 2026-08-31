import Image from "next/image";
import { aboutCopy, ceo, processSteps, site, timeline } from "@/content/site";
import { team } from "@/content/team";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import {
  Container,
  DoodleStar,
  PaperPlane,
  SectionHeading,
  Sheet,
  StickyNote,
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
    "Synovative is a 360° digital marketing studio founded in 2019. Meet the team, the working process and the timeline that got us here.",
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
        eyebrow="About us"
        watermark="Since 2019"
        title={
          <>
            A studio that still{" "}
            <span className="marker-underline text-brand">cuts its own paper.</span>
          </>
        }
        description={aboutCopy.short}
      />

      {/* The long version */}
      <PaperSection tone="paper">
        <Container className="py-24 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="The long version"
                watermark="Story"
                title="How Synovative works"
              />
              <div className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-ink-soft">
                {aboutCopy.long.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="relative">
              <PaperPlane className="-top-8 right-0 hidden h-14 w-24 lg:block" />
              <StickyNote tone="accent" tiltSeed="about-note-1" className="max-w-sm">
                <p className="font-hand text-2xl leading-snug">
                  &ldquo;Good marketing is not louder. It is more honest, more
                  often.&rdquo;
                </p>
                <p className="mt-3 font-display text-xs font-semibold tracking-[0.18em] uppercase">
                  — {ceo.name}, Founder
                </p>
              </StickyNote>

              <Sheet tiltSeed="about-values" className="mt-10 p-7">
                <p className="eyebrow mb-4">What we hold to</p>
                <ul className="space-y-3.5">
                  {[
                    "Research before creative, always.",
                    "One team from strategy to delivery — no handovers.",
                    "Numbers reported honestly, flattering or not.",
                    "Your ad account, your data, your assets.",
                  ].map((value) => (
                    <li key={value} className="flex gap-3 text-sm text-ink-soft">
                      <DoodleStar className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      {value}
                    </li>
                  ))}
                </ul>
              </Sheet>
            </div>
          </div>
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
                eyebrow="Call me CEO"
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
            </div>
          </div>
        </Container>
      </PaperSection>

      {/* Team */}
      <PaperSection tone="paper" tearTop="var(--paper-tint)">
        <Container className="py-24 sm:py-28">
          <SectionHeading
            eyebrow="The team"
            watermark="Crew"
            align="center"
            title="A full deck"
            description="Small teams, real ownership. Hover or scroll a card to see who is behind it."
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

      {/* Process */}
      <PaperSection tone="brand" tearTop="var(--paper)" tearBottom="var(--paper)">
        <Container className="py-24 sm:py-28">
          <SectionHeading
            eyebrow="How we work"
            watermark="Process"
            align="center"
            inverted
            title="From concept to connection"
            description="Five steps, run the same way on every engagement — so you always know which one you are in."
            className="mb-16"
          />

          <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
            {/* The dotted thread linking the steps. */}
            <span
              aria-hidden="true"
              className="absolute top-8 right-[10%] left-[10%] hidden border-t-2 border-dashed border-white/30 md:block"
            />

            {processSteps.map((step, index) => (
              <Reveal as="li" key={step.step} delay={index * 110} className="relative text-center">
                <span className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-[#2a2135] shadow-lift-md">
                  <Icon name={step.icon} className="h-6 w-6" strokeWidth={2.2} />
                  <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white font-display text-xs font-bold text-brand">
                    {step.step}
                  </span>
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </PaperSection>

      {/* Timeline */}
      <PaperSection tone="paper">
        <Container className="py-24 sm:py-28">
          <SectionHeading
            eyebrow="2019 → 2026"
            watermark="Timeline"
            align="center"
            title="One sheet at a time"
            description="Seven years, from a single desk to a studio of thirty."
            className="mb-16"
          />

          {/*
           * Two equal columns with the thread running between them. Entries
           * alternate sides by choosing their column, so nothing is positioned
           * by hand and the content can never overlap the line. Below `sm` it
           * collapses to a single column with the thread on the left.
           */}
          <ol className="relative mx-auto max-w-3xl">
            <span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[0.6rem] w-0.5 bg-gradient-to-b from-accent via-brand-soft to-brand sm:left-1/2 sm:-translate-x-1/2"
            />

            {timeline.map((entry, index) => (
              <Reveal
                as="li"
                key={entry.year}
                delay={index * 70}
                className="relative mb-9 pl-10 last:mb-0 sm:mb-12 sm:grid sm:grid-cols-2 sm:gap-x-12 sm:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 left-0 h-5 w-5 rounded-full border-4 border-paper bg-brand sm:left-1/2 sm:-translate-x-1/2"
                />

                <div
                  className={
                    index % 2 === 0 ? "sm:col-start-1 sm:text-right" : "sm:col-start-2"
                  }
                >
                  <p className="font-display text-2xl font-bold text-accent-deep dark:text-accent">
                    {entry.year}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                    {entry.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{entry.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </PaperSection>

      <CtaBand
        tone="accent"
        tearTop="var(--paper)"
        eyebrow="Work with us"
        heading="Want this team on your brand?"
        body={`Tell us what you're launching. We'll tell you honestly whether ${site.name} is the right studio for it.`}
        label="Start a conversation"
      />
    </>
  );
}
