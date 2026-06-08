import type { Metadata } from 'next';
import './globals.css';
import { Nav } from '@/components/Nav';
import { CursorGlow } from '@/components/CursorGlow';
import { RevealObserver } from '@/components/RevealObserver';

export const metadata: Metadata = {
  title: 'Alif Hosain — Elite Affiliate Marketer',
  description: 'Affiliate Marketer helping brands scale revenue through high-converting affiliate marketing strategies, performance funnels, and conversion optimisation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Dancing+Script:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
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
