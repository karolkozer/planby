import styled from "@emotion/styled/macro";
import { Theme } from "../helpers";

export const Box = styled.div<{ theme?: Theme }>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: ${({ theme }) => theme.loader.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
