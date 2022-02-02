import React from "react";
import { ThemeProvider, Global } from "@emotion/react";

// Import interfaces
import { Theme } from "./helpers/interfaces";

// Import helpers
import { TIMELINE_HEIGHT } from "./helpers";

// Import styles
import { globalStyles, EpgStyled } from "./styles";

interface EpgProps {
  width?: number;
  height?: number;
  isSidebar: boolean;
  children: React.ReactNode;
  theme: Theme;
  sidebarWidth: number;
}

const { Container, Wrapper, Box } = EpgStyled;

export const Epg = React.forwardRef<HTMLDivElement, EpgProps>(
  (
    { children, width, height, theme, sidebarWidth, isSidebar = true, ...rest },
    containerRef
  ) => {
    return (
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Container width={width} height={height} ref={containerRef} {...rest}>
          <Wrapper>
            {isSidebar && (
              <Box
                width={sidebarWidth}
                height={TIMELINE_HEIGHT}
                left={0}
                top={0}
              />
            )}
            {children}
          </Wrapper>
        </Container>
      </ThemeProvider>
    );
  }
);
