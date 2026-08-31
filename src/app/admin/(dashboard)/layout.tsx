import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth/session";
import { AdminNav } from "./admin-nav";

/**
 * Guard for every authenticated admin route.
 *
 * The check lives in the layout rather than in a proxy/middleware so that it
 * runs against a fully verified Firebase session on the server — middleware
 * cannot use the Admin SDK, and a cookie's mere presence is not proof of a
 * valid session.
 */
export default async function AdminDashboardLayout({
  children,
}: LayoutProps<"/admin">) {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AdminNav user={user} />
      <div className="flex-1 overflow-x-hidden bg-paper">{children}</div>
    </div>
  );
}
