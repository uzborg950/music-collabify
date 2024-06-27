import { AppDispatch } from "../../../../redux/store";
import { getBeatWidth } from "../constants";
import { seekTimeline } from "../../../../redux/playback/playbackSlice";
import React from "react";

export const onClick =
  ({
    dispatch,
    subdivisions,
  }: {
    subdivisions: number;
    dispatch: AppDispatch;
  }) =>
  (event: React.MouseEvent) => {
    const trackGrid = event.target as HTMLElement;
    const trackLeft = trackGrid.getBoundingClientRect();
    if (!trackLeft) return;
    const beatIndex = (event.clientX - trackLeft.left) / getBeatWidth();

    const subdivisionSize = 1 / subdivisions;
    const nearestSubDivision =
      Math.floor(beatIndex / subdivisionSize) * subdivisionSize;
    dispatch(seekTimeline(nearestSubDivision));
  };
