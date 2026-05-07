import React from 'react'

function MarketStatus() {
  return (
    <div className='border font-Inter border-sidebar-accent px-4 py-2 rounded-2xl flex flex-col gap-4'>
      <p className='border-b p-4 text-sidebar-accent font-bold text-[16px] '>Market shows strong bullish momentum with increasing trading volume</p>

      {/* market status */}
      <div className='flex'>
        {/* left */}
        <div className=''>
           <p className='text-sidebar-muted text-[12px] font-bold '>MARKET STATUS <span className='text-lg text-sidebar-accent'> BULLISH </span></p>
           <p className='text-muted text-[8px]'>GLOBAL MARKET CAP </p>
        </div>

        {/* right */}

       

      </div>
    </div>
  )
}

export default MarketStatus
