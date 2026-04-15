export const LOCALES = ['th', 'en'] as const;
export const DEFAULT_LOCALE = 'th';
export const LOCALE_COOKIE = 'petabase.locale';

export type AppLocale = (typeof LOCALES)[number];

const LOCALE_SET = new Set<AppLocale>(LOCALES);

export function isLocale(value: string): value is AppLocale {
  return LOCALE_SET.has(value as AppLocale);
}

export function normalizeLocale(value: string): AppLocale {
  const normalizedValue = value.trim().toLowerCase();
  return isLocale(normalizedValue) ? normalizedValue : DEFAULT_LOCALE;
}
