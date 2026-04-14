'use client';

import { useMemo } from 'react';

import { type AppLocale } from '@petabase/lib/i18n/config';
import { withLocale } from '@petabase/lib/navigation/locale-path';

export function useLocalePath(locale: AppLocale) {
  return useMemo(
    () => ({
      to: (path: string) => withLocale(locale, path),
    }),
    [locale],
  );
}
