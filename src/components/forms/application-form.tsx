"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { isEmail, isPhone } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, HoneyPot, Select, TextArea } from "./field";
import type { ApiResult, JobPosting } from "@/types";

/**
 * Candidate application form on the career page. The job selector is populated
 * from the open postings, and pre-selects one when a visitor clicks "Apply" on
 * a specific card.
 */
export function ApplicationForm({
  jobs,
  selectedJobId,
}: {
  jobs: JobPosting[];
  selectedJobId?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  const jobOptions = [
    { value: "", label: "Select a role" },
    ...jobs.map((job) => ({ value: job.id, label: job.title })),
    { value: "open-application", label: "Open application" },
  ];

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const found: Record<string, string> = {};
    if (data.name.trim().length < 2) found.name = "Please tell us your name.";
    if (!isEmail(data.email)) found.email = "That email address doesn't look right.";
    if (!isPhone(data.phone)) found.phone = "Enter a 10-digit mobile number.";
    if (!data.jobId) found.jobId = "Pick the role you're applying for.";
    if (data.message.trim().length < 20) {
      found.message = "Tell us a little more — a few sentences is plenty.";
    }

    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const jobTitle =
      jobs.find((job) => job.id === data.jobId)?.title ?? "Open application";

    setStatus("sending");
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, jobTitle }),
      });
      const result = (await response.json()) as ApiResult<{ id: string | null }>;

      if (result.ok) {
        setStatus("sent");
        setMessage("Application received. We read every one and reply either way.");
        form.reset();
      } else {
        setStatus("error");
        setErrors(result.fieldErrors ?? {});
        setMessage(result.error);
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please email your CV to careers@synovative.com.");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-line bg-accent-wash px-6 py-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-[#2a2135]">
          <Check className="h-7 w-7" />
        </span>
        <p className="mt-5 font-display text-xl font-semibold text-ink">Got it</p>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      <HoneyPot name="portfolio_hidden" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Your name"
          name="name"
          autoComplete="name"
          placeholder="Imran Qureshi"
          required
          error={errors.name}
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="98765 43210"
          required
          error={errors.phone}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          required
          error={errors.email}
        />
        <Select
          label="Applying for"
          name="jobId"
          defaultValue={selectedJobId ?? ""}
          options={jobOptions}
          required
          error={errors.jobId}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Years of experience"
          name="experience"
          placeholder="e.g. 3 years"
          required
        />
        <Field
          label="Portfolio or LinkedIn"
          name="portfolioUrl"
          type="url"
          placeholder="https://"
          hint="A reel, a Behance link, a GitHub — whatever shows your work."
        />
      </div>

      <Field
        label="Résumé link"
        name="resumeUrl"
        type="url"
        placeholder="https://drive.google.com/…"
        hint="Paste a link to your CV. Make sure sharing is set to anyone with the link."
      />

      <TextArea
        label="Why this role?"
        name="message"
        rows={4}
        placeholder="What you'd bring, and one piece of work you're proud of."
        required
        error={errors.message}
      />

      {status === "error" && message && (
        <p role="alert" className="text-sm font-medium text-[#c0392b] dark:text-[#f08a7c]">
          {message}
        </p>
      )}

      <Button type="submit" variant="accent" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send application
          </>
        )}
      </Button>
    </form>
  );
}
