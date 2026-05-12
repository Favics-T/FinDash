import { create } from "zustand";
import { persist } from "zustand/middleware";


const useCryptoStore = create(
  persist(
    ((set)=>({
      coins:[],
      selectedCoin:null,
      loading:false,
      error:null,
      globalData:null,
      watchlist:[],

      setCoins: (coins)=> set({coins}),
      setSelectedCoins: (coin)=> set({selectedCoin:coin}),
      setLoading: (loading)=> set({loading}),
      setError: (error)=> set({error}),
      setGlobalData:(data) => set({globalData:data}),

      addToWatchList: (coinId)=> 
      set((state)=>({
        watchlist:[...new Set([...state.watchlist, coinId])]
      })),

      removeFromWatchList: (coinId)=>
        set((state)=>({
            watchlist: state.watchlist.filter((id)=> id !== coinId)
        }))

    }))
  )
)