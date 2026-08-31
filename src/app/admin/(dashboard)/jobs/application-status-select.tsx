"use client";

import { useState, useTransition } from "react";
import { updateApplicationStatus } from "../actions";
import { cn } from "@/lib/utils";
import type { JobApplication } from "@/types";

const OPTIONS: JobApplication["status"][] = [
  "new",
  "shortlisted",
  "interviewing",
  "hired",
  "rejected",
];

const TONES: Record<JobApplication["status"], string> = {
  new: "bg-brand text-on-brand border-brand",
  shortlisted: "bg-accent text-[#2a2135] border-accent-deep",
  interviewing: "bg-accent-deep text-white border-accent-deep",
  hired: "bg-[#2f7d52] text-white border-[#2f7d52]",
  rejected: "bg-paper-sunken text-ink-faint border-line",
};

/** Inline status editor, with the same optimistic-then-roll-back behaviour as leads. */
export function ApplicationStatusSelect({
  id,
  status,
}: {
  id: string;
  status: JobApplication["status"];
}) {
  const [value, setValue] = useState(status);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value as JobApplication["status"];
    const previous = value;

    setValue(next);
    setError("");

    startTransition(async () => {
      const result = await updateApplicationStatus(id, next);
      if (!result.ok) {
        setValue(previous);
        setError(result.error);
      }
    });
  }

  return (
    <div>
      <label className="sr-only" htmlFor={`app-status-${id}`}>
        Application status
      </label>
      <select
        id={`app-status-${id}`}
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
