import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Watchlist from './features/watchlist/Watchlist'
import CoinDetail from './features/coin/CoinDetail'
import MarketTables from './features/markets/MarketTables'
import Dashboard from './features/dashboard/Dashboard'
import Compare from './features/compare/Compare'

export default function App() {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<AppLayout />}>
      <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/watchlist' element={<Watchlist />}/>
        <Route path='/coindetail' element={<CoinDetail />}/>
        <Route path='/markets' element={<MarketTables />}/>
        <Route path='/compare' element={<Compare />}/>
        <Route />
        <Route />
      </Route>
     </Routes>
     </BrowserRouter>
    </div>
  )
}

