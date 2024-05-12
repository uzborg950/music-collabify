import React, { useMemo, useState } from "react";
import { styled } from "@mui/system";
import { NavigationBar } from "./NavigationBar";
import { Layers } from "./Layers";
import {
  getBeatWidth,
  GRID_LAYOUT,
  LAYERS_WIDTH,
  TOP_ROW_HEIGHT,
} from "./constants";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { TimelineReferenceBarV2 } from "../../../ui/TimelineReferenceBarV2";
import { TrackGridV2 } from "../../../ui/TrackGridV2";
import { AbsoluteOverlays } from "./AbsoluteOverlays";
import { onClick } from "./eventListeners/trackGridListeners";

const GridContainer = styled("div")<{ nRows: number }>`
  display: grid;
  grid-template-columns: ${LAYERS_WIDTH} 100%; //2 columns
  grid-template-rows: ${TOP_ROW_HEIGHT} repeat(${(props) => props.nRows}, 120px);
  overflow: auto;
`;
type LayersAndGrid2Props = {};
export const LayersAndGrid: React.FC<LayersAndGrid2Props> = (props) => {
  const nBeats = useAppSelector((state) => state.playback.nBeats);
  const nRows = useAppSelector((state) => state.playback.nLayers);
  const beatsPerBar = useAppSelector((state) => state.playback.beatsPerBar);
  const subdivisions = useAppSelector(
    (state) => state.playback.subdivisionsPerBeat,
  );
  const dispatch = useAppDispatch();
  const [gridRef, setGridRef] = useState<HTMLDivElement | null>(null);

  const [firstTrackGridCellRef, setFirstTrackGridCellRef] =
    useState<HTMLDivElement | null>(null); //This location will help all absolutely positioned overlays

  const beatInitProps = { nBeats, beatsPerBar, beatWidth: getBeatWidth() };
  const absoluteTrackGridPosition = useMemo(() => {
    /*
    maps the track grid position to absolute positioning within GridContainer
     */
    if (!firstTrackGridCellRef) return;
    const firstTrackGridCellBounding =
      firstTrackGridCellRef.getBoundingClientRect();

    return {
      top: firstTrackGridCellBounding.height * -nRows,
      left: firstTrackGridCellBounding.left,
      height: firstTrackGridCellBounding.height * nRows,
    };
  }, [firstTrackGridCellRef, nRows]);
  return (
    <>
      <GridContainer nRows={nRows} ref={setGridRef}>
        <NavigationBar />
        <TimelineReferenceBarV2 {...beatInitProps} />
        <Layers gridCol={GRID_LAYOUT.layers.col} />
        <TrackGridV2
          {...beatInitProps}
          ref={setFirstTrackGridCellRef}
          onClick={onClick({
            trackGridLeft: absoluteTrackGridPosition?.left,
            subdivisions,
            dispatch,
          })}
          nRows={nRows}
          startCol={GRID_LAYOUT.trackGrid.col}
          startRow={GRID_LAYOUT.trackGrid.row}
        />
        {absoluteTrackGridPosition && (
          <AbsoluteOverlays overlayArea={absoluteTrackGridPosition} />
        )}
      </GridContainer>
    </>
  );
};
