import * as React from 'react';
// Import interfaces
import { ChannelWithPosiiton } from '../helpers/types';

// Import styles
import { ChannelsStyled } from '../styles';

// Import Components
import { Channel } from '../components';

interface ChannelsProps {
  channels: ChannelWithPosiiton[];
  scrollY: number;
  sidebarWidth: number;
  isTimeline: boolean;
  isChannelVisible: (position: any) => boolean;
  renderChannel?: (v: { channel: ChannelWithPosiiton }) => React.ReactNode;
}

const { Box } = ChannelsStyled;

export function Channels(props: ChannelsProps) {
  const { channels, scrollY, sidebarWidth, renderChannel } = props;
  const { isTimeline, isChannelVisible } = props;

  const renderChannels = (channel: ChannelWithPosiiton) => {
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
      width={sidebarWidth}
      isTimeline={isTimeline}
      bottom={scrollY}
    >
      {channels.map(renderChannels)}
    </Box>
  );
}
