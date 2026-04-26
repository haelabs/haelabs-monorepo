'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import type { ComponentProps } from 'react';

import { classNames } from '@petabase/lib/utils/classnames';

const sheetVariants = cva(
  'fixed z-50 border-[var(--pb-color-border)] bg-[var(--pb-color-surface-card)] p-6 shadow-[var(--pb-elevation-2)] transition duration-[var(--pb-duration-base)] ease-[var(--pb-ease-standard)]',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b',
        right: 'inset-y-0 right-0 h-full w-full border-l sm:max-w-md',
        bottom: 'inset-x-0 bottom-0 border-t',
        left: 'inset-y-0 left-0 h-full w-full border-r sm:max-w-md',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

function Sheet({ ...props }: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />;
}

function SheetTrigger({ ...props }: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props} />;
}

function SheetClose({ ...props }: ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close {...props} />;
}

function SheetPortal({ ...props }: ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal {...props} />;
}

function SheetOverlay({ className, ...props }: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={classNames('fixed inset-0 z-50 bg-[var(--pb-color-surface-overlay)] backdrop-blur-[2px]', className)}
      {...props}
    />
  );
}

type SheetContentProps = ComponentProps<typeof DialogPrimitive.Content> & VariantProps<typeof sheetVariants>;

function SheetContent({ className, children, side, ...props }: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content className={classNames(sheetVariants({ side }), className)} {...props}>
        {children}
        <DialogPrimitive.Close
          className="absolute right-4 top-4 rounded-[var(--pb-radius-sm)] p-1 text-[var(--pb-color-body)] transition-colors hover:bg-[var(--pb-color-bg-soft)] hover:text-[var(--pb-color-heading)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pb-color-primary)]"
          aria-label="Close sheet"
        >
          <X className="size-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={classNames('flex flex-col gap-1.5 text-left', className)} {...props} />;
}

function SheetFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div className={classNames('mt-4 flex items-center justify-end gap-2', className)} {...props} />;
}

function SheetTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={classNames('text-lg font-semibold text-[var(--pb-color-heading)]', className)} {...props} />;
}

function SheetDescription({ className, ...props }: ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description className={classNames('text-sm text-[var(--pb-color-body)]', className)} {...props} />;
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
