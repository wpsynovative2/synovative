import Link from "next/link";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

/**
 * The five services as luggage tags clipped to a slack rope — the signature
 * element of the Synovative theme.
 *
 * The rope is one SVG spanning the full row so the sag is continuous rather
 * than repeated per tag. Each tag hangs at its own resting angle and sways
 * gently, with the sway paused for anyone who prefers reduced motion (handled
 * globally in `globals.css`).
 */

/* -------------------------------------------------------------------------- */
/* Rope geometry                                                              */
/* -------------------------------------------------------------------------- */

/** Height of the rope's SVG box, in px (it renders 1:1 — see the note below). */
const ROPE_BOX_HEIGHT = 80;
/** Where the rope meets each end of the row. */
const ROPE_TOP = 12;
/** How much further the rope dips at the centre. */
const ROPE_SAG = 46;

/**
 * A quadratic Bézier whose control point sits `2 × SAG` below the two ends
 * traces exactly `y = TOP + 4·SAG·t(1−t)` while `x` advances linearly with `t`.
 *
 * That identity is the whole point: it means the rope's height at any
 * horizontal fraction has a closed form (`ropeYAt` below), so the clips can be
 * positioned from the same numbers that draw the rope. The previous version
 * kept a separate hand-tuned offset array, which had drifted out of sync with
 * the curve — inverted, and roughly a fifth of the sag's actual depth.
 */
const ROPE_PATH = `M0,${ROPE_TOP} Q600,${ROPE_TOP + ROPE_SAG * 2} 1200,${ROPE_TOP}`;

/** Rope height at a horizontal position given as a 0–1 fraction of the row. */
function ropeYAt(fraction: number) {
  return ROPE_TOP + 4 * ROPE_SAG * fraction * (1 - fraction);
}

/**
 * Distance from the top of a clasp icon to the centre of its ring — the point
 * that must land on the rope. The icon is 36px tall over a 44-unit viewBox and
 * the ring spans units 0–13, so its centre is at 6.5/44 × 36 ≈ 5px.
 */
const CLIP_RING_CENTRE = 5;

/** A slight lean per tag, so the row does not read as machine-placed. */
const REST_ANGLES = [-2.5, 1.5, -1, 2, -2];

export function HangingTags({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {/*
       * `preserveAspectRatio="none"` stretches the rope horizontally to any
       * container width. The box is 80 units tall and renders at 80px, so the
       * vertical scale stays 1:1 and `ropeYAt` returns real pixels.
       */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 1200 ${ROPE_BOX_HEIGHT}`}
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 hidden h-20 w-full md:block"
      >
        <path
          d={ROPE_PATH}
          fill="none"
          stroke="var(--brand-deep)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Twist highlight, so the rope reads as braided rather than a tube. */}
        <path
          d={ROPE_PATH}
          fill="none"
          stroke="var(--brand-soft)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="9 11"
          opacity="0.85"
        />
      </svg>

      <ul className="relative grid grid-cols-2 gap-x-4 gap-y-8 md:flex md:items-start md:justify-between md:gap-3">
        {services.map((service, index) => {
          // Each tag is centred in its own equal-width column.
          const fraction = (index + 0.5) / services.length;
          const hang = ropeYAt(fraction) - CLIP_RING_CENTRE;

          return (
            <li
              key={service.slug}
              // Applied through a custom property so the drop only kicks in at
              // `md`, where the rope is actually shown; below that the tags are
              // a plain two-column grid and must stay level.
              style={{ "--hang": `${hang.toFixed(1)}px` } as React.CSSProperties}
              className="flex justify-center md:flex-1 md:pt-[var(--hang)]"
            >
              <ServiceTag
                href={`/services/${service.slug}`}
                label={service.tagLabel}
                icon={service.icon}
                tone={service.tone}
                angle={REST_ANGLES[index] ?? 0}
                delay={index * 0.35}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface ServiceTagProps {
  href: string;
  /** Newline-separated so the label breaks exactly where the design intends. */
  label: string;
  icon: string;
  tone: "brand" | "accent";
  angle: number;
  delay: number;
}

function ServiceTag({ href, label, icon, tone, angle, delay }: ServiceTagProps) {
  return (
    <Link
      href={href}
      className="group flex w-full max-w-[11rem] flex-col items-center outline-none"
    >
      {/* Clip: a lobster clasp holding the tag to the rope. */}
      <span aria-hidden="true" className="relative z-10 flex flex-col items-center">
        <svg viewBox="0 0 24 44" className="h-9 w-5 text-brand-deep" fill="none">
          <rect x="8" y="0" width="8" height="13" rx="4" stroke="currentColor" strokeWidth="2.5" />
          <rect
            x="5"
            y="12"
            width="14"
            height="26"
            rx="5"
            fill="var(--brand)"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M12 18v13" stroke="var(--brand-soft)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>

      {/*
       * Pulled up under the clasp so its body ends inside the punched eyelet,
       * reading as one threaded object rather than a tag floating below a clip.
       */}
      <span
        className={cn(
          "paper-grain relative -mt-5 flex aspect-square w-full flex-col items-center justify-center gap-2.5 rounded-3xl px-3 pt-6 pb-5 shadow-lift-md",
          "origin-top animate-sway transition-[transform,box-shadow] duration-300",
          "group-hover:animate-none group-hover:-translate-y-1 group-hover:shadow-lift-lg",
          "group-focus-visible:animate-none group-focus-visible:-translate-y-1",
          tone === "brand"
            ? "bg-brand-soft text-brand-deep dark:text-[#1b1327]"
            : "bg-accent text-[#2a2135]",
        )}
        style={{ rotate: `${angle}deg`, animationDelay: `${delay}s` }}
      >
        {/*
         * Punched eyelet the clasp passes through. A translucent dark disc
         * rather than a page-coloured one: this strip sits on `tint` paper on
         * the home page and plain `paper` on /services, so any fixed colour
         * would only match one of them.
         */}
        <span className="absolute top-2.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-black/20 shadow-inner" />

        <span className="mt-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/35 shadow-inner">
          <Icon name={icon} className="h-5 w-5" strokeWidth={2.2} />
        </span>

        <span className="font-display text-[0.78rem] leading-tight font-semibold tracking-[0.1em] whitespace-pre-line uppercase">
          {label}
        </span>
      </span>
    </Link>
  );
}
