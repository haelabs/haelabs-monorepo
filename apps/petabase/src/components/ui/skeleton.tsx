import type { HTMLAttributes } from 'react';

import { classNames } from '@petabase/lib/utils/classnames';

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames(
        'animate-pulse rounded-[var(--pb-radius-md)] bg-[linear-gradient(90deg,rgba(214,224,236,0.8),rgba(229,237,245,0.9),rgba(214,224,236,0.8))]',
        className,
      )}
      {...props}
    />
  );
}
