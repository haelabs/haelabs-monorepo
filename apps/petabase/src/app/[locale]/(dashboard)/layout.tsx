import { AppShell } from '@petabase/components/shell/app-shell';
import { getLocaleRequestContextOrThrow } from '@petabase/lib/i18n/request-context';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { locale, messages } = getLocaleRequestContextOrThrow();

  return (
    <AppShell locale={locale} messages={messages}>
      {children}
    </AppShell>
  );
}
