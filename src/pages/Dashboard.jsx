import React from 'react';
import { Link } from 'react-router-dom';
import useCryptoStore from '../store/useCryptoStore';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Star,
  ArrowRight,
} from 'lucide-react';
import PriceChart from '../components/charts/PriceChart';
import {
  formatCurrency,
  formatCompactNumber,
} from '../hooks/utils';
import Loader from '../components/ui/Loader';


const Stat = ({ label, value, sub, subUp }) => (
  <div>
    <p className="text-label-caps text-on-surface-variant mb-[4px]">
      {label}
    </p>
    <p className="text-[15px] font-bold font-mono-data text-on-surface">
      {value}
    </p>
    {sub !== undefined && (
      <p
        className={`text-[10px] font-mono-data mt-[2px] ${
          subUp ? 'text-secondary' : 'text-error'
        }`}
      >
        {sub}
      </p>
    )}
  </div>
);

const AlphaItem = ({ tag, tagColor, time, text }) => (
  <div className="py-[10px] border-b border-outline-variant/20">
    <div className="flex justify-between mb-[4px]">
      <span
        className="text-label-caps"
        style={{ color: tagColor }}
      >
        {tag}
      </span>
      <span className="text-label-caps text-on-surface-variant font-mono-data">
        {time}
      </span>
    </div>
    <p className="text-body-md text-on-surface leading-[1.5]">
      {text}
    </p>
  </div>
);

const MoverRow = ({ coin, isGainer }) => (
  <Link
    to={`/detail/${coin.id}`}
    className="flex items-center justify-between px-[10px] py-[7px] rounded-[10px] hover:bg-white/5 transition"
  >
    <div className="flex items-center gap-[8px]">
      <img
        src={coin.image}
        alt={coin.name}
        className="w-7 h-7 rounded-full"
      />
      <div>
        <p className="text-body-md font-bold text-on-surface">
          {coin.symbol?.toUpperCase()}
        </p>
        <p className="text-label-caps text-on-surface-variant">
          {coin.name}
        </p>
      </div>
    </div>

    <span
      className={`text-body-md font-bold font-mono-data ${
        isGainer ? 'text-secondary' : 'text-error'
      }`}
    >
      {coin.price_change_percentage_24h > 0 ? '+' : ''}
      {coin.price_change_percentage_24h?.toFixed(2)}%
    </span>
  </Link>
);


