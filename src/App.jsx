import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Markets from './pages/Markets';
import CoinDetail from './pages/CoinDetail';
import Watchlist from './pages/Watchlist';
import Compare from './pages/Compare';
import { useFetchCoins } from './hooks/useFetchCoins';

export default function App() {
  // useFetchCoins();

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/detail/:id" element={<CoinDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/compare" element={<Compare />} />
        </Route>
      </Routes>
    </Router>
  );
}