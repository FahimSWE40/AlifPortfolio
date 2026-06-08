const POSTS = [
  {
    cat: 'Strategy',
    date: 'May 28, 2026',
    readTime: '6 min read',
    title: '7 Affiliate Funnel Mistakes Costing You Conversions',
    gradient: 'linear-gradient(135deg,#03170F,#071A11)',
    accentLine: 'rgba(0,245,184,.5)',
  },
  {
    cat: 'Traffic',
    date: 'May 14, 2026',
    readTime: '8 min read',
    title: 'How to Cut Meta Ad CPL by 40% Without Losing Volume',
    gradient: 'linear-gradient(135deg,#170A03,#1A0E07)',
    accentLine: 'rgba(255,122,24,.5)',
  },
  {
    cat: 'Analytics',
    date: 'Apr 30, 2026',
    readTime: '5 min read',
    title: 'The Attribution Model That Changed My Reporting Game',
    gradient: 'linear-gradient(135deg,#03170F,#071A11)',
    accentLine: 'rgba(0,245,184,.5)',
  },
];

export function Blog() {
  return (
    <section id="blog">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">Insights</span>
            <h2 className="section-title">Latest <span className="grad">Articles</span></h2>
          </div>
          <a href="#" className="btn btn-ghost">All Posts</a>
        </div>

        <div className="blog-grid">
          {POSTS.map((p, i) => (
            <article className={`post reveal d${i + 1}`} key={p.title}>
              <div className="post-img" style={{ background: p.gradient }}>
                <span className="cat">{p.cat}</span>
                {/* Inline SVG art */}
                <svg viewBox="0 0 340 180" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: .6 }}>
                  <line x1="40" y1="140" x2="100" y2="80"  stroke={p.accentLine} strokeWidth="1.5" />
                  <line x1="100" y1="80"  x2="160" y2="110" stroke={p.accentLine} strokeWidth="1.5" />
                  <line x1="160" y1="110" x2="220" y2="50"  stroke={p.accentLine} strokeWidth="1.5" />
                  <line x1="220" y1="50"  x2="300" y2="70"  stroke={p.accentLine} strokeWidth="1.5" />
                  {[40,100,160,220,300].map((x, k) => {
                    const ys = [140,80,110,50,70];
                    return <circle key={k} cx={x} cy={ys[k]} r="4" fill={p.accentLine} />;
                  })}
                  <path d={`M40 140 L100 80 L160 110 L220 50 L300 70 L300 180 L40 180 Z`} fill={p.accentLine} opacity=".12" />
                </svg>
              </div>
              <div className="post-body">
                <div className="post-meta">
                  <span>{p.date}</span>
                  <span className="d" />
                  <span>{p.readTime}</span>
                </div>
                <h3>{p.title}</h3>
                <a className="readmore" href="#">
                  Read Article
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
