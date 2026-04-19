'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const navClassName =
    surface === 'bottom' ? 'pb-bottom-nav' : surface === 'sidebar' ? 'pb-sidebar-nav' : 'pb-top-nav';
  const linkClassName =
    surface === 'bottom'
      ? 'pb-bottom-nav-link'
      : surface === 'sidebar'
        ? 'pb-sidebar-link'
        : 'pb-top-nav-link';

  const navItems = [
    {
      href: withLocale(locale, '/dashboard'),
      label: messages.nav.dashboard,
    },
    {
      href: withLocale(locale, '/admin'),
      label: messages.nav.admin,
    },
  ] as const;

  return (
    <nav className={classNames(navClassName, className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={classNames(linkClassName, isActive && 'is-active')}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
