import type { Route } from "./+types/layout";
import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import AdminSidebar from "~/components/admin/AdminSidebar";
import PageNavigation from "~/components/admin/PageNavigation";

export default function AdminLayout({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex w-full min-h-screen">
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
    </div>
  );
}
