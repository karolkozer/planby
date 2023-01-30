import {format, setHours, startOfToday} from "date-fns";

// Import types
import { BaseTimeFormat } from "../helpers/types";

// Import helpers
import { TIME_FORMAT, generateArray } from "../helpers";

export function useTimeline(
  numberOfHoursInDay: number,
  isBaseTimeFormat: BaseTimeFormat
) {
  const time = generateArray(numberOfHoursInDay);
  const dividers = generateArray(4);

  const formatTime = (index: number) => {
    if (isBaseTimeFormat) {
      const now = startOfToday()
      const date = setHours(now, index)
      const timeFormat = format(date, TIME_FORMAT.BASE_HOURS_TIME);
      return timeFormat.toLowerCase().replace(/\s/g, "");
    }

    const time = index < 10 ? `0${index}` : index;
    return `${time}:00`;
  };

  return { time, dividers, formatTime };
}
