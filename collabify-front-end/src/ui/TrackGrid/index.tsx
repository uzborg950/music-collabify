import React from "react";
import { styled } from "@mui/system";
import { blueGrey } from "@mui/material/colors";
import { TimelineGridProps } from "../../views/DawView/LayersAndGrid/types";

type TrackGridProps = {
  startGridRow: number;
  startGridCol: number;
} & TimelineGridProps;

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

  // &:hover{
  //   background: ${blueGrey["700"]};
  // }
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
  nRows,
  nCols,
  beatsPerBar,
  startGridRow,
  startGridCol,
}) => {
  // growOnBoundary will make the grid to widen when an object is placed there

  return (
    <>
      {[...Array(nRows * nCols)].map((_, index) => (
        <GridCell
          key={index}
          id={`grid-cell-row${index / nCols}-col${index % nCols}`}
          row={Math.floor(index / nCols) + startGridRow}
          col={(index % nCols) + startGridCol}
          isBar={(index + 1) % beatsPerBar === 0}
          isFirstColumn={index % nCols === 0}
          isLastColumn={(index + 1) % nCols === 0}
        />
      ))}
    </>
  );
};
