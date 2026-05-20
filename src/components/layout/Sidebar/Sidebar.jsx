import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, LineChart, Database, Star,
  ArrowLeftRight, HelpCircle, Settings, Zap, Crown,
} from 'lucide-react';
import { cn } from '../../../hooks/utils';
import { useSubscription } from '../../../hooks/useSubscription';
import { ProBadge } from '../../subscription/ProGate';
import { UpgradeModal } from '../../subscription/UpgradeModal';
import { AiInsightsCounter } from '../../subscription/SubscriptionBanners';
import { NAV_LINKS } from '../../../data/pages';


// ── Single nav item ───────────────────────────────────────────────────────────
const SidebarLink = ({ link, isPro, onLockedClick }) => {
  const isLocked = link.pro && !isPro;

  if (isLocked) {
    // Render as a clickable div (not a router link) that opens the modal
    return (
      <div
        role="button"
        onClick={() => onLockedClick(link.featureLabel)}
        className="group flex items-center gap-3 px-4 py-2.5 rounded-xl mb-1 cursor-pointer text-sm font-medium transition-all duration-200"
        style={{
          color: 'var(--color-on-surface-variant)',
          opacity: 0.65,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.opacity = '0.9'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.opacity = '0.65'; }}
      >
        <link.icon size={18} style={{ flexShrink: 0 }} />
        <span style={{ flex: 1 }}>{link.label}</span>
        <ProBadge />
      </div>
    );
  }

  return (
    <NavLink
      to={link.to}
      end={link.to === '/'}
      className={({ isActive }) => cn(
        'group flex items-center gap-3 px-4 py-2.5 rounded-xl mb-1 transition-all duration-200 cursor-pointer text-sm font-medium',
        isActive ? 'sidebar-active-glow' : 'text-on-surface-variant hover:text-on-surface'
      )}
      style={({ isActive }) => isActive ? {
        background: 'linear-gradient(90deg, rgba(0,212,232,0.12) 0%, transparent 100%)',
        color: 'var(--color-primary)',
        fontWeight: 600,
      } : {}}
    >
      {({ isActive }) => (
        <>
          <link.icon
            size={18}
            style={{ color: isActive ? 'var(--color-primary)' : undefined, flexShrink: 0 }}
            className={!isActive ? 'group-hover:scale-110 transition-transform' : ''}
          />
          <span style={{ flex: 1 }}>{link.label}</span>
          {isActive && (
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--color-primary)',
              boxShadow: '0 0 8px var(--color-primary)',
            }} />
          )}
        </>
      )}
    </NavLink>
  );
};

