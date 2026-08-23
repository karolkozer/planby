// PHASE 1 — "Build me a schedule."
// A working, default-look Planby schedule. Generated from SKILL.md quick-start +
// data-schemas + the 4 rules. Type-checked against the published planby types.
// This is the starting point; branding is layered on top in phase 2.
import React from "react";
import { useEpg, Epg, Layout } from "planby";

// Rule 2: epg[].channelUuid must match a channels[].uuid
const channels = [
  { uuid: "stage-a", logo: "https://example.com/a.png" },
  { uuid: "stage-b", logo: "https://example.com/b.png" },
];

const epg = [
  {
    id: "p-1",
    channelUuid: "stage-a",
    title: "Opening Keynote",
    description: "Welcome & vision", // required by the Program type
    image: "https://example.com/p1.png",
    since: "2022-02-02T09:00:00", // Rule 3: ISO strings inside start/end
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

export function Schedule() {
  // Rule 1: memoize channels/epg
  const channelsData = React.useMemo(() => channels, []);
  const epgData = React.useMemo(() => epg, []);

  const { getEpgProps, getLayoutProps, onScrollToNow } = useEpg({
    channels: channelsData,
    epg: epgData,
    startDate: "2022-02-02T00:00:00",
    endDate: "2022-02-02T24:00:00",
    // 24h range at 300px/hour. dayWidth covers the WHOLE range, not one day.
    dayWidth: 7200,
  });

  return (
    <div>
      <button onClick={() => onScrollToNow()}>Now</button>
      {/* Rule 4: explicit container size */}
      <div style={{ height: "600px", width: "1200px" }}>
        <Epg {...getEpgProps()}>
          <Layout {...getLayoutProps()} />
        </Epg>
      </div>
    </div>
  );
}
