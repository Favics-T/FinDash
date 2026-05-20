// ─────────────────────────────────────────────
//  FinDash · useSubscription hook
//  Single source of truth for plan gating.
//  Future-ready: replace localStorage with a
//  Stripe/backend call inside useEffect here.
// ─────────────────────────────────────────────

import { useSubscriptionStore } from '../store/useSubscriptionStore';
import { PLAN_TIERS, FREE_LIMITS, PRO_LIMITS, FEATURES } from '../constants/plans';

export const useSubscription = () => {
  const { tier, aiInsightsUsedToday, setTier, useAiInsight, resetInsights } =
    useSubscriptionStore();

  const isPro = tier === PLAN_TIERS.PRO;
  const isFree = tier === PLAN_TIERS.FREE;

  const limits = isPro ? PRO_LIMITS : FREE_LIMITS;

  /** Returns true if the named feature is accessible at the current tier. */
  const canAccess = (featureKey) => {
    const feature = FEATURES[featureKey];
    if (!feature) return true; // unknown feature → allow by default
    return !feature.isPro || isPro;
  };

  /** Returns true if the user can add more watchlist items. */
  const canAddToWatchlist = (currentCount) =>
    currentCount < limits.watchlistMax;

  /** Returns remaining AI insights for today (Infinity for Pro). */
  const aiInsightsRemaining = isPro
    ? Infinity
    : Math.max(0, FREE_LIMITS.aiInsightsPerDay - aiInsightsUsedToday);

  /** Returns max allowed chart days. */
  const maxChartDays = limits.chartDaysMax;

  /** Returns the max number of visible coins. */
  const visibleCoinCount = limits.coinCount;

  /** Upgrade / downgrade (hook into Stripe here later). */
  const upgradeToPro = () => setTier(PLAN_TIERS.PRO);
  const downgradeToFree = () => setTier(PLAN_TIERS.FREE);

  return {
    tier,
    isPro,
    isFree,
    limits,
    canAccess,
    canAddToWatchlist,
    aiInsightsRemaining,
    aiInsightsUsedToday,
    maxChartDays,
    visibleCoinCount,
    useAiInsight,
    resetInsights,
    upgradeToPro,
    downgradeToFree,
  };
};
