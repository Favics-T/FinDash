import { LayoutDashboard, LineChart, Star, ArrowLeftRight } from 'lucide-react';
import { BiSolidCoinStack } from 'react-icons/bi';

export const NAV_LINKS = [
  { to: '/',               icon: LayoutDashboard, label: 'Dashboard',   pro: false },
  { to: '/markets',        icon: LineChart,        label: 'Markets',     pro: false },
  { to: '/detail/bitcoin', icon: BiSolidCoinStack, label: 'Coin Detail', pro: false },
  { to: '/watchlist',      icon: Star,             label: 'Watchlist',   pro: false },
  {
    to: '/compare',
    icon: ArrowLeftRight,
    label: 'Compare',
    pro: true,
    featureLabel: 'Asset Comparison',
  },
];

// Shared time range definitions used by Dashboard and CoinDetail
export const TIME_RANGES = [
  { label: '1D',  days: 1,   pro: false },
  { label: '7D',  days: 7,   pro: false },
  { label: '30D', days: 30,  pro: true  },
  { label: '1Y',  days: 365, pro: true  },
];