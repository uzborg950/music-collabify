import { PlayTicker } from "../../../../ui/PlayTicker";
import React from "react";
import { getBeatWidth } from "../constants";
import { PositionProps } from "../../../../ui/types";
import {useAppSelector} from "../../../../redux/hooks";

type MainPlayTickerProps = {
  overlayArea: PositionProps;
};
export const MainPlayTickerV2: React.FC<MainPlayTickerProps> = ({
  overlayArea,
}) => {
    const currentBeat = useAppSelector((state) => state.playback.currentBeat);

  return (
    <PlayTicker
      zIndex={1} //See collabify-front-end/reference/zIndexGrid.md
      left={overlayArea.left + currentBeat * getBeatWidth()}
      height={overlayArea.height}
      top={overlayArea.top}
    />
  );
};
