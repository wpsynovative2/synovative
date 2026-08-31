"use client";

import { useEffect } from "react";
import { Container } from "@/components/paper/primitives";
import { Button, ButtonLink } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaces in the server logs with the digest that identifies this render.
    console.error("[app] unhandled error:", error);
  }, [error]);

  return (
    <div className="paper-grain flex min-h-screen flex-col items-center justify-center bg-paper-tint px-5 py-20 text-center">
      <Container size="narrow">
        <p className="eyebrow mb-4">Something tore</p>

        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          That didn&apos;t go to plan.
        </h1>

        <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-soft">
          Something failed while loading this page. Trying again usually sorts
          it — if it doesn&apos;t, let us know and we&apos;ll fix it.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button onClick={reset} size="lg">
            Try again
          </Button>
          <ButtonLink href="/" variant="paper" size="lg">
            Back to home
          </ButtonLink>
        </div>

        {error.digest && (
          <p className="mt-8 font-mono text-xs text-ink-faint">
            Reference: {error.digest}
          </p>
        )}
      </Container>
    </div>
  );
}
