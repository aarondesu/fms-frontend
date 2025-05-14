import type { Route } from "./+types/layout";
import { Outlet } from "react-router";
import { SidebarProvider } from "~/components/ui/sidebar";
import AdminSidebar from "~/components/admin/admin-sidebar";
import PageNavigation from "~/components/admin/page-navigation";
import { AdminAuthenticationrProvider } from "~/components/admin/authentication-provider";
const session_token_key = import.meta.env.VITE_SESSION_TOKEN_KEY;

export default function AdminLayout({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex w-full min-h-screen">
      <AdminAuthenticationrProvider>
        <SidebarProvider>
          <div className="">
            <AdminSidebar />
          </div>
          <main className="w-full">
            <div className="flex flex-col gap-2">
              <PageNavigation />
              <div className="p-2">
                <Outlet />
              </div>
            </div>
          </main>
        </SidebarProvider>
      </AdminAuthenticationrProvider>
    </div>
  );
}
