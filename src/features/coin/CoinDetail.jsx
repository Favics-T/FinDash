import React from 'react'
// import useCryptoStore from '../../store/useCryptoStore'



function CoinDetail() {
  const {coins, loading} = useCryptoStore
  return (
    <div>
     {
      coins.map((coin)=>(
        <div>
          <h2>{coin.name}</h2>
          </div>
      ))
     }
    </div>
  )
}

export default CoinDetail
