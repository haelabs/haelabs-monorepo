# Testing Patterns

**Analysis Date:** 2026-04-18

## Test Framework

**Runner:**
- Node.js built-in test runner (`node:test`) for API tests.
- Config: test runner is configured via `apps/api/package.json` script (`node --require ts-node/register --require reflect-metadata --test "src/**/*.spec.ts"`).

**Assertion Library:**
- Node.js strict assert (`node:assert/strict`).

**Run Commands:**
```bash
pnpm test                                # Run all Nx project test targets from workspace root
pnpm --filter @haelabs/api test          # Run API spec files
Not applicable                           # Watch mode command is not defined
```

## Test File Organization

**Location:**
- Co-located with source in `apps/api/src/**`.

**Naming:**
- Use `*.spec.ts`, e.g. `apps/api/src/main.bootstrap.spec.ts`, `apps/api/src/common/filters/http-exception.filter.spec.ts`.

**Structure:**
```
apps/api/src/
├── main.bootstrap.spec.ts
├── config/env.validation.spec.ts
├── health/health.controller.spec.ts
└── common/
    ├── filters/http-exception.filter.spec.ts
    └── interceptors/response-envelope.interceptor.spec.ts
```

## Test Structure

**Suite Organization:**
```typescript
import assert from 'node:assert/strict';
import test from 'node:test';

test('global cors validator uses validated env origins', () => {
  const validateOrigin = buildCorsOriginValidator(['https://petabase.dev']);
  assert.equal(validateOrigin('https://petabase.dev'), true);
  assert.equal(validateOrigin('https://blocked.dev'), false);
});
```

**Patterns:**
- Setup pattern: instantiate target directly inside each `test(...)` block (no shared global setup), e.g. `new ResponseEnvelopeInterceptor()` in `apps/api/src/common/interceptors/response-envelope.interceptor.spec.ts`.
- Teardown pattern: no explicit teardown hooks are used; tests rely on local scope and immutable fixtures.
- Assertion pattern: use `assert.equal`, `assert.deepEqual`, `assert.match`, and `assert.throws`.

## Mocking

**Framework:**
- No dedicated mocking framework detected.

**Patterns:**
```typescript
const controller = new HealthController({
  getHealth: () => ({ status: 'ok', service: 'haelabs-api', version: '1' }),
} as never);

const context = {
  switchToHttp: () => ({
    getResponse: () => ({ getHeader: () => 'req-health-1' }),
  }),
};
```

**What to Mock:**
- Mock collaborator interfaces with inline object literals for controller/service dependencies (e.g. `HealthService` substitute in `apps/api/src/health/health.controller.spec.ts`).
- Mock Nest execution context/request/response as plain objects for filter/interceptor tests (`apps/api/src/common/filters/http-exception.filter.spec.ts`, `apps/api/src/common/interceptors/response-envelope.interceptor.spec.ts`).

**What NOT to Mock:**
- Do not mock Node assertion/test APIs.
- Do not mock pure helper logic; call helpers directly (e.g. `validateEnv` in `apps/api/src/config/env.validation.spec.ts`, `getRouteBase` in `apps/api/src/main.bootstrap.spec.ts`).

## Fixtures and Factories

**Test Data:**
```typescript
const capture = runFilter(new HttpException('Forbidden', HttpStatus.FORBIDDEN), {
  requestId: 'req-123',
});
```

**Location:**
- Inline test data helpers live inside spec files (e.g. `runFilter` in `apps/api/src/common/filters/http-exception.filter.spec.ts`).
- Shared fixture/factory directories are not detected.

## Coverage

**Requirements:** None enforced in current scripts/config.

**View Coverage:**
```bash
Not configured in repository scripts
```

## Test Types

**Unit Tests:**
- API tests focus on unit/contract behavior of filters, interceptors, env validation, and controller responses in `apps/api/src/**/*.spec.ts`.

**Integration Tests:**
- Not detected.

**E2E Tests:**
- Not used (no Playwright/Cypress/E2E config files detected).

## Common Patterns

**Async Testing:**
```typescript
const output = await lastValueFrom(
  interceptor.intercept(context as never, {
    handle: () => of({ status: 'ok' }),
  }),
);
```

**Error Testing:**
```typescript
assert.throws(
  () => validateEnv({ PORT: '70000' }),
  /Invalid environment configuration/,
);
```

---

*Testing analysis: 2026-04-18*
