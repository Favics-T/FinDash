import { useState } from 'react';
import useCryptoStore from '../store/useCryptoStore';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { TrendingUp, Star, Sparkles, PieChart } from 'lucide-react';
import PriceChart from '../components/charts/PriceChart';
import { formatCurrency, formatCompactNumber } from '../utility/utils';
import Loader from '../components/ui/Loader';
import { useSubscription } from '../hooks/useSubscription';
import { ProGate, ProBadge } from '../components/subscription/ProGate';
import Stat from '../components/dashboard/Stat';
import MoverRow from '../components/dashboard/MoverRow';
import PortfolioWidget from '../components/dashboard/PortfolioWidget';
import LeftDiv from '../components/dashboard/LeftDiv';
import MarketStatus from '../components/dashboard/MarketStatus';
import { TIME_RANGES } from '../data/navigation';

const Dashboard = () => {
  const { coins, loading, error, watchlist } = useCryptoStore();
  const { isPro } = useSubscription();
  const [activeRangeLabel, setActiveRangeLabel] = useState('7D');

  if (loading && coins.length === 0) return <Loader size="lg" className="mt-20" />;
  if (error   && coins.length === 0) return <div className="text-error text-center p-8">{error}</div>;

  const btc          = coins.find((c) => c.id === 'bitcoin') ?? coins[0];
  const topGainers   = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 3);
  const watchlistCoins = coins.filter((c) => watchlist.includes(c.id));
  const isUp         = (btc?.price_change_percentage_24h ?? 0) > 0;

  const PREDICTIVE_TRENDS = [
    { coin: 'BTC', value: '+12.4% (7D)', up: true  },
    { coin: 'ETH', value: '+8.1% (7D)',  up: true  },
    { coin: 'SOL', value: '-2.3% (7D)',  up: false },
  ];

  return (
    <div className="flex flex-col gap-lg max-w-[1600px] mx-auto">
      <MarketStatus />

      <div className="grid grid-cols-[1fr_2.2fr_1fr] gap-lg">

        {/* LEFT */}
        <LeftDiv />

        {/* CENTER — BTC Chart */}
        <div className="flex flex-col gap-md">
          <Card className="h-[520px] flex flex-col">
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

              {/* Time range selector */}
              <div className="flex gap-1 p-1 bg-outline-variant rounded-lg">
                {TIME_RANGES.map(({ label, pro }) => {
                  const isLocked = !isPro && pro;
                  const isActive = activeRangeLabel === label;
                  return (
                    <button
                      key={label}
                      onClick={() => !isLocked && setActiveRangeLabel(label)}
                      title={isLocked ? 'Pro feature' : label}
                      className={`relative px-3 py-1 rounded-md text-label-caps transition-all ${isActive ? 'bg-primary text-on-primary' : 'text-on-surface-variant'} ${isLocked ? 'opacity-45 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {label}
                      {isLocked && (
                        <span className="absolute -top-[3px] -right-[3px] w-2 h-2 rounded-full bg-[var(--color-primary)] border-[1.5px] border-[var(--color-background)]" />
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
              <Stat label="24H LOW"  value={formatCurrency(btc?.low_24h)} />
              <Stat label="VOLUME"   value={formatCompactNumber(btc?.total_volume)} />
            </div>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-md">
          {/* Market Movers */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-secondary" />
                <span className="font-bold">Market Movers</span>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              {topGainers.map((c) => <MoverRow key={c.id} coin={c} />)}
            </CardContent>
          </Card>

          {/* Portfolio Allocation — Pro */}
          <ProGate featureKey="portfolioAllocation" featureLabel="Portfolio Allocation">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <PieChart size={16} className="text-primary" />
                  <span className="font-bold">Portfolio Split</span>
                </div>
                <ProBadge />
              </CardHeader>
              <CardContent><PortfolioWidget /></CardContent>
            </Card>
          </ProGate>

          {/* Watchlist */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span className="font-bold">Watchlist</span>
              </div>
            </CardHeader>
            <CardContent>
              {watchlistCoins.length > 0
                ? watchlistCoins.map((coin) => <MoverRow key={coin.id} coin={coin} />)
                : <div className="text-center py-6 text-on-surface-variant">Watchlist empty</div>}
            </CardContent>
          </Card>

          {/* Predictive Trends — Pro */}
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
                <div className="py-2">
                  {PREDICTIVE_TRENDS.map(({ coin, value, up }) => (
                    <div key={coin} className="flex justify-between py-[5px] text-[12px]">
                      <span className="text-on-surface-variant">{coin}</span>
                      <span className={`font-mono font-bold ${up ? 'text-[var(--color-secondary)]' : 'text-[var(--color-error)]'}`}>{value}</span>
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