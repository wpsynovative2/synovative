import * as Lucide from "lucide-react";
import type { LucideProps } from "lucide-react";

/**
 * Resolves a Lucide icon by name so content files can reference icons as
 * strings (`icon: "Megaphone"`) without importing components. Falls back to a
 * neutral shape if a name is wrong, which keeps a typo in a CMS record from
 * crashing the page.
 */

const registry = Lucide as unknown as Record<string, React.ComponentType<LucideProps>>;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Component = registry[name] ?? Lucide.Circle;
  return <Component aria-hidden="true" {...props} />;
}

/**
 * Brand marks for social links.
 *
 * Lucide removed brand icons in v1, so these are hand-drawn from each
 * platform's published mark. Kept as filled paths at 24×24 to match the stroke
 * icons optically.
 */
const BRAND_PATHS: Record<string, string> = {
  Instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 5.18a4.66 4.66 0 1 0 0 9.32 4.66 4.66 0 0 0 0-9.32Zm0 7.69a3.03 3.03 0 1 1 0-6.06 3.03 3.03 0 0 1 0 6.06Zm5.93-7.87a1.09 1.09 0 1 1-2.18 0 1.09 1.09 0 0 1 2.18 0Z",
  Facebook:
    "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z",
  Linkedin:
    "M6.94 5.5a2.19 2.19 0 1 1-4.38 0 2.19 2.19 0 0 1 4.38 0ZM3 8.98h3.87V21H3V8.98Zm6.34 0h3.71v1.64h.05c.52-.94 1.78-1.93 3.66-1.93 3.91 0 4.63 2.5 4.63 5.76V21h-3.86v-5.77c0-1.38-.02-3.15-1.96-3.15-1.96 0-2.26 1.5-2.26 3.05V21H9.34V8.98Z",
  Youtube:
    "M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42a2.5 2.5 0 0 0-1.76 1.77A26.1 26.1 0 0 0 2 12a26.1 26.1 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26.1 26.1 0 0 0 22 12a26.1 26.1 0 0 0-.42-4.81ZM10 15.02V8.98L15.2 12 10 15.02Z",
  WhatsApp:
    "M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2.1 22l5.34-1.4a9.83 9.83 0 0 0 4.6 1.17h.01c5.43 0 9.85-4.42 9.85-9.86A9.8 9.8 0 0 0 12.04 2Zm5.74 14.1c-.24.68-1.42 1.32-1.96 1.36-.5.05-.98.23-3.32-.7-2.8-1.1-4.58-3.95-4.72-4.14-.14-.19-1.12-1.5-1.12-2.85s.71-2.02.96-2.3c.25-.27.55-.34.73-.34l.53.01c.17 0 .4-.06.62.48.24.57.8 1.98.87 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.48l-.42.49c-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.63-.14.26.1 1.66.78 1.94.93.28.14.47.21.54.33.07.12.07.69-.17 1.36Z",
};

export function SocialIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const path = BRAND_PATHS[name];
  if (!path) return <Icon name={name} className={className} />;

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={path} />
    </svg>
  );
}
