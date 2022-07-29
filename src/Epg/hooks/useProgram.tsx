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
  isRTL?: boolean;
  isBaseTimeFormat: BaseTimeFormat;
  minWidth?: number;
}

export function useProgram<T extends ProgramItem>({
  isRTL = false,
  isBaseTimeFormat,
  program,
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

  const getRTLSinceTime = (since: string | number | Date) =>
    isRTL ? till : since;
  const getRTLTillTime = (till: string | number | Date) =>
    isRTL ? since : till;

  useInterval(() => {
    const status = getLiveStatus(since, till);
    setIsLive(status);
  }, PROGRAM_REFRESH);

  const isMinWidth = width > minWidth;

  return {
    isLive,
    isMinWidth,
    isRTL,
    formatTime,
    set12HoursTimeFormat,
    getRTLSinceTime,
    getRTLTillTime,
    styles: { width, position: newPosition },
  };
}
