import {
  ChevronDown,
  LayoutDashboard,
  Plus,
  Scroll,
  UserPlus,
  Users2,
  Wrench,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import AdminSidebarFooter from "./AdminSidebarFooter";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";

const links = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Admins",
    url: "/admin/admins",
    icon: Users2,
  },
  {
    title: "Services",
    url: "/admin/services",
    icon: Wrench,
  },
  {
    title: "Readings",
    url: "#",
    icon: Scroll,
  },
];

interface AdminSidebarProps {}

export default function AdminSidebar({}: AdminSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton asChild>
                    <a href={link.url}>
                      <link.icon />
                      <span>{link.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AdminSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
