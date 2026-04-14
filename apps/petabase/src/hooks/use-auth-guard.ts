'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { type AppLocale } from '@petabase/lib/i18n/config';
import { withLocale } from '@petabase/lib/navigation/locale-path';

type UseAuthGuardOptions = {
  locale: AppLocale;
  isAuthenticated: boolean;
};

export function useAuthGuard({ locale, isAuthenticated }: UseAuthGuardOptions): void {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(withLocale(locale, '/sign-in'));
    }
  }, [isAuthenticated, locale, router]);
}
