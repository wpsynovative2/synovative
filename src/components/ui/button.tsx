import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Buttons are cut-paper chips: a soft rounded shape with a real drop shadow
 * that presses down on interaction, so clicking feels like pushing a physical
 * tag rather than tapping a rectangle.
 */

type Variant = "primary" | "accent" | "outline" | "ghost" | "paper";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand text-on-brand shadow-lift-brand hover:bg-brand-deep",
  accent:
    "bg-accent text-[#2a2135] shadow-lift-accent hover:bg-accent-deep hover:text-white",
  outline:
    "border-2 border-brand text-brand bg-transparent hover:bg-brand hover:text-on-brand",
  ghost:
    "text-ink hover:bg-brand-wash hover:text-brand",
  paper:
    "bg-paper-raised text-ink border border-line shadow-lift-sm hover:shadow-lift-md",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-[0.95rem] gap-2",
  lg: "px-8 py-4 text-base gap-2.5",
};

const BASE = cn(
  "inline-flex items-center justify-center rounded-full font-display font-semibold",
  "tracking-wide transition-all duration-200",
  "hover:-translate-y-0.5 active:translate-y-0 active:shadow-lift-sm",
  "disabled:pointer-events-none disabled:opacity-55",
);

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external = false,
  ...props
}: CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
