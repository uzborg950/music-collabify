import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaybackState = {
  currentBeat: number;
  isPlaying: boolean;
  subdivisionsPerBeat: number;
  nBeats: number; //columns
  nLayers: number; //rows
  bpm: number;
  beatsPerBar: 4;
};

const initialState: PlaybackState = {
  currentBeat: 0,
  isPlaying: false,
  subdivisionsPerBeat: 4,
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
    },
    onStopClicked: (state) => {
      if (!state.isPlaying) {
        state.currentBeat = 0;
      } else {
        state.isPlaying = false;
      }
    },
    seekTimeline: (state, action: PayloadAction<number>) => {
      state.currentBeat = action.payload;
    },
    changeSubdivisionsPerBeat: (state, action: PayloadAction<number>) => {
      state.subdivisionsPerBeat = action.payload;
    },
    setBpm: (state, action: PayloadAction<number>) => {
      state.bpm = action.payload;
    },
    resetCurrentBeat: (state) => {
      state.currentBeat = 0;
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
  increaseCurrentBeat,
  resetCurrentBeat,
} = playbackSlice.actions;
export default playbackSlice.reducer;
