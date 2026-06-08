export function Cases() {
  return (
    <section id="cases">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">Featured Campaigns</span>
            <h2 className="section-title">Recent <span className="grad">Success Stories</span></h2>
          </div>
          <a href="#" className="btn btn-ghost" data-magnetic="">
            View All Projects{' '}
            <span className="ico">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>

        <div className="cases">
          {/* ── Case 1 — Health Supplement ── */}
          <article className="case reveal">
            <div className="case-top">
              <div className="case-badge">
                <div className="case-live" />
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 21c5-3 8-6.5 8-11a8 8 0 0 0-16 0c0 4.5 3 8 8 11Z" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m9 11 2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3>Health Supplement Offer</h3>
                <div className="tag">CPA Campaign</div>
              </div>
            </div>
            <div className="case-thumb">
              <div className="browser">
                <i /><i /><i />
                <span className="case-url">healthoffer.io/landing</span>
              </div>
              <div className="mock" style={{ background: 'linear-gradient(160deg,#0d2b1e,#06140d)' }}>
                <svg width="100%" height="100%" viewBox="0 0 300 156" preserveAspectRatio="xMidYMid slice">
                  <rect width="300" height="156" fill="#0c241a" />
                  <rect x="20" y="20" width="130" height="10" rx="3" fill="#1f6b4d" />
                  <rect x="20" y="38" width="95" height="7" rx="3" fill="#13402f" />
                  <rect x="20" y="54" width="75" height="7" rx="3" fill="#0d2b1e" />
                  <rect x="20" y="76" width="108" height="32" rx="6" fill="#00F5B8" opacity=".88" />
                  <text x="36" y="96" fill="#03110c" fontSize="11" fontWeight="700" fontFamily="sans-serif">View Offer →</text>
                  <circle cx="226" cy="80" r="46" fill="#0f3326" />
                  <circle cx="226" cy="80" r="46" fill="none" stroke="#00F5B8" strokeWidth="1.5" opacity=".3" />
                  <rect x="205" y="48" width="42" height="64" rx="10" fill="#1f8f64" />
                  <rect x="213" y="56" width="26" height="4" rx="2" fill="#00F5B8" opacity=".5" />
                  <rect x="213" y="64" width="18" height="4" rx="2" fill="#00F5B8" opacity=".3" />
                </svg>
              </div>
            </div>
            <div className="case-metrics">
              <div className="m roi">
                <div className="k">ROI</div>
                <div className="v" data-count="320" data-suffix="%">0</div>
              </div>
              <div className="m">
                <div className="k">Revenue</div>
                <div className="v">$45K+</div>
              </div>
              <div className="m">
                <div className="k">Traffic</div>
                <div className="v">1.2M</div>
              </div>
            </div>
            <div className="case-bar"><i data-fill="92" /></div>
          </article>

          {/* ── Case 2 — Finance Lead Gen ── */}
          <article className="case o reveal d1">
            <div className="case-top">
              <div className="case-badge">
                <div className="case-live" />
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 19V5M4 19h16M7 15l3-4 3 2 5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3>Finance Lead Gen Campaign</h3>
                <div className="tag">CPL Campaign</div>
              </div>
            </div>
            <div className="case-thumb">
              <div className="browser">
                <i /><i /><i />
                <span className="case-url">finleads.co/funnel</span>
              </div>
              <div className="mock" style={{ background: 'linear-gradient(160deg,#102036,#060d18)' }}>
                <svg width="100%" height="100%" viewBox="0 0 300 156" preserveAspectRatio="xMidYMid slice">
                  <rect width="300" height="156" fill="#0a1626" />
                  <rect x="20" y="22" width="155" height="11" rx="3" fill="#2a6fdb" />
                  <rect x="20" y="40" width="110" height="7" rx="3" fill="#16314f" />
                  <rect x="20" y="54" width="80" height="7" rx="3" fill="#0e2236" />
                  <rect x="20" y="72" width="90" height="28" rx="6" fill="#FF7A18" opacity=".88" />
                  <text x="32" y="90" fill="#fff" fontSize="10" fontWeight="700" fontFamily="sans-serif">Get Free Quote</text>
                  <rect x="190" y="28" width="92" height="70" rx="8" fill="#10243d" />
                  <path d="M198 88l16-18 14 10 20-28" stroke="#2a6fdb" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="198" cy="88" r="3" fill="#2a6fdb" />
                  <circle cx="214" cy="70" r="3" fill="#2a6fdb" />
                  <circle cx="228" cy="80" r="3" fill="#2a6fdb" />
                  <circle cx="248" cy="52" r="3" fill="#2a6fdb" />
                </svg>
              </div>
            </div>
            <div className="case-metrics">
              <div className="m roi">
                <div className="k">ROI</div>
                <div className="v" data-count="280" data-suffix="%">0</div>
              </div>
              <div className="m">
                <div className="k">Revenue</div>
                <div className="v">$38.5K</div>
              </div>
              <div className="m">
                <div className="k">Leads</div>
                <div className="v">9.4K</div>
              </div>
            </div>
            <div className="case-bar"><i data-fill="84" /></div>
          </article>

          {/* ── Case 3 — E-commerce ── */}
          <article className="case reveal d2">
            <div className="case-top">
              <div className="case-badge">
                <div className="case-live" />
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M6 6h15l-1.5 9h-12L6 6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  <path d="M6 6 5 3H3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  <circle cx="9" cy="20" r="1.4" fill="currentColor" />
                  <circle cx="18" cy="20" r="1.4" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h3>E-commerce Product Campaign</h3>
                <div className="tag">Sales Campaign</div>
              </div>
            </div>
            <div className="case-thumb">
              <div className="browser">
                <i /><i /><i />
                <span className="case-url">shopboost.io/products</span>
              </div>
              <div className="mock" style={{ background: 'linear-gradient(160deg,#15171c,#070809)' }}>
                <svg width="100%" height="100%" viewBox="0 0 300 156" preserveAspectRatio="xMidYMid slice">
                  <rect width="300" height="156" fill="#101216" />
                  <rect x="20" y="22" width="120" height="10" rx="3" fill="#2a2d36" />
                  <rect x="20" y="40" width="85" height="7" rx="3" fill="#1c1f26" />
                  <circle cx="150" cy="90" r="48" fill="#181b22" />
                  <circle cx="150" cy="90" r="48" fill="none" stroke="#00F5B8" strokeWidth="1.8" opacity=".35" />
                  <circle cx="150" cy="90" r="36" fill="#1e2230" />
                  <rect x="126" y="66" width="48" height="48" rx="22" fill="#272b38" />
                  <rect x="138" y="54" width="24" height="18" rx="4" fill="#2e3244" />
                  <text x="134" y="95" fill="#00F5B8" fontSize="12" fontWeight="700" fontFamily="sans-serif" opacity=".7">$60K</text>
                  <rect x="22" y="120" width="60" height="22" rx="6" fill="#00F5B8" opacity=".85" />
                  <text x="32" y="135" fill="#03110c" fontSize="9" fontWeight="700" fontFamily="sans-serif">Buy Now</text>
                </svg>
              </div>
            </div>
            <div className="case-metrics">
              <div className="m roi">
                <div className="k">ROI</div>
                <div className="v" data-count="410" data-suffix="%">0</div>
              </div>
              <div className="m">
                <div className="k">Revenue</div>
                <div className="v">$60.2K</div>
              </div>
              <div className="m">
                <div className="k">Orders</div>
                <div className="v">3.1K</div>
              </div>
            </div>
            <div className="case-bar"><i data-fill="96" /></div>
          </article>
        </div>
      </div>
    </section>
  );
}
