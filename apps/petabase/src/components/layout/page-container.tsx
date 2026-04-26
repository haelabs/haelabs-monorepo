import type { ReactNode } from 'react';

type PageContainerProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function PageContainer({ title, description, children }: PageContainerProps) {
  return (
    <section className="pb-page-container grid max-w-[1160px] gap-4">
      <header className="pb-page-header grid gap-2">
        <h1 className="text-[clamp(1.75rem,3vw,2rem)] font-light leading-[1.1] tracking-[-0.02em] text-[var(--pb-color-heading)]">
          {title}
        </h1>
        {description ? <p className="max-w-[70ch] text-sm text-[var(--pb-color-body)]">{description}</p> : null}
      </header>
      {children}
    </section>
  );
}
