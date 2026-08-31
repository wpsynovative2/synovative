import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aboutCopy, site } from "@/content/site";
import { services } from "@/content/services";
import {
  fetchFeaturedProjects,
  fetchLatestPosts,
  fetchTestimonials,
} from "@/lib/firebase/collections";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  Container,
  DoodleSwoosh,
  SectionHeading,
  Sheet,
  StickyNote,
} from "@/components/paper/primitives";
import { PaperSection } from "@/components/paper/torn-edge";
import { HangingTags } from "@/components/paper/hanging-tags";
import { Reveal } from "@/components/paper/reveal";
import { HomeHero } from "@/components/sections/home-hero";
import { ProjectCard } from "@/components/sections/project-card";
import { BlogCard } from "@/components/sections/blog-card";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { ContactBlock } from "@/components/sections/contact-block";
import { ButtonLink } from "@/components/ui/button";
import { Hero } from "@/components/sections/Hero";

export const metadata = buildMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: "/",
  keywords: [
    "digital marketing agency",
    "360 degree marketing",
    "real estate marketing agency",
    "social media agency Mumbai",
    "performance marketing India",
  ],
});

export default async function HomePage() {
  const [featured, latestPosts, testimonials] = await Promise.all([
    fetchFeaturedProjects(6),
    fetchLatestPosts(3),
    fetchTestimonials(),
  ]);

  return (
    <>
      {/* <HomeHero /> */}
      <Hero />

      {/* About — short. `id` is the Hero's skip-button target. */}
      <PaperSection id="next-section" tone="paper">
        <Container className="py-24 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Who we are"
                watermark="About"
                title={
                  <>
                    One studio. <span className="text-brand">Every part</span>{" "}
                    of the story.
                  </>
                }
                description={aboutCopy.short}
              />

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/about" variant="outline">
                  More about us
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/portfolio" variant="ghost">
                  See the work
                </ButtonLink>
              </div>
            </div>

            {/* Stats as pinned index cards */}
            <div className="relative">
              <DoodleSwoosh className="-top-6 right-6 hidden h-8 w-32 lg:block" />
              <ul className="grid grid-cols-2 gap-4 sm:gap-5">
                {site.stats.map((stat, index) => (
                  <Reveal as="li" key={stat.label} delay={index * 90}>
                    <Sheet
                      tiltSeed={stat.label}
                      maxTilt={2.5}
                      className="px-5 py-7 text-center"
                    >
                      <p className="font-display text-3xl font-bold text-brand sm:text-4xl">
                        {stat.value}
                      </p>
                      <p className="mt-1.5 text-xs leading-tight text-ink-soft">
                        {stat.label}
                      </p>
                    </Sheet>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </PaperSection>

      {/* Services — the hanging tags */}
      <PaperSection
        tone="tint"
        tearTop="var(--paper)"
        tearBottom="var(--paper)"
      >
        <Container className="py-28 sm:py-32">
          <SectionHeading
            eyebrow="What we do"
            watermark="Services"
            align="center"
            title="Five things, done properly"
            description="Pick one, or hand us the whole brand. Either way the same team plans it, makes it and reports on it."
            className="mb-16"
          />

          <HangingTags />

          <div className="mt-16 flex justify-center">
            <ButtonLink href="/services" variant="outline">
              All services in detail
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </PaperSection>

      {/* Featured projects */}
      <PaperSection tone="paper">
        <Container className="py-24 sm:py-28">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Selected work"
              watermark="Projects"
              title={
                <>
                  Our featured <span className="text-brand">projects</span>
                </>
              }
              description="Launch campaigns, brand systems, property films and the sites they land on."
            />
            <ButtonLink
              href="/portfolio"
              variant="paper"
              size="sm"
              className="shrink-0"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, index) => (
              <Reveal as="li" key={project.id} delay={(index % 3) * 90}>
                <ProjectCard project={project} priority={index < 3} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </PaperSection>

      {/* Latest blogs */}
      <PaperSection tone="sunken" tearTop="var(--paper)">
        <Container className="py-24 sm:py-28">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="From the desk"
              watermark="Journal"
              title="Things we've written down"
              description="Practical notes from the studio floor — what worked, what did not, and what we changed."
            />
            <ButtonLink
              href="/blogs"
              variant="paper"
              size="sm"
              className="shrink-0"
            >
              All posts
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          <ul className="grid gap-7 md:grid-cols-3">
            {latestPosts.map((post, index) => (
              <Reveal as="li" key={post.id} delay={index * 90}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </ul>

          <StickyNote
            tone="brand"
            tiltSeed="blog-note"
            className="mx-auto mt-14 max-w-md"
          >
            <p className="font-hand text-xl leading-snug">
              We publish only when we have something worth saying. Roughly twice
              a month.
            </p>
          </StickyNote>
        </Container>
      </PaperSection>

      <TestimonialsSection
        testimonials={testimonials}
        tearBottom="var(--paper)"
      />

      {/* Service quick-links, for crawlers and for the undecided */}
      <PaperSection tone="paper">
        <Container className="py-16">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex rounded-full border border-line bg-paper-raised px-4 py-2 font-display text-xs font-semibold tracking-[0.1em] text-ink-soft uppercase shadow-lift-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </PaperSection>

      <ContactBlock tone="tint" tearTop="var(--paper)" />
    </>
  );
}
