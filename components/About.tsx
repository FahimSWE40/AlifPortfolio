export function About() {
  return (
    <section id="about">
      <div className="container about">
        <div className="about-grid">
          <div className="reveal">
            <span className="eyebrow">About Me</span>
            <h2>Who <span className="green">I Am</span></h2>
            <p>Results-driven affiliate marketer with a passion for performance marketing, traffic strategies, and conversion optimization. I partner with brands to scale their online presence and maximize ROI through data-backed strategies.</p>
            <p>Every campaign I build is engineered around one principle: measurable growth. From first impression to final conversion, I obsess over the numbers that move revenue.</p>
            <a href="#footer" className="btn btn-ghost" data-magnetic="" style={{ marginTop: 8 }}>
              More About Me{' '}
              <span className="ico">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
            </a>
          </div>

          <div className="reveal d2">
            <div className="info-card">
              <div className="info-row">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="k">Name</div>
                <div className="v">Alif Hosain</div>
              </div>
              <div className="info-row">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </div>
                <div className="k">Profession</div>
                <div className="v">Performance Marketer</div>
              </div>
              <div className="info-row">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="k">Experience</div>
                <div className="v">3+ Years</div>
              </div>
              <div className="info-row">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="k">Email</div>
                <div className="v">alifhosain@gmail.com</div>
              </div>
              <div className="info-row">
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </div>
                <div className="k">Location</div>
                <div className="v">Bangladesh</div>
              </div>
            </div>
            <div className="signature">
              <div className="sig">Alif Hosain</div>
              <div className="nm">Alif Hosain</div>
              <div className="pf">Affiliate Marketer</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
