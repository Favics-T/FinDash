import React from 'react';
import { cn } from '../../hooks/utils';

export const Card = ({ className, children, ...props }) => (
  <div
    className={cn(
      'overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className, children, ...props }) => (
  <div
    className={cn(
      'flex items-center justify-between border-b border-outline-variant/20 px-5 py-md',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardContent = ({ className, children, ...props }) => (
  <div
    className={cn('p-5', className)}
    {...props}
  >
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }) => (
  <div
    className={cn(
      'border-t border-outline-variant/20 bg-white/[0.02] px-5 py-md',
      className
    )}
    {...props}
  >
    {children}
  </div>
);