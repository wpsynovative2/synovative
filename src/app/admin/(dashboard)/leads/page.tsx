import { Inbox, Mail, Phone } from "lucide-react";
import { fetchLeads } from "@/lib/firebase/collections";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { serviceNames } from "@/content/services";
import { formatDateTime } from "@/lib/utils";
import { AdminCard, AdminPage, EmptyState, StatusBadge } from "@/components/admin/shell";
import { LeadStatusSelect } from "./lead-status-select";

export const metadata = { title: "Leads" };
export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await fetchLeads(200);
  const connected = isFirebaseAdminConfigured();

  return (
    <AdminPage
      title="Leads"
      description="Every enquiry submitted from the home page, contact page and service pages."
    >
      <AdminCard>
        {leads.length === 0 ? (
          <EmptyState
            icon={<Inbox className="h-6 w-6" />}
            title="No enquiries yet"
            body={
              connected
                ? "When someone submits a form on the site, it will appear here with the page it came from."
                : "Firebase isn't connected, so nothing is being stored. Add the credentials to .env.local to start collecting enquiries."
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] text-left text-sm">
              <thead>
                <tr className="border-b border-line font-display text-[0.68rem] tracking-[0.12em] text-ink-faint uppercase">
                  <th scope="col" className="px-5 py-3.5 font-semibold">Contact</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Interested in</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Message</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Received</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[color:var(--line)]">
                {leads.map((lead) => (
                  <tr key={lead.id} className="align-top transition-colors hover:bg-paper">
                    <td className="px-5 py-4">
                      <p className="font-display font-semibold text-ink">{lead.name}</p>
                      {lead.company && (
                        <p className="text-xs text-ink-faint">{lead.company}</p>
                      )}
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-soft">
                        <Mail className="h-3 w-3 shrink-0 text-brand" />
                        <a href={`mailto:${lead.email}`} className="hover:underline">
                          {lead.email}
                        </a>
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-ink-soft">
                        <Phone className="h-3 w-3 shrink-0 text-brand" />
                        <a href={`tel:${lead.phone}`} className="hover:underline">
                          {lead.phone}
                        </a>
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-ink-soft">{serviceNames[lead.service ?? "general"]}</p>
                      <p className="mt-1 font-mono text-[0.68rem] text-ink-faint">
                        {lead.source}
                      </p>
                    </td>

                    <td className="max-w-sm px-5 py-4">
                      <p className="leading-relaxed text-ink-soft">{lead.message}</p>
                    </td>

                    <td className="px-5 py-4 text-xs whitespace-nowrap text-ink-faint">
                      {formatDateTime(lead.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <LeadStatusSelect id={lead.id} status={lead.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>

      {leads.length > 0 && (
        <p className="mt-4 text-xs text-ink-faint">
          Showing the {leads.length} most recent enquiries.{" "}
          <StatusBadge status="new" /> means nobody has picked it up yet.
        </p>
      )}
    </AdminPage>
  );
}
