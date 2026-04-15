import assert from 'node:assert/strict';
import test from 'node:test';
import { lastValueFrom, of } from 'rxjs';

import { ResponseEnvelopeInterceptor } from '../common/interceptors/response-envelope.interceptor';
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

test('health response is wrapped in success envelope contract', async () => {
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

  const interceptor = new ResponseEnvelopeInterceptor<ReturnType<HealthController['getHealth']>>();

  const result = await lastValueFrom(
    interceptor.intercept(
      {
        switchToHttp: () => ({
          getResponse: () => ({
            getHeader: () => 'req-health-1',
          }),
        }),
      } as never,
      {
        handle: () => of(controller.getHealth()),
      },
    ),
  );

  assert.equal(result.data.status, 'ok');
  assert.equal(result.data.service, 'haelabs-api');
  assert.equal(result.data.version, '1');
  assert.deepEqual(result.data.database, {
    ready: false,
    status: 'not_configured',
  });
  assert.equal(result.meta?.requestId, 'req-health-1');
  assert.match(result.meta?.timestamp ?? '', /^\d{4}-\d{2}-\d{2}T/);
});
