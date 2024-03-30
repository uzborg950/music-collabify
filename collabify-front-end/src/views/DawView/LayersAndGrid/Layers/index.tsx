import { styled } from "@mui/system";
import React from "react";
import { grey } from "@mui/material/colors";
import { Topbar } from "./Topbar";
import { LayerControls } from "./LayerControls";
import { useAppSelector } from "../../../../redux/hooks";

const LayerContainer = styled("div")<{ gridCol: number }>`
  display: flex;
  flex-direction: column;
  padding: 4px 8px;

  background: ${grey["900"]};
  border-top: 1px solid ${(props) => props.theme.palette.background.default};
  border-bottom: 1px solid ${(props) => props.theme.palette.background.default};
  grid-column: ${(props) => props.gridCol};
  position: sticky;
  left: 0;
  gap: 8px;

  border-radius: 5px;
  z-index: 3;
`;

type LayerProps = {
  index: number;
  name?: string;
} & LayersProps;
export const Layer: React.FC<LayerProps> = (props) => {
  //   onRecordClick should be via context, so remove passing here
  return (
    <LayerContainer gridCol={props.gridCol} id={`layer-${props.index + 1}`}>
      <Topbar
        name={props.name ?? `Layer ${props.index + 1}`}
        onRecordClick={() => {}}
      />
      <LayerControls />
    </LayerContainer>
  );
};
type LayersProps = { gridCol: number };
export const Layers: React.FC<LayersProps> = (props) => {
  //todo Load layers data, nRows should be equal to number of layers
  //if not then add an error
  const nRows = useAppSelector((state) => state.playback.nLayers);

  return (
    <>
      {[...Array(nRows)].map((_, index) => (
        <Layer index={index} {...props} />
      ))}
    </>
  );
};
