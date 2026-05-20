import { LayoutDashboard } from "lucide-react"
import { BiSolidCoinStack } from "react-icons/bi";
import { MdOutlineCompareArrows } from "react-icons/md";
import { ChartNoAxesCombined } from "lucide-react";
import { Star,LineChart,Database,ArrowLeftRight } from "lucide-react";

export const pages =[
    {page:'Dashboard', to:'/', icon:LayoutDashboard },
    {page:'Markets',to:'/markets', icon:ChartNoAxesCombined },
    {page:'Coin Detail',to:'/detail/bitcoin', icon:BiSolidCoinStack },
     {page:'Watchlist',to:'/watchlist', icon:Star },
     {page:'Compare',to:'/compare', icon:MdOutlineCompareArrows },
];

//  Nav link definitions 
export const NAV_LINKS = [
  { to: '/',         icon: LayoutDashboard, label: 'Dashboard',   pro: false },
  { to: '/markets',  icon: LineChart,       label: 'Markets',     pro: false },
  { to: '/detail/bitcoin', icon: Database,  label: 'Coin Detail', pro: false },
  { to: '/watchlist',icon: Star,            label: 'Watchlist',   pro: false },
  { to: '/compare',  icon: ArrowLeftRight,  label: 'Compare',     pro: true,  featureLabel: 'Asset Comparison' },
];