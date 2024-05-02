import React from "react";
import { styled } from "@mui/system";
import { blueGrey, grey } from "@mui/material/colors";
import { PositionProps } from "../types";
import { useSyncedWavesurfer } from "../../external/wavesurfer/useSyncedWavesurfer";
import { TrackData, TrackFile } from "../../views/DawView/types/trackTypes";

const AbsoluteContainer = styled("div")<{
  $bgColor?: string;
  $color?: string;
  $left: number;
  $top: number;
  $height: number;
  $width: number;
}>`
  //pointer-events: none; //to pass pointer event below to track grid for seeking. Commenting for dev
  position: absolute;
  // left: ${(props) =>
    props.$left}px; //todo figure out why commenting this out fixed everything lol
  height: ${(props) =>
    props.$height -
    7}px; //-7 is to fit the bordered track inside the grid layer
  width: ${(props) => props.$width}px;
  top: ${(props) => props.$top}px;

  color: ${grey["A100"]};
  border-radius: 5px;
  border: 3px solid ${({ $bgColor }) => ($bgColor ? $bgColor : blueGrey["900"])};
  pointer-events: none; //so that pointer events can pass through to track grid (and disable native wavesurfer pointer events)
`;
const WaveformContainer = styled("div")`
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Background = styled("div")<{
  $bgColor?: string;
}>`
  background: ${({ $bgColor }) => ($bgColor ? $bgColor : blueGrey["900"])};
  position: absolute;

  opacity: 0.5;
  height: 100%;
  width: 100%;
`;
export type TrackPresentation = {
  trackData: TrackData & { endBeat: number }; //because at this point, endBeat should have been calculated. When we have a separate TrackFile implementation, we can move the endBeat calculation there. Right now, pass it from outside
} & TrackStyleProps &
  PositionProps & { width: number };
type TrackStyleProps = {
  zIndex?: number;
};

export const Track: React.FC<TrackPresentation> = ({
  top,
  left,
  height,
  width,
  trackData,
}) => {
  //todo we need a factory for trackSynth and trackFile eventually. Then this Track will become truly dumb as only the TrackFile implementation will contain wavesurfer
  const { waveformContainer } = useSyncedWavesurfer({
    audioUri: (trackData as TrackFile).audioUri,
    startBeat: trackData.startBeat,
    endBeat: trackData.endBeat,
    progressColor: grey["A400"],
    waveColor: grey["A100"],
  });

  return (
    <AbsoluteContainer
      $bgColor={trackData.bgColor}
      $height={height}
      $width={width}
      $left={left}
      $top={top}
    >
      <Background $bgColor={trackData.bgColor} />
      <WaveformContainer ref={waveformContainer} />
    </AbsoluteContainer>
  );
};
