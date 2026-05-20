import React from 'react'
import useCryptoStore from '../../store/useCryptoStore';
import {formatCompactNumber } from '../../hooks/utils';
import { TrendingUp } from 'lucide-react'


function MarketStatus() {
    
    const { globalData } = useCryptoStore();
    const marketStatus = globalData?.market_cap_change_percentage_24h_usd > 0 ? 'BULLISH' : 'BEARISH';
    

  return (
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
  )
}

export default MarketStatus
