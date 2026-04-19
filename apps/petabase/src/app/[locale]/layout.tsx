import { notFound } from 'next/navigation';

import { ToastProvider } from '@petabase/components/ui/toast-provider';
import { getMessages } from '@petabase/lib/i18n/dictionaries';
import { isLocale, LOCALES } from '@petabase/lib/i18n/config';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  await getMessages(locale);

  return (
    <div lang={locale} className="pb-locale-root">
      <ToastProvider>{children}</ToastProvider>
    </div>
  );
}
