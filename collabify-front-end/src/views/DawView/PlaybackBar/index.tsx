import React, { useEffect } from "react";
import { styled } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { blueGrey } from "@mui/material/colors";
import {
  onPlayClicked,
  onStopClicked,
} from "../../../redux/playback/playbackSlice";
import { IconWrapper } from "./common";
import { PlayIcon, RecordIcon, StopIcon } from "./playbackButtons";
import { PlaybackScreen } from "./PlaybackScreen";
import { SubdivisionSelect } from "./SubdivisionSelect";
import { BpmInput } from "./BpmInput";
import * as Tone from "tone";
const Container = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 24px;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100%;
  max-height: 86px;
  padding: 8px 0;
`;
const CenterContainer = styled("div")`
  display: flex;
  flex-direction: row;
  background: ${blueGrey["900"]};
  //justify-content: center;
  //align-items: center;
  color: ${blueGrey["100"]};
  gap: 5px;
`;

const GroupContainer = styled("div")`
  //justify-content: center;
  //align-items: center;
`;
export const PlaybackBar: React.FC = () => {
  const isPlaying = useAppSelector((state) => state.playback.isPlaying);
  const playState = useAppSelector((state) => state.playback.playState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    /*
        @deprecated: todo remove this Effect and move transport code to a dedicated toneJs manager hook.
    */
    switch (playState) {
      case "playing":
        Tone.getTransport().start();
        return;
      case "paused":
        Tone.getTransport().pause();
        return;
      case "stopped":
        Tone.getTransport().stop();
        return;
    }
  }, [playState]);
  return (
    <Container>
      <GroupContainer>
        <BpmInput />
      </GroupContainer>
      <GroupContainer>
        <CenterContainer>
          <IconWrapper
            isPressed={isPlaying}
            color={isPlaying ? "primary" : "default"}
            onClick={() => dispatch(onPlayClicked())}
          >
            <PlayIcon />
          </IconWrapper>
          <IconWrapper onClick={() => dispatch(onStopClicked())}>
            <StopIcon />
          </IconWrapper>
          <PlaybackScreen />
          <IconWrapper>
            <RecordIcon />
          </IconWrapper>
        </CenterContainer>
      </GroupContainer>
      <GroupContainer>
        <SubdivisionSelect />
      </GroupContainer>
    </Container>
  );
};
