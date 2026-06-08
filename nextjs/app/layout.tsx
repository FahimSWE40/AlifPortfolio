import type { Metadata } from 'next';
import { Sora, Playfair_Display, Dancing_Script } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/Nav';
import { CursorGlow } from '@/components/CursorGlow';
import { RevealObserver } from '@/components/RevealObserver';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  weight: ['600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Alif Hosain — Elite Affiliate Marketer',
  description: 'Alif Hosain — Affiliate Marketer helping brands scale revenue through high-converting affiliate strategies, performance funnels, and conversion optimization.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${playfair.variable} ${dancing.variable}`}>
      <body>
        <div className="bg-field"><div className="bg-grid" /></div>
        <div className="grain" />
        <CursorGlow />
        <Nav />
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
