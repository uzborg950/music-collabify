import { TrackData } from "./types";
import { randomMuiColorGenerator } from "../../theme/colorUtils";

export const buildDefaultTrack = (): TrackData => ({
  bgColor: randomMuiColorGenerator(),
  layerIndex: 0,
  lengthSeconds: 0,
  title: "new recording",
  startBeat: 0,
  id: "default-id",
  audioUri: "default-uri",
});
