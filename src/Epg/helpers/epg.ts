import { differenceInMinutes, getTime } from "date-fns";

// Import interfaces
import { Channel, Program } from "./interfaces";

// Import types
import { ProgramWithPosition, Position, DateTime } from "./types";

// Import variables
import { HOUR_IN_MINUTES } from "./variables";

// Import time heleprs
import {
  formatTime,
  roundToMinutes,
  isYesterday as isYesterdayTime,
} from "./time";
import { getDate } from "./common";

// -------- Program width --------
const getItemDiffWidth = (diff: number, hourWidth: number) =>
  (diff * hourWidth) / HOUR_IN_MINUTES;

export const getPositionX = (
  since: DateTime,
  till: DateTime,
  startDate: DateTime,
  endDate: DateTime,
  hourWidth: number
) => {
  const isTomorrow = getTime(getDate(till)) > getTime(getDate(endDate));
  const isYesterday = getTime(getDate(since)) < getTime(getDate(startDate));

  // When time range is set to 1 hour and program time is greater than 1 hour
  if (isYesterday && isTomorrow) {
    const diffTime = differenceInMinutes(
      roundToMinutes(getDate(endDate)),
      getDate(startDate)
    );
    return getItemDiffWidth(diffTime, hourWidth);
  }

  if (isYesterday) {
    const diffTime = differenceInMinutes(
      roundToMinutes(getDate(till)),
      getDate(startDate)
    );
    return getItemDiffWidth(diffTime, hourWidth);
  }

  if (isTomorrow) {
    const diffTime = differenceInMinutes(
      getDate(endDate),
      roundToMinutes(getDate(since))
    );

    if (diffTime < 0) return 0;
    return getItemDiffWidth(diffTime, hourWidth);
  }

  const diffTime = differenceInMinutes(
    roundToMinutes(getDate(till)),
    roundToMinutes(getDate(since))
  );

  return getItemDiffWidth(diffTime, hourWidth);
};

// -------- Channel position in the Epg --------
export const getChannelPosition = (
  channelIndex: number,
  itemHeight: number
) => {
  const top = itemHeight * channelIndex;
  const position = {
    top,
    height: itemHeight,
  };
  return position;
};
// -------- Program position in the Epg --------
export const getProgramPosition = (
  program: Program,
  channelIndex: number,
  itemHeight: number,
  hourWidth: number,
  startDate: DateTime,
  endDate: DateTime
) => {
  const item = {
    ...program,
    since: formatTime(program.since),
    till: formatTime(program.till),
  };
  const isYesterday = isYesterdayTime(item.since, startDate);

  let width = getPositionX(
    item.since,
    item.till,
    startDate,
    endDate,
    hourWidth
  );
  const top = itemHeight * channelIndex;
  let left = getPositionX(startDate, item.since, startDate, endDate, hourWidth);
  const edgeEnd = getPositionX(
    startDate,
    item.till,
    startDate,
    endDate,
    hourWidth
  );

  if (isYesterday) left = 0;
  // If item has negative top position, it means that it is not visible in this day
  if (top < 0) width = 0;

  const position = {
    width,
    height: itemHeight,
    top,
    left,
    edgeEnd,
  };
  return { position, data: item };
};

// -------- Converted programs with position data --------
interface ConvertedPrograms {
  data: Program[];
  channels: Channel[];
  startDate: DateTime;
  endDate: DateTime;
  itemHeight: number;
  hourWidth: number;
}
export const getConvertedPrograms = ({
  data,
  channels,
  startDate,
  endDate,
  itemHeight,
  hourWidth,
}: ConvertedPrograms) =>
  data.map((next) => {
    const channelIndex = channels.findIndex(
      ({ uuid }) => uuid === next.channelUuid
    );
    return getProgramPosition(
      next,
      channelIndex,
      itemHeight,
      hourWidth,
      startDate,
      endDate
    );
  }, [] as ProgramWithPosition[]);

// -------- Converted channels with position data --------
export const getConvertedChannels = (channels: Channel[], itemHeight: number) =>
  channels.map((channel, index) => ({
    ...channel,
    position: getChannelPosition(index, itemHeight),
  }));

// -------- Dynamic virtual program visibility in the EPG --------
export const getItemVisibility = (
  position: Position,
  scrollY: number,
  scrollX: number,
  containerHeight: number,
  containerWidth: number,
  itemOverscan: number
) => {
  if (position.width <= 0) {
    return false;
  }

  if (scrollY > position.top + itemOverscan * 3) {
    return false;
  }

  if (scrollY + containerHeight <= position.top) {
    return false;
  }

  if (
    scrollX + containerWidth >= position.left &&
    scrollX <= position.edgeEnd
  ) {
    return true;
  }

  return false;
};

export const getSidebarItemVisibility = (
  position: Pick<Position, "top">,
  scrollY: number,
  containerHeight: number,
  itemOverscan: number
) => {
  if (scrollY > position.top + itemOverscan * 3) {
    return false;
  }

  if (scrollY + containerHeight <= position.top) {
    return false;
  }

  return true;
};
