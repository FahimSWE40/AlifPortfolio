'use client';

import { useState, useEffect, useCallback } from 'react';

const TESTIMONIALS = [
  {
    quote: '"Alif rebuilt our entire affiliate funnel and tripled our ROI in under 90 days. The man speaks fluent conversion — every dollar is accounted for and optimized."',
    name: 'Rafiul Hasan',
    company: 'CEO, NutraPeak Supplements',
    avatar: 'RH',
  },
  {
    quote: '"We\'d burned budget on three agencies before Alif. Within a quarter our cost-per-lead dropped 40% and quality went up. He\'s the real deal — strategic and obsessively analytical."',
    name: 'Sadia Karim',
    company: 'CMO, FinEdge Capital',
    avatar: 'SK',
  },
  {
    quote: '"Our product launch hit 410% ROI thanks to Alif\'s funnel and traffic mix. Clear reporting, zero fluff, pure results."',
    name: 'Tanvir Ahmed',
    company: 'Founder, AudioWave Co.',
    avatar: 'TA',
  },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const next = useCallback((n: number) => setIdx((n + TESTIMONIALS.length) % TESTIMONIALS.length), []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="testimonials">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }} className="reveal">
          <span className="eyebrow orange">Client Love</span>
          <h2 className="section-title">What Clients <span className="grad">Say</span></h2>
        </div>
        <div className="reveal d1">
          <div className="tcarousel">
            <div className="ttrack" style={{ transform: `translateX(${-idx * 100}%)` }}>
              {TESTIMONIALS.map((t, i) => (
                <div className="tslide" key={i}>
                  <div className="tcard">
                    <div className="stars">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <svg key={k} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                          <path d="m12 2 2.9 6.3 6.8.7-5 4.6 1.4 6.7L12 17.8 5.9 20.3l1.4-6.7-5-4.6 6.8-.7L12 2Z" />
                        </svg>
                      ))}
                    </div>
                    <p className="quote">{t.quote}</p>
                    <div className="who">
                      <div className="avatar">{t.avatar}</div>
                      <div>
                        <div className="nm">{t.name}</div>
                        <div className="co">{t.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation: prev · dots · next */}
          <div className="tnav-wrap">
            <button className="tnav-btn" onClick={() => next(idx - 1)} aria-label="Previous testimonial">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="tnav">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} className={`tdot${idx === i ? ' active' : ''}`} aria-label={`Testimonial ${i + 1}`} onClick={() => next(i)} />
              ))}
            </div>
            <button className="tnav-btn" onClick={() => next(idx + 1)} aria-label="Next testimonial">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
