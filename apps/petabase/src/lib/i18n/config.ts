export const LOCALES = ['th', 'en'] as const;
export const DEFAULT_LOCALE = 'th';
export const LOCALE_COOKIE = 'petabase.locale';

export type AppLocale = (typeof LOCALES)[number];

export function isLocale(value: string): value is AppLocale {
  return LOCALES.includes(value as AppLocale);
}

export function normalizeLocale(value: string): AppLocale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
