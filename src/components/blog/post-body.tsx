import { Fragment } from "react";

/**
 * Renders the small Markdown subset blog bodies are written in.
 *
 * Deliberately not a full Markdown pipeline: posts are authored by the studio
 * (and later by the admin panel) using only `## headings`, `> quotes`,
 * `- bullets` and `**bold**`. Parsing that by hand keeps the client bundle free
 * of a Markdown library and, more importantly, keeps the output as plain React
 * elements — nothing is ever passed to `dangerouslySetInnerHTML`, so a post
 * body cannot inject markup.
 */

/** Splits a line into text and `**bold**` runs. */
function renderInline(text: string, keyPrefix: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={key}>{part}</Fragment>;
  });
}

export function PostBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n{2,}/);

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const key = `block-${index}`;
        const trimmed = block.trim();

        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={key}
              className="pt-4 font-display text-2xl font-semibold text-ink sm:text-3xl"
            >
              {trimmed.slice(3)}
            </h2>
          );
        }

        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={key} className="pt-2 font-display text-xl font-semibold text-ink">
              {trimmed.slice(4)}
            </h3>
          );
        }

        if (trimmed.startsWith("> ")) {
          return (
            <blockquote
              key={key}
              className="border-l-4 border-accent bg-accent-wash/60 py-4 pr-4 pl-5 font-hand text-xl leading-snug text-ink"
            >
              {renderInline(trimmed.replace(/^> ?/gm, ""), key)}
            </blockquote>
          );
        }

        if (trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").map((line) => line.replace(/^- ?/, ""));
          return (
            <ul key={key} className="space-y-2.5">
              {items.map((item, itemIndex) => (
                <li key={`${key}-${itemIndex}`} className="flex gap-3 leading-relaxed text-ink-soft">
                  <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{renderInline(item, `${key}-${itemIndex}`)}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={key} className="leading-[1.75] text-ink-soft">
            {renderInline(trimmed, key)}
          </p>
        );
      })}
    </div>
  );
}
