import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCryptoStore from '../store/useCryptoStore';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import {
  TrendingUp, TrendingDown, Activity, Zap, Star, ArrowRight,
  BarChart2, Sparkles, Brain, PieChart,
} from 'lucide-react';
import PriceChart from '../components/charts/PriceChart';
import { formatCurrency, formatCompactNumber } from '../hooks/utils';
import Loader from '../components/ui/Loader';
import { useSubscription } from '../hooks/useSubscription';
import { ProGate, ProBadge } from '../components/subscription/ProGate';

const Stat = ({ label, value, sub, subUp }) => (
  <div>
    <p className="text-label-caps text-on-surface-variant mb-[4px]">{label}</p>
    <p className="text-[15px] font-bold font-mono-data text-on-surface">{value}</p>
    {sub !== undefined && (
      <p className={`text-[10px] font-mono-data mt-0.5 ${subUp ? 'text-secondary' : 'text-error'}`}>
        {sub}
      </p>
    )}
  </div>
);

const AlphaItem = ({ tag, tagColor, time, text }) => (
  <div className="py-2.5 border-b border-outline-variant/20">
    <div className="flex justify-between mb-[4px]">
      <span className="text-label-caps" style={{ color: tagColor }}>{tag}</span>
      <span className="text-label-caps text-on-surface-variant font-mono-data">{time}</span>
    </div>
    <p className="text-body-md text-on-surface leading-normal">{text}</p>
  </div>
);

const MoverRow = ({ coin, isGainer }) => (
  <Link
    to={`/detail/${coin.id}`}
    className="flex items-center justify-between px-2.5 py-1.75 rounded-[10px] hover:bg-white/5 transition"
  >
    <div className="flex items-center gap-[8px]">
      <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-full" />
      <div>
        <p className="text-body-md font-bold text-on-surface">{coin.symbol?.toUpperCase()}</p>
        <p className="text-label-caps text-on-surface-variant">{coin.name}</p>
      </div>
    </div>
    <span className={`text-body-md font-bold font-mono-data ${isGainer ? 'text-secondary' : 'text-error'}`}>
      {coin.price_change_percentage_24h > 0 ? '+' : ''}
      {coin.price_change_percentage_24h?.toFixed(2)}%
    </span>
  </Link>
);

