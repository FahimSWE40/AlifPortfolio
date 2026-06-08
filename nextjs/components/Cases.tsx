const CASES = [
  {
    title: 'ClickBank Health Funnel',
    tag: 'Affiliate Campaign',
    accent: '',
    metrics: [
      { k: 'ROI',       v: '+410%', cls: 'roi' },
      { k: 'Revenue',   v: '$240K+', cls: '' },
      { k: 'Duration',  v: '90 Days', cls: '' },
    ],
    fill: 82,
    mockBg: 'linear-gradient(135deg,#00F5B820,#00F5B808)',
    mockLines: ['#00F5B840','#00F5B828','#00F5B815'],
  },
  {
    title: 'Amazon Associates Scale',
    tag: 'Performance Marketing',
    accent: 'o',
    metrics: [
      { k: 'Growth',    v: '+340%', cls: 'roi' },
      { k: 'Leads',     v: '4,800+', cls: '' },
      { k: 'Time',      v: '6 Months', cls: '' },
    ],
    fill: 68,
    mockBg: 'linear-gradient(135deg,#FF7A1820,#FF7A1808)',
    mockLines: ['#FF7A1840','#FF7A1828','#FF7A1815'],
  },
  {
    title: 'SaaS B2B Partner Program',
    tag: 'B2B Affiliate',
    accent: '',
    metrics: [
      { k: 'Leads/Mo',  v: '1,200+', cls: 'roi' },
      { k: 'CAC Drop',  v: '−58%', cls: '' },
      { k: 'Partners',  v: '34', cls: '' },
    ],
    fill: 74,
    mockBg: 'linear-gradient(135deg,#00F5B820,#00F5B808)',
    mockLines: ['#00F5B840','#00F5B828','#00F5B815'],
  },
];

export function Cases() {
  return (
    <section id="cases">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow orange">Portfolio</span>
            <h2 className="section-title">Case <span className="grad">Studies</span></h2>
          </div>
          <p className="lede">Real campaigns, real numbers — no vanity metrics.</p>
        </div>

        <div className="cases">
          {CASES.map((c, i) => (
            <article key={c.title} className={`case ${c.accent} reveal d${i % 3 + 1}`}>
              <div className="case-top">
                <div className="case-badge">
                  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                    <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="m7 14 4-4 4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3>{c.title}</h3>
                  <div className="tag">{c.tag}</div>
                </div>
              </div>

              {/* Browser mockup */}
              <div className="case-thumb">
                <div className="browser">
                  <i /><i /><i />
                </div>
                <div className="mock" style={{ background: c.mockBg, padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {c.mockLines.map((col, k) => (
                    <div key={k} style={{ height: k === 0 ? 10 : 7, borderRadius: 5, background: col, width: k === 0 ? '70%' : k === 1 ? '90%' : '50%' }} />
                  ))}
                  <div style={{ marginTop: 6, height: 40, borderRadius: 8, background: c.mockLines[0], opacity: .4 }} />
                </div>
              </div>

              {/* Metrics */}
              <div className="case-metrics">
                {c.metrics.map(({ k, v, cls }) => (
                  <div key={k} className={`m ${cls}`}>
                    <div className="k">{k}</div>
                    <div className="v" data-count={v.replace(/[^0-9.]/g, '')}>{v}</div>
                  </div>
                ))}
              </div>

              <div className="case-bar">
                <i data-fill={c.fill} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
