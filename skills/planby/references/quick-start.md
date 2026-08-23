# Quick start — full starter & sizing/time-range variants

All examples use `planby`. `channels` and `epg` must be memoized.

## 1. Complete, copy-pasteable starter

```tsx
import React from "react";
import { useEpg, Epg, Layout } from "planby";

const channels = [
  { uuid: "channel-1", logo: "https://example.com/c1.png" },
  { uuid: "channel-2", logo: "https://example.com/c2.png" },
];

const epg = [
  {
    id: "p-1",
    channelUuid: "channel-1",
    title: "Morning News",
    description: "Daily headlines",
    image: "https://example.com/p1.png",
    since: "2022-02-02T06:00:00",
    till: "2022-02-02T07:30:00",
  },
  {
    id: "p-2",
    channelUuid: "channel-2",
    title: "Live Match",
    description: "Sports coverage",
    image: "https://example.com/p2.png",
    since: "2022-02-02T07:00:00",
    till: "2022-02-02T09:00:00",
  },
];

export function Guide() {
  const channelsData = React.useMemo(() => channels, []);
  const epgData = React.useMemo(() => epg, []);

  const { getEpgProps, getLayoutProps, onScrollToNow, onScrollLeft, onScrollRight } =
    useEpg({
      channels: channelsData,
      epg: epgData,
      startDate: "2022-02-02T00:00:00",
      endDate: "2022-02-02T24:00:00", // optional; defaults to one day from startDate
      isLine: true,
    });

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <button onClick={() => onScrollToNow()}>Now</button>
        <button onClick={() => onScrollLeft()}>◀</button>
        <button onClick={() => onScrollRight()}>▶</button>
      </div>
      <div style={{ height: "600px", width: "1200px" }}>
        <Epg {...getEpgProps()}>
          <Layout {...getLayoutProps()} />
        </Epg>
      </div>
    </div>
  );
}
```

## 2. Sizing options — pick ONE

**A. Container-driven (recommended for responsive layouts):** wrap `<Epg>` in a box
with explicit `height` + `width` (px, %, vh — anything that resolves to real pixels).

```tsx
<div style={{ height: "600px", width: "100%" }}>
  <Epg {...getEpgProps()}>
    <Layout {...getLayoutProps()} />
  </Epg>
</div>
```

**B. Prop-driven:** pass numeric `width`/`height` to `useEpg` (no wrapping size needed).

```tsx
const { getEpgProps, getLayoutProps } = useEpg({
  epg, channels,
  startDate: "2022-02-02T00:00:00",
  width: 1200,
  height: 600,
});
```

> Never omit both — an auto-sized guide collapses to 0 height and renders nothing.

## 3. Time-range mode (explicit start + end)

By default the guide spans one full day from `startDate`. To pin a window, pass
`endDate` too. It must stay **within 24 hours** of `startDate` — multi-day guides
are a PRO feature.

```tsx
const { getEpgProps, getLayoutProps } = useEpg({
  epg, channels,
  startDate: "2022-02-02T10:00:00",
  endDate: "2022-02-02T20:00:00",
  dayWidth: 3000,   // 10 hours × 300px — see below
  width: 1200,
  height: 600,
});
```

### `dayWidth` is the width of the whole range, not of a day

Planby derives the hour width by dividing:

```
hourWidth = floor(dayWidth / hoursBetween(startDate, endDate))
```

So with a 10-hour window, the default `dayWidth: 7200` yields **720 px per hour** —
four times more zoomed-in than the 300 px/h you get across a full day.

**Rule:** `dayWidth = (hours in range) × (target hour width)`.

| Range | Target hour width | `dayWidth` |
|-------|-------------------|------------|
| 24h (full day) | 300px | `7200` (default) |
| 10h | 300px | `3000` |
| 8h | 200px | `1600` |

## 4. Toggling built-in chrome

Common boolean options on `useEpg` (all optional):

| Option | Default | Effect |
|--------|---------|--------|
| `isSidebar` | `true` | Left channel sidebar |
| `isTimeline` | `true` | Top time axis |
| `isLine` | `true` | Vertical "current time" line |
| `isBaseTimeFormat` | `false` | `true` → 12-hour (AM/PM) time labels |
| `isRTL` | `false` | Right-to-left layout |

For the full option list (sizing, `dayWidth`, `itemOverscan`, `theme`,
`globalStyles`, …) see `useEpg-api.md`.

## 5. Recommended architecture (the `useApp` pattern)

Split the guide into an `App` (JSX shell) and a `useApp` hook (data + `useEpg`
config). Async data goes through `useState` + `useMemo`, and the loading state is
passed to `<Epg isLoading={...}>` for the built-in spinner.

```tsx
// useApp.ts
import React from "react";
import { Program, useEpg } from "planby";
import { theme } from "./theme";

// Type your INPUT channels yourself — see the note below.
type EpgChannel = { uuid: string; logo: string };

export function useApp() {
  const startDate = "2022-02-02T00:00:00";
  const endDate = "2022-02-02T24:00:00";

  const [channels, setChannels] = React.useState<EpgChannel[]>([]);
  const [epg, setEpg] = React.useState<Program[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const channelsData = React.useMemo(() => channels, [channels]);
  const epgData = React.useMemo(() => epg, [epg]);

  const { getEpgProps, getLayoutProps } = useEpg({
    channels: channelsData,
    epg: epgData,
    startDate,
    endDate,
    dayWidth: 7200,       // 24h × 300px
    sidebarWidth: 100,
    itemHeight: 80,
    isBaseTimeFormat: false,
    theme,
  });

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await fetchResources(startDate, endDate); // your API
      setChannels(data.channels);
      setEpg(data.epg);
      setIsLoading(false);
    })();
  }, []);

  return { isLoading, getEpgProps, getLayoutProps };
}
```

```tsx
// App.tsx
function App() {
  const { isLoading, getEpgProps, getLayoutProps } = useApp();
  return (
    <div style={{ height: "80vh", width: "99%" }}>
      <Epg isLoading={isLoading} {...getEpgProps()}>
        <Layout {...getLayoutProps()} />
      </Epg>
    </div>
  );
}
```

Notes:
- `<Epg isLoading={isLoading}>` shows the loading spinner while fetching.
- `<Epg loader={<MySpinner />}>` replaces the built-in spinner entirely.

> **Do not type your input channels with the exported `Channel` type.** `Channel`
> is the *output* shape (`{ uuid, logo, position }`) that `renderChannel` receives,
> so assigning `{ uuid, logo }` to it is a TypeScript error. Declare your own input
> type as above. `Program`, by contrast, *is* the raw input type and works directly.

## 6. Next steps

- Custom-looking programs/channels → `render-functions.md`
- Brand colors → `theme.md`
- Data shape details → `data-schemas.md`
