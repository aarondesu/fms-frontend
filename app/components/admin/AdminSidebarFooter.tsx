import type { User } from "~/types";
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

interface SidebarFooterProps {}

const links = [
  {
    name: "Account",
    children: [
      {
        title: "Settings",
        url: "#",
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
            {links.map((link) => (
              <>
                <DropdownMenuLabel>{link.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {link.children.map((child) => (
                  <DropdownMenuItem asChild>
                    <span>
                      <child.icon /> <a href={child.url}>{child.title}</a>
                    </span>
                  </DropdownMenuItem>
                ))}
              </>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
