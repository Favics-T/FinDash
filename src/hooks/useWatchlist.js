import useCryptoStore from '../store/useCryptoStore'



export const useWatchlist = ()=>{
    const {watchlist,addToWatchlist,removeFromWatchlist} = useCryptoStore()
    const {id} = useParams;
    const coinId = id || 'bitcoin'

    const toggleWatchlist = ()=>{
        if(watchlist.includes(coinId)){
            removeFromWatchlist(coinId)
        }
        else{
            addToWatchlist(coinId)
        }
      const isWatchListed = watchlist.includes(coinId)
    }

    return{isWatchlisted, toggleWatchlist}
}