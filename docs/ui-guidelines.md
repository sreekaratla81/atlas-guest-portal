# UI Component Guidelines

The `src/ui` directory contains the shared component library and design tokens.

## Tokens
- **Colors:** `colors` export defines `primary`, `accent`, `dark`, and `light` values.
- **Spacing:** `spacing` export provides `xs`, `sm`, `md`, and `lg` units (in pixels).
- **Typography:** `typography` export exposes base font settings.

## Components
### `Button`
Usage:
```jsx
import { Button } from '../ui';

<Button>Label</Button>
<Button variant="dark">Dark</Button>
<Button variant="ghost">Cancel</Button>
```

The component maps `variant` to standardized styles defined in `button.css`.

## Onboarding
New developers should read this guide and consult Storybook (`npm run storybook`) to explore available components and patterns.
