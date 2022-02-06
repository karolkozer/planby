import React from "react";
import { startOfDay } from "date-fns";

// Import types
import { DateTime } from "../../helpers/types";

// Import helpers
import {
  DAY_WIDTH,
  HOUR_WIDTH,
  HOUR_IN_MINUTES,
  getPositionX,
} from "../../helpers";

// Import hooks
import { useInterval } from "../../hooks";

interface useLineProps {
  startDate: DateTime;
  sidebarWidth: number;
}

export function useLine({ startDate, sidebarWidth }: useLineProps) {
  const getInitialState = () =>
    getPositionX(startOfDay(new Date(startDate)), new Date(), startDate) +
    sidebarWidth;
  const [positionX, setPositionX] = React.useState<number>(getInitialState);

  const isDayEnd = positionX === DAY_WIDTH;
  const isScrollX = isDayEnd ? 180000 : null;

  useInterval(() => {
    const position = (HOUR_WIDTH / HOUR_IN_MINUTES) * 3;
    setPositionX((prev) => prev + position + sidebarWidth);
  }, isScrollX);

  React.useEffect(() => {
    const date = new Date(startDate);
    const newPositionX =
      getPositionX(startOfDay(date), new Date(), startDate) + sidebarWidth;
    setPositionX(newPositionX);
  }, [startDate, sidebarWidth]);

  return { positionX };
}
