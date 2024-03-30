import React, { forwardRef } from "react";
import { styled } from "@mui/system";
import {green, orange} from "@mui/material/colors";

type PlayTickerProps = {
  backgroundElementRef: HTMLElement | null; //Play ticker will be shown on top of this
  startLocationDivRef: HTMLDivElement | null; //ref marks the start of where the ticker should start playing
  offsetX: number; //how much offsetX from the left of referenceElement
  nRows: number;
  zIndex: number;
};

const Line = styled("div")<{
  $x: number;
  $height: number;
}>`
  position: absolute;
  left: ${(props) => props.$x}px;

  top: -${(props) => props.$height}px; //default top is at the bottom of the trackgrid due to relative positioning. The negative top puts the line at the first cell

  width: 2px;
  height: ${(props) => props.$height}px;
  background: ${green["A100"]};

  box-shadow: -10px 0px 30px 1px ${green["A200"]};
`;

const Container = styled("div")<{ zIndex: number }>`
  position: relative;
  z-index: ${(props) => props.zIndex};
`;
export const PlayTicker = forwardRef<HTMLDivElement | null, PlayTickerProps>(
  (
    { backgroundElementRef, offsetX, startLocationDivRef, nRows, zIndex },
    ref,
  ) => {
    if (!startLocationDivRef || !backgroundElementRef) return null;
    const startLocationRect = startLocationDivRef.getBoundingClientRect(); //warning: non-reactive
    const bgElementRect = backgroundElementRef.getBoundingClientRect(); //warning: non-reactive
    //todo set x according to current beat in redux
    return (
      <Container zIndex={zIndex}>
        <Line
          ref={ref}
          $x={bgElementRect.x + offsetX}
          $height={startLocationRect.height * nRows} //this is programmatically finding height of the track grid
          id={"play-tick"}
        />
      </Container>
    );
  },
);
