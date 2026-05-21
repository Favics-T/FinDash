import { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon, TrendingUp, TrendingDown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCryptoStore from '../../../store/useCryptoStore';
import { formatCurrency } from '../../../utility/utils';

const Search = () => {
  const [query,   setQuery]   = useState('');
  const [open,    setOpen]    = useState(false);
  const [focused, setFocused] = useState(false);

  const inputRef    = useRef(null);
  const dropdownRef = useRef(null);
  const navigate    = useNavigate();
  const { coins }   = useCryptoStore();

  const results = query.trim().length > 0
    ? coins.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.symbol.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : coins.slice(0, 6);

  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        inputRef.current   && !inputRef.current.contains(e.target)
      ) { setOpen(false); setFocused(false); }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (coinId) => {
    navigate(`/detail/${coinId}`);
    setQuery(''); setOpen(false); setFocused(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') { setOpen(false); setQuery(''); inputRef.current?.blur(); }
  };

  return (
    <div className="relative">

      {/* Input */}
      <div className="relative">
        <SearchIcon
          size={14}
          className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200
            ${focused ? 'text-primary' : 'text-on-surface-variant'}`}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search assets, coins…"
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => { setFocused(true); setOpen(true); }}
          onKeyDown={handleKeyDown}
          className={`rounded-[10px] border pl-9 py-[7px] text-[13px] outline-none
            transition-all duration-200
            text-on-surface
            placeholder:text-on-surface-variant
            ${query ? 'pr-9' : 'pr-3.5'}
            ${focused
              ? 'w-[340px] border-primary bg-[rgba(0,212,232,0.04)] shadow-[0_0_0_3px_rgba(0,212,232,0.1)]'
              : 'w-[260px] border-outline-variant bg-surface-container'
            }`}
        />
        {query && (
          <button
            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
            className="absolute right-[10px] top-1/2 -translate-y-1/2
              flex cursor-pointer border-none bg-transparent p-[2px]
              text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && coins.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute left-0 top-[calc(100%+8px)] z-[1000] min-w-[340px] overflow-hidden
            rounded-xl border border-outline-variant
            bg-surface-container-high
            shadow-[0_20px_60px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,212,232,0.06)]
            animate-[fadeIn_0.15s_ease_both]"
        >
          {/* Label */}
          <div className="border-b border-outline-variant px-[14px] pt-2 pb-[6px]
            text-[9px] font-bold tracking-[0.14em] text-on-surface-variant"
          >
            {query ? `RESULTS FOR "${query.toUpperCase()}"` : 'TOP ASSETS'}
          </div>

          {results.length === 0 ? (
            <div className="px-[14px] py-4 text-center text-[13px] text-on-surface-variant">
              No assets found for "{query}"
            </div>
          ) : (
            results.map((coin) => {
              const up = coin.price_change_percentage_24h > 0;
              return (
                <div
                  key={coin.id}
                  onClick={() => handleSelect(coin.id)}
                  className="flex cursor-pointer items-center justify-between px-[14px] py-[9px]
                    transition-colors duration-100
                    hover:bg-surface-container-highest"
                >
                  <div className="flex items-center gap-[10px]">
                    <img src={coin.image} alt={coin.name} className="h-7 w-7 shrink-0 rounded-full" />
                    <div>
                      <p className="text-[13px] font-semibold leading-[1.2] text-on-surface">
                        {coin.name}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.06em] text-on-surface-variant">
                        {coin.symbol} · #{coin.market_cap_rank}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-mono text-[13px] font-bold text-on-surface">
                      {formatCurrency(coin.current_price)}
                    </p>
                    <p className={`flex items-center justify-end gap-[2px] font-mono text-[10px] font-semibold
                      ${up ? 'text-secondary' : 'text-error'}`}
                    >
                      {up ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                      {up ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
                    </p>
                  </div>
                </div>
              );
            })
          )}

          {/* Footer hints */}
          <div className="flex gap-3 border-t border-outline-variant px-[14px] py-[6px]
            text-[9px] text-on-surface-variant"
          >
            <span><kbd className="font-mono text-[9px]">↵</kbd> to select</span>
            <span><kbd className="font-mono text-[9px]">Esc</kbd> to close</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;