import styled from "@emotion/styled/macro";
import { keyframes } from "@emotion/react";
import { Theme } from "../helpers";

const time = [0, 50, 0];

const moveLeft = (animate: { right: string[] }) => keyframes`
${time.map(
  (item, index) => `${item}% {
  transform: translateX(-${animate.right[index]});
}`
)}
`;

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

export const Shape = styled.div<{
  width: number;
  color: string;
  marginRight?: number;
  transition: { duration: number; ease?: string; delay?: number };
  animate: { right: string[] };
  theme?: Theme;
}>`
  width: ${({ width }) => width * 0.42}px;
  background: ${({ color }) => color};
  height: 18px;
  border-radius: 45px;
  margin-right: ${({ marginRight }) => marginRight ?? 0}px;
  animation-name: ${({ animate }) => moveLeft(animate)};
  animation-duration: ${({ transition }) => transition.duration}s;
  animation-timing-function: ${({ transition }) =>
    transition.ease ?? "ease-in-out"};
  animation-delay: ${({ transition }) => transition.delay ?? 0}s;
  animation-iteration-count: infinite;
`;
