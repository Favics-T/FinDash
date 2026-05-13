import React from 'react';

const sizeMap = {
  sm: 'h-6 w-6',
  md: 'h-9 w-9',
  lg: 'h-12 w-12',
};

const borderMap = {
  sm: 'border-2',
  md: 'border-[2px]',
  lg: 'border-[3px]',
};

const Loader = ({ size = 'md', className = '' }) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`
          ${sizeMap[size] || sizeMap.md}
          ${borderMap[size] || borderMap.md}
          animate-spin rounded-full
          border-outline-variant
          border-t-primary
          shadow-[0_0_12px_rgba(0,212,232,0.25)]
          ${className}
        `}
      />
    </div>
  );
};

export default Loader;