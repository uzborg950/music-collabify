import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { changeSubdivisionsPerBeat } from "../../../../redux/playback/playbackSlice";

export const SubdivisionSelect: React.FC = () => {
  const subdivisionsPerBeat = useAppSelector(
    (state) => state.playback.subdivisionsPerBeat,
  );
  const dispatch = useAppDispatch();
  const handleChange = (event: SelectChangeEvent<number>) => {
    dispatch(changeSubdivisionsPerBeat(event.target.value as number));
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="subdivision-select-label">Subdivisions</InputLabel>
        <Select<number>
          value={subdivisionsPerBeat}
          labelId={"subdivision-select-label"}
          label="subdivisions"
          onChange={handleChange}
        >
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={32}>32</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
