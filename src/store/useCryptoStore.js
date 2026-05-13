import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useCryptoStore = create(
  persist(
    (set)=>({
      coins:[],
      selectedCoins:null,
      watchlist:[],
      loading:false,
      error:null,
      globalData:null,

      setCoins: (coin)=> set({coin}),
      setSelectedCoin: (coins) => set({selectedCoins:coins}),
      setLoading:(loading)=> set({loading}),
      setError:(error)=> set({error}),
      setGlobalData:(data)=> set({data}),

      addToWatchList: (coinId)=> 
        set((state)=>({
          watchlist: [...new Set([...state.watchlist,coinId])]
        })),
        removeFromWatchList:(coinId)=>
          set((state)=>({
            watchlist: state.watchlist.filter((id)=> id !==coinId)
          }))
    }),
    {
      name: 'findash-storage',
      partialize: (state) => ({ watchlist: state.watchlist }),
    }
  )
)