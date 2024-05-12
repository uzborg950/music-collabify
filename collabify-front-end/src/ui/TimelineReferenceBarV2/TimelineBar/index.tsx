import { styled, Typography } from "@mui/material";
import React from "react";
import { TimelineReferenceBarProps } from "../types";
import { blueGrey, grey } from "@mui/material/colors";

const Container = styled("div")<{ $barWidth: number; $beatWidth: number }>`
  box-sizing: border-box;
  padding-left: 8px;
  display: flex;
  border-left: 2px solid ${grey["900"]};
  flex: 0 0 ${({ $barWidth }) => $barWidth}px;
  background: ${blueGrey["800"]};
  border-top: 1px solid ${grey["900"]};
  border-bottom: 1px solid ${grey["900"]};

  align-items: center;
`;

type TimelineBarProps = {
  barNum: number;
} & TimelineReferenceBarProps;
export const TimelineBar: React.FC<TimelineBarProps> = ({
  barNum,
  ...props
}) => {
  return (
    <Container
      $beatWidth={props.beatWidth}
      $barWidth={props.beatsPerBar * props.beatWidth}
    >
      <Typography variant={"subtitle1"} color={"text.secondary"}>
        {barNum}
      </Typography>
    </Container>
  );
};
