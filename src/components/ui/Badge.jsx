import React from 'react';

const variantStyles = {
  neutral:
    'bg-white/10 text-on-surface-variant border-none',

  primary:
    'bg-primary-container/10 text-primary border border-primary-container/30',

  secondary:
    'bg-secondary-container/10 text-secondary border border-secondary/30',

  success:
    'bg-secondary-container/10 text-secondary border border-secondary/30',

  error:
    'bg-error-container/20 text-error border border-error-container/30',

  warning:
    'border border-[rgba(255,200,80,0.25)] bg-[rgba(255,200,80,0.12)] text-[#ffc850]',
};

const Badge = ({
  variant = 'neutral',
  children,
  className = '',
  ...props
}) => (
  <span
    className={`inline-flex items-center rounded-md px-sm py-[2px] font-label-caps text-[9px] uppercase tracking-[0.1em] ${
      variantStyles[variant] || variantStyles.neutral
    } ${className}`}
    {...props}
  >
    {children}
  </span>
);

export default Badge;