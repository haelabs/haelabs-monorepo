import Link from 'next/link';

export default function LocaleNotFound() {
  return (
    <main className="pb-auth-layout">
      <section className="pb-state-card">
        <p>Page not found.</p>
        <Link href="/th/dashboard" className="pb-btn">
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
