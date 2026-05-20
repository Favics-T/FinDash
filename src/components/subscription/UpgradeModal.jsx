import React, { useEffect, useRef } from 'react';
import { X, Check, Zap, Crown, Sparkles, Shield, TrendingUp, BarChart2, Bell } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import { PLAN_META, PLAN_TIERS } from '../../constants/plans';

// ── Icon map for Pro feature bullets ─────────────────────────────────────────
const BULLET_ICONS = [
  <TrendingUp size={13} />,
  <BarChart2 size={13} />,
  <Sparkles size={13} />,
  <Shield size={13} />,
  <Bell size={13} />,
  <Crown size={13} />,
];

const PlanCard = ({ planKey, isCurrentPlan, onUpgrade, isLoading }) => {
  const meta = PLAN_META[planKey];
  const isPro = planKey === PLAN_TIERS.PRO;

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        borderRadius: 18,
        border: isPro
          ? '1.5px solid rgba(0,212,232,0.45)'
          : '1.5px solid rgba(42,42,56,0.8)',
        background: isPro
          ? 'linear-gradient(160deg, rgba(0,212,232,0.07) 0%, rgba(61,219,160,0.04) 100%)'
          : 'rgba(20,20,25,0.6)',
        padding: '1.75rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s',
      }}
    >
      {/* Glow blob for Pro */}
      {isPro && (
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 140, height: 140,
          background: 'radial-gradient(circle, rgba(0,212,232,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Popular badge */}
      {isPro && meta.badge && (
        <div style={{
          position: 'absolute', top: 18, right: 18,
          background: 'linear-gradient(90deg, #00d4e8, #3ddba0)',
          borderRadius: 100, padding: '3px 10px',
          fontSize: 9, fontWeight: 800, color: '#003340', letterSpacing: '0.08em',
        }}>
          {meta.badge.toUpperCase()}
        </div>
      )}

      {/* Plan icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12, marginBottom: '1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isPro
          ? 'linear-gradient(135deg, #00d4e8, #3ddba0)'
          : 'rgba(42,42,56,0.8)',
        boxShadow: isPro ? '0 0 20px rgba(0,212,232,0.3)' : 'none',
      }}>
        {isPro
          ? <Crown size={22} color="#003340" strokeWidth={2.5} />
          : <Zap size={22} color="#8888a0" strokeWidth={2.5} />
        }
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
          color: isPro ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
        }}>
          {meta.name.toUpperCase()}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: '0.35rem' }}>
        <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-on-surface)', fontFamily: 'var(--font-mono)' }}>
          {meta.price}
        </span>
        <span style={{ fontSize: 12, color: 'var(--color-on-surface-variant)' }}>/{meta.period}</span>
      </div>

      <p style={{ fontSize: 12, color: 'var(--color-on-surface-variant)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
        {meta.description}
      </p>

      {/* CTA */}
      {isCurrentPlan ? (
        <div style={{
          width: '100%', padding: '9px 0', borderRadius: 10, textAlign: 'center',
          background: 'rgba(42,42,56,0.6)',
          color: 'var(--color-on-surface-variant)', fontWeight: 700, fontSize: 12,
          letterSpacing: '0.06em', border: '1px solid rgba(42,42,56,0.9)',
        }}>
          CURRENT PLAN
        </div>
      ) : (
        <button
          onClick={onUpgrade}
          disabled={isLoading}
          style={{
            width: '100%', padding: '10px 0', borderRadius: 10, border: 'none',
            cursor: isLoading ? 'default' : 'pointer',
            background: isPro
              ? 'linear-gradient(90deg, #00d4e8, #3ddba0)'
              : 'rgba(42,42,56,0.6)',
            color: isPro ? '#003340' : 'var(--color-on-surface-variant)',
            fontWeight: 800, fontSize: 12, letterSpacing: '0.08em',
            boxShadow: isPro ? '0 4px 20px rgba(0,212,232,0.25)' : 'none',
            transition: 'opacity 0.15s, transform 0.15s',
            opacity: isLoading ? 0.7 : 1,
          }}
          onMouseEnter={e => { if (!isLoading) { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          {isLoading ? 'Upgrading…' : isPro ? '⚡ UPGRADE TO PRO' : 'DOWNGRADE'}
        </button>
      )}

      {/* Features list */}
      <ul style={{ marginTop: '1.25rem', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {meta.highlights.map((item, i) => (
          <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 18, height: 18, borderRadius: 5, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isPro ? 'rgba(0,212,232,0.12)' : 'rgba(42,42,56,0.6)',
              color: isPro ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
            }}>
              {isPro ? (BULLET_ICONS[i % BULLET_ICONS.length]) : <Check size={11} />}
            </span>
            <span style={{ fontSize: 12, color: isPro ? 'var(--color-on-surface)' : 'var(--color-on-surface-variant)', lineHeight: 1.4 }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  UpgradeModal
// ─────────────────────────────────────────────────────────────────────────────
export const UpgradeModal = ({ isOpen, onClose, featureLabel }) => {
  const { tier, upgradeToPro, downgradeToFree } = useSubscription();
  const [isLoading, setIsLoading] = React.useState(false);
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setIsLoading(true);
    // Simulates async Stripe call — replace with real API later
    await new Promise(r => setTimeout(r, 900));
    upgradeToPro();
    setIsLoading(false);
    onClose();
  };

  const handleDowngrade = () => {
    downgradeToFree();
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.2s ease both',
      }}
    >
      <div
        style={{
          width: '100%', maxWidth: 780, maxHeight: '90vh',
          background: 'linear-gradient(160deg, #0f0f14 0%, #0a0a0d 100%)',
          border: '1px solid rgba(42,42,56,0.9)',
          borderRadius: 24,
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 80px rgba(0,212,232,0.06)',
          animation: 'slideUpModal 0.3s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.75rem 2rem 1.25rem',
          borderBottom: '1px solid rgba(42,42,56,0.6)',
          position: 'relative',
          background: 'linear-gradient(90deg, rgba(0,212,232,0.04) 0%, transparent 100%)',
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 20, right: 20,
              width: 32, height: 32, borderRadius: 8, border: 'none',
              background: 'rgba(42,42,56,0.6)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-on-surface-variant)', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(60,60,72,0.8)'; e.currentTarget.style.color = 'var(--color-on-surface)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(42,42,56,0.6)'; e.currentTarget.style.color = 'var(--color-on-surface-variant)'; }}
          >
            <X size={15} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg, #00d4e8, #3ddba0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 16px rgba(0,212,232,0.3)',
            }}>
              <Crown size={16} color="#003340" strokeWidth={2.5} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--color-primary)' }}>
              FINDASH PRO
            </span>
          </div>

          <h2 style={{
            fontSize: 22, fontWeight: 800, color: 'var(--color-on-surface)',
            lineHeight: 1.2, marginBottom: 6,
          }}>
            {featureLabel
              ? `Unlock "${featureLabel}" with Pro`
              : 'Upgrade to Findash Pro'}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--color-on-surface-variant)', lineHeight: 1.5 }}>
            Get institutional-grade alpha signals, unlimited watchlists, advanced analytics, and more.
          </p>
        </div>

        {/* Plan cards */}
        <div style={{
          padding: '1.5rem 2rem',
          display: 'flex', gap: '1rem', overflow: 'auto',
          flexWrap: 'wrap',
        }}>
          <PlanCard
            planKey={PLAN_TIERS.FREE}
            isCurrentPlan={tier === PLAN_TIERS.FREE}
            onUpgrade={handleDowngrade}
          />
          <PlanCard
            planKey={PLAN_TIERS.PRO}
            isCurrentPlan={tier === PLAN_TIERS.PRO}
            onUpgrade={handleUpgrade}
            isLoading={isLoading}
          />
        </div>

        {/* Footer note */}
        <div style={{
          padding: '0.75rem 2rem 1.25rem',
          borderTop: '1px solid rgba(42,42,56,0.4)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Shield size={13} color="var(--color-on-surface-variant)" />
          <span style={{ fontSize: 11, color: 'var(--color-on-surface-variant)', lineHeight: 1.4 }}>
            Cancel anytime · Secure payment via Stripe · No hidden fees
          </span>
        </div>
      </div>
    </div>
  );
};
