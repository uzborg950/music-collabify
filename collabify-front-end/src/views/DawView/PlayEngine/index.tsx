import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useLayoutEffect } from "react";
import { increaseCurrentBeat } from "../../../redux/playback/playbackSlice";

const UPDATE_INTERVAL = 10;
export const PlayEngine = () => {
  const isPlaying = useAppSelector((state) => state.playback.isPlaying);
  const bpm = useAppSelector((state) => state.playback.bpm);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    if (!isPlaying) return;
    const beatsPerMs = bpm / (60 * 1000);
    const beatsIncrementsAtInterval = beatsPerMs * UPDATE_INTERVAL;
    const currentBeatUpdater = setInterval(() => {
      dispatch(increaseCurrentBeat(beatsIncrementsAtInterval));
    }, UPDATE_INTERVAL);
    return () => {
      clearInterval(currentBeatUpdater);
    };
  }, [isPlaying, bpm, dispatch]);

  return null;
};
