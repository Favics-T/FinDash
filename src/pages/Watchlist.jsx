import React from 'react';
import useCryptoStore from '../store/useCryptoStore';
import { Card } from '../components/ui/Card';
import { Star, TrendingUp, TrendingDown, LayoutGrid, List as ListIcon, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatCompactNumber } from '../hooks/utils';
import Button from '../components/ui/Button';

const Watchlist = () => {
  const { coins, watchlist, removeFromWatchlist } = useCryptoStore();
  const watchlistCoins = coins.filter(c => watchlist.includes(c.id));

  return (
    <div className="space-y-lg animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-xl">
        <div>
          <h2 className="font-h1 text-3xl font-bold text-on-surface mb-xs tracking-tight">My Alpha Watchlist</h2>
          <div className="flex gap-md text-body-md text-on-surface-variant">
            <div className="flex items-center gap-xs">
              <span className="text-secondary font-mono-data font-bold">{watchlistCoins.length}</span>
              <span>Assets Tracked</span>
            </div>
            <span className="text-outline-variant">|</span>
            <div className="flex items-center gap-xs">
              <span className="text-primary-container font-mono-data font-bold">Institutional Mode</span>
            </div>
          </div>
        </div>
        <Link to="/markets">
          <Button className="gap-2">
            Add Asset
            <ArrowRight size={18} />
          </Button>
        </Link>
      </div>

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
                    {/* <Activity size={14} /> */}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-xl text-center flex flex-col items-center border-dashed border-2 bg-transparent">
          <Star className="text-on-surface-variant/20 mb-md" size={48} />
          <h2 className="font-h2 text-xl font-bold mb-xs">No assets tracked yet</h2>
          <p className="text-on-surface-variant mb-lg max-w-sm">Capture real-time market shifts by adding cryptocurrencies to your private intelligence feed.</p>
          <Link to="/markets">
            <Button>Explore Markets</Button>
          </Link>
        </Card>
      )}
    </div>
  );
};

export default Watchlist;
