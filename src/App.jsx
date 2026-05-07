import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import NavBar from './components/layout/NavBar'
import AppLayout from './components/layout/AppLayout'

export default function App() {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<AppLayout />}>

      </Route>
     </Routes>
     </BrowserRouter>
    </div>
  )
}

