export function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <div>
            <span className="eyebrow reveal">About Me</span>
            <h2 className="reveal d1">
              Elite <span className="green">Affiliate</span> Marketer
            </h2>
            <p className="reveal d2">
              With over 3 years in affiliate marketing, I specialise in performance-driven campaigns that turn traffic into revenue. From ClickBank health offers to SaaS B2B programs, I&apos;ve managed high-ROI funnels across every major niche.
            </p>
            <p className="reveal d2">
              My approach blends data-driven traffic analysis, conversion rate optimisation, and compelling copywriting to build systems that scale — not one-time spikes.
            </p>
            <div className="signature reveal d3">
              <div className="sig">Alif Hosain</div>
              <div className="nm">SK Alif Hosain</div>
              <div className="pf">Affiliate Marketer &amp; Growth Strategist</div>
            </div>
          </div>

          <div className="reveal d2">
            <div className="info-card">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  ),
                  label: 'Name',
                  value: 'SK Alif Hosain',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="m2 7 10 8 10-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ),
                  label: 'Email',
                  value: 'allswefahim@gmail.com',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M20 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 2v4M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ),
                  label: 'Profession',
                  value: 'Affiliate Marketer',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ),
                  label: 'Experience',
                  value: '3+ Years',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" stroke="currentColor" strokeWidth="2" />
                      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  ),
                  label: 'Location',
                  value: 'Bangladesh',
                },
              ].map(({ icon, label, value }) => (
                <div className="info-row" key={label}>
                  <div className="ico">{icon}</div>
                  <span className="k">{label}</span>
                  <span className="v">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
