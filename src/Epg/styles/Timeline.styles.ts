import styled from "@emotion/styled/macro";
import { Theme } from "../helpers";

// Import heleprs
import { ITEM_HEIGHT } from "../helpers";

export const TimelineTime = styled.span<{ theme?: Theme }>`
  color: ${({ theme }) => theme.text.grey[300]};
  position: absolute;
  top: 18px;
  left: -18px;
`;

export const TimelineDividers = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: end;
  padding-bottom: 6px;
`;

export const TimelineDivider = styled.div<{ width: number; theme?: Theme }>`
  background: ${({ theme }) => theme.timeline.divider.bg};
  height: 10px;
  width: 1px;
  margin-right: ${({ width }) => width / 4}px;
`;

export const TimelineWrapper = styled.div<{
  isSidebar: boolean;
  dayWidth: number;
  sidebarWidth: number;
  theme?: Theme;
}>`
  position: sticky;
  top: 0;
  left: ${({ isSidebar, sidebarWidth }) => (isSidebar ? sidebarWidth : 0)}px;
  z-index: 100;
  display: flex;
  height: ${ITEM_HEIGHT - 20}px;
  width: ${({ dayWidth }) => dayWidth}px;
  background: ${({ theme }) => theme.primary[900]};
`;

export const TimelineBox = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
  font-size: 14px;
  position: relative;

  &:first-of-type {
    ${TimelineTime} {
      left: 0px;
    }
  }
`;
