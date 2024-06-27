import { styled } from "@mui/system";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import FiberManualRecordTwoToneIcon from "@mui/icons-material/FiberManualRecordTwoTone";
import { red } from "@mui/material/colors";

export const PlayIcon = styled(PlayCircleOutlineOutlinedIcon)`
  width: 56px;
  height: 56px;
`;
export const StopIcon = styled(StopCircleOutlinedIcon)`
  width: 56px;
  height: 56px;
`;
export const RecordIcon = styled(FiberManualRecordTwoToneIcon)`
  width: 56px;
  height: 56px;
  color: ${red["500"]};
`;
