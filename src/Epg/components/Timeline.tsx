import * as React from "react";

// Import styles
import { TimelineStyled } from "../styles";

// Import hooks
import { useTimeline } from "../hooks";

const {
  TimelineWrapper,
  TimelineBox,
  TimelineTime,
  TimelineDividers,
  TimelineDivider,
} = TimelineStyled;

interface TimelineProps {
  isSidebar: boolean;
  sidebarWidth: number;
}

export function Timeline({ isSidebar, sidebarWidth }: TimelineProps) {
  const { time, dividers } = useTimeline();
  const timeFormat = (index: number) =>
    `${index < 10 ? `0${index}` : index}:00`;

  const renderTime = (index: number) => (
    <TimelineBox key={index}>
      <TimelineTime>{timeFormat(index)}</TimelineTime>
      <TimelineDividers>{renderDividers()}</TimelineDividers>
    </TimelineBox>
  );

  const renderDividers = () =>
    dividers.map((_, index) => <TimelineDivider key={index} />);

  return (
    <TimelineWrapper sidebarWidth={sidebarWidth} isSidebar={isSidebar}>
      {time.map((_, index) => renderTime(index))}
    </TimelineWrapper>
  );
}
