import React, { useState } from 'react';
import useCryptoStore from '../store/useCryptoStore';
import { Card } from '../components/ui/Card';
import { Star, TrendingUp, TrendingDown, Trash2, ArrowRight, Crown, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatCompactNumber } from '../hooks/utils';
import Button from '../components/ui/Button';
import { useSubscription } from '../hooks/useSubscription';
import { ProBadge } from '../components/subscription/ProGate';
import { UpgradeModal } from '../components/subscription/UpgradeModal';
import { FREE_LIMITS } from '../constants/plans';

const Watchlist = () => {
  const { coins, watchlist, removeFromWatchlist } = useCryptoStore();
  const { isPro, canAddToWatchlist } = useSubscription();
  const [modalOpen, setModalOpen] = useState(false);

  const watchlistCoins = coins.filter(c => watchlist.includes(c.id));

  // Free users are capped at 5 — show remaining capacity
  const limit = isPro ? Infinity : FREE_LIMITS.watchlistMax;
  const used = watchlistCoins.length;
  const remaining = isPro ? null : Math.max(0, limit - used);
  const atLimit = !isPro && used >= limit;

  return (
    <>
      <div className="space-y-lg animate-in fade-in duration-500">

        {/* Header */}
        <div className="flex justify-between items-end mb-xl">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <h2 className="font-h1 text-3xl font-bold text-on-surface tracking-tight">My Alpha Watchlist</h2>
              {isPro && <ProBadge />}
            </div>
            <div className="flex gap-md text-body-md text-on-surface-variant">
              <div className="flex items-center gap-xs">
                <span className="text-secondary font-mono-data font-bold">{used}</span>
                <span>Assets Tracked</span>
              </div>
              <span className="text-outline-variant">|</span>
              {isPro ? (
                <div className="flex items-center gap-xs">
                  <Crown size={12} color="var(--color-primary)" />
                  <span className="text-primary font-bold" style={{ fontSize: 12 }}>Unlimited capacity</span>
                </div>
              ) : (
                <div className="flex items-center gap-xs">
                  <span
                    className={`font-mono-data font-bold ${atLimit ? 'text-error' : 'text-on-surface-variant'}`}
                    style={{ fontSize: 12 }}
                  >
                    {remaining}/{limit} slots remaining
                  </span>
                  {atLimit && (
                    <button
                      onClick={() => setModalOpen(true)}
                      style={{
                        fontSize: 10, color: 'var(--color-primary)', fontWeight: 700,
                        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      }}
                    >
                      · Upgrade for unlimited →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <Link to="/markets">
            <Button className="gap-2">Add Asset <ArrowRight size={18} /></Button>
          </Link>
        </div>

        {/* Limit reached banner */}
        {atLimit && (
          <div
            onClick={() => setModalOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.85rem 1.25rem', borderRadius: 12, cursor: 'pointer',
              background: 'linear-gradient(90deg, rgba(0,212,232,0.08), rgba(61,219,160,0.05))',
              border: '1px solid rgba(0,212,232,0.2)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,232,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(90deg, rgba(0,212,232,0.08), rgba(61,219,160,0.05))'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Lock size={15} color="var(--color-primary)" />
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: 2 }}>
                  Watchlist limit reached ({FREE_LIMITS.watchlistMax} of {FREE_LIMITS.watchlistMax})
                </p>
                <p style={{ fontSize: 11, color: 'var(--color-on-surface-variant)' }}>
                  Upgrade to Pro for unlimited watchlist slots.
                </p>
              </div>
            </div>
            <button style={{
              padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(90deg, #00d4e8, #3ddba0)',
              color: '#003340', fontWeight: 800, fontSize: 11, letterSpacing: '0.06em', flexShrink: 0,
            }}>
              UPGRADE NOW
            </button>
          </div>
        )}

        {watchlistCoins.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {watchlistCoins.map(coin => (
              <Card key={coin.id} className="group hover:border-primary-container/50 hover:shadow-lg hover:shadow-primary-container/5 transition-all duration-300">
                <div className="p-lg">
                  <div className="flex justify-between items-start mb-md">
                    <Link to={`/detail/${coin.id}`} className="flex items-center gap-md">
                      <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="font-h3 text-h3 text-on-surface">{coin.name}</h3>
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{coin.symbol}</p>
                      </div>
                    </Link>
                    <button
                      onClick={() => removeFromWatchlist(coin.id)}
                      className="p-1.5 hover:bg-error-container/20 hover:text-error text-on-surface-variant transition-colors rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="space-y-md">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-label-caps text-on-surface-variant mb-unit uppercase">Price</p>
                        <p className="text-xl font-mono-data font-bold text-on-surface">{formatCurrency(coin.current_price)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-label-caps text-on-surface-variant mb-unit uppercase">24H Change</p>
                        <p className={`font-mono-data font-bold ${coin.price_change_percentage_24h > 0 ? 'text-secondary' : 'text-error'}`}>
                          {coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
                        </p>
                      </div>
                    </div>

                    <div className="pt-md border-t border-outline-variant/10 flex justify-between gap-xl">
                      <div className="flex-1">
                        <p className="text-[10px] text-on-surface-variant font-label-caps mb-unit uppercase">Market Cap</p>
                        <p className="text-xs font-mono-data text-on-surface/80">{formatCompactNumber(coin.market_cap)}</p>
                      </div>
                      <div className="flex-1 text-right">
                        <p className="text-[10px] text-on-surface-variant font-label-caps mb-unit uppercase">Volume</p>
                        <p className="text-xs font-mono-data text-on-surface/80">{formatCompactNumber(coin.total_volume)}</p>
                      </div>
                    </div>
                  </div>

                  <Link to={`/detail/${coin.id}`}>
                    <Button variant="ghost" size="sm" className="w-full mt-lg gap-2 text-[10px]">
                      VIEW PERFORMANCE ARCHIVE
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}

            {/* Add more slot (free — locked after 5) */}
            {!isPro && (
              <div
                onClick={() => setModalOpen(true)}
                style={{
                  borderRadius: 14, border: '1.5px dashed rgba(0,212,232,0.2)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 10, padding: '2rem', cursor: 'pointer', minHeight: 220,
                  background: 'rgba(0,212,232,0.02)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,232,0.05)'; e.currentTarget.style.borderColor = 'rgba(0,212,232,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,212,232,0.02)'; e.currentTarget.style.borderColor = 'rgba(0,212,232,0.2)'; }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'linear-gradient(135deg, rgba(0,212,232,0.15), rgba(61,219,160,0.10))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(0,212,232,0.25)',
                }}>
                  <Crown size={20} color="var(--color-primary)" />
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-on-surface)', textAlign: 'center' }}>
                  Unlock unlimited slots
                </p>
                <p style={{ fontSize: 11, color: 'var(--color-on-surface-variant)', textAlign: 'center', lineHeight: 1.4 }}>
                  Pro members track as many assets as they want.
                </p>
                <ProBadge style={{ fontSize: 9, padding: '3px 10px' }} />
              </div>
            )}
          </div>
        ) : (
          <Card className="p-xl text-center flex flex-col items-center border-dashed border-2 bg-transparent">
            <Star className="text-on-surface-variant/20 mb-md" size={48} />
            <h2 className="font-h2 text-xl font-bold mb-xs">No assets tracked yet</h2>
            <p className="text-on-surface-variant mb-lg max-w-sm">
              Capture real-time market shifts by adding cryptocurrencies to your private intelligence feed.
            </p>
            <Link to="/markets"><Button>Explore Markets</Button></Link>
          </Card>
        )}
      </div>

      <UpgradeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} featureLabel="Unlimited Watchlist" />
    </>
  );
};

export default Watchlist;
