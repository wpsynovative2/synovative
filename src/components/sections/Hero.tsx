"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToSection } from "@/components/providers/smooth-scroll";

// The Lenis instance and its GSAP ticker wiring live in
// `components/providers/smooth-scroll.tsx`, mounted once in the site layout.
gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // Routed through Lenis rather than `scrollIntoView`, which would fight it
  // for the scroll position and stutter.
  const handleSkip = () => scrollToSection("#next-section");

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    const ctx = gsap.context(() => {
      const setup = () => {
        video
          .play()
          .then(() => video.pause())
          .catch(() => {});

        let rafId: number | null = null;
        let pendingProgress = 0;

        const seek = () => {
          rafId = null;
          if (!video.duration) return;
          video.currentTime = pendingProgress * video.duration;
        };

        ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: true, // no smoothing delay — 1:1 with scroll
          onUpdate: (self) => {
            pendingProgress = self.progress;
            if (rafId === null) {
              rafId = requestAnimationFrame(seek);
            }
          },
        });

        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
        );
      };

      if (video.readyState >= 1) {
        setup();
      } else {
        video.addEventListener("loadedmetadata", setup, { once: true });
      }
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[1500vh] z-[2]">
      <section className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/Hero_Video_3_Converted.mp4" type="video/mp4" />
        </video>

        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" /> */}

        <div
          ref={headingRef}
          className="absolute inset-0 flex items-center px-12 text-white"
        >
          {/* your heading content here */}
        </div>

        <button
          type="button"
          onClick={handleSkip}
          aria-label="Skip the intro and jump to the next section"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer text-white"
        >
          ↓ Scroll
        </button>
      </section>
    </div>
  );
}

// .\ffmpeg.exe -i Hero_Video_1.mp4 -g 1 -keyint_min 1 -sc_threshold 0 -crf 22 -vf scale=1920:-2 -pix_fmt yuv420p -movflags +faststart -an Hero_Video_2_Converted.mp4
