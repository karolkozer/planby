import {format, roundToNearestMinutes, startOfDay, addDays, parseISO} from "date-fns";

// Import types
import { DateTime as DateRangeTime } from "./types";

// Variables
import { TIME_FORMAT } from "./variables";

type DateTime = number | string | Date;

const getTime = (date: Date) => date.getTime();

export const parse = (date: DateTime) => {
  if (typeof date === "string") {
    return parseISO(date)
  }

  if (typeof date === "number") {
    return new Date(date)
  }

  return date
}

export const getLiveStatus = (since: DateTime, till: DateTime) => {
  const nowTime = getTime(new Date());
  const sinceTime = getTime(parse(since));
  const sinceTill = getTime(parse(till));
  return nowTime >= sinceTime && sinceTill > nowTime;
};

export const formatTime = (date: DateTime) =>
  format(parse(date), TIME_FORMAT.DEFAULT).replace(/\s/g, "T");

export const roundToMinutes = (date: DateTime) =>
  roundToNearestMinutes(parse(date));

export const isYesterday = (since: DateTime, startDate: DateTime) => {
  const sinceTime = getTime(parse(since));
  const startDateTime = getTime(parse(startDate));

  return startDateTime > sinceTime;
};

export const isFutureTime = (date: DateTime) => {
  const dateTime = getTime(parse(date));
  const now = getTime(new Date());
  return dateTime > now;
};

export const getTimeRangeDates = (
  startDate: DateRangeTime,
  endDate: DateRangeTime
) => {
  let endDateValue = endDate;
  if (endDate === "") {
    endDateValue = formatTime(startOfDay(addDays(parse(startDate), 1)));
  }

  return { startDate, endDate: endDateValue };
};
