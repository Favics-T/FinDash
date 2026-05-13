import React from 'react';
import { Bell, Settings, User } from 'lucide-react';

const RightNav = () => {
  return (
    <div className="flex items-center gap-2">
      {[Bell, Settings].map((Icon, i) => (
        <button
          key={i}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border-none bg-transparent text-[var(--color-on-surface-variant)] transition-all duration-150 hover:bg-[rgba(255,255,255,0.06)] hover:text-[var(--color-on-surface)]"
        >
          <Icon size={17} />
        </button>
      ))}

      <div className="mx-[6px] h-7 w-px bg-[var(--color-outline-variant)]" />

      <div className="flex cursor-pointer items-center gap-[10px] rounded-[10px] px-2 py-1 transition-colors duration-150 hover:bg-[rgba(255,255,255,0.04)]">
        <div className="text-right">
          <p className="text-[12px] font-bold leading-[1.2] text-[var(--color-on-surface)]">
            Institutional Node
          </p>

          <p className="mt-[2px] text-[10px] leading-[1.2] text-[var(--color-secondary)]">
            ● Verified Access
          </p>
        </div>

        <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[rgba(0,212,232,0.3)] bg-[linear-gradient(135deg,rgba(0,212,232,0.15)_0%,rgba(61,219,160,0.1)_100%)]">
          <User size={17} color="var(--color-primary)" />
        </div>
      </div>
    </div>
  );
};

export default RightNav;