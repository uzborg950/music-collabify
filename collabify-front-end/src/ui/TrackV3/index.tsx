import React from "react";
import { styled } from "@mui/system";
import { blueGrey, grey } from "@mui/material/colors";
import { useWavesurferWaveform } from "../../external/wavesurfer/useWavesurferWaveform";
import { usePlayer } from "../../external/tonejs/hooks/player/usePlayer";
import { PlayStates } from "../../redux/playback/playbackSlice";
import { TrackData } from "../../redux/playlist/types";
import { PlaybackState } from "../../views/DawView/LayersAndGrid/TracksV3";

const GridCellContainer = styled("div")<{
  $bgColor?: string;
  $color?: string;
  $width: number;
  $gridCol: string;
  $gridRow: string;
  $translateX: string;
}>`
  box-sizing: border-box;
  grid-column: ${({ $gridCol }) => $gridCol};
  grid-row: ${({ $gridRow }) => $gridRow};

  width: ${(props) => props.$width}px;
  transform: translateX(${({ $translateX }) => $translateX});

  color: ${grey["A100"]};
  border-radius: 5px;
  border: 3px solid ${({ $bgColor }) => ($bgColor ? $bgColor : blueGrey["900"])};
  //pointer-events: none; //so that pointer events can pass through to playlist grid (and disable native wavesurfer pointer events)
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;
const WaveformContainer = styled("div")`
  height: 100%;
  pointer-events: none;
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
  trackData: TrackData & { endBeat: number }; //because at this point, endBeat should have been calculated. When we have a separate TrackFile implementation, we can move the endBeat calculation there. Right now, pass it from outside
  playbackState: PlaybackState;
  width: number;
  gridCol: string;
  gridRow: string;
  translateX: string;
  zIndex?: number;
} & EventListeners;
type EventListeners = {
  onContextMenu: (event: React.MouseEvent) => void;
};

export const TrackV3: React.FC<TrackProps> = ({
  gridCol,
  gridRow,
  width,
  translateX,
  trackData,
  playbackState,
  onContextMenu,
}) => {
  //todo we need a factory for trackSynth and trackFile eventually. Then this Track will become truly dumb as only the TrackFile implementation will contain wavesurfer
  const { waveformContainer } = useWavesurferWaveform({
    audioUri: trackData.audioUri,
    progressColor: grey["A400"],
    waveColor: grey["A100"],
  });
  usePlayer({
    playbackState,
    audioUri: trackData.audioUri,
    startBeat: trackData.startBeat,
    endBeat: trackData.endBeat,
  });

  //trigger on left segment to start?
  //trigger on right segment to stop?
  //onClick should seek?
  return (
    <GridCellContainer
      onContextMenu={onContextMenu}
      $bgColor={trackData.bgColor}
      $width={width}
      $translateX={translateX}
      $gridCol={gridCol}
      $gridRow={gridRow}
    >
      <Background $bgColor={trackData.bgColor} />
      <WaveformContainer ref={waveformContainer} />
    </GridCellContainer>
  );
};
