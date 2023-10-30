import { startOfDay, addDays } from "date-fns";
import { utcToZonedTime, format  } from "date-fns-tz";
// Import types
import { DateTime as DateRangeTime } from "./types";

// Variables
import { TIME_FORMAT } from "./variables";

type DateTime = number | string | Date;

const getTime = (date: DateTime, timezone?: string) => timezone ? utcToZonedTime(new Date(date), timezone).getTime() : new Date(date).getTime();

export const getLiveStatus = (since: DateTime, till: DateTime, timezone?: string) => {
  const nowTime = getTime(timezone ? utcToZonedTime(new Date(), timezone) : new Date());
  const sinceTime = getTime(since, timezone);
  const sinceTill = getTime(till, timezone);
  return nowTime >= sinceTime && sinceTill > nowTime;
};

export const formatTime = (date: DateTime, timezone?: string) =>
  format(new Date(date), TIME_FORMAT.DEFAULT, {timeZone: timezone}).replace(/\s/g, "T");

export const roundToMinutes = (date: DateTime, timezone?: string) => 
   timezone ? roundToNearestMinutes(utcToZonedTime(new Date(date), timezone), timezone) : roundToNearestMinutes(new Date(date), timezone);

export const roundToNearestMinutes = (date: Date, timeZone?: string) => {
  const _date = timeZone ? utcToZonedTime(new Date(date), timeZone) : new Date(date);
  const seconds = _date.getSeconds();
  const minutes = _date.getMinutes() + seconds / 60;
  const roundedMinutes = Math.trunc(minutes)
  _date.setMinutes(roundedMinutes, 0, 0);
  return _date;
}

export const isYesterday = (since: DateTime, startDate: DateTime, timezone?: string) => {
  const sinceTime = timezone ? utcToZonedTime(new Date(since), timezone).getTime() : new Date(since).getTime();
  const startDateTime = timezone ? utcToZonedTime(new Date(startDate), timezone).getTime() : new Date(startDate).getTime();

  return startDateTime > sinceTime;
};

export const isFutureTime = (date: DateTime, timezone?: string) => {
  const dateTime = timezone ? utcToZonedTime(new Date(date), timezone).getTime() : new Date(date).getTime();
  const now = timezone ? utcToZonedTime(new Date(), timezone).getTime() : new Date().getTime();
  return dateTime > now;
};

export const getTimeRangeDates = (
  startDate: DateRangeTime,
  endDate: DateRangeTime,
  timezone?: string
) => {
  let endDateValue = endDate;
  if (endDate === "") {
    endDateValue = formatTime(startOfDay(addDays(new Date(startDate), 1)), timezone);
  }

  return { startDate, endDate: endDateValue };
};
