import "@emotion/react";
import { Theme as CustomTheme } from "../helpers/interfaces";

declare module "@emotion/react" {
  export interface Theme extends CustomTheme {}
}
