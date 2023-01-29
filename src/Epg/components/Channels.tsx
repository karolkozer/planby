import * as React from "react";
// Import interfaces
import { ChannelWithPosition } from "../helpers/types";

// Import styles
import { ChannelsStyled } from "../styles";

// Import Components
import { Channel } from "../components";

interface ChannelsProps {
  isTimeline: boolean;
  isRTL: boolean;
  isChannelVisible: (position: any) => boolean;
  channels: ChannelWithPosition[];
  scrollY: number;
  sidebarWidth: number;
  renderChannel?: (v: { channel: ChannelWithPosition }) => React.ReactNode;
}

const { Box } = ChannelsStyled;

export function Channels(props: ChannelsProps) {
  const { channels, scrollY, sidebarWidth, renderChannel } = props;
  const { isRTL, isTimeline, isChannelVisible } = props;

  const renderChannels = (channel: ChannelWithPosition) => {
    const isVisible = isChannelVisible(channel.position);
    if (isVisible) {
      if (renderChannel) return renderChannel({ channel });
      return <Channel key={channel.uuid} channel={channel} />;
    }
    return null;
  };

  return (
    <Box
      data-testid="sidebar"
      isRTL={isRTL}
      isTimeline={isTimeline}
      width={sidebarWidth}
      bottom={scrollY}
    >
      {channels.map(renderChannels)}
    </Box>
  );
}
