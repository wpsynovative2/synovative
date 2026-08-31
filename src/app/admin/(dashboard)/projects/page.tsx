import Image from "next/image";
import { ExternalLink, FolderKanban } from "lucide-react";
import { fetchProjects } from "@/lib/firebase/collections";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { categoryLabels } from "@/content/projects";
import { cloudinaryUrl, isCloudinaryConfigured } from "@/lib/cloudinary";
import { AdminCard, AdminPage, EmptyState } from "@/components/admin/shell";
import { FeaturedToggle } from "./featured-toggle";

export const metadata = { title: "Projects" };
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await fetchProjects();
  const connected = isFirebaseAdminConfigured();

  return (
    <AdminPage
      title="Projects"
      description="Portfolio entries shown on the home page, the portfolio page and the service pages."
    >
      {!connected && (
        <AdminCard className="mb-6 border-accent-deep/40 bg-accent-wash p-5">
          <p className="font-display text-sm font-semibold text-ink">
            Showing seed content
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            These projects come from{" "}
            <code className="font-mono text-xs">src/content/projects.ts</code>{" "}
            because Firebase isn&apos;t connected. Once it is, documents in the{" "}
            <code className="font-mono text-xs">projects</code> collection take
            over and become editable from here.
          </p>
        </AdminCard>
      )}

      {!isCloudinaryConfigured && (
        <AdminCard className="mb-6 border-line p-5">
          <p className="font-display text-sm font-semibold text-ink">
            Cloudinary isn&apos;t configured
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            Images fall back to a placeholder. Set{" "}
            <code className="font-mono text-xs">
              NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
            </code>{" "}
            to serve real media.
          </p>
        </AdminCard>
      )}

      <AdminCard>
        {projects.length === 0 ? (
          <EmptyState
            icon={<FolderKanban className="h-6 w-6" />}
            title="No projects"
            body="Add documents to the `projects` collection in Firestore to publish them across the site."
          />
        ) : (
          <ul className="divide-y divide-[color:var(--line)]">
            {projects.map((project) => (
              <li key={project.id} className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-paper-sunken">
                  <Image
                    src={cloudinaryUrl(project.image, { width: 240, height: 160 })}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-display text-[0.65rem] font-semibold tracking-[0.12em] text-brand uppercase">
                    {categoryLabels[project.category]} · {project.year}
                  </p>
                  <h3 className="mt-0.5 truncate font-display text-base font-semibold text-ink">
                    {project.title}
                  </h3>
                  <p className="truncate text-xs text-ink-faint">{project.client}</p>
                  <ul className="mt-1.5 flex flex-wrap gap-1.5">
                    {project.services.map((service) => (
                      <li
                        key={service}
                        className="rounded-full bg-paper-sunken px-2 py-0.5 text-[0.62rem] text-ink-soft"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex shrink-0 items-center gap-4">
                  {project.externalUrl && (
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title}`}
                      className="text-ink-faint transition-colors hover:text-brand"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <FeaturedToggle id={project.id} featured={project.featured} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </AdminPage>
  );
}
