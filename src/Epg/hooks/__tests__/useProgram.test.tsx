import { renderHook } from "@testing-library/react-hooks";
import { useProgram } from "../useProgram";
import { buildProgramWithPosition } from "../../test";
import { ProgramItem } from "../../helpers/types";

interface DefaultState {
  overrides?: { [key: string]: any };
  styles?: { [key: string]: any };
}
const defaultState = ({ overrides, styles }: DefaultState = {}) => {
  return {
    formatTime: expect.any(Function),
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
  const { result } = renderHook(() => useProgram({ program }));
  const options = {
    styles: { position: program.position, width: program.position.width },
  };

  expect(result.current).toEqual(defaultState(options));
});

test("should specify an initial state in useTimeline", () => {
  const program = buildProgramWithPosition();
  const { result } = renderHook(() => useProgram({ program, minWidth: 800 }));
  const options = {
    ...getStyles(program),
    isMinWidth: false,
  };

  expect(result.current).toEqual(defaultState(options));
});
