import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useCryptoStore from '../store/useCryptoStore';
import { Card } from '../components/ui/Card';
import { ArrowUpDown, Star, TrendingUp, TrendingDown, Search, Lock, Download } from 'lucide-react';
import { formatCurrency, formatCompactNumber } from '../hooks/utils';
import Loader from '../components/ui/Loader';
import { useSubscription } from '../hooks/useSubscription';
import { ProBadge } from '../components/subscription/ProGate';
import { UpgradeModal } from '../components/subscription/UpgradeModal';

const TH = ({ children, onClick, right }) => (
  <th
    onClick={onClick}
    className={`
      px-3.5 py-2.5
      text-[9px] font-bold tracking-[0.14em] uppercase
      text-on-surface-variant
      whitespace-nowrap select-none
      transition-colors duration-150
      ${onClick ? 'cursor-pointer hover:text-(--color-on-surface)' : ''}
      ${right ? 'text-right' : 'text-left'}
    `}
  >
    <span className="inline-flex items-center gap-1">
      {children} {onClick && <ArrowUpDown size={9} />}
    </span>
  </th>
);

const Markets = () => {
  const { coins, loading, error, watchlist, addToWatchlist, removeFromWatchlist } = useCryptoStore();
  const { isPro, visibleCoinCount } = useSubscription();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'market_cap_rank', direction: 'asc' });
  const [modalOpen, setModalOpen] = useState(false);

  const filteredAndSortedCoins = useMemo(() => {
    let result = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      result.sort((a, b) => {
        const av = a[sortConfig.key];
        const bv = b[sortConfig.key];
        if (av < bv) return sortConfig.direction === 'asc' ? -1 : 1;
        if (av > bv) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [coins, searchTerm, sortConfig]);

  // Free users see top 20, rest are locked preview rows
  const visibleCoins = filteredAndSortedCoins.slice(0, visibleCoinCount);
  const lockedCoins = !isPro ? filteredAndSortedCoins.slice(visibleCoinCount, visibleCoinCount + 5) : [];

  const handleSort = (key) =>
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));

  const toggleWatchlist = (e, coinId) => {
    e.stopPropagation();
    watchlist.includes(coinId) ? removeFromWatchlist(coinId) : addToWatchlist(coinId);
  };

  if (loading && coins.length === 0) return <Loader size="lg" style={{ marginTop: '5rem' }} />;
  if (error && coins.length === 0) return <div className="text-error p-8">{error}</div>;

  return (
    <>
      <div className="flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-extrabold text-(--color-on-surface) leading-tight mb-1.5">
              Market Overview
            </h1>
            <p className="text-[13px] text-on-surface-variant max-w-130">
              Real-time price action across{' '}
              <strong style={{ color: 'var(--color-primary)' }}>
                {isPro ? coins.length : Math.min(coins.length, visibleCoinCount)}
              </strong>{' '}
              {!isPro && (
                <span>
                  of {coins.length}{' '}
                  <button
                    onClick={() => setModalOpen(true)}
                    style={{ color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                  >
                    (unlock full market ↗)
                  </button>
                </span>
              )}{' '}
              active digital assets.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Export button — Pro only */}
            <button
              onClick={() => !isPro && setModalOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: isPro ? 'rgba(0,212,232,0.1)' : 'rgba(20,20,25,0.8)',
                color: isPro ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                border: `1px solid ${isPro ? 'rgba(0,212,232,0.2)' : 'rgba(42,42,56,0.8)'}`,
                fontSize: 12, fontWeight: 700, transition: 'all 0.15s',
                opacity: isPro ? 1 : 0.65,
              }}
            >
              <Download size={14} />
              Export
              {!isPro && <ProBadge style={{ fontSize: 7, padding: '1px 5px' }} />}
            </button>

            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search coin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-60 pl-9 pr-3 py-2 text-[13px] text-[var(--color-on-surface)] bg-[var(--color-surface-container)] border border-[rgba(42,42,56,0.9)] rounded-[10px] outline-none transition-colors duration-200 focus:border-[var(--color-primary)]"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="bg-[rgba(255,255,255,0.02)] border-b border-[rgba(42,42,56,0.6)]">
                <TH onClick={() => handleSort('market_cap_rank')}>#</TH>
                <TH onClick={() => handleSort('name')}>Name</TH>
                <TH onClick={() => handleSort('current_price')} right>Price</TH>
                <TH onClick={() => handleSort('price_change_percentage_24h')} right>24H Change</TH>
                <TH onClick={() => handleSort('market_cap')} right>Market Cap</TH>
                <TH onClick={() => handleSort('total_volume')} right>Volume (24H)</TH>
                <TH right>7D Chart</TH>
                <TH />
              </tr>
            </thead>

            <tbody>
              {/* ── Visible coins ── */}
              {visibleCoins.map((coin, idx) => {
                const up = coin.price_change_percentage_24h > 0;
                return (
                  <tr
                    key={coin.id}
                    onClick={() => navigate(`/detail/${coin.id}`)}
                    className="cursor-pointer border-b border-[rgba(42,42,56,0.35)] transition-colors duration-150 hover:bg-[rgba(255,255,255,0.025)] animate-fadeIn"
                    style={{ animationDelay: `${idx * 18}ms` }}
                  >
                    <td className="px-3.5 py-3 text-xs text-[var(--color-on-surface-variant)] w-[40px]">{coin.market_cap_rank}</td>
                    <td className="px-[14px] py-3">
                      <div className="flex items-center gap-2.5">
                        <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="text-[13px] font-semibold text-[var(--color-on-surface)]">{coin.name}</p>
                          <p className="text-[10px] text-[var(--color-on-surface-variant)] uppercase tracking-widest">{coin.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-[14px] py-3 text-right font-mono text-[13px] font-semibold text-[var(--color-on-surface)]">{formatCurrency(coin.current_price)}</td>
                    <td className="px-[14px] py-3 text-right">
                      <span className={`inline-flex items-center gap-1 font-mono text-[12px] font-bold px-2 py-[3px] rounded-md ${up ? 'text-[var(--color-secondary)] bg-[rgba(61,219,160,0.08)]' : 'text-[var(--color-error)] bg-[rgba(255,107,107,0.08)]'}`}>
                        {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {up ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-[14px] py-3 text-right font-mono text-[12px] text-[rgba(228,228,231,0.7)]">{formatCompactNumber(coin.market_cap)}</td>
                    <td className="px-[14px] py-3 text-right font-mono text-[12px] text-[rgba(228,228,231,0.7)]">{formatCompactNumber(coin.total_volume)}</td>
                    <td className="px-[14px] py-3 w-[80px]">
                      {coin.sparkline_in_7d?.price && (
                        <svg width="80" height="32" viewBox="0 0 80 32">
                          {(() => {
                            const prices = coin.sparkline_in_7d.price;
                            const min = Math.min(...prices);
                            const max = Math.max(...prices);
                            const pts = prices.map((p, i) => {
                              const x = (i / (prices.length - 1)) * 80;
                              const y = 32 - ((p - min) / (max - min || 1)) * 28 - 2;
                              return `${x},${y}`;
                            }).join(' ');
                            return <polyline points={pts} fill="none" stroke={up ? '#3ddba0' : '#ff6b6b'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />;
                          })()}
                        </svg>
                      )}
                    </td>
                    <td className="px-[14px] py-3 text-right">
                      <button
                        onClick={(e) => toggleWatchlist(e, coin.id)}
                        className={`p-1 rounded-md transition-colors ${watchlist.includes(coin.id) ? 'text-[var(--color-secondary)]' : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]'}`}
                      >
                        <Star size={16} fill={watchlist.includes(coin.id) ? 'currentColor' : 'none'} />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {/* ── Locked preview rows (free users) ── */}
              {lockedCoins.map((coin) => (
                <tr
                  key={coin.id + '-locked'}
                  onClick={() => setModalOpen(true)}
                  style={{ cursor: 'pointer', filter: 'blur(3px)', opacity: 0.4, userSelect: 'none' }}
                  className="border-b border-[rgba(42,42,56,0.35)]"
                >
                  <td className="px-3.5 py-3 text-xs text-[var(--color-on-surface-variant)]">{coin.market_cap_rank}</td>
                  <td className="px-[14px] py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-surface-container" />
                      <div>
                        <p className="text-[13px] font-semibold text-[var(--color-on-surface)]">{coin.name}</p>
                        <p className="text-[10px] text-[var(--color-on-surface-variant)] uppercase tracking-widest">{coin.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-[14px] py-3 text-right font-mono text-[13px]">████████</td>
                  <td className="px-[14px] py-3 text-right font-mono text-[13px]">████</td>
                  <td className="px-[14px] py-3 text-right font-mono text-[12px]">████████</td>
                  <td className="px-[14px] py-3 text-right font-mono text-[12px]">████████</td>
                  <td className="px-[14px] py-3" />
                  <td className="px-[14px] py-3" />
                </tr>
              ))}
            </tbody>
          </table>

          {/* ── Upgrade CTA row (free users) ── */}
          {!isPro && filteredAndSortedCoins.length > visibleCoinCount && (
            <div
              onClick={() => setModalOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                padding: '1rem', cursor: 'pointer',
                background: 'linear-gradient(90deg, rgba(0,212,232,0.04) 0%, rgba(61,219,160,0.03) 100%)',
                borderTop: '1px solid rgba(0,212,232,0.12)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,232,0.07)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(90deg, rgba(0,212,232,0.04) 0%, rgba(61,219,160,0.03) 100%)'; }}
            >
              <Lock size={14} color="var(--color-primary)" />
              <span style={{ fontSize: 12, color: 'var(--color-on-surface)', fontWeight: 600 }}>
                {filteredAndSortedCoins.length - visibleCoinCount} more coins locked
              </span>
              <button style={{
                padding: '4px 14px', borderRadius: 7, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(90deg, #00d4e8, #3ddba0)',
                color: '#003340', fontWeight: 800, fontSize: 11, letterSpacing: '0.06em',
              }}>
                UNLOCK FULL MARKET
              </button>
            </div>
          )}
        </Card>
      </div>

      <UpgradeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} featureLabel="Full Market Access" />
    </>
  );
};

export default Markets;