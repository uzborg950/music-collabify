import React from "react";
import { styled } from "@mui/system";
import { Box, Slider, Typography } from "@mui/material";
import { VolumeOff, VolumeUp } from "@mui/icons-material";

const Container = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;
const MAX = 100;
const MIN = 0;

const VolumeOffIcon = styled(VolumeOff)`
  width: 20px;
  height: 20px;
`;
const VolumeUpIcon = styled(VolumeUp)`
  width: 20px;
  height: 20px;
`;
const VolumeSlider: React.FC = () => {
  const [val, setVal] = React.useState<number>(MIN);
  const handleChange = (_: Event, newValue: number | number[]) => {
    setVal(newValue as number);
  };

  return (
    <Box sx={{ width: 120 }}>
      <Slider
        size={"small"}
        value={val}
        valueLabelDisplay="auto"
        min={MIN}
        max={MAX}
        onChange={handleChange}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <VolumeOffIcon
          color={"action"}
          onClick={() => setVal(MIN)}
          sx={{ cursor: "pointer" }}
        />
        <VolumeUpIcon
          color={"action"}
          onClick={() => setVal(MAX)}
          sx={{ cursor: "pointer" }}
        />
      </Box>
    </Box>
  );
};

const PanSlider: React.FC = () => {
  const [val, setVal] = React.useState<number>(MIN);
  const handleChange = (_: Event, newValue: number | number[]) => {
    setVal(newValue as number);
  };

  return (
    <Box sx={{ width: 120 }}>
      <Slider
        size={"small"}
        value={val}
        valueLabelDisplay="auto"
        min={MIN}
        max={MAX}
        onChange={handleChange}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="body2"
          onClick={() => setVal(MIN)}
          sx={{ cursor: "pointer" }}
          color={"text.secondary"}
          fontWeight={"600"}
        >
          L
        </Typography>
        <Typography
          variant="body2"
          onClick={() => setVal(MAX)}
          sx={{ cursor: "pointer" }}
          color={"text.secondary"}
          fontWeight={"600"}
        >
          R
        </Typography>
      </Box>
    </Box>
  );
};
export const RightControls: React.FC = () => {
  return (
    <Container>
      <VolumeSlider />
      <PanSlider />
    </Container>
  );
};
