import type { Metadata } from 'next';
import { Noto_Sans_Thai, Plus_Jakarta_Sans, Source_Code_Pro } from 'next/font/google';

import '@petabase/styles/tokens.css';
import '@petabase/app/globals.css';

const primarySans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--pb-font-latin',
  weight: ['300', '400', '500'],
});

const thaiSans = Noto_Sans_Thai({
  subsets: ['thai'],
  display: 'swap',
  variable: '--pb-font-thai',
  weight: ['300', '400', '500'],
});

const mono = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--pb-font-mono-real',
  weight: ['500', '700'],
});

export const metadata: Metadata = {
  title: 'Petabase',
  description: 'Staff-facing clinic operations app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={`${primarySans.variable} ${thaiSans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
