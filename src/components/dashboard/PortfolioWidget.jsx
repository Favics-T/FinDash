import React from 'react'

const PortfolioWidget = () => 
{
    return (
  <div style={{ padding: '1rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
      {[['BTC', 45], ['ETH', 28], ['SOL', 15], ['Other', 12]].map(([name, pct]) => (
        <div key={name} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>{pct}%</div>
          <div style={{ fontSize: 10, color: 'var(--color-on-surface-variant)', marginTop: 2 }}>{name}</div>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', height: 8, borderRadius: 99, overflow: 'hidden', gap: 2 }}>
      {[['#00d4e8', 45], ['#3ddba0', 28], ['#f59e0b', 15], ['#8888a0', 12]].map(([c, w]) => (
        <div key={c} style={{ height: '100%', width: `${w}%`, background: c, borderRadius: 99 }} />
      ))}
    </div>
    <div style={{ marginTop: 10, fontSize: 11, color: 'var(--color-on-surface-variant)' }}>
      Total Portfolio Value: <strong style={{ color: 'var(--color-on-surface)' }}>$124,340.00</strong>
    </div>
  </div>
);
}
export default PortfolioWidget
