import React, { useState, useRef, useEffect } from 'react';
import {
  Search as SearchIcon,
  TrendingUp,
  TrendingDown,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCryptoStore from '../../../store/useCryptoStore';
import { formatCurrency } from '../../../hooks/utils';

const Search = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const { coins } = useCryptoStore();

  // Filter coins based on query
  const results =
    query.trim().length > 0
      ? coins
          .filter(
            (c) =>
              c.name.toLowerCase().includes(query.toLowerCase()) ||
              c.symbol.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 8)
      : coins.slice(0, 6);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setOpen(false);
        setFocused(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (coinId) => {
    navigate(`/detail/${coinId}`);
    setQuery('');
    setOpen(false);
    setFocused(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
      inputRef.current?.blur();
    }
  };

  const showDropdown = open && coins.length > 0;

  return (
    <div className="relative">
      {/* Input */}
      <div className="relative">
        <SearchIcon
          size={14}
          className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
            focused
              ? 'text-[var(--color-primary)]'
              : 'text-[var(--color-on-surface-variant)]'
          }`}
        />

        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search assets, coins…"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setFocused(true);
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className={`rounded-[10px] border px-[14px] py-[7px] pl-9 text-[13px] outline-none transition-all duration-200 ${
            query ? 'pr-9' : 'pr-[14px]'
          } ${
            focused ? 'w-[340px]' : 'w-[260px]'
          } font-[var(--font-sans)] text-[var(--color-on-surface)] ${
            focused
              ? 'border-[var(--color-primary)] bg-[rgba(0,212,232,0.04)] shadow-[0_0_0_3px_rgba(0,212,232,0.1)]'
              : 'border-[rgba(42,42,56,0.9)] bg-[rgba(255,255,255,0.04)]'
          }`}
        />

        {/* Clear button */}
        {query && (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-[10px] top-1/2 flex -translate-y-1/2 cursor-pointer border-none bg-transparent p-[2px] text-[var(--color-on-surface-variant)]"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-[1000] min-w-[340px] overflow-hidden rounded-xl border border-[rgba(42,42,56,0.9)] bg-[var(--color-surface-container-high)] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,212,232,0.06)] animate-[fadeIn_0.15s_ease_both]"
        >
          {/* Label */}
          <div className="border-b border-[rgba(42,42,56,0.6)] px-[14px] pb-[6px] pt-2 text-[9px] font-bold tracking-[0.14em] text-[var(--color-on-surface-variant)]">
            {query
              ? `RESULTS FOR "${query.toUpperCase()}"`
              : 'TOP ASSETS'}
          </div>

          {results.length === 0 ? (
            <div className="px-[14px] py-4 text-center text-[13px] text-[var(--color-on-surface-variant)]">
              No assets found for "{query}"
            </div>
          ) : (
            results.map((coin) => {
              const up = coin.price_change_percentage_24h > 0;

              return (
                <div
                  key={coin.id}
                  onClick={() => handleSelect(coin.id)}
                  className="flex cursor-pointer items-center justify-between px-[14px] py-[9px] transition-colors duration-100 hover:bg-[rgba(255,255,255,0.05)]"
                >
                  <div className="flex items-center gap-[10px]">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                    />

                    <div>
                      <p className="text-[13px] font-semibold leading-[1.2] text-[var(--color-on-surface)]">
                        {coin.name}
                      </p>

                      <p className="text-[10px] uppercase tracking-[0.06em] text-[var(--color-on-surface-variant)]">
                        {coin.symbol} · #{coin.market_cap_rank}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-[var(--font-mono)] text-[13px] font-bold text-[var(--color-on-surface)]">
                      {formatCurrency(coin.current_price)}
                    </p>

                    <p
                      className={`flex items-center justify-end gap-[2px] font-[var(--font-mono)] text-[10px] font-semibold ${
                        up
                          ? 'text-[var(--color-secondary)]'
                          : 'text-[var(--color-error)]'
                      }`}
                    >
                      {up ? (
                        <TrendingUp size={9} />
                      ) : (
                        <TrendingDown size={9} />
                      )}

                      {up ? '+' : ''}
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </p>
                  </div>
                </div>
              );
            })
          )}

          {/* Footer hint */}
          <div className="flex gap-3 border-t border-[rgba(42,42,56,0.6)] px-[14px] py-[6px] text-[9px] text-[var(--color-on-surface-variant)]">
            <span>
              <kbd className="font-[var(--font-mono)] text-[9px]">↵</kbd> to
              select
            </span>

            <span>
              <kbd className="font-[var(--font-mono)] text-[9px]">Esc</kbd> to
              close
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
