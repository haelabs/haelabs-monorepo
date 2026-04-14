import type { Metadata } from 'next';

import '@petabase/app/globals.css';

export const metadata: Metadata = {
  title: 'Petabase',
  description: 'Staff-facing clinic operations app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
