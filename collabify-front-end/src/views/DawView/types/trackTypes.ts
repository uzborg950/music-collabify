export type TrackFile = {
  type: "file";
  title: string;
  audioUri: string;
  length: number; //in seconds. This will be converted to beats according to the
};
export type TrackSynth = {
  type: "synth"; //something like a piano roll; This will change as soon as we go beyond implementing track files
  endBeat: number;
};
export type TrackStyle = {
  bgColor: string;
};
export type TrackEdit = {
  trim: {
    startSec: number; //start seconds
    endSec: number;
  };
};
export type TrackPosition = {
  startBeat: number;
  // endBeat: number; endBeat should be calculated from the track length
  layerIndex: number; //todo this is currently used as both id and order. In the future separate these two if requirement for deleting/reordering layers
};
export type TrackBase = TrackStyle & Partial<TrackEdit> & TrackPosition;
export type TrackData = TrackBase & (TrackFile | TrackSynth);
