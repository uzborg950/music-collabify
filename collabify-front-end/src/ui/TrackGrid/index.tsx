import React from "react";
import { styled } from "@mui/system";
import { blueGrey } from "@mui/material/colors";
import { useAppSelector } from "../../redux/hooks";
import { Subdivisions } from "./Subdivisions";

type ExtraTrackGridProps = {
  setZeroethTrackGridCellRef: (element: HTMLDivElement | null) => void;
};
type TrackGridProps = {
  startGridRow: number;
  startGridCol: number;
} & ExtraTrackGridProps;

//todo change this to use static classes for performance
//todo also change the subdivision classes to static classes
const GridCell = styled("div")<{
  isBar: boolean;
  isFirstColumn: boolean;
  isLastColumn: boolean;
  row: number;
  col: number;
}>`
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.col};
  border-top: 1px solid ${(props) => props.theme.palette.background.default};
  border-bottom: 1px solid ${(props) => props.theme.palette.background.default};
  background: ${blueGrey["400"]};
  z-index: 0; //See collabify-front-end/reference/zIndexGrid.md

  ${(props) =>
    props.isBar
      ? `border-right: 2px solid ${props.theme.palette.background.default}`
      : `border-right: 1px solid ${props.theme.palette.background.default}`};
  ${(props) =>
    props.isLastColumn
      ? `border-right: 3px solid ${props.theme.palette.background.default}`
      : ""};
  ${(props) =>
    props.isFirstColumn
      ? `border-left: 3px solid ${props.theme.palette.background.default}`
      : ""};
`;
export const TrackGrid: React.FC<TrackGridProps> = ({
  startGridRow,
  startGridCol,
  setZeroethTrackGridCellRef,
}) => {
  // growOnBoundary will make the grid to widen when an object is placed there
  const nCols = useAppSelector((state) => state.playback.nBeats);
  const nRows = useAppSelector((state) => state.playback.nLayers);
  const beatsPerBar = useAppSelector((state) => state.playback.beatsPerBar);
  return (
    <>
      {[...Array(nRows * nCols)].map((_, index) => (
        <GridCell
          ref={index === 0 ? setZeroethTrackGridCellRef : null}
          key={index}
          id={`grid-cell-row${index / nCols}-col${index % nCols}`}
          row={Math.floor(index / nCols) + startGridRow}
          col={(index % nCols) + startGridCol}
          isBar={(index + 1) % beatsPerBar === 0}
          isFirstColumn={index % nCols === 0}
          isLastColumn={(index + 1) % nCols === 0}
        >
          <Subdivisions beatIndex={index % nCols} />
        </GridCell>
      ))}
    </>
  );
};
