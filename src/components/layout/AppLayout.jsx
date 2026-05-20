import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import { NavBar } from './Nav/NavBar.jsx';
import { useFetchCoins } from '../../hooks/useFetchCoins';
import { useSubscriptionStore } from '../../store/useSubscriptionStore';
import { FreeTrialBanner } from '../subscription/SubscriptionBanners';

export default function AppLayout() {
  useFetchCoins();

  // Auto-reset daily AI insights counter
  const checkAndResetDaily = useSubscriptionStore(s => s.checkAndResetDaily);
  useEffect(() => {
    checkAndResetDaily();
  }, []);

  return (
    <div className="flex min-h-screen bg-background text-on-background">
      <Sidebar />
      <main className="flex-1 ml-66 flex flex-col">
        <NavBar />
        <FreeTrialBanner />
        <div className="p-lg flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}