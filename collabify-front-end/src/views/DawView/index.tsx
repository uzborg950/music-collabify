import React from "react";
import styled from "styled-components";
import { PlaybackBar } from "./PlaybackBar";
import { blueGrey } from "@mui/material/colors";
import { LayersAndGrid } from "./LayersAndGrid";
import { TimelineGridProps } from "./LayersAndGrid/types";

const VerticalFlexLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: ${blueGrey["900"]};
`;

const initTimeline: TimelineGridProps = {
  nRows: 20,
  nCols: 200,
  beatsPerBar: 4,
};

export const DawView: React.FC = () => {
  return (
    <VerticalFlexLayout>
      <PlaybackBar />
      <LayersAndGrid {...initTimeline} />
    </VerticalFlexLayout>
  );
};
