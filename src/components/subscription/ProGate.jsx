import { useState } from 'react';
import { Lock } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import { UpgradeModal } from './UpgradeModal';
import { ProBadge } from '../ui/ProBadge';

export { ProBadge } from '../ui/ProBadge';

const useGateModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) };
};

export const ProGate = ({
  featureKey,
  featureLabel,
  blur = 6,
  children,
  compact = false,
  inline = false,
}) => {
  const { isPro, canAccess } = useSubscription();
  const { isOpen, open, close } = useGateModal();

  const hasAccess = featureKey ? canAccess(featureKey) : isPro;
  if (hasAccess) return <>{children}</>;

  return (
    <>
      {inline  ? <InlineVariant  featureLabel={featureLabel} onOpen={open} /> :
       compact ? <CompactVariant onOpen={open}>{children}</CompactVariant> :
                 <OverlayVariant featureLabel={featureLabel} blur={blur} onOpen={open}>{children}</OverlayVariant>}
      <UpgradeModal isOpen={isOpen} onClose={close} featureLabel={featureLabel} />
    </>
  );
};

const InlineVariant = ({ featureLabel, onOpen }) => (
  <button
    onClick={onOpen}
    className="inline-flex items-center gap-[5px] px-2.5 py-[5px] rounded-lg border-none cursor-pointer bg-[rgba(0,212,232,0.08)] text-[var(--color-primary)] text-[12px] font-bold transition-all duration-150 hover:bg-[rgba(0,212,232,0.14)]"
  >
    <Lock size={11} />
    {featureLabel ?? 'Pro Feature'}
    <ProBadge />
  </button>
);

const CompactVariant = ({ children, onOpen }) => (
  <div
    role="button"
    tabIndex={0}
    aria-label="Upgrade to Pro to unlock this feature"
    onClick={onOpen}
    onKeyDown={(e) => e.key === 'Enter' && onOpen()}
    className="flex items-center justify-between gap-[6px] cursor-pointer opacity-60 transition-opacity duration-150 hover:opacity-85"
  >
    {children}
    <div className="flex items-center gap-1">
      <Lock size={11} className="text-[var(--color-on-surface-variant)]" />
      <ProBadge />
    </div>
  </div>
);

const OverlayVariant = ({ featureLabel, blur, children, onOpen }) => (
  <div className="relative isolate">
    <div
      className="pointer-events-none select-none opacity-55"
      style={{ filter: `blur(${blur}px)` }}
    >
      {children}
    </div>

    <div
      role="button"
      tabIndex={0}
      aria-label={featureLabel ? `Unlock ${featureLabel} with Pro` : 'Upgrade to Pro'}
      onClick={onOpen}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
      className="absolute inset-0 z-[2] flex flex-col items-center justify-center cursor-pointer rounded-[inherit] bg-[rgba(9,9,11,0.45)] backdrop-blur-[1px]"
    >
      <div className="w-[52px] h-[52px] rounded-full mb-[10px] flex items-center justify-center bg-gradient-to-br from-[rgba(0,212,232,0.15)] to-[rgba(61,219,160,0.10)] border border-[rgba(0,212,232,0.3)] shadow-[0_0_24px_rgba(0,212,232,0.15)] animate-pulse-glow">
        <Lock size={22} className="text-[var(--color-primary)]" strokeWidth={2} />
      </div>

      <ProBadge className="mb-2 text-[9px] px-2 py-[3px]" />

      <p className="text-[12px] font-semibold text-[var(--color-on-surface)] text-center max-w-[180px] leading-[1.4] mb-3">
        {featureLabel ? `"${featureLabel}" is a Pro feature` : 'Upgrade to unlock advanced insights'}
      </p>

      <button className="px-[18px] py-[7px] rounded-[9px] border-none cursor-pointer bg-gradient-to-r from-[#00d4e8] to-[#3ddba0] text-[#003340] font-extrabold text-[11px] tracking-[0.06em] shadow-[0_4px_16px_rgba(0,212,232,0.25)] transition-transform duration-150 hover:scale-[1.04]">
        UPGRADE TO PRO
      </button>
    </div>
  </div>
);