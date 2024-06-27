// import { TrackFileData } from "../views/DawView/types/trackTypes";

import { TrackData } from "../redux/playlist/types";

export const LOCAL_TRACKS_DATA: TrackData[] = [
  {
    id: "drums-mock-id",
    // type: "file",
    startBeat: 0,
    // endBeat: 288,
    lengthSeconds: 204,
    title: "drums",
    bgColor: "#3d3338",
    audioUri: "http://localhost:8080/drums.mp3",
    layerIndex: 0,
  },
  {
    id: "vocals-mock-id",
    // type: "file",
    startBeat: 0,
    // endBeat: 288,
    lengthSeconds: 204,

    title: "vocals",
    bgColor: "#de3f3f",
    audioUri: "http://localhost:8080/vocals.mp3",
    layerIndex: 1,
  },
  {
    id: "instrumental-mock-id",
    // type: "file",
    startBeat: 0,
    // endBeat: 288,
    lengthSeconds: 204,

    title: "instrumental",
    bgColor: "#f5bf44",
    audioUri: "http://localhost:8080/instrumental.mp3",
    layerIndex: 2,
  },
  {
    id: "bass-mock-id",
    // type: "file",
    startBeat: 0,
    // endBeat: 288,
    lengthSeconds: 204,

    title: "bass",
    bgColor: "#6910aa",
    audioUri: "http://localhost:8080/bass.mp3",
    layerIndex: 3,
  },
];
