import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Route } from "./+types/dashboard";
import { TabsContent } from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";

const company_name = import.meta.env.VITE_COMPANY_NAME;

export function meta({}: Route.MetaArgs) {
  return [{ title: `${company_name} | Dashboard` }];
}

export default function AdminDashboard() {
  return (
    <div className="p-2 flex flex-col gap-4">
      <h3 className="text-3xl font-black">Dashboard</h3>
      <AnimatePresence>
        <Tabs defaultValue="overview" className="w-full gap-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="readings">Readings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Overview
            </motion.div>
          </TabsContent>
          <TabsContent value="readings">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Readings
            </motion.div>
          </TabsContent>
        </Tabs>
      </AnimatePresence>
    </div>
  );
}
