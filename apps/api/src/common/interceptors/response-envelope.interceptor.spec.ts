import assert from 'node:assert/strict';
import test from 'node:test';

import { StreamableFile } from '@nestjs/common';
import { of, lastValueFrom } from 'rxjs';

import { ResponseEnvelopeInterceptor } from './response-envelope.interceptor';

function createContext(requestId?: string) {
  return {
    switchToHttp: () => ({
      getResponse: () => ({
        getHeader: (header: string) => (header === 'x-request-id' ? requestId : undefined),
      }),
    }),
  };
}

test('interceptor wraps plain payloads in success envelope', async () => {
  const interceptor = new ResponseEnvelopeInterceptor<Record<string, string>>();
  const context = createContext('req-42');

  const output = await lastValueFrom(
    interceptor.intercept(context as never, {
      handle: () => of({ status: 'ok' }),
    }),
  );

  assert.deepEqual(output.data, { status: 'ok' });
  assert.equal(output.meta?.requestId, 'req-42');
  assert.match(output.meta?.timestamp ?? '', /^\d{4}-\d{2}-\d{2}T/);
});

test('interceptor preserves already wrapped envelopes even without meta', async () => {
  const interceptor = new ResponseEnvelopeInterceptor<unknown>();
  const context = createContext('req-99');
  const alreadyWrapped = { data: { status: 'ok' } };

  const output = await lastValueFrom(
    interceptor.intercept(context as never, {
      handle: () => of(alreadyWrapped as unknown),
    } as never),
  );

  assert.equal(output, alreadyWrapped);
});

test('interceptor passes through stream responses unchanged', async () => {
  const interceptor = new ResponseEnvelopeInterceptor<StreamableFile>();
  const context = createContext();
  const stream = new StreamableFile(Buffer.from('healthy'));

  const output = await lastValueFrom(
    interceptor.intercept(context as never, {
      handle: () => of(stream),
    }),
  );

  assert.equal(output, stream);
});
