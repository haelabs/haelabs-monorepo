#!/usr/bin/env bash
# deploy.sh — Manual deploy script for haelabs monorepo
# Usage:
#   ./scripts/deploy.sh              # deploy both
#   ./scripts/deploy.sh web          # deploy petabase (Vercel) only
#   ./scripts/deploy.sh api          # deploy api (Railway) only
#   ./scripts/deploy.sh db-migrate   # run DB migrations only

set -euo pipefail

MONOREPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$MONOREPO_ROOT"

RAILWAY_PROJECT_ID="d1e2539c-ce86-4de7-b117-57c52227f9c8"
RAILWAY_ENVIRONMENT_ID="6c5d17b7-a982-4c35-be77-9a7e2ed66c68"
RAILWAY_API_SERVICE_ID="4818510a-02a3-4bf3-a4e1-19dc675921cc"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log()  { echo -e "${CYAN}[deploy]${NC} $1"; }
ok()   { echo -e "${GREEN}[deploy]${NC} ✅ $1"; }
warn() { echo -e "${YELLOW}[deploy]${NC} ⚠️  $1"; }
err()  { echo -e "${RED}[deploy]${NC} ❌ $1"; }

# ── Pre-flight checks ──────────────────────────────────────────
check_prerequisites() {
  local missing=()
  command -v vercel >/dev/null 2>&1 || missing+=("vercel")
  command -v railway >/dev/null 2>&1 || missing+=("railway")
  command -v pnpm >/dev/null 2>&1 || missing+=("pnpm")

  if [ ${#missing[@]} -gt 0 ]; then
    err "Missing tools: ${missing[*]}"
    err "Install: npm i -g vercel @railway/cli && npm i -g pnpm"
    exit 1
  fi
}

# ── Vercel deploy (petabase web) ───────────────────────────────
deploy_web() {
  log "Deploying petabase to Vercel..."
  cd "$MONOREPO_ROOT/apps/petabase"

  # Ensure linked
  if [ ! -d ".vercel" ]; then
    log "Linking to Vercel project..."
    vercel link --yes --project haelabs-petabase
  fi

  # Build first (catch errors before deploying)
  log "Building..."
  pnpm --filter @haelabs/petabase build

  # Deploy to production
  log "Deploying to production..."
  vercel deploy --prod --yes

  ok "petabase deployed to Vercel"
  cd "$MONOREPO_ROOT"
}

# ── Railway deploy (api) ───────────────────────────────────────
deploy_api() {
  log "Deploying api to Railway..."
  cd "$MONOREPO_ROOT"

  # Deploy only apps/api context to the API service.
  log "Deploying apps/api to Railway api service..."
  railway up "apps/api" \
    --path-as-root \
    --ci \
    --project "$RAILWAY_PROJECT_ID" \
    --environment "$RAILWAY_ENVIRONMENT_ID" \
    --service "$RAILWAY_API_SERVICE_ID"

  ok "api deployed to Railway"
}

# ── DB Migrations ──────────────────────────────────────────────
db_migrate() {
  log "Running database migrations..."
  cd "$MONOREPO_ROOT"

  pnpm --filter @haelabs/api exec prisma migrate deploy

  ok "Migrations complete"
}

# ── Main ───────────────────────────────────────────────────────
check_prerequisites

case "${1:-all}" in
  web|petabase)
    deploy_web
    ;;
  api)
    deploy_api
    ;;
  db-migrate|migrate)
    db_migrate
    ;;
  all|both|"")
    deploy_web
    echo ""
    deploy_api
    ;;
  *)
    echo "Usage: $0 {web|api|db-migrate|all}"
    exit 1
    ;;
esac

echo ""
ok "Done!"
