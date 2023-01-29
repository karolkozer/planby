import styled from "@emotion/styled/macro";
import { Layers, Theme } from "../helpers";

export const Box = styled.div<{
  isTimeline: boolean;
  isRTL: boolean;
  width: number;
  bottom: number;
  theme?: Theme;
}>`
  position: sticky;
  width: ${({ width }) => width}px;
  float: left;
  bottom: ${({ bottom }) => bottom}px;
  left: 0;
  z-index: ${Layers.Sidebar};
  background-color: ${({ theme }) => theme.primary[900]};

  ${({ isRTL }) => isRTL && `transform: scale(-1,1)`};
`;
