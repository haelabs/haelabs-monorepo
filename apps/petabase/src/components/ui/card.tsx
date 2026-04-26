import type { ReactNode } from 'react';

import { classNames } from '@petabase/lib/utils/classnames';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <section
      className={classNames(
        'pb-card rounded-[var(--pb-radius-lg)] border border-[var(--pb-color-border)] bg-[var(--pb-color-surface-card)] p-4 shadow-[var(--pb-elevation-1)]',
        className,
      )}
    >
      {children}
    </section>
  );
}
