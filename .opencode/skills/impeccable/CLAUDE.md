# Project Instructions for Claude

## CSS

Plain hand-written CSS, no Tailwind, no build step. Bun's HTML loader resolves
`<link rel="stylesheet">` and inlines `@import` chains automatically for both
`bun run dev` and `bun run build`.

The CSS architecture:
- `public/css/main.css` - Main entry point, imports the partials and defines tokens/reset
- `public/css/workflow.css` - Commands section, glass terminal, case studies styles
- `public/css/gallery.css`, `skill-demos.css`, `problem-section.css` - section partials

Edit any of these directly and reload — no rebuild needed.

## Development Server

```bash
bun run dev        # Bun dev server at http://localhost:3000
bun run preview    # Build + Cloudflare Pages local preview
```

## Deployment

Hosted on Cloudflare Pages. Static assets served from `build/`, API routes handled via `_redirects` rewrites (JSON) and Pages Functions (downloads).

```bash
bun run deploy     # Build + deploy to Cloudflare Pages
```

## Build System

The build system compiles skills and commands from `source/` to provider-specific formats in `dist/`:

```bash
bun run build      # Build all providers
bun run rebuild    # Clean and rebuild
```

Source files use placeholders that get replaced per-provider:
- `{{model}}` - Model name (Claude, Gemini, GPT, etc.)
- `{{config_file}}` - Config file name (CLAUDE.md, .cursorrules, etc.)
- `{{ask_instruction}}` - How to ask user questions

## Testing

```bash
bun run test       # Run all tests
```

Unit tests (build, detector logic) run via `bun test`. Fixture tests (jsdom-based HTML detection) run via `node --test` because bun is too slow with jsdom. The `test` script handles this split automatically.

## CLI

The CLI lives in this repo under `bin/` and `src/`. Published to npm as `impeccable`.

```bash
npx impeccable detect [file-or-dir-or-url...]   # detect anti-patterns
npx impeccable detect --fast --json src/         # regex-only, JSON output
npx impeccable live                              # start browser overlay server
npx impeccable skills install                    # install skills
npx impeccable --help                            # show help
```

The browser detector (`src/detect-antipatterns-browser.js`) is generated from the main engine. After changing `src/detect-antipatterns.mjs`, rebuild it:

```bash
bun run build:browser
```

**IMPORTANT**: Always use `node` (not `bun`) to run the detect CLI. Bun's jsdom implementation is extremely slow and will cause scans with HTML files to hang for minutes.

## Versioning

There are three independently versioned components. Only bump the one(s) that actually changed:

**CLI** (npm package):
- `package.json` → `version`
- Bump when: CLI code changes (`bin/`, `src/detect-antipatterns.mjs`, etc.)

**Skills** (Claude Code plugin / skill definitions):
- `.claude-plugin/plugin.json` → `version`
- `.claude-plugin/marketplace.json` → `plugins[0].version`
- Bump when: skill content changes (`source/skills/`, skill count changes, etc.)

**Chrome extension**:
- `extension/manifest.json` → `version`
- Bump when: extension code changes (`extension/`)

**Website changelog** (`public/index.html`):
- Hero version link text + new changelog entry
- Update for user-facing changes only, not internal build/tooling details
- Use the most prominent version that changed (e.g. skills version for skill consolidation)

## Adding New Skills

When adding a new user-invocable skill, update the command count in **all** of these locations:

- `public/index.html` → meta descriptions, hero box, section lead
- `public/cheatsheet.html` → meta description, subtitle, `commandCategories`, `commandRelationships`
- `public/js/data.js` → `commandProcessSteps`, `commandCategories`, `commandRelationships`
- `public/js/components/framework-viz.js` → `commandSymbols`, `commandNumbers`
- `public/js/demos/commands/` → new demo file + import in `index.js`
- `README.md` → intro, command count, commands table
- `NOTICE.md` → steering commands count
- `AGENTS.md` → intro command count
- `.claude-plugin/plugin.json` → description
- `.claude-plugin/marketplace.json` → metadata description + plugin description

## Evals Framework (private, gitignored)

There is a controlled eval framework at `evals/` that measures whether the `/impeccable` skill improves or harms AI-generated frontend design. It runs the same brief through a model with and without the skill loaded, fingerprints every generation, and aggregates the results into a bias report. The whole `evals/` directory is gitignored — it's intended to stay private (commercial).

**If you're picking up eval work in a new session, read `evals/AGENT.md` first.** It captures everything we've learned: model choices, sample size policy, lessons learned, common workflows, and gotchas. Don't try to reinvent the workflow from scratch — there's significant prior context.

### Quick orientation

- **Primary baseline model**: `gpt-5.4` with `--reasoning-effort medium`. Frontier intelligence at ~5-10× lower cost than high reasoning. **Do NOT use `--reasoning-effort high`** unless you specifically need it — reasoning tokens count against `max_completion_tokens` and burn ~$1-2/file with no quality benefit for our use case.
- **Secondary validation model**: `qwen/qwen3.6-plus` via OpenRouter. Cheap-ish, decent design quality, no reasoning controls.
- **Do NOT use Haiku as a primary eval target.** It ignores most negative rules in the skill. We learned this the hard way — it sent us down many wrong paths early on.
- **Sample size policy**: n=10 per niche for scratch iteration, **n=20 for sweep validation (the standard)**, n=50 reserved for the final published baseline. n=20 is the smallest sample where rare detector findings stabilize and A/B comparisons are statistically meaningful.

### Quick commands

```bash
# Always start the local server first — the gallery/viewer can't load via file:// (CORS)
bun run evals/runner/serve.ts

# Standard workflow: generate → detect → aggregate → snapshot
bun run evals/runner/run.ts --with-refs --model gpt-5.4 --reasoning-effort medium
bun run evals/runner/detect.ts
bun run evals/runner/aggregate.ts
bun run evals/runner/snapshot.ts <slug> --title "..." --note "..."

# Cheap targeted iteration (does not pollute current/)
bun run evals/runner/run.ts --with-refs --scratch my-test \
  --niches 06 --n 10 --condition skill-on --model qwen/qwen3.6-plus

# View results in browser
open http://localhost:8723/viewer.html
```

### Critical rules

- **Always run a small smoke test (n=2-5 on one niche) before any sweep.** Rate degrades over long runs and time estimates can be off by 10-20×. We once burned 11+ hours on a sweep estimated to take 40 minutes.
- **Background long runs.** Use `run_in_background: true` for any sweep over ~50 generations. The runner is resumable so killing and restarting is safe.
- **Don't mix prompt versions in the same dataset.** The variant.json safety check enforces this for `current/` (must pass `--rebuild-skill-on` after a prompt edit). Scratch dirs auto-wipe on prompt change.
- **Snapshot first, change second.** Always have a known reference point in `evals/output/snapshots/` before editing the skill, so you can compare before/after.
- **The user is the source of truth on aesthetic quality.** The fingerprinter and detector are useful signals but do not measure "is this design good?" Have the user spot-check the gallery for any meaningful change.

See `evals/AGENT.md` for the full reference: detailed model comparison table, complete lessons learned, all common workflows, and the list of gotchas.
