import Link from 'next/link';

import { type AppLocale } from '@petabase/lib/i18n/config';
import { withLocale } from '@petabase/lib/navigation/locale-path';
import type { MessageCatalog } from '@petabase/types/i18n';

type AppSidebarProps = {
  locale: AppLocale;
  messages: MessageCatalog;
};

export function AppSidebar({ locale, messages }: AppSidebarProps) {
  return (
    <aside className="pb-sidebar">
      <div>
        <p className="pb-sidebar-kicker">{messages.common.appName}</p>
        <h2>{messages.common.welcome}</h2>
      </div>

      <nav>
        <Link href={withLocale(locale, '/dashboard')}>{messages.nav.dashboard}</Link>
        <Link href={withLocale(locale, '/admin')}>{messages.nav.admin}</Link>
      </nav>
    </aside>
  );
}
