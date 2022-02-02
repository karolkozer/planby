import * as React from "react";
// Import styles
import { generateArray } from "../helpers";

// Import styles
import { TimelineStyled } from "../styles";

const { Wrapper, Box, Time, Dividers, Divider } = TimelineStyled;

interface TimelineProps {
  isSidebar: boolean;
  sidebarWidth: number;
}
export function Timeline({ isSidebar, sidebarWidth }: TimelineProps) {
  const time = (index: number) => `${index < 10 ? `0${index}` : index}:00`;

  const renderTime = (index: number) => (
    <Box key={index}>
      <Time>{time(index)}</Time>
      <Dividers>{renderDividers()}</Dividers>
    </Box>
  );

  const renderDividers = () =>
    generateArray(4).map((_, index) => <Divider key={index} />);

  return (
    <Wrapper sidebarWidth={sidebarWidth} isSidebar={isSidebar}>
      {generateArray(24).map((_, index) => renderTime(index))}
    </Wrapper>
  );
}
