import { ArrowRight } from "lucide-react";
import { Container, DoodleStar, PaperPlane } from "@/components/paper/primitives";
import { PaperSection } from "@/components/paper/torn-edge";
import { ButtonLink } from "@/components/ui/button";

/**
 * Full-width brand band used to close a page. The amber variant is reserved for
 * service pages so the CTA reads differently from the site-wide one.
 */
export function CtaBand({
  eyebrow = "Let's make something",
  heading,
  body,
  label,
  href = "/contact#enquiry",
  tone = "brand",
  tearBottom,
  tearTop,
}: {
  eyebrow?: string;
  heading: string;
  body: string;
  label: string;
  href?: string;
  tone?: "brand" | "accent";
  tearBottom?: string;
  tearTop?: string;
}) {
  const inverted = tone === "brand";

  return (
    <PaperSection tone={tone} tearBottom={tearBottom} tearTop={tearTop}>
      <PaperPlane
        className={`top-10 right-[8%] hidden h-16 w-28 lg:block ${
          inverted ? "text-white/30" : "text-[#2a2135]/20"
        }`}
      />

      <Container className="py-20 text-center sm:py-24">
        <p
          className={`eyebrow mb-4 flex items-center justify-center gap-2 ${
            inverted ? "text-accent" : "text-brand-deep"
          }`}
        >
          <DoodleStar className={`h-3.5 w-3.5 ${inverted ? "text-accent" : "text-brand-deep"}`} />
          {eyebrow}
        </p>

        <h2
          className={`mx-auto max-w-3xl text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl ${
            inverted ? "text-white" : "text-[#2a2135]"
          }`}
        >
          {heading}
        </h2>

        <p
          className={`mx-auto mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${
            inverted ? "text-white/80" : "text-[#2a2135]/80"
          }`}
        >
          {body}
        </p>

        <div className="mt-9 flex justify-center">
          <ButtonLink href={href} variant={inverted ? "accent" : "primary"} size="lg">
            {label}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Container>
    </PaperSection>
  );
}
