import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The Synovative wordmark.
 *
 * The supplied asset is amber type on a transparent background with a dark
 * grey tagline baked in, so it needs a light surface behind it in *both*
 * themes — `bg-paper-raised` flips dark at night and would swallow the
 * tagline. The plate is therefore a fixed cream, which also suits the theme:
 * a printed sticker stuck onto the page.
 */
export function Logo({
  className,
  plate = true,
  priority = false,
  width = 140,
}: {
  className?: string;
  /** Draw the cream label behind the mark. */
  plate?: boolean;
  /** Set on the navbar, where the logo is part of the largest paint. */
  priority?: boolean;
  /** Rendered width in px; height follows the asset's 200×42 ratio. */
  width?: number;
}) {
  return (
    <Link
      href="/"
      aria-label="Synovative — home"
      className={cn(
        "inline-flex shrink-0 items-center",
        plate && "relative rounded-2xl px-4 py-2.5 ",
        className,
      )}
    >
      <Image
        src="/images/logo.png"
        alt="Synovative — a 360° digital marketing solution"
        width={200}
        height={42}
        priority={priority}
        // Width is set here and height left to follow, so the intrinsic ratio
        // is preserved and Next does not warn about a half-overridden size.
        style={{ width, height: "auto" }}
      />
    </Link>
  );
}
