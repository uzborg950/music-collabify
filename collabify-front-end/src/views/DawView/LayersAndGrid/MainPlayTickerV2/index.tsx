import React from "react";
import { getBeatWidth } from "../constants";
import { useAppSelector } from "../../../../redux/hooks";
import { GridPlayTicker } from "../../../../ui/GridPlayTicker";

type MainPlayTickerProps = {
  startCol: number;
  startRow: number;
};
export const MainPlayTickerV2: React.FC<MainPlayTickerProps> = ({
  startCol,
  startRow,
}) => {
  const currentBeat = useAppSelector((state) => state.playback.currentBeat);
  return (
    <GridPlayTicker
      gridCol={`${startCol}`}
      gridRow={`${startRow}/-1`}
      translateX={`${currentBeat * getBeatWidth()}px`}
    />
  );
};
