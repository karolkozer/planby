import { ProgramStyled, ChannelStyled, TimelineStyled } from "./styles";

// Import types
import { Theme as ThemeType, Program as IProgram } from "./helpers/interfaces";
import {
  ProgramItem as ProgramItemType,
  ChannelWithPosition,
  BaseTimeFormat as BaseTimeFormatType,
} from "./helpers/types";

// Types
export type Theme = ThemeType;
export type Channel = ChannelWithPosition;
export type Program = IProgram;
export type ProgramItem = {
  program: ProgramItemType;
  isRTL: boolean;
  isBaseTimeFormat: BaseTimeFormatType;
};

// Components
export { Layout } from "./components";
export { Epg } from "./Epg";
export { useEpg, useProgram, useTimeline } from "./hooks";

// Styles
const { ChannelBox, ChannelLogo } = ChannelStyled;

const {
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramTitle,
  ProgramText,
  ProgramImage,
} = ProgramStyled;

const {
  TimelineWrapper,
  TimelineBox,
  TimelineTime,
  TimelineDivider,
  TimelineDividers,
} = TimelineStyled;

export {
  // Channel
  ChannelBox,
  ChannelLogo,
  // Program
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramTitle,
  ProgramText,
  ProgramImage,
  // Timeline
  TimelineWrapper,
  TimelineBox,
  TimelineTime,
  TimelineDividers,
  TimelineDivider,
};
