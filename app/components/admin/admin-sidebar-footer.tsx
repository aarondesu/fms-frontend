import type { AdminUser } from "~/types";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useGetUserQuery } from "~/redux/api/adminAuthApi";
import { Skeleton } from "../ui/skeleton";
import { ChevronUp, LogOut, Settings, User2 } from "lucide-react";
import { Link } from "react-router";
import { useAdminAuthentication } from "./authentication-provider";

interface SidebarFooterProps {}

const links = [
  {
    name: "Account",
    children: [
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
      {
        title: "Logout",
        url: "#",
        icon: LogOut,
      },
    ],
  },
];

export default function AdminSidebarFooter({}: SidebarFooterProps) {
  const { data, isLoading } = useGetUserQuery();
  const { logout } = useAdminAuthentication();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton disabled={isLoading}>
              {!isLoading ? (
                <>
                  <User2 /> {data?.username}
                  <ChevronUp className="ml-auto" />
                </>
              ) : (
                <>
                  <User2 />
                  <Skeleton className="w-[200px] h-[20px] rounded-full" />
                  <ChevronUp className="ml-auto" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-[300px]">
            {/* {links.map((link) => (
              <>
                <DropdownMenuLabel>{link.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {link.children.map((child) => (
                  <DropdownMenuItem asChild>
                    <Link to={child.url}>
                      <child.icon />
                      <span>{child.title}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </>
            ))} */}
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="#" onClick={() => logout()}>
                <LogOut />
                <span>Logout</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
