# Requirements

This folder is the **single source of truth** for all feature requirements.

## Flow

```
haibara writes  →  Job approves  →  GSD reads  →  kogoro reviews PR
```

## Template

Copy `_template.md` and fill in for each issue.

## Naming Convention

`#<issue-id>-<slug>.md` — e.g., `#37-auto-reply-bot.md`

## Structure

```
requirements/
├── README.md           ← This file
├── _template.md        ← Template for new requirements
├── #37-auto-reply-bot.md
├── #38-payment-integration.md
└── ...
```

## Fields

| Field | Required | Description |
|-------|----------|-------------|
| Issue | ✅ | GitHub issue number |
| Title | ✅ | Short description |
| Problem | ✅ | What problem does this solve? |
| Requirements | ✅ | Numbered list of what to build |
| Success Criteria | ✅ | How do we know it's done? |
| Context | ✅ | Constraints, existing systems, notes |
| Priority | ❌ | P0-P3 |
