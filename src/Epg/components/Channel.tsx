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

const { Box, Logo } = ChannelStyled;

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
    <Box onClick={() => onClick?.(channel)} {...rest} top={top}>
      <Logo src={logo} alt="Logo" />
    </Box>
  );
}
