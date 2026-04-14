'use client';

import { useEffect } from 'react';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="pb-auth-layout">
      <section className="pb-state-card">
        <p>Something went wrong.</p>
        <button type="button" className="pb-btn" onClick={reset}>
          Try again
        </button>
      </section>
    </main>
  );
}
