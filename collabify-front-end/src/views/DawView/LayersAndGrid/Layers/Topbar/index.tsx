import React, { useState } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import FiberManualRecordTwoToneIcon from "@mui/icons-material/FiberManualRecordTwoTone";
import { blueGrey, red } from "@mui/material/colors";
import {
  ControlButtonBaseContainer,
  ControlButtonIconContainer,
} from "../common";
import { StopCircleTwoTone } from "@mui/icons-material";

const TopbarContainer = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TextContainer = styled("div")``;
const TopbarRightButtonContainer = styled(ControlButtonBaseContainer)<{
  $active: boolean;
  $color: string;
}>`
  justify-self: flex-end;

  color: ${(props) => (props.$active ? blueGrey[900] : props.$color)};
  background: ${(props) => (props.$active ? props.$color : blueGrey[900])};
  animation: ${(props) => (props.$active ? "pulse 1s infinite ease" : "unset")};

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;
const RecordButton = styled(FiberManualRecordTwoToneIcon)``;
const StopButton = styled(StopCircleTwoTone)``;
type TopbarProps = {
  name: string; //todo could be passed via context, list of layer objects referenced with index
} & RecordProps;
type RecordProps = {
  layerIndex: number;
  onRecordClick: () => void;
  onRecordStopClick: () => void;
  recordingState: { isActive: boolean; activeLayerIndex?: number };
};
const RecordOrStop: React.FC<RecordProps> = ({
  onRecordClick,
  recordingState,
  layerIndex,
  onRecordStopClick,
}) => {
  if (recordingState.isActive && recordingState.activeLayerIndex === layerIndex)
    return (
      <TopbarRightButtonContainer
        onClick={onRecordStopClick}
        $active={true}
        $color={red["500"]}
      >
        <StopButton />
      </TopbarRightButtonContainer>
    );

  return (
    <TopbarRightButtonContainer
      onClick={onRecordClick}
      $disabled={
        recordingState.isActive &&
        recordingState.activeLayerIndex !== layerIndex
      }
      $active={
        recordingState.isActive &&
        recordingState.activeLayerIndex === layerIndex
      }
      $color={red["500"]}
    >
      <RecordButton />
    </TopbarRightButtonContainer>
  );
};
export const Topbar: React.FC<TopbarProps> = (props) => {
  return (
    <TopbarContainer>
      <TextContainer>
        <Typography variant={"h5"} fontWeight={"bold"} color={"text.secondary"}>
          {props.name}
        </Typography>
      </TextContainer>
      <RecordOrStop {...props} />
    </TopbarContainer>
  );
};
