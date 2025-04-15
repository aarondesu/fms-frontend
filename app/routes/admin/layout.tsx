import { adminAuthApi, useUserQuery } from "~/redux/api/adminAuthApi";
import { store } from "~/redux/store";
import type { Route } from "./+types/layout";
import { Outlet } from "react-router";
import { Loader2 } from "lucide-react";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const promiseResult = store.dispatch(adminAuthApi.endpoints.user.initiate());
  const { data } = await promiseResult;

  return data;
}

export function HydrateFallback() {
  return (
    <div className="flex w-full min-h-screen">
      <div className="flex flex-col m-auto place-content-center">
        <div>Loading...</div>
        <Loader2 className="w-15 h-15 animate-spin" />
      </div>
    </div>
  );
}

export default function AdminLayout({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div>Test</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
