import React from 'react'

function Sidebar() {
  return (
    <div className='bg-[#353436] w-2/10 flex flex-col justify-between'>
      <div className='flex flex-col gap-8'>
        {/* Logo */}
      <div>
        <h1 className='text-[#7DF4FF] font-Inter font-bold text-[32px]'>FinDash</h1>
      </div>
      {/* Pages */}
      <div>Links</div>
      </div>
      
      {/* pro plan */}
      <div>Pro</div>
    </div>
  )
}

export default Sidebar
