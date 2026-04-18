---
tagline: "Think before you build. Produce a design brief through discovery, not guesswork."
---

## When to use it

`/shape` is where a feature starts. Before anyone writes code, before anyone argues about the hero treatment, before anyone picks a font. Use it to force a discovery conversation about purpose, users, content, and constraints, then capture the answers as a design brief the implementation skills can lean on.

Reach for it whenever a feature is about to start, a ticket is vague, or you catch yourself writing JSX to figure out what the product should be.

## How it works

Most AI-generated UIs fail not because of bad code, but because of skipped thinking. The model jumps to "here is a card grid" without asking "what is the user trying to accomplish". `/shape` inverts that order.

The skill runs a structured discovery interview in conversation. It will not write code during this phase. The questions cover:

- **Purpose and context**: what the feature is for, who uses it, what state of mind they are in
- **Content and data**: what is displayed, realistic ranges, edge cases, what is dynamic
- **Design goals**: the single most important thing, the intended feeling, reference examples
- **Constraints**: technical, content, accessibility, localization

You answer naturally. The skill asks follow-ups, not a form. At the end it produces a design brief: a structured artifact you can hand to `/impeccable` or any other implementation skill.

Note: if you want the full flow -- discovery interview, then straight into building -- use `/impeccable craft` instead. It runs `/shape` internally, then continues into implementation with visual iteration. `/shape` standalone is for when you want just the brief, so you can take it to whatever implementation approach you prefer.

## Try it

```
/shape a daily digest email preferences page
```

Expect a 5 to 10 question conversation. The skill asks things like "who is the person opening this, and are they already committed or still curious" and "what happens when the user has unsubscribed from everything, do we hide the feature or show something". You answer, and a brief materializes.

From there you can hand the brief to `/impeccable`, `/polish`, or any other skill. Or just use it as a reference while you build by hand.

## Pitfalls

- **Skipping it because it feels slow.** The interview is maybe 5 minutes. The rewrites you avoid are measured in hours.
- **Treating the brief as a spec.** It is a compass, not a checklist. It captures intent, not UI.
- **Answering with "standard" or "normal".** Specificity is the whole point. If a user is "rushed, on mobile, between meetings", say so. That changes everything downstream.
