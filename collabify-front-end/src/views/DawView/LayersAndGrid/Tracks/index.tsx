import React, { useEffect, useMemo, useState } from "react";
import { TrackGridRefsProps } from "../types";
import { Track } from "../../../../ui/Track";
import { getLayersWidth, getTrackGridCellWidth } from "../constants";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { LOCAL_TRACKS_DATA } from "../../../../mockData/tracks";
import { styled } from "@mui/system";
import { TrackBase, TrackData, TrackFile } from "../../types/trackTypes";
import { setNumBeats } from "../../../../redux/playback/playbackSlice";
import { secondsToBeats } from "../../utils/playUtils";

type TracksProps = {} & TrackGridRefsProps;

type RenderTrackProps = {
  trackData: TrackData;
  index: number;
  startLocationRect: DOMRect;
  gridRect: DOMRect;
};
const RelativeContainer = styled("div")<{ $zIndex: number }>`
  position: relative;
  z-index: ${(props) => props.$zIndex};
  pointer-events: none;
`;
const RenderTrack: React.FC<RenderTrackProps> = (props) => {
  const nRows = useAppSelector((state) => state.playback.nLayers);
  const bpm = useAppSelector((state) => state.playback.bpm);
  const trackFileData = props.trackData as TrackBase & TrackFile;
  //a track will be starting from grid + end of a layer + startBeat * cellwidth
  const left =
    props.gridRect.x +
    getLayersWidth() +
    props.trackData.startBeat * getTrackGridCellWidth();

  const trackBeats = secondsToBeats({ bpm, seconds: trackFileData.length });
  const width = trackBeats * getTrackGridCellWidth();

  const deltaYFromRelativeContainerToLayer =
    (nRows - props.trackData.layerIndex) * props.startLocationRect.height;
  const height = props.startLocationRect.height;
  // return null;
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
      top={-deltaYFromRelativeContainerToLayer}
      height={height}
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
export const Tracks: React.FC<TracksProps> = ({
  startLocationDivRef,
  gridRef,
}) => {
  const nBeats = useAppSelector((state) => state.playback.nBeats);
  const bpm = useAppSelector((state) => state.playback.bpm);
  const dispatch = useAppDispatch();
  const [tracksData, setTracksData] = useState(LOCAL_TRACKS_DATA); //todo replace with actual api call for the current project/room

  useEffect(() => {
    /*
    Sets the nBeats state (to increase track grid size) when data is loaded having greater number of beats
     */
    const maxBeats = tracksData.reduce((maxBeat, trackData) => {
      const beats = secondsToBeats({ bpm, seconds: trackData.length });
      if (trackData.startBeat + beats > maxBeat)
        return trackData.startBeat + beats;
      return maxBeat;
    }, 0);

    if (maxBeats > nBeats) {
      dispatch(setNumBeats(maxBeats + (maxBeats % 4) + 16)); //resize to size of track of max length + remaining beats to complete the bar + 2 bars extra
    }
  }, [tracksData, nBeats, dispatch, bpm]);

  if (!startLocationDivRef || !gridRef) return null;
  const startLocationRect = startLocationDivRef.getBoundingClientRect(); //warning: non-reactive
  const gridRect = gridRef.getBoundingClientRect(); //warning: non-reactive

  return (
    <RelativeContainer $zIndex={0}>
      {tracksData.map((trackData, index) => (
        <RenderTrack
          key={index}
          trackData={trackData}
          startLocationRect={startLocationRect}
          gridRect={gridRect}
          index={index}
        />
      ))}
    </RelativeContainer>
  );
};
