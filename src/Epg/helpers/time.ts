import { format, getTime, roundToNearestMinutes } from "date-fns";

// Variables
import { TIME_FORMAT } from "./variables";

type DateTime = number | string | Date;
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
