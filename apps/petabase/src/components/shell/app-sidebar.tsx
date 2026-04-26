import { AppNavLinks } from '@petabase/components/shell/app-nav-links';
import { type AppLocale } from '@petabase/lib/i18n/config';
import type { MessageCatalog } from '@petabase/types/i18n';

export type AppSidebarProps = {
  locale: AppLocale;
  messages: MessageCatalog;
};

export function AppSidebar({ locale, messages }: AppSidebarProps) {
  const isThai = locale === 'th';

  return (
    <aside className="pb-sidebar sticky top-[66px] m-4 ml-4 grid content-start gap-4 self-start rounded-[var(--pb-radius-lg)] border border-[var(--pb-color-border)] bg-[linear-gradient(160deg,rgb(255_255_255/0.95)_0%,rgb(248_251_255/1)_100%)] p-4 shadow-[var(--pb-elevation-1)]">
      <div className="pb-sidebar-brand grid gap-1.5">
        <p className="pb-sidebar-kicker">{messages.common.appName}</p>
        <h2 className="text-[22px] font-light leading-tight tracking-[-0.22px] text-[var(--pb-color-heading)]">
          {messages.common.welcome}
        </h2>
        <p className="pb-sidebar-subtitle">{isThai ? 'โหมดปฏิบัติการคลินิก' : 'Clinic operations mode'}</p>
      </div>
      <AppNavLinks locale={locale} messages={messages} surface="sidebar" />
    </aside>
  );
}
