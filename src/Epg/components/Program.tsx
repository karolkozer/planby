import * as React from "react";

// Import interfaces
import { Program as ProgramType } from "../helpers/interfaces";
import { BaseTimeFormat } from "../helpers/types";

// Import types
import { ProgramItem } from "../helpers/types";

// Import styles
import { ProgramStyled } from "../styles";

// Import hooks
import { useProgram } from "../hooks";

interface ProgramProps<T> {
  program: T;
  isBaseTimeFormat: BaseTimeFormat;
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
  isBaseTimeFormat,
  onClick,
  ...rest
}: ProgramProps<T>) {
  const {
    styles,
    formatTime,
    set12HoursTimeFormat,
    isLive,
    isMinWidth,
  } = useProgram({
    program,
    isBaseTimeFormat,
  });

  const { data } = program;
  const { image, title, since, till } = data;

  const handleOnContentClick = () => onClick?.(data);

  return (
    <ProgramBox
      data-testid="program-item"
      width={styles.width}
      style={styles.position}
    >
      <ProgramContent
        data-testid="program-content"
        width={styles.width}
        isLive={isLive}
        onClick={handleOnContentClick}
        {...rest}
      >
        <ProgramFlex>
          {isLive && isMinWidth && <ProgramImage src={image} alt="Preview" />}
          <ProgramStack>
            <ProgramTitle>{title}</ProgramTitle>
            <ProgramText aria-label="program time">
              {formatTime(since, set12HoursTimeFormat())} -{" "}
              {formatTime(till, set12HoursTimeFormat())}
            </ProgramText>
          </ProgramStack>
        </ProgramFlex>
      </ProgramContent>
    </ProgramBox>
  );
}
