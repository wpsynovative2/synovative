"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CrewCard } from "@/content/crew-cards";
import { useReveal } from "@/components/paper/reveal";
import { cn } from "@/lib/utils";

/**
 * "Many hats": a row of colour cards, each with a crew caricature standing up
 * out of it, which the visitor pages through with Prev / Next or by swiping.
 *
 * The track is a native scroll-snap container, so touch, trackpad and
 * keyboard scrolling all work without a carousel library. The buttons scroll
 * by one card. On first view the cards slide in one after another and each
 * figure rises onto its card a beat later.
 */

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function CrewCards({ cards }: { cards: CrewCard[] }) {
  const { ref: revealRef, revealed } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    // A pixel of slack covers sub-pixel rounding at either end.
    setCanPrev(track.scrollLeft > 1);
    setCanNext(track.scrollLeft < max - 1);
    setProgress(max > 0 ? track.scrollLeft / max : 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: dir * (first.offsetWidth + gap), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div ref={revealRef}>
      <ul
        ref={trackRef}
        aria-label="Crew crafts"
        className="isolate -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pt-6 pb-10 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:gap-6 sm:px-8 [&::-webkit-scrollbar]:hidden"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
      >
        {cards.map((card, index) => (
          <li
            key={card.id}
            className="group relative h-[430px] w-[74%] shrink-0 snap-start motion-reduce:transform-none! motion-reduce:transition-none! sm:h-[460px] sm:w-[290px] lg:w-[300px]"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "none" : "translateX(3rem) scale(0.96)",
              transition: `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`,
              transitionDelay: `${index * 120}ms`,
            }}
          >
            {/* The colour card, lower two thirds of the slot. */}
            <div
              className="absolute inset-x-0 bottom-0 h-[64%] rounded-[1.75rem] transition-transform duration-500 group-hover:-translate-y-1"
              style={{
                backgroundImage: `linear-gradient(160deg, ${card.from} 0%, ${card.to} 100%)`,
                boxShadow: `0 26px 40px -22px ${card.to}`,
              }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(120%_70%_at_20%_0%,rgba(255,255,255,0.28),transparent_60%)]"
              />
            </div>

            {/* Figure: stands on the card, head clear above it. */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 bottom-[5.25rem] flex justify-center motion-reduce:transform-none! motion-reduce:transition-none!"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "none" : "translateY(2.5rem)",
                transition: `opacity 0.7s ${EASE}, transform 0.9s ${EASE}`,
                transitionDelay: `${index * 120 + 260}ms`,
              }}
            >
              <Image
                src={card.image}
                alt=""
                width={card.width}
                height={card.height}
                sizes="(max-width: 640px) 50vw, 220px"
                className="h-full w-auto max-w-none origin-bottom drop-shadow-[0_18px_18px_rgba(0,0,0,0.22)] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.04]"
              />
            </div>

            {/* Label */}
            <div className="absolute inset-x-6 bottom-5 text-white">
              <h3 className="font-display text-2xl leading-none font-bold drop-shadow-sm">
                {card.name}
              </h3>
              <p className="mt-1.5 text-xs text-white/75">
                Craft{" "}
                <span className="ml-1 font-semibold text-white">{card.craft}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer: progress on the left, Prev / Next on the right. */}
      <div className="mt-2 flex items-center justify-between gap-6">
        <span className="relative h-[3px] w-28 overflow-hidden rounded-full bg-ink/10 sm:w-40">
          <span
            className="absolute inset-y-0 left-0 rounded-full bg-brand transition-[width] duration-200"
            style={{ width: `${Math.max(progress, 0.08) * 100}%` }}
          />
        </span>

        <div className="flex items-center gap-2">
          <StepButton label="Previous card" disabled={!canPrev} onClick={() => step(-1)}>
            <ChevronLeft className="h-4 w-4" strokeWidth={2.4} />
            Prev
          </StepButton>
          <StepButton label="Next card" disabled={!canNext} onClick={() => step(1)}>
            Next
            <ChevronRight className="h-4 w-4" strokeWidth={2.4} />
          </StepButton>
        </div>
      </div>
    </div>
  );
}

function StepButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex items-center gap-1 rounded-full px-4 py-2 font-display text-sm font-semibold text-ink transition-[background-color,opacity,transform] duration-200",
        "hover:bg-ink/[0.06] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        "disabled:pointer-events-none disabled:opacity-35",
      )}
    >
      {children}
    </button>
  );
}
