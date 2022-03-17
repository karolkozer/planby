import React from "react";

// Import types
import {
  ProgramItem,
  ProgramWithPosition,
  ChannelWithPosiiton,
  DateTime,
  Position,
} from "../helpers/types";

// Import helpers
import { DAY_WIDTH, getProgramOptions } from "../helpers";

// Import styles
import { EpgStyled, TimelineStyled } from "../styles";

// Import components
import { Timeline, Channels, Program, Line } from "../components";

interface LayoutProps {
  programs: ProgramItem[];
  channels: ChannelWithPosiiton[];
  startDate: DateTime;
  scrollY: number;
  sidebarWidth: number;
  itemHeight: number;
  onScroll: (e: any) => void;
  isSidebar?: boolean;
  isTimeline?: boolean;
  isLine?: boolean;
  isProgramVisible: (position: Position) => boolean;
  isChannelVisible: (position: Pick<Position, "top">) => boolean;
  renderProgram?: (v: { program: ProgramItem }) => void;
  renderChannel?: (v: { channel: ChannelWithPosiiton }) => void;
  renderTimeline?: (v: { sidebarWidth: number }) => React.ReactNode;
}

const { ScrollBox, Content } = EpgStyled;
const { TimelineWrapper } = TimelineStyled;

export const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  (props, scrollBoxRef) => {
    const {
      channels,
      programs,
      startDate,
      scrollY,
      sidebarWidth,
      itemHeight,
    } = props;

    const { isSidebar = true, isTimeline = true, isLine = true } = props;

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

    const renderPrograms = (program: ProgramWithPosition) => {
      const { position } = program;

      const isVisible = isProgramVisible(position);
      if (isVisible) {
        const options = getProgramOptions(program);
        if (renderProgram)
          return renderProgram({
            program: options,
          });
        return <Program key={program.data.id} program={options} />;
      }
    };

    const renderTopbar = () => {
      const props = { sidebarWidth: sidebarWidth, isSidebar: isSidebar };
      if (renderTimeline) {
        <TimelineWrapper {...props}>
          {renderTimeline?.({ sidebarWidth })}
        </TimelineWrapper>;
      }
      return <Timeline {...props} />;
    };

    return (
      <ScrollBox ref={scrollBoxRef} onScroll={onScroll}>
        {isLine && (
          <Line
            sidebarWidth={sidebarWidth}
            startDate={startDate}
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
          sidebarWidth={sidebarWidth}
          isSidebar={isSidebar}
          width={DAY_WIDTH}
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
