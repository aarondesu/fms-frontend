import type { Route } from "./+types/layout";
import { Outlet, useNavigate, useLocation } from "react-router";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import AdminSidebar from "~/components/admin/admin-sidebar";
import PageNavigation from "~/components/admin/page-navigation";
import { toast } from "sonner";
import { useEffect } from "react";

const session_token_key = import.meta.env.VITE_SESSION_TOKEN_KEY;

export default function AdminLayout({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (!sessionStorage.getItem(session_token_key) ||
        sessionStorage.getItem(session_token_key) === "") &&
      location.pathname !== "/admin/login"
    ) {
      toast.error("Login to proceed");
      navigate("/admin/login");
    }
  }, [navigate]);

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
