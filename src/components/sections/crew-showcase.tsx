"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Archivo } from "next/font/google";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { CrewSlide } from "@/content/crew-showcase";
import { TornEdge } from "@/components/paper/torn-edge";
import { cn } from "@/lib/utils";

/**
 * "Meet the crew" — papercraft caricatures standing in front of their own
 * oversized first name, cycling like a poster wall.
 *
 * Transition (per slide change, one GSAP timeline):
 *  - the section background cross-fades to the next slide's colour;
 *  - the outgoing figure zooms towards the camera and leaves sideways while
 *    the incoming one arrives zoomed-in from the other side and settles;
 *  - the big word rolls: old letters slide up out of a clip, new ones rise in.
 *
 * All slides are rendered stacked; GSAP owns their visibility and transforms.
 * React only tracks the active index for the counter, ARIA and the "up next"
 * chip — never for inline styles GSAP also writes (see `initialHidden`).
 */

// Archivo's width axis gives a tall condensed face for the backdrop word and
// an extended one for the name label — one variable file covers both.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-crew",
  display: "swap",
});

const SLIDE_SECONDS = 4.5;

/**
 * Average advance width of an uppercase letter at wdth 62 / wght 800, in em.
 * Used to size the word so any name fills ~86% (desktop) / ~94% (mobile) of
 * the stage width.
 */
const LETTER_EM = 0.5;

interface CrewShowcaseProps {
  slides: CrewSlide[];
  /** Colour of the section above, for the top tear. */
  tearTop?: string;
  /** Colour of the section below, for the bottom tear. */
  tearBottom?: string;
}

