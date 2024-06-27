//@deprecated: all types in this file are likely deprecated. Use/Create types in playlistSlice types instead as the redux state should sufficiently store all data related to rendering tracks

export type TrackFile = {
  type: "file";
  title: string;
  audioUri: string;
  length: number; //in seconds. This will be converted to beats according to the
};
export type TrackSynth = {
  type: "synth"; //something like a piano roll; This will change as soon as we go beyond implementing playlist files
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
  // endBeat: number; endBeat should be calculated from the playlist length
  layerIndex: number; //todo this is currently used as both id and order. In the future separate these two if requirement for deleting/reordering layers
};
export type TrackBase = TrackStyle & Partial<TrackEdit> & TrackPosition;
export type TrackData = TrackBase & (TrackFile | TrackSynth);

export type TrackFileData = TrackBase & TrackFile;
export type TrackFileDataInternal = TrackFileData & { endBeat: number };
