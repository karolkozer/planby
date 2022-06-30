<div align="center" style="margin-bottom: 10px">
  <a href="https://www.npmjs.com/package/planby">
    <img src="https://i.postimg.cc/J0XMPHNQ/planby-logo.png" alt="Planby logo" />
  </a>
</div>

<div align="center" style="margin-bottom: 20px">
  <a href="https://www.npmjs.com/package/planby">
    <img alt="npm" src="https://img.shields.io/npm/v/planby" />
  </a>
  <a href="https://npmjs.org/package/planby">
    <img alt="downloads" src="https://badgen.net/npm/dm/planby" />
  </a>
  <a href="https://npmjs.org/package/planby">
    <img alt="downloads" src="https://img.shields.io/npm/dt/planby?color=%2327ae60&label=recent%20downloads" />
  </a> 
 <a href="https://opencollective.com/planby#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
</div>

## Description

Planby is a React based component for a quick implementation of Epg, schedules, live streaming, music events, timelines and many more ideas. It uses a custom virtual view which allows you to operate on a really big number of data. The component has a simple API that you can easily integrate with other third party UI libraries. The component theme is customised to the needs of the application design.

<div align="center" style="margin-bottom: 10px">
  <a href="https://planby.netlify.app/">
    <img src="https://i.postimg.cc/1zgmfd8T/planby-tv-vod.png" alt="Planby preview" />
  </a>
</div>
<div align="center" style="margin-bottom: 10px">
  <a href="https://planby.netlify.app/">
    <img src="https://i.postimg.cc/50qZ05ST/planby-music-festival-event.png" alt="Planby preview" />
  </a>
</div>
<div align="center" style="margin-bottom: 10px">
  <a href="https://planby.netlify.app/">
    <img src="https://i.postimg.cc/s2Pn9jGZ/planby-conf-event.png" alt="Planby preview" />
  </a>
</div>

## Codesandbox example

