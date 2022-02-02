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
}

export function useLine({ startDate }: useLineProps) {
  const [positionX, setPositionX] = React.useState<number>(
    () =>
      getPositionX(startOfDay(new Date(startDate)), new Date(), startDate) + 100
  );
  const isDayEnd = positionX === DAY_WIDTH;
  const isScrollX = isDayEnd ? 180000 : null;
  useInterval(() => {
    const position = (HOUR_WIDTH / HOUR_IN_MINUTES) * 3;
    setPositionX((prev) => prev + position + 100);
  }, isScrollX);
  return { positionX };
}
