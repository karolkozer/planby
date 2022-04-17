import { format } from "date-fns";

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
    const date = new Date();
    const baseDate = format(date, TIME_FORMAT.DATE);
    const time = index < 10 ? `0${index}` : index;

    if (isBaseTimeFormat) {
      const date = new Date(`${baseDate}T${time}:00:00`);
      const timeFormat = format(date, TIME_FORMAT.BASE_HOURS_TIME);
      return timeFormat.toLowerCase().replace(/\s/g, "");
    }

    return `${time}:00`;
  };

  return { time, dividers, formatTime };
}
