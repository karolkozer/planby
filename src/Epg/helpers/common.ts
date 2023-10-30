import { useLayoutEffect, useEffect } from "react";
import { differenceInHours } from "date-fns";
import { HOURS_IN_DAY } from "./variables";
import { utcToZonedTime  } from "date-fns-tz";

type DateTime = string | number | Date;

type OmitObjectType = { [key: string]: any };
export const omit = (obj: OmitObjectType, ...props: string[]) => {
  const result = { ...obj };

  for (const property of props) {
    delete result[property];
  }

  return result;
};

export const generateArray = (num: number) => new Array(num).fill("");

type ProgramOptions = {
  position: { width: number; height: number; top: number; left: number };
};
export const getProgramOptions = <T extends ProgramOptions>(program: T) => {
  const { width, height, top, left } = program.position;
  return {
    ...program,
    position: { width, height, top, left },
  };
};

export const useIsomorphicLayoutEffect = () =>
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const getHourWidth = (dayWidth: number) => dayWidth / HOURS_IN_DAY;

export const getDate = (date: DateTime, timezone?: string) => timezone ? utcToZonedTime(new Date(date), timezone) : new Date(date);

const differenceInHoursWithTimezone = (dateLeft: DateTime, dateRight: DateTime, timezone: string) => {
  return Math.trunc((utcToZonedTime(dateLeft, timezone).getTime() - utcToZonedTime(dateRight, timezone).getTime())/ 3600000);
}

export const differenceInMinutesWithTimezone = (dateLeft: DateTime, dateRight: DateTime, timezone: string) => {
  return Math.trunc((utcToZonedTime(dateLeft, timezone).getTime() - utcToZonedTime(dateRight, timezone).getTime())/ 60000);
}

const abs = (num: number) => Math.abs(num);
interface DayWidth {
  dayWidth: number;
  startDate: DateTime;
  endDate: DateTime;
  timezone?: string;
}
export const getDayWidthResources = ({
  dayWidth,
  startDate,
  endDate,
  timezone
}: DayWidth) => {
  const startDateTime = getDate(startDate, timezone);
  const endDateTime = getDate(endDate, timezone);

  if (endDateTime < startDateTime) {
    console.error(
      `Invalid endDate property. Value of endDate must be greater than startDate. Props: startDateTime: ${startDateTime}, endDateTime: ${endDateTime}`
    );
  }

  const startOfDay = timezone ? utcToZonedTime(new Date(startDateTime), timezone) : new Date(startDateTime);
  startOfDay.setHours(0, 0, 0, 0);

  const offsetStartHoursRange = timezone ? differenceInHoursWithTimezone(startDateTime, startOfDay, timezone) : differenceInHours(
    startDateTime,
    startOfDay
  );

  const numberOfHoursInDay = timezone ? differenceInHoursWithTimezone(endDateTime, startDateTime, timezone) : differenceInHours(endDateTime, startDateTime);
  const hourWidth = Math.floor(dayWidth / numberOfHoursInDay);
  const newDayWidth = hourWidth * numberOfHoursInDay;

  return {
    hourWidth: abs(hourWidth),
    dayWidth: abs(newDayWidth),
    numberOfHoursInDay: abs(numberOfHoursInDay),
    offsetStartHoursRange: abs(offsetStartHoursRange),
  };
};

