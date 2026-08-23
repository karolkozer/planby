import React from "react";

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
    startDate: "2022-03-23T00:00:00",
    endDate: "2022-03-23T23:59:00",
    dayWidth: 7200,
    hourWidth: 300,
    numberOfHoursInDay: 24,
    offsetStartHoursRange: 0,
    sidebarWidth: 100,
    itemHeight: 80,
    isSidebar: true,
    isTimeline: true,
    isLine: true,
    isBaseTimeFormat: false,
    isProgramVisible: () => true,
    isChannelVisible: () => true,
    onScroll: () => {},
    // React 19 types made createRef/useRef return RefObject<T | null>,
    // while Layout/Epg declare ref as RefObject<T>. Cast so the test props
    // match the component contract.
    ref: React.createRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>,
    ...overrides,
  };
}

export const getTestTimeDate = (
  h: string = "00",
  m: string = "00",
  s: string = "00"
) => `2022-03-23T${h}:${m}:${s}`;
