# Technology Stack

**Analysis Date:** 2026-04-18

## Languages

**Primary:**
- TypeScript 5.9.3 - Workspace language for `apps/api` and `apps/petabase` (`package.json`, `apps/api/package.json`, `apps/petabase/package.json`)

**Secondary:**
- JavaScript (ES modules + CommonJS) - Tooling and config scripts in `tools/scripts/run-target.mjs`, `apps/api/eslint.config.cjs`, `.github/workflows/*.yml`
- Shell (bash) - CI helpers in `tools/ci/*.sh`

## Runtime

**Environment:**
- Node.js runtime required for workspace commands (`README.md` states Node.js 24+)
- Node.js 22 used by CI workflows (`.github/workflows/ci.yml`, `.github/workflows/deploy-production.yml`)

**Package Manager:**
- pnpm 10.8.1 (`package.json` `packageManager`, `.github/workflows/*.yml`)
- Lockfile: present at `pnpm-lock.yaml`

## Frameworks

**Core:**
- Nx 22.6.5 - Monorepo task orchestration (`package.json`, `nx.json`, `apps/*/project.json`)
- NestJS 11.1.6 - Backend API app in `apps/api` (`apps/api/package.json`, `apps/api/src/main.ts`)
- Next.js 15.5.9 + React 19.1.1 - Frontend app in `apps/petabase` (`apps/petabase/package.json`, `apps/petabase/src/app/*`)

**Testing:**
- Node built-in test runner (`node:test`) - API tests (`apps/api/package.json` test script, `apps/api/src/**/*.spec.ts`)

**Build/Dev:**
- TypeScript compiler (`tsc`) - Build/typecheck (`apps/api/tsconfig.build.json`, `apps/petabase/tsconfig.json`)
- ts-node + ts-node-dev - API local execution (`apps/api/package.json`)
- ESLint + Prettier - Lint/format (`apps/api/eslint.config.cjs`, `apps/petabase/.eslintrc.json`, `apps/*/.prettierrc.json`)

## Key Dependencies

**Critical:**
- `@nestjs/*` - API framework and DI/runtime (`apps/api/package.json`, `apps/api/src/main.ts`)
- `next`, `react`, `react-dom` - Web app runtime (`apps/petabase/package.json`, `apps/petabase/src/app/layout.tsx`)
- `zod` - Runtime env validation in both apps (`apps/api/src/config/env.validation.ts`, `apps/petabase/src/lib/env.ts`)

**Infrastructure:**
- `pino` - Structured API logging (`apps/api/package.json`, `apps/api/src/common/logging/app-logger.service.ts`)
- `class-validator` + `class-transformer` - Request validation pipeline support (`apps/api/package.json`, `apps/api/src/main.ts`)
- `rxjs` - Nest stream/interceptor usage (`apps/api/package.json`, `apps/api/src/common/interceptors/response-envelope.interceptor.ts`)

## Configuration

**Environment:**
- API env is validated at startup via `ConfigModule.forRoot({ validate: validateEnv })` in `apps/api/src/app.module.ts`
- API env contract is defined in `apps/api/src/config/env.validation.ts` (`NODE_ENV`, `APP_NAME`, `API_VERSION`, `PORT`, `LOG_LEVEL`, `CORS_ORIGINS`)
- Petabase env is validated in `apps/petabase/src/lib/env.ts` (`NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_DEFAULT_LOCALE`, `NEXT_PUBLIC_ENABLE_AUTH_GUARD`)
- `.env*` files: Not detected in repository root (`glob: .env*`, `glob: **/.env*`)

**Build:**
- Workspace/Nx config: `nx.json`, `tools/scripts/run-target.mjs`, `apps/*/project.json`
- TypeScript config: `tsconfig.base.json`, `apps/api/tsconfig*.json`, `apps/petabase/tsconfig.json`
- Frontend config: `apps/petabase/next.config.ts`
- CI/CD config: `.github/workflows/ci.yml`, `.github/workflows/deploy-production.yml`

## Platform Requirements

**Development:**
- Node.js + pnpm toolchain (`README.md`)
- Nx workspace commands via root scripts in `package.json`

**Production:**
- Frontend deployment target: Vercel (`.github/workflows/deploy-production.yml`, `docs/devops/cicd.md`)
- API deployment target: Railway (`.github/workflows/deploy-production.yml`, `docs/devops/cicd.md`)

---

*Stack analysis: 2026-04-18*
