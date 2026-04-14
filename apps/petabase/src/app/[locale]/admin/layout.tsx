import { AppShell } from '@petabase/components/shell/app-shell';
import { getMessages } from '@petabase/lib/i18n/dictionaries';
import { ensureLocale } from '@petabase/lib/i18n/locale';

type AdminLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const messages = await getMessages(locale);

  return (
    <AppShell locale={locale} messages={messages}>
      {children}
    </AppShell>
  );
}
