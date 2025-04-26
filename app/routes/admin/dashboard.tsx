import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Route } from "./+types/dashboard";
import { TabsContent } from "@radix-ui/react-tabs";

const company_name = import.meta.env.VITE_COMPANY_NAME;

export function meta({}: Route.MetaArgs) {
  return [{ title: `${company_name} | Dashboard` }];
}

export default function AdminDashboard() {
  return (
    <div className="p-2 flex flex-col gap-4">
      <h3 className="text-3xl font-black">Dashboard</h3>
      <Tabs defaultValue="overview" className="w-full gap-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="readings">Readings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview</TabsContent>
        <TabsContent value="readings">Readings</TabsContent>
      </Tabs>
    </div>
  );
}
