export const SESSION_COOKIE_NAME = 'petabase.session';

const PROTECTED_PREFIXES = ['/dashboard', '/admin'] as const;
const AUTH_PREFIXES = ['/sign-in'] as const;

export function getProtectedPath(localizedPath: string): string | null {
  if (AUTH_PREFIXES.some((prefix) => localizedPath === prefix || localizedPath.startsWith(`${prefix}/`))) {
    return null;
  }

  if (PROTECTED_PREFIXES.some((prefix) => localizedPath === prefix || localizedPath.startsWith(`${prefix}/`))) {
    return localizedPath;
  }

  return null;
}
