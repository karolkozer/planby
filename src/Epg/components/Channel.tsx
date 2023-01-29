import * as React from "react";

// Import interfaces
import { ChannelWithPosition } from "../helpers/types";

// Import styles
import { ChannelStyled } from "../styles";

interface ChannelProps<T> {
  channel: T;
  onClick?: (v: ChannelWithPosition) => void;
}

const { ChannelBox, ChannelLogo } = ChannelStyled;

export function Channel<T extends ChannelWithPosition>({
  channel,
  onClick,
  ...rest
}: ChannelProps<T>) {
  const { position, logo } = channel;
  return (
    <ChannelBox
      data-testid="sidebar-item"
      onClick={() => onClick?.(channel)}
      {...position}
      {...rest}
    >
      <ChannelLogo src={logo} alt="Logo" />
    </ChannelBox>
  );
}
