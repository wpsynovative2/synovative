"use client";

import { cn } from "@/lib/utils";

/**
 * Form controls styled as ruled entries on a paper form: a soft sunken field
 * with a hairline border that turns purple on focus.
 */

const CONTROL = cn(
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-[0.95rem] text-ink",
  "placeholder:text-ink-faint transition-colors duration-200",
  "focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25",
  "disabled:opacity-60",
);

interface FieldShellProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

function FieldShell({ label, name, error, required, hint, children }: FieldShellProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block font-display text-xs font-semibold tracking-[0.14em] text-ink-soft uppercase"
      >
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-ink-faint">{hint}</p>}
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-xs font-medium text-[#c0392b] dark:text-[#f08a7c]">
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = FieldShellProps & React.InputHTMLAttributes<HTMLInputElement>;

export function Field({ label, name, error, required, hint, className, ...props }: Omit<InputProps, "children">) {
  return (
    <FieldShell label={label} name={name} error={error} required={required} hint={hint}>
      <input
        id={name}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(CONTROL, error && "border-[#c0392b]", className)}
        {...props}
      />
    </FieldShell>
  );
}

type TextAreaProps = FieldShellProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({
  label,
  name,
  error,
  required,
  hint,
  className,
  rows = 4,
  ...props
}: Omit<TextAreaProps, "children">) {
  return (
    <FieldShell label={label} name={name} error={error} required={required} hint={hint}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(CONTROL, "resize-y", error && "border-[#c0392b]", className)}
        {...props}
      />
    </FieldShell>
  );
}

type SelectProps = FieldShellProps & React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: { value: string; label: string }[];
};

export function Select({
  label,
  name,
  error,
  required,
  hint,
  className,
  options,
  ...props
}: Omit<SelectProps, "children">) {
  return (
    <FieldShell label={label} name={name} error={error} required={required} hint={hint}>
      <select
        id={name}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(CONTROL, "appearance-none pr-10", error && "border-[#c0392b]", className)}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238d84a0' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

/**
 * Off-screen text input that real users never see or tab into. Bots that fill
 * every field give themselves away, which stops the bulk of spam without a
 * CAPTCHA in front of genuine enquiries.
 */
export function HoneyPot({ name = "company_website" }: { name?: string }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor={name}>Leave this field empty</label>
      <input id={name} name={name} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
