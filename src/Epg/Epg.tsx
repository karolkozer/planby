import React from "react";
import { ThemeProvider, Global } from "@emotion/react";

// Import interfaces
import { Theme } from "./helpers/interfaces";

// Import helpers
import { TIMELINE_HEIGHT } from "./helpers";

// Import styles
import { globalStyles, EpgStyled } from "./styles";

// Import components
import { Loader } from "./components";

interface EpgProps {
  width?: number;
  height?: number;
  isRTL?: boolean;
  isSidebar: boolean;
  isTimeline?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  loader?: React.ReactNode;
  theme: Theme;
  sidebarWidth: number;
}

const { Container, Wrapper, Box } = EpgStyled;

export const Epg = React.forwardRef<HTMLDivElement, EpgProps>(
  (
    {
      children,
      width,
      height,
      theme,
      sidebarWidth,
      isRTL = false,
      isSidebar = true,
      isTimeline = true,
      isLoading = false,
      loader: LoaderComponent,
      ...rest
    },
    containerRef
  ) => {
    const renderLoader = () => LoaderComponent ?? <Loader />;
    return (
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Container
          data-testid="container"
          width={width}
          height={height}
          ref={containerRef}
          {...rest}
        >
          <Wrapper>
            {isSidebar && isTimeline && (
              <Box
                isRTL={isRTL}
                width={sidebarWidth}
                height={TIMELINE_HEIGHT}
                left={0}
                top={0}
              />
            )}
            {isLoading && renderLoader()}
            {children}
          </Wrapper>
        </Container>
      </ThemeProvider>
    );
  }
);
