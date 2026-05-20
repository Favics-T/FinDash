import React, { useState } from 'react';
import { Bell, Settings, User, Crown } from 'lucide-react';
import { useSubscription } from '../../../hooks/useSubscription';
import { ProBadge } from '../../subscription/ProGate';
import { UpgradeModal } from '../../subscription/UpgradeModal';

const RightNav = () => {
  const { isPro } = useSubscription();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Bell – shows Pro badge & upgrade prompt for free users */}
        <button
          onClick={() => { if (!isPro) setModalOpen(true); }}
          className="relative flex h-[34px] w-[34px] items-center justify-center rounded-lg border-none bg-transparent text-[var(--color-on-surface-variant)] transition-all duration-150 hover:bg-[rgba(255,255,255,0.06)] hover:text-[var(--color-on-surface)]"
          title={isPro ? 'Alerts' : 'Real-Time Alerts (Pro)'}
        >
          <Bell size={17} />
          {!isPro && (
            <span style={{
              position: 'absolute', top: 2, right: 2,
              width: 7, height: 7, borderRadius: '50%',
              background: 'var(--color-primary)',
              boxShadow: '0 0 5px var(--color-primary)',
            }} />
          )}
        </button>

        <button className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border-none bg-transparent text-[var(--color-on-surface-variant)] transition-all duration-150 hover:bg-[rgba(255,255,255,0.06)] hover:text-[var(--color-on-surface)]">
          <Settings size={17} />
        </button>

        <div className="mx-[6px] h-7 w-px bg-[var(--color-outline-variant)]" />

        {/* User info + plan badge */}
        <div
          className="flex cursor-pointer items-center gap-[10px] rounded-[10px] px-2 py-1 transition-colors duration-150 hover:bg-[rgba(255,255,255,0.04)]"
          onClick={() => { if (!isPro) setModalOpen(true); }}
        >
          <div className="text-right">
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, justifyContent: 'flex-end', marginBottom: 2 }}>
              <p className="text-[12px] font-bold leading-[1.2] text-[var(--color-on-surface)]">
                {isPro ? 'Pro Member' : 'Free User'}
              </p>
              {isPro && <ProBadge />}
            </div>
            <p style={{ fontSize: 10, color: isPro ? 'var(--color-secondary)' : 'var(--color-on-surface-variant)', lineHeight: 1.2 }}>
              {isPro ? '● All Features Unlocked' : '● Upgrade for full access'}
            </p>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 34, height: 34, borderRadius: '50%',
            border: `1px solid ${isPro ? 'rgba(0,212,232,0.4)' : 'rgba(42,42,56,0.8)'}`,
            background: isPro
              ? 'linear-gradient(135deg, rgba(0,212,232,0.18) 0%, rgba(61,219,160,0.12) 100%)'
              : 'rgba(20,20,25,0.7)',
            boxShadow: isPro ? '0 0 14px rgba(0,212,232,0.15)' : 'none',
            transition: 'all 0.2s',
          }}>
            {isPro
              ? <Crown size={16} color="var(--color-primary)" />
              : <User size={16} color="var(--color-on-surface-variant)" />
            }
          </div>
        </div>
      </div>

      <UpgradeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default RightNav;