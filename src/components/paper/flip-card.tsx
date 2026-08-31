"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { cn, seededTilt } from "@/lib/utils";
import { useReveal } from "./reveal";
import type { TeamMember } from "@/types";

/**
 * The playing-card team member from the theme mockup: a portrait on the front,
 * the person's role and bio on the back, flipping as it scrolls into view.
 *
 * The card also flips on hover, focus and tap so the back is reachable however
 * the visitor is navigating — scroll alone would strand keyboard and touch
 * users on whichever face happened to be showing.
 */

const SUIT_GLYPH: Record<TeamMember["suit"], string> = {
  spade: "♠",
  heart: "♥",
  club: "♣",
  diamond: "♦",
};

const SUIT_COLOR: Record<TeamMember["suit"], string> = {
  spade: "text-brand",
  heart: "text-[#c0392b] dark:text-[#e8776a]",
  club: "text-brand",
  diamond: "text-[#c0392b] dark:text-[#e8776a]",
};

function CardCorner({
  suit,
  label,
  flipped = false,
}: {
  suit: TeamMember["suit"];
  label: string;
  flipped?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute flex flex-col items-center leading-none",
        SUIT_COLOR[suit],
        flipped ? "right-3 bottom-3 rotate-180" : "top-3 left-3",
      )}
    >
      <span className="font-display text-lg font-semibold">{label}</span>
      <span className="text-sm">{SUIT_GLYPH[suit]}</span>
    </span>
  );
}

export function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.55, once: false });
  const [peeking, setPeeking] = useState(false);

  /**
   * The mockup's behaviour — "on scroll, the card flips from front to back" —
   * as a one-off flourish: the card turns over as it scrolls into view, then
   * settles back after a beat. Left permanently flipped it would hide every
   * portrait behind a wall of identical backs, so the photo is the resting
   * state and the bio is also reachable on hover, focus and tap.
   */
  useEffect(() => {
    if (!revealed) return;

    const flipIn = window.setTimeout(() => setPeeking(true), 220 + index * 110);
    const flipBack = window.setTimeout(() => setPeeking(false), 2400 + index * 110);

    return () => {
      window.clearTimeout(flipIn);
      window.clearTimeout(flipBack);
      setPeeking(false);
    };
  }, [revealed, index]);

  const tilt = seededTilt(member.id, 2.5);

  return (
    <div
      ref={ref}
      className="flip-scene group h-[26rem] w-full cursor-pointer"
      data-flipped={peeking}
      tabIndex={0}
      role="button"
      aria-label={`${member.name}, ${member.role}. Activate to see their bio.`}
      style={{ transform: `rotate(${tilt.toFixed(2)}deg)` }}
    >
      <div className="flip-inner h-full w-full group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]">
        {/* Front — portrait */}
        <div className="flip-face sheet paper-grain h-full w-full overflow-hidden bg-paper-tint p-3">
          <CardCorner suit={member.suit} label="K" />
          <CardCorner suit={member.suit} label="K" flipped />
          <div className="relative h-full w-full overflow-hidden rounded-lg">
            <Image
              src={cloudinaryUrl(member.photo, { width: 640, height: 900, gravity: "face" })}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 80vw, 320px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pt-10 pb-4">
              <p className="font-display text-lg font-semibold text-white">{member.name}</p>
              <p className="text-sm text-white/75">{member.role}</p>
            </div>
          </div>
        </div>

        {/* Back — role and bio */}
        <div className="flip-face flip-face-back sheet paper-grain h-full w-full overflow-hidden bg-accent p-3">
          <CardCorner suit={member.suit} label="K" />
          <CardCorner suit={member.suit} label="K" flipped />
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-accent-deep/15 px-6 text-center">
            <p className="font-display text-xs font-semibold tracking-[0.28em] text-[#2a2135]/70 uppercase">
              Call me
            </p>
            <p className="mt-1 font-display text-2xl leading-tight font-bold text-[#2a2135]">
              {member.role}
            </p>
            <span className="my-4 h-px w-12 bg-[#2a2135]/25" />
            <p className="text-sm leading-relaxed text-[#2a2135]/85">{member.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
