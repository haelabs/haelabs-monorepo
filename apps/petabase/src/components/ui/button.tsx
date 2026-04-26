import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';

import { classNames } from '@petabase/lib/utils/classnames';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--pb-radius-md)] text-sm',
    'font-medium transition-all duration-[var(--pb-duration-base)] ease-[var(--pb-ease-standard)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pb-color-primary)] focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-60',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--pb-color-primary)] text-[var(--pb-color-text-inverse)] shadow-[var(--pb-elevation-1)] hover:bg-[var(--pb-color-primary-hover)]',
        ghost:
          'border border-transparent bg-transparent text-[var(--pb-color-label)] hover:border-[var(--pb-color-border-active)] hover:bg-[var(--pb-color-primary-soft)]',
        outline:
          'border border-[var(--pb-color-border)] bg-[var(--pb-color-surface-card)] text-[var(--pb-color-heading)] hover:border-[var(--pb-color-border-active)] hover:bg-[var(--pb-color-bg-soft)]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-11 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
};

export function Button({ asChild, className, size, variant, ...props }: ButtonProps) {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      className={classNames('pb-btn', buttonVariants({ size, variant }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
