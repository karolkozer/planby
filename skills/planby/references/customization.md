# Strong UI customization / branding

Use this when the user wants a Planby that matches THEIR design — custom colors,
fonts, fully restyled program cards, hover states, status colors, conditional
content — not the default look. Planby is built for this: it hands you positioning
via hooks and exposes styled primitives you re-skin. You keep full visual control
while Planby keeps virtualization and scrolling.

There are **three layers** of customization, from cheapest to deepest. Use only as
many as the design needs.

## Layer 1 — Theme object (colors)

Pass a full `Theme` to `useEpg({ theme })`. It re-colors the whole guide:
backgrounds, program boxes, hover and live gradients, text, timeline, scrollbar,
loader. See `theme.md` for the complete field list, a light-theme starting point,
and the map of what each key actually controls.

Remember the two non-obvious ones: `primary.900` is the ground behind everything,
and `gradient.blue` paints program boxes on hover and when live — not the layout.

```ts
useEpg({ channels, epg, startDate, theme: BRAND_THEME });
```

For switchable brands, keep a `Record<string, Theme>` and select by name — see
"Named theme templates" in `theme.md`.

## Layer 2 — globalStyles (fonts + global CSS)

Inject a font and page-level overrides via the `globalStyles` string prop.

```ts
const globalStyles = `
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap");

  .planby {
    font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    padding: 0;
  }
`;

useEpg({ /* … */ globalStyles });
```

Two rules:

1. **`globalStyles` replaces the built-in block, it does not extend it.** The
   default styles import Inter and set it on `.planby`; if you pass your own
   string without a font declaration, you lose that. Always re-declare the
   `@import` and the `font-family`.
2. **`.planby` is the only class hook that exists.** Planby sets
   `className="planby"` on the container and nothing else. Selectors like
   `.planby-program-content`, `.planby-layout` or `.planby-timeline-box` are PRO
   class hooks — here they match nothing.

To style inner parts from CSS, put **your own** classNames on the JSX you control
inside a render component, then target those:

```tsx
<ProgramContent className="brand-program" width={styles.width} isLive={isLive}>
```

```ts
const globalStyles = `
  .planby .brand-program { border-radius: 12px; }
`;
```

## Layer 3 — Custom render components + `styled()`

Replace any part with your own component through `render*` on `<Layout>`. Build it
on Planby's hooks (`useProgram` / `useTimeline`) so geometry and live state stay
correct, and compose Planby's styled primitives — or wrap them with your own
`styled()`.

### Wrapping a primitive with emotion

`@emotion/styled` is already a dependency of `planby`, so you can style any export
and read from the active theme:

```tsx
import styled from "@emotion/styled";
import { ProgramBox as PlanbyProgramBox, type Theme } from "planby";

export const ProgramBox = styled(PlanbyProgramBox)<{ theme?: Theme }>`
  .brand-program {
    border-radius: 12px;
    transition: box-shadow 140ms ease;
  }
  &:hover .brand-program {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.green[300]};
  }
  &:hover .brand-program-title {
    color: ${({ theme }) => theme.grey[300]};
  }
`;
```

The theme you passed to `useEpg` is provided through emotion's `ThemeProvider`, so
`({ theme })` inside a `styled()` call resolves to your `Theme` object at runtime.
Note the hover selectors target **your own** classNames, set on the JSX below.

#### ⚠️ Required once per app: the emotion type augmentation

Planby does **not** ship the module augmentation that tells TypeScript what
emotion's theme contains. Without it, emotion's `Theme` is an empty interface and
every lookup fails:

```
error TS2339: Property 'green' does not exist on type 'Theme'.
```

Add this file once anywhere in your app (it needs no import):

```ts
// planby-emotion.d.ts
import "@emotion/react";
import type { Theme as PlanbyTheme } from "planby";

declare module "@emotion/react" {
  export interface Theme extends PlanbyTheme {}
}
```

The runtime works fine without it — this is purely a typing fix. A copy ships at
[`../examples/planby-emotion.d.ts`](../examples/planby-emotion.d.ts).

### Injecting app state and handlers

`render*` callbacks are closures — pass anything (theme, config, modal openers,
search state) alongside the spread:

```tsx
<Layout
  {...getLayoutProps()}
  renderProgram={({ program, ...rest }) => (
    <Program
      key={`${program.data.channelUuid}-${program.data.id}`}
      program={program}
      theme={theme}
      uiConfig={uiConfig}      // e.g. show/hide image, title, time
      onOpen={openModal}
      {...rest}                // <- REQUIRED: forwards isRTL / isBaseTimeFormat
    />
  )}
  renderChannel={({ channel }) => (
    <ChannelItem key={channel.uuid} channel={channel} theme={theme} />
  )}
/>
```

Forgetting `{...rest}` is the classic bug: `useProgram` then sees no `isRTL` or
`isBaseTimeFormat` and time formatting silently falls back to 24h LTR.

### Config-driven content (design variants)

Drive what's shown from a per-user/per-client config object instead of
hard-coding, so one component renders several design variants:

```tsx
type UiConfig = {
  showTitle: boolean;
  showTime: boolean;
  showImage: boolean;
  imageRadius: number;
};

const Program = ({ program, uiConfig, ...rest }: ProgramProps) => {
  const { styles, formatTime, isLive, isMinWidth } = useProgram({ program, ...rest });
  const { title, since, till, image } = program.data;

  return (
    <ProgramBox width={styles.width} style={styles.position}>
      <ProgramContent className="brand-program" width={styles.width} isLive={isLive}>
        <ProgramFlex>
          {uiConfig.showImage && isMinWidth && image && (
            <ProgramImage src={image} alt="" style={{ borderRadius: uiConfig.imageRadius }} />
          )}
          <ProgramStack>
            {uiConfig.showTitle && (
              <ProgramTitle className="brand-program-title">{title}</ProgramTitle>
            )}
            {uiConfig.showTime && (
              <ProgramText>{formatTime(since)} - {formatTime(till)}</ProgramText>
            )}
          </ProgramStack>
        </ProgramFlex>
      </ProgramContent>
    </ProgramBox>
  );
};
```

### Click handling

There is no `getMouseEvents` helper here (that is PRO, where it merges click with
drag). Without drag-and-drop there is nothing to merge — attach handlers directly:

```tsx
<ProgramBox
  width={styles.width}
  style={styles.position}
  onClick={() => onOpen(program.data)}
>
```

### Hiding elements

Return `null` from `renderProgram` for anything that shouldn't render — a cheap
way to implement filtering or search highlighting.

## Putting it together

A heavily-branded Planby typically uses all three layers: a `theme` (or a theme
template) for the palette, `globalStyles` for the font, and a custom
`renderProgram`/`renderChannel` built on `useProgram` with `styled()` wrappers
reading the theme — plus a `uiConfig` object so the same component covers several
design variants.

See [`../examples/phase2-branded.tsx`](../examples/phase2-branded.tsx) for a
complete, type-checked implementation of exactly this.

## What you cannot do here

Vertical / single-track mode, drag-and-drop, resizing, week and month calendar
modes, grid cells, highlighted areas, mobile controllers, and the `.planby-*`
class hooks are Planby PRO features. If a design depends on them, say so rather
than approximating.
