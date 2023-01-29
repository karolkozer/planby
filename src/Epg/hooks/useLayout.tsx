import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { startOfToday, isToday as isTodayFns } from "date-fns";

// Import types
import { DateTime } from "../helpers/types";

// Import helpers
import {
  DEBOUNCE_WAIT,
  DEBOUNCE_WAIT_MAX,
  getPositionX,
  useIsomorphicLayoutEffect,
} from "../helpers";

interface useLayoutProps {
  height?: number;
  width?: number;
  hourWidth: number;
  sidebarWidth: number;
  startDate: DateTime;
  endDate: DateTime;
}

export function useLayout({
  height,
  width,
  startDate,
  endDate,
  hourWidth,
  sidebarWidth,
}: useLayoutProps) {
  const useIsomorphicEffect = useIsomorphicLayoutEffect();

  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollBoxRef = React.useRef<HTMLDivElement>(null);
  //-------- State --------
  const [scrollY, setScrollY] = React.useState<number>(0);
  const [scrollX, setScrollX] = React.useState<number>(0);
  const [layoutWidth, setLayoutWidth] = React.useState<number>(width as number);
  const [layoutHeight, setLayoutHeight] = React.useState<number>(
    height as number
  );
  const isToday = isTodayFns(new Date(startDate));

  // -------- Handlers --------
  const handleScrollDebounced = useDebouncedCallback(
    (value) => {
      setScrollY(value.y);
      setScrollX(value.x);
    },
    DEBOUNCE_WAIT,
    { maxWait: DEBOUNCE_WAIT_MAX }
  );

  const handleOnScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent> & { target: Element }) => {
      handleScrollDebounced({ y: e.target.scrollTop, x: e.target.scrollLeft });
    },
    [handleScrollDebounced]
  );

  const handleOnScrollToNow = React.useCallback(() => {
    if (scrollBoxRef?.current && isToday) {
      const clientWidth = (width ??
        containerRef.current?.clientWidth) as number;

      const newDate = new Date();
      const scrollPosition = getPositionX(
        startOfToday(),
        newDate,
        startDate,
        endDate,
        hourWidth
      );
      const scrollNow = scrollPosition - clientWidth / 2 + sidebarWidth;
      scrollBoxRef.current.scrollLeft = scrollNow;
    }
  }, [isToday, startDate, endDate, width, sidebarWidth, hourWidth]);

  const handleOnScrollTop = React.useCallback(
    (value: number = hourWidth) => {
      if (scrollBoxRef?.current) {
        const top = scrollBoxRef.current.scrollTop + value;
        scrollBoxRef.current.scrollTop = top;
      }
    },
    [hourWidth]
  );

  const handleOnScrollRight = React.useCallback(
    (value: number = hourWidth) => {
      if (scrollBoxRef?.current) {
        const right = scrollBoxRef.current.scrollLeft + value;
        scrollBoxRef.current.scrollLeft = right;
      }
    },
    [hourWidth]
  );

  const handleOnScrollLeft = React.useCallback(
    (value: number = hourWidth) => {
      if (scrollBoxRef?.current) {
        const left = scrollBoxRef.current.scrollLeft - value;
        scrollBoxRef.current.scrollLeft = left;
      }
    },
    [hourWidth]
  );

  const handleResizeDebounced = useDebouncedCallback(
    () => {
      if (containerRef?.current && !width) {
        const container = containerRef.current;
        const { clientWidth } = container;
        setLayoutWidth(clientWidth);
      }
    },
    DEBOUNCE_WAIT * 4,
    { maxWait: DEBOUNCE_WAIT_MAX * 4 }
  );

  // -------- Efffects --------
  useIsomorphicEffect(() => {
    if (containerRef?.current) {
      const container = containerRef.current;
      if (!width) {
        const { clientWidth } = container;
        setLayoutWidth(clientWidth);
      }
      if (!height) {
        const { clientHeight } = container;
        setLayoutHeight(clientHeight);
      }
    }

    if (scrollBoxRef?.current && isToday) {
      handleOnScrollToNow();
    }
  }, [height, width, startDate, isToday, handleOnScrollToNow]);

  useIsomorphicEffect(() => {
    window.addEventListener("resize", handleResizeDebounced);

    return () => {
      window.removeEventListener("resize", handleResizeDebounced);
    };
  }, [width]);

  return {
    containerRef,
    scrollBoxRef,
    scrollX,
    scrollY,
    layoutWidth,
    layoutHeight,
    onScroll: handleOnScroll,
    onScrollToNow: handleOnScrollToNow,
    onScrollTop: handleOnScrollTop,
    onScrollLeft: handleOnScrollLeft,
    onScrollRight: handleOnScrollRight,
  };
}
