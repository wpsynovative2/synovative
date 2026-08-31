import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { categoryLabels } from "@/content/projects";
import { blurDataUrl, cloudinaryUrl } from "@/lib/cloudinary";
import { cn, seededTilt } from "@/lib/utils";
import { Tape } from "@/components/paper/primitives";
import type { Project } from "@/types";

/**
 * A portfolio project as a taped-down print: a photo on paper stock, tilted a
 * degree or two, with a strip of tape at the top corner. The tilt is derived
 * from the project id so it is stable between server and client renders.
 */
export function ProjectCard({
  project,
  priority = false,
  className,
}: {
  project: Project;
  priority?: boolean;
  className?: string;
}) {
  const tilt = seededTilt(project.id, 1.8);
  const href = project.externalUrl ?? `/portfolio#${project.slug}`;
  const isExternal = Boolean(project.externalUrl);

  return (
    <article
      id={project.slug}
      className={cn("group relative scroll-mt-32", className)}
      style={{ transform: `rotate(${tilt.toFixed(2)}deg)` }}
    >
      <Tape
        className="-top-3 left-6 z-20 h-6 w-20"
        rotate={tilt > 0 ? -6 : 5}
        tone={project.featured ? "accent" : "brand"}
      />

      <div className="sheet paper-grain h-full overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-lift-lg">
        <div className="relative aspect-[4/3] overflow-hidden bg-paper-sunken">
          <Image
            src={cloudinaryUrl(project.image, { width: 900, height: 675 })}
            alt={`${project.title} — ${project.client}`}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            placeholder={blurDataUrl(project.image) ? "blur" : "empty"}
            blurDataURL={blurDataUrl(project.image)}
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />

          {project.youtubeId && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-brand shadow-lift-md transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-0.5 h-5 w-5 fill-current" />
              </span>
            </span>
          )}

          <span className="absolute top-3 right-3 rounded-full bg-paper-raised/95 px-3 py-1 font-display text-[0.65rem] font-semibold tracking-[0.14em] text-brand uppercase">
            {categoryLabels[project.category]}
          </span>
        </div>

        <div className="p-5">
          <p className="font-display text-[0.7rem] font-semibold tracking-[0.16em] text-ink-faint uppercase">
            {project.client} · {project.year}
          </p>
          <h3 className="mt-1.5 font-display text-lg leading-snug font-semibold text-ink">
            <Link
              href={href}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
              {isExternal && <ArrowUpRight className="ml-1 inline h-4 w-4 align-[-2px]" />}
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{project.summary}</p>

          {project.metrics && project.metrics.length > 0 && (
            <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-3">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="text-[0.65rem] tracking-[0.12em] text-ink-faint uppercase">
                    {metric.label}
                  </dt>
                  <dd className="font-display text-base font-bold text-brand">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </article>
  );
}
