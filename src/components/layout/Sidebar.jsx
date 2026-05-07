import React from "react";
import { NavLink } from "react-router-dom";
import { pages } from "../../data/pages";
import { CircleQuestionMark,Settings } from "lucide-react";
import { cn } from "../../utility/utils";

function Sidebar() {
  return (
    <aside className="w-64 bg-sidebar-bg items-center py-10 flex flex-col justify-between">

      <div className="space-y-10">

        {/* Logo */}
        <div className="px-6">
          <p className="text-sidebar-highlight text-3xl font-bold">
            FinDash
          </p>

          <p className="text-sidebar-accent text-sm">
            Global Alpha
          </p>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="space-y-2">

            {pages.map((page) => {
              const Icon = page.icon;

              return (
                <li key={page.page}>
                  <NavLink
                    to={page.to}
                    className={({ isActive }) =>
                      `
                      flex items-center gap-3 text-sm
                      px-4 py-1  w-50
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-sidebar-accent/10 text-sidebar-accent"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }
                    `
                    }
                  >
                    <Icon className="w-5 h-5" />

                    <span>{page.page}</span>
                  </NavLink>
                </li>
              );
            })}

          </ul>
        </nav>

      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-8 text-sidebar-muted">
        {/* pro sect */}
        <div className="bg-sidebar-card flex flex-col gap-4  p-4 rounded-lg w-50 text-sm">
            <p className="inter font-semibold text-[12px]">PRO PLAN</p>
            <button className="bg-sidebar-cta text-sidebar-cta-text py-1 rounded-lg text-center">Upgrade to Pro</button>
        </div>

        {/* setting */}
        <ul className=" text-sm flex flex-col gap-2">
              <li className="flex items-center gap-2 "><span className=""><CircleQuestionMark className="text-[8px]" /></span> Support</li>
              <li className="flex items-center gap-2"> <span><Settings /></span>Settings</li>
        </ul>
      </div>

    </aside>
  );
}

export default Sidebar;