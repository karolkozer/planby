import {format, roundToNearestMinutes, startOfDay, addDays, parseISO} from "date-fns";

// Import types
import { DateTime as DateRangeTime } from "./types";

// Variables
import { TIME_FORMAT } from "./variables";

type DateTime = number | string | Date;

const getTime = (date: Date) => date.getTime();

export const parseDateTime = (date: DateTime) => {
  if (date instanceof Date) {
    return date
  }

  if (typeof date === "string") {
    return parseISO(date)
  }

  return new Date(date)
}

export const getLiveStatus = (since: DateTime, till: DateTime) => {
  const nowTime = getTime(new Date());
  const sinceTime = getTime(parseDateTime(since));
  const sinceTill = getTime(parseDateTime(till));
  return nowTime >= sinceTime && sinceTill > nowTime;
};

export const formatTime = (date: DateTime) =>
  format(parseDateTime(date), TIME_FORMAT.DEFAULT).replace(/\s/g, "T");

export const roundToMinutes = (date: DateTime) =>
  roundToNearestMinutes(parseDateTime(date));

export const isYesterday = (since: DateTime, startDate: DateTime) => {
  const sinceTime = getTime(parseDateTime(since));
  const startDateTime = getTime(parseDateTime(startDate));

  return startDateTime > sinceTime;
};

export const isFutureTime = (date: DateTime) => {
  const dateTime = getTime(parseDateTime(date));
  const now = getTime(new Date());
  return dateTime > now;
};

export const getTimeRangeDates = (
  startDate: DateRangeTime,
  endDate: DateRangeTime
) => {
  let endDateValue = endDate;
  if (endDate === "") {
    endDateValue = formatTime(startOfDay(addDays(parseDateTime(startDate), 1)));
  }

  return { startDate, endDate: endDateValue };
};
