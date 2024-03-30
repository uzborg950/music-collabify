import { styled } from "@mui/system";
import { blueGrey, grey } from "@mui/material/colors";
import React from "react";
import { Typography } from "@mui/material";
import { TimelineGridProps } from "../../../views/DawView/LayersAndGrid/types";

/*
This component is supposed to be child grid element
Thus avoid setting width in this component and rather set it on the parent gri d
 */

const Container = styled("div")`
  position: sticky;
  top: 0;
  background: ${blueGrey["800"]};
  border-top: 1px solid ${grey["900"]};
  border-bottom: 1px solid ${grey["900"]};
  align-items: center;
  z-index: 2; //See collabify-front-end/reference/zIndexGrid.md
`;

type TimelineReferenceCellProps = {
  index: number;
} & Pick<TimelineGridProps, "beatsPerBar">;
export const TimelineReferenceCell: React.FC<TimelineReferenceCellProps> = (
  props,
) => {
  return (
    <Container>
      {props.index % props.beatsPerBar === 0 && (
        <div>
          <Typography
            marginLeft={"5px"}
            alignSelf={"center"}
            variant={"subtitle1"}
            color={"text.secondary"}
          >
            {props.index / props.beatsPerBar}
          </Typography>
        </div>
      )}
    </Container>
  );
};
