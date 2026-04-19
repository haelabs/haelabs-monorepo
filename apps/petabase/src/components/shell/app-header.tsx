import Link from 'next/link';

import { AppNavLinks } from '@petabase/components/shell/app-nav-links';
import { type AppLocale } from '@petabase/lib/i18n/config';
import { withLocale } from '@petabase/lib/navigation/locale-path';
import type { MessageCatalog } from '@petabase/types/i18n';

export type AppHeaderProps = {
  locale: AppLocale;
  messages: MessageCatalog;
};

export function AppHeader({ locale, messages }: AppHeaderProps) {
  const isThai = locale === 'th';
  const signInHref = withLocale(locale, '/sign-in');

  return (
    <header className="pb-header" role="banner">
      <div className="pb-header-row">
        <div className="pb-header-brand">
          <p className="pb-header-kicker">{isThai ? 'หลังบ้าน' : 'Backoffice'}</p>
          <p>{messages.common.appName}</p>
        </div>
        <div className="pb-header-actions">
          <Link href={signInHref} className="pb-btn pb-btn-ghost">
            {messages.nav.signIn}
          </Link>
        </div>
      </div>
      <AppNavLinks locale={locale} messages={messages} />
    </header>
  );
}
