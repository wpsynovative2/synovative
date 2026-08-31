import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { aboutCopy, site } from "@/content/site";
import { projectCategories } from "@/content/projects";
import { fetchProjects } from "@/lib/firebase/collections";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import {
  Container,
  SectionHeading,
  Sheet,
  StickyNote,
  Tape,
} from "@/components/paper/primitives";
import { PaperSection } from "@/components/paper/torn-edge";
import { Reveal } from "@/components/paper/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectCard } from "@/components/sections/project-card";
import { ContactBlock } from "@/components/sections/contact-block";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";

export const metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Launch campaigns, brand identities, property films and websites delivered by Synovative for real-estate, hospitality and lifestyle brands.",
  path: "/portfolio",
  keywords: [
    "marketing agency portfolio",
    "real estate campaign case studies",
    "branding portfolio",
    "property video portfolio",
  ],
});

/** Office tour stills, shown as a taped-up strip of photographs. */
const OFFICE_TOUR = [
  { image: "synovative/office/studio-floor", caption: "The studio floor" },
  { image: "synovative/office/edit-suite", caption: "Edit suite" },
  { image: "synovative/office/shoot-bay", caption: "Shoot bay" },
  { image: "synovative/office/wall", caption: "The idea wall" },
];

export default async function PortfolioPage() {
  const projects = await fetchProjects();

  // Group once, then render a band per non-empty category.
  const grouped = projectCategories
    .map((category) => ({
      ...category,
      items: projects.filter((project) => project.category === category.slug),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ])}
      />

      <PageHero
        eyebrow="Selected work"
        watermark="Portfolio"
        title={
          <>
            Work we&apos;d happily{" "}
            <span className="marker-underline text-brand">show our mothers.</span>
          </>
        }
        description={`${projects.length} projects across launch campaigns, identity systems, property films and the sites that carry them.`}
      >
        {/* In-page jumps double as a category filter without any client JS. */}
        {grouped.map((group) => (
          <ButtonLink key={group.slug} href={`#${group.slug}`} variant="paper" size="sm">
            {group.label}
          </ButtonLink>
        ))}
      </PageHero>

      {grouped.map((group, groupIndex) => (
        <PaperSection
          key={group.slug}
          id={group.slug}
          tone={groupIndex % 2 === 0 ? "paper" : "tint"}
          tearTop={groupIndex % 2 === 0 ? undefined : "var(--paper)"}
          tearBottom={groupIndex % 2 === 0 ? undefined : "var(--paper)"}
        >
          <Container className="scroll-mt-28 py-20 sm:py-24">
            <SectionHeading
              eyebrow={`${group.items.length} project${group.items.length === 1 ? "" : "s"}`}
              watermark={group.label.split(" ").pop()}
              title={group.label}
              className="mb-12"
            />

            <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((project, index) => (
                <Reveal as="li" key={project.id} delay={(index % 3) * 90}>
                  <ProjectCard project={project} priority={groupIndex === 0 && index < 3} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </PaperSection>
      ))}

      {/* About, brief */}
      <PaperSection tone="paper">
        <Container className="py-24 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Who made these"
                watermark="Studio"
                title="Everything above came out of one room"
                description={aboutCopy.short}
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/about" variant="outline">
                  About the studio
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/services" variant="ghost">
                  What we do
                </ButtonLink>
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-4 sm:gap-5">
              {site.stats.map((stat) => (
                <li key={stat.label}>
                  <Sheet tiltSeed={`pf-${stat.label}`} maxTilt={2.4} className="px-5 py-7 text-center">
                    <p className="font-display text-3xl font-bold text-brand sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-xs leading-tight text-ink-soft">{stat.label}</p>
                  </Sheet>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </PaperSection>

      {/* Office tour */}
      <PaperSection tone="sunken" tearTop="var(--paper)">
        <Container className="py-24 sm:py-28">
          <SectionHeading
            eyebrow="Come in"
            watermark="Office"
            align="center"
            title="A tour of the studio"
            description="Strategy, design, film and development all happen within about twenty metres of each other. That is the whole trick."
            className="mb-14"
          />

          <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICE_TOUR.map((shot, index) => (
              <Reveal as="li" key={shot.caption} delay={index * 90}>
                <figure className="relative">
                  <Tape
                    className="-top-3 left-1/2 z-20 h-6 w-20 -translate-x-1/2"
                    rotate={index % 2 ? 5 : -5}
                    tone={index % 2 ? "brand" : "accent"}
                  />
                  <Sheet tiltSeed={shot.caption} maxTilt={2.2} className="p-2.5">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-paper-sunken">
                      <Image
                        src={cloudinaryUrl(shot.image, { width: 600, height: 750 })}
                        alt={shot.caption}
                        fill
                        sizes="(max-width: 640px) 90vw, 22vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="px-1 pt-3 pb-1 text-center font-hand text-lg text-ink-soft">
                      {shot.caption}
                    </figcaption>
                  </Sheet>
                </figure>
              </Reveal>
            ))}
          </ul>

          <StickyNote tone="accent" tiltSeed="office-note" className="mx-auto mt-14 max-w-md">
            <p className="font-hand text-xl leading-snug">
              Want to see it in person? The kettle is always on — drop us a line
              and come by.
            </p>
          </StickyNote>
        </Container>
      </PaperSection>

      <ContactBlock
        tone="tint"
        tearTop="var(--paper-sunken)"
        heading="Yours could be next on this page."
        description="Tell us what you're launching and we'll show you the closest thing we've done to it."
      />
    </>
  );
}
