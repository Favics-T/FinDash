import React from 'react'

const Stat = ({ label, value, sub, subUp }) => (
  <div>
    <p className="text-label-caps text-on-surface-variant mb-[4px]">{label}</p>
    <p className="text-[15px] font-bold font-mono-data text-on-surface">{value}</p>
    {sub !== undefined && (
      <p className={`text-[10px] font-mono-data mt-0.5 ${subUp ? 'text-secondary' : 'text-error'}`}>
        {sub}
      </p>
    )}
  </div>
);
export default Stat
