'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalendarDays,
  FileText,
  LayoutDashboard,
  type LucideIcon,
  PawPrint,
  Settings,
  Wallet,
} from 'lucide-react';

import { classNames } from '@petabase/lib/utils/classnames';
import { type AppLocale } from '@petabase/lib/i18n/config';
import { withLocale } from '@petabase/lib/navigation/locale-path';
import type { MessageCatalog } from '@petabase/types/i18n';

type AppNavLinksProps = {
  locale: AppLocale;
  messages: MessageCatalog;
  className?: string;
  surface?: 'top' | 'bottom' | 'sidebar';
};

export function AppNavLinks({ locale, messages, className, surface = 'top' }: AppNavLinksProps) {
  const pathname = usePathname();
  const navClassName = classNames(
    surface === 'bottom' &&
      'pb-bottom-nav mx-auto grid w-full max-w-[680px] grid-cols-3 gap-2 overflow-x-auto md:grid-cols-6',
    surface === 'sidebar' && 'pb-sidebar-nav grid gap-2',
    surface === 'top' && 'pb-top-nav inline-flex items-center gap-2 overflow-x-auto pb-0.5',
  );

  const navItems = [
    {
      href: withLocale(locale, '/dashboard'),
      label: messages.nav.dashboard,
      icon: LayoutDashboard,
    },
    {
      href: withLocale(locale, '/patients'),
      label: messages.nav.patients,
      icon: PawPrint,
    },
    {
      href: withLocale(locale, '/appointments'),
      label: messages.nav.appointments,
      icon: CalendarDays,
    },
    {
      href: withLocale(locale, '/consultations'),
      label: messages.nav.consultations,
      icon: FileText,
    },
    {
      href: withLocale(locale, '/billing'),
      label: messages.nav.billing,
      icon: Wallet,
    },
    {
      href: withLocale(locale, '/admin'),
      label: messages.nav.admin,
      icon: Settings,
    },
  ] as const satisfies ReadonlyArray<{ href: string; label: string; icon: LucideIcon }>;

  return (
    <nav className={classNames(navClassName, className)}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const linkClassName = classNames(
          surface === 'bottom' &&
            'inline-flex min-h-11 min-w-24 flex-col items-center justify-center gap-1 rounded-[var(--pb-radius-md)] border border-[var(--pb-color-border)] bg-[var(--pb-color-surface-card)] px-2 py-1 text-[11px] font-medium text-[var(--pb-color-label)] transition-all duration-[var(--pb-duration-fast)] ease-[var(--pb-ease-standard)] hover:border-[var(--pb-color-border-active)] hover:bg-[var(--pb-color-bg-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pb-color-primary)] focus-visible:ring-offset-2',
          surface === 'sidebar' &&
            'inline-flex min-h-10 items-center gap-2 rounded-[var(--pb-radius-md)] border border-transparent bg-[color:rgb(255_255_255/0.72)] px-3 py-2 text-sm text-[var(--pb-color-label)] transition-all duration-[var(--pb-duration-fast)] ease-[var(--pb-ease-standard)] hover:border-[var(--pb-color-border-active)] hover:bg-[var(--pb-color-primary-soft)] hover:text-[var(--pb-color-heading)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pb-color-primary)] focus-visible:ring-offset-2',
          surface === 'top' &&
            'inline-flex min-h-[34px] items-center gap-2 rounded-[var(--pb-radius-md)] border border-transparent px-3 py-2 text-sm text-[var(--pb-color-label)] transition-all duration-[var(--pb-duration-fast)] ease-[var(--pb-ease-standard)] hover:border-[var(--pb-color-border-active)] hover:bg-[var(--pb-color-primary-soft)] hover:text-[var(--pb-color-heading)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pb-color-primary)] focus-visible:ring-offset-2',
          isActive &&
            'border-[var(--pb-color-border-active)] bg-[var(--pb-color-primary-soft)] text-[var(--pb-color-primary-deep)]',
        );

        return (
          <Link
            key={item.href}
            href={item.href}
            className={linkClassName}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon
              className={classNames('size-4 shrink-0', surface === 'bottom' ? 'size-4' : 'size-4')}
              aria-hidden="true"
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
