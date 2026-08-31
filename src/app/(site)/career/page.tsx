import { Briefcase, MapPin } from "lucide-react";
import { careersCopy, site } from "@/content/site";
import { fetchJobs } from "@/lib/firebase/collections";
import { formatCurrency, formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, jobPostingSchema } from "@/lib/seo/schema";
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
import { ApplicationForm } from "@/components/forms/application-form";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { JobPosting } from "@/types";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Open roles at Synovative — video editors, performance marketers, designers and social media managers. Small teams, real ownership, work that ships.",
  path: "/career",
  keywords: [
    "marketing agency jobs Mumbai",
    "video editor jobs",
    "performance marketing jobs",
    "graphic designer jobs",
  ],
});

const EMPLOYMENT_LABEL: Record<JobPosting["employmentType"], string> = {
  FULL_TIME: "Full time",
  PART_TIME: "Part time",
  CONTRACTOR: "Contract",
  INTERN: "Internship",
  TEMPORARY: "Temporary",
};

function salaryLabel(job: JobPosting) {
  if (!job.salaryRange) return "Competitive";
  const { min, max, currency, unit } = job.salaryRange;
  const suffix = unit === "MONTH" ? "/month" : "/year";
  return `${formatCurrency(min, currency)}–${formatCurrency(max, currency)}${suffix}`;
}

export default async function CareerPage() {
  const jobs = await fetchJobs();

  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Career", path: "/career" },
          ]),
          // One JobPosting entity per open role, as Google Jobs expects.
          ...jobs.map(jobPostingSchema),
        ]}
      />

      <PageHero
        eyebrow="Careers"
        watermark="Join us"
        title={careersCopy.heading}
        description={careersCopy.intro}
      >
        <ButtonLink href="#openings" size="lg">
          See {jobs.length} open role{jobs.length === 1 ? "" : "s"}
        </ButtonLink>
        <ButtonLink href="#apply" variant="paper" size="lg">
          Open application
        </ButtonLink>
      </PageHero>

      {/* Perks */}
      <PaperSection tone="paper">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            eyebrow="Why here"
            watermark="Studio"
            align="center"
            title="What working here is actually like"
            className="mb-14"
          />

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {careersCopy.perks.map((perk, index) => (
              <Reveal as="li" key={perk.title} delay={index * 90}>
                <Sheet tiltSeed={perk.title} maxTilt={1.8} className="h-full p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-wash text-accent-deep">
                    <Icon name={perk.icon} className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {perk.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{perk.body}</p>
                </Sheet>
              </Reveal>
            ))}
          </ul>
        </Container>
      </PaperSection>

      {/* Openings */}
      <PaperSection id="openings" tone="tint" tearTop="var(--paper)" tearBottom="var(--paper)">
        <Container className="scroll-mt-28 py-24 sm:py-28">
          <SectionHeading
            eyebrow="Open roles"
            watermark="Hiring"
            title={
              jobs.length > 0
                ? `${jobs.length} position${jobs.length === 1 ? "" : "s"} open right now`
                : "No open positions at the moment"
            }
            description={
              jobs.length > 0
                ? "Every role reports to someone who does the same work. Read the whole card before you apply — we wrote them honestly."
                : "Nothing open today, but we always read open applications. Send one below and we'll keep it on file."
            }
            className="mb-14"
          />

          <ul className="space-y-6">
            {jobs.map((job, index) => (
              <Reveal as="li" key={job.id} delay={index * 70}>
                <Sheet tiltSeed={job.id} maxTilt={0.5} className="p-7 sm:p-9">
                  <div className="flex flex-wrap items-start justify-between gap-5">
                    <div>
                      <p className="eyebrow mb-2">{job.department}</p>
                      <h3 className="font-display text-2xl font-semibold text-ink">
                        {job.title}
                      </h3>

                      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
                        <li className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-brand" />
                          {job.location}
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4 text-brand" />
                          {EMPLOYMENT_LABEL[job.employmentType]} · {job.experience}
                        </li>
                        <li className="font-medium text-ink">{salaryLabel(job)}</li>
                      </ul>
                    </div>

                    <ButtonLink href={`#apply`} variant="accent" size="sm" className="shrink-0">
                      Apply
                    </ButtonLink>
                  </div>

                  <p className="mt-5 leading-relaxed text-ink-soft">{job.description}</p>

                  <div className="mt-6 grid gap-7 border-t border-line pt-6 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-3 font-display text-sm font-semibold tracking-[0.14em] text-ink uppercase">
                        What you&apos;ll do
                      </h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map((item) => (
                          <li key={item} className="flex gap-2.5 text-sm text-ink-soft">
                            <DoodleStar className="mt-1 h-3 w-3 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-3 font-display text-sm font-semibold tracking-[0.14em] text-ink uppercase">
                        What we&apos;re looking for
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map((item) => (
                          <li key={item} className="flex gap-2.5 text-sm text-ink-soft">
                            <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="mt-6 text-xs text-ink-faint">
                    Posted {formatDate(job.postedAt)}
                    {job.validThrough && ` · Applications close ${formatDate(job.validThrough)}`}
                  </p>
                </Sheet>
              </Reveal>
            ))}
          </ul>
        </Container>
      </PaperSection>

      {/* Application form */}
      <PaperSection id="apply" tone="paper">
        <Container className="scroll-mt-28 py-24 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Apply"
                watermark="You"
                title="Send us your work"
              />
              <p className="mt-5 leading-relaxed text-ink-soft">
                We read every application and reply either way, usually within a
                week. A link to something you made counts for far more than a
                well-formatted CV.
              </p>

              <StickyNote tone="brand" tiltSeed="career-note" className="mt-9 max-w-xs">
                <p className="font-hand text-xl leading-snug">
                  No role that fits? Send an open application anyway. Two of our
                  team joined that way.
                </p>
              </StickyNote>

              <p className="mt-8 text-sm text-ink-soft">
                Prefer email?{" "}
                <a
                  href={`mailto:${site.contact.careersEmail}`}
                  className="font-semibold text-brand hover:underline"
                >
                  {site.contact.careersEmail}
                </a>
              </p>
            </div>

            <Sheet className="p-6 sm:p-9">
              <ApplicationForm jobs={jobs} />
            </Sheet>
          </div>
        </Container>
      </PaperSection>
    </>
  );
}
