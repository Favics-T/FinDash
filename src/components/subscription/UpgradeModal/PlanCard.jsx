import { Check, Zap, Crown, Sparkles, Shield, TrendingUp, BarChart2, Bell } from 'lucide-react';
import { PLAN_META, PLAN_TIERS } from '../../../constants/plans';

const BULLET_ICON_COMPONENTS = [TrendingUp, BarChart2, Sparkles, Shield, Bell, Crown];

const FeatureItem = ({ icon: Icon, label, isPro }) => (
  <li className="flex items-center gap-2">
    <span className={`w-[18px] h-[18px] rounded-[5px] shrink-0 flex items-center justify-center ${isPro ? 'bg-[rgba(0,212,232,0.12)] text-[var(--color-primary)]' : 'bg-[rgba(42,42,56,0.6)] text-[var(--color-on-surface-variant)]'}`}>
      <Icon size={13} />
    </span>
    <span className={`text-[12px] leading-[1.4] ${isPro ? 'text-[var(--color-on-surface)]' : 'text-[var(--color-on-surface-variant)]'}`}>
      {label}
    </span>
  </li>
);

export const PlanCard = ({ planKey, isCurrentPlan, onAction, isLoading }) => {
  const meta   = PLAN_META[planKey];
  const isPro  = planKey === PLAN_TIERS.PRO;

  return (
    <div className={`flex-1 min-w-0 rounded-[18px] relative overflow-hidden transition-transform duration-200 p-[1.75rem_1.5rem] ${isPro ? 'border-[1.5px] border-[rgba(0,212,232,0.45)] bg-gradient-to-br from-[rgba(0,212,232,0.07)] to-[rgba(61,219,160,0.04)]' : 'border-[1.5px] border-[rgba(42,42,56,0.8)] bg-[rgba(20,20,25,0.6)]'}`}>

      {isPro && <div className="absolute -top-10 -right-10 w-[140px] h-[140px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(0,212,232,0.18)_0%,transparent_70%)]" />}

      {isPro && meta.badge && (
        <div className="absolute top-[18px] right-[18px] bg-gradient-to-r from-[#00d4e8] to-[#3ddba0] rounded-full px-2.5 py-[3px] text-[9px] font-extrabold text-[#003340] tracking-[0.08em]">
          {meta.badge.toUpperCase()}
        </div>
      )}

      <div className={`w-11 h-11 rounded-[12px] mb-4 flex items-center justify-center ${isPro ? 'bg-gradient-to-br from-[#00d4e8] to-[#3ddba0] shadow-[0_0_20px_rgba(0,212,232,0.3)]' : 'bg-[rgba(42,42,56,0.8)]'}`}>
        {isPro
          ? <Crown size={22} color="#003340" strokeWidth={2.5} />
          : <Zap   size={22} color="#8888a0" strokeWidth={2.5} />}
      </div>

      <p className={`text-[11px] font-bold tracking-[0.12em] mb-2 ${isPro ? 'text-[var(--color-primary)]' : 'text-[var(--color-on-surface-variant)]'}`}>
        {meta.name.toUpperCase()}
      </p>

      <div className="flex items-baseline gap-1 mb-[0.35rem]">
        <span className="text-[32px] font-extrabold text-[var(--color-on-surface)] font-mono">{meta.price}</span>
        <span className="text-[12px] text-[var(--color-on-surface-variant)]">/{meta.period}</span>
      </div>

      <p className="text-[12px] text-[var(--color-on-surface-variant)] leading-[1.5] mb-5">{meta.description}</p>

      {isCurrentPlan ? (
        <div className="w-full py-[9px] rounded-[10px] text-center bg-[rgba(42,42,56,0.6)] text-[var(--color-on-surface-variant)] font-bold text-[12px] tracking-[0.06em] border border-[rgba(42,42,56,0.9)]">
          CURRENT PLAN
        </div>
      ) : (
        <button
          onClick={onAction}
          disabled={isLoading}
          aria-busy={isLoading}
          className={`w-full py-[10px] rounded-[10px] border-none font-extrabold text-[12px] tracking-[0.08em] transition-all duration-150 ${isLoading ? 'opacity-70 cursor-default' : 'cursor-pointer hover:opacity-[0.88] hover:-translate-y-[1px]'} ${isPro ? 'bg-gradient-to-r from-[#00d4e8] to-[#3ddba0] text-[#003340] shadow-[0_4px_20px_rgba(0,212,232,0.25)]' : 'bg-[rgba(42,42,56,0.6)] text-[var(--color-on-surface-variant)]'}`}
        >
          {isLoading ? 'Upgrading…' : isPro ? 'UPGRADE TO PRO' : 'DOWNGRADE'}
        </button>
      )}

      <ul className="mt-5 list-none p-0 flex flex-col gap-2">
        {meta.highlights.map((item, i) => {
          const Icon = isPro ? BULLET_ICON_COMPONENTS[i % BULLET_ICON_COMPONENTS.length] : Check;
          return <FeatureItem key={item} icon={Icon} label={item} isPro={isPro} />;
        })}
      </ul>
    </div>
  );
};