import { BeatInitProps, CSSGridProps } from "../types";
import React from "react";

export type TrackGridV2Props = {
  nRows: number;
} & BeatInitProps &
  CSSGridProps &
  GridRowListeners;

export type GridRowListeners = {
  onClick: (event: React.MouseEvent) => void;
};
