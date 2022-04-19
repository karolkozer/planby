import { useLayoutEffect, useEffect } from "react";
import { differenceInHours, startOfDay } from "date-fns";
import { HOURS_IN_DAY } from "./variables";

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

export const getDate = (date: DateTime) => new Date(date);

const abs = (num: number) => Math.abs(num);
interface DayWidth {
  dayWidth: number;
  startDate: DateTime;
  endDate: DateTime;
}
export const getDayWidthResources = ({
  dayWidth,
  startDate,
  endDate,
}: DayWidth) => {
  const startDateTime = getDate(startDate);
  const endDateTime = getDate(endDate);

  if (endDateTime < startDateTime) {
    console.error(
      `Invalid endDate property. Value of endDate must be greater than startDate. Props: startDateTime: ${startDateTime}, endDateTime: ${endDateTime}`
    );
  }

  const offsetStartHoursRange = differenceInHours(
    startDateTime,
    startOfDay(startDateTime)
  );

  const numberOfHoursInDay = differenceInHours(endDateTime, startDateTime);
  const hourWidth = Math.floor(dayWidth / numberOfHoursInDay);
  const newDayWidth = hourWidth * numberOfHoursInDay;

  return {
    hourWidth: abs(hourWidth),
    dayWidth: abs(newDayWidth),
    numberOfHoursInDay: abs(numberOfHoursInDay),
    offsetStartHoursRange: abs(offsetStartHoursRange),
  };
};
