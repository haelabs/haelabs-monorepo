import type { ReactNode } from 'react';

import { AppHeader } from '@petabase/components/shell/app-header';
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
      <AppSidebar locale={locale} messages={messages} />
      <div>
        <AppHeader locale={locale} messages={messages} />
        <main className="pb-main">{children}</main>
      </div>
    </div>
  );
}
