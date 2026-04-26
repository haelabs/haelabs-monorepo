import type { InputHTMLAttributes } from 'react';

import { classNames } from '@petabase/lib/utils/classnames';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={classNames(
        'pb-input h-10 w-full rounded-[var(--pb-radius-md)] border border-[var(--pb-color-border)] bg-[var(--pb-color-surface-card)] px-3 text-sm text-[var(--pb-color-heading)] shadow-[var(--pb-elevation-1)] transition-colors duration-[var(--pb-duration-fast)] ease-[var(--pb-ease-standard)] placeholder:text-[var(--pb-color-body)] focus-visible:border-[var(--pb-color-border-active)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pb-color-primary)]',
        className,
      )}
      {...props}
    />
  );
}
