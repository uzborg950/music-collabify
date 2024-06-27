import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import { Topbar } from "./Topbar";
import { LayerControls } from "./LayerControls";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import playbackSlice, {
  onRecordClicked,
  onRecordSaved,
  onStopClicked,
} from "../../../../redux/playback/playbackSlice";
import { useMediaRecord } from "../../recordUtils/useMediaRecord";
import playlistSlice from "../../../../redux/playlist/playlistSlice";
import { buildDefaultTrack } from "../../../../redux/playlist/utils";
import { v4 } from "uuid";

const LayerContainer = styled("div")<{ gridCol: number }>`
  display: flex;
  flex-direction: column;
  padding: 4px 8px;

  background: ${grey["900"]};
  border-top: 1px solid ${(props) => props.theme.palette.background.default};
  border-bottom: 1px solid ${(props) => props.theme.palette.background.default};
  grid-column: ${(props) => props.gridCol};
  position: sticky;
  left: 0;
  gap: 8px;

  border-radius: 5px;
  z-index: 3;
`;

type LayerProps = {
  index: number;
  name?: string;
  onRecordClick: () => void;
  onRecordStopClick: () => void;
  recordingState: { isActive: boolean; activeLayerIndex?: number };
} & LayersProps;
export const Layer: React.FC<LayerProps> = (props) => {
  //   onRecordClick should be via context, so remove passing here
  // useEffect(() => {
  //   return () => {
  //     props.onRecordStopClick();
  //   };
  // }, [props.onRecordStopClick]);
  return (
    <LayerContainer gridCol={props.gridCol} id={`layer-${props.index + 1}`}>
      <Topbar
        layerIndex={props.index}
        name={props.name ?? `Layer ${props.index + 1}`}
        onRecordClick={props.onRecordClick}
        onRecordStopClick={props.onRecordStopClick}
        recordingState={props.recordingState}
      />
      <LayerControls />
    </LayerContainer>
  );
};

type LayersProps = { gridCol: number };
export const Layers: React.FC<LayersProps> = (props) => {
  const [recordingLayerIndex, setRecordingLayerIndex] = useState<number>();
  //todo Load layers data, nRows should be equal to number of layers
  //if not then add an error
  const nRows = useAppSelector((state) => state.playback.nLayers);
  // const currentBeat = useAppSelector((state) => state.playback.currentBeat);
  const playState = useAppSelector((state) => state.playback.playState);
  const dispatch = useAppDispatch();

  const { stopRecording, startRecording, recordMetadata } = useMediaRecord();
  const recordState = useAppSelector((state) => state.playback.recordState);

  useEffect(() => {
    if (!recordMetadata || !recordState) return;
    //--The following should be exported from a useUpload hook--
    //save new track to mongodb

    //add new track to trackData redux
    const id = v4();

    const defaultTrack = buildDefaultTrack();
    const newTrack = {
      ...defaultTrack,
      id,
      layerIndex: recordState.layerIndex,
      startBeat: recordState.startBeat,
      lengthSeconds: recordMetadata.lengthSeconds,
      audioUri: recordMetadata.audioUri,
    };
    console.log(`new track added ${newTrack}`);
    dispatch(playlistSlice.actions.onTrackAdded(newTrack));
    dispatch(onRecordSaved());
    //-----
  }, [recordMetadata, recordState]);
  return (
    <>
      {[...Array(nRows)].map((_, index) => (
        <Layer
          index={index}
          onRecordClick={() => {
            dispatch(onRecordClicked({ layerIndex: index }));
            setRecordingLayerIndex(index);

            startRecording();
          }}
          onRecordStopClick={() => {
            stopRecording();
            dispatch(onStopClicked());
          }}
          recordingState={{
            isActive: playState === "recording",
            activeLayerIndex: recordingLayerIndex,
          }}
          {...props}
        />
      ))}
    </>
  );
};
