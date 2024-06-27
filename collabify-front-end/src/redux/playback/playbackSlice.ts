import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type PlayStates = "playing" | "paused" | "stopped" | "recording";
type RecordState = {
  startBeat: number;
  layerIndex: number;
};
type PlaybackState = {
  currentBeat: number;
  seekedBeat: number; //redundant but needed to force stop requestAnimationFrame
  isPlaying: boolean; //@deprecated
  recordState?: RecordState;
  playState: PlayStates;
  subdivisionsPerBeat: number;
  nBeats: number; //columns
  nLayers: number; //rows
  bpm: number;
  beatsPerBar: 4;
};

const initialState: PlaybackState = {
  currentBeat: 0,
  seekedBeat: 0,
  isPlaying: false,
  playState: "stopped",
  subdivisionsPerBeat: 16,
  nBeats: 200,
  nLayers: 20,
  beatsPerBar: 4,
  bpm: 150,
};
const playbackSlice = createSlice({
  name: "playback",
  initialState,
  reducers: {
    onPlayClicked: (state) => {
      state.isPlaying = !state.isPlaying;
      switch (state.playState) {
        case "playing":
          state.playState = "paused";
          return;
        default:
          state.playState = "playing";
          return;
      }
    },
    onRecordSaved: (state) => {
      state.recordState = undefined;
    },
    onRecordClicked: (state, action: PayloadAction<{ layerIndex: number }>) => {
      state.playState = "recording";
      state.isPlaying = true;
      state.recordState = { ...action.payload, startBeat: state.currentBeat };
    },
    onStopClicked: (state) => {
      if (!state.isPlaying) {
        state.currentBeat = 0;
      } else {
        state.isPlaying = false;
      }

      switch (state.playState) {
        case "playing":
          state.playState = "paused";
          return;
        default:
          state.playState = "stopped";
          state.currentBeat = 0;
          return;
      }
    },
    seekTimeline: (state, action: PayloadAction<number>) => {
      state.seekedBeat = action.payload;
    },
    changeSubdivisionsPerBeat: (state, action: PayloadAction<number>) => {
      state.subdivisionsPerBeat = action.payload;
    },
    setNumBeats: (state, action: PayloadAction<number>) => {
      state.nBeats = action.payload;
    },
    setBpm: (state, action: PayloadAction<number>) => {
      state.bpm = action.payload;
    },
    resetCurrentBeat: (state) => {
      state.currentBeat = 0;
    },
    setCurrentBeat: (state, action: PayloadAction<number>) => {
      state.currentBeat = action.payload;
    },
    increaseCurrentBeat: (state, action: PayloadAction<number>) => {
      state.currentBeat += action.payload;
    },
    increaseCurrentBeatLooped: (
      state,
      action: PayloadAction<{ incStep: number; nBeats: number }>,
    ) => {
      const nextBeat = action.payload.incStep + state.currentBeat;
      if (nextBeat < action.payload.nBeats) {
        state.currentBeat = nextBeat;
      } else {
        state.currentBeat = 0;
      }
    },
  },
});

export const {
  setBpm,
  increaseCurrentBeatLooped,
  changeSubdivisionsPerBeat,
  onPlayClicked,
  onStopClicked,
  seekTimeline,
  onRecordClicked,
  increaseCurrentBeat,
  resetCurrentBeat,
  setCurrentBeat,
  onRecordSaved,
  setNumBeats,
} = playbackSlice.actions;
export default playbackSlice.reducer;
