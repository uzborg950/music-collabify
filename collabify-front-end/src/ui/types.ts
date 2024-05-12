/*
These props are usually used to position an absolute positioned component (such as a play ticker) on top of the track grid
 */
export type PositionProps = {
  left: number;
  top: number;
  height: number;
};



export type BeatSizeProps = {
  beatWidth: number; //in pixels to represent one beat
};

export type BeatInitProps = { nBeats: number; beatsPerBar: number } & BeatSizeProps;

export type CSSGridProps = {
  startRow: number;
  startCol: number;
};

