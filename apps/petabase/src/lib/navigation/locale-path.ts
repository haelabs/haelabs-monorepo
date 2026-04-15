import { type AppLocale } from '@petabase/lib/i18n/config';

function normalizePath(path: string): string {
  const normalized = path.trim();

  if (normalized === '' || normalized === '/') {
    return '';
  }

  if (normalized.startsWith('?') || normalized.startsWith('#')) {
    return normalized;
  }

  return `/${normalized.replace(/^\/+/, '')}`;
}

export function withLocale(locale: AppLocale, path: string): string {
  return `/${locale}${normalizePath(path)}`;
}
