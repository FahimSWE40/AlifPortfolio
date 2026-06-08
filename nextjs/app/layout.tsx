import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Alif Hosain — Elite Affiliate Marketer',
  description:
    'Affiliate Marketer helping brands scale revenue through high-converting strategies, performance funnels, and conversion optimisation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
