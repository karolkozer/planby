import faker from "@faker-js/faker";
import { omit, getProgramOptions } from "../common";
import { buildChannel, buildProgramWithPosition } from "../../test";

function filterData(
  data: Record<string, string | number | Date>,
  name: string
) {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (key !== name) {
      acc[key as string] = value;
    }
    return acc;
  }, {} as Record<string, string | number | Date>);
}

describe("Common helpers", () => {
  it("should omit the keys", () => {
    const channel = buildChannel();
    const channelWithoutLogo = filterData(channel, "logo");
    expect(omit(channel, "logo")).toEqual(channelWithoutLogo);
    expect(omit(channel, "logo")).not.toEqual(channel);
  });

  it("should get program options with position", () => {
    const options = getProgramOptions(
      buildProgramWithPosition({
        overrides: { edgeEnd: faker.datatype.float() },
      })
    );
    const programPositionConverted = {
      ...options,
      position: omit(options.position, "edgeEnd"),
    };
    expect(options).toEqual(programPositionConverted);
    expect(options).not.toEqual(
      buildProgramWithPosition({
        overrides: { edgeEnd: faker.datatype.float() },
      })
    );
  });
});
