"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide smooth scrolling.
 *
 * Two details matter here:
 *
 *  - **One RAF loop.** Lenis is driven from `gsap.ticker` rather than its own
 *    `autoRaf`, and `ScrollTrigger.update` is called from Lenis's scroll event.
 *    Left to run independently the two libraries tick on separate frames, and
 *    anything scrubbed — the hero's frame-by-frame video, above all — visibly
 *    lags the smoothed scroll position.
 *  - **`lagSmoothing(0)`.** GSAP normally absorbs long frames by pretending
 *    less time passed. That desynchronises Lenis from the real scroll offset,
 *    so it is switched off while Lenis owns the loop and restored on teardown.
 *
 * Visitors who ask for reduced motion get native scrolling: Lenis is never
 * constructed, and `scrollToSection` below falls back accordingly.
 */

/**
 * Clearance for the sticky nav comes from `scroll-padding-top` in globals.css,
 * which Lenis already honours — passing an offset here too lands anchors twice
 * as far down the page as intended. Kept as a named constant so callers that
 * genuinely need extra room can opt in.
 */
const NAV_OFFSET = 0;

/**
 * Module-level rather than React state on purpose: nothing needs to re-render
 * when the instance appears, and holding it in state would mean a setState
 * inside an effect on every mount.
 */
let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

/**
 * Scroll to an element, through Lenis when it is running and natively when it
 * is not. Use this instead of `scrollIntoView`, which fights Lenis for control
 * of the scroll position and stutters.
 */
export function scrollToSection(
  target: string | HTMLElement,
  options: { offset?: number; duration?: number } = {},
) {
  const { offset = NAV_OFFSET, duration } = options;

  if (lenis) {
    lenis.scrollTo(target, { offset, duration });
    return;
  }

  const node =
    typeof target === "string" ? document.querySelector(target) : target;
  node?.scrollIntoView({ behavior: "auto", block: "start" });
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      lerp: 0.1,
      // GSAP's ticker drives the loop instead — see the note above.
      autoRaf: false,
      // Lenis intercepts in-page anchor clicks so `#enquiry`, `#openings` and
      // the portfolio category jumps glide instead of snapping.
      anchors: { offset: NAV_OFFSET },
    });

    lenis = instance;

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      // GSAP ticks in seconds, Lenis expects milliseconds.
      instance.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Images and fonts settling after hydration change page height, which
    // invalidates every ScrollTrigger's start/end. Recalculate once they have.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33); // GSAP's default
      instance.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
