import React from "react";
import { styled } from "@mui/system";
import { green } from "@mui/material/colors";

type PlayTickerProps = {
  referenceElement: HTMLElement | null; //Play ticker will be shown on top of this
  bpm: number;
  nBeats: number; //i.e. number of beats on the track grid
  offsetX: number; //how much offsetX from the left of referenceElement
};

// const moveRight = ({ tillPx }: { tillPx: number }) => {
//   return keyframes`
//   from {
//     transform: translateX(0);
//   }
//   to {
//     transform: translateX(${tillPx}px);
//   }
// `;
// };
//   animation: ${({ isMoving, $refWidth }) =>
//     isMoving
//       ? css`
//           ${moveRight({ tillPx: $refWidth })} 5s linear infinite
//         `
//       : null};
const Line = styled("div")<{
  x: number;
  y: number;
  $refHeight: number;
  $refWidth: number;
}>`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  width: 2px;
  height: ${(props) => props.$refHeight}px;
  background: ${green["A700"]};
`;
export const PlayTicker: React.FC<PlayTickerProps> = ({
  referenceElement,
  bpm,
  nBeats,
  offsetX,
}) => {
  if (!referenceElement) return null;
  const boundingClientRect = referenceElement.getBoundingClientRect();
  //todo set x according to current beat in redux
  return (
    <Line
      x={boundingClientRect.x + offsetX}
      y={boundingClientRect.y}
      $refWidth={boundingClientRect.width}
      $refHeight={boundingClientRect.height}
      id={"play-tick"}
    />
  );
};
