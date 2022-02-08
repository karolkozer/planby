import * as React from "react";
import { theme } from "../theme/theme";

// Import styles
import { LoaderStyled } from "../styles";

const { Box, Shape } = LoaderStyled;

const Element = ({
  width,
  color,
  animate,
  marginRight,
  transition,
}: {
  width: number;
  color: string;
  transition: { duration: number; ease?: string; delay?: number };
  animate: { right: string[] };
  marginRight?: number;
}) => (
  <Shape
    className="SHAPE"
    width={width}
    color={color}
    animate={animate}
    transition={transition}
    marginRight={marginRight}
  />
);

export function Loader() {
  return (
    <Box>
      <div>
        <div
          style={{ display: "flex", justifyContent: "end", marginBottom: 16 }}
        >
          <Element
            animate={{
              right: ["0px", "75px", "0px"],
            }}
            transition={{
              duration: 1,
            }}
            width={217}
            color={theme.loader.teal}
            marginRight={10}
          />
          <Element
            width={122}
            color={theme.loader.purple}
            animate={{
              right: ["0px", "50px", "0px"],
            }}
            transition={{
              duration: 1,
              delay: 0.02,
            }}
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "end", marginBottom: 16 }}
        >
          <Element
            width={267}
            color={theme.loader.pink}
            animate={{
              right: ["0px", "70px", "0px"],
            }}
            transition={{
              delay: 0.5,
              duration: 1,
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Element
            width={217}
            color={theme.loader.purple}
            marginRight={10}
            animate={{
              right: ["0px", "95px", "0px"],
            }}
            transition={{
              delay: 0.3,
              duration: 1,
            }}
          />
          <Element
            width={80}
            color={theme.loader.teal}
            animate={{
              right: ["0px", "70px", "0px"],
            }}
            transition={{
              duration: 1,
              delay: 0.33,
            }}
          />
        </div>
      </div>
    </Box>
  );
}
