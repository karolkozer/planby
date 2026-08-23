# Theme

Pass a complete theme object to `useEpg({ theme })`. Copy this template and change
the colors — keep **all** keys present. There is no merge with the default theme:
the object you pass is used as-is, and a missing key crashes the styled components
that read it.

```ts
import { useEpg, type Theme } from "planby";

const theme: Theme = {
  primary: {
    600: "#1a202c", // program box background (idle)
    900: "#171923", // the ground: sidebar, timeline, scroll area
  },
  grey: { 300: "#d1d1d1" },   // program title text
  white: "#fff",              // scrollbar borders
  green: { 300: "#2C7A7B" },  // the current-time line
  loader: {
    teal: "#5DDADB",
    purple: "#3437A2",
    pink: "#F78EB6",
    bg: "#171923db",
  },
  scrollbar: {
    border: "#ffffff",
    thumb: { bg: "#e1e1e1" },
  },
  gradient: {
    blue: {
      300: "#002eb3", // live programs only (third stop)
      600: "#002360",
      900: "#051937",
    },
  },
  text: {
    grey: {
      300: "#a0aec0", // timeline hour labels
      500: "#718096", // program time text
    },
  },
  timeline: {
    divider: { bg: "#718096" },
  },
};

const { getEpgProps, getLayoutProps } = useEpg({
  channels,
  epg,
  startDate: "2022-02-02T00:00:00",
  theme,
});
```

## What each key actually controls

Verified against the styled components — this is where each value lands:

| Key | Controls |
|-----|----------|
| `primary.600` | `ProgramContent` background in its idle state. |
| `primary.900` | The whole ground behind the schedule: container, scroll box, channel sidebar, channel boxes, timeline bar. |
| `gradient.blue.900` + `.600` | `ProgramContent` background **on hover** (left→right gradient). |
| `gradient.blue.900` + `.600` + `.300` | `ProgramContent` background when the program **is live** (three-stop gradient). |
| `grey.300` | `ProgramTitle` text color. |
| `text.grey.500` | `ProgramText` (the since–till line) color. |
| `text.grey.300` | `TimelineTime` hour label color. |
| `timeline.divider.bg` | The small tick dividers on the timeline. |
| `green.300` | The vertical current-time `Line`. |
| `loader.teal` / `.purple` / `.pink` | The three arcs of the loading spinner. |
| `loader.bg` | The overlay behind the spinner (use an alpha suffix, e.g. `#171923db`). |
| `scrollbar.thumb.bg` | Scrollbar thumb. |
| `scrollbar.border` | Scrollbar track border. |
| `white` | Scrollbar border color in the track corners. |

Two consequences worth knowing before you pick colors:

1. **`gradient.blue` is not a background gradient for the layout** — despite the
   name it only paints program boxes on hover and when live. To change the "live"
   accent, change `gradient.blue`.
2. **`primary.900` does most of the visual work.** It is the color of everything
   behind the programs, so it sets the overall light/dark feel of the guide.

## A light theme

The default theme is dark. For a light guide, flip `primary` and the text colors:

```ts
const lightTheme: Theme = {
  primary: { 600: "#ffffff", 900: "#f4f6f8" },
  grey: { 300: "#1a202c" },
  white: "#e2e8f0",
  green: { 300: "#d53f8c" },
  loader: { teal: "#319795", purple: "#5a67d8", pink: "#d53f8c", bg: "#ffffffcc" },
  scrollbar: { border: "#e2e8f0", thumb: { bg: "#cbd5e0" } },
  gradient: { blue: { 300: "#bee3f8", 600: "#90cdf4", 900: "#63b3ed" } },
  text: { grey: { 300: "#4a5568", 500: "#718096" } },
  timeline: { divider: { bg: "#cbd5e0" } },
};
```

## Named theme templates

A clean pattern for switchable brands — keep a map of full theme objects and
select by name:

```ts
export const THEME_TEMPLATES: Record<string, Theme> = {
  dark: DARK_THEME,
  light: LIGHT_THEME,
  brand: BRAND_THEME,
};

// useEpg({ theme: THEME_TEMPLATES[selected] ?? THEME_TEMPLATES.brand })
```

> The theme object can also carry **extra keys of your own** (for example a palette
> for your surrounding toolbar). Planby only reads the keys above, so a theme can
> double as a shared design-token store for the whole feature. Type it as
> `Theme & { myKey: … }` to keep TypeScript happy.

## Notes

- For custom fonts and global CSS, use `globalStyles` — see `customization.md`.
- To restyle programs and channels structurally rather than just recoloring them,
  use the render functions — see `render-functions.md`.
- `program`, `grid` and `teal` keys exist in Planby PRO themes but **not here**;
  including them is a TypeScript error.
