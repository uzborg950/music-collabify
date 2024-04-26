import React from "react";
import { TrackGridRefsProps } from "../types";
import { TrackData } from "./types";
import { Track } from "../../../../ui/Track";
import { getLayersWidth, getTrackGridCellWidth } from "../constants";
import { useAppSelector } from "../../../../redux/hooks";
import { LOCAL_TRACKS_DATA } from "../../../../mockData/tracks";
import { styled } from "@mui/system";

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

  //a track will be starting from grid + end of a layer + startBeat * cellwidth
  const left =
    props.gridRect.x +
    getLayersWidth() +
    props.trackData.startBeat * getTrackGridCellWidth();

  const width =
    (props.trackData.endBeat - props.trackData.startBeat) *
    getTrackGridCellWidth();

  const deltaYFromRelativeContainerToLayer =
    (nRows - props.trackData.layerIndex) * props.startLocationRect.height;
  const height = props.startLocationRect.height;
  // return null;
  return (
    <Track
      trackData={props.trackData}
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
  if (!startLocationDivRef || !gridRef) return null;
  const startLocationRect = startLocationDivRef.getBoundingClientRect(); //warning: non-reactive
  const gridRect = gridRef.getBoundingClientRect(); //warning: non-reactive

  const data = LOCAL_TRACKS_DATA; //todo dev testing - replace with API streaming
  return (
    <RelativeContainer $zIndex={0}>
      {data.map((trackData, index) => (
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
