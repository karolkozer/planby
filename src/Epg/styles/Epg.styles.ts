import styled from "@emotion/styled/macro";
import { Theme } from "../helpers";

export const Container = styled.div<{
  height?: number;
  width?: number;
}>`
  padding: 5px;
  height: ${({ height }) => (height ? `${height}px` : "100%")};
  width: ${({ width }) => (width ? `${width}px` : "100%")};
`;

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
`;

export const ScrollBox = styled.div<{ theme?: Theme }>`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: auto;
  scroll-behavior: smooth;
  background: ${({ theme }) => theme.primary[900]};

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollbar.thumb.bg};
    border: 10px none ${({ theme }) => theme.white};
    border-radius: 20px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.white};
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.primary[900]};
    border: 22px none ${({ theme }) => theme.white};
    border-radius: 0px;
  }

  ::-webkit-scrollbar-corner {
    background: ${({ theme }) => theme.primary[900]};
  }
`;

export const Box = styled.div<{
  width: number;
  height: number;
  left?: number;
  top?: number;
  theme?: Theme;
}>`
  position: absolute;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  top: ${({ top = 0 }) => top}px;
  left: ${({ left = 0 }) => left}px;
  background: ${({ theme }) => theme.primary[900]};
  z-index: 900;
`;

export const Content = styled.div<{
  width: number;
  height: number;
  sidebarWidth: number;
  isSidebar: boolean;
  theme?: Theme;
}>`
  background: ${({ theme }) => theme.primary[900]};
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  position: relative;
  left: ${({ isSidebar, sidebarWidth }) => (isSidebar ? sidebarWidth : 0)}px;
`;
