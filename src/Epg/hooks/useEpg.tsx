import React from "react";
import { startOfToday } from "date-fns";

// Import interfaces
import { Channel, Program, Theme } from "../helpers/interfaces";

// Import types
import { DateTime, BaseTimeFormat, Position } from "../helpers/types";

// Import helpers
import {
  DAY_WIDTH,
  ITEM_HEIGHT,
  ITEM_OVERSCAN,
  getDayWidthResources,
  getTimeRangeDates,
} from "../helpers";

// Import theme
import { theme as defaultTheme } from "../theme";

// Import helpers
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
  endDate?: DateTime;
  isBaseTimeFormat?: BaseTimeFormat;
  isSidebar?: boolean;
  isTimeline?: boolean;
  isRTL?: boolean;
  isLine?: boolean;
  theme?: Theme;
  globalStyles?: string;
  dayWidth?: number;
  sidebarWidth?: number;
  itemHeight?: number;
  itemOverscan?: number;
  timezone?: string;
}

const defaultStartDateTime = formatTime(startOfToday());

export function useEpg({
  channels: channelsEpg,
  epg,
  startDate: startDateInput = defaultStartDateTime,
  endDate: endDateInput = "",
  isRTL = false,
  isBaseTimeFormat = false,
  isSidebar = true,
  isTimeline = true,
  isLine = true,
  theme: customTheme,
  globalStyles,
  dayWidth: customDayWidth = DAY_WIDTH,
  sidebarWidth = SIDEBAR_WIDTH,
  itemHeight = ITEM_HEIGHT,
  itemOverscan = ITEM_OVERSCAN,
  width,
  height,
  timezone,
}: useEpgProps) {

  console.log('Timezone passed to useEpg (should be riyadh): ', timezone)

  // Get converted start and end dates
  const { startDate, endDate } = getTimeRangeDates(
    startDateInput,
    endDateInput,
    timezone
  );

  console.log('Get converted start and end dates')
  console.log({ startDate, endDate })


  // Get day and hour width of the day
  const { hourWidth, dayWidth, ...dayWidthResourcesProps } = React.useMemo(
    () =>
      getDayWidthResources({ dayWidth: customDayWidth, startDate, endDate, timezone }),
    [customDayWidth, startDate, endDate]
  );

  console.log('Get day and hour width of the day')
  console.log({ hourWidth, dayWidth, dayWidthResourcesProps })

  // -------- Effects --------
  const { containerRef, scrollBoxRef, ...layoutProps } = useLayout({
    startDate,
    endDate,
    sidebarWidth,
    width,
    height,
    hourWidth,
    timezone,
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
  const endDateTime = formatTime(endDate);
  const programs = React.useMemo(
    () =>
      getConvertedPrograms({
        data: epg,
        channels,
        startDate: startDateTime,
        endDate: endDateTime,
        itemHeight,
        hourWidth,
      }),
    [epg, channels, startDateTime, endDateTime, itemHeight, hourWidth]
  );

  const theme: Theme = customTheme || defaultTheme;

  // -------- Handlers --------
  const isProgramVisible = React.useCallback(
    (position: Position) =>
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
    (position: Pick<Position, "top">) =>
      getSidebarItemVisibility(position, scrollY, layoutHeight, itemOverscan),
    [scrollY, layoutHeight, itemOverscan]
  );

  const getEpgProps = () => ({
    isRTL,
    isSidebar,
    isLine,
    isTimeline,
    width,
    height,
    sidebarWidth,
    ref: containerRef,
    theme,
    globalStyles,
  });

  const getLayoutProps = () => ({
    programs,
    channels,
    startDate,
    endDate,
    scrollY,
    onScroll,
    isRTL,
    isBaseTimeFormat,
    isSidebar,
    isTimeline,
    isLine,
    isProgramVisible,
    isChannelVisible,
    dayWidth,
    hourWidth,
    sidebarWidth,
    itemHeight,
    ...dayWidthResourcesProps,
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
