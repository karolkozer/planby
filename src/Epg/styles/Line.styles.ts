import styled from "@emotion/styled/macro";
import { Layers, Theme } from "../helpers";

export const Box = styled.div<{ height: number; left: number; theme?: Theme }>`
  position: absolute;
  top: 64px;
  left: ${({ left }) => left}px;
  height: ${({ height }) => height}px;
  width: 3px;
  background: ${({ theme }) => theme.green[300]};
  pointer-events: none;
  z-index: ${Layers.Line};
`;
