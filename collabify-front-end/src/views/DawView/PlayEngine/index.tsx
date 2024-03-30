import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useLayoutEffect } from "react";
import { increaseCurrentBeatLooped } from "../../../redux/playback/playbackSlice";

const UPDATE_INTERVAL = 40;

/*
This is responsible for maintaining currentBeat while playing is active
//todo optimize this so that dispatching frequent redux actions is avoided. Maybe have a separate redux state for
showing play ticker currentBeat and separate debounced one for showing actual beat?
 */
export const PlayEngine = () => {
  const isPlaying = useAppSelector((state) => state.playback.isPlaying);
  const bpm = useAppSelector((state) => state.playback.bpm);
  const nBeats = useAppSelector((state) => state.playback.nBeats);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    if (!isPlaying) return;
    const beatsPerMs = bpm / (60 * 1000);
    const beatsIncrementsAtInterval = beatsPerMs * UPDATE_INTERVAL;
    const currentBeatUpdater = setInterval(() => {
      dispatch(
        increaseCurrentBeatLooped({
          nBeats,
          incStep: beatsIncrementsAtInterval,
        }), //looped action will reset currentBeat to 0 when end of grid is reached
      );
    }, UPDATE_INTERVAL);
    return () => {
      clearInterval(currentBeatUpdater);
    };
  }, [isPlaying, bpm, dispatch, nBeats]);

  return null;
};
