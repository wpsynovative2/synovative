import { cn } from "@/lib/utils";

/** Consistent page header for every admin screen. */
export function AdminPage({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">{title}</h1>
          {description && (
            <p className="mt-1.5 max-w-2xl text-sm text-ink-soft">{description}</p>
          )}
        </div>
        {action}
      </header>
      {children}
    </div>
  );
}

export function AdminCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-paper-raised shadow-lift-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Shown when a table has nothing in it — including the very common case of
 * Firebase not being connected yet, which is called out explicitly so it is not
 * mistaken for "no leads have come in".
 */
export function EmptyState({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      {icon && (
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-wash text-brand">
          {icon}
        </span>
      )}
      <p className="font-display text-lg font-semibold text-ink">{title}</p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}

const STATUS_TONES: Record<string, string> = {
  new: "bg-brand text-on-brand",
  contacted: "bg-accent text-[#2a2135]",
  qualified: "bg-accent-deep text-white",
  won: "bg-[#2f7d52] text-white",
  lost: "bg-paper-sunken text-ink-faint",
  shortlisted: "bg-accent text-[#2a2135]",
  interviewing: "bg-accent-deep text-white",
  hired: "bg-[#2f7d52] text-white",
  rejected: "bg-paper-sunken text-ink-faint",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 font-display text-[0.65rem] font-semibold tracking-[0.1em] uppercase",
        STATUS_TONES[status] ?? "bg-paper-sunken text-ink-soft",
      )}
    >
      {status}
    </span>
  );
}

/** Compact metric tile for the dashboard overview. */
export function StatTile({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: React.ReactNode;
}) {
  return (
    <AdminCard className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.14em] text-ink-faint uppercase">
            {label}
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-ink">{value}</p>
          {hint && <p className="mt-1 text-xs text-ink-faint">{hint}</p>}
        </div>
        {icon && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-wash text-brand">
            {icon}
          </span>
        )}
      </div>
    </AdminCard>
  );
}
