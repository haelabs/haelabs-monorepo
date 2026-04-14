import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default('Petabase'),
  NEXT_PUBLIC_API_BASE_URL: z.string().url().default('http://localhost:3000/api/v1'),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.enum(['th', 'en']).default('th'),
  NEXT_PUBLIC_ENABLE_AUTH_GUARD: z.enum(['true', 'false']).default('false'),
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
