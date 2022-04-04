import { renderHook } from "@testing-library/react-hooks";
import { useTimeline } from "../useTimeline";

test("should return generated props from useTimeline", () => {
  const { result } = renderHook(() => useTimeline());
  expect(result.current.time).toHaveLength(24);
  expect(result.current.dividers).toHaveLength(4);
});
