import React, { forwardRef } from "react";
import { GridRow } from "./GridRow";
import { TrackGridV2Props } from "./types";

export const TrackGridV2 = forwardRef<HTMLDivElement | null, TrackGridV2Props>(
  (props, firstGridRowRef) => {
    return (
      <>
        {[...Array(props.nRows)].map((_, rowIndex) => (
          <GridRow
            {...props}
            rowIndex={rowIndex}
            ref={rowIndex === 0 ? firstGridRowRef : null}
          />
        ))}
      </>
    );
  },
);
