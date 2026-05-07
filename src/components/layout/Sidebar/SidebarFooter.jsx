import React from 'react'
import { CircleQuestionMark,Settings } from 'lucide-react'

export default function SidebarFooter() {
  return (
    <ul className=" text-sm flex flex-col gap-2">
              <li className="flex items-center gap-2 "><span className=""><CircleQuestionMark className="text-[8px]" /></span> Support</li>
              <li className="flex items-center gap-2"> <span><Settings /></span>Settings</li>
        </ul>
  )
}
