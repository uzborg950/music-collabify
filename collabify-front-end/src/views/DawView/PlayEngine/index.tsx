import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { MutableRefObject, useEffect, useRef } from "react";
import { setCurrentBeat } from "../../../redux/playback/playbackSlice";
import { AppDispatch } from "../../../redux/store";

const updateCurrentBeat = ({
  startTime,
  startBeat,
  bpm,
  dispatch,
  requestAnimationIdRef,
}: {
  startTime: number;
  startBeat: number;
  bpm: number;
  dispatch: AppDispatch;
  requestAnimationIdRef: MutableRefObject<number | undefined>;
}) => {
  const currentTime = performance.now();
  const elapsedTimeMs = currentTime - startTime;

  //find how much pixels to increment to left.
  const beatsPerMs = bpm / (60 * 1000);
  const totalBeats = beatsPerMs * elapsedTimeMs;
  dispatch(setCurrentBeat(totalBeats + startBeat));
  //the "recursive" call below makes this function keep going
  requestAnimationIdRef.current = requestAnimationFrame(() =>
    updateCurrentBeat({
      startTime,
      startBeat,
      bpm,
      dispatch,
      requestAnimationIdRef,
    }),
  );
};
/*
This is responsible for maintaining currentBeat while playing is active
//todo optimize this so that dispatching frequent redux actions is avoided. Maybe have a separate redux state for
showing play ticker currentBeat and separate debounced one for showing actual beat?
 */
export const PlayEngine = () => {
  const isPlaying = useAppSelector((state) => state.playback.isPlaying);
  const bpm = useAppSelector((state) => state.playback.bpm);
  const seekedBeat = useAppSelector((state) => state.playback.seekedBeat);
  const requestAnimationIdRef = useRef<number | undefined>(); //setting a ref so each RAF does not trigger a render
  const currentBeat = useAppSelector((state) => state.playback.currentBeat);
  const dispatch = useAppDispatch();

  useEffect(() => {
    /*
    To stop playing by stopping the existing RAF
     */
    if (isPlaying) return;

    if (requestAnimationIdRef.current === undefined) return;

    cancelAnimationFrame(requestAnimationIdRef.current);
    requestAnimationIdRef.current = undefined;
  }, [isPlaying, dispatch]);

  useEffect(() => {
    /*
    To seek to a particular beat by stopping the existing RAF first and then setting current beat
     */
    if (requestAnimationIdRef.current) {
      cancelAnimationFrame(requestAnimationIdRef.current);
      requestAnimationIdRef.current = undefined;
    }
    dispatch(setCurrentBeat(seekedBeat));
  }, [dispatch, seekedBeat]); //on purpose, only change due to seekedBeat. If seeking done and a requestAnimation was active, then disabled the requestAnimation

  useEffect(() => {
    /*
    To first a RAF every smallest interval (compatible with the browser) and at each RAF, update the current beat
     */

    if (requestAnimationIdRef.current || !isPlaying) return; //do not continue if not playing, or RAF already exists
    const startTime = performance.now();
    updateCurrentBeat({
      startTime,
      startBeat: currentBeat,
      bpm,
      dispatch,
      requestAnimationIdRef,
    });
  }, [bpm, dispatch, currentBeat, isPlaying]);

  return null;
};
