import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Navbar from './components/layout/Nav/Navbar'
// import Navbar from './components/layout/Navbar/Navbar';
import Dashboard from './pages/Dashboard';
import Markets from './pages/Markets';
import CoinDetail from './pages/CoinDetail';
import Watchlist from './pages/Watchlist';
import Compare from './pages/Compare';
import { useFetchCoins } from './hooks/useFetchCoins';

export default function App() {
  useFetchCoins();

  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-background)' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 264 }}>
          <Navbar />
          <main style={{ flex: 1, padding: '1.75rem 2rem', overflowX: 'hidden' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/detail" element={<CoinDetail />} />
              <Route path="/detail/:id" element={<CoinDetail />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/compare" element={<Compare />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