export function CrewShowcase({ slides, tearTop, tearBottom }: CrewShowcaseProps) {
  const rootRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const goToRef = useRef<(index: number, dir: 1 | -1) => void>(() => {});
  const syncRef = useRef<() => void>(() => {});
  // Autoplay runs unless the section is off screen or the visitor pressed
  // pause. Deliberately no hover/focus pausing: a click leaves focus (and the
  // pointer) inside the section, so "Play" would appear to do nothing.
  const pauseReasons = useRef({ offscreen: true, user: false });

  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const count = slides.length;
  const multiple = count > 1;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || count === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduced);

    let current = 0;
    let transition: gsap.core.Timeline | null = null;
    let timer: gsap.core.Tween | null = null;

    const ctx = gsap.context(() => {
      const slideEls = gsap.utils.toArray<HTMLElement>("[data-slide]", root);
      const part = (el: HTMLElement, name: string) =>
        el.querySelector<HTMLElement>(`[data-${name}]`);
      const letters = (el: HTMLElement) =>
        gsap.utils.toArray<HTMLElement>("[data-letter]", el);
      const labelLines = (el: HTMLElement) =>
        gsap.utils.toArray<HTMLElement>("[data-label-line]", el);

      slideEls.forEach((el, i) => {
        if (i === 0) return;
        gsap.set(el, { autoAlpha: 0 });
        gsap.set(letters(el), { yPercent: 110 });
      });

      if (!reduced) {
        // Gentle idle bob so a resting slide still feels alive.
        gsap.to("[data-float]", {
          yPercent: -1.6,
          duration: 2.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      const sync = () => {
        if (!timer) return;
        const r = pauseReasons.current;
        timer.paused(r.offscreen || r.user);
      };
      syncRef.current = sync;

      const restartTimer = () => {
        if (!timer) return;
        timer.restart();
        sync();
      };

      const goTo = (target: number, dir: 1 | -1) => {
        const next = ((target % count) + count) % count;
        if (next === current) return;
        transition?.progress(1);

        const from = slideEls[current];
        const to = slideEls[next];
        current = next;
        setActive(next);

        const tl = gsap.timeline({ onComplete: () => void gsap.set(from, { autoAlpha: 0 }) });
        transition = tl;

        tl.set(to, { autoAlpha: 1, zIndex: 2 }).set(from, { zIndex: 1 });
        tl.to(
          root,
          { backgroundColor: slides[next].background, duration: reduced ? 0.4 : 0.9, ease: "power2.inOut" },
          0,
        );

        if (reduced) {
          tl.fromTo(to, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0);
          tl.to(from, { opacity: 0, duration: 0.4 }, 0);
          tl.set(letters(to), { yPercent: 0 }, 0);
          tl.set([part(to, "figure"), ...labelLines(to)], { clearProps: "all" }, 0);
        } else {
          // Outgoing: figure lunges towards the camera and exits sideways.
          tl.to(
            part(from, "figure"),
            { xPercent: -75 * dir, scale: 1.55, autoAlpha: 0, duration: 0.75, ease: "power3.in" },
            0,
          );
          tl.to(letters(from), { yPercent: -110, duration: 0.55, stagger: 0.035, ease: "power3.in" }, 0);
          tl.to(labelLines(from), { y: -18, autoAlpha: 0, duration: 0.35, stagger: 0.05, ease: "power2.in" }, 0);

          // Incoming: arrives zoomed-in from the other side and settles.
          tl.fromTo(
            part(to, "figure"),
            { xPercent: 65 * dir, scale: 1.6, autoAlpha: 0 },
            { xPercent: 0, scale: 1, autoAlpha: 1, duration: 1.05, ease: "power3.out" },
            0.2,
          );
          tl.fromTo(
            letters(to),
            { yPercent: 110 },
            { yPercent: 0, duration: 0.8, stagger: 0.045, ease: "power3.out" },
            0.35,
          );
          tl.fromTo(
            labelLines(to),
            { y: 22, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" },
            0.65,
          );
        }

        restartTimer();
      };
      goToRef.current = goTo;

      if (count > 1 && !reduced && progressRef.current) {
        timer = gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: SLIDE_SECONDS,
            ease: "none",
            paused: true,
            onComplete: () => goTo(current + 1, 1),
          },
        );
        sync();
      }
    }, root);

    // Only run the clock while the section is actually on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        pauseReasons.current.offscreen = !entry.isIntersecting;
        syncRef.current();
      },
      { threshold: 0.35 },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
    // `slides` is static page content; re-running on identity changes would
    // tear down mid-transition for no benefit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const setUserPause = useCallback((value: boolean) => {
    pauseReasons.current.user = value;
    setUserPaused(value);
    syncRef.current();
  }, []);

  const go = (dir: 1 | -1) => goToRef.current(active + dir, dir);

  if (count === 0) return null;
  const upNext = slides[(active + 1) % count];

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="Meet the crew"
      className={cn(archivo.variable, "paper-grain relative isolate overflow-hidden text-white")}
      style={{ backgroundColor: slides[0].background }}
      onKeyDown={(event) => {
        if (!multiple) return;
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
    >
      {tearTop && <TornEdge position="top" fill={tearTop} className="z-30" />}

      <div
        className="relative mx-auto h-[clamp(540px,92svh,920px)] w-full max-w-[1680px]"
        style={{ containerType: "size" }}
      >
        {/* Header */}
        <div className="absolute inset-x-0 top-14 z-20 flex items-start justify-between px-5 sm:top-16 sm:px-10">
          <h2 className="font-display text-xs font-semibold tracking-[0.28em] text-white uppercase drop-shadow-sm sm:text-sm">
            Meet the crew
          </h2>
          {multiple && (
            <p
              aria-live="polite"
              className="font-[family-name:var(--font-crew)] text-sm font-bold tabular-nums drop-shadow-sm sm:text-base"
            >
              {String(active + 1).padStart(2, "0")}
              <span className="text-white/60"> / {String(count).padStart(2, "0")}</span>
              <span className="sr-only">: {slides[active].name}</span>
            </p>
          )}
        </div>

        {/* Slides */}
        {slides.map((slide, index) => (
          <SlideLayer key={slide.id} slide={slide} hidden={index !== active} initialHidden={index !== 0} />
        ))}

        {/* Controls */}
        {multiple && (
          <div className="absolute bottom-6 left-5 z-20 flex items-center gap-3 sm:bottom-10 sm:left-10 sm:gap-4">
            <ControlButton label="Previous crew member" onClick={() => go(-1)}>
              <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
            </ControlButton>
            <ControlButton label="Next crew member" onClick={() => go(1)}>
              <ChevronRight className="h-5 w-5" strokeWidth={2.4} />
            </ControlButton>

            {!reducedMotion && (
              <>
                <span className="relative hidden h-[3px] w-20 overflow-hidden rounded-full bg-white/30 sm:block">
                  <span
                    ref={progressRef}
                    className="absolute inset-0 origin-left rounded-full bg-white"
                    style={{ transform: "scaleX(0)" }}
                  />
                </span>
                <ControlButton
                  label={userPaused ? "Resume autoplay" : "Pause autoplay"}
                  onClick={() => setUserPause(!userPaused)}
                  subtle
                >
                  {userPaused ? (
                    <Play className="h-4 w-4" strokeWidth={2.4} />
                  ) : (
                    <Pause className="h-4 w-4" strokeWidth={2.4} />
                  )}
                </ControlButton>
              </>
            )}

            {/* Up next — a little window onto the following slide. */}
            <button
              type="button"
              onClick={() => go(1)}
              className="group ml-1 hidden items-center gap-3 rounded-2xl bg-white/15 p-1.5 pr-4 ring-1 ring-white/25 backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:flex"
            >
              <span
                className="relative h-12 w-12 overflow-hidden rounded-xl transition-colors duration-500"
                style={{ backgroundColor: upNext.background }}
              >
                <Image
                  src={upNext.image}
                  alt=""
                  width={upNext.width}
                  height={upNext.height}
                  sizes="48px"
                  className="absolute top-1 left-1/2 h-[230%] w-auto max-w-none -translate-x-1/2 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </span>
              <span className="text-left leading-tight">
                <span className="block text-[0.65rem] font-semibold tracking-[0.2em] text-white/70 uppercase">
                  Up next
                </span>
                <span className="block font-[family-name:var(--font-crew)] text-sm font-bold">
                  {upNext.name}
                </span>
              </span>
            </button>
          </div>
        )}
      </div>

      {tearBottom && <TornEdge position="bottom" fill={tearBottom} className="z-30" />}
    </section>
  );
}

