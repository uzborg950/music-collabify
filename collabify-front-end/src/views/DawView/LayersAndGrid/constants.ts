export const BEAT_WIDTH = "50px";
export const LAYERS_WIDTH = "400px";

export const TOP_ROW_HEIGHT = "30px";
export const getBeatWidth = () =>
  parseInt(BEAT_WIDTH.slice(0, -2));

export const getLayersWidth = () => parseInt(LAYERS_WIDTH.slice(0, -2));

//Grid indices - This mimics the CSS grid layout and would need to be maintained with the components in LayersAndGrid
//Warning: This is only partly used to complete the LayersAndGrid component. It has nothing to do with the actual CSS grid.
export const GRID_LAYOUT = {
  navigationBar: {
    row: 1,
    col: 1,
  },
  timelineBar: {
    row: 1,
    col: 2,
  },
  layers: {
    row: 2,
    col: 1,
  },
  trackGrid: {
    row: 2,
    col: 2,
  },
} as const;
