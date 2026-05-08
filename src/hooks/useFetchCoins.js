import { useEffect } from "react";
import useCryptoStore from "../store/useCryptoStore";
import { getMarketData } from "../service/cryptoAPI";


export default function useFetchCoins (){
    const {
        setCoins,
        setLoading,
        setError,
    } = useCryptoStore


useEffect(()=>{
    const fetchCoins = async()=>{
        try{
            setLoading(true);
            const data = await getMarketData();
            setCoins(data)
        }
        catch(error){
            setError(error.message)
        }
        finally{
            setLoading(false)
        }
    };
    fetchCoins()
},[])
}