import { type AppLocale } from '@petabase/lib/i18n/config';

export function withLocale(locale: AppLocale, path: string): string {
  if (path.startsWith('/')) {
    return `/${locale}${path}`;
  }

  return `/${locale}/${path}`;
}
