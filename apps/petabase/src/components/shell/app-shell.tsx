import type { ReactNode } from 'react';

import { AppHeader } from '@petabase/components/shell/app-header';
import { AppNavLinks } from '@petabase/components/shell/app-nav-links';
import { type AppLocale } from '@petabase/lib/i18n/config';
import type { MessageCatalog } from '@petabase/types/i18n';

export type AppShellProps = {
  locale: AppLocale;
  messages: MessageCatalog;
  children: ReactNode;
};

export function AppShell({ locale, messages, children }: AppShellProps) {
  return (
    <div className="pb-shell">
      <AppHeader locale={locale} messages={messages} />
      <main className="pb-main">{children}</main>
      <div className="pb-mobile-actions" aria-label="Quick actions">
        <AppNavLinks locale={locale} messages={messages} compact />
      </div>
    </div>
  );
}
