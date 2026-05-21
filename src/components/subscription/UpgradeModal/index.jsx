// UpgradeModal/index.jsx
import { useRef, useState } from 'react';
import { X, Shield, Crown } from 'lucide-react';
import { useSubscription } from '../../../hooks/useSubscription';
import { useModalBehavior } from '../../../hooks/useModalBehavior';
import { PLAN_TIERS } from '../../../constants/plans';
import { PlanCard } from './PlanCard';

export const UpgradeModal = ({ isOpen, onClose, featureLabel }) => {
  const { tier, upgradeToPro, downgradeToFree } = useSubscription();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const overlayRef = useRef(null);

  useModalBehavior(isOpen, onClose);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    upgradeToPro();
    setIsUpgrading(false);
    onClose();
  };

  const handleDowngrade = () => { downgradeToFree(); onClose(); };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={featureLabel ? `Unlock ${featureLabel} with Pro` : 'Upgrade to Findash Pro'}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/75 backdrop-blur-[8px] animate-[fadeIn_0.2s_ease_both]"
    >
      <div className="w-full max-w-[780px] max-h-[90vh] flex flex-col overflow-hidden rounded-[24px]
        border border-outline-variant
        bg-surface
        shadow-[0_32px_80px_rgba(0,0,0,0.3),0_0_80px_rgba(0,212,232,0.06)]
        animate-[slideUpModal_0.3s_cubic-bezier(0.16,1,0.3,1)_both]"
      >
        {/* Header */}
        <div className="relative px-8 pt-7 pb-5 border-b border-outline-variant bg-[linear-gradient(90deg,rgba(0,212,232,0.04)_0%,transparent_100%)]">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-lg border-none cursor-pointer
              flex items-center justify-center
              bg-surface-container text-on-surface-variant
              transition-all duration-150
              hover:bg-surface-container-high hover:text-on-surface"
          >
            <X size={15} />
          </button>

          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#00d4e8] to-[#3ddba0] shadow-[0_0_16px_rgba(0,212,232,0.3)]">
              <Crown size={16} color="#003340" strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-bold tracking-[0.12em] text-primary">FINDASH PRO</span>
          </div>

          <h2 className="text-[22px] font-extrabold text-on-surface leading-[1.2] mb-1.5">
            {featureLabel ? `Unlock "${featureLabel}" with Pro` : 'Upgrade to Findash Pro'}
          </h2>
          <p className="text-[13px] text-on-surface-variant leading-[1.5]">
            Get institutional-grade alpha signals, unlimited watchlists, advanced analytics, and more.
          </p>
        </div>

        {/* Plan cards */}
        <div className="flex gap-4 p-8 overflow-auto flex-wrap">
          <PlanCard planKey={PLAN_TIERS.FREE} isCurrentPlan={tier === PLAN_TIERS.FREE} onAction={handleDowngrade} />
          <PlanCard planKey={PLAN_TIERS.PRO}  isCurrentPlan={tier === PLAN_TIERS.PRO}  onAction={handleUpgrade} isLoading={isUpgrading} />
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 px-8 pt-3 pb-5 border-t border-outline-variant">
          <Shield size={13} className="text-on-surface-variant" />
          <span className="text-[11px] text-on-surface-variant leading-[1.4]">
            Cancel anytime · Secure payment via Stripe · No hidden fees
          </span>
        </div>
      </div>
    </div>
  );
};