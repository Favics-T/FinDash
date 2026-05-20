import React from 'react'
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Zap, Activity, Brain } from 'lucide-react';
import  Badge  from '../ui/Badge';
import { ProGate, ProBadge } from '../subscription/ProGate';
import SentimentWidget from './SentimentWidget';
import AlphaItem from './AlphaItem';

function LeftDiv() {
  return (
    <div className="flex flex-col gap-md">

          {/* Alpha Feed (free) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-primary" />
                <span className="font-bold">Alpha Feed</span>
              </div>
              <Badge variant="primary">LIVE</Badge>
            </CardHeader>
            <CardContent className="px-5">
              <AlphaItem tag="Whale Alert" tagColor="var(--color-primary)" time="2m ago" text="5,000 BTC moved from exchange to cold storage." />
            </CardContent>
          </Card>

          {/* Volatility Scan (free) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-primary" />
                <span className="font-bold">Volatility Scan</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-body-md text-on-surface-variant mb-3">High liquidation clusters detected.</p>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-label-caps">SYSTEM CONFIDENCE</span>
                  <span className="text-primary text-label-caps">88%</span>
                </div>
                <div className="h-1 bg-outline-variant rounded-full overflow-hidden">
                  <div className="h-full w-[88%] bg-linear-to-r from-primary to-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights (Pro gate) */}
          <ProGate featureKey="sentimentAnalysis" featureLabel="Sentiment Analysis">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain size={16} className="text-primary" />
                  <span className="font-bold">AI Sentiment</span>
                </div>
                <ProBadge />
              </CardHeader>
              <CardContent>
                <SentimentWidget />
              </CardContent>
            </Card>
          </ProGate>
        </div>
  )
}

export default LeftDiv
