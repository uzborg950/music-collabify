import React from "react";
import * as Tone from "tone";
import {
  TrackData,
  TrackFileData,
  TrackFileDataInternal,
} from "../../../views/DawView/types/trackTypes";

type PlayStates = "playing" | "stopped" | "paused";
type TrackPlayer = {
  player: Tone.Player;
  playState: PlayStates;
  endBeat: number;
  startBeat: number;
};
export type ToneJSState = {
  //Add more tonejs specific constructables such as synths
  playersById: Record<string, TrackPlayer>; //decide if id should be playlist name or a slug
};

type ActionTypes = "pushPlayer" | "removePlayer";

type PushPlayerAction = {
  type: "pushPlayer";
  playState?: PlayStates;
  trackFileData: TrackFileDataInternal;
  id: string;
};
type RemovePlayerAction = {
  type: "removePlayer";
  id: string;
};
export type ToneJSAction = PushPlayerAction | RemovePlayerAction;

export const initState: ToneJSState = {
  playersById: {},
};
export const toneJSReducer: React.Reducer<ToneJSState, ToneJSAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case "pushPlayer":
      return {
        ...state,
        playersById: {
          ...state.playersById,
          [action.id]: {
            startBeat: action.trackFileData.startBeat,
            endBeat: action.trackFileData.endBeat,
            player: new Tone.Player(action.trackFileData.audioUri),
            playState: action.playState ?? "stopped",
          },
        },
      };
    case "removePlayer":
      const newPlayersById = { ...state.playersById };
      delete newPlayersById[action.id];
      return { ...state, playersById: newPlayersById };
  }
};
