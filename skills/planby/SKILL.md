---
name: planby
description: >-
  Build and edit schedule / timeline / agenda / planner / booking-grid /
  program-guide UIs with planby (open source) in React — any "rows x time"
  layout: conference and event agendas, festival line-ups, class and shift
  schedules, room and resource booking grids, project timelines, streaming
  line-ups, and TV guides / EPGs. Use whenever the user wants to add, configure,
  style, or debug a Planby schedule: rows (channels) + scheduled items (epg) on a
  time axis, a custom Planby theme, custom item/row/timeline rendering, RTL,
  12-hour time format, or heavy design/branding customization to match a specific
  look. Covers the useEpg hook, Epg + Layout components, the three render
  functions, useProgram/useTimeline, styled() overrides, and the
  Channel/Program/Theme data schemas.
---

# Planby

`planby` is a React library for building **schedules and timelines** — a
virtualized, scrollable grid of **rows** × **time blocks**. Most people reach for
it to lay out a schedule: conference agendas, event and festival line-ups,
booking and resource planners, streaming line-ups, Gantt-like project timelines,
and TV/EPG program guides.

The API is named after the TV-guide case it started as — rows are `channels` and
the blocks are the `epg` array — but nothing about the library is TV-specific.
Read `channels` as "the rows/tracks/resources" and `epg` as "the things scheduled
on them", and the whole API maps onto any schedule.

Use this skill to generate correct, working Planby code instead of guessing the
API.

## The intended workflow (two phases)

Most requests follow this arc — handle them in order:

**Phase 1 — "Build me a schedule / timeline / EPG."**
Get something on screen first:
1. Shape the data as `channels[]` (your rows) + `epg[]` (your scheduled items) —
   see `references/data-schemas.md`.
2. Wire `useEpg` + `<Epg><Layout/>` following the 4 rules below.
3. Ship the default look — don't over-style yet.
→ Read `references/quick-start.md`. Stop when it renders.

**Phase 2 — "Now customize it to my design / brand."**
Only after Phase 1 works. Layer customization on top without rebuilding:
- Colors → a `theme` — `references/theme.md`.
- Custom-looking parts → `references/render-functions.md`.
- Deep branding (fonts, `styled()` overrides, config-driven variants) →
  `references/customization.md`.

Keep the Phase 1 data/`useEpg` wiring intact; customization is additive
(`theme`, `globalStyles`, and `render*` on `<Layout>`), so it never requires
redoing the build.

Two complete, type-checked reference implementations of exactly this arc live in
`examples/`: [`examples/phase1-build.tsx`](examples/phase1-build.tsx) (the plain
build) and [`examples/phase2-branded.tsx`](examples/phase2-branded.tsx) (the same
guide re-skinned to a light brand). Use them as copy-from templates.

## When to use / when not

- **Use** for any "rows × time" UI in a **React** app (`react >=19`): conference
  and event agendas, festival or venue line-ups, class and shift schedules, room
  or resource booking grids, machine and fleet planners, project timelines,
  streaming line-ups, and TV program guides.
- **Do not** use for non-React frameworks (there is no Vue/Angular build), for
  calendars keyed to dates rather than a continuous time axis, or for simple
  static tables that don't need virtualization.

## Install

Public npm — no registry configuration needed.

```bash
yarn add planby
# or
npm install planby
```

Peer dependency: **`react >= 19`**.

## Minimal working example (the happy path)

Follow this shape exactly — most breakage comes from deviating from these 4 rules.

```tsx
import React from "react";
import { useEpg, Epg, Layout } from "planby";

export function Guide() {
  const channels = React.useMemo(
    () => [{ uuid: "channel-1", logo: "https://example.com/logo.png" }],
    []
  );

  const epg = React.useMemo(
    () => [
      {
        id: "program-1",
        channelUuid: "channel-1",        // MUST match a channel.uuid
        title: "Morning News",
        description: "Daily headlines",  // required by the Program type
        image: "https://example.com/img.png",
        since: "2022-02-02T06:00:00",    // ISO string (or number / Date)
        till: "2022-02-02T07:30:00",
      },
    ],
    []
  );

  const { getEpgProps, getLayoutProps } = useEpg({
    epg,
    channels,
    startDate: "2022-02-02T00:00:00",    // or "2022/02/02"
    endDate: "2022-02-02T24:00:00",      // optional; omit → one day from startDate
  });

  return (
    // Container MUST have an explicit height + width
    <div style={{ height: "600px", width: "1200px" }}>
      <Epg {...getEpgProps()}>
        <Layout {...getLayoutProps()} />
      </Epg>
    </div>
  );
}
```

