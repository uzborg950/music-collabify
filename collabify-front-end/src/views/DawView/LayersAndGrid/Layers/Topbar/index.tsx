import React, { useState } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import FiberManualRecordTwoToneIcon from "@mui/icons-material/FiberManualRecordTwoTone";
import { blueGrey, red } from "@mui/material/colors";
import {
  ControlButtonBaseContainer,
  ControlButtonIconContainer,
} from "../common";

const TopbarContainer = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TextContainer = styled("div")``;
const TopbarRightButtonContainer = styled(ControlButtonBaseContainer)<{
  isOn: boolean;
  $color: string;
}>`
  justify-self: flex-end;

  color: ${(props) => (props.isOn ? blueGrey[900] : props.$color)};
  background: ${(props) => (props.isOn ? props.$color : blueGrey[900])};
`;
const RecordButton = styled(FiberManualRecordTwoToneIcon)``;

type TopbarProps = {
  name: string; //todo could be passed via context, list of layer objects referenced with index
  onRecordClick: () => void; //todo pass via context
};

export const Topbar: React.FC<TopbarProps> = ({ name, onRecordClick }) => {
  const [recordingActive, setRecordingActive] = useState<boolean>(false);
  return (
    <TopbarContainer>
      <TextContainer>
        <Typography variant={"h5"} fontWeight={"bold"} color={"text.secondary"}>
          {name}
        </Typography>
      </TextContainer>
      <TopbarRightButtonContainer
        onClick={() => {
          setRecordingActive((state) => !state);
          onRecordClick();
        }}
        isOn={recordingActive}
        $color={red["500"]}
      >
        <RecordButton />
      </TopbarRightButtonContainer>
    </TopbarContainer>
  );
};
