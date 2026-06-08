import { ScrollSequence } from '@/components/ScrollSequence';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Cases } from '@/components/Cases';
import { Skills } from '@/components/Skills';
import { Tools } from '@/components/Tools';
import { Testimonials } from '@/components/Testimonials';
import { Blog } from '@/components/Blog';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <ScrollSequence />
      <div className="wrap">
        <Hero />
        <About />
        <Services />
        <Cases />
        <Skills />
        <Tools />
        <Testimonials />
        <Blog />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
