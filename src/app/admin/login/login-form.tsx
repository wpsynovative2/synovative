"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/forms/field";
import type { ApiResult } from "@/types";

/**
 * Signs in with Firebase in the browser, then trades the resulting ID token for
 * an httpOnly session cookie so that server components can authorise renders.
 * The client-side Firebase session is signed out immediately afterwards — the
 * cookie is the only thing that grants access from here on.
 */
export function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "signing-in">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("signing-in");

    const data = Object.fromEntries(
      new FormData(event.currentTarget),
    ) as Record<string, string>;

    try {
      const { signInWithEmailAndPassword, signOut } = await import("firebase/auth");
      const auth = getFirebaseAuth();

      const credential = await signInWithEmailAndPassword(
        auth,
        data.email.trim(),
        data.password,
      );
      const idToken = await credential.user.getIdToken();

      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const result = (await response.json()) as ApiResult;

      // The httpOnly cookie is now the source of truth; drop the SDK session.
      await signOut(auth);

      if (!result.ok) {
        setError(result.error);
        setStatus("idle");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch (caught) {
      const code = (caught as { code?: string }).code ?? "";
      setError(
        code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found")
          ? "That email and password don't match an admin account."
          : code.includes("too-many-requests")
            ? "Too many attempts. Wait a few minutes and try again."
            : "Could not sign in. Check the details and try again.",
      );
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="username"
        placeholder="you@synovative.com"
        required
      />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        required
      />

      {error && (
        <p role="alert" className="text-sm font-medium text-[#c0392b] dark:text-[#f08a7c]">
          {error}
        </p>
      )}

      <Button type="submit" disabled={status === "signing-in"} className="w-full">
        {status === "signing-in" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in…
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4" />
            Sign in
          </>
        )}
      </Button>
    </form>
  );
}
