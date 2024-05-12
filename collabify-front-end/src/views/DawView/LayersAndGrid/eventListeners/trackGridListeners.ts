import { AppDispatch } from "../../../../redux/store";
import { getBeatWidth } from "../constants";
import { seekTimeline } from "../../../../redux/playback/playbackSlice";
import React from "react";

export const onClick =
  ({
    trackGridLeft,
    dispatch,
    subdivisions,
  }: {
    trackGridLeft?: number;
    subdivisions: number;
    dispatch: AppDispatch;
  }) =>
  (event: React.MouseEvent) => {
    if (!trackGridLeft) return;

    const beatIndex = (event.clientX - trackGridLeft) / getBeatWidth();

    const subdivisionSize = 1 / subdivisions;
    const nearestSubDivision =
      Math.floor(beatIndex / subdivisionSize) * subdivisionSize;
    dispatch(seekTimeline(nearestSubDivision));
  };
