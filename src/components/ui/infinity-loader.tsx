import * as React from "react";
import { cn } from "@/lib/utils";

// Self-contained keyframes so the loader works anywhere it is dropped in.
const animationKeyframes = `
  @keyframes infinity-loader-travel {
    0% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -100; }
  }
`;

const INFINITY_PATH =
  "M29.76 18.72 c0 7.28-3.92 13.6-9.84 16.96 c-2.88 1.68-6.24 2.64-9.84 2.64 c-3.6 0-6.88-0.96-9.76-2.64 c0-7.28 3.92-13.52 9.84-16.96 c2.88-1.68 6.24-2.64 9.76-2.64 S26.88 17.04 29.76 18.72 c5.84 3.36 9.76 9.68 9.84 16.96 c-2.88 1.68-6.24 2.64-9.76 2.64 c-3.6 0-6.88-0.96-9.84-2.64 c-5.84-3.36-9.76-9.68-9.76-16.96 c0-7.28 3.92-13.6 9.76-16.96 C25.84 5.12 29.76 11.44 29.76 18.72z";

export interface InfinityLoaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The size of the loader in pixels.
   * @default 40
   */
  size?: number;
  /** Text for screen readers. */
  label?: string;
}

/**
 * Brand loader: an amber stroke travelling round a faint track. Recolour the
 * moving stroke with e.g. `[&>svg>path:last-child]:stroke-brand`.
 */
export function InfinityLoader({
  className,
  size = 40,
  label = "Loading…",
  ...props
}: InfinityLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <style>{animationKeyframes}</style>
      {/* viewBox padded by 2px so the 4px stroke is not clipped */}
      <svg viewBox="-2 -2 44 44" height={size} width={size} aria-hidden="true">
        <path
          className="stroke-line-strong"
          fill="none"
          strokeWidth={4}
          pathLength={100}
          d={INFINITY_PATH}
        />
        <path
          style={{ animation: "infinity-loader-travel 2s linear infinite" }}
          className="stroke-accent"
          fill="none"
          strokeWidth={4}
          strokeDasharray="15, 85"
          strokeDashoffset={0}
          strokeLinecap="round"
          pathLength={100}
          d={INFINITY_PATH}
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}
