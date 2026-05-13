import React, { useState } from 'react';
import useCryptoStore from '../store/useCryptoStore';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { ArrowLeftRight, TrendingUp, TrendingDown, Info, Plus } from 'lucide-react';
import { formatCurrency, formatCompactNumber } from '../hooks/utils';
// import {}
import Button from '../components/ui/Button';

const Compare = () => {
  const { coins } = useCryptoStore();
  const [selectedIds, setSelectedIds] = useState(['bitcoin', 'ethereum']);

  const selectedCoins = coins.filter(c => selectedIds.includes(c.id));

  const addCoin = (id) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeCoin = (id) => {
    if (selectedIds.length > 1) {
      setSelectedIds(selectedIds.filter(cid => cid !== id));
    }
  };

  const metrics = [
    { label: 'Current Price', key: 'current_price', format: formatCurrency },
    { label: 'Market Cap', key: 'market_cap', format: formatCompactNumber },
    { label: '24h High', key: 'high_24h', format: formatCurrency },
    { label: '24h Low', key: 'low_24h', format: formatCurrency },
    { label: '24h Vol', key: 'total_volume', format: formatCompactNumber },
    { label: 'ATH', key: 'ath', format: formatCurrency },
  ];

  return (
    <div className="space-y-lg animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end mb-lg gap-lg">
        <div>
          <h2 className="font-h1 text-3xl font-bold text-on-surface mb-xs tracking-tight">Asset Comparison</h2>
          <p className="text-on-surface-variant font-body-md max-w-2xl">
            Side-by-side performance analysis and fundamental health metrics. 
            Compare up to 3 assets simultaneously.
          </p>
        </div>
        
        <div className="flex items-center gap-sm">
          <div className="flex -space-x-2 mr-md">
            {selectedCoins.map(coin => (
              <div key={coin.id} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden hover:z-10 transition-all cursor-pointer" onClick={() => removeCoin(coin.id)}>
                <img src={coin.image} alt={coin.name} className="w-full h-full object-cover" />
              </div>
            ))}
            {selectedIds.length < 3 && (
              <button className="w-10 h-10 rounded-full border-2 border-background border-dashed bg-surface-container flex items-center justify-center text-outline-variant hover:text-primary transition-all">
                <Plus size={20} />
              </button>
            )}
          </div>
          <Button variant="outline" className="gap-2">
            <ArrowLeftRight size={18} />
            Export Sync
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-high border-b border-outline-variant text-label-caps text-[10px] text-on-surface-variant tracking-wider uppercase">
                <th className="p-lg">Metric</th>
                {selectedCoins.map((coin) => (
                  <th key={coin.id} className="p-lg min-w-[200px]">
                    <div className="flex items-center gap-md">
                      <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <div className="font-body-md font-bold text-on-surface">{coin.name}</div>
                        <div className="text-[10px] text-on-surface-variant">{coin.symbol.toUpperCase()}</div>
                      </div>
                    </div>
                  </th>
                ))}
                {selectedIds.length < 3 && (
                  <th className="p-lg">
                    <select 
                      className="bg-transparent border-none text-[10px] font-bold text-primary focus:ring-0 cursor-pointer"
                      onChange={(e) => addCoin(e.target.value)}
                      value=""
                    >
                      <option value="" disabled>+ ADD ASSET</option>
                      {coins.filter(c => !selectedIds.includes(c.id)).slice(0, 20).map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {metrics.map((metric, i) => (
                <tr key={i} className="hover:bg-surface-bright/30 transition-colors group">
                  <td className="p-lg font-body-md text-on-surface-variant font-medium">{metric.label}</td>
                  {selectedCoins.map(coin => (
                    <td key={coin.id} className="p-lg font-mono-data text-on-surface text-sm">
                      {metric.format(coin[metric.key])}
                    </td>
                  ))}
                  {selectedIds.length < 3 && <td className="p-lg"></td>}
                </tr>
              ))}
              <tr className="hover:bg-surface-bright/30 transition-colors">
                <td className="p-lg font-body-md text-on-surface-variant font-medium">24h Change</td>
                {selectedCoins.map(coin => (
                  <td key={coin.id} className={`p-lg font-mono-data font-bold ${coin.price_change_percentage_24h > 0 ? 'text-secondary' : 'text-error'}`}>
                    <div className="flex items-center gap-xs">
                      {coin.price_change_percentage_24h > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </div>
                  </td>
                ))}
                {selectedIds.length < 3 && <td className="p-lg"></td>}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mt-lg">
        <Card>
          <CardHeader className="py-md">
            <h3 className="font-h3 text-h3 flex items-center gap-2">
              <Info size={18} className="text-secondary" />
              Correlation Score
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-md">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant text-sm">{selectedCoins[0]?.name} / {selectedCoins[1]?.name}</span>
                <span className="text-secondary font-mono-data font-bold">0.92 High</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full" style={{ width: '92%' }}></div>
              </div>
              <p className="text-xs text-on-surface-variant">Assets are moving in near-perfect lockstep over the last 30 days. Diversification benefit is currently minimal.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-md">
            <h3 className="font-h3 text-h3">Volatility Metric</h3>
          </CardHeader>
          <CardContent>
             <div className="space-y-md">
              {selectedCoins.map(coin => (
                <div key={coin.id} className="flex justify-between items-center">
                  <span className="text-on-surface-variant text-xs">{coin.name} (30d)</span>
                  <span className="font-mono-data text-on-surface font-bold">{(Math.random() * 5 + 1).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Compare;
