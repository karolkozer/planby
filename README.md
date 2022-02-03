<div align="center" style="margin-bottom: 10px">
  <a href="https://www.npmjs.com/package/planby">
    <img src="https://raw.githubusercontent.com/karolkozer/planby/master/images/planby-logo.png" alt="planby" />
  </a>
</div>

<div align="center" style="margin-bottom: 20px">
  <a href="https://www.npmjs.com/package/planby">
    <img alt="npm" src="https://img.shields.io/npm/v/planby" />
  </a>
  <a href="https://npmjs.org/package/planby">
    <img alt="downloads" src="https://badgen.net/npm/dm/planby" />
  </a>
</div>

## Description

Planby is a solution for a quick implementation of Epg, schedules, music events timelines and many more ideas. It uses custom virtual view which allows you to operate on a really big number of data. The component has a simple API that you can easily integrate with other third party UI libraries. The component theme is customized to the needs of the application design.

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

```jsx
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
      since: "2022-02-02T00:55:00",
      till: "2022-02-02T02:35:00",
      title: 'News',
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
  startDate: '2022-02-1', // or 2022-02-02T00:00:00
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

```jsx
const {
  getEpgProps,
  getLayoutProps,
  ...
} = useEpg({
  epg,
  channels,
 startDate: '2022-02-1', // or 2022-02-02T00:00:00
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

| Property       | Type              | Status   | Description                                       |
| -------------- | ----------------- | -------- | ------------------------------------------------- |
| `channels`     | `array`           | required | Array with channels data                          |
| `epg`          | `array`           | required | Array with epg data                               |
| `width`        | `number`          | optional | Epg width                                         |
| `height`       | `number`          | optional | Epg height                                        |
| `sidebarWidth` | `number`          | optional | Width of the sidebar with channels                |
| `startDate`    | `string` / `Date` | optional | Date format `2022/02/02` or `2022-02-02T00:00:00` |
| `isSidebar`    | `boolean`         | optional | Show/hide sidebar                                 |
| `isTimeline`   | `boolean`         | optional | Show/hide timeline                                |
| `isLine`       | `boolean`         | optional | Show/hide line                                    |
| `theme`        | `object`          | optional | Object with theme schema                          |

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

### Layout

#### Base props

Available props in Layout

| Property        | Type                                                     | Description                                                                                                     | Status   |
| --------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------- |
| `renderProgram` | `function({ program: { data: object, position: object})` | `data` object contains all properties related to the program, `position` object includes all position styles    | optional |
| `renderChannel` | `function({ channel: { ..., position: object})`          | `channel` object contains all properties related to the channel, `position` object includes all position styles | optional |

## Theme

### Schema

Make your theme custom. Below is theme schema that you can pass as one of the options to [`useEpg`](useEpg) hook.

```jsx
const theme = {
  primary: {
    600: '#1a202c',
    900: '#171923',
  },
  white: '#fff',
  green: {
    300: '#2c7a7b',
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

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Karol Kozer - [@kozerkarol_twitter](https://twitter.com/kozerkarol)

Project Link: [https://github.com/karolkozer/planby](https://github.com/karolkozer/planby)
