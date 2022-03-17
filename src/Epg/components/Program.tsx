import * as React from "react";

// Import interfaces
import { Program as ProgramType } from "../helpers/interfaces";

// Import types
import { ProgramItem } from "../helpers/types";

// Import styles
import { ProgramStyled } from "../styles";

// Import hooks
import { useProgram } from "../hooks";

interface ProgramProps<T> {
  program: T;
  onClick?: (v: ProgramType) => void;
}

const {
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramTitle,
  ProgramText,
  ProgramImage,
} = ProgramStyled;

export function Program<T extends ProgramItem>({
  program,
  onClick,
  ...rest
}: ProgramProps<T>) {
  const { styles, formatTime, isLive, isMinWidth } = useProgram({ program });

  const { data } = program;
  const { image, title, since, till } = data;

  const handleOnContentClick = () => onClick?.(data);

  return (
    <ProgramBox width={styles.width} style={styles.position}>
      <ProgramContent
        width={styles.width}
        isLive={isLive}
        onClick={handleOnContentClick}
        {...rest}
      >
        <ProgramFlex>
          {isLive && isMinWidth && <ProgramImage src={image} alt="Preview" />}
          <ProgramStack>
            <ProgramTitle>{title}</ProgramTitle>
            <ProgramText>
              {formatTime(since)} - {formatTime(till)}
            </ProgramText>
          </ProgramStack>
        </ProgramFlex>
      </ProgramContent>
    </ProgramBox>
  );
}