function SlideLayer({
  slide,
  hidden,
  initialHidden,
}: {
  slide: CrewSlide;
  hidden: boolean;
  /**
   * Server-rendered visibility. Constant per slide, so React never rewrites
   * the inline style after mount — GSAP owns visibility from then on.
   */
  initialHidden: boolean;
}) {
  const letters = slide.word.toUpperCase().split("");

  return (
    <div
      data-slide
      role="group"
      aria-roledescription="slide"
      aria-label={`${slide.name}, ${slide.role}`}
      aria-hidden={hidden}
      className="absolute inset-0"
      style={initialHidden ? { visibility: "hidden", opacity: 0 } : undefined}
    >
      {/* Oversized backdrop word. Each letter rises out of its own clip. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[40%] flex -translate-y-1/2 justify-center md:top-[46%]"
      >
        <span
          className="flex font-[family-name:var(--font-crew)] leading-[0.8] font-extrabold select-none [--word-w:94cqw] md:[--word-w:86cqw]"
          style={{
            color: slide.wordColor,
            fontStretch: "62%",
            fontSize: `min(calc(var(--word-w) / ${letters.length * LETTER_EM}), 64cqh)`,
          }}
        >
          {letters.map((letter, i) => (
            <span key={i} className="block overflow-hidden pt-[0.04em]">
              <span data-letter className="block">
                {letter}
              </span>
            </span>
          ))}
        </span>
      </div>

      {/* Figure. Outer box positions; `data-figure` is animated; `data-float` bobs. */}
      {/* md:bottom clears the 44px torn edge, which is drawn over the section. */}
      <div className="pointer-events-none absolute inset-x-0 top-[16%] bottom-[18%] flex justify-center md:top-[6%] md:bottom-14">
        <div data-figure className="h-full origin-[50%_60%]">
          <div data-float className="h-full">
            <Image
              src={slide.image}
              alt=""
              width={slide.width}
              height={slide.height}
              sizes="(max-width: 768px) 70vw, 40vw"
              className="h-full w-auto max-w-none drop-shadow-[0_24px_30px_rgba(0,0,0,0.18)]"
            />
          </div>
        </div>
      </div>

      {/* Name label */}
      <div className="absolute right-5 bottom-[calc(1.5rem+3.75rem)] left-5 text-left md:right-[8%] md:bottom-[14%] md:left-auto md:text-right">
        <p
          data-label-line
          className="font-[family-name:var(--font-crew)] text-[clamp(1.35rem,2.7vw,2.75rem)] leading-none font-extrabold uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
          style={{ fontStretch: "125%" }}
        >
          {slide.name}
        </p>
        <p
          data-label-line
          className="mt-1.5 font-[family-name:var(--font-crew)] text-[clamp(0.85rem,1.6vw,1.6rem)] leading-tight uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
        >
          {slide.role}
        </p>
      </div>
    </div>
  );
}

function ControlButton({
  label,
  onClick,
  children,
  subtle = false,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  subtle?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full transition-[transform,background-color] duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        subtle
          ? "h-9 w-9 bg-white/15 text-white ring-1 ring-white/30 hover:bg-white/25"
          : "h-11 w-11 bg-white text-[#2a2135] shadow-lift-sm",
      )}
    >
      {children}
    </button>
  );
}
