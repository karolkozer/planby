import { renderHook } from "@testing-library/react-hooks";
import { useProgram } from "../useProgram";
import { buildProgramWithPosition, getTestTimeDate } from "../../test";
import { ProgramItem } from "../../helpers/types";

interface DefaultState {
  overrides?: { [key: string]: any };
  styles?: { [key: string]: any };
}
const defaultState = ({ overrides, styles }: DefaultState = {}) => {
  return {
    formatTime: expect.any(Function),
    set12HoursTimeFormat: expect.any(Function),
    isLive: false,
    isMinWidth: true,
    styles,
    ...overrides,
  };
};

function getStyles(program: ProgramItem) {
  return {
    styles: { position: program.position, width: program.position.width },
  };
}

test("should return generated props from useTimeline", () => {
  const program = buildProgramWithPosition();
  const props = { program, isBaseTimeFormat: false };
  const { result } = renderHook(() => useProgram(props));
  const options = {
    styles: { position: program.position, width: program.position.width },
  };

  const { formatTime } = result.current;
  expect(formatTime(getTestTimeDate("08", "20"))).toBe("08:20");
  expect(formatTime(getTestTimeDate("18", "20"))).toBe("18:20");

  expect(result.current).toEqual(defaultState(options));
});

test("should specify an initial state in useTimeline", () => {
  const program = buildProgramWithPosition();
  const props = { program, isBaseTimeFormat: true, minWidth: 800 };
  const { result } = renderHook(() => useProgram(props));
  const options = {
    ...getStyles(program),
    isMinWidth: false,
  };
  const { formatTime, set12HoursTimeFormat } = result.current;
  expect(formatTime(getTestTimeDate("02", "33"), set12HoursTimeFormat())).toBe(
    "2:33AM"
  );
  expect(formatTime(getTestTimeDate("15", "45"), set12HoursTimeFormat())).toBe(
    "3:45PM"
  );

  expect(result.current).toEqual(defaultState(options));
});
