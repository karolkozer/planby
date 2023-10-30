import { render, screen } from "../../test/test-utils";
import { getLayoutProps } from "../../test";
import { Layout } from "../LayoutComponent";

test("should render Layout component properly", () => {
  const props = getLayoutProps();

  render(<Layout {...props} />);

  const timeline = screen.getByTestId("timeline");
  expect(timeline).toBeInTheDocument();

  const sidebar = screen.getByTestId("sidebar");
  expect(sidebar).toBeInTheDocument();

  const content = screen.getByTestId("content");
  expect(content).toBeInTheDocument();
});

test("should render Layout with hidden timeline", () => {
  const props = getLayoutProps({ isTimeline: false });

  render(<Layout {...props} />);

  const timeline = screen.queryByTestId("timeline");
  expect(timeline).not.toBeInTheDocument();
});

test("should render Layout with hidden sidebar", () => {
  const props = getLayoutProps({ isSidebar: false });

  render(<Layout {...props} />);

  const sideba = screen.queryByTestId("sideba");
  expect(sideba).not.toBeInTheDocument();
});

test("should pass initial Layout props with sidebar width", () => {
  const sidebarWidth = 200;
  const props = getLayoutProps({ sidebarWidth });

  render(<Layout {...props} />);

  expect(screen.getByTestId("sidebar")).toHaveStyle(`width: ${sidebarWidth}px`);
});
