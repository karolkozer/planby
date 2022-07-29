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
  isRTL?: boolean;
  isBaseTimeFormat: BaseTimeFormat;
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
  const {
    isRTL,
    isLive,
    isMinWidth,
    styles,
    formatTime,
    set12HoursTimeFormat,
    getRTLSinceTime,
    getRTLTillTime,
  } = useProgram({
    program,
    ...rest,
  });

  const { data } = program;
  const { image, title, since, till } = data;

  const handleOnContentClick = () => onClick?.(data);

  const sinceTime = formatTime(
    getRTLSinceTime(since),
    set12HoursTimeFormat()
  ).toLowerCase();
  const tillTime = formatTime(
    getRTLTillTime(till),
    set12HoursTimeFormat()
  ).toLowerCase();

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
          <ProgramStack isRTL={isRTL}>
            <ProgramTitle>{title}</ProgramTitle>
            <ProgramText aria-label="program time">
              {sinceTime} - {tillTime}
            </ProgramText>
          </ProgramStack>
        </ProgramFlex>
      </ProgramContent>
    </ProgramBox>
  );
}
