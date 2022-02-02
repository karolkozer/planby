import styled from '@emotion/styled/macro';
import { Theme } from '../helpers';

export const Wrapper = styled.div<{ width: number }>`
  position: absolute;
  padding: ${({ width }) => (width === 0 ? 0 : 4)}px;
  overflow: hidden;
`;

export const Content = styled.div<{ isLive: boolean; theme?: Theme }>`
  position: relative;
  display: flex;
  font-size: 11px;
  height: 100%;
  border-radius: 8px;
  padding: 10px 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  z-index: 1;
  background: ${({ theme: { primary } }) =>
    `linear-gradient(to right, ${primary[600]}, ${primary[600]})`};
  &:hover {
    background: ${({ theme: { gradient } }) =>
      `linear-gradient(to right, ${gradient.blue[900]}, ${gradient.blue[600]})`};
  }

  ${({ isLive, theme: { gradient } }) =>
    isLive &&
    `background: linear-gradient(to right, ${gradient.blue[900]}, ${gradient.blue[600]},${gradient.blue[300]})`}
`;

export const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const Elipsis = `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Title = styled.p<{ theme?: Theme }>`
  font-size: 15px;
  font-weight: 400;
  text-align: left;
  margin-top: 0;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.white};
  ${Elipsis}
`;

export const Time = styled.span<{ theme?: Theme }>`
  display: block;
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.text.grey[500]};
  text-align: left;
  ${Elipsis}
`;

export const Image = styled.img`
  margin-right: 15px;
  border-radius: 6px;
  width: 100px;
`;
