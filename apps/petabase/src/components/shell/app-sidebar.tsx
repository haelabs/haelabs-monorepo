import Link from 'next/link';

import { type AppLocale } from '@petabase/lib/i18n/config';
import { withLocale } from '@petabase/lib/navigation/locale-path';
import type { MessageCatalog } from '@petabase/types/i18n';

export type AppSidebarProps = {
  locale: AppLocale;
  messages: MessageCatalog;
};

export function AppSidebar({ locale, messages }: AppSidebarProps) {
  const isThai = locale === 'th';
  const navigationItems = [
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
    <aside className="pb-sidebar">
      <div className="pb-sidebar-brand">
        <p className="pb-sidebar-kicker">{messages.common.appName}</p>
        <h2>{messages.common.welcome}</h2>
        <p className="pb-sidebar-subtitle">{isThai ? 'โหมดปฏิบัติการคลินิก' : 'Clinic operations mode'}</p>
      </div>

      <nav className="pb-sidebar-nav">
        {navigationItems.map((item) => (
          <Link key={item.href} href={item.href} className="pb-sidebar-link">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