// Sidebar 
const Sidebar = () => {
  const { isPro, upgradeToPro, downgradeToFree, tier } = useSubscription();
  const [modalOpen, setModalOpen] = useState(false);
  const [lockedFeatureLabel, setLockedFeatureLabel] = useState('');

  const handleLockedClick = (label) => {
    setLockedFeatureLabel(label || '');
    setModalOpen(true);
  };

  return (
    <>
      <aside
        style={{
          position: 'fixed', left: 0, top: 0, height: '100%', width: 264,
          background: 'linear-gradient(180deg, #0f0f14 0%, #0a0a0d 100%)',
          borderRight: '1px solid rgba(42,42,56,0.8)',
          display: 'flex', flexDirection: 'column',
          paddingTop: '1.5rem', paddingBottom: '1.5rem',
          zIndex: 50, overflowY: 'auto',
        }}
      >
        {/*  Logo  */}
        <div style={{ padding: '0 1.25rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38,
              background: 'linear-gradient(135deg, #00d4e8 0%, #3ddba0 100%)',
              borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 18px rgba(0,212,232,0.35)',
            }}>
              <Zap size={20} color="#003340" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '0.08em', lineHeight: 1 }}
                className="gradient-text">
                Findash
              </div>
              <div style={{ fontSize: 9, color: 'var(--color-on-surface-variant)', letterSpacing: '0.18em', marginTop: 3 }}>
                MARKET INTELLIGENCE
              </div>
            </div>
          </div>
        </div>

        {/* Plan pill  */}
        <div style={{ padding: '0 1rem', marginBottom: '1.25rem' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '6px 10px', borderRadius: 9,
            background: isPro
              ? 'linear-gradient(90deg, rgba(0,212,232,0.14), rgba(61,219,160,0.08))'
              : 'rgba(20,20,25,0.7)',
            border: `1px solid ${isPro ? 'rgba(0,212,232,0.25)' : 'rgba(42,42,56,0.8)'}`,
          }}>
            {isPro
              ? <Crown size={12} color="var(--color-primary)" />
              : <Zap size={12} color="var(--color-on-surface-variant)" />
            }
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
              color: isPro ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
            }}>
              {isPro ? 'PRO PLAN' : 'FREE PLAN'}
            </span>
            {/* Dev-only quick toggle */}
            <button
              onClick={() => isPro ? downgradeToFree() : upgradeToPro()}
              title="Toggle plan (dev)"
              style={{
                marginLeft: 'auto', fontSize: 8, padding: '1px 5px', borderRadius: 4,
                background: 'rgba(42,42,56,0.6)', border: '1px solid rgba(42,42,56,0.9)',
                color: 'var(--color-on-surface-variant)', cursor: 'pointer', fontWeight: 700,
              }}
            >
              {isPro ? 'FREE' : 'PRO'}
            </button>
          </div>
        </div>

        {/*  Nav section label  */}
        <div style={{ padding: '0 1.25rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--color-on-surface-variant)', opacity: 0.6 }}>
            NAVIGATION
          </span>
        </div>

        {/* ── Nav links */}
        <nav style={{ flex: 1, padding: '0 0.75rem' }}>
          {NAV_LINKS.map((link) => (
            <SidebarLink
              key={link.to}
              link={link}
              isPro={isPro}
              onLockedClick={handleLockedClick}
            />
          ))}
        </nav>

        {/* ── AI Insights counter (free only) */}
        {/* {!isPro && (
          <div style={{ padding: '0 1rem', marginTop: '1rem' }}>
            <AiInsightsCounter />
          </div>
        )} */}

        {/* ── Upgrade / Pro banner  */}
        
        {/* {!isPro && (
          <div style={{ padding: '0 1rem', marginTop: '1rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(0,212,232,0.12) 0%, rgba(61,219,160,0.08) 100%)',
              border: '1px solid rgba(0,212,232,0.2)',
              borderRadius: 14, padding: '1rem', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -20, right: -20, width: 70, height: 70,
                background: 'radial-gradient(circle, rgba(0,212,232,0.25) 0%, transparent 70%)',
                borderRadius: '50%', pointerEvents: 'none',
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <Crown size={13} color="var(--color-primary)" />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.05em' }}>
                  PRO ACCESS
                </span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--color-on-surface-variant)', lineHeight: 1.5, marginBottom: 10 }}>
                Institutional-grade alpha signals & advanced analytics.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                style={{
                  width: '100%', padding: '7px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                  color: 'var(--color-on-primary)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em',
                  transition: 'opacity 0.15s',
                  boxShadow: '0 3px 14px rgba(0,212,232,0.2)',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                UPGRADE NOW
              </button>
            </div>
          </div>
        )} */}

        {/*  Pro member section */}
        {isPro && (
          <div style={{ padding: '0 1rem', marginTop: '1rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(0,212,232,0.10) 0%, rgba(61,219,160,0.06) 100%)',
              border: '1px solid rgba(0,212,232,0.2)',
              borderRadius: 12, padding: '0.85rem 1rem',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'linear-gradient(135deg, #00d4e8, #3ddba0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Crown size={16} color="#003340" strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-primary)' }}>Pro Member</div>
                <div style={{ fontSize: 10, color: 'var(--color-on-surface-variant)' }}>All features unlocked</div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom links  */}
        <div style={{ padding: '0.75rem 0.75rem 0', marginTop: '0.75rem' }}>
          {[
            { icon: HelpCircle, label: 'Support' },
            { icon: Settings, label: 'Settings' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="group" style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px',
              borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 500,
              color: 'var(--color-on-surface-variant)', transition: 'all 0.15s',
              marginBottom: 2,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--color-on-surface)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-on-surface-variant)'; }}
            >
              <Icon size={16} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </aside>

      <UpgradeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        featureLabel={lockedFeatureLabel}
      />
    </>
  );
};

export default Sidebar;
