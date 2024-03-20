import React from "react";
import { TimelineGridProps } from "../../views/DawView/LayersAndGrid/types";
import { TimelineReferenceCell } from "./TimelineReferenceCell";

type TimelineReferenceBar2Props = {} & Pick<
  TimelineGridProps,
  "nCols" | "beatsPerBar"
>;
export const TimelineReferenceBar: React.FC<TimelineReferenceBar2Props> = (
  props,
) => {
  return (
    <>
      {[...Array(props.nCols)].map((_, index) => (
        <TimelineReferenceCell key={index} index={index} {...props} />
      ))}
    </>
  );
};
