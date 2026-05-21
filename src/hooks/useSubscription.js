import { useCallback } from 'react';
import { useSubscriptionStore } from '../store/useSubscriptionStore';
import { PLAN_TIERS, FREE_LIMITS, PRO_LIMITS, FEATURES } from '../constants/plans';

export const useSubscription = () => {
  const { tier, aiInsightsUsedToday, setTier, useAiInsight, resetInsights } =
    useSubscriptionStore();

  const isPro  = tier === PLAN_TIERS.PRO;
  const isFree = tier === PLAN_TIERS.FREE;
  const limits = isPro ? PRO_LIMITS : FREE_LIMITS;

  const canAccess = useCallback(
    (featureKey) => {
      const feature = FEATURES[featureKey];
      if (!feature) return true;
      return !feature.isPro || isPro;
    },
    [isPro],
  );

  const canAddToWatchlist = useCallback(
    (currentCount) => currentCount < limits.watchlistMax,
    [limits.watchlistMax],
  );

  const aiInsightsRemaining = isPro
    ? Infinity
    : Math.max(0, FREE_LIMITS.aiInsightsPerDay - aiInsightsUsedToday);

  const upgradeToPro   = useCallback(() => setTier(PLAN_TIERS.PRO),  [setTier]);
  const downgradeToFree = useCallback(() => setTier(PLAN_TIERS.FREE), [setTier]);

  return {
    tier, isPro, isFree, limits,
    canAccess, canAddToWatchlist,
    aiInsightsRemaining, aiInsightsUsedToday,
    maxChartDays: limits.chartDaysMax,
    visibleCoinCount: limits.coinCount,
    useAiInsight, resetInsights,
    upgradeToPro, downgradeToFree,
  };
};