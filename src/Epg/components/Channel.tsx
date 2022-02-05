import * as React from "react";
// Import interfaces
import { Channel as ChannelType } from "../helpers/interfaces";

// Import interfaces
import { ChannelWithPosiiton } from "../helpers/types";

// Import styles
import { ChannelStyled } from "../styles";

interface ChannelProps<T> {
  channel: T;
  onClick?: (v: ChannelType) => void;
}

const { ChannelBox, ChannelLogo } = ChannelStyled;

export function Channel<T extends ChannelWithPosiiton>({
  channel,
  onClick,
  ...rest
}: ChannelProps<T>) {
  const {
    position: { top },
    logo,
  } = channel;
  return (
    <ChannelBox onClick={() => onClick?.(channel)} {...rest} top={top}>
      <ChannelLogo src={logo} alt="Logo" />
    </ChannelBox>
  );
}
