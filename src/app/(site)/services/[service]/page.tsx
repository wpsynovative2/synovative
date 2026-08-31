import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { getService, services } from "@/content/services";
import { fetchProjectsForService } from "@/lib/firebase/collections";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";
import {
  Container,
  DoodleStar,
  SectionHeading,
  Sheet,
  StickyNote,
} from "@/components/paper/primitives";
import { PaperSection } from "@/components/paper/torn-edge";
import { Reveal } from "@/components/paper/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectCard } from "@/components/sections/project-card";
import { VideoEmbed } from "@/components/sections/video-embed";
import { BeforeAfter } from "@/components/sections/before-after";
import { ContactBlock } from "@/components/sections/contact-block";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

/** All five services are known at build time, so every page is prerendered. */
export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

/** A slug outside the five is a 404, not a dynamically rendered page. */
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/services/[service]">) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
    keywords: service.seo.keywords,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[service]">) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedProjects = await fetchProjectsForService(service.slug, 6);
  const videoProjects = relatedProjects.filter((project) => project.youtubeId);
  const comparison = relatedProjects.find((project) => project.beforeAfter);

  return (
    <>
      <JsonLd
        schema={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={service.name}
        watermark={service.tagline}
        title={service.hero.heading}
        description={service.hero.subheading}
      >
        <ButtonLink href="#enquiry" size="lg">
          {service.cta.label}
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
        <ButtonLink href="/portfolio" variant="paper" size="lg">
          See related work
        </ButtonLink>
      </PageHero>

      {/* Deliverables — a torn-paper checklist */}
      <PaperSection tone="paper">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="What you get"
                watermark="Scope"
                title={`Every ${service.name.toLowerCase()} engagement includes`}
              />
              <StickyNote tone="brand" tiltSeed={`${service.slug}-note`} className="mt-9 max-w-xs">
                <p className="font-hand text-xl leading-snug">{service.tagline}.</p>
              </StickyNote>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {service.deliverables.map((deliverable, index) => (
                <Reveal as="li" key={deliverable} delay={index * 60}>
                  <div className="flex h-full items-start gap-3 rounded-xl border border-line bg-paper-raised p-4 shadow-lift-sm">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[#2a2135]">
                      <Check className="h-3 w-3" strokeWidth={3.5} />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-soft">{deliverable}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </PaperSection>

      {/* The service's own sections */}
      <PaperSection tone="tint" tearTop="var(--paper)" tearBottom="var(--paper)">
        <Container className="py-24 sm:py-28">
          <SectionHeading
            eyebrow="In detail"
            watermark="How"
            align="center"
            title={`How ${service.name.toLowerCase()} works here`}
            className="mb-16"
          />

          <div className="space-y-7">
            {service.sections.map((section, index) => (
              <Reveal key={section.title} delay={index * 60}>
                <Sheet tiltSeed={section.title} maxTilt={0.5} className="p-7 sm:p-9">
                  <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:gap-9">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-wash font-display text-lg font-bold text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                        {section.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-ink-soft">{section.body}</p>

                      {section.bullets && (
                        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2.5 text-sm text-ink-soft">
                              <DoodleStar className="mt-1 h-3 w-3 shrink-0" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </Sheet>
              </Reveal>
            ))}
          </div>
        </Container>
      </PaperSection>

      {/* Sample videos — property shooting only */}
      {videoProjects.length > 0 && service.slug === "property-shooting-editing" && (
        <PaperSection tone="paper">
          <Container className="py-24 sm:py-28">
            <SectionHeading
              eyebrow="Sample videos"
              watermark="Reel"
              align="center"
              title="Shot, graded and delivered in-house"
              description="Nothing here was outsourced. Same unit, from shot list to master."
              className="mb-14"
            />
            <ul className="grid gap-7 md:grid-cols-2">
              {videoProjects.map((project) => (
                <li key={project.id}>
                  <VideoEmbed
                    videoId={project.youtubeId!}
                    title={`${project.title} — ${project.client}`}
                    poster={project.image}
                  />
                </li>
              ))}
            </ul>

            {comparison?.beforeAfter && (
              <div className="mx-auto mt-16 max-w-4xl">
                <SectionHeading
                  eyebrow="Before / after"
                  align="center"
                  title="What grading actually changes"
                  className="mb-10"
                />
                <BeforeAfter
                  before={comparison.beforeAfter.before}
                  after={comparison.beforeAfter.after}
                  label={comparison.title}
                />
              </div>
            )}
          </Container>
        </PaperSection>
      )}

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <PaperSection tone="paper" tearTop={service.slug === "property-shooting-editing" ? undefined : "var(--paper-tint)"}>
          <Container className="py-24 sm:py-28">
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Featured work"
                watermark="Work"
                title={`${service.name} in the wild`}
                description="Projects where this service did the heavy lifting."
              />
              <ButtonLink href="/portfolio" variant="paper" size="sm" className="shrink-0">
                Full portfolio
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>

            <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project, index) => (
                <Reveal as="li" key={project.id} delay={(index % 3) * 90}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </PaperSection>
      )}

      {/* Cross-sell the other four */}
      <PaperSection tone="sunken" tearTop="var(--paper)">
        <Container className="py-20">
          <SectionHeading
            eyebrow="Also from the studio"
            align="center"
            title="The other four"
            className="mb-10"
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services
              .filter((other) => other.slug !== service.slug)
              .map((other) => (
                <li key={other.slug}>
                  <ButtonLink
                    href={`/services/${other.slug}`}
                    variant="paper"
                    className="h-full w-full justify-start gap-3 rounded-2xl px-5 py-4 text-left"
                  >
                    <Icon name={other.icon} className="h-5 w-5 shrink-0 text-brand" />
                    <span className="font-display text-sm leading-tight font-semibold">
                      {other.name}
                    </span>
                  </ButtonLink>
                </li>
              ))}
          </ul>
        </Container>
      </PaperSection>

      <CtaBand
        tone="accent"
        tearTop="var(--paper-sunken)"
        eyebrow={service.name}
        heading={service.cta.heading}
        body={service.cta.body}
        label={service.cta.label}
        href="#enquiry"
      />

      <ContactBlock
        tone="paper"
        defaultService={service.slug}
        heading={`Let's talk ${service.name.toLowerCase()}.`}
        description="Send the brief, however rough. We'll come back with a scope, a timeline and a number."
      />
    </>
  );
}
