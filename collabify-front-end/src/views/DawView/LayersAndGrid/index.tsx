import React, { useState } from "react";
import { styled } from "@mui/system";
import { TimelineGridProps } from "./types";
import { TimelineReferenceBar } from "../../../ui/TimelineReferenceBar";
import { NavigationBar } from "./NavigationBar";
import { Layers } from "./Layers";
import { TrackGrid } from "../../../ui/TrackGrid";
import { PlayTicker } from "../../../ui/PlayTicker";

const TRACK_GRID_CELL_WIDTH = "50px";
const LAYERS_WIDTH = "400px";
const GridContainer = styled("div")<{ nCols: number; nRows: number }>`
  display: grid;
  grid-template-columns: ${LAYERS_WIDTH} repeat(
      ${(props) => props.nCols},
      ${TRACK_GRID_CELL_WIDTH}
    ); //
  grid-template-rows: 30px repeat(${(props) => props.nRows}, 120px);
  overflow: auto;
`;
type LayersAndGrid2Props = {} & TimelineGridProps;
export const LayersAndGrid: React.FC<LayersAndGrid2Props> = (props) => {
  // const [firstTrackGridCellRef, setFirstTrackGridCellRef] =
  //   useState<HTMLDivElement | null>(null);

  const [gridRef, setGridRef] = useState<HTMLDivElement | null>(null);

  return (
    <>
      <GridContainer nCols={props.nCols} nRows={props.nRows} ref={setGridRef}>
        <NavigationBar />
        <TimelineReferenceBar
          beatsPerBar={props.beatsPerBar}
          nCols={props.nCols}
        />
        <Layers gridCol={1} {...props} />
        <TrackGrid
          startGridRow={2}
          startGridCol={2}
          {...props}
        />
      </GridContainer>
      <PlayTicker
        bpm={80}
        trackStartX={LAYERS_WIDTH}
        nBeats={props.nCols}
        referenceElement={gridRef}
      />
    </>
  );
};
