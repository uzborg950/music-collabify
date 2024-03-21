import React from "react";
import { styled } from "@mui/system";
import { LeftControls } from "./LeftControls";
import { RightControls } from "./RightControls";

const Container = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LayerControls: React.FC = () => {
  return (
    <Container>
      <LeftControls />
      <RightControls />
    </Container>
  );
};
