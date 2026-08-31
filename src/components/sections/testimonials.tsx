import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { Container, SectionHeading, Sheet, Tape } from "@/components/paper/primitives";
import { PaperSection } from "@/components/paper/torn-edge";
import { Reveal } from "@/components/paper/reveal";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn(
            "h-3.5 w-3.5",
            index < rating ? "fill-accent text-accent" : "text-ink-faint/40",
          )}
        />
      ))}
    </span>
  );
}

export function TestimonialsSection({
  testimonials,
  tearBottom,
}: {
  testimonials: Testimonial[];
  tearBottom?: string;
}) {
  if (testimonials.length === 0) return null;

  const fromGoogle = testimonials.some((item) => item.source === "google");

  return (
    <PaperSection tone="tint" tearBottom={tearBottom}>
      <Container className="py-24 sm:py-28">
        <SectionHeading
          eyebrow="Kind words"
          watermark="Reviews"
          align="center"
          title="What clients actually say"
          description={
            fromGoogle
              ? "Pulled from our Google Business Profile — unedited, including the ones that made us wince."
              : "A few words from the people we work with."
          }
          className="mb-14"
        />

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <Reveal as="li" key={testimonial.id} delay={index * 80} className="h-full">
              <Sheet
                tiltSeed={testimonial.id}
                maxTilt={1.6}
                className="relative flex h-full flex-col p-6 pt-8"
              >
                <Tape className="-top-3 left-1/2 h-5 w-16 -translate-x-1/2" rotate={index % 2 ? 4 : -4} />

                <Quote
                  aria-hidden="true"
                  className="h-7 w-7 shrink-0 fill-brand-soft/45 text-brand-soft"
                />

                <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                  {testimonial.quote}
                </blockquote>

                <footer className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  {testimonial.avatar ? (
                    <Image
                      src={testimonial.avatar}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-on-brand">
                      {testimonial.author.charAt(0)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-semibold text-ink">
                      {testimonial.author}
                    </p>
                    {testimonial.role && (
                      <p className="truncate text-xs text-ink-faint">{testimonial.role}</p>
                    )}
                  </div>
                  <span className="ml-auto shrink-0">
                    <Stars rating={testimonial.rating} />
                  </span>
                </footer>
              </Sheet>
            </Reveal>
          ))}
        </ul>
      </Container>
    </PaperSection>
  );
}
