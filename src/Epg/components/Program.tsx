import * as React from "react";
import { format } from "date-fns";

// Import interfaces
import { Program as ProgramType } from "../helpers/interfaces";

// Import types
import { ProgramData } from "../helpers/types";

// Import helpers
import { TIME_FORMAT, getLiveStatus } from "../helpers";

// Import styles
import { ProgramStyled } from "../styles";

interface ProgramProps<T> {
  program: T;
  onClick?: (v: ProgramType) => void;
}

const { Wrapper, Content, Box, Title, Time, Image } = ProgramStyled;

export function Program<T extends ProgramData>({
  program,
  onClick,
  ...rest
}: ProgramProps<T>) {
  const { data, position } = program;
  const { width } = position;

  const { title, image, since, till } = data;

  const formatTime = (date: string | number | Date) =>
    format(new Date(date), TIME_FORMAT.HOURS_MIN);

  const isLive = getLiveStatus(since, till);
  const isMinWidth = width > 200;

  return (
    <Wrapper width={width} style={position}>
      <Content onClick={() => onClick?.(data)} {...rest} isLive={isLive}>
        <Box>
          {isLive && isMinWidth && <Image src={image} alt="Preview" />}
          <div
            style={{
              width: "100%",
            }}
          >
            <Title>{title}</Title>
            <Time>
              {formatTime(since)} - {formatTime(till)}
            </Time>
          </div>
        </Box>
      </Content>
    </Wrapper>
  );
}
