const SERVICES = [
  {
    alt: true,
    img: '/Assets/ChatGPT Image Jun 4, 2026, 05_41_25 AM.webp',
    title: 'Affiliate Strategy',
    desc: 'End-to-end affiliate campaign planning — from offer selection and traffic sourcing to funnel architecture and commission structure optimisation.',
    link: 'Strategy Brief',
  },
  {
    alt: false,
    img: '/Assets/ChatGPT Image Jun 4, 2026, 05_25_13 AM.webp',
    title: 'Funnel Optimisation',
    desc: 'Deep-dive CRO audits, A/B testing frameworks, and landing page redesigns that cut acquisition cost and boost conversion rates.',
    link: 'See Process',
  },
  {
    alt: true,
    img: '/Assets/ChatGPT Image Jun 4, 2026, 05_28_10 AM.webp',
    title: 'Traffic Generation',
    desc: 'Multi-channel paid and organic traffic — Meta Ads, Google PPC, SEO content, email drops, and influencer partnerships that drive targeted buyers.',
    link: 'Traffic Mix',
  },
  {
    alt: false,
    img: '/Assets/ChatGPT Image Jun 4, 2026, 05_32_06 AM.webp',
    title: 'Analytics & Reporting',
    desc: 'Custom dashboards, attribution modelling, and weekly performance reports so you always know exactly where every dollar goes.',
    link: 'View Sample',
  },
];

export function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">What I Do</span>
            <h2 className="section-title">My <span className="grad">Services</span></h2>
          </div>
          <p className="lede">Four pillars that cover the full lifecycle of a high-performance affiliate programme.</p>
        </div>

        <div className="cards-4">
          {SERVICES.map((s, i) => (
            <div key={s.title} className={`svc tilt reveal d${i % 3 + 1}`} style={s.alt ? undefined : undefined}>
              <div className={`svc-ico img`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.title} loading="lazy" />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <a className="learn" href="#">
                {s.link}
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
