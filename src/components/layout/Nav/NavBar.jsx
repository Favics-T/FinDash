import React from 'react'
import Search from './Search'
import RightNav from './Rightnav'

function NavBar() {
  return (
    <nav className='bg-sidebar-bg flex justify-between   p-5'>
      {/* left */}
      <div className='flex gap-4 items-center '>
        <h1>Crypto Analytics</h1>
        <Search />
      </div>

      {/* right */}
      <div>
        <RightNav />
      </div>
      
    </nav>
  )
}

export default NavBar
