import React from "react";

// Import types
import {
  ProgramData,
  ProgramWithPosition,
  ChannelWithPosiiton,
  DateTime,
  Position,
} from "../helpers/types";

// Import helpers
import { DAY_WIDTH, SIDEBAR_ITEM_HEIGHT, getProgramOptions } from "../helpers";

// Import styles
import { EpgStyled } from "../styles";

// Import components
import { Timeline, Channels, Program, Line } from "../components";

interface LayoutProps {
  programs: ProgramData[];
  channels: ChannelWithPosiiton[];
  startDate: DateTime;
  scrollY: number;
  sidebarWidth: number;
  onScroll: (e: any) => void;
  isSidebar?: boolean;
  isTimeline?: boolean;
  isLine?: boolean;
  isProgramVisible: (position: Position) => boolean;
  isChannelVisible: (position: Pick<Position, "top">) => boolean;
  renderProgram?: (v: { program: ProgramData }) => void;
  renderChannel?: (v: { channel: ChannelWithPosiiton }) => void;
}

const { ScrollBox, Content } = EpgStyled;

export const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  (props, scrollBoxRef) => {
    const { channels, programs, startDate, scrollY, sidebarWidth } = props;

    const { isSidebar = true, isTimeline = true, isLine = true } = props;

    const {
      onScroll,
      isProgramVisible,
      isChannelVisible,
      renderProgram,
      renderChannel,
    } = props;

    const channelsLength = channels.length;
    const contentHeight = React.useMemo(
      () => channelsLength * SIDEBAR_ITEM_HEIGHT,
      [channelsLength]
    );

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

    return (
      <ScrollBox ref={scrollBoxRef} onScroll={onScroll}>
        {isLine && <Line startDate={startDate} height={contentHeight} />}
        {isTimeline && (
          <Timeline sidebarWidth={sidebarWidth} isSidebar={isSidebar} />
        )}
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
