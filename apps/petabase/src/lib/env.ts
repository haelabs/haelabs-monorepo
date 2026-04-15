import { z } from 'zod';

import { DEFAULT_LOCALE, LOCALES } from './i18n/config';

function withDefault<T>(value: T | undefined, fallback: T): T {
  return value === undefined ? fallback : value;
}

const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.preprocess(
    (value) => withDefault(value as string | undefined, 'Petabase'),
    z.string().trim().min(1),
  ),
  NEXT_PUBLIC_API_BASE_URL: z.preprocess(
    (value) => withDefault(value as string | undefined, 'http://localhost:3000/api/v1'),
    z.string().url(),
  ),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.preprocess(
    (value) => withDefault(value as string | undefined, DEFAULT_LOCALE),
    z.enum(LOCALES),
  ),
  NEXT_PUBLIC_ENABLE_AUTH_GUARD: z.preprocess(
    (value) => withDefault(value as string | undefined, 'false'),
    z.enum(['true', 'false']),
  ),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  NEXT_PUBLIC_ENABLE_AUTH_GUARD: process.env.NEXT_PUBLIC_ENABLE_AUTH_GUARD,
});

if (!parsed.success) {
  const issues = parsed.error.issues.map((issue) => `- ${issue.path.join('.')}: ${issue.message}`);
  throw new Error(`Invalid Petabase environment configuration:\n${issues.join('\n')}`);
}

export const env = parsed.data;
