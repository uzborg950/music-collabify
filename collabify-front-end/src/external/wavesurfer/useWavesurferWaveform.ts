/*
Provide wavesurfer functionality + states
Handle all syncing of internal states and wavesurfer states here.
There is not very good dependency inversion here and could be later improved.

Todo - This has way too many states for complex cause-effects. Think of a way to compress all this. State/event driven architecture (automata)?
Is that even possible in react?

 */
import { useRef } from "react";
import { useWavesurfer } from "@wavesurfer/react";

type WaveSurferProviderProps = {
  audioUri: string;
  waveColor: string;
  progressColor: string;
};
export const useWavesurferWaveform = (props: WaveSurferProviderProps) => {
  const waveformContainer = useRef<HTMLDivElement | null>(null);

  const { isPlaying: isWavesurferPlaying, isReady: isWavesurferReady } =
    useWavesurfer({
      container: waveformContainer,
      height: "auto",
      waveColor: props.waveColor,
      progressColor: props.progressColor,
      url: props.audioUri,
      cursorWidth: 0,
      // plugins: useMemo(() => [Timeline.create()], []),
    });

  return { waveformContainer };
};
