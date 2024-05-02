/*
Provide wavesurfer functionality + states
Handle all syncing of internal states and wavesurfer states here.
There is not very good dependency inversion here and could be later improved.

Todo - This has way too many states for complex cause-effects. Think of a way to compress all this. State/event driven architecture (automata)?
Is that even possible in react?

 */
import { useAppSelector } from "../../redux/hooks";
import { useEffect, useRef } from "react";
import { useWavesurfer } from "@wavesurfer/react";

type WaveSurferProviderProps = {
  audioUri: string;
  startBeat: number;
  endBeat: number;
  waveColor: string;
  progressColor: string;
};
export const useSyncedWavesurfer = (props: WaveSurferProviderProps) => {
  const isInternalPlaying = useAppSelector((state) => state.playback.isPlaying);
  const waveformContainer = useRef<HTMLDivElement | null>(null);
  const currentBeat = useAppSelector((state) => state.playback.currentBeat);

  const {
    wavesurfer,
    isPlaying: isWavesurferPlaying,
    isReady: isWavesurferReady,
  } = useWavesurfer({
    container: waveformContainer,
    height: "auto",
    waveColor: props.waveColor,
    progressColor: props.progressColor,
    url: props.audioUri,
    // plugins: useMemo(() => [Timeline.create()], []),
  });

  const isWavesurferActuallyPlaying = isWavesurferPlaying && isWavesurferReady; //when it isn't ready, wavesurfer does not actually update time and causes some bugs with wavesurfer.stop()

  useEffect(() => {
    /*
    Controls play/stop of the wavesurfer player
     */
    if (
      //not need to check isWavesurferReady because wavesurfer can actually correctly play without it being ready (wtf i know). This is not the same as the stop() method which throws an error when isReady is false. The isReady attribute might be buggy within wavesurfer
      isInternalPlaying &&
      !isWavesurferPlaying &&
      currentBeat >= props.startBeat &&
      currentBeat < props.endBeat
    ) {
      wavesurfer?.play();
    } else if (currentBeat > props.endBeat) wavesurfer?.stop();
  }, [
    currentBeat,
    isWavesurferPlaying,
    props.endBeat,
    wavesurfer,
    isInternalPlaying,
    props.startBeat,
  ]);

  useEffect(() => {
    if (!isInternalPlaying && isWavesurferActuallyPlaying) {
      wavesurfer?.pause();
    } else if (
      !isInternalPlaying &&
      currentBeat === 0 &&
      isWavesurferReady //if it wasn't ready, then this will throw an error
    ) {
      wavesurfer?.stop();
    }
  }, [isInternalPlaying, isWavesurferReady, currentBeat, wavesurfer]);

  return { waveformContainer };
};
