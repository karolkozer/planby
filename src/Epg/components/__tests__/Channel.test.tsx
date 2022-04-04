import { render, screen } from "../../test/test-utils";
import { Channel } from "../Channel";
import { buildChannelWithPosition } from "../../test";

test("should render and show Channel component properly", () => {
  const channel = buildChannelWithPosition();
  render(<Channel channel={channel} />);
  expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /logo/i })).toHaveAttribute(
    "src",
    channel.logo
  );
});
