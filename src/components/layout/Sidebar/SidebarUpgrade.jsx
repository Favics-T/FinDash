import React from 'react'

export default function SidebarUpgrade() {
  return (
     <div className="bg-sidebar-card flex flex-col gap-4  p-4 rounded-lg w-50 text-sm">
                <p className="inter font-semibold text-[12px]">PRO PLAN</p>
                <button className="bg-sidebar-cta text-sidebar-cta-text py-1 rounded-lg text-center">Upgrade to Pro</button>
            </div>
  )
}
