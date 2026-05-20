// ─────────────────────────────────────────────
//  FinDash · Subscription Plan Constants
//  Future-ready: swap PLAN_TIERS keys with
//  Stripe price IDs or backend-returned strings.
// ─────────────────────────────────────────────

export const PLAN_TIERS = {
  FREE: 'free',
  PRO: 'pro',
};

export const FREE_LIMITS = {
  watchlistMax: 5,
  coinCount: 20,        // top 20 coins visible
  aiInsightsPerDay: 3,
  chartDaysMax: 7,      // 7-day history only
};

export const PRO_LIMITS = {
  watchlistMax: Infinity,
  coinCount: Infinity,
  aiInsightsPerDay: Infinity,
  chartDaysMax: 365,
};

// ─── Feature flags ───────────────────────────
// Each key maps to a boolean "isPro" flag.
// Free users get features where isPro === false.
export const FEATURES = {
  // Dashboard / overview
  basicDashboard:            { isPro: false, label: 'Basic Dashboard' },
  marketStatusBar:           { isPro: false, label: 'Market Status Bar' },
  btcChart7d:                { isPro: false, label: '7-Day BTC Chart' },

  // Markets
  top20Coins:                { isPro: false, label: 'Top 20 Coins' },
  fullMarket:                { isPro: true,  label: 'Full Market (100+ Coins)' },
  exportData:                { isPro: true,  label: 'Export Data (PDF/CSV)' },

  // Watchlist
  watchlist:                 { isPro: false, label: 'Watchlist (up to 5)' },
  unlimitedWatchlist:        { isPro: true,  label: 'Unlimited Watchlist' },

  // Coin Detail
  coinDetail7d:              { isPro: false, label: '7-Day Coin Chart' },
  coinDetailExtended:        { isPro: true,  label: '30-Day to 1-Year Chart' },

  // Analytics & Tools
  assetComparison:           { isPro: true,  label: 'Asset Comparison' },
  advancedAnalytics:         { isPro: true,  label: 'Advanced Analytics' },
  portfolioTracking:         { isPro: true,  label: 'Portfolio Performance Tracking' },
  portfolioAllocation:       { isPro: true,  label: 'Portfolio Allocation Charts' },

  // AI
  aiInsightsLimited:         { isPro: false, label: 'Limited AI Insights (3/day)' },
  aiInsightsUnlimited:       { isPro: true,  label: 'Unlimited AI Insights' },
  sentimentAnalysis:         { isPro: true,  label: 'Sentiment Analysis' },
  predictiveTrends:          { isPro: true,  label: 'Predictive Trends' },

  // Alerts & Reports
  realTimeAlerts:            { isPro: true,  label: 'Real-Time Alerts' },
  advancedIndicators:        { isPro: true,  label: 'Advanced Indicators' },
  premiumWidgets:            { isPro: true,  label: 'Premium Dashboard Widgets' },

  // Theme
  darkMode:                  { isPro: false, label: 'Dark Mode (default)' },

  // News
  marketNews:                { isPro: false, label: 'Market News' },
};

// ─── Plan metadata (pricing cards) ──────────
export const PLAN_META = {
  [PLAN_TIERS.FREE]: {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Essential market intelligence for crypto newcomers.',
    color: '#8888a0',
    highlights: [
      'Top 20 coins overview',
      '7-day price charts',
      'Watchlist (up to 5 assets)',
      'Market news feed',
      '3 AI insights per day',
      'Basic dashboard',
    ],
  },
  [PLAN_TIERS.PRO]: {
    name: 'Pro',
    price: '$19',
    period: 'per month',
    description: 'Institutional-grade alpha signals for serious traders.',
    color: '#00d4e8',
    badge: 'Most Popular',
    highlights: [
      'Full market (100+ coins)',
      'Up to 1-year chart history',
      'Unlimited watchlist',
      'Asset comparison tool',
      'AI insights & sentiment analysis',
      'Predictive trend engine',
      'Portfolio performance tracking',
      'Real-time alerts',
      'Advanced indicators',
      'Export PDF / CSV reports',
      'Premium dashboard widgets',
    ],
  },
};
