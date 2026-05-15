import { LayoutDashboard } from "lucide-react"
import { BiSolidCoinStack } from "react-icons/bi";
import { MdOutlineCompareArrows } from "react-icons/md";
import { ChartNoAxesCombined } from "lucide-react";
import { Star } from "lucide-react";

export const pages =[
    {page:'Dashboard', to:'/', icon:LayoutDashboard },
    {page:'Markets',to:'/markets', icon:ChartNoAxesCombined },
    {page:'Coin Detail',to:'/detail/bitcoin', icon:BiSolidCoinStack },
     {page:'Watchlist',to:'/watchlist', icon:Star },
     {page:'Compare',to:'/compare', icon:MdOutlineCompareArrows },
]