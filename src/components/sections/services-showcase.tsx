"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { Container, SectionHeading } from "@/components/paper/primitives";
import { PaperSection } from "@/components/paper/torn-edge";
import { Reveal } from "@/components/paper/reveal";
import { Icon } from "@/components/ui/icon";
import { cn, seededTilt } from "@/lib/utils";

/**
 * "Our services" — the paper mascot stands between two columns of service
 * cards and turns his head toward whatever the pointer (or keyboard focus) is
 * on.
 *
 * The head-turn is a frame sequence cut from `public/videos/character
 * animation.mov`: one slow anticlockwise look around (up-left → left → down →
 * right → up-right → back to camera). Each frame is mapped to the direction he
 * is looking in, so following the pointer means drawing the frame for the
 * pointer's angle. That angle is eased round the circle rather than jumped to,
 * so he turns through the in-between frames instead of snapping.
 */

const FRAME_COUNT = 81;
const framePath = (i: number) =>
  `/charector/turn/frame_${String(i + 1).padStart(3, "0")}.webp`;

/**
 * Where he is looking at a few hand-picked frames, in degrees (0 = right,
 * 90 = up, unwrapped so the sequence only ever increases). Frames in between
 * are interpolated. The clip has no straight-up pose — it settles on the
 * camera instead — so "up" plays the facing-camera frames at the end.
 */
const KEYFRAMES: [frame: number, angle: number][] = [
  [0, 140], // up-left
  [8, 178], // left
  [16, 215], // down-left
  [24, 240],
  [30, 270], // straight down
  [36, 300],
  [42, 325], // down-right
  [50, 360], // right
  [60, 400], // up-right
  [68, 425],
  [72, 445], // turning to camera
  [80, 475], // facing camera
];

/** Facing the camera: where he rests when nobody is pointing anywhere. */
const REST_ANGLE = 455;

/** Pointer within this radius (px) of him counts as "looking at me". */
const DEAD_ZONE = 80;

/** Per-frame easing of the angle he is looking in; lower is lazier. */
const TURN_EASE = 0.12;
/** Per-frame easing of the sway toward the pointer. */
const LEAN_EASE = 0.1;

const mod360 = (a: number) => ((a % 360) + 360) % 360;

/** Frame index for a direction, via the keyframe table. */
function frameForAngle(deg: number) {
  const first = KEYFRAMES[0][1];
  // Lift into the table's unwrapped range [first, first + 360).
  const a = first + mod360(deg - first);
  for (let k = 0; k < KEYFRAMES.length - 1; k++) {
    const [f0, a0] = KEYFRAMES[k];
    const [f1, a1] = KEYFRAMES[k + 1];
    if (a >= a0 && a <= a1) return Math.round(f0 + ((a - a0) / (a1 - a0)) * (f1 - f0));
  }
  // The short gap between the last frame and wrapping round to the first.
  const [lastFrame, lastAngle] = KEYFRAMES[KEYFRAMES.length - 1];
  return a - lastAngle < first + 360 - a ? lastFrame : 0;
}

