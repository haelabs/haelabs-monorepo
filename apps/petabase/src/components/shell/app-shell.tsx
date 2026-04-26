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
    <div className="pb-shell relative min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_2%_2%,rgb(72_127_176/0.08)_0,transparent_36%),radial-gradient(circle_at_88%_92%,rgb(83_58_253/0.04)_0,transparent_38%),linear-gradient(180deg,rgb(244_248_252/0.86)_0%,rgb(255_255_255/1)_260px)] p-4">
      <div className="pb-shell-device grid min-h-[calc(100vh-2rem)] grid-rows-[auto_1fr] overflow-hidden rounded-[var(--pb-radius-xl)] border border-[var(--pb-color-border)] bg-[var(--pb-color-surface-raised)] shadow-[var(--pb-elevation-2)]">
        <AppHeader locale={locale} messages={messages} />
        <div className="pb-workspace grid min-h-0 grid-cols-[minmax(220px,270px)_minmax(0,1fr)]">
          <AppSidebar locale={locale} messages={messages} />
          <main className="pb-main m-0 w-full min-w-0 overflow-auto p-4 md:px-5 md:pb-6">{children}</main>
        </div>
      </div>
      <div
        className="pb-mobile-actions fixed inset-x-0 bottom-0 z-40 hidden border-t border-[var(--pb-color-border)] bg-[linear-gradient(180deg,rgb(255_255_255/0.35)_0%,rgb(255_255_255/0.94)_45%,#fff_100%)] px-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl"
        aria-label="Quick actions"
      >
        <AppNavLinks locale={locale} messages={messages} surface="bottom" />
      </div>
    </div>
  );
}
