import { getTransport, Player } from "tone";
import { useEffect, useRef } from "react";
import { beatsToSeconds } from "../../../../views/DawView/utils/playUtils";
import { PlaybackState } from "../../../../views/DawView/LayersAndGrid/TracksV3";

type PlayerProps = {
  audioUri: string;
  startBeat: number;
  endBeat: number;
  playbackState: PlaybackState;
};
type InternalPlayStates = "playing" | "stopped" | "loaded" | "uninitialized";

export const usePlayer = (props: PlayerProps) => {
  const playerRef = useRef<Player>();
  // const [action, setAction] = useState<'play'>()
  // const [internalPlayState, setInternalPlayState] =
  //   useState<InternalPlayStates>("uninitialized");
  const internalPlayState = useRef<InternalPlayStates>("uninitialized");

  const transportStatus = getTransport().state;
  useEffect(() => {
    if (playerRef.current) {
      console.log(
        "cannot replace an existin player,  investigate this. Skipping",
      );
      return;
    }
    playerRef.current = new Player(props.audioUri, () => {
      internalPlayState.current = "loaded";
    }).toDestination();
  }, [props.audioUri]);

  //TODO Bug: currentBeat change and late internalPlayState state change causes tonejs to play track twice (or more)
  //to fix this, we need to remove current beat from useEffect for playing
  useEffect(() => {
    if (internalPlayState.current === "uninitialized") return;
    console.log(props.playbackState, internalPlayState, transportStatus);
    if (
      internalPlayState.current === "playing" &&
      transportStatus === "started" &&
      (props.playbackState.currentBeat < props.startBeat ||
        props.playbackState.currentBeat > props.endBeat ||
        ["paused", "stopped"].includes(props.playbackState.playState))
    ) {
      //stop playing
      // console.log("stopping tonejs");
      playerRef.current?.stop();

      internalPlayState.current = "stopped";
    } else if (
      !["uninitialized", "playing"].includes(internalPlayState.current) &&
      transportStatus === "started" &&
      props.playbackState.currentBeat >= props.startBeat &&
      props.playbackState.currentBeat <= props.endBeat
    ) {
      const beatOffset = props.playbackState.currentBeat - props.startBeat;
      const secondsOffset = beatsToSeconds({
        bpm: props.playbackState.bpm,
        beats: beatOffset,
      });

      // console.log(`playing: ${props.audioUri}`);
      playerRef.current?.start();
      playerRef.current?.seek(secondsOffset);

      internalPlayState.current = "playing";
    }
  }, [
    props.playbackState.currentBeat,
    props.startBeat,
    props.endBeat,
    transportStatus,
    props.playbackState.playState,
  ]);

  useEffect(() => {
    if (internalPlayState.current === "playing") {
      const beatOffset = props.playbackState.seekBeat - props.startBeat;
      const secondsOffset = beatsToSeconds({
        bpm: props.playbackState.bpm,
        beats: beatOffset,
      });
      playerRef.current?.seek(secondsOffset);
    }
  }, [props.playbackState.seekBeat]);
};
