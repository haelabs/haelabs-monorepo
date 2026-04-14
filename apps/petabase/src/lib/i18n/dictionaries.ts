import en from '@petabase/messages/en';
import th from '@petabase/messages/th';
import type { MessageCatalog } from '@petabase/types/i18n';
import { type AppLocale, DEFAULT_LOCALE } from '@petabase/lib/i18n/config';

const dictionaries: Record<AppLocale, MessageCatalog> = {
  en,
  th,
};

export async function getMessages(locale: AppLocale): Promise<MessageCatalog> {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}
