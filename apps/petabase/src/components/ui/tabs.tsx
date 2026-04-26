'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { ComponentProps } from 'react';

import { classNames } from '@petabase/lib/utils/classnames';

function Tabs({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root className={classNames('flex flex-col gap-4', className)} {...props} />;
}

function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={classNames(
        'inline-flex h-10 items-center gap-1 rounded-[var(--pb-radius-lg)] border border-[var(--pb-color-border)] bg-[var(--pb-color-bg-soft)] p-1',
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={classNames(
        'inline-flex items-center justify-center rounded-[var(--pb-radius-md)] px-3 py-1.5 text-sm font-medium text-[var(--pb-color-body)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pb-color-primary)] disabled:pointer-events-none disabled:opacity-60 data-[state=active]:bg-white data-[state=active]:text-[var(--pb-color-heading)] data-[state=active]:shadow-[var(--pb-shadow-soft)]',
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={classNames('rounded-[var(--pb-radius-lg)] border border-[var(--pb-color-border)] bg-white p-4 focus-visible:outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