// ── Premium widget placeholders (shown blurred to free users) ─────────────────
const PortfolioWidget = () => (
  <div style={{ padding: '1rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
      {[['BTC', 45], ['ETH', 28], ['SOL', 15], ['Other', 12]].map(([name, pct]) => (
        <div key={name} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>{pct}%</div>
          <div style={{ fontSize: 10, color: 'var(--color-on-surface-variant)', marginTop: 2 }}>{name}</div>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', height: 8, borderRadius: 99, overflow: 'hidden', gap: 2 }}>
      {[['#00d4e8', 45], ['#3ddba0', 28], ['#f59e0b', 15], ['#8888a0', 12]].map(([c, w]) => (
        <div key={c} style={{ height: '100%', width: `${w}%`, background: c, borderRadius: 99 }} />
      ))}
    </div>
    <div style={{ marginTop: 10, fontSize: 11, color: 'var(--color-on-surface-variant)' }}>
      Total Portfolio Value: <strong style={{ color: 'var(--color-on-surface)' }}>$124,340.00</strong>
    </div>
  </div>
);

const SentimentWidget = () => (
  <div style={{ padding: '0.75rem 1rem' }}>
    {[
      { label: 'BTC', score: 82, color: '#3ddba0' },
      { label: 'ETH', score: 68, color: '#00d4e8' },
      { label: 'SOL', score: 54, color: '#f59e0b' },
    ].map(({ label, score, color }) => (
      <div key={label} style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
          <span style={{ fontSize: 11, fontWeight: 700 }}>{label}</span>
          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color }}>{score} / 100</span>
        </div>
        <div style={{ height: 4, background: 'rgba(42,42,56,0.8)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${score}%`, background: color, borderRadius: 99 }} />
        </div>
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const { coins, globalData, loading, error, watchlist } = useCryptoStore();
  const { isPro, canAccess } = useSubscription();

  // Free users only see 7D chart — time range gating
  const allowedRanges = isPro ? ['1D', '7D', '30D', '1Y'] : ['7D'];
  const [activeRange, setActiveRange] = useState('7D');

  if (loading && coins.length === 0) return <Loader size="lg" className="mt-20" />;
  if (error && coins.length === 0) return <div className="text-error text-center p-8">{error}</div>;

  const btc = coins.find((c) => c.id === 'bitcoin') || coins[0];
  const topGainers = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 3);
  const watchlistCoins = coins.filter((c) => watchlist.includes(c.id));
  const isUp = btc?.price_change_percentage_24h > 0;
  const marketStatus = globalData?.market_cap_change_percentage_24h_usd > 0 ? 'BULLISH' : 'BEARISH';

  return (
    <div className="flex flex-col gap-lg max-w-400 mx-auto">

      {/* ── Market status bar ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between bg-surface-container border border-outline-variant/30 rounded-[14px] px-5 py-3">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="relative w-2.5 h-2.5">
              <span className="absolute inset-0 rounded-full animate-ping bg-secondary" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-secondary" />
            </span>
            <span className="text-label-caps">MARKET STATUS</span>
            <span className={`text-body-lg font-bold ${marketStatus === 'BULLISH' ? 'text-secondary' : 'text-error'}`}>
              {marketStatus}
            </span>
          </div>

          <div className="w-px h-7 bg-outline-variant" />

          <div className="flex gap-6">
            {[
              { l: 'FEAR & GREED', v: '78', s: 'Greed' },
              { l: 'BTC DOMINANCE', v: `${globalData?.market_cap_percentage?.btc?.toFixed(1) ?? '--'}%` },
              { l: '24H VOLUME', v: formatCompactNumber(globalData?.total_volume?.usd || 0) },
            ].map(({ l, v, s }) => (
              <div key={l}>
                <p className="text-label-caps">{l}</p>
                <p className="text-body-md font-bold font-mono-data text-on-surface">
                  {v}{' '}
                  {s && <span className="text-secondary text-label-caps ml-1">{s}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-on-surface-variant text-body-md">Global Cap:</span>
          <span className="font-mono-data font-bold text-on-surface">
            {formatCompactNumber(globalData?.total_market_cap?.usd || 0)}
          </span>
          <TrendingUp size={16} className="text-secondary" />
        </div>
      </div>

      {/* ── Main grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-[1fr_2.2fr_1fr] gap-lg">

        {/* LEFT column */}
        <div className="flex flex-col gap-md">

          {/* Alpha Feed (free) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-primary" />
                <span className="font-bold">Alpha Feed</span>
              </div>
              <Badge variant="primary">LIVE</Badge>
            </CardHeader>
            <CardContent className="px-5">
              <AlphaItem tag="Whale Alert" tagColor="var(--color-primary)" time="2m ago" text="5,000 BTC moved from exchange to cold storage." />
            </CardContent>
          </Card>

          {/* Volatility Scan (free) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-primary" />
                <span className="font-bold">Volatility Scan</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-body-md text-on-surface-variant mb-3">High liquidation clusters detected.</p>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-label-caps">SYSTEM CONFIDENCE</span>
                  <span className="text-primary text-label-caps">88%</span>
                </div>
                <div className="h-1 bg-outline-variant rounded-full overflow-hidden">
                  <div className="h-full w-[88%] bg-linear-to-r from-primary to-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights (Pro gate) */}
          <ProGate featureKey="sentimentAnalysis" featureLabel="Sentiment Analysis">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain size={16} className="text-primary" />
                  <span className="font-bold">AI Sentiment</span>
                </div>
                <ProBadge />
              </CardHeader>
              <CardContent>
                <SentimentWidget />
              </CardContent>
            </Card>
          </ProGate>
        </div>

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