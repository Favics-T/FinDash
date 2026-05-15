import axios from 'axios';

const BASE_URL ='https://api.coingecko.com/api/v3';
// '/api'
// 'https://api.coingecko.com/api/v3';

const cryptoAPI = axios.create({
  baseURL: BASE_URL,
});



export const getCoinsMarkets = async (params = {}) => {
  const response = await cryptoAPI.get('/coins/markets', 
    {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 100,
      page: 1,
      sparkline: true,
      price_change_percentage: '24h',
      ...params,
    },
  });
  return response.data;
};

export const getCoinDetail = async (id) => {
  const response = await cryptoAPI.get(`/coins/${id}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: true,
    },
  });
  return response.data;
};

export const getCoinMarketChart = async (id, days = 7) => {
  const response = await cryptoAPI.get(`/coins/${id}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days: days,
    },
  });
  return response.data;
};

export const getGlobalData = async () => {
  const response = await cryptoAPI.get('/global');
  return response.data;
};

export default cryptoAPI;
