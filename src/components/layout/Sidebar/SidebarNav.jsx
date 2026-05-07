import React from "react";
import { pages } from "../../../data/pages";
import { NavLink } from "react-router-dom";

export default function SidebarNav() {

  const navLinkClass = ({ isActive }) =>
    `
      flex items-center gap-3 text-sm
      px-4 py-2 w-full
      transition-all duration-200 rounded-lg
      ${
        isActive
          ? "bg-sidebar-accent/10 text-sidebar-accent"
          : "text-gray-300 hover:text-white hover:bg-white/5"
      }
    `;

  return (
    <nav>
      <ul className="space-y-2">

        {pages.map((page) => {
          const Icon = page.icon;

          return (
            <li key={page.page}>

              <NavLink
                to={page.to}
                className={navLinkClass}
              >
                <Icon className="w-5 h-5" />

                <span>{page.page}</span>
              </NavLink>

            </li>
          );
        })}

      </ul>
    </nav>
  );
}