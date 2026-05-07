import React from 'react'
// import {Notification, Settings} from 'lucide-react'
// import { Notification } from 'lucide-react'
import { Settings } from 'lucide-react'
import { IoIosNotificationsOutline } from "react-icons/io";

export default function RightNav() {
  return (
    <div className='flex gap-4 items-center'>
      <IoIosNotificationsOutline />
      <Settings />

      {/* Avatar */}
      <div className='border rounded-full '>
        <img src="" alt="image" className='w-8 h-8' />
      </div>
    </div>
  )
}
