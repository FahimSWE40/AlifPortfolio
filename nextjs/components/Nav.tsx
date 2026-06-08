'use client';

import { useState, useEffect } from 'react';

const LINKS = [
  { href: '#home',         label: 'Home' },
  { href: '#about',        label: 'About' },
  { href: '#services',     label: 'Services' },
  { href: '#cases',        label: 'Portfolio' },
  { href: '#skills',       label: 'Skills' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#blog',         label: 'Blog' },
  { href: '#contact',      label: 'Contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      /* Scroll-spy: find section whose top is above 40% viewport */
      const sections = LINKS.map(l => document.querySelector<HTMLElement>(l.href)).filter(Boolean) as HTMLElement[];
      const hit = sections.findLast(el => el.getBoundingClientRect().top < window.innerHeight * 0.4);
      if (hit) setActive(hit.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 1024) setOpen(false); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#home" className="logo"><span className="s">S</span><span className="a">A</span></a>

          <ul className="nav-links">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className={active === href.slice(1) ? 'active' : ''}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-cta">
            <a href="mailto:allswefahim@gmail.com" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
              Hire Me
            </a>
            <button
              className={`burger${open ? ' x' : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(o => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        {LINKS.map(({ href, label }) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a
          href="mailto:allswefahim@gmail.com"
          className="btn btn-primary"
          style={{ marginTop: 16 }}
          onClick={() => setOpen(false)}
        >
          Hire Me
        </a>
      </div>
    </>
  );
}