export function ServicesShowcase({
  tearTop,
  tearBottom,
}: {
  tearTop?: string;
  tearBottom?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Lets the focus handlers aim him from outside the effect.
  const aimRef = useRef<(point: { x: number; y: number } | null) => void>(
    () => {},
  );

  useEffect(() => {
    const section = sectionRef.current;
    const character = characterRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!section || !character || !canvas || !context) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /* ---------------------------- frames ---------------------------- */

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);
    let cancelled = false;
    let drawnFrame = -1;

    // Scrubbing ahead of the loader shows the closest frame that is ready.
    const nearestLoaded = (index: number) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        if (index - d >= 0 && loaded[index - d]) return index - d;
        if (index + d < FRAME_COUNT && loaded[index + d]) return index + d;
      }
      return -1;
    };

    const draw = (frame: number, force = false) => {
      const index = nearestLoaded(frame);
      if (index === -1 || (index === drawnFrame && !force)) return;
      drawnFrame = index;
      const img = images[index];
      const cw = canvas.width;
      const ch = canvas.height;
      // `object-contain`, anchored to the bottom so his feet stay put.
      const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      context.clearRect(0, 0, cw, ch);
      context.drawImage(img, (cw - w) / 2, ch - h, w, h);
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
            if (!cancelled) {
              loaded[i] = img.complete && img.naturalWidth > 0;
              draw(frameForAngle(shown), true);
            }
            resolve();
          });
      });

    // Resting frame first, then coarse-to-fine so every direction has
    // something close to show quickly.
    const preload = async () => {
      const order: number[] = [frameForAngle(REST_ANGLE)];
      const seen = new Set(order);
      for (let step = 8; step >= 1; step /= 2) {
        for (let i = 0; i < FRAME_COUNT; i += step) {
          if (!seen.has(i)) {
            seen.add(i);
            order.push(i);
          }
        }
      }
      await loadFrame(order[0]);
      let next = 1;
      const worker = async () => {
        while (!cancelled && next < order.length) await loadFrame(order[next++]);
      };
      await Promise.all(Array.from({ length: 4 }, worker));
    };

    // Nothing is fetched until the section is close to the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          preload();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(section);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      context.imageSmoothingQuality = "high";
      draw(frameForAngle(shown), true);
    };

    /* ---------------------------- tracking ---------------------------- */

    // Where he should look, where he is looking (unwrapped degrees), and the
    // eased pointer offset that drives the sway.
    let goalAngle = REST_ANGLE;
    let shown = REST_ANGLE;
    let pointer: { x: number; y: number } | null = null;
    const lean = { x: 0, y: 0 };
    let rafId: number | null = null;

    const origin = () => {
      const box = character.getBoundingClientRect();
      // His head sits in the upper third of the box.
      return {
        x: box.left + box.width / 2,
        y: box.top + box.height * 0.3,
        width: box.width,
        height: box.height,
      };
    };

    const tick = () => {
      rafId = null;
      const o = origin();

      // Shortest way round, so he never spins the long way past the camera.
      const delta = mod360(goalAngle - shown + 180) - 180;
      shown += reduceMotion ? delta : delta * TURN_EASE;
      draw(frameForAngle(shown));

      const goalLean = pointer ?? { x: 0, y: 0 };
      lean.x += (goalLean.x - lean.x) * LEAN_EASE;
      lean.y += (goalLean.y - lean.y) * LEAN_EASE;
      if (!reduceMotion) {
        const nx = Math.max(-1, Math.min(1, lean.x / (o.width * 2)));
        const ny = Math.max(-1, Math.min(1, lean.y / (o.height * 2)));
        character.style.transform = `translate3d(${(nx * 10).toFixed(2)}px, ${(ny * 5).toFixed(2)}px, 0) rotate(${(nx * 2).toFixed(2)}deg)`;
      }

      // Keep going until both the turn and the sway have settled.
      if (
        Math.abs(mod360(goalAngle - shown + 180) - 180) > 0.3 ||
        Math.hypot(goalLean.x - lean.x, goalLean.y - lean.y) > 0.5
      ) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const aim = (point: { x: number; y: number } | null) => {
      if (point) {
        const o = origin();
        const dx = point.x - o.x;
        const dy = point.y - o.y;
        pointer = { x: dx, y: dy };
        goalAngle =
          Math.hypot(dx, dy) < DEAD_ZONE
            ? REST_ANGLE
            : (Math.atan2(-dy, dx) * 180) / Math.PI;
      } else {
        pointer = null;
        goalAngle = REST_ANGLE;
      }
      if (rafId === null) rafId = requestAnimationFrame(tick);
    };
    aimRef.current = aim;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      aim({ x: event.clientX, y: event.clientY });
    };
    const onLeave = () => aim(null);

    resize();
    window.addEventListener("resize", resize);
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      cancelled = true;
      io.disconnect();
      window.removeEventListener("resize", resize);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
      aimRef.current = () => {};
    };
  }, []);

  // Keyboard users get the same effect: he looks at the focused card.
  const lookAtElement = (element: HTMLElement) => {
    const box = element.getBoundingClientRect();
    aimRef.current({ x: box.left + box.width / 2, y: box.top + box.height / 2 });
  };
  const reset = () => aimRef.current(null);

  const left = services.slice(0, 3);
  const right = services.slice(3);

  const card = (
    service: (typeof services)[number],
    index: number,
    side: "left" | "right",
  ) => (
    <Reveal as="li" key={service.slug} delay={index * 90}>
      <ServiceCard
        href={`/services/${service.slug}`}
        icon={service.icon}
        title={service.name}
        tagline={service.tagline}
        summary={service.summary}
        tone={service.tone}
        side={side}
        onFocus={lookAtElement}
        onBlur={reset}
      />
    </Reveal>
  );

  return (
    <PaperSection tone="paper" tearTop={tearTop} tearBottom={tearBottom}>
      <div ref={sectionRef}>
        <Container size="wide" className="py-24 sm:py-28">
          <SectionHeading
            eyebrow="Move your cursor — he's watching"
            watermark="Services"
            align="center"
            title={
              <>
                Our <span className="text-brand">services</span>
              </>
            }
            description="Pick a card. Whatever you need, someone here is already looking at it."
            className="mb-14 sm:mb-16"
          />

          <div className="grid items-center gap-8 lg:grid-cols-[1fr_minmax(240px,320px)_1fr] lg:gap-10">
            {/* The character — first on small screens, centre column on large. */}
            <div className="order-first flex justify-center lg:order-none lg:col-start-2 lg:row-start-1">
              <div
                ref={characterRef}
                aria-hidden="true"
                className="relative aspect-[480/782] w-48 will-change-transform sm:w-60 lg:w-full"
              >
                {/* Soft paper shadow under his feet. */}
                <div className="absolute inset-x-[22%] -bottom-1 h-5 rounded-[50%] bg-ink/15 blur-md" />
                <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
              </div>
            </div>

            <ul className="grid gap-5 sm:grid-cols-2 lg:col-start-1 lg:row-start-1 lg:grid-cols-1 lg:gap-6">
              {left.map((service, index) => card(service, index, "left"))}
            </ul>

            <ul className="grid gap-5 sm:grid-cols-2 lg:col-start-3 lg:row-start-1 lg:grid-cols-1 lg:gap-6">
              {right.map((service, index) => card(service, index, "right"))}
              <Reveal as="li" delay={right.length * 90}>
                <ServiceCard
                  href="/services"
                  icon="LayoutGrid"
                  title="All services"
                  tagline="Or the whole package"
                  summary="One piece or the full property launch, see how the services fit together."
                  tone="accent"
                  side="right"
                  onFocus={lookAtElement}
                  onBlur={reset}
                />
              </Reveal>
            </ul>
          </div>

          <div className="mt-14 flex justify-center lg:hidden">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-display text-sm font-semibold text-brand hover:underline"
            >
              Explore every service
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </div>
    </PaperSection>
  );
}

