export function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-banner reveal">
          <div className="cta-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="cta-text">
            <h2>Ready To <span className="green">Scale</span> Your Business?</h2>
            <p>Let&apos;s work together and take your affiliate marketing performance to the next level.</p>
          </div>
          <a href="#footer" className="btn btn-primary" data-magnetic="" style={{ padding: '17px 30px', fontSize: 16 }}>
            Let&apos;s Work Together{' '}
            <span className="ico">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
