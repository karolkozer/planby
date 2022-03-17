import faker from '@faker-js/faker';

export const sinceAndTillTimes = [
  { since: '2022-03-13T23:50:00', till: '2022-03-14T00:55:00' },
  { since: '2022-03-14T00:55:00', till: '2022-03-14T02:35:00' },
  { since: '2022-03-14T02:35:00', till: '2022-03-14T03:30:00' },
  { since: '2022-03-14T03:30:00', till: '2022-03-14T04:15:00' },
  { since: '2022-03-14T04:15:00', till: '2022-03-14T04:30:00' },
  { since: '2022-03-14T04:30:00', till: '2022-03-14T05:10:00' },
  { since: '2022-03-14T05:10:00', till: '2022-03-14T05:35:00' },
  { since: '2022-03-14T05:35:00', till: '2022-03-14T06:00:00' },
  { since: '2022-03-14T06:00:00', till: '2022-03-14T07:00:00' },
  { since: '2022-03-14T07:00:00', till: '2022-03-14T07:40:00' },
  { since: '2022-03-14T07:40:00', till: '2022-03-14T08:05:00' },
  { since: '2022-03-14T08:05:00', till: '2022-03-14T08:20:00' },
  { since: '2022-03-14T08:20:00', till: '2022-03-14T08:45:00' },
  { since: '2022-03-14T08:45:00', till: '2022-03-14T09:15:00' },
  { since: '2022-03-14T09:15:00', till: '2022-03-14T10:20:00' },
  { since: '2022-03-14T10:20:00', till: '2022-03-14T11:15:00' },
  { since: '2022-03-14T11:15:00', till: '2022-03-14T11:50:00' },
  { since: '2022-03-14T11:50:00', till: '2022-03-14T13:45:00' },
  { since: '2022-03-14T13:45:00', till: '2022-03-14T13:55:00' },
  { since: '2022-03-14T13:55:00', till: '2022-03-14T14:55:00' },
  { since: '2022-03-14T14:55:00', till: '2022-03-14T15:55:00' },
  { since: '2022-03-14T15:55:00', till: '2022-03-14T17:00:00' },
  { since: '2022-03-14T17:00:00', till: '2022-03-14T17:20:00' },
  { since: '2022-03-14T17:20:00', till: '2022-03-14T17:30:00' },
  { since: '2022-03-14T17:30:00', till: '2022-03-14T18:30:00' },
  { since: '2022-03-14T18:30:00', till: '2022-03-14T19:25:00' },
  { since: '2022-03-14T19:25:00', till: '2022-03-14T19:30:00' },
  { since: '2022-03-14T19:30:00', till: '2022-03-14T20:05:00' },
  { since: '2022-03-14T20:05:00', till: '2022-03-14T20:10:00' },
  { since: '2022-03-14T20:10:00', till: '2022-03-14T20:35:00' },
];

const programFakeData = {
  id: '36f',
  description: faker.lorem.paragraph(),
  title: faker.commerce.product(),
  since: sinceAndTillTimes[0].since,
  till: sinceAndTillTimes[0].till,
  channelUuid: '09-3de-34',
  image: faker.image.image(),
  country: faker.address.country(),
  genre: faker.lorem.word(),
  rating: faker.datatype.float(),
};

interface BuildProgram {
  [key: string]: any;
}
export function buildProgram(overrides: BuildProgram = {}) {
  return { ...programFakeData, ...overrides };
}

export function buildProgramWithPosition(overrides: BuildProgram = {}) {
  return {
    data: programFakeData,
    position: {
      height: faker.datatype.float(),
      left: faker.datatype.float(),
      top: faker.datatype.float(),
      width: faker.datatype.float(),
      ...overrides,
    },
  };
}

export function buildEpg() {
  return sinceAndTillTimes.map(time => {
    const { since, till } = time;
    return {
      id: faker.datatype.uuid(),
      description: faker.lorem.paragraph(),
      title: faker.commerce.product(),
      channelUuid: '09-3de-34',
      image: faker.image.image(),
      country: faker.address.country(),
      genre: faker.lorem.word(),
      rating: faker.datatype.float(),
      since,
      till,
    };
  });
}
