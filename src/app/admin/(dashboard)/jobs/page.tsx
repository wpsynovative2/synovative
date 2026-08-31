import { Briefcase, ExternalLink, Mail, Phone } from "lucide-react";
import { fetchApplications, fetchJobs } from "@/lib/firebase/collections";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { formatDate, formatDateTime } from "@/lib/utils";
import { AdminCard, AdminPage, EmptyState } from "@/components/admin/shell";
import { ApplicationStatusSelect } from "./application-status-select";

export const metadata = { title: "Jobs & Applications" };
export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const [jobs, applications] = await Promise.all([fetchJobs(), fetchApplications(200)]);
  const connected = isFirebaseAdminConfigured();

  // Count applications per role so each job card shows its own pipeline size.
  const countByJob = applications.reduce<Record<string, number>>((acc, application) => {
    acc[application.jobId] = (acc[application.jobId] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <AdminPage
      title="Jobs & Applications"
      description="Open roles on the career page, and the candidates who applied to them."
    >
      {/* Open roles */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-lg font-semibold text-ink">
          Open roles ({jobs.length})
        </h2>

        {jobs.length === 0 ? (
          <AdminCard>
            <EmptyState
              icon={<Briefcase className="h-6 w-6" />}
              title="No open roles"
              body="Add job documents to the `jobs` collection in Firestore to publish them on the career page."
            />
          </AdminCard>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {jobs.map((job) => (
              <li key={job.id}>
                <AdminCard className="h-full p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-display text-xs font-semibold tracking-[0.14em] text-brand uppercase">
                        {job.department}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                        {job.title}
                      </h3>
                      <p className="mt-1 text-xs text-ink-faint">
                        {job.location} · {job.experience}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-brand-wash px-3 py-1 font-display text-xs font-bold text-brand">
                      {countByJob[job.id] ?? 0}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm text-ink-soft">{job.description}</p>

                  <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                    <p className="text-xs text-ink-faint">
                      Posted {formatDate(job.postedAt)}
                    </p>
                    <a
                      href={`/career#${job.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                    >
                      View live
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </AdminCard>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Applications */}
      <section>
        <h2 className="mb-4 font-display text-lg font-semibold text-ink">
          Applications ({applications.length})
        </h2>

        <AdminCard>
          {applications.length === 0 ? (
            <EmptyState
              icon={<Briefcase className="h-6 w-6" />}
              title="No applications yet"
              body={
                connected
                  ? "Candidate applications from the career page will appear here."
                  : "Firebase isn't connected, so applications aren't being stored. Add the credentials to .env.local."
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[52rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-line font-display text-[0.68rem] tracking-[0.12em] text-ink-faint uppercase">
                    <th scope="col" className="px-5 py-3.5 font-semibold">Candidate</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Role</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Why this role</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Received</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[color:var(--line)]">
                  {applications.map((application) => (
                    <tr key={application.id} className="align-top transition-colors hover:bg-paper">
                      <td className="px-5 py-4">
                        <p className="font-display font-semibold text-ink">
                          {application.name}
                        </p>
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-soft">
                          <Mail className="h-3 w-3 shrink-0 text-brand" />
                          <a href={`mailto:${application.email}`} className="hover:underline">
                            {application.email}
                          </a>
                        </p>
                        <p className="flex items-center gap-1.5 text-xs text-ink-soft">
                          <Phone className="h-3 w-3 shrink-0 text-brand" />
                          <a href={`tel:${application.phone}`} className="hover:underline">
                            {application.phone}
                          </a>
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {application.portfolioUrl && (
                            <a
                              href={application.portfolioUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold text-brand hover:underline"
                            >
                              Portfolio ↗
                            </a>
                          )}
                          {application.resumeUrl && (
                            <a
                              href={application.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold text-brand hover:underline"
                            >
                              Résumé ↗
                            </a>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-ink-soft">{application.jobTitle}</p>
                        <p className="mt-1 text-xs text-ink-faint">
                          {application.experience}
                        </p>
                      </td>

                      <td className="max-w-sm px-5 py-4">
                        <p className="leading-relaxed text-ink-soft">{application.message}</p>
                      </td>

                      <td className="px-5 py-4 text-xs whitespace-nowrap text-ink-faint">
                        {formatDateTime(application.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <ApplicationStatusSelect
                          id={application.id}
                          status={application.status}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AdminCard>
      </section>
    </AdminPage>
  );
}
