import { styled } from "@mui/system";
import { ControlButtonBaseContainer } from "../common";
import React, { useState } from "react";
import { blueGrey, orange, yellow } from "@mui/material/colors";
import { Tooltip } from "@mui/material";

const LeftControlsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const TextButtonContainer = styled(ControlButtonBaseContainer)<{
  isOn: boolean;
  $color: string;
}>`
  width: 32px;
  height: 32px;
  color: ${(props) => (props.isOn ? blueGrey[900] : props.$color)};
  background: ${(props) => (props.isOn ? props.$color : blueGrey[900])};

  font-weight: 600;
`;
export const LeftControls: React.FC = () => {
  const [monoClicked, setMonoClicked] = useState<boolean>(false);
  const [soloClicked, setSoloClicked] = useState<boolean>(false);

  return (
    <LeftControlsContainer>
      <Tooltip title={"toggle mono audio"}>
        <TextButtonContainer
          onClick={() => setMonoClicked((state) => !state)}
          centerRipple
          isOn={monoClicked}
          $color={yellow["500"]}
        >
          M
        </TextButtonContainer>
      </Tooltip>
      <Tooltip title={"toggle solo mode"}>
        <TextButtonContainer
          onClick={() => setSoloClicked((state) => !state)}
          isOn={soloClicked}
          centerRipple
          $color={orange["500"]}
        >
          S
        </TextButtonContainer>
      </Tooltip>
    </LeftControlsContainer>
  );
};
