import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCryptoStore = create(
  persist(
    (set) => ({
      coins: [],
      selectedCoin: null,
      watchlist: [],
      loading: false,
      error: null,
      globalData: null,

      setCoins: (coins) => set({ coins }),
      setSelectedCoin: (coin) => set({ selectedCoin: coin }),
      setGlobalData: (data) => set({ globalData: data }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      addToWatchlist: (coinId) => 
        set((state) => ({
          watchlist: [...new Set([...state.watchlist, coinId])]
        })),

      removeFromWatchlist: (coinId) =>
        set((state) => ({
          watchlist: state.watchlist.filter((id) => id !== coinId)
        })),
    }),
    {
      name: 'findash-storage',
      partialize: (state) => ({ watchlist: state.watchlist }),
    },
  )
);
export default useCryptoStore;




