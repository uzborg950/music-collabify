import React, { forwardRef } from "react";
import { styled } from "@mui/system";
import { BeatInitProps, CSSGridProps } from "../../types";
import { blueGrey } from "@mui/material/colors";
import { GridRowListeners } from "../types";

export const Container = styled("div")<{
  $barWidth: number;
  $beatWidth: number;
  $beatsPerBar: number;
  $startGridCol: number;
  $startGridRow: number;
}>`
  box-sizing: border-box;
  background: ${blueGrey["400"]};
  grid-column: ${({ $startGridCol }) => $startGridCol};
  grid-row: ${({ $startGridRow }) => $startGridRow};
  border-right: 2px solid ${(props) => props.theme.palette.background.default};
  border-top: 1px solid ${(props) => props.theme.palette.background.default};
  border-bottom: 1px solid ${(props) => props.theme.palette.background.default};
  background-image: repeating-linear-gradient(
      to right,
      ${(props) => props.theme.palette.background.default},
      ${(props) => props.theme.palette.background.default} 2px,
      transparent 1px,
      transparent
        ${({ $beatWidth, $beatsPerBar }) => $beatWidth * $beatsPerBar}px
    ),
    repeating-linear-gradient(
      to right,
      ${(props) => props.theme.palette.background.default},
      ${(props) => props.theme.palette.background.default} 1px,
      transparent 1px,
      transparent ${({ $beatWidth }) => $beatWidth}px
    );
`;

type GridRowProps = { rowIndex: number } & BeatInitProps &
  CSSGridProps &
  GridRowListeners;
export const GridRow = forwardRef<HTMLDivElement, GridRowProps>(
  (props, ref) => {
    //todo implement seek timeline

    return (
      <Container
        onClick={props.onClick}
        ref={ref}
        $startGridCol={props.startCol}
        $startGridRow={props.startRow + props.rowIndex}
        $beatWidth={props.beatWidth}
        $beatsPerBar={props.beatsPerBar}
        $barWidth={props.beatsPerBar * props.beatWidth}
        style={{ width: `${props.nBeats * props.beatWidth}px` }}
      ></Container>
    );
  },
);
