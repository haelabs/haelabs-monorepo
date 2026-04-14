import { type AppLocale, normalizeLocale } from '@petabase/lib/i18n/config';

export function ensureLocale(value: string): AppLocale {
  return normalizeLocale(value);
}
