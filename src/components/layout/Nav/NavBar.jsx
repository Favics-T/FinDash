import React from 'react'
import Search from './Search'

function NavBar() {
  return (
    <nav className='bg-sidebar-bg  h-10'>
      {/* left */}
      <div>
        <h1>Crypto Analytics</h1>
        <Search />
      </div>

      {/* right */}
      <div></div>
      
    </nav>
  )
}

export default NavBar
