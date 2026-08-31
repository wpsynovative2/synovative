"use client";

import { useState, useTransition } from "react";
import { Star } from "lucide-react";
import { toggleProjectFeatured } from "../actions";
import { cn } from "@/lib/utils";

/** Toggles whether a project appears in the featured grids across the site. */
export function FeaturedToggle({ id, featured }: { id: string; featured: boolean }) {
  const [value, setValue] = useState(featured);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function toggle() {
    const next = !value;
    setValue(next);
    setError("");

    startTransition(async () => {
      const result = await toggleProjectFeatured(id, next);
      if (!result.ok) {
        setValue(!next);
        setError(result.error);
      }
    });
  }

  return (
    <div className="text-right">
      <button
        type="button"
        onClick={toggle}
        disabled={pending}
        aria-pressed={value}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-display text-[0.65rem] font-semibold tracking-[0.1em] uppercase transition-colors disabled:opacity-60",
          value
            ? "border-accent-deep bg-accent text-[#2a2135]"
            : "border-line bg-paper text-ink-faint hover:text-brand",
        )}
      >
        <Star className={cn("h-3.5 w-3.5", value && "fill-current")} />
        {value ? "Featured" : "Feature"}
      </button>
      {error && (
        <p role="alert" className="mt-1 max-w-[9rem] text-[0.62rem] text-[#c0392b] dark:text-[#f08a7c]">
          {error}
        </p>
      )}
    </div>
  );
}