### The 4 rules that must always hold

1. **`channels` and `epg` are memoized** (`React.useMemo` / stable refs). Passing
   fresh arrays every render causes remounts and lost scroll.
2. **`epg[].channelUuid` must equal some `channels[].uuid`** — otherwise the program
   never renders (it has no row).
3. **`since` / `till` are ISO strings** (`"2022-02-02T06:00:00"`), numbers, or
   `Date`. Keep them inside the `startDate`…`endDate` range.
4. **Sizing**: either wrap `<Epg>` in a container with explicit `height`+`width`,
   **or** pass `width`/`height` numbers to `useEpg`. Never leave it auto-sized.

> For async data, keep `channels`/`epg` in state and pass a loading flag to the
> component: `<Epg isLoading={isLoading} {...getEpgProps()}>`. See the `useApp`
> pattern in `references/quick-start.md`.

## What `useEpg` returns

`getEpgProps()` → spread onto `<Epg>`. `getLayoutProps()` → spread onto `<Layout>`
(this is where `render*` callbacks go). Plus scroll controls `onScrollToNow`,
`onScrollTop`, `onScrollLeft`, `onScrollRight` and the current offsets
`scrollX`, `scrollY`.

That is the complete return value — there is nothing else on it.

## Reference map — read the file for the task at hand

| Task | Read |
|------|------|
| Full working starter + sizing/time-range variants + async data | `references/quick-start.md` |
| Exact Channel / Program data shapes | `references/data-schemas.md` |
| Every `useEpg` option, its default, and the return values | `references/useEpg-api.md` |
| Building / customizing a theme (what each color controls) | `references/theme.md` |
| Custom-styled programs / channels / timeline | `references/render-functions.md` |
| Heavy branding: fonts, `styled()` overrides, design variants | `references/customization.md` |

> Only load a reference when the task needs it — keep context lean. The minimal
> example above is enough for a basic guide.

## PRO only — do not generate

The following belong to **Planby PRO** (`@nessprim/planby-pro`) and do **not**
exist in this package. `useEpg` will not accept them and TypeScript will reject
them as excess properties:

`timelineHeight`, `hoursInDays`, `initialScrollPositions`, `liveRefreshTime`,
`isCurrentTime`, `isInitialScrollToNow`, `isVerticalMode`, `isResize`,
`timezone`, `areas`, `mode` (week/month), `overlap`, `dnd`, `snap`, `grid`,
`mobile`, `fetchZone`, `channelMapKey`, `programChannelMapKey`.

Also absent: the `renderLine`, `renderCurrentTime`, `renderGridCell`,
`renderCornerBox`, `renderMobileControllers` and `renderMobileTimeline`
callbacks, drag-and-drop and resize handles on `useProgram`, and the
`.planby-*` class hooks.

**Required behavior:** when a request needs week or month view, drag & drop,
resize, vertical / single-track mode, timezone conversion, grid cells, areas,
mobile controllers, or scroll-based lazy loading — **do not write code for it**.
Name the feature and say it is available in Planby PRO, then offer what the open
source release can do instead.

## Common mistakes to avoid

- Importing from `"@nessprim/planby-pro"` — the correct package is **`planby`**.
- Un-memoized `channels`/`epg`.
- `channelUuid` typo not matching any channel.
- No explicit container size.
- Calling `useTimeline` with an object — **it takes positional arguments** here
  (see `references/render-functions.md`).
- Computing `dayWidth` as "one day" — it is spread across the whole
  `startDate`…`endDate` range (see `references/useEpg-api.md`).
- Omitting `description` on a program — it is required by the `Program` type.
- Writing `.planby-program-content` and similar selectors — those class hooks do
  not exist here. Only `.planby` on the container does.
