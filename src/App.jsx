import React from 'react'
import { Outlet, Route, Router } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import NavBar from './components/layout/NavBar'


const Layout =()=>{
  return(
    <div className='flex'>
      <Sidebar />
      <div>
        <NavBar />
        <Outlet />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div>
      <Routes>
        <Router>
          <Route element={<Layout />}>
          

          </Route>
        </Router>
      </Routes>
    </div>
  )
}

