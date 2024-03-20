import React from "react";
import { styled } from "@mui/system";
import { TimelineGridProps } from "./types";
import { TimelineReferenceBar } from "../../../ui/TimelineReferenceBar";
import { NavigationBar } from "./NavigationBar";
import { Layers } from "./Layers";
import { TrackGrid } from "../../../ui/TrackGrid";

const GridContainer = styled("div")<{ nCols: number; nRows: number }>`
  display: grid;
  grid-template-columns: 400px repeat(${(props) => props.nCols}, 50px);
  grid-template-rows: 30px repeat(${(props) => props.nRows}, 100px);
  overflow: auto;
`;
type LayersAndGrid2Props = {} & TimelineGridProps;
export const LayersAndGrid: React.FC<LayersAndGrid2Props> = (props) => {
  return (
    <GridContainer nCols={props.nCols} nRows={props.nRows}>
      <NavigationBar />
      <TimelineReferenceBar
        beatsPerBar={props.beatsPerBar}
        nCols={props.nCols}
      />
      <Layers startGridRow={2} {...props} />
      <TrackGrid startGridRow={2} startGridCol={2} {...props} />
    </GridContainer>
  );
};
