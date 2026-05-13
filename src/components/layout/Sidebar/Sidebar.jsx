import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, LineChart, Database, Star,
  ArrowLeftRight, HelpCircle, Settings, Zap, ChevronUp
} from 'lucide-react';
import { cn } from '../../../hooks/utils';

const Sidebar = () => {
  const links = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/markets', icon: LineChart, label: 'Markets' },
    { to: '/detail', icon: Database, label: 'Coin Detail' },
    { to: '/watchlist', icon: Star, label: 'Watchlist' },
    { to: '/compare', icon: ArrowLeftRight, label: 'Compare' },
  ];

  return (
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
      {/* Logo */}
      <div style={{ padding: '0 1.25rem', marginBottom: '2.5rem' }}>
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

      {/* Section label */}
      <div style={{ padding: '0 1.25rem', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--color-on-surface-variant)', opacity: 0.6 }}>
          NAVIGATION
        </span>
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, padding: '0 0.75rem' }}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) => cn(
              'group flex items-center gap-3 px-4 py-2.5 rounded-xl mb-1 transition-all duration-200 cursor-pointer text-sm font-medium',
              isActive
                ? 'sidebar-active-glow'
                : 'text-on-surface-variant hover:text-on-surface'
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
                <span>{link.label}</span>
                {isActive && (
                  <span style={{
                    marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%',
                    background: 'var(--color-primary)',
                    boxShadow: '0 0 8px var(--color-primary)',
                  }} />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Upgrade Banner */}
      <div style={{ padding: '0 1rem', marginTop: '1.5rem' }}>
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
            <ChevronUp size={14} color="var(--color-primary)" />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.05em' }}>
              PRO ACCESS
            </span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--color-on-surface-variant)', lineHeight: 1.5, marginBottom: 10 }}>
            Institutional-grade alpha signals & advanced analytics.
          </p>
          <button style={{
            width: '100%', padding: '7px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
            color: 'var(--color-on-primary)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em',
            transition: 'opacity 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            UPGRADE NOW
          </button>
        </div>
      </div>

      {/* Bottom links */}
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
  );
};

export default Sidebar;
