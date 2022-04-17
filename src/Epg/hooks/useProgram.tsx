import React from "react";
import { format } from "date-fns";

// Import types
import { ProgramItem, BaseTimeFormat } from "../helpers/types";

// Import helpers
import { PROGRAM_REFRESH, TIME_FORMAT, getLiveStatus, omit } from "../helpers";

// Import hooks
import { useInterval } from "./useInterval";

interface useProgramProps<T> {
  program: T;
  isBaseTimeFormat: BaseTimeFormat;
  minWidth?: number;
}

export function useProgram<T extends ProgramItem>({
  program,
  isBaseTimeFormat,
  minWidth = 200,
}: useProgramProps<T>) {
  const { data, position } = program;
  const { width } = position;

  const { since, till } = data;
  const [isLive, setIsLive] = React.useState<boolean>(() =>
    getLiveStatus(since, till)
  );

  const newPosition = omit(position, "egdeEnd");

  const formatTime = (
    date: string | number | Date,
    formatType: string = TIME_FORMAT.HOURS_MIN
  ) => format(new Date(date), formatType).replace(/\s/g, "");

  const set12HoursTimeFormat = () => {
    if (isBaseTimeFormat) return TIME_FORMAT.BASE_HOURS_TIME;
    return TIME_FORMAT.HOURS_MIN;
  };

  useInterval(() => {
    const status = getLiveStatus(since, till);
    setIsLive(status);
  }, PROGRAM_REFRESH);

  const isMinWidth = width > minWidth;

  return {
    formatTime,
    set12HoursTimeFormat,
    isLive,
    isMinWidth,
    styles: { width, position: newPosition },
  };
}
