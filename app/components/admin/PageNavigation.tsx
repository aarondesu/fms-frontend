import { SidebarTrigger } from "../ui/sidebar";

export default function PageNavigation() {
  return (
    <div className="w-full grid grid-cols-2 gap-2">
      <div className="p-2 flex gap-2">
        <SidebarTrigger />
      </div>
      <div className="p-2 flex place-content-end">
        <div className=""></div>
      </div>
    </div>
  );
}
