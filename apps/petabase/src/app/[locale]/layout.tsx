import { notFound } from 'next/navigation';

import { ToastProvider } from '@petabase/components/ui/toast-provider';
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

  return <ToastProvider>{children}</ToastProvider>;
}
