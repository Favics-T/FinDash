import React from "react";
import { cn } from "../../../utility/utils";
import SidebarLogo from "./SidebarLogo";
import SidebarNav from "./SidebarNav";
import SidebarUpgrade from "./SidebarUpgrade";
import SidebarFooter from "./SidebarFooter";

function Sidebar() {
  return (
    <aside className="w-64 bg-sidebar-bg items-center py-10 flex flex-col justify-between">
      <div className="space-y-10">
        {/* Logo */}
               <SidebarLogo />
        {/* Navigation */}
             <SidebarNav />
      </div>
      {/* Bottom Section */}
      <div className="flex flex-col gap-8 text-sidebar-muted">
        {/* pro sect */}
               <SidebarUpgrade />
        {/* setting */}
       <SidebarFooter />
      </div>
    </aside>
  );
}

export default Sidebar;