import { styled } from "@mui/system";
import { TimelineGridProps } from "../types";
import React from "react";
import { blueGrey, grey, orange } from "@mui/material/colors";

const LayerContainer = styled("div")<{ gridRow: number }>`
  background: ${grey["900"]};
  border-top: 1px solid ${(props) => props.theme.palette.background.default};
  border-bottom: 1px solid ${(props) => props.theme.palette.background.default};
  grid-column: 1;
  position: sticky;
  left: 0;
`;

type LayersProps = { startGridRow: number } & TimelineGridProps;
export const Layers: React.FC<LayersProps> = (props) => {
  return (
    <>
      {[...Array(props.nRows)].map((_, index) => (
        <LayerContainer
          gridRow={index + props.startGridRow}
          id={`layer-${index}`}
        />
      ))}
    </>
  );
};
