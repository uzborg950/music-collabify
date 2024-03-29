import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaybackState = {
  currentBeat: number;
  isPlaying: boolean;
  subdivisionsPerBeat: number;
  bpm: number;
};

const initialState: PlaybackState = {
  currentBeat: 0,
  isPlaying: false,
  subdivisionsPerBeat: 4,
  bpm: 77,
};
const playbackSlice = createSlice({
  name: "playback",
  initialState,
  reducers: {
    onPlayClicked: (state) => {
      state.isPlaying = true;
    },
    onStopClicked: (state) => {
      state.isPlaying = false;
    },
    seekTimeline: (state, action: PayloadAction<number>) => {
      state.currentBeat = action.payload;
    },
    changeSubdivisionsPerBeat: (state, action: PayloadAction<number>) => {
      state.subdivisionsPerBeat = action.payload;
    },
    increaseCurrentBeat: (state, action: PayloadAction<number>) => {
      state.currentBeat += action.payload;
    },
  },
});

export const {
  changeSubdivisionsPerBeat,
  onPlayClicked,
  onStopClicked,
  seekTimeline,
  increaseCurrentBeat,
} = playbackSlice.actions;
export default playbackSlice.reducer;
