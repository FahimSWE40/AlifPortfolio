'use client';

import { useEffect, useRef } from 'react';

export function Hero() {
  const heroRef  = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero  = heroRef.current;
    const stage = stageRef.current;
    if (!hero || !stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    const layers = [...stage.querySelectorAll<HTMLElement>('[data-depth]')];
    let tx = 0, ty = 0, rx = 0, ry = 0, raf: number;

    const onMove  = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width  - 0.5;
      ty = (e.clientY - r.top)  / r.height - 0.5;
    };
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', () => { tx = 0; ty = 0; });

    const loop = () => {
      rx += (tx - rx) * 0.08; ry += (ty - ry) * 0.08;
      layers.forEach(l => {
        const d = parseFloat(l.dataset.depth!);
        l.style.transform = `translate3d(${-rx * 26 * d}px,${-ry * 22 * d}px,0)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => { hero.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <header className="hero container" id="home" ref={heroRef}>
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="badge reveal">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
              <path d="M6.5 3.5a1.5 1.5 0 0 1 3 0V11M6.5 7A1.5 1.5 0 0 0 4 8.5v1M4 9.5A1.5 1.5 0 0 0 1.5 11v3.5a8 8 0 0 0 16 0v-5a1.5 1.5 0 0 0-3 0M14.5 10v-1a1.5 1.5 0 0 0-3 0V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Welcome to my Portfolio
          </span>
          <h1 className="reveal d1"><span className="green">Alif</span> Hosain</h1>
          <div className="role reveal d2">Affiliate Marketer</div>
          <p className="desc reveal d2">I help brands scale revenue through high-converting affiliate marketing strategies, performance funnels, traffic generation, and conversion optimization.</p>
          <div className="hero-actions reveal d3">
            <a href="#cases" className="btn btn-primary" data-magnetic="">View My Work <span className="ico"><svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span></a>
            <a href="#" className="btn btn-ghost" data-magnetic="">Download CV <span className="ico"><svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span></a>
          </div>
          <div className="socials-block reveal d4">
            <div className="socials-label">Follow Me On</div>
            <div className="socials">
              {[
                { label: 'Facebook',  href: '#' },
                { label: 'Instagram', href: '#' },
                { label: 'YouTube',   href: '#' },
                { label: 'LinkedIn',  href: '#' },
              ].map(({ label, href }) => (
                <a key={label} className="social" href={href} aria-label={label}>
                  <svg viewBox="0 0 24 24" width="19" height="19" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-visual reveal d2">
          <div className="portrait-stage" ref={stageRef}>
            <div className="halo" data-depth="0.3" />
            <div className="rings" data-depth="0.5">
              <span className="ring r1" /><span className="ring r2" /><span className="ring r3" />
            </div>
            <div className="portrait-wrap" data-depth="0.12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="portrait" src="/Assets/469fca01-de10-4977-a4e9-7dd294422291.png" alt="Alif Hosain" loading="eager" />
            </div>
            <div className="float img f1" data-depth="1.4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Assets/ChatGPT Image Jun 4, 2026, 05_25_13 AM.webp" alt="" loading="lazy" />
            </div>
            <div className="float img f2" data-depth="1.7">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Assets/ChatGPT Image Jun 4, 2026, 05_25_50 AM.webp" alt="" loading="lazy" />
            </div>
            <div className="float img f3" data-depth="2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Assets/ChatGPT Image Jun 4, 2026, 05_32_06 AM.webp" alt="" loading="lazy" />
            </div>
            <div className="roi-tag" data-depth="1.2">
              <div className="k">Avg. Client ROI</div>
              <div className="v">+312%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-wrap reveal">
        <div className="stats">
          {[
            { img: '/Assets/ChatGPT Image Jun 4, 2026, 05_41_25 AM.webp', count: 3,   suffix: '+',  label: 'Years Experience' },
            { img: '/Assets/ChatGPT Image Jun 4, 2026, 05_25_13 AM.webp', count: 150, suffix: '+',  label: 'Campaigns Run' },
            { img: '/Assets/ChatGPT Image Jun 4, 2026, 05_28_10 AM.webp', count: 80,  suffix: '+',  label: 'Happy Clients' },
            { img: '/Assets/ChatGPT Image Jun 4, 2026, 05_32_06 AM.webp', count: 2,   prefix: '$', suffix: 'M+', label: 'Revenue Generated' },
          ].map(({ img, count, suffix, prefix, label }) => (
            <div className="stat" key={label}>
              <div className="stat-ico img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={label} loading="lazy" />
              </div>
              <div>
                <div className="num" data-count={count} data-suffix={suffix} data-prefix={prefix}>0</div>
                <div className="lab">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
