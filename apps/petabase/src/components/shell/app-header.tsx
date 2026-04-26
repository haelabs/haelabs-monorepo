import Link from 'next/link';

import { AppNavLinks } from '@petabase/components/shell/app-nav-links';
import { Button } from '@petabase/components/ui/button';
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
    <header
      className="pb-header sticky top-0 z-30 grid gap-2.5 border-b border-[var(--pb-color-border)] bg-[color:rgb(255_255_255/0.9)] px-4 py-3 shadow-[0_1px_0_rgb(0_55_112/0.08),0_12px_24px_-20px_rgb(50_50_93/0.06)] backdrop-blur-lg"
      role="banner"
    >
      <div className="pb-header-row flex items-center justify-between gap-3">
        <div className="pb-header-window-controls inline-flex items-center gap-1.5 pr-1" aria-hidden="true">
          <span className="pb-window-dot pb-window-dot-close" />
          <span className="pb-window-dot pb-window-dot-minimize" />
          <span className="pb-window-dot pb-window-dot-expand" />
        </div>
        <div className="pb-header-brand grid gap-0.5">
          <p className="pb-header-kicker">{isThai ? 'หลังบ้าน' : 'Backoffice'}</p>
          <p className="text-sm font-medium text-[var(--pb-color-heading)]">{messages.common.appName}</p>
        </div>
        <div className="pb-header-actions inline-flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="h-9 rounded-[var(--pb-radius-pill)] px-4">
            <Link href={signInHref}>{messages.nav.signIn}</Link>
          </Button>
        </div>
      </div>
      <AppNavLinks locale={locale} messages={messages} surface="top" />
    </header>
  );
}
