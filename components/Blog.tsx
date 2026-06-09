export function Blog() {
  return (
    <section id="blog">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">From The Journal</span>
            <h2 className="section-title">Latest <span className="grad">Articles</span></h2>
          </div>
          <a href="#" className="btn btn-ghost" data-magnetic="">
            View All Posts{' '}
            <span className="ico">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>

        <div className="blog-grid">
          <article className="post reveal">
            <div className="post-img" style={{ background: 'linear-gradient(150deg,#0c3326,#05130d)' }}>
              <span className="cat">Strategy</span>
              <svg width="100%" height="100%" viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice">
                <path d="M0 140 L60 110 L120 124 L180 80 L240 96 L300 50 L360 70" stroke="#00F5B8" strokeWidth="3" fill="none" opacity=".7" />
                <circle cx="300" cy="50" r="5" fill="#00F5B8" />
              </svg>
            </div>
            <div className="post-body">
              <div className="post-meta"><span>May 28, 2026</span><span className="d" /><span>6 min read</span></div>
              <h3>7 Affiliate Funnels That Convert at Scale in 2026</h3>
              <a href="#" className="readmore">
                Read More{' '}
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </article>

          <article className="post reveal d1">
            <div className="post-img" style={{ background: 'linear-gradient(150deg,#33210c,#130b05)' }}>
              <span className="cat" style={{ borderColor: 'var(--stroke-orange)', color: 'var(--orange)' }}>Traffic</span>
              <svg width="100%" height="100%" viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice">
                <rect x="30" y="110" width="36" height="50" rx="4" fill="#FF7A18" opacity=".7" />
                <rect x="90" y="86" width="36" height="74" rx="4" fill="#FF7A18" opacity=".55" />
                <rect x="150" y="60" width="36" height="100" rx="4" fill="#FF7A18" opacity=".7" />
                <rect x="210" y="40" width="36" height="120" rx="4" fill="#FF7A18" opacity=".85" />
                <rect x="270" y="70" width="36" height="90" rx="4" fill="#FF7A18" opacity=".6" />
              </svg>
            </div>
            <div className="post-body">
              <div className="post-meta"><span>May 14, 2026</span><span className="d" /><span>8 min read</span></div>
              <h3>Paid Traffic vs. SEO: Where Should Affiliates Invest?</h3>
              <a href="#" className="readmore">
                Read More{' '}
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </article>

          <article className="post reveal d2">
            <div className="post-img" style={{ background: 'linear-gradient(150deg,#0a2c2c,#05110f)' }}>
              <span className="cat">Optimization</span>
              <svg width="100%" height="100%" viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice">
                <circle cx="180" cy="90" r="56" fill="none" stroke="#00F5B8" strokeWidth="3" opacity=".3" />
                <path d="M180 34 A56 56 0 0 1 226 118" fill="none" stroke="#00F5B8" strokeWidth="6" strokeLinecap="round" />
                <text x="180" y="98" fill="#00F5B8" fontSize="26" fontFamily="Sora,sans-serif" fontWeight="700" textAnchor="middle">+38%</text>
              </svg>
            </div>
            <div className="post-body">
              <div className="post-meta"><span>Apr 30, 2026</span><span className="d" /><span>5 min read</span></div>
              <h3>The CRO Checklist I Use Before Every Launch</h3>
              <a href="#" className="readmore">
                Read More{' '}
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
