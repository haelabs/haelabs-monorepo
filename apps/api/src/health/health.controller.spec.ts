import assert from 'node:assert/strict';
import test from 'node:test';

import { HealthController } from './health.controller';

test('health controller exposes versioned service readiness contract', () => {
  const controller = new HealthController({
    getHealth: () => ({
      status: 'ok',
      service: 'haelabs-api',
      version: '1',
      database: {
        ready: false,
        status: 'not_configured',
      },
    }),
  } as never);

  const payload = controller.getHealth();

  assert.equal(payload.status, 'ok');
  assert.equal(payload.service, 'haelabs-api');
  assert.equal(payload.version, '1');
  assert.deepEqual(payload.database, {
    ready: false,
    status: 'not_configured',
  });
});
