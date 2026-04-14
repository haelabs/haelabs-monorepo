# Monorepo Foundation

## Purpose

This repository is an app-centric Nx monorepo on top of pnpm workspaces. The current phase focuses on establishing the workspace shell and shared top-level layout so follow-up issues can add product code without repository restructuring.

## Current top-level structure

- `apps/` - deployable applications
- `packages/` - shared packages and reusable configuration
- `docs/` - project and architecture documentation
- `tools/` - scripts and developer tooling

## Workspace discovery

`pnpm-workspace.yaml` currently discovers:

- `apps/*`
- `packages/*`
- `tools/*`

Nx uses the same app-centric layout via `nx.json`:

- `appsDir: apps`
- `libsDir: packages`

## Root commands

- `pnpm build`
- `pnpm lint`
- `pnpm test`
- `pnpm typecheck`
- `pnpm exec nx show projects`

The command wrappers in `tools/scripts/run-target.mjs` intentionally no-op when the workspace has no Nx projects yet. That keeps the monorepo CI-friendly during the foundation stage.

## Structure Conventions

See [docs/conventions.md](./conventions.md) for naming rules, dependency direction, reserved app paths, and guidance on adding new apps and packages.
