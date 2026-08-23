# useEpg — full API

`const instance = useEpg(options)`. Spread `instance.getEpgProps()` onto `<Epg>` and
`instance.getLayoutProps()` onto `<Layout>`.

## Options

### Data (required)

| Option | Type | Description |
|--------|------|-------------|
| `channels` | array | Channels data (see `data-schemas.md`). |
| `epg` | array | Programs data (see `data-schemas.md`). |

### Time range

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `startDate` | `string \| Date` | today (start of day) | `"2022/02/02"` or `"2022-02-02T00:00:00"`. Full clock hours. |
| `endDate` | `string \| Date` | `startDate` + 1 day | `"2022-02-02T20:00:00"`. Must stay within 24h of `startDate`. |

### Sizing

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `width` | number | container | Total width in px (alternative to a sized container). |
| `height` | number | container | Total height in px. |
| `sidebarWidth` | number | `100` | Channel sidebar width. |
| `itemHeight` | number | `80` | Channel/program row height. |
| `itemOverscan` | number | `80` | How many px beyond the viewport stay mounted. Raise it to reduce blank rows while scrolling fast, at the cost of more DOM. |
| `dayWidth` | number | `7200` | Pixel width of the **whole time range** — see below. |

### Behavior flags

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `isSidebar` | boolean | `true` | Show/hide channel sidebar. |
| `isTimeline` | boolean | `true` | Show/hide timeline. |
| `isLine` | boolean | `true` | Show/hide the current-time vertical line. |
| `isBaseTimeFormat` | boolean | `false` | `true` → 12-hour (AM/PM) format. |
| `isRTL` | boolean | `false` | RTL vs LTR direction. |

### Styling

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `theme` | object | built-in dark theme | Full `Theme` object — see `theme.md`. |
| `globalStyles` | string | built-in (Inter) | Injected global CSS. **Replaces** the default block, so re-declare the font `@import`. |

That is the complete option list. Anything not in these tables — `isVerticalMode`,
`isResize`, `timezone`, `mode`, `overlap`, `dnd`, `grid`, `areas`, `mobile`,
`fetchZone`, `hoursInDays`, `channelMapKey`, `programChannelMapKey`,
`initialScrollPositions`, `liveRefreshTime`, `isCurrentTime`,
`isInitialScrollToNow`, `timelineHeight`, `snap` — is a **PRO** feature and will
be rejected by TypeScript.

## `dayWidth`: the width of the range, not of a day

```
hourWidth = floor(dayWidth / hoursBetween(startDate, endDate))
```

`dayWidth` is divided across however many hours the range spans. The default 7200
only means "300 px/hour" when the range is a full 24 hours.

**Rule:** `dayWidth = (hours in range) × (target hour width)`.

| Range | Target hour width | `dayWidth` |
|-------|-------------------|------------|
| 24h | 300px | `7200` (default) |
| 12h | 300px | `3600` |
| 10h | 300px | `3000` |
| 8h | 200px | `1600` |

Getting this wrong is the usual cause of "my guide is zoomed in far too much".

## Return values

| Value | Type | Description |
|-------|------|-------------|
| `getEpgProps` | fn | Spread onto `<Epg>`. |
| `getLayoutProps` | fn | Spread onto `<Layout>` — attach `render*` callbacks here. |
| `scrollX` / `scrollY` | number | Current scroll offsets. |
| `onScrollToNow` | fn | Scroll to current/live programs. |
| `onScrollLeft` / `onScrollRight` | `(value?: number)` | Horizontal scroll, default step 300. |
| `onScrollTop` | `(value?: number)` | Scroll vertically to top. |

There is nothing else on the returned object. `onScrollTo`, `getLayoutData`,
`getDropItemData`, `updateElement`, `disableLayoutScroll`, `enableLayoutScroll`,
`closeMobileList`, `isLayoutBottom` and `isLayoutRight` are **PRO**.

## Props set directly on `<Epg>` / `<Layout>` (not from useEpg)

| Prop | On | Description |
|------|----|-------------|
| `isLoading` | `<Epg>` | Show the built-in loading spinner. |
| `loader` | `<Epg>` | Replace the built-in spinner with your own node. |
| `renderProgram`, `renderChannel`, `renderTimeline` | `<Layout>` | Custom part renderers — see `render-functions.md`. |

## Constraints to remember

- The visible range is capped at 24 hours. Multi-day scrolling and week/month
  timeline modes are PRO.
- Timeline height is fixed at 60px (`timelineHeight` is PRO).
- The live-state refresh interval is fixed at 120s (`liveRefreshTime` is PRO).
- An inverted range (`endDate` before `startDate`) does not throw — Planby logs a
  `console.error` and uses the absolute difference.
