import { useState } from 'react';
import {
  TrendingUp, TrendingDown, Star, Activity, Info,
  Globe, ExternalLink, ArrowRight, Lock, Crown,
} from 'lucide-react';
import useCryptoStore from '../store/useCryptoStore';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import PriceChart from '../components/charts/PriceChart';
import { formatCurrency, formatCompactNumber } from '../utility/utils';
import Loader from '../components/ui/Loader';
import { useWatchlist } from '../hooks/useWatchlist';
import { ProBadge } from '../components/ui/ProBadge';
import { UpgradeModal } from '../components/subscription/UpgradeModal';
import { useCoinDetail } from '../hooks/useCoinDetail';
import { TIME_RANGES } from '../data/navigation';

const CoinDetail = () => {
  const {
    coinId, coin, chartData, loading, error,
    chartLoading, modalOpen, setModalOpen,
    activeRange, activeRangeIdx, handleRangeChange, isPro,
  } = useCoinDetail();

  const { watchlist } = useCryptoStore();
  const { toggleWatchlist } = useWatchlist(coinId);

  if (loading) return <Loader className="mt-xl" size="lg" />;
  if (error)   return <div className="text-error p-xl">{error}</div>;
  if (!coin)   return null;

  const isUp = coin.market_data.price_change_percentage_24h > 0;

  const STATS = [
    { label: 'Market Cap',   value: formatCurrency(coin.market_data.market_cap.usd) },
    { label: '24h Vol',      value: formatCurrency(coin.market_data.total_volume.usd) },
    { label: 'Circ. Supply', value: formatCompactNumber(coin.market_data.circulating_supply) },
    { label: 'Total Supply', value: formatCompactNumber(coin.market_data.total_supply || 0) },
  ];

  return (
    <>
      <div className="space-y-lg animate-in fade-in duration-500">

        {/* Coin header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-md">
          <div className="flex items-center gap-lg">
            <div className="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center border border-outline-variant p-2">
              <img src={coin.image.large} alt={coin.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-sm">
                <h1 className="font-h1 text-3xl font-bold text-on-surface">{coin.name}</h1>
                <Badge variant="neutral">{coin.symbol.toUpperCase()}</Badge>
                <Badge variant="primary">Rank #{coin.market_cap_rank}</Badge>
              </div>
              <div className="flex items-center gap-md mt-xs">
                <div className="text-4xl font-bold font-mono-data text-on-surface">
                  {formatCurrency(coin.market_data.current_price.usd)}
                </div>
                <div className={`flex items-center font-mono-data font-bold ${isUp ? 'text-secondary' : 'text-error'}`}>
                  {isUp ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                  <span className="text-lg ml-1">{coin.market_data.price_change_percentage_24h?.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-md w-full lg:w-auto">
            <Button variant="secondary" onClick={toggleWatchlist} className="flex-1 lg:flex-none gap-2">
              <Star size={18} fill={watchlist.includes(coinId) ? 'currentColor' : 'none'} className={watchlist.includes(coinId) ? 'text-secondary' : ''} />
              {watchlist.includes(coinId) ? 'Saved' : 'Watchlist'}
            </Button>
            <Button className="flex-1 lg:flex-none gap-2">
              Trade Now <ArrowRight size={18} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-lg">
          <div className="col-span-12 lg:col-span-9 space-y-lg">

            {/* Chart card */}
            <Card className="h-[500px] flex flex-col">
              <CardHeader className="flex justify-between items-center py-md bg-surface-container-high/30">
                <div className="flex items-center gap-sm">
                  <Activity size={18} className="text-primary-container" />
                  <h3 className="font-h3 text-h3">Price Chart ({activeRange.label})</h3>
                </div>

                <div className="flex gap-1">
                  {TIME_RANGES.map((range, idx) => {
                    const isLocked = range.pro && !isPro;
                    const isActive = activeRangeIdx === idx;
                    return (
                      <button
                        key={range.label}
                        onClick={() => handleRangeChange(range, idx)}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition-colors flex items-center gap-1 ${isActive ? 'bg-secondary text-on-secondary' : isLocked ? 'text-on-surface-variant opacity-50 cursor-pointer' : 'text-on-surface-variant hover:text-on-surface'}`}
                      >
                        {range.label}
                        {isLocked && <Lock size={8} className="opacity-70" />}
                      </button>
                    );
                  })}
                </div>
              </CardHeader>

              <CardContent className="flex-1 relative">
                {chartLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-[2] bg-[rgba(9,9,11,0.5)]">
                    <Loader size="sm" />
                  </div>
                )}
                {chartData && (
                  <PriceChart
                    data={chartData.prices.map((p) => p[1])}
                    labels={chartData.prices.map((p) => new Date(p[0]).toLocaleDateString())}
                    color={isUp ? '#4edea3' : '#ffb4ab'}
                  />
                )}
              </CardContent>
            </Card>

            {/* Upgrade nudge (free users) */}
            {!isPro && (
              <div
                onClick={() => setModalOpen(true)}
                className="flex items-center justify-between px-5 py-[0.85rem] rounded-[12px] cursor-pointer border border-[rgba(0,212,232,0.18)] bg-[linear-gradient(90deg,rgba(0,212,232,0.07),rgba(61,219,160,0.04))] transition-colors duration-200 hover:bg-[rgba(0,212,232,0.11)]"
              >
                <div className="flex items-center gap-2.5">
                  <Crown size={16} className="text-[var(--color-primary)]" />
                  <div>
                    <p className="text-[12px] font-bold text-[var(--color-on-surface)] mb-[1px]">
                      Unlock 30D and 1Y chart history
                    </p>
                    <p className="text-[11px] text-[var(--color-on-surface-variant)]">
                      Pro users get up to 1-year historical data, advanced indicators & sentiment analysis.
                    </p>
                  </div>
                </div>
                <button className="px-[14px] py-[5px] rounded-lg border-none cursor-pointer shrink-0 bg-gradient-to-r from-[#00d4e8] to-[#3ddba0] text-[#003340] font-extrabold text-[11px]">
                  UPGRADE
                </button>
              </div>
            )}

            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
              {STATS.map(({ label, value }) => (
                <Card key={label} className="p-md bg-surface-container-low border-outline-variant/30">
                  <p className="text-on-surface-variant font-label-caps text-[10px] mb-xs uppercase">{label}</p>
                  <p className="text-on-surface font-mono-data font-semibold text-lg">{value}</p>
                </Card>
              ))}
            </div>

            {/* Description */}
            <Card>
              <CardHeader className="py-md">
                <h3 className="font-h3 text-h3 flex items-center gap-2">
                  <Info size={18} className="text-primary-container" />
                  About {coin.name}
                </h3>
              </CardHeader>
              <CardContent>
                <div
                  className="text-body-md text-on-surface-variant leading-relaxed prose prose-invert max-w-none prose-sm"
                  dangerouslySetInnerHTML={{ __html: coin.description.en || 'No description available.' }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right sidebar */}
          <div className="col-span-12 lg:col-span-3 space-y-lg">
            <Card>
              <CardHeader className="py-md"><h3 className="font-h3 text-h3">Price History</h3></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'All Time High', price: coin.market_data.ath.usd,  pct: coin.market_data.ath_change_percentage.usd,  up: false },
                  { label: 'All Time Low',  price: coin.market_data.atl.usd,  pct: coin.market_data.atl_change_percentage.usd,  up: true  },
                ].map(({ label, price, pct, up }) => (
                  <div key={label} className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                    <span className="text-body-md text-on-surface-variant">{label}</span>
                    <div className="text-right">
                      <p className="font-mono-data font-bold text-on-surface">{formatCurrency(price)}</p>
                      <p className={`text-[10px] font-mono-data ${up ? 'text-secondary' : 'text-error'}`}>
                        {up ? '+' : ''}{pct?.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <span className="text-body-md text-on-surface-variant">24h Range</span>
                  <div className="text-right">
                    <p className="text-[10px] font-mono-data text-on-surface-variant">H: {formatCurrency(coin.market_data.high_24h.usd)}</p>
                    <p className="text-[10px] font-mono-data text-on-surface-variant">L: {formatCurrency(coin.market_data.low_24h.usd)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="py-md"><h3 className="font-h3 text-h3">Resources</h3></CardHeader>
              <CardContent className="space-y-3">
                {coin.links.homepage[0] && (
                  <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-md p-lg bg-surface-container-highest/30 rounded-lg hover:bg-surface-container-highest transition-colors group">
                    <Globe size={18} className="text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold">Official Website</span>
                  </a>
                )}
                {coin.links.twitter_screen_name && (
                  <a href={`https://twitter.com/${coin.links.twitter_screen_name}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-md p-lg bg-surface-container-highest/30 rounded-lg hover:bg-surface-container-highest transition-colors group">
                    <ExternalLink size={18} className="text-primary-container group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold">X (Twitter)</span>
                  </a>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <UpgradeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        featureLabel="Extended Chart History (30D / 1Y)"
      />
    </>
  );
};

export default CoinDetail;