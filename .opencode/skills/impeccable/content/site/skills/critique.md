---
tagline: "A design review with scoring, persona tests, and automated detection."
---

## When to use it

Reach for `/critique` when you want an honest second opinion on something you already built. Not "does it work" but "is it any good". The skill scores your interface against Nielsen's 10 heuristics, runs cognitive load checks, tests through persona lenses, and cross-references an automated detector for 25 concrete anti-patterns.

Use it when a page is functionally done and you want to know if it reads as intentional or as AI slop.

## How it works

`/critique` runs two independent assessments in parallel so they do not bias each other.

The first is an **LLM design review**: the model reads your source, visually inspects the live page if browser automation is available, and walks the impeccable skill's full DO/DON'T catalog. It scores Nielsen's heuristics, counts cognitive load failures, traces the emotional journey through the flow, and flags AI slop.

The second is an **automated detector** (`npx impeccable detect`) that deterministically finds gradient text, purple palettes, side-tab borders, nested cards, line length problems, and the other visible fingerprints of generic AI output.

The two reports merge into one prioritized list: what is working, the three to five things that need fixing, and the provocative questions worth answering before shipping.

## Try it

Point it at a page:

```
/critique the homepage hero
```

You get back a scored report. Typical shape:

- **AI slop verdict**: pass / fail with the specific tells
- **Heuristic scores**: 10 numbers, 0 to 4
- **Cognitive load**: failure count out of 8
- **Priority issues**: three to five items, each with what, why, and fix
- **Questions to answer**: the ones the interface itself cannot decide for you

From there, pair with `/polish` or `/distill` to act on the fixes.

## Pitfalls

- **Running it on incomplete work.** Critique is for finished pages. An empty state with three TODOs will score badly because it is not done, not because it is bad.
- **Ignoring the questions at the end.** They are usually the highest-leverage fixes.
- **Treating the heuristic scores as a grade.** They are diagnostic, not evaluative. A 3/4 on a heuristic that matters less for your context is fine.
