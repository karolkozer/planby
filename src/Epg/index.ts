import { ProgramStyled, ChannelStyled } from "./styles";

// Import types
import { Theme as ThemeType } from "./helpers/interfaces";
import {
  ProgramItem as ProgramItemType,
  ChannelWithPosiiton,
} from "./helpers/types";

// Types
export type Theme = ThemeType;
export type Channel = ChannelWithPosiiton;
export type Program = ProgramItemType;

// Components
export { Layout } from "./components";
export { Epg } from "./Epg";
export { useEpg, useProgram } from "./hooks";

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

export {
  ChannelBox,
  ChannelLogo,
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramTitle,
  ProgramText,
  ProgramImage,
};
