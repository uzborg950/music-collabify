import { styled } from "@mui/system";
import React from "react";
import { TimelineBar } from "./TimelineBar";
import { TimelineReferenceBarProps } from "./types";

const Container = styled("div")<{ $beatWidth: number }>`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;

  //z-index: 2; // (inherited from v1). See collabify-front-end/reference/zIndexGrid.md
`;

/*
Flexed reference bar to check current bar/beat.
 */
export const TimelineReferenceBarV2: React.FC<TimelineReferenceBarProps> = (
  props,
) => {
  return (
    <Container $beatWidth={props.beatWidth}>
      {[...Array(props.nBeats / props.beatsPerBar)].map((_, beatIndex) => (
        <TimelineBar key={beatIndex} barNum={beatIndex} {...props} />
      ))}
    </Container>
  );
};
