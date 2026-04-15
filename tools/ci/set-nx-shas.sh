#!/usr/bin/env bash
set -euo pipefail

head_sha="${GITHUB_SHA:-$(git rev-parse HEAD)}"
base_sha=""

if [ -n "${GITHUB_EVENT_PATH:-}" ] && [ -f "${GITHUB_EVENT_PATH}" ]; then
  base_sha="$(node -e 'const fs=require("node:fs"); const p=process.env.GITHUB_EVENT_PATH; const e=JSON.parse(fs.readFileSync(p,"utf8")); process.stdout.write(e.pull_request?.base?.sha ?? "");')"
fi

if [ -z "${base_sha}" ]; then
  base_ref="${GITHUB_BASE_REF:-main}"
  if git rev-parse "origin/${base_ref}" >/dev/null 2>&1; then
    base_sha="$(git rev-parse "origin/${base_ref}")"
  fi
fi

if [ -z "${base_sha}" ]; then
  base_sha="$(git rev-parse "${head_sha}~1" 2>/dev/null || true)"
fi

if [ -z "${base_sha}" ]; then
  base_sha="${head_sha}"
fi

if [ -n "${GITHUB_ENV:-}" ]; then
  {
    echo "NX_BASE=${base_sha}"
    echo "NX_HEAD=${head_sha}"
  } >>"${GITHUB_ENV}"
fi

echo "Resolved Nx SHAs: NX_BASE=${base_sha} NX_HEAD=${head_sha}"
