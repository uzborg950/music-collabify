import React, { ReactNode } from "react";
import { styled } from "@mui/system";
import { green } from "@mui/material/colors";

type PlayTickerProps = {
  referenceElement: HTMLElement | null; //Play ticker will be shown on top of this
  bpm: number;
  nBeats: number; //i.e. number of beats on the track grid
  trackStartX: string;
};

const Line = styled("div")<{ x: number; y: number; $height: number }>`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  width: 2px;
  height: ${(props) => props.$height}px;
  background: ${green["500"]};
`;
export const PlayTicker: React.FC<PlayTickerProps> = ({
  referenceElement,
  bpm,
  nBeats,
  trackStartX,
}) => {
  if (!referenceElement) return null;
  const boundingClientRect = referenceElement.getBoundingClientRect();

  console.log(boundingClientRect, trackStartX);
  return (
    <Line
      x={boundingClientRect.x}
      y={boundingClientRect.y}
      $height={boundingClientRect.height}
      id={"play-ticks"}
    />
  );
};
