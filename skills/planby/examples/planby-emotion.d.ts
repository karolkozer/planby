// Planby styles itself with emotion and provides your `theme` through emotion's
// ThemeProvider — but the package does NOT ship the module augmentation that
// tells TypeScript what that theme looks like.
//
// Add this file once in your own app to get typed `({ theme }) => theme.…`
// access inside styled() components. Without it, emotion's Theme is `{}` and
// every theme lookup is a type error.
import "@emotion/react";
import type { Theme as PlanbyTheme } from "planby";

declare module "@emotion/react" {
  export interface Theme extends PlanbyTheme {}
}
