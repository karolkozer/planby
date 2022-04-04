import { differenceInMinutes, startOfDay, addDays, isEqual } from "date-fns";

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

// -------- Program width --------
const getItemDiffWidth = (diff: number, hourWidth: number) =>
  (diff * hourWidth) / HOUR_IN_MINUTES;

export const getPositionX = (
  since: DateTime,
  till: DateTime,
  startDate: DateTime,
  hourWidth: number
) => {
  const tomorrowDate = startOfDay(addDays(new Date(startDate), 1));
  const dateNow = startOfDay(new Date(till));
  const isTomorrow = isEqual(dateNow, tomorrowDate);
  const isYesterday = isYesterdayTime(since, startDate);

  if (isYesterday) {
    const diffTime = differenceInMinutes(
      roundToMinutes(till),
      startOfDay(new Date(startDate))
    );
    return getItemDiffWidth(diffTime, hourWidth);
  }

  if (isTomorrow) {
    const diffTime = differenceInMinutes(
      startOfDay(new Date(till)),
      roundToMinutes(since)
    );
    return getItemDiffWidth(diffTime, hourWidth);
  }

  const diffTime = differenceInMinutes(
    roundToMinutes(new Date(till)),
    roundToMinutes(new Date(since))
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
  startDate: DateTime
) => {
  const item = {
    ...program,
    since: formatTime(program.since),
    till: formatTime(program.till),
  };
  const isYesterday = isYesterdayTime(item.since, startDate);

  const width = getPositionX(item.since, item.till, startDate, hourWidth);
  const top = itemHeight * channelIndex;
  let left = getPositionX(startDate, item.since, startDate, hourWidth);
  const edgeEnd = getPositionX(startDate, item.till, startDate, hourWidth);

  if (isYesterday) left = 0;

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
type ConvertedProgramsType = {
  data: Program[];
  channels: Channel[];
  startDate: DateTime;
  itemHeight: number;
  hourWidth: number;
};
export const getConvertedPrograms = ({
  data,
  channels,
  startDate,
  itemHeight,
  hourWidth,
}: ConvertedProgramsType) =>
  data.map((next) => {
    const channelIndex = channels.findIndex(
      ({ uuid }) => uuid === next.channelUuid
    );
    return getProgramPosition(
      next,
      channelIndex,
      itemHeight,
      hourWidth,
      startDate
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
  position: Position,
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
