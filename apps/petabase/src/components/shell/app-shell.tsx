import type { ReactNode } from 'react';

import { AppHeader } from '@petabase/components/shell/app-header';
import { AppNavLinks } from '@petabase/components/shell/app-nav-links';
import { AppSidebar } from '@petabase/components/shell/app-sidebar';
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
      <div className="pb-shell-device">
        <AppHeader locale={locale} messages={messages} />
        <div className="pb-workspace">
          <AppSidebar locale={locale} messages={messages} />
          <main className="pb-main">{children}</main>
        </div>
      </div>
      <div className="pb-mobile-actions" aria-label="Quick actions">
        <AppNavLinks locale={locale} messages={messages} surface="bottom" />
      </div>
    </div>
  );
}
