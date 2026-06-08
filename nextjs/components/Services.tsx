export function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">What I Do</span>
            <h2 className="section-title">My <span className="grad">Services</span></h2>
          </div>
          <a href="#" className="btn btn-ghost" data-magnetic="">
            View All Services{' '}
            <span className="ico">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>

        <div className="cards-4">
          <article className="svc tilt reveal">
            <span className="svc-num">01</span>
            <div className="svc-ico img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Assets/ChatGPT Image Jun 4, 2026, 05_25_50 AM.webp" alt="Affiliate Strategy" loading="lazy" />
            </div>
            <h3>Affiliate Strategy</h3>
            <p>I create data-driven affiliate strategies that attract the right audience and maximize ROI across every channel.</p>
            <a href="#" className="learn">
              Learn More{' '}
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </article>

          <article className="svc alt tilt reveal d1">
            <span className="svc-num">02</span>
            <div className="svc-ico img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Assets/ChatGPT Image Jun 4, 2026, 05_44_37 AM.webp" alt="Funnel Building" loading="lazy" />
            </div>
            <h3>Funnel Building</h3>
            <p>High-converting funnels designed to turn visitors into buyers and boost revenue at every step.</p>
            <a href="#" className="learn">
              Learn More{' '}
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </article>

          <article className="svc tilt reveal d2">
            <span className="svc-num">03</span>
            <div className="svc-ico img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Assets/ChatGPT Image Jun 4, 2026, 05_41_25 AM.webp" alt="Traffic Generation" loading="lazy" />
            </div>
            <h3>Traffic Generation</h3>
            <p>Targeted traffic strategies that bring quality visitors and increase conversions sustainably.</p>
            <a href="#" className="learn">
              Learn More{' '}
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </article>

          <article className="svc alt tilt reveal d3">
            <span className="svc-num">04</span>
            <div className="svc-ico img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Assets/ChatGPT Image Jun 4, 2026, 05_25_13 AM.webp" alt="Conversion Optimization" loading="lazy" />
            </div>
            <h3>Conversion Optimization</h3>
            <p>Optimize landing pages, offers, and funnels to capture the highest conversions possible.</p>
            <a href="#" className="learn">
              Learn More{' '}
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
