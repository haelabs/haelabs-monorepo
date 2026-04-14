import assert from 'node:assert/strict';
import test from 'node:test';

import { buildCorsOriginValidator, getRouteBase } from './main';

test('all controllers resolve under /api/v1 route base', () => {
  assert.equal(getRouteBase(), '/api/v1');
});

test('global cors validator uses validated env origins', () => {
  const validateOrigin = buildCorsOriginValidator(['https://petabase.dev']);

  assert.equal(validateOrigin(undefined), true);
  assert.equal(validateOrigin('https://petabase.dev'), true);
  assert.equal(validateOrigin('https://blocked.dev'), false);
});
