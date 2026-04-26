'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import type { ComponentProps } from 'react';

import { classNames } from '@petabase/lib/utils/classnames';

function Select({ ...props }: ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root {...props} />;
}

function SelectValue({ ...props }: ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value {...props} />;
}

function SelectTrigger({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={classNames(
        'flex h-10 w-full items-center justify-between rounded-[var(--pb-radius-md)] border border-[var(--pb-color-border)] bg-[var(--pb-color-surface-card)] px-3 text-sm text-[var(--pb-color-heading)] shadow-[var(--pb-elevation-1)] transition-colors duration-[var(--pb-duration-fast)] ease-[var(--pb-ease-standard)] data-[placeholder]:text-[var(--pb-color-body)] focus-visible:border-[var(--pb-color-border-active)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pb-color-primary)] disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-4 text-[var(--pb-color-body)]" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({ className, children, position = 'popper', ...props }: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={classNames(
          'relative z-50 max-h-80 min-w-40 overflow-hidden rounded-[var(--pb-radius-lg)] border border-[var(--pb-color-border)] bg-[var(--pb-color-surface-card)] p-1 text-[var(--pb-color-heading)] shadow-[var(--pb-elevation-2)]',
          position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport className={classNames(position === 'popper' && 'w-full min-w-[var(--radix-select-trigger-width)]')}>
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={classNames(
        'relative flex w-full cursor-default select-none items-center rounded-[var(--pb-radius-md)] py-2 pl-8 pr-3 text-sm text-[var(--pb-color-label)] outline-none transition-colors focus:bg-[var(--pb-color-bg-soft)] focus:text-[var(--pb-color-heading)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="size-4 text-[var(--pb-color-primary)]" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectLabel({ className, ...props }: ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={classNames('px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--pb-color-body)]', className)}
      {...props}
    />
  );
}

function SelectSeparator({ className, ...props }: ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator className={classNames('my-1 h-px bg-[var(--pb-color-border)]', className)} {...props} />;
}

export {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
