import * as React from "react";
import { isToday } from "date-fns";

// Import types
import { DateTime } from "../../helpers/types";

// Import styles
import { LineStyled } from "../../styles";

// Import components
import { useLine } from "./useLine";

interface LineProps {
  height: number;
  startDate: DateTime;
  sidebarWidth: number;
}

const { Box } = LineStyled;

export function Line({ height, startDate, sidebarWidth }: LineProps) {
  const { positionX } = useLine({ startDate, sidebarWidth });

  const date = new Date(startDate);
  if (!isToday(date)) return null;

  return <Box height={height} left={positionX} />;
}
