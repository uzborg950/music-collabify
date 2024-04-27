/*
Provide wavesurfer functionality + states
Handle all syncing of internal states and wavesurfer states here.
There is not very good dependency inversion here and could be later improved.
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
      isInternalPlaying &&
      !isWavesurferPlaying &&
      isWavesurferReady &&
      currentBeat >= props.startBeat &&
      currentBeat < props.endBeat
    ) {
      wavesurfer?.play();
    } else if (currentBeat > props.endBeat) wavesurfer?.stop();
  }, [
    isWavesurferReady,
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
    } else if (!isInternalPlaying && currentBeat === 0) {
      wavesurfer?.stop();
    }
  }, [isInternalPlaying, isWavesurferActuallyPlaying, currentBeat, wavesurfer]);

  return { waveformContainer };
};
