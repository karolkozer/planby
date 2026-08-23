// PHASE 2 — "Rebrand it to a light theme and show duration on the card."
// Additive on top of phase 1: theme + globalStyles + a custom renderProgram +
// a styled() override. The data and useEpg wiring are unchanged — only the look
// is layered on. Generated from customization.md + theme.md.
// Type-checked against the published planby types.
//
// NOTE: typed theme access inside styled() requires the emotion module
// augmentation in ./planby-emotion.d.ts — planby does not ship it.
import React from "react";
import styled from "@emotion/styled";
import {
  useEpg,
  Epg,
  Layout,
  useProgram,
  ProgramBox as PlanbyProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramTitle,
  ProgramText,
  ProgramImage,
  type ProgramItem,
  type Theme,
} from "planby";

// ---------------------------------------------------------------- Layer 1
// A full light Theme. Every key is required — there is no merge with the
// default theme. primary[900] is the ground behind everything; gradient.blue
// paints program boxes on hover and when live.
const brandTheme: Theme = {
  primary: { 600: "#ffffff", 900: "#f4f6f8" },
  grey: { 300: "#1a202c" },
  white: "#e2e8f0",
  green: { 300: "#d53f8c" }, // the current-time line
  loader: { teal: "#319795", purple: "#5a67d8", pink: "#d53f8c", bg: "#ffffffcc" },
  scrollbar: { border: "#e2e8f0", thumb: { bg: "#cbd5e0" } },
  gradient: { blue: { 300: "#bee3f8", 600: "#90cdf4", 900: "#63b3ed" } },
  text: { grey: { 300: "#4a5568", 500: "#718096" } },
  timeline: { divider: { bg: "#cbd5e0" } },
};

// ---------------------------------------------------------------- Layer 2
// globalStyles REPLACES the built-in block, so the font @import has to be
// repeated here or the default Inter import is lost.
const globalStyles = `
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap");

  .planby {
    font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  }
`;

// ---------------------------------------------------------------- Layer 3
// styled() wrapper reading the active theme. The hover selectors target OUR
// OWN classNames set on the JSX below — planby has no .planby-* class hooks.
const ProgramBox = styled(PlanbyProgramBox)`
  .brand-program {
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.timeline.divider.bg};
    transition: box-shadow 140ms ease;
  }
  &:hover .brand-program {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.green[300]};
  }
  &:hover .brand-program-title {
    color: ${({ theme }) => theme.green[300]};
  }
`;

// What the card shows, so one component covers several design variants.
type UiConfig = {
  showImage: boolean;
  showDuration: boolean;
};

type ProgramProps = ProgramItem & {
  uiConfig: UiConfig;
  onOpen: (id: string) => void;
};

const formatDuration = (since: string | number | Date, till: string | number | Date) => {
  const minutes = Math.round(
    (new Date(till).getTime() - new Date(since).getTime()) / 60000
  );
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return hours ? `${hours}h ${rest}m` : `${rest}m`;
};

const Program = ({ program, uiConfig, onOpen, ...rest }: ProgramProps) => {
  // ...rest carries isRTL and isBaseTimeFormat — always forward it.
  const { styles, formatTime, isLive, isMinWidth } = useProgram({ program, ...rest });

  const { id, image, title, since, till } = program.data;

  return (
    <ProgramBox
      width={styles.width}
      style={styles.position}
      onClick={() => onOpen(id)}
    >
      <ProgramContent className="brand-program" width={styles.width} isLive={isLive}>
        <ProgramFlex>
          {uiConfig.showImage && isMinWidth && image && (
            <ProgramImage src={image} alt="" />
          )}
          <ProgramStack>
            <ProgramTitle className="brand-program-title">{title}</ProgramTitle>
            <ProgramText>
              {formatTime(since)} - {formatTime(till)}
              {uiConfig.showDuration && ` · ${formatDuration(since, till)}`}
            </ProgramText>
          </ProgramStack>
        </ProgramFlex>
      </ProgramContent>
    </ProgramBox>
  );
};

// Same data and wiring as phase 1.
const channels = [
  { uuid: "stage-a", logo: "https://example.com/a.png" },
  { uuid: "stage-b", logo: "https://example.com/b.png" },
];

const epg = [
  {
    id: "p-1",
    channelUuid: "stage-a",
    title: "Opening Keynote",
    description: "Welcome & vision",
    image: "https://example.com/p1.png",
    since: "2022-02-02T09:00:00",
    till: "2022-02-02T10:00:00",
  },
  {
    id: "p-2",
    channelUuid: "stage-b",
    title: "Workshop: Data",
    description: "Hands-on session",
    image: "https://example.com/p2.png",
    since: "2022-02-02T09:30:00",
    till: "2022-02-02T11:00:00",
  },
];

export function BrandedSchedule() {
  const channelsData = React.useMemo(() => channels, []);
  const epgData = React.useMemo(() => epg, []);

  const uiConfig = React.useMemo<UiConfig>(
    () => ({ showImage: true, showDuration: true }),
    []
  );

  const { getEpgProps, getLayoutProps } = useEpg({
    channels: channelsData,
    epg: epgData,
    startDate: "2022-02-02T08:00:00",
    endDate: "2022-02-02T18:00:00",
    dayWidth: 3000, // 10h range × 300px/hour
    sidebarWidth: 100,
    itemHeight: 90,
    theme: brandTheme,
    globalStyles,
  });

  const openProgram = React.useCallback((id: string) => {
    console.log("open", id);
  }, []);

  return (
    <div style={{ height: "700px", width: "1200px" }}>
      <Epg {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
          renderProgram={({ program, ...rest }) => (
            <Program
              key={`${program.data.channelUuid}-${program.data.id}`}
              program={program}
              uiConfig={uiConfig}
              onOpen={openProgram}
              {...rest}
            />
          )}
        />
      </Epg>
    </div>
  );
}
