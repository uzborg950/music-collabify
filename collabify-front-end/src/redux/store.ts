import { configureStore } from "@reduxjs/toolkit";
import playbackReducer from "./playback/playbackSlice";
import playlistSlice from "./playlist/playlistSlice";

export const store = configureStore({
  reducer: {
    playback: playbackReducer, //this creates the state.playback.* field in our selector
    playlist: playlistSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
