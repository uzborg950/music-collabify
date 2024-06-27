import { v4 as uuid } from "uuid";
export type PlaylistItem = {
  id: string;
  layerIndex: number;
  startBeat: number;
  lengthSeconds: number;
  title: string;
} & PlaylistItemStyle;
export type PlaylistItemStyle = {
  bgColor: string;
};
export type TrackData = PlaylistItem & {
  audioUri: string;
};
