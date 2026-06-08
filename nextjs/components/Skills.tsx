const SKILLS = [
  { name: 'Affiliate Strategy',       pct: 96 },
  { name: 'Funnel Optimisation',      pct: 92 },
  { name: 'Paid Traffic (Meta/PPC)',  pct: 88 },
  { name: 'Email Marketing',          pct: 85 },
  { name: 'SEO & Content',            pct: 80 },
  { name: 'Analytics & Reporting',    pct: 90 },
];

export function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '56px' }} className="reveal">
          <span className="eyebrow">Expertise</span>
          <h2 className="section-title">Core <span className="grad">Skills</span></h2>
        </div>

        <div className="skills-grid">
          {SKILLS.map(({ name, pct }, i) => (
            <div className={`skill reveal d${(i % 3) + 1}`} key={name}>
              <div className="skill-top">
                <span className="n">{name}</span>
                <span className="p">{pct}%</span>
              </div>
              <div className="skill-track">
                <div className="skill-fill" data-skill={pct} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
