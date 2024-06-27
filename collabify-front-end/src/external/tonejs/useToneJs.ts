/*
Exposes tone js api in an abstracted manner
This can be converted into a parameterised factory to get a particular api function, however -
Currently we just keep all state at the top level and expose all functions. We can later limit scope once we get more experience
with tonejs in practice
 */
import { ToneJSAction, ToneJSState } from "./reducer/toneJSReducer";
import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";

export type ToneJSProps = {};
export const useToneJs = ({
  state,
  dispatch,
}: {
  state: ToneJSState;
  dispatch: React.Dispatch<ToneJSAction>;
}) => {
  const isPlaying = useAppSelector((state) => state.playback.isPlaying);
  const currentBeat = useAppSelector((state) => state.playback.currentBeat);
  // state.playersById["abc"]?.seek(0.4, "+1");

  useEffect(() => {
    Object.entries(state.playersById).forEach(([playerId, trackPlayer]) => {
      if (isPlaying) {
      } else {
        trackPlayer.player.stop();
      }
    });
  }, [isPlaying, currentBeat]);
};
