import { PlayTicker } from "../../../../ui/PlayTicker";
import React, { useEffect, useRef } from "react";
import { LAYERS_WIDTH, TRACK_GRID_CELL_WIDTH } from "../constants";
import { useAppSelector } from "../../../../redux/hooks";

type MainPlayTickerProps = {
  gridRef: HTMLDivElement | null;
  startLocationDivRef: HTMLDivElement | null; //todo pass ref or better to pass bounding client rect  (better closed control)
};
export const MainPlayTicker: React.FC<MainPlayTickerProps> = ({
  gridRef,
  startLocationDivRef,
}) => {
  const nRows = useAppSelector((state) => state.playback.nLayers);
  const currentBeat = useAppSelector((state) => state.playback.currentBeat);
  const isPlaying = useAppSelector((state) => state.playback.isPlaying);
  const playTickerRef = useRef<HTMLDivElement | null>(null);
  // useEffect(() => {
  //   // todo  decide best way to use scroll into view to ensure heplful scoping + no disturbance for user
  //   // Maybe i add a physical button to help user go to the play ticker
  //   if (currentBeat === 0) {
  //     startLocationDivRef?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "nearest",
  //       inline: "center",
  //     });
  //   }
  // }, [isPlaying, startLocationDivRef, currentBeat]);
  return (
    <PlayTicker
      ref={playTickerRef}
      nRows={nRows}
      backgroundElementRef={gridRef}
      startLocationDivRef={startLocationDivRef}
      zIndex={1} //See collabify-front-end/reference/zIndexGrid.md
      offsetX={
        parseInt(LAYERS_WIDTH.slice(0, -2)) +
        currentBeat * parseInt(TRACK_GRID_CELL_WIDTH.slice(0, -2))
      }
    />
  );
};
