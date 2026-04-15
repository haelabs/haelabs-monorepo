#!/usr/bin/env bash
set -euo pipefail

target="${1:-}"

if [ -z "${target}" ]; then
  echo "Usage: tools/ci/run-affected.sh <target>"
  exit 1
fi

base_sha="${NX_BASE:-}"
head_sha="${NX_HEAD:-${GITHUB_SHA:-$(git rev-parse HEAD)}}"

if [ -z "${base_sha}" ]; then
  base_sha="$(git rev-parse "${head_sha}~1" 2>/dev/null || true)"
fi

if [ -z "${base_sha}" ]; then
  base_sha="${head_sha}"
fi

echo "Running nx affected for target '${target}' with base ${base_sha} and head ${head_sha}"

if ! pnpm exec nx affected -t "${target}" --base="${base_sha}" --head="${head_sha}" --outputStyle=static; then
  echo "nx affected failed for target '${target}', falling back to full run"
  pnpm exec nx run-many -t "${target}" --all --outputStyle=static
fi
