import { Crown } from 'lucide-react';
import { cn } from '../../utility/utils';

export const ProBadge = ({ className = '' }) => (
  <span
    aria-label="Pro feature"
    className={cn(
      'inline-flex items-center gap-[3px] px-1.5 py-[2px] rounded-[5px] shrink-0',
      'bg-gradient-to-r from-[rgba(0,212,232,0.18)] to-[rgba(61,219,160,0.12)]',
      'border border-[rgba(0,212,232,0.3)]',
      'text-[8px] font-extrabold tracking-[0.1em] text-[var(--color-primary)]',
      className
    )}
  >
    <Crown size={8} />
    PRO
  </span>
);