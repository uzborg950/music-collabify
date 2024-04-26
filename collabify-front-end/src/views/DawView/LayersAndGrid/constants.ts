export const TRACK_GRID_CELL_WIDTH = "50px";
export const LAYERS_WIDTH = "400px";

export const getTrackGridCellWidth = () =>
  parseInt(TRACK_GRID_CELL_WIDTH.slice(0, -2));

export const getLayersWidth = () => parseInt(LAYERS_WIDTH.slice(0, -2));
