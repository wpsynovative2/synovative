import { Container, DoodleSwoosh, PaperPlane } from "@/components/paper/primitives";
import { TornEdge } from "@/components/paper/torn-edge";
import { cn } from "@/lib/utils";

/**
 * Shared hero for every page except the home page: a tinted paper band that the
 * next section tears away from, with the navbar's height built into the padding
 * so headings never sit under the fixed bar.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  watermark,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  watermark?: string;
  className?: string;
}) {
  return (
    <section className={cn("paper-grain relative isolate overflow-hidden bg-paper-tint", className)}>
      {/* Soft brand bloom behind the heading. */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full opacity-45 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand-soft), transparent 72%)",
        }}
      />
      <PaperPlane className="top-40 right-[6%] hidden h-16 w-28 lg:block" />
      <DoodleSwoosh className="bottom-24 left-[4%] hidden h-8 w-32 lg:block" />

      {watermark && (
        <span
          aria-hidden="true"
          className="watermark absolute -bottom-4 left-1/2 hidden -translate-x-1/2 text-[10rem] whitespace-nowrap md:block"
        >
          {watermark}
        </span>
      )}

      <Container className="relative z-20 pt-16 pb-24 text-center sm:pt-20 sm:pb-28">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h1 className="mx-auto max-w-4xl text-4xl leading-[1.08] font-bold text-ink sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-9 flex flex-wrap justify-center gap-3">{children}</div>}
      </Container>

      <TornEdge position="bottom" fill="var(--paper)" />
    </section>
  );
}
