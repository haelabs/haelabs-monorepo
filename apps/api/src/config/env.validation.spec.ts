import assert from 'node:assert/strict';
import test from 'node:test';

import { validateEnv } from './env.validation';

test('startup fails fast when required environment values are malformed', () => {
  assert.throws(
    () =>
      validateEnv({
        PORT: '70000',
      }),
    /Invalid environment configuration/,
  );
});

test('CORS origin allowlist is parsed and validated from env input', () => {
  const env = validateEnv({
    CORS_ORIGINS: 'https://petabase.dev, https://api.haelabs.dev',
  });

  assert.deepEqual(env.CORS_ORIGINS, ['https://petabase.dev', 'https://api.haelabs.dev']);
  assert.throws(
    () =>
      validateEnv({
        CORS_ORIGINS: 'not-a-valid-origin',
      }),
    /Invalid environment configuration/,
  );
});
