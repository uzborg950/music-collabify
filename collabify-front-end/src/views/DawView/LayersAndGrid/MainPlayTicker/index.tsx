import { PlayTicker } from "../../../../ui/PlayTicker";
import React from "react";
import { LAYERS_WIDTH, TRACK_GRID_CELL_WIDTH } from "../constants";
import { useAppSelector } from "../../../../redux/hooks";

type MainPlayTickerProps = {
  nCols: number;
  bpm: number;
  gridRef: HTMLDivElement | null;
};
export const MainPlayTicker: React.FC<MainPlayTickerProps> = ({
  nCols,
  gridRef,
  bpm,
}) => {
  const currentBeat = useAppSelector((state) => state.playback.currentBeat);
  const isPlaying = useAppSelector((state) => state.playback.isPlaying);
  return (
    <PlayTicker
      bpm={bpm}
      nBeats={nCols}
      referenceElement={gridRef}
      offsetX={
        parseInt(LAYERS_WIDTH.slice(0, -2)) +
        currentBeat * parseInt(TRACK_GRID_CELL_WIDTH.slice(0, -2))
      }
    />
  );
};
