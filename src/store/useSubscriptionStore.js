// ─────────────────────────────────────────────
//  FinDash · Subscription Zustand Store
//  Persisted to localStorage so the plan
//  survives page refreshes.
//  Swap `persist` source for Stripe/backend
//  by overriding the hydration in AppLayout.
// ─────────────────────────────────────────────

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PLAN_TIERS, FREE_LIMITS } from '../constants/plans';

export const useSubscriptionStore = create(
  persist(
    (set, get) => ({
      // ── State ──────────────────────────────
      tier: PLAN_TIERS.FREE,           // 'free' | 'pro'
      aiInsightsUsedToday: 0,
      lastInsightResetDate: null,      // ISO date string

      // ── Actions ────────────────────────────
      setTier: (tier) => set({ tier }),

      useAiInsight: () => {
        const { aiInsightsUsedToday, tier } = get();
        if (tier === PLAN_TIERS.PRO) return true; // unlimited
        if (aiInsightsUsedToday >= FREE_LIMITS.aiInsightsPerDay) return false;
        set((s) => ({ aiInsightsUsedToday: s.aiInsightsUsedToday + 1 }));
        return true;
      },

      resetInsights: () =>
        set({
          aiInsightsUsedToday: 0,
          lastInsightResetDate: new Date().toISOString().split('T')[0],
        }),

      // Check + auto-reset daily counter
      checkAndResetDaily: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastInsightResetDate } = get();
        if (lastInsightResetDate !== today) {
          set({ aiInsightsUsedToday: 0, lastInsightResetDate: today });
        }
      },
    }),
    {
      name: 'findash-subscription',
      partialize: (state) => ({
        tier: state.tier,
        aiInsightsUsedToday: state.aiInsightsUsedToday,
        lastInsightResetDate: state.lastInsightResetDate,
      }),
    }
  )
);
