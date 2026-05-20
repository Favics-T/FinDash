import React, { useState } from 'react';
import { Crown, Sparkles, X, ChevronRight } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import { UpgradeModal } from './UpgradeModal';

// ─────────────────────────────────────────────────────────────────────────────
//  FreeTrialBanner  — dismissible sticky banner for free users
// ─────────────────────────────────────────────────────────────────────────────
export const FreeTrialBanner = () => {
  const { isPro } = useSubscription();
  const [dismissed, setDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  if (isPro || dismissed) return null;

  return (
    <>
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.6rem 1.5rem',
          background: 'linear-gradient(90deg, rgba(0,212,232,0.10) 0%, rgba(61,219,160,0.07) 50%, rgba(0,212,232,0.05) 100%)',
          borderBottom: '1px solid rgba(0,212,232,0.18)',
          gap: '1rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle shimmer line */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,232,0.06) 50%, transparent 100%)',
          animation: 'shimmer 3s ease-in-out infinite',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 7, flexShrink: 0,
            background: 'linear-gradient(135deg, #00d4e8, #3ddba0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 12px rgba(0,212,232,0.3)',
          }}>
            <Sparkles size={13} color="#003340" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: 12, color: 'var(--color-on-surface)', fontWeight: 500, lineHeight: 1.4 }}>
            <strong style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Start your 7-day Pro trial free.</strong>
            {' '}Unlock advanced analytics, unlimited watchlists & AI insights.
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(90deg, #00d4e8, #3ddba0)',
              color: '#003340', fontWeight: 800, fontSize: 11, letterSpacing: '0.06em',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 12px rgba(0,212,232,0.25)',
              transition: 'opacity 0.15s, transform 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.02)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Crown size={12} />
            TRY PRO FREE
            <ChevronRight size={12} />
          </button>
          <button
            onClick={() => setDismissed(true)}
            style={{
              width: 24, height: 24, borderRadius: 6, border: 'none', cursor: 'pointer',
              background: 'transparent', color: 'var(--color-on-surface-variant)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-on-surface)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-on-surface-variant)'; }}
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      <UpgradeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  AiInsightsCounter  — shows "X AI insights remaining today"
// ─────────────────────────────────────────────────────────────────────────────
export const AiInsightsCounter = ({ style = {} }) => {
  const { isPro, aiInsightsRemaining, limits } = useSubscription();
  const [modalOpen, setModalOpen] = useState(false);

  if (isPro) return null;

  const used = limits.aiInsightsPerDay - aiInsightsRemaining;
  const pct = (aiInsightsRemaining / limits.aiInsightsPerDay) * 100;
  const isLow = aiInsightsRemaining <= 1;

  return (
    <>
      <div
        onClick={isLow ? () => setModalOpen(true) : undefined}
        style={{
          padding: '0.65rem 0.85rem', borderRadius: 10,
          background: isLow
            ? 'rgba(255,107,107,0.08)'
            : 'rgba(0,212,232,0.06)',
          border: `1px solid ${isLow ? 'rgba(255,107,107,0.2)' : 'rgba(0,212,232,0.15)'}`,
          cursor: isLow ? 'pointer' : 'default',
          transition: 'all 0.2s',
          ...style,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Sparkles size={12} color={isLow ? 'var(--color-error)' : 'var(--color-primary)'} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: isLow ? 'var(--color-error)' : 'var(--color-primary)' }}>
              AI INSIGHTS
            </span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: isLow ? 'var(--color-error)' : 'var(--color-on-surface)' }}>
            {aiInsightsRemaining}/{limits.aiInsightsPerDay}
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ height: 3, background: 'rgba(42,42,56,0.8)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: isLow
              ? 'var(--color-error)'
              : 'linear-gradient(90deg, #00d4e8, #3ddba0)',
            borderRadius: 99,
            transition: 'width 0.5s ease',
          }} />
        </div>

        {isLow && (
          <p style={{ fontSize: 10, color: 'var(--color-error)', marginTop: 5, lineHeight: 1.3 }}>
            {aiInsightsRemaining === 0 ? 'Limit reached · ' : 'Almost out · '}
            <u style={{ cursor: 'pointer' }}>Upgrade for unlimited</u>
          </p>
        )}
      </div>

      <UpgradeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} featureLabel="Unlimited AI Insights" />
    </>
  );
};
