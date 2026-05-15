import useCryptoStore from '../store/useCryptoStore';

export const useWatchlist = (coinId) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useCryptoStore();

  const toggleWatchlist = () => {
    if (watchlist.includes(coinId)) {
      removeFromWatchlist(coinId);
    } else {
      addToWatchlist(coinId);
    }
  };

  const isWatchlisted = watchlist.includes(coinId);

  return { isWatchlisted, toggleWatchlist, watchlist };
};