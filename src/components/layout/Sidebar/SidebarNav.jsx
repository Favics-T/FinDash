import React from 'react'
import { pages } from '../../../data/pages';
import { NavLink } from 'react-router-dom';

export default function SidebarNav() {
  return (
    <div>
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
  )
}
