import { cache } from 'react';

import { type AppLocale } from '@petabase/lib/i18n/config';
import type { MessageCatalog } from '@petabase/types/i18n';

type LocaleRequestContext = {
  locale: AppLocale | null;
  messages: MessageCatalog | null;
};

const getLocaleRequestContext = cache<() => LocaleRequestContext>(() => ({
  locale: null,
  messages: null,
}));

export function setLocaleRequestContext(locale: AppLocale, messages: MessageCatalog) {
  const context = getLocaleRequestContext();
  context.locale = locale;
  context.messages = messages;
}

export function getLocaleRequestContextOrThrow(): { locale: AppLocale; messages: MessageCatalog } {
  const context = getLocaleRequestContext();

  if (context.locale === null || context.messages === null) {
    throw new Error('Locale request context has not been initialized.');
  }

  return {
    locale: context.locale,
    messages: context.messages,
  };
}
