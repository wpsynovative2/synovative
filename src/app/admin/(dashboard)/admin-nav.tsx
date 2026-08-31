"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  ExternalLink,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import type { AdminUser } from "@/lib/auth/session";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/jobs", label: "Jobs & Applications", icon: Users },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
];

export function AdminNav({ user }: { user: AdminUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function signOut() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  }

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Mobile bar */}
      <div className="flex items-center justify-between border-b border-line bg-paper-raised px-5 py-3 lg:hidden">
        <Logo plate={false} width={124} />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <nav
        className={cn(
          "flex w-full shrink-0 flex-col border-line bg-paper-raised lg:w-64 lg:border-r",
          open ? "border-b" : "hidden lg:flex",
        )}
      >
        <div className="hidden items-center justify-between border-b border-line px-6 py-5 lg:flex">
          <Logo plate={false} width={124} />
          <ThemeToggle />
        </div>

        <ul className="flex-1 space-y-1 p-4">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-2.5 font-display text-sm font-medium transition-colors",
                  isActive(item.href, item.exact)
                    ? "bg-brand text-on-brand shadow-lift-sm"
                    : "text-ink-soft hover:bg-brand-wash hover:text-brand",
                )}
              >
                <item.icon className="h-[1.1rem] w-[1.1rem] shrink-0" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="border-t border-line p-4">
          <Link
            href="/"
            target="_blank"
            className="mb-3 flex items-center gap-2 px-4 text-xs text-ink-faint transition-colors hover:text-brand"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View live site
          </Link>

          <div className="rounded-xl bg-paper px-4 py-3">
            <p className="truncate font-display text-sm font-semibold text-ink">
              {user.name ?? "Signed in"}
            </p>
            <p className="truncate text-xs text-ink-faint">{user.email}</p>
            <button
              type="button"
              onClick={signOut}
              className="mt-3 flex items-center gap-2 text-xs font-semibold text-brand hover:underline"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
