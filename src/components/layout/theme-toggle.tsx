"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export const THEME_STORAGE_KEY = "synovative-theme";

type Theme = "light" | "dark";

/**
 * The applied theme lives on `<html>`, written before first paint by
 * `themeInitScript`. This subscribes to that class rather than keeping a
 * parallel copy in React state, so the toggle stays correct even if the theme
 * is changed from elsewhere, and there is no mount-then-setState flash.
 */
function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * The server cannot know the visitor's theme, so it renders the light-mode
 * icon. React re-reads the real value immediately after hydration.
 */
function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";

    // Mutating the class is what actually changes the theme; the subscription
    // above then reports it back to React.
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing or blocked storage — the toggle still works for this
      // page view, it just will not be remembered.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full",
        "border border-line bg-paper-raised text-ink shadow-lift-sm",
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift-md",
        className,
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-[1.15rem] w-[1.15rem] text-accent" />
      ) : (
        <Moon className="h-[1.15rem] w-[1.15rem] text-brand" />
      )}
    </button>
  );
}

/**
 * Runs before first paint to apply the stored (or system) theme, preventing the
 * white flash a client-side-only toggle would cause.
 */
export const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var dark = stored ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  } catch (e) {}
})();
`;
