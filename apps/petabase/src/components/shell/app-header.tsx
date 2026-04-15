import Link from 'next/link';

import { type AppLocale } from '@petabase/lib/i18n/config';
import { withLocale } from '@petabase/lib/navigation/locale-path';
import type { MessageCatalog } from '@petabase/types/i18n';

export type AppHeaderProps = {
  locale: AppLocale;
  messages: MessageCatalog;
};

export function AppHeader({ locale, messages }: AppHeaderProps) {
  const signInHref = withLocale(locale, '/sign-in');

  return (
    <header className="pb-header">
      <p>{messages.common.appName}</p>
      <div className="pb-header-actions">
        <Link href={signInHref} className="pb-btn pb-btn-ghost">
          {messages.nav.signIn}
        </Link>
      </div>
    </header>
  );
}
