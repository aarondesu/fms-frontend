import type { Route } from "./+types/layout";
import { Outlet } from "react-router";
import { Loader2 } from "lucide-react";
import { useGetUserQuery } from "~/redux/api/adminAuthApi";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import AdminSidebar from "~/components/AdminSidebar";

export default function AdminLayout({ loaderData }: Route.ComponentProps) {
  const {} = useGetUserQuery();

  return (
    <div className="flex w-full min-h-screen">
      <SidebarProvider>
        <div className="">
          <AdminSidebar />
        </div>
        <main>
          <div className="flex flex-col gap-2">
            <div className="p-2">
              <SidebarTrigger />
            </div>
            <div className="p-2">
              <Outlet />
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
