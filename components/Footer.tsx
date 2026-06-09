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
            <a href="#home" className="logo"><span className="s">A</span><span className="a">H</span></a>
            <p className="bio">Affiliate marketer helping brands scale revenue through high-converting strategies, funnels, and conversion optimization.</p>
            <div className="footer-socials">
              <a className="social" href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M14 8.5h2.5V5.2C16.1 5.1 15 5 13.8 5 11.3 5 9.6 6.5 9.6 9.3v2.2H6.5V15h3.1v8h3.6v-8h3l.5-3.5H13.2V9.6c0-1 .3-1.7 1.8-1.7Z" />
                </svg>
              </a>
              <a className="social" href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17" cy="7" r="1.2" fill="currentColor" />
                </svg>
              </a>
              <a className="social" href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M22 8.2c-.2-1.5-.9-2.5-2.5-2.7C17.4 5.2 12 5.2 12 5.2s-5.4 0-7.5.3C2.9 5.7 2.2 6.7 2 8.2 1.8 9.7 1.8 12 1.8 12s0 2.3.2 3.8c.2 1.5.9 2.5 2.5 2.7 2.1.3 7.5.3 7.5.3s5.4 0 7.5-.3c1.6-.2 2.3-1.2 2.5-2.7.2-1.5.2-3.8.2-3.8s0-2.3-.2-3.8ZM10 15V9l5.2 3L10 15Z" />
                </svg>
              </a>
              <a className="social" href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M6.9 8.5H3.6V21h3.3V8.5ZM5.25 3.5A1.9 1.9 0 1 0 5.3 7.3a1.9 1.9 0 0 0 0-3.8ZM20.4 21h-3.3v-6.1c0-1.5-.5-2.5-1.8-2.5-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V21H9.9s.05-11.3 0-12.5h3.3v1.8c.45-.7 1.2-1.7 3-1.7 2.2 0 3.9 1.4 3.9 4.6V21Z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4>Navigate</h4>
            <ul className="footer-links">
              {['Home', 'About', 'Services', 'Portfolio', 'Blog'].map(l => (
                <li key={l}><a href={`#${l === 'Portfolio' ? 'cases' : l.toLowerCase()}`}>{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="news">
            <h4>Stay In The Loop</h4>
            <p>Get marketing playbooks, case studies, and growth tactics straight to your inbox.</p>
            <form className="news-form" onSubmit={onSubmit}>
              <input type="email" placeholder="you@email.com" required aria-label="Email" />
              <button type="submit" aria-label="Subscribe">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
            <div style={{ marginTop: 12, color: 'var(--green)', fontSize: 14, opacity: sent ? 1 : 0, transition: 'opacity .3s' }}>
              Thanks — you&apos;re on the list! 🎉
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
