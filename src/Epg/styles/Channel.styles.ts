import styled from "@emotion/styled/macro";
import { Theme } from "../helpers";

// Import heleprs
import { SIDEBAR_ITEM_HEIGHT } from "../helpers";

export const ChannelBox = styled.div<{ top: number; theme?: Theme }>`
  position: absolute;
  top: ${({ top }) => top}px;
  height: ${SIDEBAR_ITEM_HEIGHT}px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primary[900]};
`;

export const ChannelLogo = styled.img`
  max-height: 60px;
  max-width: 60px;
  position: relative;
`;
