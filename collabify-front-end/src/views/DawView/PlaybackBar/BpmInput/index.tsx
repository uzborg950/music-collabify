import { Box, FormControl, TextField } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setBpm } from "../../../../redux/playback/playbackSlice";

const isNumeric = (value: string) => {
  // Use regular expression to match numeric pattern
  // This pattern will match only non-negative integers or floating point numbers without exponents
  return /^\d+(\.\d+)?$/.test(value);
};

export const BpmInput: React.FC = () => {
  const bpm = useAppSelector((state) => state.playback.bpm);

  const dispatch = useAppDispatch();
  return (
    <Box sx={{ maxWidth: 120 }}>
      <FormControl fullWidth>
        <TextField
          onChange={(event) => {
            if (isNumeric(event.target.value))
              dispatch(setBpm(Number(event.target.value)));
          }}
          value={bpm}
          label="BPM"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
    </Box>
  );
};
