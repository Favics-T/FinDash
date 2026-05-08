import { create } from "zustand";

const useCryptoStore = create((set) => ({
  coins: [],
  selectedCoin: null,
  watchlist: [],
  loading: false,
  error: null,

  setCoins: (coins) => set({ coins }),

  setSelectedCoin: (coin) =>
    set({ selectedCoin: coin }),

  addToWatchlist: (coin) =>
    set((state) => ({
      watchlist: [...state.watchlist, coin],
    })),

  removeFromWatchlist: (id) =>
    set((state) => ({
      watchlist: state.watchlist.filter(
        (coin) => coin.id !== id
      ),
    })),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),
}));

export default useCryptoStore;