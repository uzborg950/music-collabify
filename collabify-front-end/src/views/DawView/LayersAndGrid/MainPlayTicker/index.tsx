import { PlayTicker } from "../../../../ui/PlayTicker";
import React, { useEffect, useRef, useState } from "react";
import { getLayersWidth, getTrackGridCellWidth } from "../constants";
import { useAppSelector } from "../../../../redux/hooks";
import { TrackGridRefsProps } from "../types";

type MainPlayTickerProps = {} & TrackGridRefsProps;
export const MainPlayTicker: React.FC<MainPlayTickerProps> = ({
  gridRef,
  startLocationDivRef,
}) => {
  const nRows = useAppSelector((state) => state.playback.nLayers);
  const currentBeat = useAppSelector((state) => state.playback.currentBeat);
  const isPlaying = useAppSelector((state) => state.playback.isPlaying);
  const bpm = useAppSelector((state) => state.playback.bpm);
  const [requestAnimationId, setRequestAnimationId] = useState<number>();
  const [left, setLeft] = useState<number>(
    (gridRef?.getBoundingClientRect()?.x ?? 0) + getLayersWidth(),
  );
  const playTickerRef = useRef<HTMLDivElement | null>(null);

  // todo  decide best way to use scroll into view to ensure heplful scoping + no disturbance for user
  //todo maybe dedicated button to scroll user into view
  // const isPlaying = useAppSelector((state) => state.playback.isPlaying);
  // useEffect(() => {
  //
  //   // Maybe i add a physical button to help user go to the play ticker
  //   if (currentBeat === 0) {
  //     startLocationDivRef?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "nearest",
  //       inline: "center",
  //     });
  //   }
  // }, [isPlaying, startLocationDivRef, currentBeat]);
  if (!startLocationDivRef || !gridRef) return null;
  const startLocationRect = startLocationDivRef.getBoundingClientRect(); //warning: non-reactive
  const gridRect = gridRef.getBoundingClientRect(); //warning: non-reactive

  const currentLeft = gridRect.x + getLayersWidth() + currentBeat * getTrackGridCellWidth();
  const height = startLocationRect.height * nRows;
  const top = -height; //default top is at the bottom of the trackgrid due to relative positioning. The negative top puts the line at the first cell
  return (
    <PlayTicker
      ref={playTickerRef}
      zIndex={1} //See collabify-front-end/reference/zIndexGrid.md
      left={currentLeft}
      height={height}
      top={top}
    />
  );
};
