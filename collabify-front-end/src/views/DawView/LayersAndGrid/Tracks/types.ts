export type TrackData = {
  startBeat: number;
  endBeat: number;
  title: string;
  bgColor: string;
  audioUri: string;
  layerIndex: number; //todo this is currently used as both id and order. In the future separate these two if requirement for deleting/reordering layers
};
