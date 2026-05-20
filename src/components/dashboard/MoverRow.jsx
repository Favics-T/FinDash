import React from 'react'
import { Link } from 'react-router-dom';

const MoverRow = ({ coin, isGainer }) =>{
 return   (
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
}
export default MoverRow
