import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getCoinDetail, getCoinMarketChart } from '../service/cryptoAPI';
import { useSubscription } from './useSubscription';
import { TIME_RANGES } from '../data/navigation';

/**
 * Encapsulates all data-fetching and state for the CoinDetail page.
 * CoinDetail.jsx should destructure from this hook instead of managing its own state.
 */
export const useCoinDetail = () => {
  const { id } = useParams();
  const coinId = id || 'bitcoin';
  const { isPro } = useSubscription();

  const [coin, setCoin]               = useState(null);
  const [chartData, setChartData]     = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [chartLoading, setChartLoading] = useState(false);
  const [modalOpen, setModalOpen]     = useState(false);
  const [activeRangeIdx, setActiveRangeIdx] = useState(1); // default: 7D

  const activeRange = TIME_RANGES[activeRangeIdx] ?? TIME_RANGES[1];

  // Fetch coin detail + initial chart on mount or coinId change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [detail, chart] = await Promise.all([
          getCoinDetail(coinId),
          getCoinMarketChart(coinId, TIME_RANGES[1].days),
        ]);
        setCoin(detail);
        setChartData(chart);
      } catch (err) {
        setError(err.message || 'Failed to fetch coin details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [coinId]);

  // Change time range; gate Pro ranges
  const handleRangeChange = useCallback(async (range, idx) => {
    if (range.pro && !isPro) {
      setModalOpen(true);
      return;
    }
    setActiveRangeIdx(idx);
    setChartLoading(true);
    try {
      const chart = await getCoinMarketChart(coinId, range.days);
      setChartData(chart);
    } catch (_) {
      // Keep existing chart data on error
    } finally {
      setChartLoading(false);
    }
  }, [coinId, isPro]);

  return {
    coinId,
    coin,
    chartData,
    loading,
    error,
    chartLoading,
    modalOpen,
    setModalOpen,
    activeRange,
    activeRangeIdx,
    handleRangeChange,
    isPro,
  };
};