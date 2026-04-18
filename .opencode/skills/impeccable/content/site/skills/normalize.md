---
tagline: "Pull drifted UI back into the design system."
---

## When to use it

`/normalize` is for the page that looks almost right but is not. Hard-coded colors where tokens should be, one-off spacing, a custom button that should have been the shared button, component markup that drifted during a rushed feature. Use it when consistency has decayed and you want to pull the feature back in line with the design system.

Good triggers: "this page uses a different button", "the spacing feels wrong compared to the rest of the app", "why is this blue different from the other blue".

## How it works

The skill audits the target against the design system, then fixes the drift:

1. **Tokens**: find every hard-coded color, spacing, radius, or shadow. Replace with the right token. Flag cases where no token fits (usually a sign the token system needs extending).
2. **Components**: find custom implementations of things the library already provides. Replace with the shared component, preserving functionality.
3. **Patterns**: find layouts that deviate from the standard patterns (form layouts, card grids, page headers). Align with the convention.
4. **Spacing and rhythm**: align to the spacing scale, fix any random pixel values.
5. **Typography**: make sure type styles come from the system, not one-off font-size/weight combinations.

Normalize is conservative. It does not redesign. It makes the feature match what the rest of the app already does.

## Try it

```
/normalize the billing page
```

Typical diff:

- 14 hard-coded hex values replaced with `var(--color-*)` tokens
- 6 one-off spacing values (13px, 27px, 11px) aligned to 8 / 16 / 24 / 32
- Custom "Upgrade" button replaced with `<Button variant="primary">` from the shared library
- Form layout restructured to use the shared `FormRow` component
- Font weight for section headings unified (was mixing 500 and 600 across similar headings)

## Pitfalls

- **Using normalize to redesign.** If you find yourself wanting to change how things look, not just make them consistent, you want `/polish` or `/arrange`. Normalize enforces consistency with what exists.
- **Skipping the token gap analysis.** When normalize flags "no token fits", that is signal. Extend the token system before shipping, or the drift will come back.
- **Running normalize on a prototype.** If the feature is still exploring, consistency is premature optimization. Normalize ships-ready features.
