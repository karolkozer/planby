import React from "react";

// Import types
import {
  ProgramItem,
  ProgramWithPosition,
  ChannelWithPosiiton,
  DateTime,
  Position,
  BaseTimeFormat,
} from "../helpers/types";

// Import helpers
import { getProgramOptions, isFutureTime } from "../helpers";

// Import styles
import { EpgStyled, TimelineStyled } from "../styles";

// Import components
import { Timeline, Channels, Program, Line } from "../components";

interface RenderTimeline {
  sidebarWidth: number;
  hourWidth: number;
  numberOfHoursInDay: number;
  offsetStartHoursRange: number;
  isBaseTimeFormat: BaseTimeFormat;
}

interface LayoutProps {
  programs: ProgramItem[];
  channels: ChannelWithPosiiton[];
  startDate: DateTime;
  endDate: DateTime;
  scrollY: number;
  dayWidth: number;
  hourWidth: number;
  numberOfHoursInDay: number;
  offsetStartHoursRange: number;
  sidebarWidth: number;
  itemHeight: number;
  onScroll: (e: any) => void;
  isBaseTimeFormat?: BaseTimeFormat;
  isSidebar?: boolean;
  isTimeline?: boolean;
  isLine?: boolean;
  isProgramVisible: (position: Position) => boolean;
  isChannelVisible: (position: Pick<Position, "top">) => boolean;
  renderProgram?: (v: {
    program: ProgramItem;
    isBaseTimeFormat: BaseTimeFormat;
  }) => void;
  renderChannel?: (v: { channel: ChannelWithPosiiton }) => void;
  renderTimeline?: (v: RenderTimeline) => React.ReactNode;
}

const { ScrollBox, Content } = EpgStyled;
const { TimelineWrapper } = TimelineStyled;

export const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  (props, scrollBoxRef) => {
    const { channels, programs, startDate, endDate, scrollY } = props;
    const { dayWidth, hourWidth, sidebarWidth, itemHeight } = props;
    const { numberOfHoursInDay, offsetStartHoursRange } = props;
    const {
      isSidebar = true,
      isTimeline = true,
      isLine = true,
      isBaseTimeFormat = false,
    } = props;

    const {
      onScroll,
      isProgramVisible,
      isChannelVisible,
      renderProgram,
      renderChannel,
      renderTimeline,
    } = props;

    const channelsLength = channels.length;
    const contentHeight = React.useMemo(() => channelsLength * itemHeight, [
      channelsLength,
      itemHeight,
    ]);
    const isFuture = isFutureTime(endDate);

    const renderPrograms = (program: ProgramWithPosition) => {
      const { position } = program;
      const isVisible = isProgramVisible(position);

      if (isVisible) {
        const options = getProgramOptions(program);
        if (renderProgram)
          return renderProgram({
            program: options,
            isBaseTimeFormat,
          });
        return (
          <Program
            key={program.data.id}
            isBaseTimeFormat={isBaseTimeFormat}
            program={options}
          />
        );
      }
    };

    const renderTopbar = () => {
      const props = {
        dayWidth,
        sidebarWidth: sidebarWidth,
        isSidebar: isSidebar,
        numberOfHoursInDay,
      };
      const timeProps = {
        offsetStartHoursRange,
        numberOfHoursInDay,
        isBaseTimeFormat,
        hourWidth,
      };
      if (renderTimeline) {
        <TimelineWrapper {...props}>
          {renderTimeline?.({ sidebarWidth, ...timeProps })}
        </TimelineWrapper>;
      }
      return <Timeline {...timeProps} {...props} />;
    };

    return (
      <ScrollBox ref={scrollBoxRef} onScroll={onScroll}>
        {isLine && isFuture && (
          <Line
            dayWidth={dayWidth}
            hourWidth={hourWidth}
            sidebarWidth={sidebarWidth}
            startDate={startDate}
            endDate={endDate}
            height={contentHeight}
          />
        )}
        {isTimeline && renderTopbar()}
        {isSidebar && (
          <Channels
            sidebarWidth={sidebarWidth}
            isTimeline={isTimeline}
            isChannelVisible={isChannelVisible}
            channels={channels as ChannelWithPosiiton[]}
            scrollY={scrollY}
            renderChannel={renderChannel}
          />
        )}
        <Content
          data-testid="content"
          sidebarWidth={sidebarWidth}
          isSidebar={isSidebar}
          width={dayWidth}
          height={contentHeight}
        >
          {programs.map((program) =>
            renderPrograms(program as ProgramWithPosition)
          )}
        </Content>
      </ScrollBox>
    );
  }
);
