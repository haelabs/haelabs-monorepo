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
    <aside className="pb-sidebar">
      <div className="pb-sidebar-brand">
        <p className="pb-sidebar-kicker">{messages.common.appName}</p>
        <h2>{messages.common.welcome}</h2>
        <p className="pb-sidebar-subtitle">{isThai ? 'โหมดปฏิบัติการคลินิก' : 'Clinic operations mode'}</p>
      </div>
      <AppNavLinks locale={locale} messages={messages} surface="sidebar" />
    </aside>
  );
}
