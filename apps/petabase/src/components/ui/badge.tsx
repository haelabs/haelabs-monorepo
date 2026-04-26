import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { classNames } from '@petabase/lib/utils/classnames';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium leading-none',
  {
    variants: {
      variant: {
        default: 'bg-[var(--pb-color-bg-soft)] text-[var(--pb-color-label)]',
        success: 'bg-[color:rgb(21_190_83/0.12)] text-[var(--pb-color-success-text)]',
        warning: 'bg-[color:rgb(155_104_41/0.12)] text-[var(--pb-color-warning)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={classNames(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
