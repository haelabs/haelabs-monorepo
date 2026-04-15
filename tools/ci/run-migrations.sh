#!/usr/bin/env bash
set -euo pipefail

if [ -z "${MIGRATION_COMMAND:-}" ]; then
  echo "MIGRATION_COMMAND is required (example: pnpm --filter @haelabs/api exec prisma migrate deploy)"
  exit 1
fi

echo "Running production migration command"
bash -lc "${MIGRATION_COMMAND}"
