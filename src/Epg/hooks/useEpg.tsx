import React from "react";
import { startOfToday } from "date-fns";

// Import interfaces
import { Channel, Program, Theme } from "../helpers/interfaces";

// Import types
import { DateTime } from "../helpers/types";

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
  sidebarWidth?: number;
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
  sidebarWidth = SIDEBAR_WIDTH,
  ...rest
}: useEpgProps) {
  const { containerRef, scrollBoxRef, ...layoutProps } = useLayout({
    startDate,
    ...rest,
  });
  const { scrollX, scrollY, layoutWidth, layoutHeight } = layoutProps;
  const { onScrollToNow, onScrollLeft, onScrollRight, onScroll } = layoutProps;

  //-------- Variables --------
  const channels = React.useMemo(
    () => getConvertedChannels(channelsEpg),
    [channelsEpg]
  );

  const programs = React.useMemo(
    () => getConvertedPrograms({ data: epg, channels, startDate }),
    [epg, channels, startDate]
  );

  const theme: Theme = customTheme || defaultTheme;

  // -------- Handlers --------
  const isProgramVisible = React.useCallback(
    (position) =>
      getItemVisibility(position, scrollY, scrollX, layoutHeight, layoutWidth),
    [scrollY, scrollX, layoutHeight, layoutWidth]
  );

  const isChannelVisible = React.useCallback(
    (position) => getSidebarItemVisibility(position, scrollY, layoutHeight),
    [scrollY, layoutHeight]
  );

  const getEpgProps = () => ({
    width: layoutWidth,
    height: layoutHeight,
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
    sidebarWidth,
    ref: scrollBoxRef,
  });

  return {
    getEpgProps,
    getLayoutProps,
    onScrollToNow,
    onScrollLeft,
    onScrollRight,
    scrollY,
    scrollX,
  };
}
