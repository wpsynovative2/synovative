"use client";

import { useState } from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@/lib/cloudinary";

/**
 * Before/after comparison for the grading showcase.
 *
 * Driven by a real range input rather than pointer maths: it is draggable with
 * a mouse, a finger and the arrow keys, is announced correctly by screen
 * readers, and needs no event listeners of its own.
 */
export function BeforeAfter({
  before,
  after,
  label = "Comparison",
}: {
  before: string;
  after: string;
  label?: string;
}) {
  const [position, setPosition] = useState(50);

  return (
    <figure className="sheet paper-grain overflow-hidden">
      <div className="relative aspect-video select-none">
        {/* After — the full-width base layer. */}
        <Image
          src={cloudinaryUrl(after, { width: 1400, height: 788 })}
          alt={`${label} — after grading`}
          fill
          sizes="(max-width: 1024px) 92vw, 900px"
          className="object-cover"
        />

        {/* Before — clipped to the slider position. */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={cloudinaryUrl(before, { width: 1400, height: 788 })}
            alt={`${label} — before grading`}
            fill
            sizes="(max-width: 1024px) 92vw, 900px"
            className="object-cover"
          />
        </div>

        {/* Divider and handle. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-lift-md"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand shadow-lift-md">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M9 6 4 12l5 6zM15 6l5 6-5 6z" />
            </svg>
          </span>
        </div>

        <span className="absolute top-3 left-3 rounded-full bg-[#2a2135]/75 px-3 py-1 font-display text-[0.65rem] font-semibold tracking-[0.14em] text-white uppercase">
          Before
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-accent px-3 py-1 font-display text-[0.65rem] font-semibold tracking-[0.14em] text-[#2a2135] uppercase">
          After
        </span>

        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`${label}: drag to compare before and after`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      <figcaption className="border-t border-line px-5 py-3 text-sm text-ink-soft">
        {label} — drag to compare the raw camera file against the delivered master.
      </figcaption>
    </figure>
  );
}
