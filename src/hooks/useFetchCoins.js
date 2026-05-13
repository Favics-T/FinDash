import { useEffect, useCallback } from 'react';
import useCryptoStore from '../store/useCryptoStore';
import { getCoinsMarkets, getGlobalData } from '../service/cryptoAPI';

export const useFetchCoins = () => {
  const { setCoins, setGlobalData, setLoading, setError } = useCryptoStore();


  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [markets, global] = await Promise.all([
        getCoinsMarkets(),
        getGlobalData()
      ]);
      setCoins(markets);
      setGlobalData(global.data);
    } catch (err) {
      console.error('Error fetching crypto data:', err);
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [setCoins, setGlobalData, setLoading, setError]);

  useEffect(() => {
    fetchData();
    
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { refresh: fetchData };
};
