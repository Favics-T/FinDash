import React from 'react'

const SentimentWidget = () => {
//    nst { isPro, canAccess } = useSubscription();
    return (
  <div 
  className=''
  style={{ padding: '0.75rem 1rem' }}>
    {[
      { label: 'BTC', score: 82, color: '#3ddba0' },
      { label: 'ETH', score: 68, color: '#00d4e8' },
      { label: 'SOL', score: 54, color: '#f59e0b' },
    ].map(({ label, score, color }) => (
      <div key={label} style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
          <span style={{ fontSize: 11, fontWeight: 700 }}>{label}</span>
          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color }}>{score} / 100</span>
        </div>
        <div style={{ height: 4, background: 'rgba(42,42,56,0.8)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${score}%`, background: color, borderRadius: 99 }} />
        </div>
      </div>
    ))}
  </div>
);

}
export default SentimentWidget
