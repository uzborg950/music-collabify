import React from "react";
import { TimelineGridProps } from "../../views/DawView/LayersAndGrid/types";
import { TimelineReferenceCell } from "./TimelineReferenceCell";
import { useAppSelector } from "../../redux/hooks";

type TimelineReferenceBar2Props = {};
export const TimelineReferenceBar: React.FC<TimelineReferenceBar2Props> = (
  props,
) => {
  const beatsPerBar = useAppSelector((state) => state.playback.beatsPerBar);
  const nCols = useAppSelector((state) => state.playback.nBeats);

  return (
    <>
      {[...Array(nCols)].map((_, index) => (
        <TimelineReferenceCell
          key={index}
          index={index}
          beatsPerBar={beatsPerBar}
        />
      ))}
    </>
  );
};
