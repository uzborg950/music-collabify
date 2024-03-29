import { Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import { blueGrey } from "@mui/material/colors";
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

export const PlaybackScreen: React.FC = () => {
  return (
    <PlaybackScreenContainer>
      <Typography fontWeight={"bold"} variant={"subtitle1"} fontSize={"40px"}>
        00:00
      </Typography>
    </PlaybackScreenContainer>
  );
};
