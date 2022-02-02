import { format, roundToNearestMinutes } from "date-fns";

// Variables
import { TIME_FORMAT } from "./variables";

export const formatTime = (date: number | string | Date) =>
  format(new Date(date), TIME_FORMAT.DEFAULT);

export const roundToMinutes = (date: number | string | Date) =>
  roundToNearestMinutes(new Date(date));
