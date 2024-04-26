export type TimelineGridProps = {
  nCols: number;
  beatsPerBar: number;
  nRows: number;
  bpm: number;
};

export type TrackGridRefsProps = {
  gridRef: HTMLDivElement | null;
  startLocationDivRef: HTMLDivElement | null; //todo pass ref or better to pass bounding client rect  (better closed control)
};
