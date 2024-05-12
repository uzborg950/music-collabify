import React, { useEffect, useMemo, useState } from "react";
import { Track } from "../../../../ui/Track";
import { getBeatWidth } from "../constants";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { LOCAL_TRACKS_DATA } from "../../../../mockData/tracks";
import { styled } from "@mui/system";
import { TrackBase, TrackData, TrackFile } from "../../types/trackTypes";
import { setNumBeats } from "../../../../redux/playback/playbackSlice";
import { secondsToBeats } from "../../utils/playUtils";
import { PositionProps } from "../../../../ui/types";
import { useExtendBeatsToContent } from "./useExtendBeatsToContent";

type TracksProps = { overlayArea: PositionProps };

type RenderTrackProps = {
  bpm: number;
  nRows: number;
  trackData: TrackData;
  index: number;
  overlayArea: PositionProps;
};
const RelativeContainer = styled("div")<{ $zIndex: number }>`
  position: relative;
  z-index: ${(props) => props.$zIndex};
  pointer-events: none;
`;
const RenderTrack: React.FC<RenderTrackProps> = (props) => {
  const trackFileData = props.trackData as TrackBase & TrackFile;
  //a track will be starting from grid + end of a layer + startBeat * cellwidth

  const trackBeats = secondsToBeats({
    bpm: props.bpm,
    seconds: trackFileData.length,
  });
  const width = trackBeats * getBeatWidth();
  const left =
    props.overlayArea.left + props.trackData.startBeat * getBeatWidth();
  const layerHeight = props.overlayArea.height / props.nRows;
  const top = props.overlayArea.top + props.trackData.layerIndex * layerHeight;

  const trackPresentationData = useMemo(
    () => ({
      ...props.trackData,
      endBeat: props.trackData.startBeat + trackBeats, //convert track file length to endBeat here. Suppose we say 1 beat per second
    }),
    [props.trackData, trackBeats],
  );
  return (
    <Track
      trackData={trackPresentationData}
      left={left}
      width={width}
      top={top}
      height={layerHeight}
      zIndex={1}
      key={props.index}
    />
  );
};
/*
Absolute positioned tracks placed on a TrackGrid
Note that this will actually not be part of the grid, rather absolutely positioned so that the track does not need
to be within the grid cell widths
 */
export const TracksV2: React.FC<TracksProps> = ({ overlayArea }) => {
  const nRows = useAppSelector((state) => state.playback.nLayers);
  const bpm = useAppSelector((state) => state.playback.bpm);
  const [tracksData, setTracksData] = useState(LOCAL_TRACKS_DATA); //todo replace with actual api call for the current project/room

  useExtendBeatsToContent(tracksData);

  return (
    <RelativeContainer $zIndex={0}>
      {tracksData.map((trackData, index) => (
        <RenderTrack
          key={index}
          bpm={bpm}
          nRows={nRows}
          trackData={trackData}
          overlayArea={overlayArea}
          index={index}
        />
      ))}
    </RelativeContainer>
  );
};
