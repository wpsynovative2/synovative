"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { onHeroReady } from "@/lib/hero-ready";
import { DualArc } from "@/components/ui/dual-arc";

const PRELOADER_SEEN_KEY = "synovative-preloaded";
/** Keeps the brand moment from flickering past on a warm cache. */
const MIN_VISIBLE_MS = 700;
/** Never hold the site hostage to a slow asset. */
const MAX_VISIBLE_MS = 8000;
const FADE_MS = 500;

/**
 * Runs before first paint (see the root layout). On a repeat visit within the
 * same tab session it marks <html> so CSS hides the preloader outright — the
 * full-screen intro is for the first load only.
 */
export const preloaderInitScript = `
(function(){
  try {
    if (sessionStorage.getItem('${PRELOADER_SEEN_KEY}')) {
      document.documentElement.setAttribute('data-preloaded', '');
    }
  } catch (e) {}
})();
`;

/**
 * Full-screen brand loader shown on the first page load of a session.
 *
 * It is server-rendered visible so it covers the page before hydration, then
 * lifts once the window has loaded and — on pages with the scroll-scrubbed
 * hero — once the hero has enough frames to scrub.
 */
export function SitePreloader() {
  const [phase, setPhase] = useState<"visible" | "leaving" | "gone">("visible");

  useEffect(() => {
    if (document.documentElement.hasAttribute("data-preloaded")) return;

    const started = performance.now();
    let finished = false;
    const timers: number[] = [];

    const finish = () => {
      if (finished) return;
      finished = true;
      try {
        sessionStorage.setItem(PRELOADER_SEEN_KEY, "1");
      } catch {
        // Storage blocked — the preloader will simply show again next load.
      }
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - started));
      timers.push(
        window.setTimeout(() => {
          setPhase("leaving");
          timers.push(window.setTimeout(() => setPhase("gone"), FADE_MS));
        }, wait),
      );
    };

    const windowLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });

    let stopHero = () => {};
    const heroReady = document.querySelector("[data-hero-frames]")
      ? new Promise<void>((resolve) => {
          stopHero = onHeroReady(resolve);
        })
      : Promise.resolve();

    Promise.all([windowLoaded, heroReady]).then(finish);
    timers.push(window.setTimeout(finish, MAX_VISIBLE_MS));

    return () => {
      stopHero();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      id="site-preloader"
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-paper",
        "transition-opacity ease-out",
        phase === "leaving" && "pointer-events-none opacity-0",
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- must paint before hydration, no optimisation needed */}
      <img
        src="/icons/synovative-logo-light.png"
        alt=""
        width={220}
        className="h-auto w-[220px] dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icons/synovative-logo-dark.png"
        alt=""
        width={220}
        className="hidden h-auto w-[220px] dark:block"
      />
      <DualArc className="size-12 text-brand" aria-label="Loading Synovative…" />
      <noscript>
        <style>{`#site-preloader{display:none}`}</style>
      </noscript>
    </div>
  );
}
