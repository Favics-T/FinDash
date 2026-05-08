import React from 'react'
import MarketStatus from './MarketStatus'
import InsightFeed from './InsightFeed'


function Dashboard() {
  return (
    <section>
      <MarketStatus />
      <div>
        <InsightFeed />
      </div>
    </section>
  )
}

export default Dashboard
