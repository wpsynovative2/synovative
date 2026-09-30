import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The Synovative wordmark.
 *
 * There are two assets: amber type with a dark tagline for light mode, and
 * white type with an amber dot for dark mode. Both are rendered and CSS picks
 * one from the `.dark` class on <html>, so the right logo is painted on the
 * first frame with no hydration flash.
 */
export function Logo({
  className,
  plate = true,
  priority = false,
  width = 140,
}: {
  className?: string;
  /** Pad the mark so it has room to breathe in the navbar. */
  plate?: boolean;
  /** Set on the navbar, where the logo is part of the largest paint. */
  priority?: boolean;
  /** Rendered width in px; height follows the assets' ~5:1 ratio. */
  width?: number;
}) {
  const alt = "Synovative — a 360° digital marketing solution";
  // Width is set here and height left to follow, so the intrinsic ratio is
  // preserved and Next does not warn about a half-overridden size.
  const style = { width, height: "auto" } as const;

  return (
    <Link
      href="/"
      aria-label="Synovative — home"
      className={cn(
        "inline-flex shrink-0 items-center",
        plate && "relative rounded-2xl px-4 py-2.5",
        className,
      )}
    >
      <Image
        src="/icons/synovative-logo-light.png"
        alt={alt}
        width={1020}
        height={202}
        priority={priority}
        className="dark:hidden"
        style={style}
      />
      <Image
        src="/icons/synovative-logo-dark.png"
        alt={alt}
        width={1400}
        height={276}
        priority={priority}
        className="hidden dark:block"
        style={style}
      />
    </Link>
  );
}
