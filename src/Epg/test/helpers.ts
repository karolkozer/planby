import { buildChannelWithPosition, buildEpgWithPosition } from "./db";

type Overrides = { [key: string]: any };
export function getLayoutProps(
  overrides: Overrides = {},
  sliceNumber: number = 1
) {
  const channels = [buildChannelWithPosition()];
  const programs = buildEpgWithPosition().slice(0, sliceNumber);

  return {
    programs,
    channels,
    scrollY: 0,
    sidebarWidth: 100,
    startDate: "2022-03-23T00:00:00",
    isSidebar: true,
    isTimeline: true,
    itemHeight: 80,
    isLine: true,
    isProgramVisible: () => true,
    isChannelVisible: () => true,
    onScroll: () => {},
    ...overrides,
  };
}
