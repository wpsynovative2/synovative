import Link from "next/link";
import { Container, PaperPlane, StickyNote } from "@/components/paper/primitives";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="paper-grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-paper-tint px-5 py-20 text-center">
      <PaperPlane className="top-[18%] right-[12%] hidden h-20 w-32 lg:block" />

      <Container size="narrow" className="relative z-10">
        <Logo className="mx-auto mb-12 items-center" />

        <p className="font-display text-[7rem] leading-none font-bold text-brand sm:text-[10rem]">
          404
        </p>

        <h1 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
          This sheet got torn out.
        </h1>

        <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-soft">
          The page you were after has moved, been renamed, or never quite made it
          off the drawing board.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="paper" size="lg">
            Tell us what broke
          </ButtonLink>
        </div>

        <StickyNote tone="accent" tiltSeed="not-found" className="mx-auto mt-14 max-w-sm">
          <p className="font-hand text-lg leading-snug">
            Looking for something specific? Try{" "}
            <Link href="/services" className="underline">
              services
            </Link>
            ,{" "}
            <Link href="/portfolio" className="underline">
              portfolio
            </Link>{" "}
            or the{" "}
            <Link href="/blogs" className="underline">
              journal
            </Link>
            .
          </p>
        </StickyNote>
      </Container>
    </div>
  );
}
