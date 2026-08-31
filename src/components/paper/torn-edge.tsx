import { cn } from "@/lib/utils";

/**
 * The ragged tear that separates one sheet of paper from the next.
 *
 * Rendered as a stretched SVG rather than an image so it adapts to any section
 * width without tiling seams. `fill` should be the colour of the section the
 * tear belongs to — the edge paints that colour over the section behind it.
 */

type Position = "top" | "bottom";

interface TornEdgeProps {
  /** `bottom` tears away from the section above; `top` tears into it. */
  position?: Position;
  /** Any CSS colour. Defaults to the page's paper colour. */
  fill?: string;
  /** Height of the tear in pixels. */
  height?: number;
  className?: string;
}

/**
 * A single-period ragged profile. `preserveAspectRatio="none"` stretches it
 * horizontally, which reads as a natural tear because the vertical detail is
 * preserved while the horizontal rhythm simply lengthens.
 */
const TEAR_PATH =
  "M0,26 C40,14 74,32 112,22 C150,12 182,30 224,20 C262,11 296,29 338,18 C378,8 412,26 452,17 C492,8 524,28 566,19 C606,10 640,27 682,17 C722,8 754,26 796,18 C836,10 870,28 912,19 C952,10 986,27 1028,18 C1068,9 1104,26 1140,20 C1170,15 1190,24 1200,20 L1200,60 L0,60 Z";

export function TornEdge({
  position = "bottom",
  fill = "var(--paper)",
  height = 44,
  className,
}: TornEdgeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 z-10 w-full",
        position === "bottom" ? "bottom-0" : "top-0",
        className,
      )}
      style={{ height }}
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="h-full w-full"
        style={{
          display: "block",
          // A bottom tear points down; flipping gives the top variant.
          transform: position === "top" ? "scaleY(-1)" : undefined,
        }}
      >
        <path d={TEAR_PATH} fill={fill} />
        {/* Exposed paper fibres along the tear line. */}
        <path
          d={TEAR_PATH}
          fill="none"
          stroke={fill}
          strokeWidth="3"
          strokeOpacity="0.55"
          transform="translate(0,-3)"
        />
      </svg>
    </div>
  );
}

/**
 * Wraps a section in paper: a tinted, grained surface with an optional tear on
 * either edge. Almost every band on the site is one of these.
 */
interface PaperSectionProps {
  children: React.ReactNode;
  /** Surface colour token for this band. */
  tone?: "paper" | "raised" | "tint" | "sunken" | "brand" | "accent";
  /** Colour of the section that follows, used to draw the bottom tear. */
  tearBottom?: string;
  /** Colour of the section that precedes, used to draw the top tear. */
  tearTop?: string;
  id?: string;
  className?: string;
}

const TONE_CLASS: Record<NonNullable<PaperSectionProps["tone"]>, string> = {
  paper: "bg-paper text-ink",
  raised: "bg-paper-raised text-ink",
  tint: "bg-paper-tint text-ink",
  sunken: "bg-paper-sunken text-ink",
  brand: "bg-brand-surface text-white",
  accent: "bg-accent text-[#2a2135]",
};

export function PaperSection({
  children,
  tone = "paper",
  tearBottom,
  tearTop,
  id,
  className,
}: PaperSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "paper-grain relative isolate overflow-hidden",
        TONE_CLASS[tone],
        className,
      )}
    >
      {tearTop && <TornEdge position="top" fill={tearTop} />}
      <div className="relative z-20">{children}</div>
      {tearBottom && <TornEdge position="bottom" fill={tearBottom} />}
    </section>
  );
}
