'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { classNames } from '@petabase/lib/utils/classnames';

const toastVariants = cva(
  'rounded-[var(--pb-radius-lg)] border bg-[var(--pb-color-surface-card)] px-3 py-2 text-sm text-[var(--pb-color-heading)] shadow-[var(--pb-elevation-2)]',
  {
    variants: {
      tone: {
        default: 'border-[var(--pb-color-border)]',
        success: 'border-[color:rgb(21_190_83/0.3)] bg-[var(--pb-color-success-soft)]',
        warning: 'border-[color:rgb(155_104_41/0.3)] bg-[var(--pb-color-warning-soft)]',
      },
    },
    defaultVariants: {
      tone: 'default',
    },
  },
);

type ToastProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof toastVariants>;

export function Toast({ className, tone, ...props }: ToastProps) {
  return <div className={classNames(toastVariants({ tone }), className)} {...props} />;
}
