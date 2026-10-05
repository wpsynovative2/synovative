"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SkipForward } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToSection } from "@/components/providers/smooth-scroll";
import { DualArc } from "@/components/ui/dual-arc";
import { markHeroReady } from "@/lib/hero-ready";
import { cn } from "@/lib/utils";

// The Lenis instance and its GSAP ticker wiring live in
// `components/providers/smooth-scroll.tsx`, mounted once in the site layout.
gsap.registerPlugin(ScrollTrigger);

// Frames extracted from Hero_Video_4_raw.mp4 (every 2nd frame) — see the
// ffmpeg command at the bottom of this file.
const FRAME_COUNT = 580;
const framePath = (i: number) =>
  `/frames/hero/frame_${String(i + 1).padStart(4, "0")}.webp`;

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [framesReady, setFramesReady] = useState(false);

  // Jumps straight past the 1500vh intro — `immediate` so Lenis does not
  // animate (and scrub the whole sequence) on the way down. Routed through
  // Lenis rather than `scrollIntoView`, which would fight it and stutter.
  const handleSkip = () => scrollToSection("#next-section", { immediate: true });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !wrapper || !context) return;

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);
    let currentFrame = 0;
    let rafId: number | null = null;
    let cancelled = false;

    // Falls back to the closest already-loaded frame so scrolling ahead of
    // the preloader never shows a blank canvas.
    const nearestLoaded = (index: number) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        if (index - d >= 0 && loaded[index - d]) return index - d;
        if (index + d < FRAME_COUNT && loaded[index + d]) return index + d;
      }
      return -1;
    };

    // Draws with `object-cover` semantics.
    const render = () => {
      rafId = null;
      const index = nearestLoaded(currentFrame);
      if (index === -1) return;
      const img = images[index];
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      context.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const requestRender = () => {
      if (rafId === null) rafId = requestAnimationFrame(render);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      context.imageSmoothingQuality = "high";
      requestRender();
    };

    const loadFrame = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.src = framePath(i);
        images[i] = img;
        img
          .decode()
          .catch(() => {})
          .finally(() => {
            if (cancelled) return resolve();
            loaded[i] = img.complete && img.naturalWidth > 0;
            if (Math.abs(i - currentFrame) < 2 || nearestLoaded(currentFrame) === i) {
              requestRender();
            }
            resolve();
          });
      });

    const loadAll = async (order: number[]) => {
      let next = 0;
      const worker = async () => {
        while (!cancelled && next < order.length) {
          await loadFrame(order[next++]);
        }
      };
      await Promise.all(Array.from({ length: 6 }, worker));
    };

    // Load the first frame immediately, then the rest in a coarse-to-fine
    // order (every 16th, 8th, ... frame) so the whole scroll range becomes
    // scrubbable quickly. The hero counts as ready after the coarse pass.
    const preload = async () => {
      await loadFrame(0);
      const passes: number[][] = [];
      const seen = new Set([0]);
      for (let step = 16; step >= 1; step /= 2) {
        const pass: number[] = [];
        for (let i = 0; i < FRAME_COUNT; i += step) {
          if (!seen.has(i)) {
            seen.add(i);
            pass.push(i);
          }
        }
        passes.push(pass);
      }
      await loadAll(passes[0]);
      if (cancelled) return;
      setFramesReady(true);
      markHeroReady();
      await loadAll(passes.slice(1).flat());
    };

    resize();
    window.addEventListener("resize", resize);
    preload();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true, // no smoothing delay — 1:1 with scroll
        onUpdate: (self) => {
          currentFrame = Math.min(
            FRAME_COUNT - 1,
            Math.round(self.progress * (FRAME_COUNT - 1)),
          );
          requestRender();
        },
      });

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" },
      );
    }, wrapper);

    return () => {
      cancelled = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef} data-hero-frames className="relative h-[1500vh] z-[2]">
      <section className="sticky top-0 h-screen overflow-hidden bg-paper">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />

        {/* Shown until enough frames have loaded to scrub through the intro. */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center bg-paper transition-opacity duration-500",
            framesReady && "opacity-0",
          )}
          aria-hidden={framesReady}
        >
          {!framesReady && <DualArc className="size-14 text-brand" />}
        </div>

        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" /> */}

        <div
          ref={headingRef}
          className="absolute inset-0 flex items-center px-12 text-white"
        >
          {/* your heading content here */}
        </div>

        <p
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white"
        >
          ↓ Scroll
        </p>

        <button
          type="button"
          onClick={handleSkip}
          aria-label="Skip the intro animation and jump to the next section"
          className="absolute right-6 bottom-6 z-10 inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/40 bg-black/40 px-5 py-2.5 font-display text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/60 sm:right-10 sm:bottom-8"
        >
          Skip intro
          <SkipForward className="h-4 w-4" aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}

// Frame extraction (run from the project root):
// ffmpeg -i public/videos/Hero_Video_4_raw.mp4 -vf "select='not(mod(n\,2))',scale=1920:-2" -fps_mode vfr -c:v libwebp -quality 72 -compression_level 6 public/frames/hero/frame_%04d.webp