[Live example - Codesandbox](https://codesandbox.io/s/5o3tsy)

[Live example - website with control panel](https://planby.netlify.app/)

## 🚀 [Become a Sponsor!](https://opencollective.com/planby) 🚀

Support our activity and help us continue our development -> [Open Collective](https://opencollective.com/planby).

## Getting Started

### Installation

- yarn

```sh
yarn add planby
```

- npm

```sh
npm install planby
```

## Usage

```tsx
import { useEpg, Epg, Layout } from 'planby';

const channels = React.useMemo(
  () => [
    {
      logo: 'https://via.placeholder.com',
      uuid: '10339a4b-7c48-40ab-abad-f3bcaf95d9fa',
      ...
    },
  ],
  []
);

const epg = React.useMemo(
  () => [
    {
      channelUuid: '30f5ff1c-1346-480a-8047-a999dd908c1e',
      description:
        'Ut anim nisi consequat minim deserunt...',
      id: 'b67ccaa3-3dd2-4121-8256-33dbddc7f0e6',
      image: 'https://via.placeholder.com',
      since: "2022-02-02T23:50:00",
      till: "2022-02-02T00:55:00",
      title: 'Title',
      ...
    },
  ],
  []
);

const {
  getEpgProps,
  getLayoutProps,
  onScrollToNow,
  onScrollLeft,
  onScrollRight,
} = useEpg({
  epg,
  channels,
  startDate: '2022/02/02', // or 2022-02-02T00:00:00
});

return (
  <div>
    <div style={{ height: '600px', width: '1200px' }}>
      <Epg {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
        />
      </Epg>
    </div>
  </div>
);
```

or

#### Custom width and height

```tsx
const {
  getEpgProps,
  getLayoutProps,
  ...
} = useEpg({
  epg,
  channels,
 startDate: '2022/02/02', // or 2022-02-02T00:00:00
  width: 1200,
  height: 600
});

return (
  <div>
     <Epg {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
        />
      </Epg>
  </div>

```

or

#### Time range

```tsx
const {
  getEpgProps,
  getLayoutProps,
  ...
} = useEpg({
  epg,
  channels,
  startDate: '2022-02-02T10:00:00',
  endDate: '2022-02-02T20:00:00',
  width: 1200,
  height: 600
});

return (
  <div>
     <Epg {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
        />
      </Epg>
  </div>

```

## API

### useEpg

#### Options

Available options in useEpg

| Property           | Type      | Status   | Description                                                                                                                                                      |
| ------------------ | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `channels`         | `array`   | required | Array with channels data                                                                                                                                         |
| `epg`              | `array`   | required | Array with epg data                                                                                                                                              |
| `width`            | `number`  | optional | Epg width                                                                                                                                                        |
| `height`           | `number`  | optional | Epg height                                                                                                                                                       |
| `sidebarWidth`     | `number`  | optional | Width of the sidebar with channels                                                                                                                               |
| `itemHeight`       | `number`  | optional | Height of channels and programs in the EPG. Default value is 80                                                                                                  |
| `dayWidth`         | `number`  | optional | Width of the day. Default value is 7200. Calculation to set up day width with own hour width value eg. 24h \* 300px(your custom hour width) = 7200px -> dayWidth |
| `startDate`        | `string`  | optional | Date format `2022/02/02` or `2022-02-02T00:00:00`. You can set your own start time eg. `2022-02-02T10:00:00`, `2022-02-02T14:00:00` etc. Full clock hours only.  |
| `endtDate`         | `string`  | optional | Date format `2022-02-02T00:00:00`. You can set your own end time eg. `2022-02-02T15:00:00`, `2022-02-02T:20:00` etc. Full clock hours only.                      |
| `isBaseTimeFormat` | `boolean` | optional | Convert to 12 hours format eg. `2:00am, 4:00pm` etc. Default value is false.                                                                                     |
| `isSidebar`        | `boolean` | optional | Show/hide sidebar                                                                                                                                                |
| `isTimeline`       | `boolean` | optional | Show/hide timeline                                                                                                                                               |
| `isLine`           | `boolean` | optional | Show/hide line                                                                                                                                                   |
| `theme`            | `object`  | optional | Object with theme schema                                                                                                                                         |

#### Note about width and height props

Without declaring the `width` and `length` properties, the component takes the dimensions of the parent element.

#### Instance Properties

Properties returned from useEpg

| Property        | Type                      | Description                          |
| --------------- | ------------------------- | ------------------------------------ |
| `scrollY`       | `number`                  | Current scroll y value               |
| `scrollX`       | `number`                  | Current scroll x value               |
| `onScrollLeft`  | `function(value: number)` | Default value is 300                 |
| `onScrollRight` | `function(value: number)` | Default value is 300                 |
| `onScrollToNow` | `function()`              | Scroll to current time/live programs |
| `onScrollTop`   | `function(value: number)` | Default value is 300                 |

### Channel schema

| Property | Type     | Status   |
| -------- | -------- | -------- |
| `logo`   | `string` | required |
| `uuid`   | `string` | required |

### Epg schema

| Property      | Type     | Status   |
| ------------- | -------- | -------- |
| `channelUuid` | `string` | required |
| `id`          | `string` | required |
| `image`       | `string` | required |
| `since`       | `string` | required |
| `till`        | `string` | required |
| `title`       | `string` | required |

### Epg

#### Base props

Available props in Epg

| Property    | Type        | Description              | Status   |
| ----------- | ----------- | ------------------------ | -------- |
| `isLoading` | `boolean`   | Loader state             | optional |
| `loader`    | `Component` | Loader custom cpomponent | optional |

### Layout

#### Base props

Available props in Layout.

| Property         | Type                                                     | Description                                                                                                     | Status   |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------- |
| `renderProgram`  | `function({ program: { data: object, position: object})` | `data` object contains all properties related to the program, `position` object includes all position styles    | optional |
| `renderChannel`  | `function({ channel: { ..., position: object})`          | `channel` object contains all properties related to the channel, `position` object includes all position styles | optional |
| `renderTimeline` | `function({sidebarWidth: number})`                       | `sidebarWidth` value of the channel's sidebar width                                                             | optional |

# Render functions

You can use Plaby's style components to develop main features. Moreover, you can integrate with third party UI library eg. Chakra UI, Material UI etc or make custom styles.

## renderProgram

Below is an example that allows you to render your custom Program component using Plaby's style components.

```tsx
import {
  useEpg,
  Epg,
  Layout,
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramTitle,
  ProgramText,
  ProgramImage,
  useProgram,
  Program,
  ProgramItem
} from "planby";


const Item = ({ program,...rest }: ProgramItem) => {
  const { styles, formatTime, isLive, isMinWidth } = useProgram({ program,...rest });

  const { data } = program;
  const { image, title, since, till } = data;

  const sinceTime = formatTime(since);
  const tillTime = formatTime(till);

  return (
    <ProgramBox width={styles.width} style={styles.position}>
      <ProgramContent
        width={styles.width}
        isLive={isLive}
      >
        <ProgramFlex>
          {isLive && isMinWidth && <ProgramImage src={image} alt="Preview" />}
          <ProgramStack>
            <ProgramTitle>{title}</ProgramTitle>
            <ProgramText>
              {sinceTime} - {tillTime}
            </ProgramText>
          </ProgramStack>
        </ProgramFlex>
      </ProgramContent>
    </ProgramBox>
  );
};

function App() {

  ...

 const {
  getEpgProps,
  getLayoutProps,
} = useEpg({
  epg,
  channels,
  startDate: '2022/02/02', // or 2022-02-02T00:00:00
});

return (
  <div>
    <div style={{ height: '600px', width: '1200px' }}>
      <Epg {...getEpgProps()}>
        <Layout
            {...getLayoutProps()}
            renderProgram={({ program,...rest }) => (
              <Item key={program.data.id} program={program} {...rest} />
            )}
          />
      </Epg>
    </div>
  </div>
);
}

export default App;
```

## renderProgram - 12 hours time format

Below is an example that allows you to render your custom Program component with 12 hours time format using Plaby's style components.

```tsx
...
const Item = ({ program, ...rest }: ProgramItem) => {
  const {
    styles,
    formatTime,
    set12HoursTimeFormat,
    isLive,
    isMinWidth,
  } = useProgram({
    program,
    ...rest
  });

  const { data } = program;
  const { image, title, since, till } = data;

  const sinceTime = formatTime(since, set12HoursTimeFormat()).toLowerCase();
  const tillTime = formatTime(till, set12HoursTimeFormat()).toLowerCase();

  return (
    <ProgramBox width={styles.width} style={styles.position}>
      <ProgramContent
        width={styles.width}
        isLive={isLive}
      >
        <ProgramFlex>
          {isLive && isMinWidth && <ProgramImage src={image} alt="Preview" />}
          <ProgramStack>
            <ProgramTitle>{title}</ProgramTitle>
            <ProgramText>
              {sinceTime} - {tillTime}
            </ProgramText>
          </ProgramStack>
        </ProgramFlex>
      </ProgramContent>
    </ProgramBox>
  );
};

function App() {

  ...

 const {
  getEpgProps,
  getLayoutProps,
} = useEpg({
  epg,
  channels,
  isBaseTimeFormat: true,
  startDate: '2022/02/02', // or 2022-02-02T00:00:00
});

...
}

export default App;
```

## renderChannel

Below is an example that allows you to render your custom Channel component using Plaby's style components.

```tsx
import { useEpg, Epg, Layout, ChannelBox, ChannelLogo, Channel } from 'planby';

interface ChannelItemProps {
  channel: Channel;
}

const ChannelItem = ({ channel }: ChannelItemProps) => {
  const { position, logo } = channel;
  return (
    <ChannelBox {...position}>
      <ChannelLogo
        onClick={() => console.log('channel', channel)}
        src={logo}
        alt="Logo"
      />
    </ChannelBox>
  );
};


function App() {

  ...

  const {
    getEpgProps,
    getLayoutProps,
  } = useEpg({
    epg,
    channels,
    startDate: '2022/02/02', // or 2022-02-02T00:00:00
  });

  return (
    <div>
      <div style={{ height: '600px', width: '1200px' }}>
        <Epg {...getEpgProps()}>
          <Layout
              {...getLayoutProps()}
              renderChannel={({ channel }) => (
              <ChannelItem key={channel.uuid} channel={channel} />
            )}
            />
        </Epg>
      </div>
    </div>
  );
}

```

## renderTimeline

Below is an example that allows you to render your custom Timeline component using Plaby's style components.

```tsx
import {
  TimelineWrapper,
  TimelineBox,
  TimelineTime,
  TimelineDivider,
  TimelineDividers,
  useTimeline,
} from 'planby';

interface TimelineProps {
  isBaseTimeFormat: boolean;
  isSidebar: boolean;
  dayWidth: number;
  hourWidth: number;
  numberOfHoursInDay: number;
  offsetStartHoursRange: number;
  sidebarWidth: number;
}

export function Timeline({
  isBaseTimeFormat,
  isSidebar,
  dayWidth,
  hourWidth,
  numberOfHoursInDay,
  offsetStartHoursRange,
  sidebarWidth,
}: TimelineProps) {
  const { time, dividers, formatTime } = useTimeline(
    numberOfHoursInDay,
    isBaseTimeFormat
  );

  const renderTime = (index: number) => (
    <TimelineBox key={index} width={hourWidth}>
      <TimelineTime>
        {formatTime(index + offsetStartHoursRange).toLowerCase()}
      </TimelineTime>
      <TimelineDividers>{renderDividers()}</TimelineDividers>
    </TimelineBox>
  );

  const renderDividers = () =>
    dividers.map((_, index) => (
      <TimelineDivider key={index} width={hourWidth} />
    ));

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

function App() {

  ...

  const {
    getEpgProps,
    getLayoutProps,
  } = useEpg({
    epg,
    channels,
    startDate: '2022/02/02', // or 2022-02-02T00:00:00
  });

  return (
    <div>
      <div style={{ height: '600px', width: '1200px' }}>
        <Epg {...getEpgProps()}>
          <Layout
              {...getLayoutProps()}
              renderTimeline={(props) => <Timeline {...props} />}
            />
        </Epg>
      </div>
    </div>
  );
}

export default App;
```

## Theme

### Schema

Make your theme custom. Below is theme schema that you can pass as one of the options to `useEpg` hook.

```jsx
const theme = {
  primary: {
    600: '#1a202c',
    900: '#171923',
  },
  grey: { 300: '#d1d1d1' },
  white: '#fff',
  green: {
    300: '#2C7A7B',
  },
  loader: {
    teal: '#5DDADB',
    purple: '#3437A2',
    pink: '#F78EB6',
    bg: '#171923db',
  },
  scrollbar: {
    border: '#ffffff',
    thumb: {
      bg: '#e1e1e1',
    },
  },
  gradient: {
    blue: {
      300: '#002eb3',
      600: '#002360',
      900: '#051937',
    },
  },
  text: {
    grey: {
      300: '#a0aec0',
      500: '#718096',
    },
  },
  timeline: {
    divider: {
      bg: '#718096',
    },
  },
};
```

## All import options

```tsx
import {
  Epg,
  Layout,
  ChannelBox,
  ChannelLogo,
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramTitle,
  ProgramText,
  ProgramImage,
  TimelineWrapper,
  TimelineBox,
  TimelineTime,
  TimelineDividers,
  useEpg,
  useProgram,
  useTimeline,
  Program, // Interface
  Channel, // Interface
  ProgramItem, // Interface for program render
  Theme, // Interface
} from 'planby';
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Karol Kozer - [@kozerkarol_twitter](https://twitter.com/kozerkarol)

Project Link: [https://github.com/karolkozer/planby](https://github.com/karolkozer/planby)
