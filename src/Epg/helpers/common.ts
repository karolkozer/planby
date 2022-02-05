import { useEffect, useLayoutEffect } from "react";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type OmitObjectType = { [key: string]: any };
export const omit = (obj: OmitObjectType, ...props: string[]) => {
  const result = { ...obj };

  for (const property of props) {
    delete result[property];
  }

  return result;
};

export const generateArray = (num: number) => new Array(num).fill("");

type DateTime = string | number | Date;
const getTime = (date: DateTime) => new Date(date).getTime();
export const getLiveStatus = (since: DateTime, till: DateTime) => {
  const nowTime = getTime(new Date());
  const sinceTime = getTime(since);
  const sinceTill = getTime(till);
  return nowTime >= sinceTime && sinceTill > nowTime;
};

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
