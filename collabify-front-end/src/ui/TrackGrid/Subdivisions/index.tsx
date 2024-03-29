import { styled } from "@mui/system";
import { blueGrey } from "@mui/material/colors";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { seekTimeline } from "../../../redux/playback/playbackSlice";

const SubdivisionsWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
const Subdivision = styled("div")`
  flex: 1;
  &:hover {
    //border-left: 2px solid ${blueGrey["700"]};
    background: ${blueGrey["700"]};
  }
`;

//todo use static classes instead of styled components to avoid long rendering times
//This is a slow operation and requires optimization
export const Subdivisions: React.FC<{
  beatIndex: number;
}> = ({ beatIndex }) => {
  const subdivisions = useAppSelector(
    (state) => state.playback.subdivisionsPerBeat,
  );
  const dispatch = useAppDispatch();
  return (
    <SubdivisionsWrapper>
      {[...Array(subdivisions)].map((_, subdivisionIndex) => (
        <Subdivision
          key={subdivisionIndex}
          onClick={() => {
            dispatch(seekTimeline(beatIndex + subdivisionIndex / subdivisions));
          }}
        />
      ))}
    </SubdivisionsWrapper>
  );
};
