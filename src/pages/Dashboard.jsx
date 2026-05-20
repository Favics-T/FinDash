import React, { useState } from 'react';
import useCryptoStore from '../store/useCryptoStore';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import {
  TrendingUp, Star,  Sparkles,  PieChart,} from 'lucide-react';
import PriceChart from '../components/charts/PriceChart';
import { formatCurrency, formatCompactNumber } from '../hooks/utils';
import Loader from '../components/ui/Loader';
import { useSubscription } from '../hooks/useSubscription';
import { ProGate, ProBadge } from '../components/subscription/ProGate';
import Stat from '../components/dashboard/Stat'
import MoverRow from '../components/dashboard/MoverRow';
import PortfolioWidget from '../components/dashboard/PortfolioWidget';
import LeftDiv from '../components/dashboard/LeftDiv';
import MarketStatus from '../components/dashboard/MarketStatus';


const Dashboard = () => {
  const { coins,  loading, error, watchlist } = useCryptoStore();
  const { isPro, canAccess } = useSubscription();
  
  const allowedRanges = isPro ? ['1D', '7D', '30D', '1Y'] : ['7D'];
  const [activeRange, setActiveRange] = useState('7D');

  if (loading && coins.length === 0) return <Loader size="lg" className="mt-20" />;
  if (error && coins.length === 0) return <div className="text-error text-center p-8">{error}</div>;

  const btc = coins.find((c) => c.id === 'bitcoin') || coins[0];
  const topGainers = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 3);
  const watchlistCoins = coins.filter((c) => watchlist.includes(c.id));
  const isUp = btc?.price_change_percentage_24h > 0;
  

  return (
    <div className="flex flex-col gap-lg max-w-400 mx-auto">
            <MarketStatus />

      {/* Main grid  */}
      <div className="grid grid-cols-[1fr_2.2fr_1fr] gap-lg">

        {/* LEFT column */}
       <LeftDiv />

        {/* CENTER — BTC chart */}
        <div className="flex flex-col gap-md">
          <Card className="h-130 flex flex-col">
            <CardHeader>
              <div>
                <p className="text-label-caps mb-1">{btc?.name} / USD</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-h1 font-mono-data text-primary">
                    {formatCurrency(btc?.current_price)}
                  </span>
                  <span className={`font-mono-data ${isUp ? 'text-secondary' : 'text-error'}`}>
                    {isUp ? '+' : ''}{btc?.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Time range selector — locked ranges for free users */}
              <div className="flex gap-1 p-1 bg-outline-variant rounded-lg">
                {['1D', '7D', '30D', '1Y'].map((r) => {
                  const isLocked = !isPro && r !== '7D';
                  return (
                    <button
                      key={r}
                      onClick={() => !isLocked && setActiveRange(r)}
                      title={isLocked ? 'Pro feature' : r}
                      style={{
                        position: 'relative',
                        opacity: isLocked ? 0.45 : 1,
                        cursor: isLocked ? 'not-allowed' : 'pointer',
                      }}
                      className={`px-3 py-1 rounded-md text-label-caps transition ${
                        activeRange === r ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
                      }`}
                    >
                      {r}
                      {isLocked && (
                        <span style={{
                          position: 'absolute', top: -3, right: -3,
                          width: 8, height: 8, borderRadius: '50%',
                          background: 'var(--color-primary)',
                          border: '1.5px solid var(--color-background)',
                        }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </CardHeader>

            <div className="flex-1 px-4">
              <PriceChart
                data={btc?.sparkline_in_7d?.price}
                labels={btc?.sparkline_in_7d?.price?.map((_, i) => i)}
                color={isUp ? '#3ddba0' : '#ff6b6b'}
              />
            </div>

            <div className="grid grid-cols-3 border-t border-outline-variant p-5 gap-4">
              <Stat label="24H HIGH" value={formatCurrency(btc?.high_24h)} />
              <Stat label="24H LOW" value={formatCurrency(btc?.low_24h)} />
              <Stat label="VOLUME" value={formatCompactNumber(btc?.total_volume)} />
            </div>
          </Card>
        </div>

        {/* RIGHT column */}
        <div className="flex flex-col gap-md">

          {/* Market Movers (free) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-secondary" />
                <span className="font-bold">Market Movers</span>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              {topGainers.map((c) => <MoverRow key={c.id} coin={c} isGainer />)}
            </CardContent>
          </Card>

          {/* Portfolio Allocation (Pro gate) */}
          <ProGate featureKey="portfolioAllocation" featureLabel="Portfolio Allocation">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <PieChart size={16} className="text-primary" />
                  <span className="font-bold">Portfolio Split</span>
                </div>
                <ProBadge />
              </CardHeader>
              <CardContent>
                <PortfolioWidget />
              </CardContent>
            </Card>
          </ProGate>

          {/* Watchlist (free) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span className="font-bold">Watchlist</span>
              </div>
            </CardHeader>
            <CardContent>
              {watchlistCoins.length > 0 ? (
                watchlistCoins.map((coin) => <MoverRow key={coin.id} coin={coin} isGainer />)
              ) : (
                <div className="text-center py-6 text-on-surface-variant">Watchlist empty</div>
              )}
            </CardContent>
          </Card>

          {/* Predictive Trends (Pro gate) */}
          <ProGate featureKey="predictiveTrends" featureLabel="Predictive Trends">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-primary" />
                  <span className="font-bold">Predictive Trends</span>
                </div>
                <ProBadge />
              </CardHeader>
              <CardContent>
                <div style={{ padding: '0.5rem 0' }}>
                  {[['BTC', '+12.4% (7D)'], ['ETH', '+8.1% (7D)'], ['SOL', '-2.3% (7D)']].map(([c, v]) => (
                    <div key={c} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 12 }}>
                      <span style={{ color: 'var(--color-on-surface-variant)' }}>{c}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: v.startsWith('+') ? 'var(--color-secondary)' : 'var(--color-error)' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ProGate>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;