import React from "react";
import { format } from "date-fns";

// Import types
import { ProgramItem } from "../helpers/types";

// Import helpers
import { PROGRAM_REFRESH, TIME_FORMAT, getLiveStatus, omit } from "../helpers";

// Import hooks
import { useInterval } from "./useInterval";

interface useProgramProps<T> {
  program: T;
  minWidth?: number;
}

export function useProgram<T extends ProgramItem>({
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
  ) => format(new Date(date), formatType);

  useInterval(() => {
    const status = getLiveStatus(since, till);
    setIsLive(status);
  }, PROGRAM_REFRESH);

  const isMinWidth = width > minWidth;

  return {
    formatTime,
    isLive,
    isMinWidth,
    styles: { width, position: newPosition },
  };
}
