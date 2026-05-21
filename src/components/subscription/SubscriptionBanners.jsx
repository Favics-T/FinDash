import { useState } from 'react';
import { Crown, Sparkles, X, ChevronRight } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import { UpgradeModal } from './UpgradeModal';

// ── FreeTrialBanner ───────────────────────────────────────────────────────────
export const FreeTrialBanner = () => {
  const { isPro } = useSubscription();
  const [dismissed, setDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  if (isPro || dismissed) return null;

  return (
    <>
      <div className="relative flex items-center justify-between gap-4 overflow-hidden px-6 py-[0.6rem] border-b border-[rgba(0,212,232,0.18)] bg-[linear-gradient(90deg,rgba(0,212,232,0.10)_0%,rgba(61,219,160,0.07)_50%,rgba(0,212,232,0.05)_100%)]">
        {/* Shimmer sweep */}
        <div className="pointer-events-none absolute inset-0 animate-[shimmer_3s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent_0%,rgba(0,212,232,0.06)_50%,transparent_100%)]" />

        <div className="flex items-center gap-2.5">
          <div className="w-[26px] h-[26px] rounded-[7px] shrink-0 flex items-center justify-center bg-gradient-to-br from-[#00d4e8] to-[#3ddba0] shadow-[0_0_12px_rgba(0,212,232,0.3)]">
            <Sparkles size={13} color="#003340" strokeWidth={2.5} />
          </div>
          <span className="text-[12px] text-[var(--color-on-surface)] font-medium leading-[1.4]">
            <strong className="text-[var(--color-primary)] font-bold">Start your 7-day Pro trial free.</strong>
            {' '}Unlock advanced analytics, unlimited watchlists & AI insights.
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-[5px] px-[14px] py-[5px] rounded-lg border-none cursor-pointer whitespace-nowrap bg-gradient-to-r from-[#00d4e8] to-[#3ddba0] text-[#003340] font-extrabold text-[11px] tracking-[0.06em] shadow-[0_2px_12px_rgba(0,212,232,0.25)] transition-all duration-150 hover:opacity-[0.88] hover:scale-[1.02]"
          >
            <Crown size={12} />
            TRY PRO FREE
            <ChevronRight size={12} />
          </button>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="w-6 h-6 rounded-[6px] border-none cursor-pointer flex items-center justify-center bg-transparent text-[var(--color-on-surface-variant)] transition-colors duration-150 hover:text-[var(--color-on-surface)]"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <UpgradeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

// ── AiInsightsCounter ─────────────────────────────────────────────────────────
export const AiInsightsCounter = ({ className = '' }) => {
  const { isPro, aiInsightsRemaining, limits } = useSubscription();
  const [modalOpen, setModalOpen] = useState(false);

  if (isPro) return null;

  const pct   = (aiInsightsRemaining / limits.aiInsightsPerDay) * 100;
  const isLow = aiInsightsRemaining <= 1;

  return (
    <>
      <div
        onClick={isLow ? () => setModalOpen(true) : undefined}
        className={`px-[0.85rem] py-[0.65rem] rounded-[10px] border transition-all duration-200 ${isLow ? 'bg-[rgba(255,107,107,0.08)] border-[rgba(255,107,107,0.2)] cursor-pointer' : 'bg-[rgba(0,212,232,0.06)] border-[rgba(0,212,232,0.15)] cursor-default'} ${className}`}
      >
        <div className="flex items-center justify-between gap-3 mb-[5px]">
          <div className="flex items-center gap-[5px]">
            <Sparkles size={12} className={isLow ? 'text-[var(--color-error)]' : 'text-[var(--color-primary)]'} />
            <span className={`text-[10px] font-bold tracking-[0.1em] ${isLow ? 'text-[var(--color-error)]' : 'text-[var(--color-primary)]'}`}>
              AI INSIGHTS
            </span>
          </div>
          <span className={`text-[11px] font-bold font-mono ${isLow ? 'text-[var(--color-error)]' : 'text-[var(--color-on-surface)]'}`}>
            {aiInsightsRemaining}/{limits.aiInsightsPerDay}
          </span>
        </div>

        <div className="h-[3px] bg-[rgba(42,42,56,0.8)] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-[width] duration-500 ease-in-out ${isLow ? 'bg-[var(--color-error)]' : 'bg-gradient-to-r from-[#00d4e8] to-[#3ddba0]'}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        {isLow && (
          <p className="text-[10px] text-[var(--color-error)] mt-[5px] leading-[1.3]">
            {aiInsightsRemaining === 0 ? 'Limit reached · ' : 'Almost out · '}
            <u className="cursor-pointer">Upgrade for unlimited</u>
          </p>
        )}
      </div>

      <UpgradeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} featureLabel="Unlimited AI Insights" />
    </>
  );
};