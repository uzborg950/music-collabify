import React from "react";
import { PositionProps } from "../../../../ui/types";
import { MainPlayTickerV2 } from "../MainPlayTickerV2";
import { useAppSelector } from "../../../../redux/hooks";
import { TracksV2 } from "../TracksV2";

type AbsoluteOverlaysProps = {
  overlayArea: PositionProps;
};
export const AbsoluteOverlays: React.FC<AbsoluteOverlaysProps> = (props) => {
  const nLayers = useAppSelector((state) => state.playback.nLayers);

  return (
    <>
      <MainPlayTickerV2 overlayArea={props.overlayArea} />
      <TracksV2 overlayArea={props.overlayArea} />
    </>
  );
};
