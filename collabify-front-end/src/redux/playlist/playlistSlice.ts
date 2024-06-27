import { TrackData } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { LOCAL_TRACKS_DATA } from "../../mockData/tracks";
type PlaylistState = {
  tracks: TrackData[];
};

const initialState: PlaylistState = {
  // tracks: LOCAL_TRACKS_DATA, //for initial data
  tracks: [], //to start with empty project
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    onTrackAdded: (state, action: PayloadAction<TrackData>) => {
      state.tracks = [...state.tracks, action.payload];
    },
    onTrackRemoved: (state, action: PayloadAction<string>) => {
      state.tracks = state.tracks.filter(
        (track) => track.id !== action.payload,
      );
    },
  },
});

export default playlistSlice;
