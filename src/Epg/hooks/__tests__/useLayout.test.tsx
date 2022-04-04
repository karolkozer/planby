import { renderHook } from "@testing-library/react-hooks";
import { useLayout } from "../useLayout";

const defaultState = (overrides: { [key: string]: any } = {}) => {
  return {
    containerRef: { current: null },
    scrollBoxRef: { current: null },
    scrollX: 0,
    scrollY: 0,
    layoutWidth: undefined,
    layoutHeight: undefined,
    onScroll: expect.any(Function),
    onScrollToNow: expect.any(Function),
    onScrollTop: expect.any(Function),
    onScrollLeft: expect.any(Function),
    onScrollRight: expect.any(Function),
    ...overrides,
  };
};

test("should return initial useLayout props", () => {
  const { result } = renderHook(() =>
    useLayout({
      sidebarWidth: 100,
      startDate: "2022-03-24T00:00:00",
    })
  );

  expect(result.current).toEqual(defaultState());
});

test("should set initial width and height useLayout props", () => {
  const width = 800;
  const height = 600;
  const { result } = renderHook(() =>
    useLayout({
      width,
      height,
      sidebarWidth: 100,
      startDate: "2022-03-24T00:00:00",
    })
  );

  expect(result.current).toEqual(
    defaultState({ layoutWidth: width, layoutHeight: height })
  );
});
