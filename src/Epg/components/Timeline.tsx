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
  dayWidth: number;
  hourWidth: number;
  sidebarWidth: number;
}

export function Timeline({
  isSidebar,
  dayWidth,
  hourWidth,
  sidebarWidth,
}: TimelineProps) {
  const { time, dividers } = useTimeline();
  const timeFormat = (index: number) =>
    `${index < 10 ? `0${index}` : index}:00`;

  const renderTime = (index: number) => (
    <TimelineBox data-testid="timeline-item" key={index} width={hourWidth}>
      <TimelineTime>{timeFormat(index)}</TimelineTime>
      <TimelineDividers>{renderDividers()}</TimelineDividers>
    </TimelineBox>
  );

  const renderDividers = () =>
    dividers.map((_, index) => (
      <TimelineDivider key={index} width={hourWidth} />
    ));

  return (
    <TimelineWrapper
      data-testid="timeline"
      dayWidth={dayWidth}
      sidebarWidth={sidebarWidth}
      isSidebar={isSidebar}
    >
      {time.map((_, index) => renderTime(index))}
    </TimelineWrapper>
  );
}
