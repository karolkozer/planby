import faker from "@faker-js/faker";

const channelFakeData = {
  country: faker.address.country(),
  logo: faker.image.image(),
  provider: 333,
  title: faker.commerce.productName(),
  type: faker.commerce.product(),
  uuid: "09-3de-34",
  year: faker.date.past(),
};

const position = { top: 0, height: 80 };

interface BuildChannel {
  [key: string]: any;
}
export function buildChannel(overrides: BuildChannel = {}) {
  return { ...channelFakeData, ...overrides };
}

export function buildChannelWithPosition(overrides: BuildChannel = {}) {
  return { ...channelFakeData, position, ...overrides };
}
