import { Moon } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { Toggle } from "../ui/toggle";
import { useState } from "react";
import { useTheme } from "../theme-provider";

export default function PageNavigation() {
  const { setTheme, theme } = useTheme();

  console.log(theme);

  return (
    <div className="w-full grid grid-cols-2 gap-2">
      <div className="p-2 flex gap-2">
        <SidebarTrigger />
      </div>
      <div className="p-2 flex place-content-end">
        <div className="flex gap-2 items-center">
          <span>Dashboard</span>
          <Toggle
            size="default"
            variant="outline"
            pressed={theme === "dark"}
            onPressedChange={(value) => {
              setTheme(value ? "dark" : "light");
            }}
          >
            <Moon />
          </Toggle>
        </div>
      </div>
    </div>
  );
}
