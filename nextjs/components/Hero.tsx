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

    const layers = Array.from(stage.querySelectorAll<HTMLElement>('[data-depth]'));
    let tx = 0, ty = 0, rx = 0, ry = 0, raf: number;

    const onMove = (e: MouseEvent) => {
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
          <h1 className="reveal d1"><span className="green">Alif</span>Hosain</h1>
          <div className="role reveal d2">Affiliate Marketer</div>
          <p className="desc reveal d2">I help brands scale revenue through high-converting affiliate marketing strategies, performance funnels, traffic generation, and conversion optimization. Let&apos;s turn clicks into customers.</p>
          <div className="hero-actions reveal d3">
            <a href="#cases" className="btn btn-primary" data-magnetic="">
              View My Work{' '}
              <span className="ico">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <a href="#" className="btn btn-ghost" data-magnetic="">
              Download CV{' '}
              <span className="ico">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
          <div className="socials-block reveal d4">
            <div className="socials-label">Follow Me On</div>
            <div className="socials">
              <a className="social" href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
                  <path d="M14 8.5h2.5V5.2C16.1 5.1 15 5 13.8 5 11.3 5 9.6 6.5 9.6 9.3v2.2H6.5V15h3.1v8h3.6v-8h3l.5-3.5H13.2V9.6c0-1 .3-1.7 1.8-1.7Z" />
                </svg>
              </a>
              <a className="social" href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="19" height="19" fill="none">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17" cy="7" r="1.2" fill="currentColor" />
                </svg>
              </a>
              <a className="social" href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
                  <path d="M22 8.2c-.2-1.5-.9-2.5-2.5-2.7C17.4 5.2 12 5.2 12 5.2s-5.4 0-7.5.3C2.9 5.7 2.2 6.7 2 8.2 1.8 9.7 1.8 12 1.8 12s0 2.3.2 3.8c.2 1.5.9 2.5 2.5 2.7 2.1.3 7.5.3 7.5.3s5.4 0 7.5-.3c1.6-.2 2.3-1.2 2.5-2.7.2-1.5.2-3.8.2-3.8s0-2.3-.2-3.8ZM10 15V9l5.2 3L10 15Z" />
                </svg>
              </a>
              <a className="social" href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
                  <path d="M6.9 8.5H3.6V21h3.3V8.5ZM5.25 3.5A1.9 1.9 0 1 0 5.3 7.3a1.9 1.9 0 0 0 0-3.8ZM20.4 21h-3.3v-6.1c0-1.5-.5-2.5-1.8-2.5-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V21H9.9s.05-11.3 0-12.5h3.3v1.8c.45-.7 1.2-1.7 3-1.7 2.2 0 3.9 1.4 3.9 4.6V21Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-visual reveal d2">
          <div className="portrait-stage" id="portraitStage" ref={stageRef}>
            <div className="halo" data-depth="0.3" />
            <div className="rings" data-depth="0.5">
              <span className="ring r1" /><span className="ring r2" /><span className="ring r3" />
            </div>
            <div className="portrait-wrap" data-depth="0.12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="portrait" src="/Assets/469fca01-de10-4977-a4e9-7dd294422291.png" alt="Alif Hosain, Affiliate Marketer" loading="eager" />
            </div>
            <div className="float img f1" data-depth="1.4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Assets/ChatGPT Image Jun 4, 2026, 05_25_13 AM.webp" alt="Growth Analytics" loading="lazy" />
            </div>
            <div className="float img f2" data-depth="1.7">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Assets/ChatGPT Image Jun 4, 2026, 05_25_50 AM.webp" alt="Target" loading="lazy" />
            </div>
            <div className="float img f3" data-depth="2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Assets/ChatGPT Image Jun 4, 2026, 05_32_06 AM.webp" alt="Revenue" loading="lazy" />
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
          <div className="stat">
            <div className="stat-ico img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Assets/ChatGPT Image Jun 4, 2026, 05_41_25 AM.webp" alt="Years Experience" loading="lazy" />
            </div>
            <div>
              <div className="num" data-count="3" data-suffix="+">0</div>
              <div className="lab">Years Experience</div>
            </div>
          </div>
          <div className="stat">
            <div className="stat-ico img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Assets/ChatGPT Image Jun 4, 2026, 05_25_13 AM.webp" alt="Campaigns Run" loading="lazy" />
            </div>
            <div>
              <div className="num" data-count="150" data-suffix="+">0</div>
              <div className="lab">Campaigns Run</div>
            </div>
          </div>
          <div className="stat">
            <div className="stat-ico img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Assets/ChatGPT Image Jun 4, 2026, 05_28_10 AM.webp" alt="Happy Clients" loading="lazy" />
            </div>
            <div>
              <div className="num" data-count="80" data-suffix="+">0</div>
              <div className="lab">Happy Clients</div>
            </div>
          </div>
          <div className="stat">
            <div className="stat-ico img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Assets/ChatGPT Image Jun 4, 2026, 05_32_06 AM.webp" alt="Revenue Generated" loading="lazy" />
            </div>
            <div>
              <div className="num" data-count="2" data-prefix="$" data-suffix="M+">0</div>
              <div className="lab">Revenue Generated</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
