import styled from "@emotion/styled/macro";
import { Theme } from "../helpers";

// Import heleprs
import { SIDEBAR_ITEM_HEIGHT, DAY_WIDTH, HOUR_WIDTH } from "../helpers";

export const Time = styled.div<{ theme?: Theme }>`
  color: ${({ theme }) => theme.text.grey[300]};
  position: absolute;
  top: 18px;
  left: -18px;
`;

export const Dividers = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: end;
  padding-bottom: 6px;
`;

export const Divider = styled.div<{ theme?: Theme }>`
  background: ${({ theme }) => theme.timeline.divider.bg};
  height: 10px;
  width: 1px;
  margin-right: ${HOUR_WIDTH / 4}px;
`;

export const Wrapper = styled.div<{
  isSidebar: boolean;
  sidebarWidth: number;
  theme?: Theme;
}>`
  position: sticky;
  top: 0;
  left: ${({ isSidebar, sidebarWidth }) => (isSidebar ? sidebarWidth : 0)}px;
  z-index: 100;
  display: flex;
  height: ${SIDEBAR_ITEM_HEIGHT - 20}px;
  width: ${DAY_WIDTH}px;
  background: ${({ theme }) => theme.primary[900]};
`;

export const Box = styled.div`
  width: ${HOUR_WIDTH}px;
  font-size: 14px;
  position: relative;

  &:first-child {
    ${Time} {
      left: 0px;
    }
  }
`;
