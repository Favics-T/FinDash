import React from 'react'

const AlphaItem = ({ tag, tagColor, time, text }) => (
  <div className="py-2.5 border-b border-outline-variant/20">
    <div className="flex justify-between mb-[4px]">
      <span className="text-label-caps" style={{ color: tagColor }}>{tag}</span>
      <span className="text-label-caps text-on-surface-variant font-mono-data">{time}</span>
    </div>
    <p className="text-body-md text-on-surface leading-normal">{text}</p>
  </div>
);

export default AlphaItem
