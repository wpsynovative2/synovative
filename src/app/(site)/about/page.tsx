import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { aboutCopy, ceo, processSteps, realEstateTypes, site } from "@/content/site";
import { services } from "@/content/services";
import { fetchFeaturedProjects, fetchTestimonials } from "@/lib/firebase/collections";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import {
  Container,
  PaperPlane,
  SectionHeading,
  Sheet,
  StickyNote,
  Tape,
} from "@/components/paper/primitives";
import { PaperSection } from "@/components/paper/torn-edge";
import { Reveal } from "@/components/paper/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { ProjectCard } from "@/components/sections/project-card";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Synovative is a 360° real estate marketing agency founded in 2019. Meet the founder, see how we work, and the kinds of projects we market.",
  path: "/about",
  keywords: ["about synovative", "digital marketing agency team", "marketing studio Mumbai"],
});

export default async function AboutPage() {
  const [featured, testimonials] = await Promise.all([
    fetchFeaturedProjects(3),
    fetchTestimonials(),
  ]);

  // The last three bands are data-driven and may be empty, so each torn edge
  // is chosen from whichever band actually comes next.
  const hasWork = featured.length > 0;
  const hasReviews = testimonials.length > 0;
  const servicesTearBottom = !hasWork && hasReviews ? "var(--paper-tint)" : undefined;
  const ctaTearTop = hasReviews
    ? "var(--paper-tint)"
    : hasWork
      ? "var(--paper-sunken)"
      : "var(--paper)";

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

      {/* By the numbers — the hero tears into this band. */}
      <PaperSection tone="paper">
        <Container className="pt-20 sm:pt-24">
          <p className="eyebrow mb-8 text-center">{aboutCopy.stats.eyebrow}</p>
          <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {site.stats.map((stat, index) => (
              <Reveal as="li" key={stat.label} delay={index * 90}>
                <Sheet tiltSeed={`about-${stat.label}`} maxTilt={2.2} className="px-5 py-8 text-center">
                  <p className="font-display text-4xl font-bold text-brand sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-tight text-ink-soft">{stat.label}</p>
                </Sheet>
              </Reveal>
            ))}
          </ul>
        </Container>
      </PaperSection>

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

      {/* What we stand by — principles as pinned notes */}
      <PaperSection tone="paper" tearTop="var(--paper-tint)">
        <Container className="py-24 sm:py-28">
          <SectionHeading
            eyebrow={aboutCopy.beliefs.eyebrow}
            watermark="Rules"
            align="center"
            title={aboutCopy.beliefs.title}
            description={aboutCopy.beliefs.description}
            className="mb-16"
          />

          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {aboutCopy.beliefs.items.map((belief, index) => (
              <Reveal as="li" key={belief.title} delay={index * 100} className="h-full">
                <StickyNote
                  tone={index % 2 ? "brand" : "accent"}
                  tiltSeed={belief.title}
                  className="flex h-full flex-col pt-8"
                >
                  <Icon name={belief.icon} className="h-7 w-7" strokeWidth={2.2} />
                  <h3 className="mt-4 font-display text-sm font-bold tracking-[0.1em]">
                    {belief.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed opacity-85">{belief.body}</p>
                </StickyNote>
              </Reveal>
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

      {/* Under one roof — every service, linked */}
      <PaperSection tone="paper" tearBottom={servicesTearBottom}>
        <Container className="py-24 sm:py-28">
          <SectionHeading
            eyebrow={aboutCopy.services.eyebrow}
            watermark="Services"
            align="center"
            title={aboutCopy.services.title}
            description={aboutCopy.services.description}
            className="mb-16"
          />

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal as="li" key={service.slug} delay={(index % 3) * 90} className="h-full">
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <Sheet
                    tiltSeed={`about-${service.slug}`}
                    maxTilt={1.4}
                    className="flex h-full flex-col p-6 transition-transform duration-200 group-hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={
                          service.tone === "accent"
                            ? "flex h-12 w-12 items-center justify-center rounded-full bg-accent-wash text-accent-deep"
                            : "flex h-12 w-12 items-center justify-center rounded-full bg-brand-wash text-brand"
                        }
                      >
                        <Icon name={service.icon} className="h-5 w-5" strokeWidth={2.2} />
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-5 w-5 text-ink-faint transition-colors group-hover:text-brand"
                      />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-ink">{service.name}</h3>
                    <p className="mt-1 font-hand text-lg text-brand">{service.tagline}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{service.summary}</p>
                  </Sheet>
                </Link>
              </Reveal>
            ))}

            <Reveal as="li" delay={(services.length % 3) * 90} className="h-full">
              <StickyNote tone="brand" tiltSeed="about-all-services" className="flex h-full flex-col justify-between gap-6">
                <p className="font-hand text-2xl leading-snug">
                  Need the whole property package? That’s our favourite kind of brief.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 font-display text-sm font-semibold hover:underline"
                >
                  See how it fits together
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </StickyNote>
            </Reveal>
          </ul>
        </Container>
      </PaperSection>

      {/* Featured work */}
      {hasWork && (
        <PaperSection
          tone="sunken"
          tearTop="var(--paper)"
          tearBottom={hasReviews ? "var(--paper-tint)" : undefined}
        >
          <Container className="py-24 sm:py-28">
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow={aboutCopy.work.eyebrow}
                watermark="Projects"
                title={aboutCopy.work.title}
                description={aboutCopy.work.description}
              />
              <ButtonLink href="/portfolio" variant="paper" size="sm" className="shrink-0">
                See the portfolio
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>

            <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((project, index) => (
                <Reveal as="li" key={project.id} delay={index * 90}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </PaperSection>
      )}

      <TestimonialsSection testimonials={testimonials} />

      <CtaBand
        tone="accent"
        tearTop={ctaTearTop}
        eyebrow={aboutCopy.cta.eyebrow}
        heading={aboutCopy.cta.heading}
        body={aboutCopy.cta.body}
        label="Start a conversation"
      />
    </>
  );
}
