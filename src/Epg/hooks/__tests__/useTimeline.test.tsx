import { renderHook } from "@testing-library/react-hooks";
import { useTimeline } from "../useTimeline";

test("should return generated props from useTimeline", () => {
  const { result } = renderHook(() => useTimeline(24, false));
  expect(result.current.time).toHaveLength(24);
  expect(result.current.dividers).toHaveLength(4);
  expect(result.current.formatTime(10)).toBe("10:00");
  expect(result.current.formatTime(8)).toBe("08:00");
});

test("should specify an 12 hours initial state in useTimeline", () => {
  const { result } = renderHook(() => useTimeline(16, true));
  expect(result.current.time).toHaveLength(16);
  expect(result.current.dividers).toHaveLength(4);
  expect(result.current.formatTime(10)).toBe("10:00am");
  expect(result.current.formatTime(14)).toBe("2:00pm");
});
