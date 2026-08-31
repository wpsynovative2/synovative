"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades and lifts an element into place the first time it enters the viewport.
 *
 * Deliberately built on IntersectionObserver rather than an animation library:
 * the whole site needs exactly this one effect, and a bespoke 30-line hook
 * keeps the client bundle small. Elements start visible if the observer is
 * unavailable, so nothing can be permanently hidden by a failed script.
 */
export function useReveal<T extends HTMLElement>(options?: {
  threshold?: number;
  once?: boolean;
}) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          if (options?.once !== false) observer.disconnect();
        } else if (options?.once === false) {
          setRevealed(false);
        }
      },
      { threshold: options?.threshold ?? 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options?.threshold, options?.once]);

  return { ref, revealed };
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger within a group, in milliseconds. */
  delay?: number;
  as?: "div" | "li" | "article" | "section";
}

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const { ref, revealed } = useReveal<HTMLElement>();

  // Widened to ElementType so one ref type satisfies every tag this renders as.
  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      data-revealed={revealed}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
