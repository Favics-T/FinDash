import { Link } from 'react-router-dom';

/**
 * A single row in the Market Movers / Watchlist list.
 * Color is derived from the coin's own 24h change — `isGainer` is kept
 * only for future use (e.g. showing a directional icon).
 */
const MoverRow = ({ coin }) => {
  const isUp = coin.price_change_percentage_24h > 0;

  return (
    <Link
      to={`/detail/${coin.id}`}
      className="flex items-center justify-between px-2.5 py-[7px] rounded-[10px] transition-colors duration-100 hover:bg-white/5"
    >
      <div className="flex items-center gap-2">
        <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-full" />
        <div>
          <p className="text-body-md font-bold text-on-surface">{coin.symbol?.toUpperCase()}</p>
          <p className="text-label-caps text-on-surface-variant">{coin.name}</p>
        </div>
      </div>
      <span className={`text-body-md font-bold font-mono-data ${isUp ? 'text-secondary' : 'text-error'}`}>
        {isUp ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
      </span>
    </Link>
  );
};

export default MoverRow;