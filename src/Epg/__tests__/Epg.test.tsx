import React from "react";
import { render, screen, within } from "../test/test-utils";
import { Epg } from "../Epg";
import { Layout } from "../components";

import { getLayoutProps } from "../test";

// Import theme
import { theme as defaultTheme } from "../theme";

type Overrides = { [key: string]: any };
function getEpgProps(overrides: Overrides = {}) {
  return {
    theme: defaultTheme,
    sidebarWidth: 100,
    ...overrides,
  };
}

interface RenderEpg {
  epgOptions?: Overrides;
  layoutOptions?: Overrides;
}
function renderEpg({ epgOptions, layoutOptions }: RenderEpg = {}) {
  const layoutProps = getLayoutProps(layoutOptions);
  render(
    <>
      {/* @ts-ignore:next-line */}
      <Epg {...epgOptions}>
        <Layout {...layoutProps} />
      </Epg>
    </>
  );
  return { layoutProps };
}

test("should render Epg coponent properly", () => {
  const props = getEpgProps();
  const layoutProps = getLayoutProps();
  render(
    <div style={{ height: "500px", width: "800px" }}>
      {/* @ts-ignore:next-line */}
      <Epg {...props}>
        <Layout {...layoutProps} />
      </Epg>
    </div>
  );

  const container = screen.getByTestId("container");

  expect(container).toBeInTheDocument();
  expect(container).toHaveStyle(`height: 100%; width: 100%`);

  const timeline = screen.getByTestId("timeline");
  const inTimeline = within(timeline);
  expect(timeline).toBeInTheDocument();
  expect(inTimeline.getByText("00:00")).toBeInTheDocument();
  expect(inTimeline.getAllByTestId("timeline-item")).toHaveLength(24);

  const sidebar = screen.getByTestId("sidebar");
  const inSidebar = within(sidebar);
  expect(sidebar).toBeInTheDocument();
  expect(inSidebar.getAllByTestId("sidebar-item")).toHaveLength(1);
  expect(inSidebar.getByRole("img", { name: /logo/i })).toHaveAttribute(
    "src",
    layoutProps.channels[0].logo
  );

  const content = screen.getByTestId("content");
  const inContent = within(content);
  expect(content).toBeInTheDocument();
  expect(inContent.getAllByTestId("program-item")).toHaveLength(1);

  const firstProgram = inContent.getAllByTestId("program-item")[0];
  expect(firstProgram).toHaveTextContent(layoutProps.programs[0].data.title);
  expect(firstProgram).toHaveStyle(
    `top: ${layoutProps.programs[0].position.top}px`
  );
  expect(firstProgram).toHaveStyle(
    `width: ${layoutProps.programs[0].position.width}px`
  );
});

test("should set initial Epg width and height props", () => {
  const epgOptions = getEpgProps({ width: 1000, height: 600 });
  renderEpg({ epgOptions });

  const container = screen.getByTestId("container");

  expect(container).toBeInTheDocument();
  expect(container).toHaveStyle(`height: 600px; width: 1000px`);
});

test("should show loader in Epg layout", () => {
  const epgOptions = getEpgProps({ isLoading: true });
  renderEpg({ epgOptions });

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
});
