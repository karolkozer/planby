import { format, roundToNearestMinutes, startOfDay, addDays } from "date-fns";

// Import types
import { DateTime as DateRangeTime } from "./types";

// Variables
import { TIME_FORMAT } from "./variables";

type DateTime = number | string | Date;

const getTime = (date: DateTime) => new Date(date).getTime();

export const getLiveStatus = (since: DateTime, till: DateTime) => {
  const nowTime = getTime(new Date());
  const sinceTime = getTime(since);
  const sinceTill = getTime(till);
  return nowTime >= sinceTime && sinceTill > nowTime;
};

export const formatTime = (date: DateTime) =>
  format(new Date(date), TIME_FORMAT.DEFAULT).replace(/\s/g, "T");

export const roundToMinutes = (date: DateTime) =>
  roundToNearestMinutes(new Date(date));

export const isYesterday = (since: DateTime, startDate: DateTime) => {
  const sinceTime = getTime(new Date(since));
  const startDateTime = getTime(new Date(startDate));

  return startDateTime > sinceTime;
};

export const isFutureTime = (date: DateTime) => {
  const dateTime = getTime(new Date(date));
  const now = getTime(new Date());
  return dateTime > now;
};

export const getTimeRangeDates = (
  startDate: DateRangeTime,
  endDate: DateRangeTime
) => {
  let endDateValue = endDate;
  if (endDate === "") {
    endDateValue = formatTime(startOfDay(addDays(new Date(startDate), 1)));
  }

  return { startDate, endDate: endDateValue };
};
