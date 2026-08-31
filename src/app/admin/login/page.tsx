import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth/session";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { LoginForm } from "./login-form";
import { Logo } from "@/components/layout/logo";
import { Container, Sheet } from "@/components/paper/primitives";

export const metadata = { title: "Sign in" };

/**
 * Never prerender: this page both reads the session cookie and reports whether
 * Firebase is configured, and a build-time snapshot of either would be wrong at
 * request time.
 */
export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const user = await getAdminUser();
  if (user) redirect("/admin");

  return (
    <div className="paper-grain flex min-h-screen items-center justify-center bg-paper-tint px-5 py-16">
      <Container size="narrow" className="max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo className="items-center" />
        </div>

        <Sheet className="p-8">
          <p className="eyebrow mb-1">Admin</p>
          <h1 className="font-display text-2xl font-semibold text-ink">Sign in</h1>
          <p className="mt-2 mb-7 text-sm text-ink-soft">
            Use the Google account or email registered for the Synovative admin
            panel.
          </p>

          {isFirebaseAdminConfigured() ? (
            <LoginForm />
          ) : (
            <div className="rounded-xl border border-line bg-accent-wash p-5 text-sm leading-relaxed text-ink-soft">
              <p className="mb-2 font-display font-semibold text-ink">
                Firebase isn&apos;t configured yet
              </p>
              <p>
                Copy <code className="font-mono text-xs">.env.example</code> to{" "}
                <code className="font-mono text-xs">.env.local</code>, fill in the
                Firebase and admin values, then restart the dev server. The public
                site runs without them; only this panel needs them.
              </p>
            </div>
          )}
        </Sheet>

        <p className="mt-6 text-center text-xs text-ink-faint">
          Sessions last 14 days and are cleared on sign-out.
        </p>
      </Container>
    </div>
  );
}
