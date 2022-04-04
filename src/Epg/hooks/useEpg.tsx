import React from "react";
import { startOfToday } from "date-fns";

// Import interfaces
import { Channel, Program, Theme } from "../helpers/interfaces";

// Import types
import { DateTime } from "../helpers/types";

// Import helpers
import {
  DAY_WIDTH,
  ITEM_HEIGHT,
  ITEM_OVERSCAN,
  getHourWidth,
} from "../helpers";

// Import theme
import { theme as defaultTheme } from "../theme";

// Import heleprs
import {
  SIDEBAR_WIDTH,
  formatTime,
  getConvertedChannels,
  getConvertedPrograms,
  getItemVisibility,
  getSidebarItemVisibility,
} from "../helpers";

// Import components
import { useLayout } from "./useLayout";

interface useEpgProps {
  channels: Channel[];
  epg: Program[];
  width?: number;
  height?: number;
  startDate?: DateTime;
  isSidebar?: boolean;
  isTimeline?: boolean;
  isLine?: boolean;
  theme?: Theme;
  dayWidth?: number;
  sidebarWidth?: number;
  itemHeight?: number;
  itemOverscan?: number;
}

const defaultStartDateTime = formatTime(startOfToday());

export function useEpg({
  channels: channelsEpg,
  epg,
  startDate = defaultStartDateTime,
  isSidebar = true,
  isTimeline = true,
  isLine = true,
  theme: customTheme,
  dayWidth = DAY_WIDTH,
  sidebarWidth = SIDEBAR_WIDTH,
  itemHeight = ITEM_HEIGHT,
  itemOverscan = ITEM_OVERSCAN,
  width,
  height,
}: useEpgProps) {
  // Get hour width of the day
  const hourWidth = React.useMemo(() => getHourWidth(dayWidth), [dayWidth]);

  // -------- Effects --------
  const { containerRef, scrollBoxRef, ...layoutProps } = useLayout({
    startDate,
    sidebarWidth,
    width,
    height,
    hourWidth,
  });

  const { scrollX, scrollY, layoutWidth, layoutHeight } = layoutProps;
  const {
    onScroll,
    onScrollToNow,
    onScrollTop,
    onScrollLeft,
    onScrollRight,
  } = layoutProps;

  //-------- Variables --------
  const channels = React.useMemo(
    () => getConvertedChannels(channelsEpg, itemHeight),
    [channelsEpg, itemHeight]
  );

  const startDateTime = formatTime(startDate);
  const programs = React.useMemo(
    () =>
      getConvertedPrograms({
        data: epg,
        channels,
        startDate: startDateTime,
        itemHeight,
        hourWidth,
      }),
    [epg, channels, startDateTime, itemHeight, hourWidth]
  );

  const theme: Theme = customTheme || defaultTheme;

  // -------- Handlers --------
  const isProgramVisible = React.useCallback(
    (position) =>
      getItemVisibility(
        position,
        scrollY,
        scrollX,
        layoutHeight,
        layoutWidth,
        itemOverscan
      ),
    [scrollY, scrollX, layoutHeight, layoutWidth, itemOverscan]
  );

  const isChannelVisible = React.useCallback(
    (position) =>
      getSidebarItemVisibility(position, scrollY, layoutHeight, itemOverscan),
    [scrollY, layoutHeight, itemOverscan]
  );

  const getEpgProps = () => ({
    width,
    height,
    isSidebar,
    isLine,
    isTimeline,
    sidebarWidth,
    ref: containerRef,
    theme,
  });

  const getLayoutProps = () => ({
    programs,
    channels,
    startDate,
    scrollY,
    onScroll,
    isSidebar,
    isTimeline,
    isLine,
    isProgramVisible,
    isChannelVisible,
    dayWidth,
    hourWidth,
    sidebarWidth,
    itemHeight,
    ref: scrollBoxRef,
  });

  return {
    getEpgProps,
    getLayoutProps,
    onScrollToNow,
    onScrollTop,
    onScrollLeft,
    onScrollRight,
    scrollY,
    scrollX,
  };
}
