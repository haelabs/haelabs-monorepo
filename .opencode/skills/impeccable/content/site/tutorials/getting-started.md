---
title: Getting started
tagline: "From zero to your first /polish pass in five minutes."
order: 1
description: "Install Impeccable, run /impeccable teach once to establish project context, and run /polish on something that already exists. The fastest path to seeing what Impeccable changes about AI-generated design."
---

## What you'll build

You will end this tutorial with Impeccable installed in your project, a `.impeccable.md` file that captures your brand and audience, and one hand-polished page that went through a `/polish` pass. Total time: about five minutes.

## Prerequisites

- An AI coding harness: Claude Code, Cursor, Gemini CLI, Codex CLI, or any of the other supported tools.
- A project with at least one HTML or component file you want to improve. A fresh scaffolded landing page works fine.

## Step 1. Install

From the root of your project, run:

```
npx skills add pbakaus/impeccable
```

This auto-detects your harness and writes the skill files to the right location (e.g., `.claude/skills/`, `.cursor/skills/`). Reload your harness and type `/`. You should see `/impeccable`, `/polish`, `/critique`, and the other commands in the autocomplete.

## Step 2. Teach Impeccable about your project

This is the most important step. Design without context produces generic output. The `/impeccable teach` command runs a short discovery interview and writes a `.impeccable.md` file at the root of your project.

Run:

```
/impeccable teach
```

The skill will ask you a handful of questions:

- **Who is this product for?** Be specific. Not "users" but "solo founders evaluating a new tool on their phone between meetings".
- **What is the brand voice in three words?** Pick real words. "Warm and mechanical and opinionated" is better than "modern and clean".
- **What should the interface feel like?** Concrete adjectives. "Calm, trustworthy, fast" or "playful, bold, a little chaotic".
- **Any visual references?** Screenshots, sites, design systems you admire.
- **Anti-references?** Things the product should explicitly not look like.

Answer in your own words. The skill writes a `.impeccable.md` file with the answers. Every future skill call reads it automatically.

Open `.impeccable.md` and read what it wrote. Edit anything that does not feel right. The file is yours.

## Step 3. Polish something

Pick a page that already exists. An about page, a settings screen, a pricing table, anything. Run:

```
/polish the pricing page
```

The skill will walk through alignment, spacing, typography, color, interaction states, transitions, and copy. It makes targeted fixes, not a rewrite. Expect a handful of small diffs that together lift the page from "done" to "done well".

A typical polish pass looks like:

```
Visual alignment: fixed 3 off-grid elements
Typography: tightened h1 kerning, fixed widow on feature list
Color: replaced one hardcoded hex with --color-accent token
Interaction: added missing hover state on FAQ items
Motion: softened modal entrance to 220ms ease-out-quart
Copy: removed stray 'Lorem' placeholder
```

Review the diff. If something does not feel right, ask the model to explain the change. If it still does not feel right, revert it. Impeccable is opinionated but not infallible.

## What to try next

- `/critique the landing page` runs a full design review with scoring, persona tests, and automated detection. It is the best way to find what to fix next.
- `/audit the checkout` runs accessibility, performance, theming, responsive, and anti-pattern checks against the implementation. Useful before shipping.
- `/impeccable craft a pricing page for enterprise customers` runs the full shape-then-build flow on a brand new feature.

## Common issues

- **The skill says "no design context found"**. You skipped step 2. Run `/impeccable teach` first.
- **Commands do not appear in the harness**. Reload the harness after installing. If they still do not appear, check that the installer wrote files into the expected location (`.claude/skills/`, `.cursor/skills/`, etc.) and that your harness is picking up that directory.
- **The polish pass rewrote something you liked**. Say so. Revert the change, tell the model which specific edit to undo, and continue from there.
