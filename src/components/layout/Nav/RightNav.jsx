import { useState } from 'react';
import { Bell, Settings, User, Crown } from 'lucide-react';
import { useSubscription } from '../../../hooks/useSubscription';
import { ProBadge } from '../../ui/ProBadge';
import { UpgradeModal } from '../../subscription/UpgradeModal';

const RightNav = () => {
  const { isPro } = useSubscription();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">

        {/* Alerts bell */}
        <button
          onClick={() => { if (!isPro) setModalOpen(true); }}
          title={isPro ? 'Alerts' : 'Real-Time Alerts (Pro)'}
          className="relative flex h-[34px] w-[34px] items-center justify-center rounded-lg
            bg-transparent border-none cursor-pointer
            text-on-surface-variant
            transition-all duration-150
            hover:bg-surface-container hover:text-on-surface"
        >
          <Bell size={17} />
          {!isPro && (
            <span className="absolute top-[2px] right-[2px] w-[7px] h-[7px] rounded-full
              bg-primary shadow-[0_0_5px_var(--color-primary)]" />
          )}
        </button>

        {/* Settings */}
        <button
          className="flex h-[34px] w-[34px] items-center justify-center rounded-lg
            bg-transparent border-none cursor-pointer
            text-on-surface-variant
            transition-all duration-150
            hover:bg-surface-container hover:text-on-surface"
        >
          <Settings size={17} />
        </button>

        {/* Divider */}
        <div className="mx-[6px] h-7 w-px bg-outline-variant" />

        {/* User info */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => { if (!isPro) setModalOpen(true); }}
          onKeyDown={(e) => e.key === 'Enter' && !isPro && setModalOpen(true)}
          className="flex cursor-pointer items-center gap-[10px] rounded-[10px] px-2 py-1
            transition-colors duration-150
            hover:bg-surface-container"
        >
          <div className="text-right">
            <div className="flex items-center gap-[5px] justify-end mb-[2px]">
              <p className="text-[12px] font-bold leading-[1.2] text-on-surface">
                {isPro ? 'Pro Member' : 'Free User'}
              </p>
              {isPro && <ProBadge />}
            </div>
            <p className={`text-[10px] leading-[1.2] ${isPro ? 'text-secondary' : 'text-on-surface-variant'}`}>
              {isPro ? '● All Features Unlocked' : '● Upgrade for full access'}
            </p>
          </div>

          {/* Avatar */}
          <div className={`flex items-center justify-center w-[34px] h-[34px] rounded-full border transition-all duration-200
            ${isPro
              ? 'border-[rgba(0,212,232,0.4)] bg-[linear-gradient(135deg,rgba(0,212,232,0.18)_0%,rgba(61,219,160,0.12)_100%)] shadow-[0_0_14px_rgba(0,212,232,0.15)]'
              : 'border-outline-variant bg-surface-container'
            }`}
          >
            {isPro
              ? <Crown size={16} className="text-primary" />
              : <User  size={16} className="text-on-surface-variant" />
            }
          </div>
        </div>
      </div>

      <UpgradeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default RightNav;