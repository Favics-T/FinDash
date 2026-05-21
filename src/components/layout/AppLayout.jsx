import { useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar/Sidebar';
// import Nav
import Sidebar from './Sidebar/index';
import { NavBar } from './Nav/NavBar';
import { useFetchCoins } from '../../hooks/useFetchCoins';
import { useSubscriptionStore } from '../../store/useSubscriptionStore';
import { FreeTrialBanner } from '../subscription/SubscriptionBanners';

export default function AppLayout() {
  useFetchCoins();

  const checkAndResetDaily = useSubscriptionStore((s) => s.checkAndResetDaily);

  // Stable reference via useCallback so the effect dep array is correct
  const stableReset = useCallback(checkAndResetDaily, []);
  useEffect(() => { stableReset(); }, [stableReset]);

  return (
    <div className="flex min-h-screen bg-white text-on-background">
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