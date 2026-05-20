import { useEffect, useState } from 'react';
import { getCoinDetail, getCoinMarketChart } from '../service/cryptoAPI';
import { useParams } from 'react-router-dom';




export const useCoinDetail = ()=>{
        const { id } = useParams();

    const coinId = id || 'bitcoin';
    const TIME_RANGES =[
        {label:'24h', days:1, pro: false},
        {label:'7d', days:7, pro: false},
        {label:'30d', days:30, pro: true},
        {label:'90d', days:90, pro: true},
    ];

    const [coin,setCoin] = useState(null);
    const [chartData,setChartData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [activeRange,setActiveRange] = useState(TIME_RANGES[1]);
    const [chartLoading,setChartLoading] = useState(false);
    const [modalOpen,setModalOpen] = useState(false);


    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true);
            try{
                const [detail, chart ] = await Promise.all([
                    getCoinDetail(coinId),
                    getCoinMarketChart(coinId, activeRange.days)
                ])
                setCoin(detail);
                setChartData(chart);
            } catch (err) {
                setError(err.message || 'Failed to fetch coin details');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [coinId, activeRange.days]);

    const handleRangeChange = async (range) => {
            if(range.pro && !isPro){
                setModalOpen(true);
                return;
            }
            setActiveRange(range.label)
            setChartLoading(true);

            try{
                const chart = await getCoinMarketChart(coinId, range.days);
                setChartData(chart);
                            }
            catch (e){
                // this is ignored
            }
            finally{
                setChartLoading(false);
            }
    }

    return {
        TIME_RANGES,coin,setCoin,chartData, setChartData,loading, setLoading ,
    error, setError,activeRange,setActiveRange,chartLoading,setChartLoading,modalOpen,setModalOpen,
    id, coinId, handleRangeChange
    }
}