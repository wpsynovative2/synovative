"use client";

import { useState, useTransition } from "react";
import { updateLeadStatus } from "../actions";
import { cn } from "@/lib/utils";
import type { Lead } from "@/types";

const OPTIONS: Lead["status"][] = ["new", "contacted", "qualified", "won", "lost"];

const TONES: Record<Lead["status"], string> = {
  new: "bg-brand text-on-brand border-brand",
  contacted: "bg-accent text-[#2a2135] border-accent-deep",
  qualified: "bg-accent-deep text-white border-accent-deep",
  won: "bg-[#2f7d52] text-white border-[#2f7d52]",
  lost: "bg-paper-sunken text-ink-faint border-line",
};

/**
 * Inline status editor. Updates optimistically and rolls back if the action
 * fails, so a lost session or a Firebase outage cannot leave the table showing
 * a state that was never saved.
 */
export function LeadStatusSelect({ id, status }: { id: string; status: Lead["status"] }) {
  const [value, setValue] = useState(status);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value as Lead["status"];
    const previous = value;

    setValue(next);
    setError("");

    startTransition(async () => {
      const result = await updateLeadStatus(id, next);
      if (!result.ok) {
        setValue(previous);
        setError(result.error);
      }
    });
  }

  return (
    <div>
      <label className="sr-only" htmlFor={`status-${id}`}>
        Lead status
      </label>
      <select
        id={`status-${id}`}
        value={value}
        onChange={onChange}
        disabled={pending}
        className={cn(
          "cursor-pointer rounded-full border px-3 py-1 font-display text-[0.65rem] font-semibold tracking-[0.1em] uppercase",
          "focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:opacity-60",
          TONES[value],
        )}
      >
        {OPTIONS.map((option) => (
          <option key={option} value={option} className="bg-paper-raised text-ink">
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p role="alert" className="mt-1 max-w-[10rem] text-[0.65rem] text-[#c0392b] dark:text-[#f08a7c]">
          {error}
        </p>
      )}
    </div>
  );
}