function ServiceCard({
  href,
  icon,
  title,
  tagline,
  summary,
  tone,
  side,
  onFocus,
  onBlur,
}: {
  href: string;
  icon: string;
  title: string;
  tagline: string;
  summary: string;
  tone: "brand" | "accent";
  side: "left" | "right";
  onFocus: (element: HTMLElement) => void;
  onBlur: () => void;
}) {
  const tilt = seededTilt(title, 1.5);

  return (
    <Link
      href={href}
      onFocus={(event) => onFocus(event.currentTarget)}
      onBlur={onBlur}
      style={{ "--tilt": `${tilt.toFixed(2)}deg` } as React.CSSProperties}
      className={cn(
        "sheet paper-grain group relative flex h-full gap-4 overflow-hidden p-5 transition-transform duration-200 [transform:rotate(var(--tilt))] hover:[transform:rotate(0deg)_translateY(-4px)] focus-visible:[transform:rotate(0deg)_translateY(-4px)] sm:p-6",
        side === "left" && "lg:flex-row-reverse lg:text-right",
      )}
    >
      <span
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
          tone === "brand"
            ? "bg-brand-wash text-brand"
            : "bg-accent-wash text-accent-deep",
        )}
      >
        <Icon name={icon} className="h-5 w-5" />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "flex items-center gap-1.5 font-display text-lg leading-tight font-semibold text-ink group-hover:text-brand",
            side === "left" && "lg:justify-end",
          )}
        >
          {title}
          <ArrowUpRight
            className="h-4 w-4 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            aria-hidden="true"
          />
        </span>
        <span className="mt-1 block font-hand text-base text-brand">{tagline}</span>
        <span className="mt-2 block text-sm leading-relaxed text-ink-soft">
          {summary}
        </span>
      </span>
    </Link>
  );
}
