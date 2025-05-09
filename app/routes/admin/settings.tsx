import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Route } from "./+types/settings";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import ChangeAdminPasswordTab from "~/components/admin/change-admin-password-tab";

const company_name = import.meta.env.VITE_COMPANY_NAME;

export function meta({}: Route.MetaArgs) {
  return [{ title: `${company_name} | Settings` }];
}

export default function SettingsPage({}: Route.ComponentProps) {
  return (
    <div className="p-2 flex flex-col gap-4">
      <h3 className="text-3xl font-black">Settings</h3>
      <AnimatePresence>
        <Tabs defaultValue="password">
          <TabsList className="grid grid-cols-2 ">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Account
            </motion.div>
          </TabsContent>
          <ChangeAdminPasswordTab />
        </Tabs>
      </AnimatePresence>
    </div>
  );
}
