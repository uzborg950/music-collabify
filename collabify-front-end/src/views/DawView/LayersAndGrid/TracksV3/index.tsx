import React, { useMemo, useState } from "react";
import { getBeatWidth } from "../constants";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { LOCAL_TRACKS_DATA } from "../../../../mockData/tracks";

import { secondsToBeats } from "../../utils/playUtils";
import { useExtendBeatsToContent } from "./useExtendBeatsToContent";
import { TrackV3 } from "../../../../ui/TrackV3";
import { PlayStates } from "../../../../redux/playback/playbackSlice";
import { TrackData } from "../../../../redux/playlist/types";
import playlistSlice from "../../../../redux/playlist/playlistSlice";

type TracksProps = { startCol: number; startRow: number };

type RenderTrackProps = {
  trackData: TrackData;
  playbackState: PlaybackState;
  index: number;
} & TracksProps;
const RenderTrack: React.FC<RenderTrackProps> = (props) => {
  // const trackFileData = props.trackData as TrackBase & TrackFile;
  const dispatch = useAppDispatch(); //move to parent component
  const trackBeats = secondsToBeats({
    bpm: props.playbackState.bpm,
    seconds: props.trackData.lengthSeconds,
  });
  const width = trackBeats * getBeatWidth();
  const translateX = `${props.trackData.startBeat * getBeatWidth()}px`;

  const trackPresentationData = useMemo(
    () => ({
      ...props.trackData,
      // endBeat: 16, //convert playlist file length to endBeat here. Suppose we say 1 beat per second

      endBeat: props.trackData.startBeat + trackBeats, //convert playlist file length to endBeat here. Suppose we say 1 beat per second
    }),
    [props.trackData, trackBeats],
  );
  return (
    <TrackV3
      trackData={trackPresentationData}
      onContextMenu={(mouseEvent) => {
        mouseEvent.nativeEvent.stopImmediatePropagation();
        mouseEvent.stopPropagation();
        console.log(`right click event`, mouseEvent);
        dispatch(
          playlistSlice.actions.onTrackRemoved(trackPresentationData.id),
        );
      }}
      width={width}
      playbackState={props.playbackState}
      translateX={translateX}
      gridCol={`${props.startCol}`}
      gridRow={`${props.startRow + props.trackData.layerIndex}`}
      zIndex={1} //do we need this?
      key={props.index}
    />
  );
};
export type PlaybackState = {
  bpm: number;
  playState: PlayStates;
  currentBeat: number;
  seekBeat: number;
};
/*
Places each playlist in the corresponding grid row using grid-col and grid-row.
 */
export const TracksV3: React.FC<TracksProps> = (props) => {
  const nRows = useAppSelector((state) => state.playback.nLayers);
  const bpm = useAppSelector((state) => state.playback.bpm);
  const playState = useAppSelector((state) => state.playback.playState);
  const currentBeat = useAppSelector((state) => state.playback.currentBeat);
  const tracks = useAppSelector((state) => state.playlist.tracks);
  const seekBeat = useAppSelector((state) => state.playback.seekedBeat);
  // const [tracksData, setTracksData] = useState(LOCAL_TRACKS_DATA); //todo replace with actual api call for the current project/room
  useExtendBeatsToContent(tracks);

  const playbackState: PlaybackState = {
    bpm,
    playState,
    currentBeat,
    seekBeat,
  };
  return (
    <>
      {tracks.map((trackData, index) => (
        <RenderTrack
          key={index}
          trackData={trackData}
          index={index}
          playbackState={playbackState}
          {...props}
        />
      ))}
    </>
  );
};
