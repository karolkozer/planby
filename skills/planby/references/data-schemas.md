# Data schemas — Channel and Program (epg)

## Channel schema

Each item in the `channels` array:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `uuid` | string | ✅ | Unique channel id. Referenced by `epg[].channelUuid`. |
| `logo` | string | ✅ | Image URL shown in the sidebar. |
| `[key: string]` | any | — | Extra custom fields are preserved and passed to `renderChannel`. |

```ts
const channels = [
  { uuid: "channel-1", logo: "https://example.com/logo.png" },
];
```

Only `uuid` and `logo` are part of the type. Anything else you add (a `title`, a
`category`, a colour) survives untouched and is available inside `renderChannel`
— use that instead of looking for built-in fields.

> Renaming the `uuid` key via a `channelMapKey` option is a **PRO** feature. Here,
> map your data to `uuid` before passing it in.

## Program schema (`epg` array)

Each item in the `epg` array:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique program id. |
| `channelUuid` | string | ✅ | Must equal a `channels[].uuid`. |
| `title` | string | ✅ | Program title. |
| `description` | string | ✅ | Longer text. **Required by the type** — supply it even if unused. |
| `image` | string | ✅ | Program image URL. |
| `since` | string \| number \| Date | ✅ | Start datetime (ISO recommended). |
| `till` | string \| number \| Date | ✅ | End datetime. |
| `[key: string]` | any | — | Extra custom fields are preserved and passed to `renderProgram`. |

```ts
const epg = [
  {
    id: "program-1",
    channelUuid: "channel-1",
    title: "Morning News",
    description: "Daily headlines",
    image: "https://example.com/img.png",
    since: "2022-02-02T06:00:00",
    till: "2022-02-02T07:30:00",
  },
];
```

> `description` is optional in Planby PRO but **required here**. Omitting it is a
> TypeScript error, and it's the most common porting mistake.

> Renaming the `channelUuid` key via `programChannelMapKey` is a **PRO** feature.

### Time rules

- `since` / `till` must fall inside `startDate`…`endDate`. A program outside the
  range is positioned off-screen.
- `startDate` accepts `"2022/02/02"` or `"2022-02-02T00:00:00"`. Use full clock
  hours.
- `endDate` must stay within 24 hours of `startDate`. Multi-day guides, week and
  month modes, and timezone conversion are **PRO** features.
- An `endDate` earlier than `startDate` does not throw — Planby logs a
  `console.error` and takes the absolute difference, so the guide renders with a
  silently wrong scale. Check this first when the zoom looks wrong.

## Exported types

```ts
import type { Channel, Program, ProgramItem, Theme } from "planby";
```

- `Channel` — a channel **with** its computed `position` (`{ top, height }`), the
  shape `renderChannel` receives. **Not** the input type — see the warning below.
- `Program` — one raw item of the `epg` array, as typed above. This one *is* the
  input type; use it directly for your `epg` state.
- `ProgramItem` — what `renderProgram` receives:
  `{ program: { data, position }, isRTL, isBaseTimeFormat }`.
- `Theme` — the full theme object; see `theme.md`.

### ⚠️ `Channel` is an output type, not an input type

There is no exported type for the channels you pass *in*. `Channel` resolves to
`ChannelWithPosition`, so this fails to compile:

```ts
import { Channel } from "planby";
const channels: Channel[] = [{ uuid: "c1", logo: "…" }];
// error TS2322: Property 'position' is missing
```

Declare the input shape yourself and pass it straight to `useEpg`:

```ts
type EpgChannel = { uuid: string; logo: string };
const [channels, setChannels] = React.useState<EpgChannel[]>([]);
```

Use the exported `Channel` only for the argument of `renderChannel`.
