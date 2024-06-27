import React from "react";
import { styled } from "@mui/system";
import { NavigationBar } from "./NavigationBar";
import { Layers } from "./Layers";
import {
  getBeatWidth,
  GRID_LAYOUT,
  LAYER_HEIGHT,
  LAYERS_WIDTH,
  TOP_ROW_HEIGHT,
} from "./constants";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { TimelineReferenceBarV2 } from "../../../ui/TimelineReferenceBarV2";
import { TrackGridV2 } from "../../../ui/TrackGridV2";
import { onClick } from "./eventListeners/trackGridListeners";
import { TracksV3 } from "./TracksV3";
import { MainPlayTickerV2 } from "./MainPlayTickerV2";

const GridContainer = styled("div")<{ nRows: number }>`
  display: grid;
  grid-template-columns: ${LAYERS_WIDTH} 100%; //2 columns
  grid-template-rows: ${TOP_ROW_HEIGHT} repeat(
      ${(props) => props.nRows},
      ${LAYER_HEIGHT}
    );
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

  const beatInitProps = { nBeats, beatsPerBar, beatWidth: getBeatWidth() };

  return (
    <>
      <GridContainer nRows={nRows}>
        <NavigationBar />
        <TimelineReferenceBarV2 {...beatInitProps} />
        <Layers gridCol={GRID_LAYOUT.layers.col} />
        <TrackGridV2
          {...beatInitProps}
          onClick={onClick({
            subdivisions,
            dispatch,
          })}
          nRows={nRows}
          startCol={GRID_LAYOUT.trackGrid.col}
          startRow={GRID_LAYOUT.trackGrid.row}
        />
        <TracksV3
          startCol={GRID_LAYOUT.trackGrid.col}
          startRow={GRID_LAYOUT.trackGrid.row}
        />
        <MainPlayTickerV2
          startCol={GRID_LAYOUT.trackGrid.col}
          startRow={GRID_LAYOUT.trackGrid.row}
        />
      </GridContainer>
    </>
  );
};
