import { cn, seededTilt } from "@/lib/utils";

/**
 * The paper vocabulary the whole site is drawn with: sheets, tape, pins,
 * polaroids, hanging tags, playing cards and doodles.
 *
 * These are all server components — the paper look is static, and only the few
 * pieces that respond to scroll or clicks (`FlipCard`, `Reveal`) live in
 * separate client files.
 */

/* -------------------------------------------------------------------------- */
/* Layout                                                                     */
/* -------------------------------------------------------------------------- */

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "narrow" | "default" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section heading                                                            */
/* -------------------------------------------------------------------------- */

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  /** Oversized ghost word behind the heading, as in the theme mockup. */
  watermark?: string;
  align?: "left" | "center";
  className?: string;
  /** Light-on-dark variant for brand-coloured bands. */
  inverted?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  watermark,
  align = "left",
  className,
  inverted = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "relative",
        align === "center" && "text-center",
        className,
      )}
    >
      {watermark && (
        <span
          aria-hidden="true"
          className={cn(
            "watermark absolute -top-8 z-0 hidden text-[7rem] leading-none sm:block lg:text-[9rem]",
            align === "center" ? "left-1/2 -translate-x-1/2" : "-left-2",
            inverted && "text-white opacity-[0.13]",
          )}
        >
          {watermark}
        </span>
      )}

      <div className="relative z-10">
        {eyebrow && (
          <p className={cn("eyebrow mb-3", inverted && "text-accent")}>{eyebrow}</p>
        )}
        <h2
          className={cn(
            "text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-5xl",
            inverted ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-4 max-w-2xl text-base leading-relaxed sm:text-lg",
              align === "center" && "mx-auto",
              inverted ? "text-white/80" : "text-ink-soft",
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sheets                                                                     */
/* -------------------------------------------------------------------------- */

interface SheetProps {
  children: React.ReactNode;
  className?: string;
  /** Stable key so the random-looking tilt survives hydration. */
  tiltSeed?: string;
  maxTilt?: number;
  /** Adds the folded bottom-right corner. */
  fold?: boolean;
  as?: "div" | "article" | "li" | "figure";
}

export function Sheet({
  children,
  className,
  tiltSeed,
  maxTilt = 1.5,
  fold = false,
  as: Tag = "div",
}: SheetProps) {
  const tilt = tiltSeed ? seededTilt(tiltSeed, maxTilt) : 0;

  return (
    <Tag
      className={cn("sheet paper-grain overflow-hidden", fold && "sheet-fold", className)}
      style={tilt ? { transform: `rotate(${tilt.toFixed(2)}deg)` } : undefined}
    >
      {children}
    </Tag>
  );
}

/** A strip of masking tape. Position it with `className` on the parent. */
export function Tape({
  className,
  rotate = -4,
  tone = "accent",
}: {
  className?: string;
  rotate?: number;
  tone?: "accent" | "brand" | "paper";
}) {
  const background =
    tone === "accent"
      ? "color-mix(in srgb, var(--accent) 62%, transparent)"
      : tone === "brand"
        ? "color-mix(in srgb, var(--brand-soft) 70%, transparent)"
        : "color-mix(in srgb, var(--paper-sunken) 90%, transparent)";

  return (
    <span
      aria-hidden="true"
      className={cn("tape", className)}
      style={{ transform: `rotate(${rotate}deg)`, background }}
    />
  );
}

/** A pushpin head, used to pin notes to the board. */
export function Pin({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute h-4 w-4 rounded-full bg-brand shadow-lift-sm ring-2 ring-white/60",
        className,
      )}
    >
      <span className="absolute inset-[3px] rounded-full bg-white/35" />
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Sticky note                                                                */
/* -------------------------------------------------------------------------- */

export function StickyNote({
  children,
  className,
  tone = "accent",
  tiltSeed,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "accent" | "brand" | "paper";
  tiltSeed?: string;
}) {
  const tilt = tiltSeed ? seededTilt(tiltSeed, 3) : -2;

  return (
    <div
      className={cn(
        "paper-grain relative p-6 shadow-lift-md",
        tone === "accent" && "bg-accent text-[#2a2135]",
        tone === "brand" && "bg-brand text-on-brand",
        tone === "paper" && "bg-paper-raised text-ink",
        className,
      )}
      style={{
        transform: `rotate(${tilt.toFixed(2)}deg)`,
        // A square note with one softly curled corner.
        clipPath: "polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)",
      }}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Doodles                                                                    */
/* -------------------------------------------------------------------------- */

/** Hand-drawn paper aeroplane with a dashed trail, scattered as decoration. */
export function PaperPlane({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 70"
      className={cn("pointer-events-none absolute text-brand-soft", className)}
      fill="none"
    >
      <path
        d="M6 46c14-14 30-22 46-24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 7"
      />
      <circle cx="24" cy="42" r="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 5" />
      <path d="M112 8 60 34l20 6 4 20 28-52Z" fill="currentColor" opacity="0.85" />
      <path d="M80 40 112 8" stroke="var(--paper)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Dashed motion arc, the "something just moved through here" mark. */
export function DoodleSwoosh({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 40"
      className={cn("pointer-events-none absolute text-brand-soft", className)}
      fill="none"
    >
      <path
        d="M2 30C40 6 118 2 158 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="8 9"
      />
    </svg>
  );
}

/** Small starburst, used to punctuate headings and CTAs. */
export function DoodleStar({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("pointer-events-none text-accent", className)}
      fill="currentColor"
    >
      <path d="M12 0c.6 6.4 5 10.8 12 12-7 1.2-11.4 5.6-12 12-.6-6.4-5-10.8-12-12C7 10.8 11.4 6.4 12 0Z" />
    </svg>
  );
}
