# Render functions — custom-looking parts

Three visual parts of the schedule can be replaced with your own component via a
`render*` callback passed to `<Layout>` (through `getLayoutProps()`). Planby ships
styled building blocks (`ProgramBox`, `ChannelBox`, `TimelineTime`, …) plus hooks
(`useProgram`, `useTimeline`) that give you correct positioning and live state so
you never compute geometry yourself.

| Callback | Renders |
|----------|---------|
| `renderProgram` | Each program block. |
| `renderChannel` | Each sidebar channel. |
| `renderTimeline` | The time axis. |

`renderLine` and `renderCurrentTime` are Sponsors-only; `renderGridCell`,
`renderCornerBox`, `renderMobileControllers` and `renderMobileTimeline` are PRO.
None of them exist in this package.

## renderProgram (most common)

```tsx
import {
  useEpg, Epg, Layout,
  ProgramBox, ProgramContent, ProgramFlex, ProgramStack,
  ProgramTitle, ProgramText, ProgramImage,
  useProgram,
  type ProgramItem,
} from "planby";

const Program = ({ program, ...rest }: ProgramItem) => {
  // useProgram computes geometry + live state for you
  const { styles, formatTime, isLive, isMinWidth } = useProgram({ program, ...rest });

  const { data } = program;
  const { image, title, since, till } = data;

  return (
    <ProgramBox width={styles.width} style={styles.position}>
      <ProgramContent width={styles.width} isLive={isLive}>
        <ProgramFlex>
          {isLive && isMinWidth && <ProgramImage src={image} alt="Preview" />}
          <ProgramStack>
            <ProgramTitle>{title}</ProgramTitle>
            <ProgramText>
              {formatTime(since)} - {formatTime(till)}
            </ProgramText>
          </ProgramStack>
        </ProgramFlex>
      </ProgramContent>
    </ProgramBox>
  );
};

function Guide() {
  const { getEpgProps, getLayoutProps } = useEpg({
    channels, epg, startDate: "2022-02-02T00:00:00",
  });

  return (
    <div style={{ height: 600, width: 1200 }}>
      <Epg {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
          renderProgram={({ program, ...rest }) => (
            <Program key={program.data.id} program={program} {...rest} />
          )}
        />
      </Epg>
    </div>
  );
}
```

Spreading `...rest` into `useProgram` is required — it carries `isRTL` and
`isBaseTimeFormat` from the Layout. Without it, RTL and 12-hour formatting break.

### `useProgram` returns

| Field | Use |
|-------|-----|
| `styles` | `{ width, position }` — spread `styles.position` on `ProgramBox`, pass `styles.width`. |
| `formatTime(date, formatType?)` | Formats a date; pass `set12HoursTimeFormat()` for 12/24h awareness. |
| `set12HoursTimeFormat()` | Returns the right format string for the current `isBaseTimeFormat`. |
| `isLive` | The program is airing now (refreshed every 120s). |
| `isMinWidth` | The block is wider than `minWidth` (default 200px) — enough room for an image. |
| `isRTL` | RTL layout is active. |
| `getRTLSinceTime(since)` / `getRTLTillTime(till)` | Swap since/till when RTL is on. |

`useProgram` accepts an optional `minWidth` to change the `isMinWidth` threshold:
`useProgram({ program, minWidth: 120, ...rest })`.

There is no `getMouseEvents` or `resizeEvents` here — drag-and-drop and resize are
PRO. Attach your own `onClick` straight to `ProgramBox`.

### 12-hour time format

```tsx
const { styles, formatTime, set12HoursTimeFormat, isLive } = useProgram({ program, ...rest });
const sinceTime = formatTime(since, set12HoursTimeFormat()).toLowerCase();
const tillTime = formatTime(till, set12HoursTimeFormat()).toLowerCase();
```

Pair it with `useEpg({ isBaseTimeFormat: true })`.

### RTL direction

```tsx
const {
  isRTL, formatTime, set12HoursTimeFormat, getRTLSinceTime, getRTLTillTime, styles,
} = useProgram({ program, ...rest });

const sinceTime = formatTime(getRTLSinceTime(since), set12HoursTimeFormat()).toLowerCase();
const tillTime = formatTime(getRTLTillTime(till), set12HoursTimeFormat()).toLowerCase();

// pass isRTL down so the stack aligns correctly
<ProgramStack isRTL={isRTL}>…</ProgramStack>
```

