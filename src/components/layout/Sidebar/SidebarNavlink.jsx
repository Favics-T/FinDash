import { NavLink } from 'react-router-dom';
import { cn } from '../../../utils/utils';
import { ProBadge } from '../../ui/ProBadge';

export const SidebarNavLink = ({ link, isPro, onLockedClick }) => {
  const isLocked = link.pro && !isPro;

  if (isLocked) {
    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={`${link.label} — Pro feature. Click to upgrade.`}
        onClick={() => onLockedClick(link.featureLabel)}
        onKeyDown={(e) => e.key === 'Enter' && onLockedClick(link.featureLabel)}
        className="group flex items-center gap-3 px-4 py-2.5 rounded-xl mb-1 cursor-pointer text-sm font-medium transition-all duration-200 text-[var(--color-on-surface-variant)] opacity-65 hover:bg-[rgba(255,255,255,0.03)] hover:opacity-90"
      >
        <link.icon size={18} className="shrink-0" />
        <span className="flex-1">{link.label}</span>
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
        isActive ? 'sidebar-active-glow' : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]',
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
            style={{ color: isActive ? 'var(--color-primary)' : undefined }}
            className={cn('shrink-0', !isActive && 'group-hover:scale-110 transition-transform')}
          />
          <span className="flex-1">{link.label}</span>
          {isActive && (
            <span
              aria-hidden="true"
              className="w-[6px] h-[6px] rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]"
            />
          )}
        </>
      )}
    </NavLink>
  );
};