import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider, Global } from "@emotion/react";
import userEvent from "@testing-library/user-event";

// Import theme
import { theme } from "../theme";

// Import styles
import { globalStyles } from "../styles";

interface AllTheProvidersProps {
  children: React.ReactNode;
}
const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      {children}
    </ThemeProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders as React.FC, ...options });

export * from "@testing-library/react";
export { customRender as render, userEvent };
