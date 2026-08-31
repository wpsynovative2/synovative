import { ArrowRight, Play } from "lucide-react";
import { site } from "@/content/site";
import { Container, DoodleStar } from "@/components/paper/primitives";
import { TornEdge } from "@/components/paper/torn-edge";
import { ButtonLink } from "@/components/ui/button";

/**
 * Home hero — the cut-paper city from the theme mockup, built as layered SVG
 * rather than a flat image so it scales, recolours with the theme, and costs
 * nothing to download.
 *
 * Depth comes from three skyline bands at decreasing opacity, a drone tracing
 * a speed line across the sky, and a speech bubble in the hand-lettered voice
 * the brand uses in its own creative.
 */

function PaperSkyline() {
  return (
    // Kept to the lower half and lightly inked so the copy and stat row above
    // it stay legible — it is a backdrop, not an illustration in its own right.
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[46%] opacity-70">
      {/* Far band */}
      <svg
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-full w-full text-brand-soft opacity-25"
      >
        <path
          fill="currentColor"
          d="M0 300V150h60v-40h40v40h50V96h70v54h40v-70h56v70h48v-34h64v34h50v-58h62v58h44v-44h58v44h54v-72h60v72h48v-30h62v30h56v-52h58v52h40v-38h40v38h40v150Z"
        />
      </svg>
      {/* Mid band */}
      <svg
        viewBox="0 0 1200 240"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[78%] w-full text-brand-soft opacity-40"
      >
        <path
          fill="currentColor"
          d="M0 240V120h54v-34h46v34h44V70h58v50h52v-28h50v28h44V58h62v62h48v-30h56v30h48V78h60v42h46v-24h58v24h52V64h56v56h44v-26h42v26h30v120Z"
        />
      </svg>
      {/* Near band, plus the street the pencil skateboard rides along. */}
      <svg
        viewBox="0 0 1200 180"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[52%] w-full text-brand opacity-[0.18]"
      >
        <path
          fill="currentColor"
          d="M0 180V96h70v-26h52v26h60V52h64v44h58V72h56v24h60V44h68v52h58V66h56v30h62V50h64v46h58V74h54v22h60v84Z"
        />
      </svg>
    </div>
  );
}

function Drone() {
  return (
    <div
      aria-hidden="true"
      // Sits in open sky on the right, clear of the headline and below the
      // speech bubble, with its trail reading as if it flew in from the left.
      className="absolute top-[44%] right-[16%] hidden w-44 animate-float lg:block xl:w-52"
    >
      {/* Speed lines trailing behind the drone. */}
      <svg viewBox="0 0 210 90" className="w-full" fill="none">
        <g stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5">
          <path d="M0 30h44" />
          <path d="M8 40h48" />
          <path d="M2 50h38" />
        </g>

        {/* Arms and rotors */}
        <g stroke="var(--brand-deep)" strokeWidth="6" strokeLinecap="round">
          <path d="M78 34 62 22M132 34l16-12M78 52 62 64M132 52l16 12" />
        </g>
        <g fill="var(--accent)">
          <ellipse cx="58" cy="20" rx="17" ry="4" />
          <ellipse cx="152" cy="20" rx="17" ry="4" />
          <ellipse cx="58" cy="66" rx="17" ry="4" />
          <ellipse cx="152" cy="66" rx="17" ry="4" />
        </g>

        {/* Body */}
        <rect x="76" y="30" width="58" height="26" rx="10" fill="var(--brand)" />
        <rect x="88" y="36" width="34" height="14" rx="6" fill="var(--accent)" />
        <circle cx="105" cy="58" r="9" fill="var(--brand-deep)" />
        <circle cx="105" cy="58" r="4" fill="var(--accent)" />
      </svg>
    </div>
  );
}

function SpeechBubble() {
  return (
    <div
      aria-hidden="true"
      className="absolute top-[16%] right-[6%] hidden w-60 lg:block"
      style={{ transform: "rotate(2deg)" }}
    >
      <div className="paper-grain relative rounded-3xl border-[3px] border-brand-deep bg-paper-raised px-6 py-5 text-center shadow-lift-lg">
        <p className="font-hand text-sm tracking-widest text-ink-soft uppercase">Shhh…</p>
        <p className="font-display text-xl leading-tight font-bold tracking-wide text-brand uppercase">
          Synovative ka drone
        </p>
        <p className="font-display text-sm font-semibold tracking-widest text-ink uppercase">
          kaam pe hai!
        </p>
        {/* Bubble tail */}
        <svg
          viewBox="0 0 40 34"
          className="absolute -bottom-[30px] left-10 h-8 w-10"
          fill="none"
        >
          <path
            d="M4 0C6 14 16 26 34 30 20 26 10 16 4 0Z"
            fill="var(--paper-raised)"
            stroke="var(--brand-deep)"
            strokeWidth="3"
          />
        </svg>
      </div>
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="paper-grain relative isolate flex min-h-[calc(100vh-6rem)] items-center overflow-hidden bg-paper-tint">
      <PaperSkyline />
      <Drone />
      <SpeechBubble />

      <Container className="relative z-20 pt-10 pb-32 sm:pt-14">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5 flex items-center gap-2">
            <DoodleStar className="h-3.5 w-3.5" />
            {site.tagline}
          </p>

          <h1 className="text-4xl leading-[1.05] font-bold text-ink sm:text-5xl lg:text-[3.9rem]">
            Marketing that&apos;s{" "}
            <span className="marker-underline text-brand">cut by hand,</span>{" "}
            measured by numbers.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Strategy, film, design, media and development — one studio, one
            voice, from the first sketch to the last click. We build brands that
            look handmade and report like a spreadsheet.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact#enquiry" size="lg">
              Start a project
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/portfolio" variant="paper" size="lg">
              <Play className="h-4 w-4 text-brand" />
              See our work
            </ButtonLink>
          </div>

          {/* Proof strip */}
          <dl className="mt-14 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {site.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold text-brand sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-0.5 block text-xs leading-tight text-ink-faint">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <TornEdge position="bottom" fill="var(--paper)" height={52} />
    </section>
  );
}
