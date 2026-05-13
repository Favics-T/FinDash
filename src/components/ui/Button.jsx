import React from 'react';
import { cn } from '../../hooks/utils';

const variantStyles = {
  primary:
    'border-none bg-[linear-gradient(90deg,var(--color-primary)_0%,var(--color-secondary)_100%)] text-[var(--color-on-primary)] shadow-[0_4px_20px_rgba(0,212,232,0.25)]',

  secondary:
    'border border-outline-variant bg-white/10 text-on-surface',

  ghost:
    'border-none bg-transparent text-on-surface-variant',

  danger:
    'border-none bg-error-container text-on-error-container',

  outline:
    'border border-primary bg-transparent text-primary',
};

const sizeStyles = {
  sm: 'rounded-lg px-[14px] py-[6px] text-[11px]',
  md: 'rounded-[10px] px-[18px] py-[9px] text-[13px]',
  lg: 'rounded-xl px-6 py-3 text-[15px]',
};

const Button = React.forwardRef(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center gap-[6px] font-sans font-bold tracking-[0.02em] transition-all duration-150 active:scale-95 hover:-translate-y-[1px] hover:opacity-[0.88]',
          variantStyles[variant] || variantStyles.primary,
          sizeStyles[size] || sizeStyles.md,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;