'use client';

import { useState } from 'react';

export function Footer() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    (e.currentTarget as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#home" className="logo"><span className="s">S</span><span className="a">A</span></a>
            <p className="bio">Affiliate marketer helping brands scale revenue through high-converting strategies, funnels, and conversion optimization.</p>
            <div className="footer-socials">
              {['Facebook','Instagram','YouTube','LinkedIn'].map(l => (
                <a key={l} className="social" href="#" aria-label={l}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /></svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4>Navigate</h4>
            <ul className="footer-links">
              {['Home','About','Services','Portfolio','Blog'].map(l => (
                <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="news">
            <h4>Stay In The Loop</h4>
            <p>Get marketing playbooks, case studies, and growth tactics straight to your inbox.</p>
            <form className="news-form" onSubmit={onSubmit}>
              <input type="email" placeholder="you@email.com" required aria-label="Email address" />
              <button type="submit" aria-label="Subscribe">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
            <div style={{ marginTop: 12, color: 'var(--green)', fontSize: 14, opacity: sent ? 1 : 0, transition: 'opacity .3s' }}>
              Thanks — you&apos;re on the list!
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 Alif Hosain. All rights reserved.</div>
          <div>Crafted with <span className="heart">♥</span> for Alif Hosain</div>
        </div>
      </div>
    </footer>
  );
}
