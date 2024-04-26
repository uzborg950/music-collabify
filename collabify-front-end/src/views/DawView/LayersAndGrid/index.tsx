import React, { useState } from "react";
import { styled } from "@mui/system";
import { TimelineReferenceBar } from "../../../ui/TimelineReferenceBar";
import { NavigationBar } from "./NavigationBar";
import { Layers } from "./Layers";
import { TrackGrid } from "../../../ui/TrackGrid";
import { LAYERS_WIDTH, TRACK_GRID_CELL_WIDTH } from "./constants";
import { MainPlayTicker } from "./MainPlayTicker";
import { useAppSelector } from "../../../redux/hooks";
import { Tracks } from "./Tracks";

const GridContainer = styled("div")<{ nCols: number; nRows: number }>`
  display: grid;
  grid-template-columns: ${LAYERS_WIDTH} repeat(
      ${(props) => props.nCols},
      ${TRACK_GRID_CELL_WIDTH}
    );
  grid-template-rows: 30px repeat(${(props) => props.nRows}, 120px);
  overflow: auto;
`;
type LayersAndGrid2Props = {};
export const LayersAndGrid: React.FC<LayersAndGrid2Props> = (props) => {
  const nCols = useAppSelector((state) => state.playback.nBeats);
  const nRows = useAppSelector((state) => state.playback.nLayers);
  const [gridRef, setGridRef] = useState<HTMLDivElement | null>(null);
  const [zeroethTrackGridCellRef, setZeroethTrackGridCellRef] =
    useState<HTMLDivElement | null>(null); //This location will help place the absolute positioned playticker
  return (
    <>
      <GridContainer nCols={nCols} nRows={nRows} ref={setGridRef}>
        <NavigationBar />
        <TimelineReferenceBar />
        <Layers gridCol={1} />
        <TrackGrid
          startGridRow={2}
          startGridCol={2}
          setZeroethTrackGridCellRef={setZeroethTrackGridCellRef}
        />
        <MainPlayTicker
          gridRef={gridRef}
          startLocationDivRef={zeroethTrackGridCellRef}
        />
        <Tracks
          gridRef={gridRef}
          startLocationDivRef={zeroethTrackGridCellRef}
        />
      </GridContainer>
    </>
  );
};
