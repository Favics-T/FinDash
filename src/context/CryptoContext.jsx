import React, { createContext, useContext, useState } from 'react'

export const CryptoMarketContext = createContext();

const COIN_IDS = ['bitcoin', 'etherum', 'solana', 'dodgecoin']

function CryptoProvider({children}) {
        const [marketData, setMarketData]= useState([]);
        const [loading, setLoading] = useState(false);
        const[error, setError] = useState(null);

        const loadMarketData = useCallback(async () => {
            //Prevent refetch if data already exists
            if (marketData.length > 0) return;
        
            setLoading(true);
            setError(null);
            try {
              const res = await fetchMarketData(COIN_IDS);
              setMarketData(res.data);
            } catch (error) {
              setError("Failed to load crypto market data");
              console.error("Failed to load crypto market data", error);
            } finally {
              setLoading(false);
            }
          }, [marketData.length]);
        
          useEffect(() => {
            loadMarketData();
          }, [loadMarketData]);
        


  return (
    <CryptoContext.Provider value={{
                    marketData,loading,error
    }}>
            {children}
    </CryptoContext.Provider>
  )
}

export default CryptoProvider

export const useCryptoMarket = ()=> useContext(CryptoMarketContext)
