import React from "react";
import { styled } from "@mui/system";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import FiberManualRecordTwoToneIcon from "@mui/icons-material/FiberManualRecordTwoTone";

import { blueGrey, grey, red } from "@mui/material/colors";
import { IconButton, Typography } from "@mui/material";

const Container = styled("div")`
  top: 0;
  width: 100%;
  max-height: 86px;
  padding: 8px 0;
  display: flex;
  flex-direction: row;
  background: ${blueGrey["900"]};
  justify-content: center;
  align-items: center;
  color: ${blueGrey["100"]};
  gap: 5px;
`;
const IconWrapper = styled(IconButton)`
  display: flex;
  width: 64px;
  height: 64px;
  border-radius: 8px;
  box-shadow:
    0 4px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 4px 0 rgba(0, 0, 0, 0.19);

  background: ${grey["900"]};

  justify-content: center;
  align-items: center;
`;
const PlayIcon = styled(PlayCircleOutlineOutlinedIcon)`
  width: 56px;
  height: 56px;
`;
const StopIcon = styled(StopCircleOutlinedIcon)`
  width: 56px;
  height: 56px;
`;
const RecordIcon = styled(FiberManualRecordTwoToneIcon)`
  width: 56px;
  height: 56px;
  color: ${red["500"]};
`;
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

const PlaybackScreen: React.FC = () => {
  return (
    <PlaybackScreenContainer>
      <Typography fontWeight={"bold"} variant={"subtitle1"} fontSize={"40px"}>
        00:00
      </Typography>
    </PlaybackScreenContainer>
  );
};
export const PlaybackBar: React.FC = () => {
  return (
    <Container>
      <IconWrapper>
        <PlayIcon />
      </IconWrapper>
      <IconWrapper>
        <StopIcon />
      </IconWrapper>
      <PlaybackScreen />
      <IconWrapper>
        <RecordIcon />
      </IconWrapper>
    </Container>
  );
};
