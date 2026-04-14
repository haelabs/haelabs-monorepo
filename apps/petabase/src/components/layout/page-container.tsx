import type { ReactNode } from 'react';

type PageContainerProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function PageContainer({ title, description, children }: PageContainerProps) {
  return (
    <section className="pb-page-container">
      <header className="pb-page-header">
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </header>
      {children}
    </section>
  );
}
