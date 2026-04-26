import Image from 'next/image';
import type { HTMLAttributes } from 'react';

import { classNames } from '@petabase/lib/utils/classnames';

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  alt?: string;
  fallback: string;
  src?: string;
};

export function Avatar({ alt, className, fallback, src, ...props }: AvatarProps) {
  if (!src) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={classNames(
          'inline-flex size-10 items-center justify-center rounded-full border border-[var(--pb-color-border)] bg-[var(--pb-color-bg-soft)] text-sm font-semibold text-[var(--pb-color-label)]',
          className,
        )}
        {...props}
      >
        {fallback.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <Image
      alt={alt ?? fallback}
      src={src}
      width={40}
      height={40}
      className={classNames(
        'size-10 rounded-full border border-[var(--pb-color-border)] object-cover',
        className,
      )}
    />
  );
}
