import React, { useState } from 'react';
import { Lock, Crown } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import { UpgradeModal } from './UpgradeModal';

// ─────────────────────────────────────────────────────────────────────────────
//  ProBadge  — small inline PRO tag
// ─────────────────────────────────────────────────────────────────────────────
export const ProBadge = ({ style = {} }) => (
  <span
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      padding: '2px 6px', borderRadius: 5,
      background: 'linear-gradient(90deg, rgba(0,212,232,0.18), rgba(61,219,160,0.12))',
      border: '1px solid rgba(0,212,232,0.3)',
      fontSize: 8, fontWeight: 800, letterSpacing: '0.1em',
      color: 'var(--color-primary)',
      flexShrink: 0,
      ...style,
    }}
  >
    <Crown size={8} />
    PRO
  </span>
);

// ─────────────────────────────────────────────────────────────────────────────
//  ProGate  — wraps premium content with blur+lock overlay for free users
//
//  Props:
//    featureKey  – key from FEATURES map (for canAccess check)  [optional]
//    featureLabel – human label shown in upgrade modal           [optional]
//    blur        – blur strength in px (default 6)
//    children    – premium content to gate
//    compact     – smaller overlay variant for sidebar items
//    inline      – even smaller inline badge/button variant
// ─────────────────────────────────────────────────────────────────────────────
export const ProGate = ({
  featureKey,
  featureLabel,
  blur = 6,
  children,
  compact = false,
  inline = false,
}) => {
  const { isPro, canAccess } = useSubscription();
  const [modalOpen, setModalOpen] = useState(false);

  // If Pro user or feature doesn't require Pro → render normally
  const hasAccess = featureKey ? canAccess(featureKey) : isPro;
  if (hasAccess) return <>{children}</>;

  // ── Inline variant (for buttons / nav items) ──────────────────────────────
  if (inline) {
    return (
      <>
        <button
          onClick={() => setModalOpen(true)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '5px 10px', borderRadius: 8, border: 'none', cursor: 'pointer',
            background: 'rgba(0,212,232,0.08)', color: 'var(--color-primary)',
            fontSize: 12, fontWeight: 700, transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,232,0.14)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,212,232,0.08)'; }}
        >
          <Lock size={11} />
          {featureLabel || 'Pro Feature'}
          <ProBadge />
        </button>
        <UpgradeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} featureLabel={featureLabel} />
      </>
    );
  }

  // ── Compact variant (for sidebar nav items) ───────────────────────────────
  if (compact) {
    return (
      <>
        <div
          role="button"
          onClick={() => setModalOpen(true)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 6, cursor: 'pointer', opacity: 0.6,
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.6'; }}
        >
          {children}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Lock size={11} color="var(--color-on-surface-variant)" />
            <ProBadge />
          </div>
        </div>
        <UpgradeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} featureLabel={featureLabel} />
      </>
    );
  }

  // ── Full overlay variant (for cards / widgets) ────────────────────────────
  return (
    <>
      <div style={{ position: 'relative', isolation: 'isolate' }}>
        {/* Blurred content preview */}
        <div style={{
          filter: `blur(${blur}px)`,
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: 0.55,
        }}>
          {children}
        </div>

        {/* Lock overlay */}
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: 'rgba(9,9,11,0.45)',
            backdropFilter: 'blur(1px)',
            borderRadius: 'inherit',
            cursor: 'pointer',
            zIndex: 2,
          }}
          onClick={() => setModalOpen(true)}
        >
          {/* Lock icon ring */}
          <div style={{
            width: 52, height: 52, borderRadius: '50%', marginBottom: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(0,212,232,0.15), rgba(61,219,160,0.10))',
            border: '1.5px solid rgba(0,212,232,0.3)',
            boxShadow: '0 0 24px rgba(0,212,232,0.15)',
            animation: 'pulse-glow 2.4s ease-in-out infinite',
          }}>
            <Lock size={22} color="var(--color-primary)" strokeWidth={2} />
          </div>

          <ProBadge style={{ marginBottom: 8, fontSize: 9, padding: '3px 8px' }} />

          <p style={{
            fontSize: 12, fontWeight: 600, color: 'var(--color-on-surface)',
            textAlign: 'center', maxWidth: 180, lineHeight: 1.4, marginBottom: 12,
          }}>
            {featureLabel
              ? `"${featureLabel}" is a Pro feature`
              : 'Upgrade to unlock advanced insights'}
          </p>

          <button
            style={{
              padding: '7px 18px', borderRadius: 9, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(90deg, #00d4e8, #3ddba0)',
              color: '#003340', fontWeight: 800, fontSize: 11, letterSpacing: '0.06em',
              boxShadow: '0 4px 16px rgba(0,212,232,0.25)',
              transition: 'transform 0.15s, opacity 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
             UPGRADE TO PRO
          </button>
        </div>
      </div>

      <UpgradeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} featureLabel={featureLabel} />
    </>
  );
};
