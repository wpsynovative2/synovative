"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Check, Loader2, Send } from "lucide-react";
import { serviceNames } from "@/content/services";
import { isEmail, isPhone } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, HoneyPot, Select, TextArea } from "./field";
import type { ApiResult, ServiceSlug } from "@/types";

/**
 * The enquiry form used on the home page, the contact page and every service
 * page. `defaultService` pre-selects the offering so a visitor arriving from a
 * service page does not have to restate why they are writing, and `source`
 * records the path for attribution in the admin panel.
 */

const SERVICE_OPTIONS = [
  { value: "general", label: "I'm not sure yet" },
  ...Object.entries(serviceNames)
    .filter(([value]) => value !== "general")
    .map(([value, label]) => ({ value, label })),
];

interface LeadFormProps {
  defaultService?: ServiceSlug | "general";
  submitLabel?: string;
  compact?: boolean;
}

export function LeadForm({
  defaultService = "general",
  submitLabel = "Send enquiry",
  compact = false,
}: LeadFormProps) {
  const pathname = usePathname();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  /** Client-side validation, mirrored server-side in the API route. */
  function validate(data: Record<string, string>) {
    const next: Record<string, string> = {};
    if (data.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!isEmail(data.email)) next.email = "That email address doesn't look right.";
    if (!isPhone(data.phone)) next.phone = "Enter a 10-digit mobile number.";
    if (data.message.trim().length < 10) {
      next.message = "A sentence or two about the project, please.";
    }
    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: pathname }),
      });
      const result = (await response.json()) as ApiResult<{ id: string | null }>;

      if (result.ok) {
        setStatus("sent");
        setMessage("Thanks — we'll be in touch within one working day.");
        form.reset();
      } else {
        setStatus("error");
        setErrors(result.fieldErrors ?? {});
        setMessage(result.error);
      }
    } catch {
      setStatus("error");
      setMessage(
        "Something went wrong sending that. Please email us directly and we'll pick it up.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-line bg-brand-wash px-6 py-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-on-brand">
          <Check className="h-7 w-7" />
        </span>
        <p className="mt-5 font-display text-xl font-semibold text-ink">Message received</p>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">{message}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-6"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      <HoneyPot />

      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <Field
          label="Your name"
          name="name"
          autoComplete="name"
          placeholder="Priya Sharma"
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

      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
          error={errors.email}
        />
        <Field
          label="Company"
          name="company"
          autoComplete="organization"
          placeholder="Optional"
        />
      </div>

      <Select
        label="What do you need?"
        name="service"
        defaultValue={defaultService}
        options={SERVICE_OPTIONS}
      />

      <TextArea
        label="Tell us about the project"
        name="message"
        rows={compact ? 3 : 4}
        placeholder="What are you launching, when, and what has been tried already?"
        required
        error={errors.message}
      />

      {status === "error" && message && (
        <p role="alert" className="text-sm font-medium text-[#c0392b] dark:text-[#f08a7c]">
          {message}
        </p>
      )}

      <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {submitLabel}
          </>
        )}
      </Button>

      <p className="text-xs text-ink-faint">
        We reply within one working day. No newsletters, no lists sold on.
      </p>
    </form>
  );
}
