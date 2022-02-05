// Import helpers
import { generateArray } from "../helpers";

export function useTimeline() {
  const time = generateArray(24);
  const dividers = generateArray(4);
  return { time, dividers };
}