const Dashboard = () => {
  const { coins, globalData, loading, error, watchlist } =
    useCryptoStore();

  const [activeRange, setActiveRange] = React.useState('7D');

  if (loading && coins.length === 0)
    return <Loader size="lg" className="mt-[5rem]" />;

  if (error && coins.length === 0)
    return (
      <div className="text-error text-center p-8">{error}</div>
    );

  const btc =
    coins.find((c) => c.id === 'bitcoin') || coins[0];

  const topGainers = [...coins]
    .sort(
      (a, b) =>
        b.price_change_percentage_24h -
        a.price_change_percentage_24h
    )
    .slice(0, 3);

  const topLosers = [...coins]
    .sort(
      (a, b) =>
        a.price_change_percentage_24h -
        b.price_change_percentage_24h
    )
    .slice(0, 3);

  const watchlistCoins = coins.filter((c) =>
    watchlist.includes(c.id)
  );

  const isUp = btc?.price_change_percentage_24h > 0;

  const marketStatus =
    globalData?.market_cap_change_percentage_24h_usd > 0
      ? 'BULLISH'
      : 'BEARISH';

  return (
    <div className="flex flex-col gap-lg max-w-[1600px] mx-auto">

     
      <div className="flex items-center justify-between bg-surface-container border border-outline-variant/30 rounded-[14px] px-5 py-3">

        <div className="flex items-center gap-5">

          <div className="flex items-center gap-2">
            <span className="relative w-[10px] h-[10px]">
              <span className="absolute inset-0 rounded-full animate-ping bg-secondary" />
              <span className="relative w-[10px] h-[10px] rounded-full bg-secondary" />
            </span>

            <span className="text-label-caps">
              MARKET STATUS
            </span>

            <span
              className={`text-body-lg font-bold ${
                marketStatus === 'BULLISH'
                  ? 'text-secondary'
                  : 'text-error'
              }`}
            >
              {marketStatus}
            </span>
          </div>

          <div className="w-px h-7 bg-outline-variant" />

          <div className="flex gap-6">
            {[
              {
                l: 'FEAR & GREED',
                v: '78',
                s: 'Greed',
              },
              {
                l: 'BTC DOMINANCE',
                v: `${globalData?.market_cap_percentage?.btc?.toFixed(
                  1
                ) ?? '--'}%`,
              },
              {
                l: '24H VOLUME',
                v: formatCompactNumber(
                  globalData?.total_volume?.usd || 0
                ),
              },
            ].map(({ l, v, s }) => (
              <div key={l}>
                <p className="text-label-caps">{l}</p>
                <p className="text-body-md font-bold font-mono-data text-on-surface">
                  {v}{' '}
                  {s && (
                    <span className="text-secondary text-label-caps ml-1">
                      {s}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-on-surface-variant text-body-md">
            Global Cap:
          </span>
          <span className="font-mono-data font-bold text-on-surface">
            {formatCompactNumber(
              globalData?.total_market_cap?.usd || 0
            )}
          </span>
          <TrendingUp size={16} className="text-secondary" />
        </div>
      </div>

      
      <div className="grid grid-cols-[1fr_2.2fr_1fr] gap-lg">

        
        <div className="flex flex-col gap-md">

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-primary" />
                <span className="font-bold">Alpha Feed</span>
              </div>
              <Badge variant="primary">LIVE</Badge>
            </CardHeader>

            <CardContent className="px-5">
              <AlphaItem
                tag="Whale Alert"
                tagColor="var(--color-primary)"
                time="2m ago"
                text="5,000 BTC moved..."
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-surface">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-primary" />
                <span className="font-bold">
                  Volatility Scan
                </span>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-body-md text-on-surface-variant mb-3">
                High liquidation clusters detected...
              </p>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-label-caps">
                    SYSTEM CONFIDENCE
                  </span>
                  <span className="text-primary text-label-caps">
                    88%
                  </span>
                </div>

                <div className="h-1 bg-outline-variant rounded-full overflow-hidden">
                  <div className="h-full w-[88%] bg-gradient-to-r from-primary to-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CENTER */}
        <div className="flex flex-col gap-md">

          <Card className="h-[520px] flex flex-col">

            <CardHeader>
              <div>
                <p className="text-label-caps mb-1">
                  {btc?.name} / USD
                </p>

                <div className="flex items-baseline gap-3">
                  <span className="text-h1 font-mono-data text-primary">
                    {formatCurrency(btc?.current_price)}
                  </span>

                  <span
                    className={`font-mono-data ${
                      isUp
                        ? 'text-secondary'
                        : 'text-error'
                    }`}
                  >
                    {isUp ? '+' : ''}
                    {btc?.price_change_percentage_24h?.toFixed(
                      2
                    )}
                    %
                  </span>
                </div>
              </div>

              <div className="flex gap-1 p-1 bg-outline-variant rounded-lg">
                {['1D', '7D', '30D', '1Y'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setActiveRange(r)}
                    className={`px-3 py-1 rounded-md text-label-caps transition ${
                      activeRange === r
                        ? 'bg-primary text-on-primary'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </CardHeader>

            <div className="flex-1 px-4">
              <PriceChart
                data={btc?.sparkline_in_7d?.price}
                labels={btc?.sparkline_in_7d?.price?.map(
                  (_, i) => i
                )}
                color={isUp ? '#3ddba0' : '#ff6b6b'}
              />
            </div>

            <div className="grid grid-cols-3 border-t border-outline-variant p-5 gap-4">
              <Stat
                label="24H HIGH"
                value={formatCurrency(btc?.high_24h)}
              />
              <Stat
                label="24H LOW"
                value={formatCurrency(btc?.low_24h)}
              />
              <Stat
                label="VOLUME"
                value={formatCompactNumber(
                  btc?.total_volume
                )}
              />
            </div>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-md">

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp
                  size={16}
                  className="text-secondary"
                />
                <span className="font-bold">
                  Market Movers
                </span>
              </div>
            </CardHeader>

            <CardContent className="p-3">
              {topGainers.map((c) => (
                <MoverRow
                  key={c.id}
                  coin={c}
                  isGainer
                />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span className="font-bold">
                  Watchlist
                </span>
              </div>
            </CardHeader>

            <CardContent>
              {watchlistCoins.length > 0 ? (
                watchlistCoins.map((coin) => (
                  <MoverRow
                    key={coin.id}
                    coin={coin}
                    isGainer
                  />
                ))
              ) : (
                <div className="text-center py-6 text-on-surface-variant">
                  Watchlist empty
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;