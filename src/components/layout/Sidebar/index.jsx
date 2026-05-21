import { useState, useCallback } from 'react';
import { HelpCircle, Settings, Zap, Crown } from 'lucide-react';
import { useSubscription } from '../../../hooks/useSubscription';
import { UpgradeModal } from '../../subscription/UpgradeModal';
import { NAV_LINKS } from '../../../data/navigation';
import { SidebarNavLink } from './SidebarNavlink';

const BOTTOM_LINKS = [
  { icon: HelpCircle, label: 'Support' },
  { icon: Settings,   label: 'Settings' },
];

const Sidebar = () => {
  const { isPro, upgradeToPro, downgradeToFree } = useSubscription();
  const [modalOpen, setModalOpen]           = useState(false);
  const [lockedFeatureLabel, setLockedFeatureLabel] = useState('');

  const handleLockedClick = useCallback((label) => {
    setLockedFeatureLabel(label ?? '');
    setModalOpen(true);
  }, []);

  const handleCloseModal  = useCallback(() => setModalOpen(false), []);
  const handleTogglePlan  = useCallback(
    () => isPro ? downgradeToFree() : upgradeToPro(),
    [isPro, upgradeToPro, downgradeToFree],
  );

  return (
    <>
      <aside
        aria-label="Main navigation"
        className="fixed left-0 top-0 h-full w-[264px] z-50 overflow-y-auto flex flex-col pt-6 pb-6 border-r border-[rgba(42,42,56,0.8)] bg-gradient-to-b from-[#0f0f14] to-[#0a0a0d]"
      >
        {/* Logo */}
        <div className="px-5 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center bg-gradient-to-br from-[#00d4e8] to-[#3ddba0] shadow-[0_0_18px_rgba(0,212,232,0.35)]">
              <Zap size={20} color="#003340" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-[16px] font-extrabold tracking-[0.08em] leading-none gradient-text">
                Findash
              </div>
              <div className="text-[9px] text-[var(--color-on-surface-variant)] tracking-[0.18em] mt-[3px]">
                MARKET INTELLIGENCE
              </div>
            </div>
          </div>
        </div>

        {/* Plan pill */}
        <div className="px-4 mb-5">
          <div className={`flex items-center gap-[7px] px-2.5 py-[6px] rounded-[9px] border ${isPro ? 'bg-[linear-gradient(90deg,rgba(0,212,232,0.14),rgba(61,219,160,0.08))] border-[rgba(0,212,232,0.25)]' : 'bg-[rgba(20,20,25,0.7)] border-[rgba(42,42,56,0.8)]'}`}>
            {isPro
              ? <Crown size={12} className="text-[var(--color-primary)]" />
              : <Zap   size={12} className="text-[var(--color-on-surface-variant)]" />}
            <span className={`text-[10px] font-bold tracking-[0.1em] ${isPro ? 'text-[var(--color-primary)]' : 'text-[var(--color-on-surface-variant)]'}`}>
              {isPro ? 'PRO PLAN' : 'FREE PLAN'}
            </span>
            {/* TODO: remove before production */}
            <button
              onClick={handleTogglePlan}
              title="Toggle plan (dev only)"
              className="ml-auto text-[8px] px-[5px] py-[1px] rounded-[4px] cursor-pointer font-bold bg-[rgba(42,42,56,0.6)] border border-[rgba(42,42,56,0.9)] text-[var(--color-on-surface-variant)]"
            >
              {isPro ? 'FREE' : 'PRO'}
            </button>
          </div>
        </div>

        {/* Nav label */}
        <div className="px-5 mb-2">
          <span className="text-[9px] font-bold tracking-[0.18em] text-[var(--color-on-surface-variant)] opacity-60">
            NAVIGATION
          </span>
        </div>

        {/* Nav links */}
        <nav aria-label="Site navigation" className="flex-1 px-3">
          {NAV_LINKS.map((link) => (
            <SidebarNavLink
              key={link.to}
              link={link}
              isPro={isPro}
              onLockedClick={handleLockedClick}
            />
          ))}
        </nav>

        {/* Pro member badge */}
        {isPro && (
          <div className="px-4 mt-4">
            <div className="flex items-center gap-2.5 px-4 py-[0.85rem] rounded-[12px] border border-[rgba(0,212,232,0.2)] bg-[linear-gradient(135deg,rgba(0,212,232,0.10)_0%,rgba(61,219,160,0.06)_100%)]">
              <div className="w-8 h-8 rounded-[8px] shrink-0 flex items-center justify-center bg-gradient-to-br from-[#00d4e8] to-[#3ddba0]">
                <Crown size={16} color="#003340" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-[11px] font-bold text-[var(--color-primary)]">Pro Member</div>
                <div className="text-[10px] text-[var(--color-on-surface-variant)]">All features unlocked</div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom links */}
        <div className="px-3 pt-3 mt-3">
          {BOTTOM_LINKS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              role="button"
              tabIndex={0}
              aria-label={label}
              className="flex items-center gap-2.5 px-[14px] py-[9px] rounded-[10px] cursor-pointer text-[13px] font-medium text-[var(--color-on-surface-variant)] transition-all duration-150 mb-0.5 hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--color-on-surface)]"
            >
              <Icon size={16} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </aside>

      <UpgradeModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        featureLabel={lockedFeatureLabel}
      />
    </>
  );
};

export default Sidebar;