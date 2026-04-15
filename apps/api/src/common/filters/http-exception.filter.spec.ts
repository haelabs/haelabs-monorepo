import assert from 'node:assert/strict';
import test from 'node:test';

import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

import { HttpExceptionFilter } from './http-exception.filter';

type ResponseCapture = {
  statusCode: number;
  body: unknown;
};

function runFilter(
  exception: unknown,
  options?: {
    requestId?: string;
    responseRequestId?: string;
  },
): ResponseCapture {
  const filter = new HttpExceptionFilter();
  const capture: ResponseCapture = {
    statusCode: 0,
    body: null,
  };

  const request = {
    originalUrl: '/api/v1/health',
    header: (name: string) => (name.toLowerCase() === 'x-request-id' ? options?.requestId : undefined),
  };

  const response = {
    getHeader: (name: string) => (name.toLowerCase() === 'x-request-id' ? options?.responseRequestId : undefined),
    status(code: number) {
      capture.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      capture.body = payload;
    },
  };

  const host = {
    switchToHttp: () => ({
      getRequest: () => request,
      getResponse: () => response,
    }),
  };

  filter.catch(exception, host as never);
  return capture;
}

test('exception filter emits normalized error envelope with request metadata', () => {
  const capture = runFilter(new HttpException('Forbidden', HttpStatus.FORBIDDEN), {
    requestId: 'req-123',
  });

  assert.equal(capture.statusCode, HttpStatus.FORBIDDEN);

  const payload = capture.body as {
    error: { code: string; message: string; details?: unknown };
    meta: { timestamp: string; path: string; requestId?: string };
  };

  assert.equal(payload.error.code, 'HTTP_ERROR');
  assert.equal(payload.error.message, 'Forbidden');
  assert.equal(payload.meta.path, '/api/v1/health');
  assert.equal(payload.meta.requestId, 'req-123');
  assert.match(payload.meta.timestamp, /^\d{4}-\d{2}-\d{2}T/);
});

test('exception filter uses canonical request id from response header fallback', () => {
  const capture = runFilter(new HttpException('Forbidden', HttpStatus.FORBIDDEN), {
    responseRequestId: 'generated-req-1',
  });

  const payload = capture.body as {
    meta: { requestId?: string };
  };

  assert.equal(payload.meta.requestId, 'generated-req-1');
});

test('validation-style payloads are sanitized and do not leak target/value', () => {
  const capture = runFilter(
    new BadRequestException({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        details: [
          {
            field: 'email',
            constraints: ['must be an email'],
            target: { leaked: true },
            value: 'bad@email',
          },
        ],
      },
    }),
  );

  assert.equal(capture.statusCode, HttpStatus.BAD_REQUEST);

  const payload = capture.body as {
    error: { code: string; message: string; details?: Array<Record<string, unknown>> };
  };

  assert.equal(payload.error.code, 'VALIDATION_ERROR');
  assert.equal(payload.error.message, 'Request validation failed');
  assert.equal(Array.isArray(payload.error.details), true);

  const firstDetail = payload.error.details?.[0] ?? {};
  assert.equal('target' in firstDetail, false);
  assert.equal('value' in firstDetail, false);
});
