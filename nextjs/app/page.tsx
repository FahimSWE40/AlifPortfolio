import { ScrollSequence } from '@/components/ScrollSequence';
import { ProjectCard } from '@/components/ProjectCard';

const PROJECTS = [
  {
    title: 'ClickBank Revenue Scale',
    category: 'Affiliate Campaign',
    desc: 'Built a high-converting funnel for digital health products, driving $240K+ in revenue through targeted traffic and email sequences.',
    result: '$240K+',
    color: '#00F5B8',
  },
  {
    title: 'Amazon Associates Automation',
    category: 'Performance Marketing',
    desc: 'Automated review pipeline for Amazon affiliate content increased organic commissions by 340% in 6 months.',
    result: '+340%',
    color: '#FF7A18',
  },
  {
    title: 'SaaS Partner Program',
    category: 'B2B Affiliate',
    desc: 'Managed tier-1 affiliate partner relationships for a SaaS product, generating 1,200+ qualified leads per month.',
    result: '1,200+ leads/mo',
    color: '#6bffd6',
  },
  {
    title: 'Influencer × Affiliate Hybrid',
    category: 'Growth Strategy',
    desc: 'Designed a hybrid model combining social reach with performance tracking, reducing customer acquisition cost by 58%.',
    result: '−58% CAC',
    color: '#00F5B8',
  },
];

export default function Home() {
  return (
    <main>
      {/* ── Scroll-linked image sequence intro ── */}
      <ScrollSequence />

      {/* ── Case studies (below the 500 vh scroll container) ── */}
      <section className="bg-[#121212] px-6 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="mb-16 text-center">
            <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-[#00F5B8] mb-4 block">
              Selected Work
            </span>
            <h2 className="text-4xl md:text-[clamp(40px,6vw,72px)] font-extrabold tracking-tight text-white leading-tight">
              Case Studies
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
