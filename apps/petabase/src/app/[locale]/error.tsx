'use client';

import { useEffect } from 'react';

import { Button } from '@petabase/components/ui/button';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      className="grid min-h-screen place-content-center px-3 py-7"
      style={{
        background:
          'radial-gradient(circle at 0% 0%, rgb(249 107 238 / 7%) 0, transparent 28%), radial-gradient(circle at 100% 100%, rgb(83 58 253 / 7%) 0, transparent 33%), linear-gradient(160deg, rgb(246 249 252 / 78%) 0%, rgb(255 255 255 / 100%) 74%)',
      }}
    >
      <div className="flex items-center justify-center gap-3 rounded-[var(--pb-radius-md)] border border-dashed border-[color:var(--pb-color-border-active)] bg-white px-6 py-6">
        <p className="text-[color:var(--pb-color-heading)]">Something went wrong.</p>
        <Button type="button" onClick={reset}>
          Try again
        </Button>
      </div>
    </main>
  );
}
