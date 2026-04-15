#!/usr/bin/env bash
set -euo pipefail

if [ -z "${API_HEALTHCHECK_URL:-}" ]; then
  echo "API_HEALTHCHECK_URL is required"
  exit 1
fi

if [ -z "${WEB_SMOKE_URL:-}" ]; then
  echo "WEB_SMOKE_URL is required"
  exit 1
fi

attempt_request() {
  local name="$1"
  local url="$2"
  local attempts="${3:-12}"
  local sleep_seconds="${4:-5}"

  for attempt in $(seq 1 "${attempts}"); do
    if response="$(curl --fail --silent --show-error --location --max-time 15 "${url}" 2>&1)"; then
      echo "${name} responded successfully on attempt ${attempt}" >&2
      printf '%s' "${response}"
      return 0
    fi

    echo "${name} check failed on attempt ${attempt}/${attempts}: ${response}" >&2
    sleep "${sleep_seconds}"
  done

  return 1
}

api_response="$(attempt_request "API health" "${API_HEALTHCHECK_URL}")"
normalized_api_response="$(printf '%s' "${api_response}" | tr -d '[:space:]')"

if [[ "${normalized_api_response}" != *'"status":"ok"'* ]]; then
  echo "API health response does not include status=ok"
  exit 1
fi

web_status="$(curl --silent --show-error --output /dev/null --write-out '%{http_code}' --location --max-time 15 "${WEB_SMOKE_URL}")"

if [[ ! "${web_status}" =~ ^[23] ]]; then
  echo "Web smoke check failed with HTTP status ${web_status}"
  exit 1
fi

echo "Smoke checks passed"
