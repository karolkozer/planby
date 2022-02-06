import * as React from "react";
import { motion } from "framer-motion";

// Import styles
import { LoaderStyled } from "../styles";

const { Box } = LoaderStyled;

const Element = ({
  width,
  color,
  animate,
  transition,
  ...res
}: {
  width: number;
  color: string;
  animate?: any;
  transition?: any;
  [key: string]: any;
}) => (
  <motion.div
    style={{
      width: width * 0.5,
      background: color,
      height: "22px",
      borderRadius: "45px",
      ...res,
    }}
    animate={animate}
    transition={transition}
  />
);

export function Loader() {
  return (
    <Box>
      <div>
        <motion.div
          style={{ display: "flex", justifyContent: "end", marginBottom: 16 }}
        >
          <Element
            animate={{
              position: "relative",
              right: ["0px", "75px", "0px"],
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            width={217}
            color="#5DDADB"
            marginRight={10}
          />
          <Element
            width={122}
            color="#3437A2"
            animate={{
              position: "relative",
              right: ["0px", "50px", "0px"],
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 0.02,
            }}
          />
        </motion.div>
        <motion.div
          transition={{
            delay: 2,
          }}
          style={{ display: "flex", justifyContent: "end", marginBottom: 16 }}
        >
          <Element
            width={267}
            color="#F78EB6"
            animate={{
              position: "relative",
              right: ["0px", "70px", "0px"],
            }}
            transition={{
              delay: 0.5,
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </motion.div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Element
            width={217}
            color="#3437A2"
            marginRight={10}
            animate={{
              position: "relative",
              right: ["0px", "95px", "0px"],
            }}
            transition={{
              delay: 0.3,
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
          <Element
            width={82}
            color="#5DDADB"
            animate={{
              position: "relative",
              right: ["0px", "68px", "0px"],
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 0.33,
            }}
          />
        </div>
      </div>
    </Box>
  );
}
