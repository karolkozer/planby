import React from "react";
import { startOfDay } from "date-fns";

// Import types
import { DateTime } from "../../helpers/types";

// Import helpers
import {
  DAY_WIDTH,
  HOUR_WIDTH,
  HOUR_IN_MINUTES,
  PROGRAM_REFRESH,
  getPositionX,
} from "../../helpers";

// Import hooks
import { useInterval } from "../../hooks";

interface useLineProps {
  startDate: DateTime;
  sidebarWidth: number;
}

export function useLine({ startDate, sidebarWidth }: useLineProps) {
  const initialState =
    getPositionX(startOfDay(new Date(startDate)), new Date(), startDate) +
    sidebarWidth;
  const [positionX, setPositionX] = React.useState<number>(() => initialState);

  const isDayEnd = positionX !== DAY_WIDTH;
  const isScrollX = React.useMemo(() => (isDayEnd ? PROGRAM_REFRESH : null), [
    isDayEnd,
  ]);

  useInterval(() => {
    const offset = HOUR_WIDTH / HOUR_IN_MINUTES;
    const positionOffset = offset * 2;
    setPositionX((prev) => prev + positionOffset);
  }, isScrollX);

  React.useEffect(() => {
    const date = new Date(startDate);
    const newPositionX =
      getPositionX(startOfDay(date), new Date(), startDate) + sidebarWidth;
    setPositionX(newPositionX);
  }, [startDate, sidebarWidth]);

  return { positionX, isScrollX };
}
