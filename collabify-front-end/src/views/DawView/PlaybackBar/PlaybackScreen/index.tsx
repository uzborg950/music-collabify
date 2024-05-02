import { Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import { blueGrey } from "@mui/material/colors";
import { useAppSelector } from "../../../../redux/hooks";
import { current } from "@reduxjs/toolkit";
const PlaybackScreenContainer = styled("div")`
  background: ${blueGrey["A200"]};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  color: ${blueGrey["700"]};
  height: 80%;
  border-radius: 5px;
`;

const formatTo2Digit = (value: number) =>
  value.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

export const PlaybackScreen: React.FC = () => {
  const currentBeat = useAppSelector((state) => state.playback.currentBeat);
  const bpm = useAppSelector((state) => state.playback.bpm);

  const currentMinutes = currentBeat / bpm;
  const formattedTime = `${formatTo2Digit(Math.floor(currentMinutes))}:${formatTo2Digit(Math.floor((currentMinutes % 1) * 60))}`;
  return (
    <PlaybackScreenContainer>
      <Typography fontWeight={"bold"} variant={"subtitle1"} fontSize={"40px"}>
        {formattedTime}
      </Typography>
    </PlaybackScreenContainer>
  );
};