Pair it with `useEpg({ isRTL: true })`.

## renderChannel

```tsx
import { ChannelBox, ChannelLogo, type Channel } from "planby";

const ChannelItem = ({ channel }: { channel: Channel }) => {
  const { position, logo } = channel;
  return (
    <ChannelBox {...position}>
      <ChannelLogo
        onClick={() => console.log("channel", channel)}
        style={{ maxHeight: 52, maxWidth: 52 }}
        src={logo}
        alt="Logo"
      />
    </ChannelBox>
  );
};

// <Layout ... renderChannel={({ channel }) => (
//   <ChannelItem key={channel.uuid} channel={channel} />
// )} />
```

`ChannelBox` needs `{ top, height }` — spreading `position` supplies both. Any
extra fields you put on your channel data (a title, a colour) are available here.

## renderTimeline

`useTimeline` takes **positional arguments** in this package:

```tsx
useTimeline(numberOfHoursInDay, isBaseTimeFormat)
```

Calling it with an object (the Planby PRO signature) silently yields `NaN` hours
and an empty axis. This is the single most common porting bug.

```tsx
import {
  TimelineWrapper, TimelineBox, TimelineTime,
  TimelineDivider, TimelineDividers, useTimeline,
} from "planby";

interface TimelineProps {
  isBaseTimeFormat: boolean;
  isSidebar: boolean;
  isRTL: boolean;
  dayWidth: number;
  hourWidth: number;
  numberOfHoursInDay: number;
  offsetStartHoursRange: number;
  sidebarWidth: number;
}

export function Timeline({
  isBaseTimeFormat, isSidebar, dayWidth, hourWidth,
  numberOfHoursInDay, offsetStartHoursRange, sidebarWidth,
}: TimelineProps) {
  const { time, dividers, formatTime } = useTimeline(
    numberOfHoursInDay,
    isBaseTimeFormat
  );

  const renderDividers = () =>
    dividers.map((_, index) => <TimelineDivider key={index} width={hourWidth} />);

  const renderTime = (index: number) => (
    <TimelineBox key={index} width={hourWidth}>
      <TimelineTime>
        {formatTime(index + offsetStartHoursRange).toLowerCase()}
      </TimelineTime>
      <TimelineDividers>{renderDividers()}</TimelineDividers>
    </TimelineBox>
  );

  return (
    <TimelineWrapper
      dayWidth={dayWidth}
      sidebarWidth={sidebarWidth}
      isSidebar={isSidebar}
    >
      {time.map((_, index) => renderTime(index))}
    </TimelineWrapper>
  );
}

// <Layout ... renderTimeline={(props) => <Timeline {...props} />} />
```

`renderTimeline` receives exactly: `offsetStartHoursRange`, `numberOfHoursInDay`,
`isBaseTimeFormat`, `hourWidth`, `sidebarWidth`, `isSidebar`, `isRTL`, `dayWidth`.

`dividers` is always 4 sub-ticks per hour and is not configurable here
(`timelineDividers` is PRO).

## Available styled exports

Import these from `planby` to compose custom parts:

- **Program** — `ProgramBox` (`width`), `ProgramContent` (`width`, `isLive`),
  `ProgramFlex`, `ProgramStack` (`isRTL?`), `ProgramTitle`, `ProgramText`,
  `ProgramImage`.
- **Channel** — `ChannelBox` (`top`, `height`), `ChannelLogo`.
- **Timeline** — `TimelineWrapper` (`isSidebar`, `dayWidth`, `sidebarWidth`),
  `TimelineBox` (`width`), `TimelineTime` (`isBaseTimeFormat?`, `isRTL?`),
  `TimelineDivider` (`width`), `TimelineDividers`.

Plus hooks: `useProgram`, `useTimeline`.

That is the complete list — 14 styled components. `ProgramResizeHandle`,
`CurrentTimeBox`, `GridItem`, `EpgCornerBox` and the `Mobile*` parts are PRO.

## Hiding an element

Return `null` from `renderProgram` to skip rendering a program entirely — useful
for filtering without touching the data:

```tsx
renderProgram={({ program, ...rest }) =>
  program.data.isHidden
    ? null
    : <Program key={program.data.id} program={program} {...rest} />
}
```
