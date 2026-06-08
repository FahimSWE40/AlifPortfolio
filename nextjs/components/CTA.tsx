export function CTA() {
  return (
    <section className="cta" id="contact">
      <div className="container">
        <div className="cta-banner reveal">
          <div className="cta-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.9 11.8 19.79 19.79 0 0 1 1.88 3.18 2 2 0 0 1 3.86 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.64A16 16 0 0 0 14 14.56l1-1a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="cta-text">
            <h2>Ready to <span className="green">Scale</span> Your Revenue?</h2>
            <p>Let&apos;s build a high-converting affiliate programme tailored to your product and audience. Book a free 30-minute strategy session.</p>
          </div>

          <a href="mailto:allswefahim@gmail.com" className="btn btn-primary" data-magnetic="" style={{ flexShrink: 0 }}>
            Book Free Call
            <span className="ico">
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
