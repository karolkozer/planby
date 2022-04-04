import { render, screen, userEvent } from "../../test/test-utils";
import { Program } from "../Program";
import { buildProgramWithPosition } from "../../test";
import { subMinutes, addMinutes } from "date-fns";

test("should render and show Program component properly", () => {
  const program = buildProgramWithPosition();
  render(<Program program={program} />);

  expect(screen.getByText(program.data.title)).toBeInTheDocument();
  expect(screen.getByLabelText(/program time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/program time/i)).toHaveTextContent(
    `23:50 - 00:55`
  );
});

test("should highlight live program", () => {
  const since = subMinutes(new Date(), 60);
  const till = addMinutes(new Date(), 60);
  const program = buildProgramWithPosition({ program: { since, till } });

  render(<Program program={program} />);

  expect(screen.getByRole("img", { name: /preview/i })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /preview/i })).toHaveAttribute(
    "src",
    program.data.image
  );
  expect(screen.getByTestId(/program-content/i)).toHaveStyle(
    `background: linear-gradient(to right, #051937, #002360,#002eb3)`
  );
});

test("should handle onClick prop", () => {
  const onClick = jest.fn();
  const program = buildProgramWithPosition();

  render(<Program program={program} onClick={onClick} />);

  userEvent.click(screen.getByTestId(/program-content/i));

  expect(onClick).toHaveBeenCalled();
  expect(onClick).toHaveBeenCalledTimes(1);
});
