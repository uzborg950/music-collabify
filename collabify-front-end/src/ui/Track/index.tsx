import React, { useEffect, useMemo, useRef, useState } from "react";
import { styled } from "@mui/system";
import { blueGrey, grey } from "@mui/material/colors";
import { PositionProps } from "../types";
import { TrackData } from "../../views/DawView/LayersAndGrid/Tracks/types";
import WaveSurfer from "wavesurfer.js";
import { useWavesurfer } from "@wavesurfer/react";
import { useAppSelector } from "../../redux/hooks";

const RelativeContainer = styled("div")<{ $zIndex?: number }>`
  position: relative;
  z-index: ${(props) => props.$zIndex};
`;
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
export type TrackProps = {
  trackData: TrackData;
} & TrackStyleProps &
  PositionProps & { width: number };
type TrackStyleProps = {
  zIndex?: number;
};

export const Track: React.FC<TrackProps> = ({
  top,
  left,
  height,
  width,
  zIndex,
  trackData,
}) => {
  const isPlaying = useAppSelector((state) => state.playback.isPlaying);
  const waveformContainer = useRef<HTMLDivElement | null>(null);
  const currentBeat = useAppSelector((state) => state.playback.currentBeat);
  // const [wavesurferInst, setWavesurferInst] = useState<WaveSurfer | null>(null);
  // console.log(top, trackData.title, trackData.layerIndex);
  const {
    wavesurfer,
    isPlaying: isWavesurferPlaying,
    currentTime,
  } = useWavesurfer({
    container: waveformContainer,
    height: "auto",
    waveColor: grey["A100"],
    progressColor: grey["A400"],
    url: trackData.audioUri,
    // plugins: useMemo(() => [Timeline.create()], []),
  });

  useEffect(() => {
    /*
    Controls play/stop of the wavesurfer player
     */
    if (
      isPlaying &&
      !isWavesurferPlaying &&
      currentBeat >= trackData.startBeat &&
      currentBeat < trackData.endBeat
    ) {
      // console.log("playing wavesurfer");
      wavesurfer?.play();
    } else if (currentBeat > trackData.endBeat) wavesurfer?.stop();
  }, [currentBeat, isPlaying, isWavesurferPlaying, trackData, wavesurfer]);

  useEffect(() => {
    if (!isPlaying && isWavesurferPlaying) {
      // console.log("pausing");
      wavesurfer?.pause();
    } else if (!isPlaying && currentBeat === 0) {
      // console.log("stopping");
      wavesurfer?.stop();
    }
  }, [isPlaying, isWavesurferPlaying, currentBeat, wavesurfer]);

  // console.log(trackData.layerIndex, waveformContainer);
  return (
    // <RelativeContainer $zIndex={zIndex} id={`track-${trackData.title}`}>
    <AbsoluteContainer
      // ref={waveformContainer}
      $bgColor={trackData.bgColor}
      $height={height}
      $width={width}
      $left={left}
      $top={top}
    >
      <Background $bgColor={trackData.bgColor} />
      <WaveformContainer ref={waveformContainer} />
    </AbsoluteContainer>
    // </RelativeContainer>
  );
};
