import Link from "next/link";
import { ArrowRight, Briefcase, FolderKanban, Inbox, Users } from "lucide-react";
import {
  fetchApplications,
  fetchJobs,
  fetchLeads,
  fetchProjects,
} from "@/lib/firebase/collections";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { formatDateTime } from "@/lib/utils";
import { serviceNames } from "@/content/services";
import { AdminCard, AdminPage, EmptyState, StatTile, StatusBadge } from "@/components/admin/shell";

export const metadata = { title: "Dashboard" };

/** Always read live data — a cached lead count would be actively misleading. */
export const dynamic = "force-dynamic";

/**
 * How many of these records were created in the last `days` days.
 *
 * Kept out of the component body because reading the clock is impure: React
 * requires render to be idempotent, and this page is re-rendered on every
 * request anyway.
 */
function countSince(records: { createdAt: string }[], days: number): number {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return records.filter((record) => +new Date(record.createdAt) > cutoff).length;
}

export default async function AdminDashboard() {
  const [leads, applications, jobs, projects] = await Promise.all([
    fetchLeads(200),
    fetchApplications(200),
    fetchJobs(),
    fetchProjects(),
  ]);

  const connected = isFirebaseAdminConfigured();
  const newLeads = leads.filter((lead) => lead.status === "new").length;
  const leadsThisWeek = countSince(leads, 7);

  return (
    <AdminPage
      title="Dashboard"
      description="Enquiries, applications and content at a glance."
    >
      {!connected && (
        <AdminCard className="mb-8 border-accent-deep/40 bg-accent-wash p-5">
          <p className="font-display text-sm font-semibold text-ink">
            Firebase isn&apos;t connected
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            Leads and applications are showing as empty because there is no
            database attached. Add the Firebase values to{" "}
            <code className="font-mono text-xs">.env.local</code> and restart —
            the public site keeps working either way.
          </p>
        </AdminCard>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="New leads"
          value={newLeads}
          hint={`${leadsThisWeek} in the last 7 days`}
          icon={<Inbox className="h-5 w-5" />}
        />
        <StatTile
          label="Total leads"
          value={leads.length}
          hint="All time"
          icon={<Users className="h-5 w-5" />}
        />
        <StatTile
          label="Applications"
          value={applications.length}
          hint={`${jobs.length} open role${jobs.length === 1 ? "" : "s"}`}
          icon={<Briefcase className="h-5 w-5" />}
        />
        <StatTile
          label="Projects"
          value={projects.length}
          hint={`${projects.filter((p) => p.featured).length} featured`}
          icon={<FolderKanban className="h-5 w-5" />}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent leads */}
        <AdminCard>
          <header className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-display text-base font-semibold text-ink">Recent enquiries</h2>
            <Link
              href="/admin/leads"
              className="flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </header>

          {leads.length === 0 ? (
            <EmptyState
              icon={<Inbox className="h-6 w-6" />}
              title="No enquiries yet"
              body={
                connected
                  ? "Submissions from the site's contact forms will land here."
                  : "Connect Firebase to start collecting enquiries."
              }
            />
          ) : (
            <ul className="divide-y divide-[color:var(--line)]">
              {leads.slice(0, 6).map((lead) => (
                <li key={lead.id} className="flex items-start gap-3 px-5 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-semibold text-ink">
                      {lead.name}
                    </p>
                    <p className="truncate text-xs text-ink-faint">
                      {serviceNames[lead.service ?? "general"]} · {lead.source}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <StatusBadge status={lead.status} />
                    <p className="mt-1 text-[0.65rem] text-ink-faint">
                      {formatDateTime(lead.createdAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>

        {/* Recent applications */}
        <AdminCard>
          <header className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-display text-base font-semibold text-ink">
              Recent applications
            </h2>
            <Link
              href="/admin/jobs"
              className="flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </header>

          {applications.length === 0 ? (
            <EmptyState
              icon={<Briefcase className="h-6 w-6" />}
              title="No applications yet"
              body={
                connected
                  ? "Candidate applications from the career page will land here."
                  : "Connect Firebase to start collecting applications."
              }
            />
          ) : (
            <ul className="divide-y divide-[color:var(--line)]">
              {applications.slice(0, 6).map((application) => (
                <li key={application.id} className="flex items-start gap-3 px-5 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-semibold text-ink">
                      {application.name}
                    </p>
                    <p className="truncate text-xs text-ink-faint">{application.jobTitle}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <StatusBadge status={application.status} />
                    <p className="mt-1 text-[0.65rem] text-ink-faint">
                      {formatDateTime(application.createdAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>
      </div>
    </AdminPage>
  );
}
