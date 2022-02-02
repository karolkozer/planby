import styled from "@emotion/styled/macro";
import { Theme } from "../helpers";

export const Box = styled.div<{
  width: number;
  isTimeline: boolean;
  bottom: number;
  theme?: Theme;
}>`
  position: sticky;
  width: ${({ width }) => width}px;
  float: left;
  bottom: ${({ bottom }) => bottom}px;
  left: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.primary[900]};
`;
