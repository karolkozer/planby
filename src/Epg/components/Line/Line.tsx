import * as React from 'react';
import { isToday } from 'date-fns';

// Import types
import { DateTime } from '../../helpers/types';

// Import styles
import { LineStyled } from '../../styles';

// Import components
import { useLine } from './useLine';

interface LineProps {
  height: number;
  startDate: DateTime;
}

const { Box } = LineStyled;

export function Line({ height, startDate }: LineProps) {
  const { positionX } = useLine({ startDate });
  if (!isToday(new Date(startDate))) return null;
  return <Box height={height} left={positionX} />;
}
