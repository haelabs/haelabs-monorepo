import { NextRequest, NextResponse } from 'next/server';

import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  type AppLocale,
  isLocale,
} from './src/lib/i18n/config';
import { getProtectedPath, SESSION_COOKIE_NAME } from './src/lib/auth/protection';
import { env } from './src/lib/env';

const PUBLIC_FILE = /\.[^/]+$/;

function getPreferredLocale(request: NextRequest): AppLocale {
  const localeCookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (localeCookie && isLocale(localeCookie)) {
    return localeCookie;
  }

  const header = request.headers.get('accept-language');
  if (!header) {
    return DEFAULT_LOCALE;
  }

  const rawValues = header
    .split(',')
    .map((part) => part.split(';')[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const value of rawValues) {
    if (!value) {
      continue;
    }

    if (isLocale(value)) {
      return value;
    }

    const base = value.split('-')[0];
    if (base && isLocale(base)) {
      return base;
    }
  }

  return DEFAULT_LOCALE;
}

function shouldRunAuthGuard(): boolean {
  return env.NEXT_PUBLIC_ENABLE_AUTH_GUARD === 'true';
}

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const preferredLocale = getPreferredLocale(request);
  const firstSegment = segments[0];

  if (!firstSegment) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${preferredLocale}`;

    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set(LOCALE_COOKIE, preferredLocale, { path: '/', sameSite: 'lax' });
    return response;
  }

  if (!isLocale(firstSegment)) {
    const nextPath = firstSegment.length === 2 ? segments.slice(1).join('/') : segments.join('/');
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = nextPath ? `/${preferredLocale}/${nextPath}` : `/${preferredLocale}`;

    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set(LOCALE_COOKIE, preferredLocale, { path: '/', sameSite: 'lax' });
    return response;
  }

  const locale = firstSegment;
  const localizedPath = `/${segments.slice(1).join('/')}`;

  if (shouldRunAuthGuard()) {
    const protectedPath = getProtectedPath(localizedPath);
    const hasSession = Boolean(request.cookies.get(SESSION_COOKIE_NAME)?.value);

    if (protectedPath && !hasSession) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = `/${locale}/sign-in`;
      redirectUrl.searchParams.set('next', localizedPath);
      return NextResponse.redirect(redirectUrl);
    }
  }

  const response = NextResponse.next();
  response.cookies.set(LOCALE_COOKIE, locale, { path: '/', sameSite: 'lax' });
  return response;
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
};
