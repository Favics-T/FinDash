import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, TrendingUp, TrendingDown, Star, Activity, Info, Globe, ExternalLink, ArrowRight, Lock, Crown } from 'lucide-react';
import useCryptoStore from '../store/useCryptoStore';
import { getCoinDetail, getCoinMarketChart } from '../service/cryptoAPI';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import PriceChart from '../components/charts/PriceChart';
import { formatCurrency, formatCompactNumber } from '../hooks/utils';
import Loader from '../components/ui/Loader';
import { useWatchlist } from '../hooks/useWatchlist';
import { useSubscription } from '../hooks/useSubscription';
import { ProBadge } from '../components/subscription/ProGate';
import { UpgradeModal } from '../components/subscription/UpgradeModal';

// Time ranges and their required days
const TIME_RANGES = [
  { label: '24H', days: 1,   pro: false },
  { label: '7D',  days: 7,   pro: false },
  { label: '30D', days: 30,  pro: true  },
  { label: '1Y',  days: 365, pro: true  },
];

const CoinDetail = () => {
  const { id } = useParams();
  const coinId = id || 'bitcoin';

  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeRange, setActiveRange] = useState('7D');
  const [chartLoading, setChartLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { watchlist } = useCryptoStore();
  const { toggleWatchlist } = useWatchlist(coinId);
  const { isPro } = useSubscription();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [detail, chart] = await Promise.all([
          getCoinDetail(coinId),
          getCoinMarketChart(coinId, 7)
        ]);
        setCoin(detail);
        setChartData(chart);
      } catch (err) {
        setError(err.message || 'Failed to fetch coin details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [coinId]);

  const handleRangeChange = async (range) => {
    if (range.pro && !isPro) {
      setModalOpen(true);
      return;
    }
    setActiveRange(range.label);
    setChartLoading(true);
    try {
      const chart = await getCoinMarketChart(coinId, range.days);
      setChartData(chart);
    } catch (e) {
      // silently ignore
    } finally {
      setChartLoading(false);
    }
  };

  if (loading) return <Loader className="mt-xl" size="lg" />;
  if (error) return <div className="text-error p-xl">{error}</div>;
  if (!coin) return null;

  const isUp = coin.market_data.price_change_percentage_24h > 0;

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
            {/* Main Chart Card */}
            <Card className="h-125 flex flex-col">
              <CardHeader className="flex justify-between items-center py-md bg-surface-container-high/30">
                <div className="flex items-center gap-sm">
                  <Activity size={18} className="text-primary-container" />
                  <h3 className="font-h3 text-h3">Price Chart ({activeRange})</h3>
                </div>

                {/* Time range selector */}
                <div className="flex gap-unit">
                  {TIME_RANGES.map(range => {
                    const isLocked = range.pro && !isPro;
                    return (
                      <button
                        key={range.label}
                        onClick={() => handleRangeChange(range)}
                        style={{ position: 'relative' }}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition-colors flex items-center gap-1 ${
                          activeRange === range.label
                            ? 'bg-secondary text-on-secondary'
                            : isLocked
                              ? 'text-on-surface-variant/40 cursor-pointer hover:text-on-surface-variant'
                              : 'text-on-surface-variant hover:text-on-surface transition-colors'
                        }`}
                      >
                        {range.label}
                        {isLocked && <Lock size={8} style={{ opacity: 0.6 }} />}
                      </button>
                    );
                  })}
                </div>
              </CardHeader>

              <CardContent className="flex-1 relative">
                {chartLoading && (
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 2,
                    background: 'rgba(9,9,11,0.5)',
                  }}>
                    <Loader size="sm" />
                  </div>
                )}
                {chartData && (
                  <PriceChart
                    data={chartData.prices.map(p => p[1])}
                    labels={chartData.prices.map(p => new Date(p[0]).toLocaleDateString())}
                    color={isUp ? '#4edea3' : '#ffb4ab'}
                  />
                )}
              </CardContent>
            </Card>

            {/* Pro-only: Extended analytics nudge for free users */}
            {!isPro && (
              <div
                onClick={() => setModalOpen(true)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.85rem 1.25rem', borderRadius: 12, cursor: 'pointer',
                  background: 'linear-gradient(90deg, rgba(0,212,232,0.07), rgba(61,219,160,0.04))',
                  border: '1px solid rgba(0,212,232,0.18)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,232,0.11)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(90deg, rgba(0,212,232,0.07), rgba(61,219,160,0.04))'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Crown size={16} color="var(--color-primary)" />
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: 1 }}>
                      Unlock 30D and 1Y chart history
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--color-on-surface-variant)' }}>
                      Pro users get up to 1-year historical data, advanced indicators & sentiment analysis.
                    </p>
                  </div>
                </div>
                <button style={{
                  padding: '5px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(90deg, #00d4e8, #3ddba0)',
                  color: '#003340', fontWeight: 800, fontSize: 11, flexShrink: 0,
                }}>
                  UPGRADE
                </button>
              </div>
            )}

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
              <Card className="p-md bg-surface-container-low border-outline-variant/30">
                <p className="text-on-surface-variant font-label-caps text-[10px] mb-xs uppercase">Market Cap</p>
                <p className="text-on-surface font-mono-data font-semibold text-lg">{formatCurrency(coin.market_data.market_cap.usd)}</p>
              </Card>
              <Card className="p-md bg-surface-container-low border-outline-variant/30">
                <p className="text-on-surface-variant font-label-caps text-[10px] mb-xs uppercase">24h Vol</p>
                <p className="text-on-surface font-mono-data font-semibold text-lg">{formatCurrency(coin.market_data.total_volume.usd)}</p>
              </Card>
              <Card className="p-md bg-surface-container-low border-outline-variant/30">
                <p className="text-on-surface-variant font-label-caps text-[10px] mb-xs uppercase">Circ. Supply</p>
                <p className="text-on-surface font-mono-data font-semibold text-lg">{formatCompactNumber(coin.market_data.circulating_supply)}</p>
              </Card>
              <Card className="p-md bg-surface-container-low border-outline-variant/30">
                <p className="text-on-surface-variant font-label-caps text-[10px] mb-xs uppercase">Total Supply</p>
                <p className="text-on-surface font-mono-data font-semibold text-lg">{formatCompactNumber(coin.market_data.total_supply || 0)}</p>
              </Card>
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
              <CardHeader className="py-md">
                <h3 className="font-h3 text-h3">Price History</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                  <span className="text-body-md text-on-surface-variant">All Time High</span>
                  <div className="text-right">
                    <p className="font-mono-data font-bold text-on-surface">{formatCurrency(coin.market_data.ath.usd)}</p>
                    <p className="text-[10px] text-error font-mono-data">{coin.market_data.ath_change_percentage.usd?.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                  <span className="text-body-md text-on-surface-variant">All Time Low</span>
                  <div className="text-right">
                    <p className="font-mono-data font-bold text-on-surface">{formatCurrency(coin.market_data.atl.usd)}</p>
                    <p className="text-[10px] text-secondary font-mono-data">+{coin.market_data.atl_change_percentage.usd?.toFixed(1)}%</p>
                  </div>
                </div>
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
              <CardHeader className="py-md">
                <h3 className="font-h3 text-h3">Resources</h3>
              </CardHeader>
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

      <UpgradeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} featureLabel="Extended Chart History (30D / 1Y)" />
    </>
  );
};

export default CoinDetail;
